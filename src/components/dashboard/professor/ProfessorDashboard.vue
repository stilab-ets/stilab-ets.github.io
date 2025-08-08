<script setup lang="ts">
import { ref, computed } from 'vue';
import { useProfessorDashboard } from '@/hooks/dashboard/useProfessorDashboard';
import { useLanguage } from '@/composables/useLanguage';
import DashboardHeader from '../common/DashboardHeader.vue';
import DashboardTabs from '../common/DashboardTabs.vue';
import DashboardStats from '../common/DashboardStats.vue';
import ProfessorOverview from './ProfessorOverview.vue';
import ProfessorPublications from './ProfessorPublications.vue';
import ProfessorTeaching from './ProfessorTeaching.vue';
import ProfessorResearch from './ProfessorResearch.vue';
import ProfessorStudents from './ProfessorStudents.vue';
import ProfessorProfile from './ProfessorProfile.vue';

const { t } = useLanguage();
const { tabs, professorStats, isLoading } = useProfessorDashboard();

const activeTab = ref('overview');

const currentTabComponent = computed(() => {
  switch (activeTab.value) {
    case 'overview':
      return ProfessorOverview;
    case 'publications':
      return ProfessorPublications;
    case 'teaching':
      return ProfessorTeaching;
    case 'research':
      return ProfessorResearch;
    case 'students':
      return ProfessorStudents;
    case 'profile':
      return ProfessorProfile;
    default:
      return ProfessorOverview;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <DashboardHeader
      :title="t.dashboard.professor.title"
      :subtitle="t.dashboard.professor.welcome"
    />

    <DashboardTabs v-model="activeTab" :tabs="tabs" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        />
      </div>

      <!-- Dashboard Content -->
      <div v-else>
        <!-- Overview Tab - Show stats at top -->
        <DashboardStats
          v-if="activeTab === 'overview'"
          :stats="professorStats"
          class="mb-8"
        />

        <!-- Dynamic Tab Content -->
        <component :is="currentTabComponent" />
      </div>
    </div>
  </div>
</template>
