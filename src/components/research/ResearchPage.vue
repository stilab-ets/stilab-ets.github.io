<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { mockProjects, type Project } from '@/data/mockPublications'
import { researchDomains } from '@/data/mockResearchers'

// UI Components
import PageHeader from '@/components/ui/PageHeader.vue'
import StatisticsGrid from '@/components/ui/StatisticsGrid.vue'

// Research components
import ResearchOverview from './ResearchOverview.vue'
import FeaturedProjects from './FeaturedProjects.vue'
import ResearchAreasAccordion from './ResearchAreasAccordion.vue'

// Language and translations
const { t } = useLanguage()

// Computed
const featuredProjects = computed(() => {
  return mockProjects.filter(project => project.status === 'active').slice(0, 4)
})

// Research areas with descriptions and icons
const researchAreas = [
  {
    id: 'software-architecture',
    name: 'Software Architecture',
    description: t.value.research.domains.softwareArchitecture.description,
    icon: '🏗️'
  },
  {
    id: 'artificial-intelligence',
    name: 'Machine Learning',
    description: t.value.research.domains.artificialIntelligence.description,
    icon: '🤖'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: t.value.research.domains.cybersecurity.description,
    icon: '🔒'
  },
  {
    id: 'devops',
    name: 'DevOps',
    description: t.value.research.domains.devops.description,
    icon: '⚙️'
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    description: t.value.research.domains.cloudComputing.description,
    icon: '☁️'
  },
  {
    id: 'software-testing',
    name: 'Software Testing',
    description: t.value.research.domains.softwareTesting.description,
    icon: '🧪'
  },
  {
    id: 'software-maintenance',
    name: 'Software Maintenance',
    description: t.value.research.domains.softwareMaintenance.description,
    icon: '🔧'
  },
  {
    id: 'human-computer-interaction',
    name: 'Human-Computer Interaction',
    description: t.value.research.domains.humanComputerInteraction.description,
    icon: '👥'
  }
]

// Statistics
const statistics = computed(() => [
  { value: `${mockProjects.length}+`, label: t.value.research.overview.activeProjects },
  { value: researchDomains.length, label: t.value.research.overview.researchDomains },
  { value: '5+', label: t.value.research.overview.industryPartners }
])

// Methods
const getProjectsByDomain = (domain: string) => {
  return mockProjects.filter(project =>
    project.domain === domain ||
    project.title.toLowerCase().includes(domain.toLowerCase()) ||
    project.description.toLowerCase().includes(domain.toLowerCase())
  )
}
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
      :columns="3"
      background-class="bg-gradient-to-r from-blue-50 to-indigo-50"
    />

    <!-- Featured Projects -->
    <FeaturedProjects :projects="featuredProjects" />

    <!-- Research Areas Accordion -->
    <ResearchAreasAccordion 
      :research-areas="researchAreas"
      :get-projects-by-domain="getProjectsByDomain"
    />
  </div>
</template>