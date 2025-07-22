import { ref, computed } from 'vue'
import axios from 'axios'

export interface User {
  id: string
  username: string
  email: string
  first_name?: string
  last_name?: string
  role?: string
}

interface LoginCredentials {
  email: string
  password: string
  rememberMe: boolean
}

interface AuthResponse {
  access_token: string
  refresh_token: string
  user: User
}

const isAuthenticated = ref(false)
const user = ref<User | null>(null)
const accessToken = ref<string | null>(null)
const refreshToken = ref<string | null>(null)

export const useAuth = () => {
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const response = await axios.post<AuthResponse>('/auth/login/', {
        username_or_email: credentials.email,
        password: credentials.password
      })

      const { access_token, refresh_token, user: userData } = response.data

      accessToken.value = access_token
      refreshToken.value = refresh_token
      user.value = userData
      isAuthenticated.value = true

      // Store tokens in localStorage
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)

      // Set default axios authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    try {
      isAuthenticated.value = false
      user.value = null
      accessToken.value = null
      refreshToken.value = null

      // Clear tokens from localStorage
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')

      // Remove axios authorization header
      delete axios.defaults.headers.common['Authorization']
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const initializeAuth = (): void => {
    const storedAccessToken = localStorage.getItem('access_token')
    const storedRefreshToken = localStorage.getItem('refresh_token')

    if (storedAccessToken && storedRefreshToken) {
      accessToken.value = storedAccessToken
      refreshToken.value = storedRefreshToken
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedAccessToken}`
      
      // Verify token validity and get user data
      fetchUserProfile()
    }
  }

  const fetchUserProfile = async (): Promise<void> => {
    try {
      const response = await axios.get('/profile/')
      user.value = response.data.user
      isAuthenticated.value = true
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      logout()
    }
  }

  const refreshAccessToken = async (): Promise<void> => {
    try {
      if (!refreshToken.value) {
        throw new Error('No refresh token available')
      }

      const response = await axios.post('/auth/refresh/', {
        refresh: refreshToken.value
      })

      const { access } = response.data
      accessToken.value = access
      localStorage.setItem('access_token', access)
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
    } catch (error) {
      console.error('Token refresh failed:', error)
      logout()
      throw error
    }
  }

  const fullName = computed(() => {
    if (!user.value) return ''
    return `${user.value.first_name || ''} ${user.value.last_name || ''}`.trim() || user.value.username
  })

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    user: computed(() => user.value),
    fullName,
    login,
    logout,
    initializeAuth,
    refreshAccessToken
  }
}