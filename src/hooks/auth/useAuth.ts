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

export type UserRole = 'admin' | 'professor' | 'researcher' | 'student'

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

  // User role determination - returns null when not authenticated
  const userRole = computed((): UserRole | null => {
    if (!isAuthenticated.value || !user.value) return null
    if (user.value.is_staff) return 'admin'
    
    // Map user roles from backend - consistent mapping
    const roleMap: Record<string, UserRole> = {
      'professor': 'professor',
      'researcher': 'researcher', // Garde le rôle researcher distinct
      'postdoc': 'researcher',
      'phd': 'student',
      'master': 'student',
      'engineer': 'researcher',
      'admin': 'admin'
    }
    
    return roleMap[user.value.role] || 'student'
  })

  // User permissions based on role
  const permissions = computed((): UserPermissions => {
    const role = userRole.value
    
    // No permissions for unauthenticated users
    if (!role) {
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
      case 'researcher': // Traite researcher comme professor pour les permissions
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
      
      default:
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
  const isResearcher = computed(() => userRole.value === 'researcher')
  const isProfessorOrResearcher = computed(() => ['professor', 'researcher'].includes(userRole.value || ''))
  const isStudent = computed(() => userRole.value === 'student')

  const canAccessDashboard = computed(() => isAuthenticated.value && userRole.value !== null)

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

  // Dashboard route determination - now includes all roles
  const getDashboardRoute = computed(() => {
    if (!canAccessDashboard.value || !userRole.value) return null
    
    switch (userRole.value) {
      case 'admin':
        return 'admin-dashboard'
      case 'professor':
      case 'researcher': // Les deux utilisent le professor-dashboard
        return 'professor-dashboard'
      case 'student':
        return 'student-dashboard'
      default:
        return 'dashboard'
    }
  })

  // Access control functions
  const canAccessPage = (page: string): boolean => {
    const protectedRoutes = ['dashboard', 'admin-dashboard', 'professor-dashboard', 'student-dashboard']
    const adminOnlyRoutes = ['admin-dashboard']
    const professorResearcherRoutes = ['professor-dashboard']
    const studentOnlyRoutes = ['student-dashboard']
    
    if (!protectedRoutes.includes(page)) {
      return true // Public page
    }
    
    if (!isAuthenticated.value) {
      return false // Must be authenticated for protected routes
    }
    
    // Role-specific access control
    if (adminOnlyRoutes.includes(page)) {
      return isAdmin.value
    }
    
    if (professorResearcherRoutes.includes(page)) {
      return isProfessorOrResearcher.value
    }
    
    if (studentOnlyRoutes.includes(page)) {
      return isStudent.value
    }
    
    // Generic dashboard - accessible by all authenticated users
    if (page === 'dashboard') {
      return true
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
    isProfessorOrResearcher,
    isStudent,
    
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