<script setup lang="ts">
import { computed } from 'vue';
import { useAuth } from '@/hooks/auth/useAuth';
import { useLanguage } from '@/composables/useLanguage';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import AdminDashboard from './admin/AdminDashboard.vue';
import ProfessorDashboard from './professor/ProfessorDashboard.vue';
import StudentDashboard from './student/StudentDashboard.vue';

const emit = defineEmits<{
  navigate: [page: string];
}>();

const {
  isAuthenticated,
  isLoading,
  userRole,
  canAccessDashboard,
  basicUserInfo,
} = useAuth();

const { t } = useLanguage();

const dashboardComponent = computed(() => {
  // Use staff status from basic user info first
  if (basicUserInfo.value?.is_staff) {
    return AdminDashboard;
  }

  // Then check computed role
  switch (userRole.value) {
    case 'admin':
      return AdminDashboard;
    case 'professor':
    case 'researcher':
      return ProfessorDashboard;
    case 'student':
      return StudentDashboard;
    default:
      // Default to student dashboard for authenticated users
      if (basicUserInfo.value) {
        return StudentDashboard;
      }
      return null;
  }
});

const shouldRedirectToLogin = computed(() => {
  const shouldRedirect = !isAuthenticated.value && !isLoading.value;
  return shouldRedirect;
});

const handleLoginRedirect = () => {
  emit('navigate', 'login');
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"
        ></div>
        <p class="mt-4 text-gray-600">{{ t.common.loading }}</p>
      </div>
    </div>

    <!-- Unauthorized Access -->
    <div
      v-else-if="shouldRedirectToLogin"
      class="flex items-center justify-center min-h-screen"
    >
      <Card class="p-8 max-w-md w-full mx-4">
        <div class="text-center">
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100"
          >
            <svg
              class="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 class="mt-2 text-sm font-medium text-gray-900">
            {{ t.dashboard.errors.accessDenied.title }}
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ t.dashboard.errors.accessDenied.description }}
          </p>
          <div class="mt-6">
            <Button @click="handleLoginRedirect" class="w-full">
              {{ t.auth.signIn }}
            </Button>
          </div>
        </div>
      </Card>
    </div>

    <!-- Dashboard Content -->
    <div v-else-if="canAccessDashboard && dashboardComponent">
      <component :is="dashboardComponent" />
    </div>

    <!-- Invalid Role or Access Issue -->
    <div v-else class="flex items-center justify-center min-h-screen">
      <Card class="p-8 max-w-md w-full mx-4">
        <div class="text-center">
          <div
            class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100"
          >
            <svg
              class="h-6 w-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 class="mt-2 text-sm font-medium text-gray-900">
            {{ t.dashboard.errors.accessRestricted.title }}
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ t.dashboard.errors.accessRestricted.description }}
          </p>
          <div class="mt-6 space-y-2">
            <Button @click="handleLoginRedirect" class="w-full">
              {{ t.auth.signIn }}
            </Button>
            <Button
              @click="emit('navigate', 'home')"
              variant="outline"
              class="w-full"
            >
              {{ t.navigation.home }}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
