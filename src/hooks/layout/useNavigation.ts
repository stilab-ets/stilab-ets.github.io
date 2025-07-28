import { useLanguage } from '@/composables/useLanguage'
import { navigationItems } from '@/data/translations'
import { ref, computed } from 'vue'
import type { ComputedRef } from 'vue'

interface NavigationComposable {
  currentPage: ComputedRef<string>
  navigateToPage: (page: string) => void
  isCurrentPage: (page: string) => boolean
  isProtectedRoute: (page: string) => boolean
  initializeNavigation: () => () => void
  validRoutes: string[]
  protectedRoutes: string[]
}

interface LocalizedNavItem {
  id: string
  label: string
  icon: string
}


// Navigation state management
const currentPage = ref('home')

// Valid routes for the application
const validRoutes = [
  'home', 'people', 'research', 'publications', 'teaching', 
  'events', 'projects', 'vacancies', 'awards',
  'login', 'register',
  'publication-form', 'event-form', 'project-form', 'member-form',
  'research-form', 'teaching-form', 'award-form', 'vacancy-form',
  'user-settings-form', 'admin-management-form'
]

// Protected routes that require authentication
const protectedRoutes = [
  'publication-form', 'event-form', 'project-form', 'member-form',
  'research-form', 'teaching-form', 'award-form', 'vacancy-form',
  'user-settings-form', 'admin-management-form'
]

// Browser history management
const updateBrowserHistory = (page: string) => {
  const path = page === 'home' ? '/' : `/${page}`
  const title = `STIL - ${page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' ')}`
  
  // Update browser URL without reloading page
  window.history.pushState({ page }, title, path)
  document.title = title
}

// Handle browser back/forward buttons
const handlePopState = (event: PopStateEvent) => {
  const page = event.state?.page ?? 'home'
  if (validRoutes.includes(page)) {
    currentPage.value = page
  }
}

// Initialize navigation system
const initializeNavigation = () => {
  // Listen for browser navigation
  window.addEventListener('popstate', handlePopState)
  
  // Set initial page from URL
  const path = window.location.pathname
  const page = path === '/' ? 'home' : path.slice(1)
  
  if (validRoutes.includes(page)) {
    currentPage.value = page
  } else {
    currentPage.value = 'home'
    updateBrowserHistory('home')
  }
  
  return () => {
    window.removeEventListener('popstate', handlePopState)
  }
}

/**
 * Navigation composable for SPA routing
 */
export const useNavigation = (): NavigationComposable => {
    const navigateToPage = (page: string) => {
    if (validRoutes.includes(page) && page !== currentPage.value) {
      currentPage.value = page
      updateBrowserHistory(page)
      
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
      // Dispatch custom navigation event for components that need it
      window.dispatchEvent(new CustomEvent('navigationChanged', { 
        detail: { page } 
      }))
    }
  }

  const isCurrentPage = (page: string) => {
    return currentPage.value === page
  }

  const isProtectedRoute = (page: string) => {
    return protectedRoutes.includes(page)
  }

  const currentPageComputed = computed(() => currentPage.value)

  return {
    currentPage: currentPageComputed,
    navigateToPage,
    isCurrentPage,
    isProtectedRoute,
    initializeNavigation,
    validRoutes,
    protectedRoutes
  }
}


export function useMobileNavigation() {
  const mobileMenuOpen = ref(false)
  const { currentLanguage } = useLanguage()

  const navigationItemsComputed = computed((): LocalizedNavItem[] => {
    return navigationItems.map(item => ({
      id: item.id,
      label: item.label[currentLanguage.value as 'en' | 'fr'],
      icon: item.icon
    }))
  })

  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }

  const closeMobileMenu = () => {
    mobileMenuOpen.value = false
  }

  return {
    mobileMenuOpen,
    navigationItems: navigationItemsComputed,
    toggleMobileMenu,
    closeMobileMenu
  }
}