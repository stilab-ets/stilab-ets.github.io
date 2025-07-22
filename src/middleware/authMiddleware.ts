import { useAuth } from '@/composables/useAuth'

export interface AuthMiddlewareOptions {
  requireAuth?: boolean
  requireAdmin?: boolean
  redirectTo?: string
}

export const authMiddleware = (options: AuthMiddlewareOptions = {}) => {
  const { requireAuth = true, requireAdmin = false, redirectTo = 'login' } = options
  const { isAuthenticated, user } = useAuth()

  return {
    canAccess: (): boolean => {
      if (requireAuth && !isAuthenticated.value) {
        return false
      }
      
      if (requireAdmin && (!user.value || user.value.role !== 'admin')) {
        return false
      }
      
      return true
    },
    getRedirect: (): string => redirectTo
  }
}

// Authenticated pages (require login)
export const authenticatedPages = [
  'dashboard',
  'user-settings',
  'create-publication',
  'create-event',
  'create-project',
  'create-member',
  'create-research',
  'create-teaching',
  'create-award',
  'create-vacancy'
]

// Admin pages (require admin role)
export const adminPages = [
  'admin-management',
  'admin-dashboard',
  'admin-users',
  'admin-settings'
]

// Public pages (no authentication required)
export const publicPages = [
  'home',
  'people',
  'research',
  'publications',
  'teaching',
  'events',
  'projects',
  'vacancies',
  'awards',
  'login',
  'register',
  'contact',
  'apply-project',
  'contact-form'
]


export const isAuthenticatedPage = (pageId: string): boolean => {
  return authenticatedPages.includes(pageId)
}

export const isAdminPage = (pageId: string): boolean => {
  return adminPages.includes(pageId)
}

export const isPublicPage = (pageId: string): boolean => {
  return publicPages.includes(pageId)
}

// Main middleware functions for different page types
export const authenticatedMiddleware = () => authMiddleware({ requireAuth: true })

export const adminMiddleware = () => authMiddleware({ 
  requireAuth: true, 
  requireAdmin: true,
  redirectTo: 'unauthorized'
})

export const publicMiddleware = () => authMiddleware({ requireAuth: false })

// Route guard utility
export const getPageMiddleware = (pageId: string) => {
  if (isAdminPage(pageId)) {
    return adminMiddleware()
  }
  
  if (isAuthenticatedPage(pageId)) {
    return authenticatedMiddleware()
  }
  
  return publicMiddleware()
}