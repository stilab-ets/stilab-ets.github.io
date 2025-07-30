<script setup lang="ts">
import { useAdminDashboard } from '@/hooks/dashboard/useAdminDashboard'
import { useLanguage } from '@/composables/useLanguage'
import { Users } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'

const { t } = useLanguage()
const { adminStats, userManagement } = useAdminDashboard()
</script>

<template>
  <div class="space-y-6">
    <Card>
      <div class="p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.dashboard.admin.reports.systemStatistics }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div v-for="stat in adminStats" :key="stat.title" class="text-center">
            <component :is="stat.icon" class="h-8 w-8 mx-auto mb-2 text-gray-600" />
            <div class="text-2xl font-bold text-gray-900">{{ stat.value }}</div>
            <div class="text-sm text-gray-500">{{ stat.title }}</div>
          </div>
        </div>
      </div>
    </Card>

    <Card>
      <div class="p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.dashboard.admin.reports.userAnalytics }}</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="text-center">
            <Users class="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <div class="text-2xl font-bold text-blue-600">{{ userManagement.totalUsers }}</div>
            <div class="text-sm text-gray-500">{{ t.dashboard.admin.reports.totalUsers }}</div>
          </div>
          <div class="text-center">
            <Users class="h-8 w-8 mx-auto mb-2 text-green-600" />
            <div class="text-2xl font-bold text-green-600">{{ userManagement.activeUsers }}</div>
            <div class="text-sm text-gray-500">{{ t.dashboard.admin.reports.activeUsers }}</div>
          </div>
          <div class="text-center">
            <Users class="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <div class="text-2xl font-bold text-purple-600">{{ userManagement.adminUsers }}</div>
            <div class="text-sm text-gray-500">{{ t.dashboard.admin.reports.adminUsers }}</div>
          </div>
          <div class="text-center">
            <Users class="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <div class="text-2xl font-bold text-orange-600">{{ userManagement.recentRegistrations }}</div>
            <div class="text-sm text-gray-500">{{ t.dashboard.admin.reports.newThisWeek }}</div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>