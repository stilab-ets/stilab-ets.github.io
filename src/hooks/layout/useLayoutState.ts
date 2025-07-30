import { ref, computed, watch } from 'vue'
import { useNavigation, useMobileNavigation } from './useNavigation'
import { useAuth } from '@/hooks/auth/useAuth'
import { LanguageCode, useLanguage } from '@/composables/useLanguage'
import { useApiStatus } from '@/hooks/api/useApiStatus'
import { useErrorHandler } from '@/hooks/api/useErrorHandler'

export function useLayoutState() {
  const { 
    currentPage,
    navigateToPage: navigate,
    isCurrentPage,
    isProtectedRoute
  } = useNavigation()

  const {
    mobileMenuOpen,
    navigationItems,
    toggleMobileMenu,
    closeMobileMenu
  } = useMobileNavigation()

  const { 
    isAuthenticated, 
    user, 
    logout,
    requireAuth,
    requireAdmin 
  } = useUserAuth()

  const { 
    currentLanguage, 
    setLanguage,
    t 
  } = useLanguage()

  const { 
    isApiHealthy, 
    checkApiHealth 
  } = useApiStatus()

  const { 
    errors, 
    hasErrors, 
    clearErrors,
    handleApiCall 
  } = useErrorHandler()

  // Loading states
  const isPageLoading = ref(false)
  const isInitializing = ref(true)

  // Initialize the layout
  const initializeLayout = async () => {
    isInitializing.value = true
    try {
      await Promise.all([
        checkApiHealth(),
        // Add other initialization tasks here
      ])
    } catch (error) {
      console.error('Layout initialization failed:', error)
    } finally {
      isInitializing.value = false
    }
  }

  // Page navigation with loading state
  const navigateToPage = async (page: string) => {
    isPageLoading.value = true
    try {
      navigate(page)
      closeMobileMenu()
      
      // Clear any existing errors when navigating
      if (hasErrors.value) {
        clearErrors()
      }
    } finally {
      isPageLoading.value = false
    }
  }

  // Language change handler
  const handleLanguageChange = (language: LanguageCode) => {
    setLanguage(language)
    closeMobileMenu()
  }

  // User logout handler
  const handleUserLogout = async () => {
    await logout()
    navigateToPage('home')
  }

  // Computed properties for layout state
  const layoutState = computed(() => ({
    currentPage: currentPage.value,
    isAuthenticated: isAuthenticated.value,
    user: user.value,
    currentLanguage: currentLanguage.value,
    navigationItems: navigationItems.value,
    mobileMenuOpen: mobileMenuOpen.value,
    isApiHealthy: isApiHealthy.value,
    hasErrors: hasErrors.value,
    isLoading: isPageLoading.value || isInitializing.value
  }))

  // Watch for authentication changes
  watch(isAuthenticated, (newValue) => {
    if (!newValue && currentPage.value && isProtectedRoute(currentPage.value)) {
      navigateToPage('login')
    }
  })

  return {
    // State
    ...layoutState.value,
    errors,
    
    // Actions
    navigateToPage,
    handleLanguageChange,
    handleUserLogout,
    toggleMobileMenu,
    closeMobileMenu,
    clearErrors,
    initializeLayout,
    handleApiCall,

    // Utilities
    requireAuth,
    requireAdmin,
    isCurrentPage,
    isProtectedRoute,
    t
  }
}