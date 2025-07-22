import { ref, computed, onMounted } from 'vue'
import { useAuthMiddleware } from '@/middleware/auth'
import type { User } from '@/services/AuthAPI'

export function useUserAuth() {
  const { 
    isAuthenticated, 
    isLoading, 
    user, 
    login, 
    logout: middlewareLogout, 
    requireAuth, 
    requireAdmin 
  } = useAuthMiddleware()

  const isDropdownOpen = ref(false)

  const fullName = computed(() => {
    if (user.value?.first_name && user.value?.last_name) {
      return `${user.value.first_name} ${user.value.last_name}`
    }
    return user.value?.username || ''
  })

  const userInitials = computed(() => {
    return fullName.value.charAt(0).toUpperCase() || 'U'
  })

  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value
  }

  const closeDropdown = () => {
    isDropdownOpen.value = false
  }

  const handleLogout = async () => {
    await middlewareLogout()
    closeDropdown()
  }

  return {
    isAuthenticated,
    isLoading,
    user,
    fullName,
    userInitials,
    isDropdownOpen,
    requireAuth,
    requireAdmin,
    login,
    logout: handleLogout,
    toggleDropdown,
    closeDropdown
  }
}