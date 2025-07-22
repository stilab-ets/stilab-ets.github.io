<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useVacancies } from '@/hooks/vacancies/useVacancies'

// UI Components
import PageHeader from '@/components/ui/PageHeader.vue'
import SearchAndFilters from '@/components/ui/SearchAndFilters.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

// Vacancies components
import VacanciesInfoBanner from './VacanciesInfoBanner.vue'
import VacancyCard from './VacancyCard.vue'

// Language and translations
const { t } = useLanguage()

// Use vacancies hook
const {
  vacancies,
  isLoading,
  error,
  fetchVacancies,
  filteredVacancies,
  activeVacancies,
  upcomingDeadlines,
  uniqueTypes,
  uniqueSupervisors,
  clearError
} = useVacancies()

// Filter state
const searchQuery = ref('')
const selectedType = ref('')
const selectedSupervisor = ref('')
const sortBy = ref('deadline-asc')

// Fetch vacancies on mount
onMounted(() => {
  fetchVacancies()
})

// Computed filtered and sorted vacancies
const processedVacancies = computed(() => {
  // First filter
  let filtered = filteredVacancies(searchQuery.value, selectedType.value, selectedSupervisor.value)
  
  // Only show active vacancies
  filtered = filtered.filter(vacancy => vacancy.is_active)
  
  // Then sort
  switch (sortBy.value) {
    case 'deadline-asc':
      return filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    case 'deadline-desc':
      return filtered.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime())
    case 'type':
      return filtered.sort((a, b) => a.type.localeCompare(b.type))
    case 'recent':
      return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    default:
      return filtered
  }
})

// Filters configuration
const filters = computed(() => [
  {
    id: 'type',
    label: t.value.vacancies.filters.positionType,
    value: selectedType.value,
    options: [
      { value: '', label: t.value.vacancies.filters.allTypes },
      ...uniqueTypes.value.map(type => ({
        value: type,
        label: (t.value.vacancies.positionTypes as Record<string, string>)[type] || type
      }))
    ]
  },
  {
    id: 'supervisor',
    label: t.value.vacancies.filters.supervisor,
    value: selectedSupervisor.value,
    options: [
      { value: '', label: t.value.vacancies.filters.allSupervisors },
      ...uniqueSupervisors.value.map(supervisor => ({
        value: supervisor,
        label: supervisor
      }))
    ]
  },
  {
    id: 'sort',
    label: t.value.vacancies.filters.sortBy,
    value: sortBy.value,
    options: [
      { value: 'deadline-asc', label: t.value.vacancies.sorting.deadlineClose },
      { value: 'deadline-desc', label: t.value.vacancies.sorting.deadlineFar },
      { value: 'type', label: t.value.vacancies.sorting.positionType },
      { value: 'recent', label: t.value.vacancies.sorting.recent }
    ]
  }
])

// Results text
const resultsText = computed(() => {
  const count = processedVacancies.value.length
  if (count === 0) return `0 ${t.value.vacancies.results.offer} ${t.value.vacancies.results.available}`
  if (count === 1) return `1 ${t.value.vacancies.results.offer} ${t.value.vacancies.results.available}`
  return `${count} ${t.value.vacancies.results.offers} ${t.value.vacancies.results.available}s`
})

// Filter update method
const updateFilter = (filterId: string, value: string) => {
  switch (filterId) {
    case 'type':
      selectedType.value = value
      break
    case 'supervisor':
      selectedSupervisor.value = value
      break
    case 'sort':
      sortBy.value = value
      break
    case 'search':
      searchQuery.value = value
      break
  }
}

// Clear error and retry
const retryFetch = () => {
  clearError()
  fetchVacancies()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <PageHeader 
      :title="t.vacancies.pageTitle"
      :subtitle="t.vacancies.pageSubtitle"
      highlight-word="Recrutements"
    />

    <!-- Information Banner -->
    <VacanciesInfoBanner />

    <!-- Search and Filters -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <SearchAndFilters
        v-model:search-query="searchQuery"
        :filters="filters"
        :results-text="resultsText"
        @update-filter="updateFilter"
        @update:search-query="updateFilter('search', $event)"
      />
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-red-50 border border-red-200 rounded-md p-4">
        <div class="flex">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
            <div class="mt-2">
              <button
                @click="retryFetch"
                class="text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded transition-colors"
              >
                {{ t.common.retry }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Vacancy Cards -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div v-if="processedVacancies.length > 0" class="space-y-6">
          <VacancyCard
            v-for="vacancy in processedVacancies"
            :key="vacancy.id"
            :vacancy="vacancy"
          />
        </div>

        <!-- Empty State -->
        <EmptyState 
          v-else
          :title="t.vacancies.empty.title"
          :message="t.vacancies.empty.message"
          icon="briefcase"
        />
      </div>
    </template>
  </div>
</template>
