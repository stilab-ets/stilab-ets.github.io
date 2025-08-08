<script setup lang="ts">
import { computed } from 'vue';
import { useAuth } from '@/hooks/auth/useAuth';
import { useLanguage } from '@/composables/useLanguage';
import { Settings, LogOut } from 'lucide-vue-next';
import Button from '@/components/ui/Button.vue';

interface Props {
  title: string;
  subtitle?: string;
}

const props = defineProps<Props>();

const { displayName, userInitials, logout } = useAuth();
const { t } = useLanguage();

const currentTime = computed(() => {
  return new Date().toLocaleString();
});

const handleLogout = async () => {
  await logout();
};
</script>

<template>
  <div class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <!-- Title Section -->
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{ title }}</h1>
          <p v-if="subtitle" class="mt-1 text-sm text-gray-600">
            {{ subtitle }}
          </p>
        </div>

        <!-- User Section -->
        <div class="flex items-center space-x-4">
          <!-- User Info -->
          <div class="hidden sm:flex items-center space-x-3">
            <div class="text-right">
              <p class="text-sm font-medium text-gray-900">{{ displayName }}</p>
              <p class="text-xs text-gray-500">{{ currentTime }}</p>
            </div>
            <div
              class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"
            >
              <span class="text-white text-sm font-semibold">{{
                userInitials
              }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Settings class="h-4 w-4" />
              <span class="hidden sm:inline ml-2">{{
                t.dashboard.header.settings
              }}</span>
            </Button>
            <Button variant="outline" size="sm" @click="handleLogout">
              <LogOut class="h-4 w-4" />
              <span class="hidden sm:inline ml-2">{{
                t.dashboard.header.logout
              }}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
