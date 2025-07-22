<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useUserAuth } from '@/hooks/auth/useUserAuth'
import { useLanguage } from '@/composables/useLanguage'

const { user, isAuthenticated, isLoading } = useUserAuth()
const { t } = useLanguage()

const userRole = computed(() => {
  if (!user.value) return 'guest'
  if (user.value.is_staff) return 'admin'
  
  const roleMap: Record<string, string> = {
    'professor': 'professor',
    'researcher': 'professor',
    'postdoc': 'professor',
    'phd': 'student',
    'master': 'student',
    'engineer': 'professor'
  }
  
  return roleMap[user.value.role] || 'student'
})

const dashboardComponent = computed(() => {
  switch (userRole.value) {
    case 'admin':
      return 'AdminDashboard'
    case 'professor':
      return 'ProfessorDashboard'
    case 'student':
      return 'StudentDashboard'
    default:
      return null
  }
})

const shouldRedirectToLogin = computed(() => {
  return !isAuthenticated.value && !isLoading.value
})

onMounted(() => {
  // Additional initialization if needed
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p class="mt-4 text-gray-600">{{ t.common.loading }}</p>
      </div>
    </div>

    <!-- Unauthorized Access -->
    <div v-else-if="shouldRedirectToLogin" class="flex items-center justify-center min-h-screen">
      <Card class="p-8 max-w-md w-full mx-4">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="mt-2 text-sm font-medium text-gray-900">Access Denied</h3>
          <p class="mt-1 text-sm text-gray-500">
            You need to be logged in to access the dashboard.
          </p>
          <div class="mt-6">
            <Button 
              @click="$emit('navigate', 'login')"
              variant="primary"
            >
              Go to Login
            </Button>
          </div>
        </div>
      </Card>
    </div>

    <!-- Dashboard Content -->
    <div v-else-if="dashboardComponent">
      <component :is="dashboardComponent" />
    </div>

    <!-- Unknown Role Fallback -->
    <div v-else class="flex items-center justify-center min-h-screen">
      <Card class="p-8 max-w-md w-full mx-4">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
            <svg class="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="mt-2 text-sm font-medium text-gray-900">Dashboard Unavailable</h3>
          <p class="mt-1 text-sm text-gray-500">
            Your user role doesn't have access to a dashboard yet.
          </p>
          <div class="mt-6">
            <Button 
              @click="$emit('navigate', 'home')"
              variant="secondary"
            >
              Go to Home
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
