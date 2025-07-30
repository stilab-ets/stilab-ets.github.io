import { computed } from 'vue'
import { useAuthMiddleware } from '@/middleware/auth'
import { User } from '@/services/user.types'

export interface UserPermissions {
  canManageUsers: boolean
  canManageContent: boolean
  canAccessSystemSettings: boolean
  canViewReports: boolean
  canCreateContent: boolean
  canEditOwnContent: boolean
  canModerateContent: boolean
}

export type UserRole = 'admin' | 'professor' | 'researcher' | 'student' | null

/**
 * Maps raw backend roles and is_staff flag to a standardized frontend UserRole
 */
export function resolveUserRole(user: User | null): UserRole {
  if (!user) return null
  
  // Utiliser is_staff pour admin
  if (user.is_staff) return 'admin'
  
  // Utiliser le rôle Member si disponible
  const memberRole = user.memberRole || user.memberInfo?.role
  if (!memberRole) return 'student'

  const role = memberRole.toUpperCase()

  const roleMap: Record<string, UserRole> = {
    'PRO': 'professor',
    'PHD': 'student', 
    'MSC': 'student',
    'PROFESSOR': 'professor',
    'RESEARCHER': 'researcher',
    'POSTDOC': 'researcher',
    'ENGINEER': 'researcher',
    'ADMIN': 'admin',
    'MASTER': 'student',
    'PHD_STUDENT': 'student'
  }

  return roleMap[role] || 'student'
}

/**
 * Maps a UserRole to corresponding permission set
 */
function resolvePermissions(role: UserRole | null): UserPermissions {
  const base: UserPermissions = {
    canManageUsers: false,
    canManageContent: false,
    canAccessSystemSettings: false,
    canViewReports: false,
    canCreateContent: false,
    canEditOwnContent: false,
    canModerateContent: false
  }

  switch (role) {
    case 'admin':
      return {
        ...base,
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
        ...base,
        canCreateContent: true,
        canEditOwnContent: true
      }
    case 'student':
      return {
        ...base,
        canEditOwnContent: true
      }
    default:
      return base
  }
}

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

  const userRole = computed<UserRole | null>(() => {
    if (!isAuthenticated.value || !user.value) return null
    return resolveUserRole(user.value as User)
  })
  
  const permissions = computed(() => resolvePermissions(userRole.value))

  const isAdmin = computed(() => userRole.value === 'admin')
  const isProfessor = computed(() => userRole.value === 'professor')
  const isResearcher = computed(() => userRole.value === 'researcher')
  const isProfessorOrResearcher = computed(() =>
    ['professor', 'researcher'].includes(userRole.value || '')
  )
  const isStudent = computed(() => userRole.value === 'student')

  const canAccessDashboard = computed(() =>
    isAuthenticated.value && userRole.value !== null
  )

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

    const parts = name.trim().split(' ')
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : name[0].toUpperCase()
  })

  const hasPermission = (permission: keyof UserPermissions): boolean =>
    permissions.value[permission]

  const requirePermission = (permission: keyof UserPermissions): boolean =>
    isAuthenticated.value && hasPermission(permission)

  const getDashboardRoute = computed(() => {
    if (!canAccessDashboard.value || !userRole.value) return null
    switch (userRole.value) {
      case 'admin':
        return 'admin-dashboard'
      case 'professor':
      case 'researcher':
        return 'professor-dashboard'
      case 'student':
        return 'student-dashboard'
      default:
        return 'dashboard'
    }
  })

  const canAccessPage = (page: string): boolean => {
    const protectedRoutes = ['dashboard', 'admin-dashboard', 'professor-dashboard', 'student-dashboard']
    const adminOnlyRoutes = ['admin-dashboard']
    const professorResearcherRoutes = ['professor-dashboard']
    const studentOnlyRoutes = ['student-dashboard']

    if (!protectedRoutes.includes(page)) return true
    if (!isAuthenticated.value) return false

    if (adminOnlyRoutes.includes(page)) return isAdmin.value
    if (professorResearcherRoutes.includes(page)) return isProfessorOrResearcher.value
    if (studentOnlyRoutes.includes(page)) return isStudent.value

    return true
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
