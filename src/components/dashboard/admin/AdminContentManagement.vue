<script setup lang="ts">
import { useAdminDashboard } from '@/hooks/dashboard/useAdminDashboard';
import { useLanguage } from '@/composables/useLanguage';
import { FileText, Calendar, Briefcase } from 'lucide-vue-next';
import Card from '@/components/ui/Card.vue';

const { t } = useLanguage();
const { recentContent } = useAdminDashboard();
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card class="p-6 text-center">
        <FileText class="h-8 w-8 mx-auto mb-4 text-blue-600" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          {{ t.dashboard.admin.content.publications.title }}
        </h3>
        <p class="text-gray-600">
          {{ t.dashboard.admin.content.publications.description }}
        </p>
      </Card>
      <Card class="p-6 text-center">
        <Calendar class="h-8 w-8 mx-auto mb-4 text-green-600" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          {{ t.dashboard.admin.content.events.title }}
        </h3>
        <p class="text-gray-600">
          {{ t.dashboard.admin.content.events.description }}
        </p>
      </Card>
      <Card class="p-6 text-center">
        <Briefcase class="h-8 w-8 mx-auto mb-4 text-purple-600" />
        <h3 class="text-lg font-medium text-gray-900 mb-2">
          {{ t.dashboard.admin.content.projects.title }}
        </h3>
        <p class="text-gray-600">
          {{ t.dashboard.admin.content.projects.description }}
        </p>
      </Card>
    </div>

    <Card>
      <div class="p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">
          {{ t.dashboard.admin.content.recentContent.title }}
        </h3>
        <div class="space-y-3">
          <div
            v-for="item in recentContent"
            :key="item.id"
            class="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg"
          >
            <div
              :class="[
                'p-2 rounded-md',
                item.type === 'publication'
                  ? 'bg-blue-100 text-blue-600'
                  : item.type === 'event'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-purple-100 text-purple-600',
              ]"
            >
              <component :is="item.icon" class="h-4 w-4" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">
                {{ item.title }}
              </p>
              <p class="text-xs text-gray-500">
                {{ t.dashboard.admin.content.recentContent.byAuthor }}
                {{ item.author }} • {{ item.timestamp }}
              </p>
            </div>
            <span
              :class="[
                'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                item.status === 'published'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800',
              ]"
            >
              {{
                t.dashboard.admin.content.status[
                  item.status as keyof typeof t.dashboard.admin.content.status
                ]
              }}
            </span>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
