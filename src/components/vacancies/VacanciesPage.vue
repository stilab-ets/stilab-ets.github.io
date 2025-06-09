<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { mockVacancies, type Vacancy } from '@/data/mockPublications'

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
const selectedType = ref('')
const selectedTag = ref('')
const sortBy = ref('deadline-asc')

// Computed
const availableTags = computed(() => {
  const allTags = mockVacancies.flatMap(vacancy => vacancy.tags)
  return [...new Set(allTags)].sort()
})

const filteredVacancies = computed(() => {
  return mockVacancies.filter(vacancy => {
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
      return sorted.reverse()
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
  </div>
</template>