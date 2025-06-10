<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { mockPublications, type Publication } from '@/data/mockPublications'

// UI Components
import PageHeader from '@/components/ui/PageHeader.vue'
import SearchAndFilters from '@/components/ui/SearchAndFilters.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

// Publications components
import PublicationCard from './PublicationCard.vue'
import PublicationSortOptions from './PublicationSortOptions.vue'

// Language and translations
const { t } = useLanguage()

// State
const searchQuery = ref('')
const selectedYear = ref('')
const selectedType = ref('')
const sortBy = ref('year-desc')

// Computed
const availableYears = computed(() => {
  const years = [...new Set(mockPublications.map(p => p.year))].sort((a, b) => b - a)
  return years
})

const filteredPublications = computed(() => {
  return mockPublications.filter(publication => {
    const matchesSearch = !searchQuery.value ||
      publication.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      publication.authors.some(author =>
        author.toLowerCase().includes(searchQuery.value.toLowerCase())
      ) ||
      publication.venue.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      publication.abstract.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesYear = !selectedYear.value ||
      publication.year.toString() === selectedYear.value

    const matchesType = !selectedType.value ||
      publication.type === selectedType.value

    return matchesSearch && matchesYear && matchesType
  })
})

const sortedPublications = computed(() => {
  const sorted = [...filteredPublications.value]

  switch (sortBy.value) {
    case 'year-desc':
      return sorted.sort((a, b) => b.year - a.year)
    case 'year-asc':
      return sorted.sort((a, b) => a.year - b.year)
    case 'citations-desc':
      return sorted.sort((a, b) => b.citations - a.citations)
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return sorted
  }
})

// Filters configuration
const filters = computed(() => [
  {
    id: 'year',
    label: t.value.publications.filters.year,
    value: selectedYear.value,
    options: [
      { value: '', label: t.value.publications.filters.allYears },
      ...availableYears.value.map(year => ({ value: year.toString(), label: year.toString() }))
    ]
  },
  {
    id: 'type',
    label: t.value.publications.filters.type,
    value: selectedType.value,
    options: [
      { value: '', label: t.value.publications.filters.allTypes },
      { value: 'journal', label: t.value.publications.publicationTypes.journal },
      { value: 'conference', label: t.value.publications.publicationTypes.conference },
      { value: 'workshop', label: t.value.publications.publicationTypes.workshop },
      { value: 'thesis', label: t.value.publications.publicationTypes.thesis },
      { value: 'book', label: t.value.publications.publicationTypes.book }
    ]
  }
])

// Results text
const resultsText = computed(() => {
  const count = filteredPublications.value.length
  if (count === 0) return `0 ${t.value.publications.results.publication} ${t.value.publications.results.found}`
  if (count === 1) return `1 ${t.value.publications.results.publication} ${t.value.publications.results.found}`
  return `${count} ${t.value.publications.results.publications} ${t.value.publications.results.found}s`
})

// Methods
const updateFilter = (filterId: string, value: string) => {
  switch (filterId) {
    case 'year':
      selectedYear.value = value
      break
    case 'type':
      selectedType.value = value
      break
  }
}

const filterByAuthor = (author: string) => {
  searchQuery.value = author
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <PageHeader 
      :title="t.publications.pageTitle"
      :subtitle="t.publications.pageSubtitle"
      highlight-word="Publications"
    />

    <!-- Search and Filters -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <SearchAndFilters
        :search-query="searchQuery"
        :search-label="t.publications.search.label"
        :search-placeholder="t.publications.search.placeholder"
        :filters="filters"
        :results-text="resultsText"
        @update:search-query="searchQuery = $event"
        @update-filter="updateFilter"
      />

      <!-- Sort Options -->
      <PublicationSortOptions 
        v-model:sort-by="sortBy"
      />
    </div>

    <!-- Publications Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div v-if="sortedPublications.length > 0" class="space-y-6">
        <PublicationCard
          v-for="publication in sortedPublications"
          :key="publication.id"
          :publication="publication"
          @filter-by-author="filterByAuthor"
        />
      </div>

      <!-- Empty State -->
      <EmptyState 
        v-else
        :title="t.publications.empty.title"
        :message="t.publications.empty.message"
        icon="book"
      />
    </div>
  </div>
</template>