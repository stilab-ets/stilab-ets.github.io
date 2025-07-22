import { computed } from 'vue'
import { useAuthMiddleware } from '@/middleware/auth'

export interface UserPermissions {
  canManageUsers: boolean
  canManageContent: boolean
  canAccessSystemSettings: boolean
  canViewReports: boolean
  canCreateContent: boolean
  canEditOwnContent: boolean
  canModerateContent: boolean
}

export type UserRole = 'admin' | 'professor' | 'researcher' | 'student' | 'guest'

export function useAuth() {
  const { 
    isAuthenticated, 
    isLoading, 
    user, 
    login, 
    logout, 
    requireAuth, 
    requireAdmin 
  } = useAuthMiddleware()

  // User role determination
  const userRole = computed((): UserRole => {
    if (!user.value) return 'guest'
    if (user.value.is_staff) return 'admin'
    
    // Map user roles from backend
    const roleMap: Record<string, UserRole> = {
      'professor': 'professor',
      'researcher': 'researcher', 
      'postdoc': 'researcher',
      'phd': 'student',
      'master': 'student',
      'engineer': 'researcher'
    }
    
    return roleMap[user.value.role] || 'researcher'
  })

  // User permissions based on role
  const permissions = computed((): UserPermissions => {
    const role = userRole.value
    
    switch (role) {
      case 'admin':
        return {
          canManageUsers: true,
          canManageContent: true,
          canAccessSystemSettings: true,
          canViewReports: true,
          canCreateContent: true,
          canEditOwnContent: true,
          canModerateContent: true
        }
      
      case 'professor':
      case 'researcher':
        return {
          canManageUsers: false,
          canManageContent: false,
          canAccessSystemSettings: false,
          canViewReports: false,
          canCreateContent: true,
          canEditOwnContent: true,
          canModerateContent: false
        }
      
      case 'student':
        return {
          canManageUsers: false,
          canManageContent: false,
          canAccessSystemSettings: false,
          canViewReports: false,
          canCreateContent: false,
          canEditOwnContent: true,
          canModerateContent: false
        }
      
      default: // guest
        return {
          canManageUsers: false,
          canManageContent: false,
          canAccessSystemSettings: false,
          canViewReports: false,
          canCreateContent: false,
          canEditOwnContent: false,
          canModerateContent: false
        }
    }
  })

  // Convenience computed properties
  const isAdmin = computed(() => userRole.value === 'admin')
  const isProfessor = computed(() => userRole.value === 'professor')
  const isResearcher = computed(() => ['professor', 'researcher'].includes(userRole.value))
  const isStudent = computed(() => userRole.value === 'student')
  const isGuest = computed(() => userRole.value === 'guest')

  const canAccessDashboard = computed(() => !isGuest.value && isAuthenticated.value)

  // User display information
  const displayName = computed(() => {
    if (!user.value) return ''
    if (user.value.first_name && user.value.last_name) {
      return `${user.value.first_name} ${user.value.last_name}`
    }
    return user.value.username || user.value.email || ''
  })

  const userInitials = computed(() => {
    const name = displayName.value
    if (!name) return 'U'
    
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return name[0].toUpperCase()
  })

  // Permission checking functions
  const hasPermission = (permission: keyof UserPermissions): boolean => {
    return permissions.value[permission]
  }

  const requirePermission = (permission: keyof UserPermissions): boolean => {
    if (!isAuthenticated.value) return false
    return hasPermission(permission)
  }

  // Dashboard route determination
  const getDashboardRoute = computed(() => {
    if (!canAccessDashboard.value) return null
    return isAdmin.value ? 'admin-dashboard' : 'professor-dashboard'
  })

  // Access control functions
  const canAccessPage = (page: string): boolean => {
    const protectedRoutes = ['dashboard', 'admin-dashboard', 'professor-dashboard']
    const adminOnlyRoutes = ['admin-dashboard']
    
    if (!protectedRoutes.includes(page)) {
      return true // Public page
    }
    
    if (!isAuthenticated.value) {
      return false // Must be authenticated for protected routes
    }
    
    if (adminOnlyRoutes.includes(page)) {
      return isAdmin.value // Admin-only routes
    }
    
    return true // Authenticated user can access general protected routes
  }

  return {
    // Auth state
    isAuthenticated,
    isLoading,
    user,
    
    // User info
    userRole,
    displayName,
    userInitials,
    
    // Role checks
    isAdmin,
    isProfessor,
    isResearcher,
    isStudent,
    isGuest,
    
    // Access control
    permissions,
    canAccessDashboard,
    getDashboardRoute,
    
    // Functions
    login,
    logout,
    requireAuth,
    requireAdmin,
    hasPermission,
    requirePermission,
    canAccessPage
  }
}