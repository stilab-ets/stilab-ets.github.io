<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useProjects } from '@/hooks/projects/useProjects'
import { useProjectFilters } from '@/hooks/projects/useProjectFilters'
import { useProjectInterest } from '@/hooks/projects/useProjectInterest'

// UI Components
import PageHeader from '@/ui/PageHeader.vue'
import SearchAndFilters from '@/ui/SearchAndFilters.vue'
import EmptyState from '@/ui/EmptyState.vue'

// Projects components
import ProjectsInfoBanner from './ProjectsInfoBanner.vue'
import ProjectCard from './ProjectsCard.vue'
import InterestModal from './InterestModal.vue'

const { t } = useLanguage()
const { projects, loading, error, fetchProjects, submitProjectInterest } = useProjects()
const projectInterest = useProjectInterest()

const {
  searchQuery,
  selectedDomain,
  selectedStatus,
  selectedDifficulty,
  availableDomains,
  filteredProjects,
  updateFilter
} = useProjectFilters(projects.value)

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

const resultsText = computed(() => {
  const count = filteredProjects.value.length
  if (count === 0) return `0 ${t.value.projects.results.project} ${t.value.projects.results.found}`
  if (count === 1) return `1 ${t.value.projects.results.project} ${t.value.projects.results.found}`
  return `${count} ${t.value.projects.results.projects} ${t.value.projects.results.found}s`
})

const handleShowInterest = (project: any) => {
  projectInterest.openModal(project)
}

const handleSubmitInterest = async () => {
  const success = await projectInterest.submitInterest(submitProjectInterest)
  if (success) {
    alert('Votre demande a été envoyée avec succès ! Le superviseur vous contactera bientôt.')
  }
}

onMounted(() => {
  fetchProjects()
})
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

    <!-- Error State -->
    <div v-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div class="bg-red-50 border border-red-200 rounded-md p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
          </div>
        </div>
      </div>
    </div>

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

    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#08a4d4]"></div>
        <span class="ml-2 text-gray-600">{{ t.common.loading }}</span>
      </div>
    </div>

    <!-- Project Cards -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          @show-interest="handleShowInterest"
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
      :is-open="projectInterest.isModalOpen.value"
      :project="projectInterest.selectedProject.value"
      :form-data="projectInterest.interestForm.value"
      :submitting="projectInterest.submitting.value"
      :submit-error="projectInterest.submitError.value"
      @close="projectInterest.closeModal"
      @submit="handleSubmitInterest"
      @update:form-data="projectInterest.interestForm.value = $event"
    />
  </div>
</template>