<script setup lang="ts">
import { computed } from 'vue';
import { AlertTriangle, X, RefreshCw } from 'lucide-vue-next';
import { useErrorHandler } from '@/hooks/api/useErrorHandler';
import type { ErrorState } from '@/hooks/api/useErrorHandler';

const props = withDefaults(
  defineProps<{
    showDetails?: boolean;
    maxErrors?: number;
  }>(),
  {
    showDetails: false,
    maxErrors: 5,
  }
);

const { errors, hasErrors, removeError, clearErrors } = useErrorHandler();

const visibleErrors = computed(() => errors.value.slice(-props.maxErrors));

const formatErrorTime = (timestamp: Date) => {
  return timestamp.toLocaleTimeString();
};

const getErrorTypeColor = (status?: number) => {
  if (!status) return 'bg-gray-100 border-gray-300';
  if (status >= 500) return 'bg-red-100 border-red-300';
  if (status >= 400) return 'bg-yellow-100 border-yellow-300';
  return 'bg-blue-100 border-blue-300';
};

const reload = () => {
  window.location.reload();
};
</script>

<template>
  <div v-if="hasErrors" class="fixed top-4 right-4 z-50 max-w-sm">
    <div class="space-y-2">
      <div
        v-for="(error, index) in visibleErrors"
        :key="`${error.timestamp.getTime()}-${index}`"
        :class="[
          'rounded-lg border p-4 shadow-lg backdrop-blur-sm',
          getErrorTypeColor(error.status),
        ]"
      >
        <div class="flex items-start space-x-3">
          <AlertTriangle class="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />

          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-medium text-gray-900">
                Error {{ error.status ? `(${error.status})` : '' }}
              </h4>
              <button
                class="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Dismiss error"
                @click="
                  removeError(errors.length - visibleErrors.length + index)
                "
              >
                <X class="h-4 w-4" />
              </button>
            </div>

            <p class="text-sm text-gray-700 mt-1">
              {{ error.message }}
            </p>

            <div v-if="showDetails" class="mt-2 text-xs text-gray-500">
              {{ formatErrorTime(error.timestamp) }}
            </div>
          </div>
        </div>

        <div
          v-if="error.status && error.status >= 500"
          class="mt-3 flex space-x-2"
        >
          <button
            class="inline-flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
            @click="reload"
          >
            <RefreshCw class="h-3 w-3" />
            <span>Reload Page</span>
          </button>
        </div>
      </div>

      <!-- Clear all button when multiple errors -->
      <div v-if="visibleErrors.length > 1" class="text-center">
        <button
          class="text-xs text-gray-500 hover:text-gray-700 transition-colors"
          @click="clearErrors"
        >
          Clear All ({{ errors.length }})
        </button>
      </div>
    </div>
  </div>
</template>
