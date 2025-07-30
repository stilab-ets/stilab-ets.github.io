<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAdminDashboard } from '@/hooks/dashboard/useAdminDashboard'
import { useLanguage } from '@/composables/useLanguage'
import DashboardHeader from '../common/DashboardHeader.vue'
import DashboardTabs from '../common/DashboardTabs.vue'
import DashboardStats from '../common/DashboardStats.vue'
import AdminOverview from './AdminOverview.vue'
import AdminUserManagement from './AdminUserManagement.vue'
import AdminContentManagement from './AdminContentManagement.vue'
import AdminInvitations from './AdminInvitations.vue'
import AdminReports from './AdminReports.vue'

const { t } = useLanguage()
const {
  tabs,
  adminStats,
  isLoading
} = useAdminDashboard()

const activeTab = ref('overview')

const currentTabComponent = computed(() => {
  switch (activeTab.value) {
    case 'overview':
      return AdminOverview
    case 'users':
      return AdminUserManagement
    case 'invitations':
      return AdminInvitations
    case 'content':
      return AdminContentManagement
    case 'reports':
      return AdminReports
    default:
      return AdminOverview
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <DashboardHeader 
      :title="t.dashboard.admin.title"
      :subtitle="t.dashboard.admin.welcome"
    />
    
    <DashboardTabs 
      v-model="activeTab"
      :tabs="tabs"
    />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Dashboard Content -->
      <div v-else>
        <!-- Overview Tab - Show stats at top -->
        <DashboardStats 
          v-if="activeTab === 'overview'"
          :stats="adminStats"
          class="mb-8"
        />

        <!-- Dynamic Tab Content -->
        <component :is="currentTabComponent" />
      </div>
    </div>
  </div>
</template>