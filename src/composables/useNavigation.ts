import { ref, computed } from 'vue'

// Navigation state management
const currentPage = ref('home')

// Browser history management
const updateBrowserHistory = (page: string) => {
  const path = page === 'home' ? '/' : `/${page}`
  const title = `STIL - ${page.charAt(0).toUpperCase() + page.slice(1)}`
  
  // Update browser URL without reloading page
  window.history.pushState({ page }, title, path)
  document.title = title
}

// Handle browser back/forward buttons
const handlePopState = (event: PopStateEvent) => {
  const page = event.state?.page ?? 'home'
  currentPage.value = page
}

// Initialize navigation system
const initializeNavigation = () => {
  // Listen for browser navigation
  window.addEventListener('popstate', handlePopState)
  
  // Set initial page from URL
  const path = window.location.pathname
  const page = path === '/' ? 'home' : path.slice(1)
  currentPage.value = page
  
  return () => {
    window.removeEventListener('popstate', handlePopState)
  }
}

/**
 * Navigation composable for SPA routing
 */
export const useNavigation = () => {
  const navigateToPage = (page: string) => {
    if (page !== currentPage.value) {
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

  const getCurrentPage = computed(() => currentPage.value)

  return {
    currentPage: getCurrentPage,
    navigateToPage,
    isCurrentPage,
    initializeNavigation
  }
}