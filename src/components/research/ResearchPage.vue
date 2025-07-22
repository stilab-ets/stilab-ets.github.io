<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useResearch } from '@/composables/useResearch'

// UI Components
import PageHeader from '@/components/ui/PageHeader.vue'
import StatisticsGrid from '@/components/ui/StatisticsGrid.vue'

// Research components
import ResearchOverview from './ResearchOverview.vue'
import FeaturedProjects from './FeaturedProjects.vue'
import ResearchAreasAccordion from './ResearchAreasAccordion.vue'

// Language and translations
const { t } = useLanguage()

// Research composable
const { 
  research, 
  isLoading, 
  error, 
  fetchResearch, 
  activeProjects, 
  featuredProjects 
} = useResearch()

// Fetch research data on component mount
onMounted(async () => {
  await fetchResearch()
})

// Statistics based on research data
const statistics = computed(() => [
  { 
    value: `${activeProjects.value.length}+`, 
    label: t.value.research.overview.activeProjects 
  }
])

// Research areas data
const researchAreas = computed(() => [
  {
    id: '1',
    name: t.value.research.domains.softwareArchitecture.title,
    description: t.value.research.domains.softwareArchitecture.description,
    icon: '🏗️'
  },
  {
    id: '2', 
    name: t.value.research.domains.artificialIntelligence.title,
    description: t.value.research.domains.artificialIntelligence.description,
    icon: '🤖'
  },
  {
    id: '3',
    name: t.value.research.domains.cybersecurity.title,
    description: t.value.research.domains.cybersecurity.description,
    icon: '🔒'
  },
  {
    id: '4',
    name: t.value.research.domains.devops.title,
    description: t.value.research.domains.devops.description,
    icon: '⚙️'
  },
  {
    id: '5',
    name: t.value.research.domains.cloudComputing.title,
    description: t.value.research.domains.cloudComputing.description,
    icon: '☁️'
  },
  {
    id: '6',
    name: t.value.research.domains.softwareTesting.title,
    description: t.value.research.domains.softwareTesting.description,
    icon: '🧪'
  },
  {
    id: '7',
    name: t.value.research.domains.softwareMaintenance.title,
    description: t.value.research.domains.softwareMaintenance.description,
    icon: '🔧'
  },
  {
    id: '8',
    name: t.value.research.domains.humanComputerInteraction.title,
    description: t.value.research.domains.humanComputerInteraction.description,
    icon: '👤'
  }
])

// Function to get projects by domain
const getProjectsByDomain = (domainName: string) => {
  // For now, return all research projects since the API doesn't have domain filtering
  return research.value.map(project => ({
    id: project.id.toString(),
    title: project.title,
    description: project.description,
    leadResearcher: project.team_members[0] || 'Unknown'
  }))
}
const formattedFeaturedProjects = computed(() => {
  return featuredProjects.value.map(project => ({
    id: project.id.toString(),
    title: project.title,
    start_date: new Date(project.start_date).toLocaleDateString(),
    end_date: project.end_date ? new Date(project.end_date).toLocaleDateString() : null,
    description: project.description,
    funding_source: project.funding_source,
    funding_amount: project.funding_amount,
    status: project.status,
    team_members: project.team_members || []
  }))
})
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
      <FeaturedProjects :projects="formattedFeaturedProjects" />

      <!-- Research Areas -->
      <ResearchAreasAccordion 
        :research-areas="researchAreas" 
        :get-projects-by-domain="getProjectsByDomain" 
      />
    </div>
  </div>
</template>