<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useResearch } from '@/hooks/useResearch'

// UI Components
import PageHeader from '@/components/ui/PageHeader.vue'
import StatisticsGrid from '@/components/ui/StatisticsGrid.vue'

// Research components
import ResearchOverview from './ResearchOverview.vue'
import FeaturedProjects from './FeaturedProjects.vue'

// Language and translations
const { t } = useLanguage()

// Research composable
const { research, isLoading, error, fetchResearch } = useResearch()

// Fetch research data on component mount
onMounted(async () => {
  await fetchResearch()
})

const featuredProjects = computed(() => {
  return research.value
})

// Statistics based on full list
const statistics = computed(() => [
  { value: `${research.value.length}+`, label: t.value.research.overview.activeProjects }
])
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <PageHeader 
      :title="t.research.pageTitle"
      :subtitle="t.research.pageSubtitle"
      highlight-word="Recherches"
    />

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#08a4d4]"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-red-50 border border-red-200 rounded-lg p-6">
        <p class="text-red-800">{{ error }}</p>
      </div>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Research Overview -->
      <ResearchOverview />

      <!-- Statistics -->
      <StatisticsGrid 
        :statistics="statistics"
        :columns="1"
        background-class="bg-gradient-to-r from-blue-50 to-indigo-50"
      />

      <!-- Featured Projects -->
      <FeaturedProjects :projects="featuredProjects" />
    </div>
  </div>
</template>
