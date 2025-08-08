<script setup lang="ts">
import { computed } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import { useNavigation } from '@/hooks/layout/useNavigation';
import { authMiddleware } from '@/middleware/auth';
import Card from '@/components/ui/Card.vue';

interface Props {
  title: string;
  subtitle?: string;
  successMessage?: string;
  error?: string | null;
  requireAuth?: boolean;
  redirectOnSuccess?: string;
  showLoginPrompt?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  requireAuth: true,
  showLoginPrompt: true,
});

const { t } = useLanguage();
const { navigateToPage } = useNavigation();

// Check if user is authenticated
const isAuthenticated = computed(
  () => authMiddleware.state.isAuthenticated.value
);

// Should show content (form)
const shouldShowContent = computed(() => {
  if (!props.requireAuth) return true;
  return isAuthenticated.value;
});

// Redirect to login
const redirectToLogin = () => {
  navigateToPage('login');
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto p-6">
      <Card variant="elevated" padding="lg">
        <!-- Header -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ title }}
          </h2>
          <p v-if="subtitle" class="text-gray-600 mt-2">
            {{ subtitle }}
          </p>
        </div>

        <!-- Authentication Check -->
        <div
          v-if="requireAuth && !isAuthenticated && showLoginPrompt"
          class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3 text-sm text-yellow-700">
              <span>{{ t.common.mustBeLogged }}. &nbsp;</span>
              <button
                class="font-medium underline hover:text-yellow-600 hover:cursor-pointer"
                @click="redirectToLogin"
              >
                {{ t.common.loginHere }}
              </button>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-5 w-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-green-700">
                {{ t.common.successMessage }}
              </p>
            </div>
          </div>
        </div>

        <!-- Error Messages -->
        <div
          v-if="error"
          class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-5 w-5 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-700">{{ t.common.error }}</p>
            </div>
          </div>
        </div>

        <!-- Form Content (Hidden if not authenticated) -->
        <div v-show="shouldShowContent">
          <slot />
        </div>
      </Card>
    </div>
  </div>
</template>
