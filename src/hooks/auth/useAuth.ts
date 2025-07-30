import { computed } from 'vue'
import { useAuthMiddleware } from '@/middleware/auth'
import { MemberUser } from '@/services/user.types'

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
 * Maps MemberUser role to a standardized frontend UserRole
 */
export function resolveUserRole(profile: MemberUser | null, basicUserInfo: any | null): UserRole {
  console.log('[USE AUTH] Resolving user role:', { profile, basicUserInfo });
  
  if (!profile && !basicUserInfo) {
    console.log('[USE AUTH] No profile or basic user info available');
    return null;
  }
  
  // Check if user is staff (admin) from profile
  if (profile?.user?.is_staff) {
    console.log('[USE AUTH] User is staff - resolving as admin');
    return 'admin';
  }
  
  // Check for role in profile
  if (profile?.role) {
    const role = profile.role.toUpperCase();
    console.log('[USE AUTH] Profile has role:', role);
    
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
    };

    const mappedRole = roleMap[role] || 'student';
    console.log('[USE AUTH] Mapped role:', mappedRole);
    return mappedRole;
  }
  
  // If we have basic user info but no profile, default to student
  // This allows users to access dashboard even without a complete profile
  if (basicUserInfo) {
    console.log('[USE AUTH] No profile role found, defaulting to student for basic user');
    return 'student';
  }

  console.log('[USE AUTH] No role could be determined');
  return null;
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
    profile,
    basicUserInfo,
    login,
    logout,
    getCurrentProfile,
    refreshProfile,
    requireAuth,
    requireAdmin
  } = useAuthMiddleware()

  const userRole = computed<UserRole | null>(() => {
    const role = resolveUserRole(profile.value, basicUserInfo.value);
    console.log('[USE AUTH] Computed user role:', role);
    return role;
  })
  
  const permissions = computed(() => resolvePermissions(userRole.value))

  const isAdmin = computed(() => userRole.value === 'admin')
  const isProfessor = computed(() => userRole.value === 'professor')
  const isResearcher = computed(() => userRole.value === 'researcher')
  const isProfessorOrResearcher = computed(() =>
    ['professor', 'researcher'].includes(userRole.value || '')
  )
  const isStudent = computed(() => userRole.value === 'student')

  const canAccessDashboard = computed(() => {
    const hasAuth = isAuthenticated.value;
    const hasRole = userRole.value !== null;
    const hasBasicInfo = basicUserInfo.value !== null;
    
    console.log('[USE AUTH] Dashboard access check:', { 
      hasAuth, 
      hasRole, 
      hasBasicInfo,
      userRole: userRole.value 
    });
    
    // Allow dashboard access if user is authenticated and has either a role or basic user info
    return hasAuth && (hasRole || hasBasicInfo);
  })

  const displayName = computed(() => {
    if (profile.value) {
      const name = `${profile.value.first_name} ${profile.value.last_name}`.trim();
      if (name) return name;
    }
    
    // Fallback to username from basic user info
    if (basicUserInfo.value?.username) {
      return basicUserInfo.value.username;
    }
    
    return 'User';
  })

  const userInitials = computed(() => {
    const name = displayName.value;
    if (name === 'User') return 'U';

    const parts = name.trim().split(' ');
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : name[0].toUpperCase();
  })

  const hasPermission = (permission: keyof UserPermissions): boolean =>
    permissions.value[permission]

  const requirePermission = (permission: keyof UserPermissions): boolean =>
    isAuthenticated.value && hasPermission(permission)

  const getDashboardRoute = computed(() => {
    if (!isAuthenticated.value) {
      console.log('[USE AUTH] Not authenticated - no dashboard access');
      return null;
    }
    
    const role = userRole.value;
    console.log('[USE AUTH] Getting dashboard route for role:', role);
    
    switch (role) {
      case 'admin':
        return 'admin-dashboard'
      case 'professor':
      case 'researcher':
        return 'professor-dashboard'
      case 'student':
        return 'student-dashboard'
      default:
        // Default dashboard for users without specific roles but with basic info
        if (basicUserInfo.value) {
          console.log('[USE AUTH] No specific role, but has basic info - using generic dashboard');
          return 'student-dashboard'; // Default to student dashboard
        }
        console.log('[USE AUTH] No role and no basic info - no dashboard access');
        return null;
    }
  })

  const canAccessPage = (page: string): boolean => {
    const protectedRoutes = ['dashboard', 'admin-dashboard', 'professor-dashboard', 'student-dashboard']
    const adminOnlyRoutes = ['admin-dashboard']
    const professorResearcherRoutes = ['professor-dashboard']
    const studentOnlyRoutes = ['student-dashboard']

    if (!protectedRoutes.includes(page)) return true
    if (!isAuthenticated.value) return false

    // Allow generic dashboard access for any authenticated user
    if (page === 'dashboard') return true;
    
    if (adminOnlyRoutes.includes(page)) return isAdmin.value
    if (professorResearcherRoutes.includes(page)) return isProfessorOrResearcher.value
    if (studentOnlyRoutes.includes(page)) return isStudent.value || !!basicUserInfo.value

    return true
  }

  // Get user info for display
  const user = computed(() => profile.value)

  return {
    // Auth state
    isAuthenticated,
    isLoading,
    profile,
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
    getCurrentProfile,
    refreshProfile,
    requireAuth,
    requireAdmin,
    hasPermission,
    requirePermission,
    canAccessPage
  }
}