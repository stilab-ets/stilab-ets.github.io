<script setup lang="ts">
import { computed } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import { invitationsTranslations } from '@/data/translations/invitations.translate';
import Card from '@/components/ui/Card.vue';

interface InvitationStats {
  total: number;
  pending: number;
  registered: number;
  expired: number;
}

const props = defineProps<{
  stats: InvitationStats;
  isLoading: boolean;
}>();

const { currentLanguage } = useLanguage();
const t = computed(() => invitationsTranslations[currentLanguage.value].stats);

// Calculate percentages for visual indicators
const percentages = computed(() => {
  const total = props.stats.total || 1; // Avoid division by zero
  return {
    pending: Math.round((props.stats.pending / total) * 100),
    registered: Math.round((props.stats.registered / total) * 100),
    expired: Math.round((props.stats.expired / total) * 100),
  };
});
</script>

<template>
  <div class="space-y-6">
    <!-- Loading state -->
    <div
      v-if="isLoading"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div v-for="i in 4" :key="i" class="animate-pulse">
        <Card class="p-6">
          <div class="h-16 bg-gray-200 rounded"></div>
        </Card>
      </div>
    </div>

    <!-- Stats grid -->
    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Total Invitations -->
      <Card class="p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div
              class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ t.total }}</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ stats.total || 0 }}
            </p>
          </div>
        </div>
      </Card>

      <!-- Pending Invitations -->
      <Card class="p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div
              class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-yellow-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ t.pending }}</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ stats.pending || 0 }}
            </p>
            <div class="mt-1">
              <div class="flex items-center text-xs text-yellow-600">
                <span>{{ percentages.pending }}% of total</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <!-- Registered Users -->
      <Card class="p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div
              class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ t.registered }}</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ stats.registered || 0 }}
            </p>
            <div class="mt-1">
              <div class="flex items-center text-xs text-green-600">
                <span>{{ percentages.registered }}% of total</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <!-- Expired Invitations -->
      <Card class="p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div
              class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-red-600"
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
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ t.expired }}</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ stats.expired || 0 }}
            </p>
            <div class="mt-1">
              <div class="flex items-center text-xs text-red-600">
                <span>{{ percentages.expired }}% of total</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <!-- Visual progress bars -->
    <Card v-if="!isLoading && stats.total > 0" class="p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-4">
        Invitation Distribution
      </h4>
      <div class="space-y-4">
        <!-- Pending progress -->
        <div>
          <div class="flex justify-between text-sm text-gray-600 mb-1">
            <span>Pending</span>
            <span>{{ stats.pending }}/{{ stats.total }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-yellow-400 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${percentages.pending}%` }"
            ></div>
          </div>
        </div>

        <!-- Registered progress -->
        <div>
          <div class="flex justify-between text-sm text-gray-600 mb-1">
            <span>Registered</span>
            <span>{{ stats.registered }}/{{ stats.total }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-green-400 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${percentages.registered}%` }"
            ></div>
          </div>
        </div>

        <!-- Expired progress -->
        <div>
          <div class="flex justify-between text-sm text-gray-600 mb-1">
            <span>Expired</span>
            <span>{{ stats.expired }}/{{ stats.total }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-red-400 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${percentages.expired}%` }"
            ></div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
