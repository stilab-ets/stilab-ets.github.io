<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { mockMScProjects, type MScProject } from '@/data/mockPublications'

// UI Components
import PageHeader from '@/ui/PageHeader.vue'
import SearchAndFilters from '@/ui/SearchAndFilters.vue'
import EmptyState from '@/ui/EmptyState.vue'

// Projects components
import ProjectsInfoBanner from './ProjectsInfoBanner.vue'
import ProjectCard from './ProjectCard.vue'
import InterestModal from './InterestModal.vue'

// Language and translations
const { t } = useLanguage()

// State
const searchQuery = ref('')
const selectedDomain = ref('')
const selectedStatus = ref('')
const showModal = ref(false)
const selectedProject = ref<MScProject | null>(null)

// Computed
const availableDomains = computed(() => {
  return [...new Set(mockMScProjects.map(project => project.domain))].sort()
})

const filteredProjects = computed(() => {
  return mockMScProjects.filter(project => {
    const matchesSearch = !searchQuery.value ||
      project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.abstract.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.supervisor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.domain.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesDomain = !selectedDomain.value ||
      project.domain === selectedDomain.value

    const matchesStatus = !selectedStatus.value ||
      project.status === selectedStatus.value

    return matchesSearch && matchesDomain && matchesStatus
  })
})

// Filters configuration
const filters = computed(() => [
  {
    id: 'domain',
    label: t.value.projects.filters.domain,
    value: selectedDomain.value,
    options: [
      { value: '', label: t.value.projects.filters.allDomains },
      ...availableDomains.value.map(domain => ({ value: domain, label: domain }))
    ]
  },
  {
    id: 'status',
    label: t.value.projects.filters.status,
    value: selectedStatus.value,
    options: [
      { value: '', label: t.value.projects.filters.allStatuses },
      { value: 'available', label: t.value.projects.filters.available },
      { value: 'assigned', label: t.value.projects.filters.assigned },
      { value: 'completed', label: t.value.projects.filters.completed }
    ]
  }
])

// Results text
const resultsText = computed(() => {
  const count = filteredProjects.value.length
  if (count === 0) return `0 ${t.value.projects.results.project} ${t.value.projects.results.found}`
  if (count === 1) return `1 ${t.value.projects.results.project} ${t.value.projects.results.found}`
  return `${count} ${t.value.projects.results.projects} ${t.value.projects.results.found}s`
})

// Methods
const updateFilter = (filterId: string, value: string) => {
  switch (filterId) {
    case 'domain':
      selectedDomain.value = value
      break
    case 'status':
      selectedStatus.value = value
      break
  }
}

const showInterestForm = (project: MScProject) => {
  selectedProject.value = project
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedProject.value = null
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <PageHeader 
      :title="t.projects.pageTitle"
      :subtitle="t.projects.pageSubtitle"
      highlight-word="Master"
    />

    <!-- Information Banner -->
    <ProjectsInfoBanner />

    <!-- Filters and Search -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <SearchAndFilters
        :search-query="searchQuery"
        :search-label="t.projects.search.label"
        :search-placeholder="t.projects.search.placeholder"
        :filters="filters"
        :results-text="resultsText"
        @update:search-query="searchQuery = $event"
        @update-filter="updateFilter"
      />
    </div>

    <!-- Project Cards -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          @show-interest="showInterestForm"
        />
      </div>

      <!-- Empty State -->
      <EmptyState 
        v-else
        :title="t.projects.empty.title"
        :message="t.projects.empty.message"
        icon="document"
      />
    </div>

    <!-- Interest Form Modal -->
    <InterestModal
      :is-open="showModal"
      :project="selectedProject"
      @close="closeModal"
    />
  </div>
</template>