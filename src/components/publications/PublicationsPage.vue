<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useLanguage } from '@/composables/useLanguage'

// UI Components
import PageHeader from '@/components/ui/PageHeader.vue'
import SearchAndFilters from '@/components/ui/SearchAndFilters.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

// Publications components
import PublicationCard from './PublicationCard.vue'
import PublicationSortOptions from './PublicationSortOptions.vue'

const { t } = useLanguage()

// State
const publications = ref<Array<any>>([]) // will hold fetched publications
const searchQuery = ref('')
const selectedYear = ref('')
const selectedType = ref('')
const sortBy = ref('year-desc')

// Fetch publications on mount
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/publications/')
    publications.value = response.data
  } catch (error) {
    console.error('Failed to fetch publications:', error)
    publications.value = []
  }
})

// Compute available years for filter dropdown
const availableYears = computed(() => {
  const yearsSet = new Set<number>()
  publications.value.forEach(pub => {
    if (pub.year) yearsSet.add(pub.year)
  })
  return Array.from(yearsSet).sort((a, b) => b - a)
})

// Compute unique entrytypes dynamically for type filter dropdown
const availableEntryTypes = computed(() => {
  const typesSet = new Set<string>()
  publications.value.forEach(pub => {
    if (pub.entrytype) typesSet.add(pub.entrytype)
  })
  return Array.from(typesSet).sort()
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
      ...availableEntryTypes.value.map(type => ({ value: type, label: type }))
    ]
  }
])

// Filtered publications based on search, year, and entrytype
const filteredPublications = computed(() => {
  return publications.value.filter(pub => {
    // Search filter (title, authors, journal/booktitle, abstract if any)
    const searchLower = searchQuery.value.toLowerCase()
    const matchesSearch =
      !searchQuery.value ||
      pub.title?.toLowerCase().includes(searchLower) ||
      pub.author?.toLowerCase().includes(searchLower) ||
      (pub.journal && pub.journal.toLowerCase().includes(searchLower)) ||
      (pub.booktitle && pub.booktitle.toLowerCase().includes(searchLower))

    // Year filter
    const matchesYear = !selectedYear.value || pub.year?.toString() === selectedYear.value

    // Type filter (entrytype)
    const matchesType = !selectedType.value || pub.entrytype === selectedType.value

    return matchesSearch && matchesYear && matchesType
  })
})

// Sorted publications
const sortedPublications = computed(() => {
  const sorted = [...filteredPublications.value]

  switch (sortBy.value) {
    case 'year-desc':
      return sorted.sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
    case 'year-asc':
      return sorted.sort((a, b) => (a.year ?? 0) - (b.year ?? 0))
    case 'citations-desc':
      return sorted.sort((a, b) => (b.citations ?? 0) - (a.citations ?? 0))
    case 'title-asc':
      return sorted.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''))
    default:
      return sorted
  }
})

// Results text (you can customize for pluralization)
const resultsText = computed(() => {
  const count = filteredPublications.value.length
  if (count === 0) return `0 ${t.value.publications.results.publications} ${t.value.publications.results.found}`
  if (count === 1) return `1 ${t.value.publications.results.publication} ${t.value.publications.results.found}`
  return `${count} ${t.value.publications.results.publications} ${t.value.publications.results.found}`
})

// Update filter handler
const updateFilter = (filterId: string, value: string) => {
  if (filterId === 'year') selectedYear.value = value
  if (filterId === 'type') selectedType.value = value
}

// When author is clicked in card, filter by that author
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
