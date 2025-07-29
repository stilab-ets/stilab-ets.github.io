<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import { useAuth } from '@/hooks/auth/useAuth'
import LoginForm from './LoginForm.vue'
const { getDashboardRoute } = useAuth()

const emit = defineEmits<{
  setCurrentPage: [page: string]
}>()

const { t } = useLanguage()

const handleLoginSuccess = () => {
  // Redirect to dashboard after successful login
  const dashboardRoute = getDashboardRoute.value
  emit('setCurrentPage', `${dashboardRoute}`)
}

const handleLoginFailed = (error: string) => {
  console.warn('Login failed:', error)
  // Error is already displayed in LoginForm component
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="max-w-md w-full">
      <div class="block bg-white rounded-xl shadow-xl p-8">
        <!-- Logo and title -->
        <div class="text-center mb-8">
          <div class="mx-auto w-16 h-16 bg-[#08a4d4] rounded-full flex items-center justify-center mb-4">
            <span class="text-white text-2xl font-bold">S</span>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">STIL Lab</h1>
          <p class="text-gray-600">{{ t.auth.login.subtitle }}</p>
        </div>

        <!-- Login form -->
        <div class="flex items-center justify-center">
          <LoginForm 
            @login-success="handleLoginSuccess" 
            @login-failed="handleLoginFailed"
          />
        </div>

        <!-- Back to home -->
        <div class="mt-4 text-center">
          <button
            @click="emit('setCurrentPage', 'home')"
            class="text-sm text-gray-500 hover:cursor-pointer hover:text-gray-700 transition-colors duration-200"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
