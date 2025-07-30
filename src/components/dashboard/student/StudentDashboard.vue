<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStudentDashboard } from '@/hooks/dashboard/useStudentDashboard'
import { useLanguage } from '@/composables/useLanguage'
import DashboardHeader from '../common/DashboardHeader.vue'
import DashboardTabs from '../common/DashboardTabs.vue'
import DashboardStats from '../common/DashboardStats.vue'
import StudentOverview from './StudentOverview.vue'
import StudentProjects from './StudentProjects.vue'
import StudentCourses from './StudentCourses.vue'
import StudentEvents from './StudentEvents.vue'
import StudentProfile from './StudentProfile.vue'

const { t } = useLanguage()
const {
  tabs,
  studentStats,
  isLoading
} = useStudentDashboard()

const activeTab = ref('overview')

const currentTabComponent = computed(() => {
  switch (activeTab.value) {
    case 'overview':
      return StudentOverview
    case 'projects':
      return StudentProjects
    case 'courses':
      return StudentCourses
    case 'events':
      return StudentEvents
    case 'profile':
      return StudentProfile
    default:
      return StudentOverview
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <DashboardHeader 
      :title="t.dashboard.student.title"
      :subtitle="t.dashboard.student.welcome"
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
          :stats="studentStats"
          class="mb-8"
        />

        <!-- Dynamic Tab Content -->
        <component :is="currentTabComponent" />
      </div>
    </div>
  </div>
</template>