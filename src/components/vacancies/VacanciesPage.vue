<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { mainAPI } from '@/services/ApiFactory'
import type { Vacancy } from '@/services/MainAPI'

// UI Components
import PageHeader from '@/ui/PageHeader.vue'
import SearchAndFilters from '@/ui/SearchAndFilters.vue'
import EmptyState from '@/ui/EmptyState.vue'

// Vacancies components
import VacanciesInfoBanner from './VacanciesInfoBanner.vue'
import VacancyCard from './VacancyCard.vue'

// Language and translations
const { t } = useLanguage()

// State
const vacancies = ref<Vacancy[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const selectedType = ref('')
const selectedTag = ref('')
const sortBy = ref('deadline-asc')

// Load vacancies from API
const loadVacancies = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await mainAPI.getVacancies()
    vacancies.value = response.data.results.filter(vacancy => vacancy.is_active)
  } catch (err) {
    console.error('Failed to load vacancies:', err)
    error.value = 'Failed to load vacancies'
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadVacancies()
})

// Computed
const availableTags = computed(() => {
  const allTags = vacancies.value.flatMap(vacancy => vacancy.tags)
  return [...new Set(allTags)].sort()
})

const filteredVacancies = computed(() => {
  return vacancies.value.filter(vacancy => {
    const matchesType = !selectedType.value || vacancy.type === selectedType.value
    const matchesTag = !selectedTag.value || vacancy.tags.includes(selectedTag.value)

    return matchesType && matchesTag
  })
})

const sortedVacancies = computed(() => {
  const sorted = [...filteredVacancies.value]

  switch (sortBy.value) {
    case 'deadline-asc':
      return sorted.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    case 'deadline-desc':
      return sorted.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime())
    case 'type':
      return sorted.sort((a, b) => a.type.localeCompare(b.type))
    case 'recent':
      return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    default:
      return sorted
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
      { value: 'phd', label: t.value.vacancies.positionTypes.phd },
      { value: 'postdoc', label: t.value.vacancies.positionTypes.postdoc },
      { value: 'researcher', label: t.value.vacancies.positionTypes.researcher },
      { value: 'engineer', label: t.value.vacancies.positionTypes.engineer },
      { value: 'intern', label: t.value.vacancies.positionTypes.intern }
    ]
  },
  {
    id: 'tag',
    label: t.value.vacancies.filters.domain,
    value: selectedTag.value,
    options: [
      { value: '', label: t.value.vacancies.filters.allDomains },
      ...availableTags.value.map(tag => ({ value: tag, label: tag }))
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
  const count = sortedVacancies.value.length
  if (count === 0) return `0 ${t.value.vacancies.results.offer} ${t.value.vacancies.results.available}`
  if (count === 1) return `1 ${t.value.vacancies.results.offer} ${t.value.vacancies.results.available}`
  return `${count} ${t.value.vacancies.results.offers} ${t.value.vacancies.results.available}s`
})

// Methods
const updateFilter = (filterId: string, value: string) => {
  switch (filterId) {
    case 'type':
      selectedType.value = value
      break
    case 'tag':
      selectedTag.value = value
      break
    case 'sort':
      sortBy.value = value
      break
  }
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

    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Filters -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <SearchAndFilters
          :filters="filters"
          :results-text="resultsText"
          @update-filter="updateFilter"
        />
      </div>

      <!-- Vacancy Cards -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div v-if="sortedVacancies.length > 0" class="space-y-6">
          <VacancyCard
            v-for="vacancy in sortedVacancies"
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