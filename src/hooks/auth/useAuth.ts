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
 * Resolve user role based on staff status and profile information
 */
function resolveUserRole(profile: MemberUser | null, basicUserInfo: any | null): UserRole {
  console.log('[USE AUTH] Resolving user role:', { profile, basicUserInfo });
  
  // Check if user is staff (admin) from basic user info first
  if (basicUserInfo?.is_staff) {
    console.log('[USE AUTH] User is staff (admin) from basic info');
    return 'admin';
  }
  
  // Check staff status from profile
  if (profile?.user?.is_staff) {
    console.log('[USE AUTH] User is staff (admin) from profile');
    return 'admin';
  }
  
  // If not staff, check profile role for other types
  if (profile?.role) {
    const role = profile.role.toUpperCase();
    console.log('[USE AUTH] Profile has role:', role);
    
    const roleMap: Record<string, UserRole> = {
      'PROFESSOR': 'professor',
      'PRO': 'professor',
      'RESEARCHER': 'researcher',
      'POSTDOC': 'researcher',
      'ENGINEER': 'researcher',
      'PHD': 'student',
      'PHD_STUDENT': 'student',
      'MASTER': 'student',
      'MSC': 'student',
      'STUDENT': 'student'
    };

    const mappedRole = roleMap[role];
    if (mappedRole) {
      console.log('[USE AUTH] Mapped role:', mappedRole);
      return mappedRole;
    }
  }
  
  // Default to student for authenticated users
  if (basicUserInfo) {
    console.log('[USE AUTH] Defaulting to student for authenticated user');
    return 'student';
  }

  console.log('[USE AUTH] No role could be determined');
  return null;
}

/**
 * Map UserRole to permissions
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
    console.log('[USE AUTH] Computed user role:', { 
      role, 
      hasProfile: !!profile.value,
      hasBasicInfo: !!basicUserInfo.value,
      isStaff: basicUserInfo.value?.is_staff,
      profileRole: profile.value?.role 
    });
    return role;
  })
  
  const permissions = computed(() => resolvePermissions(userRole.value))

  const isAdmin = computed(() => {
    // Check both basic user info and role
    return basicUserInfo.value?.is_staff === true || userRole.value === 'admin';
  })
  
  const isProfessor = computed(() => userRole.value === 'professor')
  const isResearcher = computed(() => userRole.value === 'researcher')
  const isProfessorOrResearcher = computed(() =>
    ['professor', 'researcher'].includes(userRole.value || '')
  )
  const isStudent = computed(() => userRole.value === 'student')

  const canAccessDashboard = computed(() => {
    const hasAuth = isAuthenticated.value;
    const hasBasicInfo = basicUserInfo.value !== null;
    
    console.log('[USE AUTH] Dashboard access check:', { 
      hasAuth, 
      hasBasicInfo,
      userRole: userRole.value 
    });
    
    return hasAuth && hasBasicInfo;
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

  const getDashboardRoute = computed(() => {
    if (!isAuthenticated.value || !basicUserInfo.value) {
      console.log('[USE AUTH] Not authenticated - no dashboard access');
      return null;
    }
    
    console.log('[USE AUTH] Getting dashboard route:', {
      isStaff: basicUserInfo.value.is_staff,
      userRole: userRole.value,
      hasProfile: !!profile.value,
      profileRole: profile.value?.role
    });
    
    // Staff users always get admin dashboard
    if (basicUserInfo.value.is_staff) {
      console.log('[USE AUTH] Routing to admin dashboard (staff user)');
      return 'admin-dashboard';
    }
    
    // Non-staff users get role-based dashboards
    const role = userRole.value;
    console.log('[USE AUTH] Routing based on role:', role);
    
    switch (role) {
      case 'professor':
      case 'researcher':
        console.log('[USE AUTH] Routing to professor dashboard');
        return 'professor-dashboard';
      case 'student':
        console.log('[USE AUTH] Routing to student dashboard');
        return 'student-dashboard';
      default:
        // Default to student dashboard for authenticated users
        console.log('[USE AUTH] No specific role, defaulting to student dashboard');
        return 'student-dashboard';
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

  const hasPermission = (permission: keyof UserPermissions): boolean =>
    permissions.value[permission]

  const requirePermission = (permission: keyof UserPermissions): boolean =>
    isAuthenticated.value && hasPermission(permission)

  // Get user info for display
  const user = computed(() => profile.value)

  return {
    // Auth state
    isAuthenticated,
    isLoading,
    profile,
    user,
    basicUserInfo,

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