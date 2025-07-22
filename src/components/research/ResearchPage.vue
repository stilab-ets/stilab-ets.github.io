<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

// UI Components
import PageHeader from '@/components/ui/PageHeader.vue'
import StatisticsGrid from '@/components/ui/StatisticsGrid.vue'

// Research components
import ResearchOverview from './ResearchOverview.vue'
import FeaturedProjects from './FeaturedProjects.vue'

// Language and translations
const { t } = useLanguage()

// State
const researchProjects = ref([])

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
// Fetch API on component mount
onMounted(async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/researches`)
    if (!res.ok) throw new Error('Failed to fetch research data')
    researchProjects.value = await res.json()
  } catch (error) {
    console.error(error)
  }
})

// Featured Projects: just take first 4 for now
const featuredProjects = computed(() => {
  return researchProjects.value.slice(0, 4)
})

// Statistics (dynamic length from API)
const statistics = computed(() => [
  { value: `${researchProjects.value.length}+`, label: t.value.research.overview.activeProjects }
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
</template>
