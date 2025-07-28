import { ref, computed, type Ref } from 'vue'
import type { Publication } from '@/services/MainAPI'

export interface UsePublicationFiltersReturn {
  searchQuery: Ref<string>
  selectedYear: Ref<string>
  selectedType: Ref<string>
  sortBy: Ref<string>
  filteredPublications: Ref<Publication[]>
  sortedPublications: Ref<Publication[]>
  availableYears: Ref<number[]>
  availableEntryTypes: Ref<string[]>
  resultsCount: Ref<number>
  updateFilter: (filterId: string, value: string) => void
  filterByAuthor: (author: string) => void
  clearFilters: () => void
}

export function usePublicationFilters(publications: Ref<Publication[]>): UsePublicationFiltersReturn {
  const searchQuery = ref('')
  const selectedYear = ref('')
  const selectedType = ref('')
  const sortBy = ref('year-desc')

  // Compute available years for filter dropdown
  const availableYears = computed(() => {
    const yearsSet = new Set<number>()
    publications.value.forEach(pub => {
      if (pub.year) yearsSet.add(pub.year)
    })
    return Array.from(yearsSet).sort((a, b) => b - a)
  })

  // Compute unique entry types for type filter dropdown
  const availableEntryTypes = computed(() => {
    const typesSet = new Set<string>()
    publications.value.forEach(pub => {
      if (pub.publication_type) typesSet.add(pub.publication_type)
    })
    return Array.from(typesSet).sort()
  })

  // Filter publications based on search, year, and type
  const filteredPublications = computed(() => {
    return publications.value.filter(pub => {
      // Search filter (title, authors, journal)
      const searchLower = searchQuery.value.toLowerCase()
      const matchesSearch =
        !searchQuery.value ||
        pub.title?.toLowerCase().includes(searchLower) ||
        pub.authors?.toLowerCase().includes(searchLower) ||
        pub.journal?.toLowerCase().includes(searchLower)

      // Year filter
      const matchesYear = !selectedYear.value || pub.year?.toString() === selectedYear.value

      // Type filter
      const matchesType = !selectedType.value || pub.publication_type === selectedType.value

      return matchesSearch && matchesYear && matchesType
    })
  })

  // Sort filtered publications
  const sortedPublications = computed(() => {
    const sorted = [...filteredPublications.value]

    switch (sortBy.value) {
      case 'year-desc':
        return sorted.sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
      case 'year-asc':
        return sorted.sort((a, b) => (a.year ?? 0) - (b.year ?? 0))
      case 'title-asc':
        return sorted.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''))
      default:
        return sorted
    }
  })

  const resultsCount = computed(() => filteredPublications.value.length)

  const updateFilter = (filterId: string, value: string) => {
    switch (filterId) {
      case 'year':
        selectedYear.value = value
        break
      case 'type':
        selectedType.value = value
        break
      case 'sort':
        sortBy.value = value
        break
    }
  }

  const filterByAuthor = (author: string) => {
    searchQuery.value = author
  }

  const clearFilters = () => {
    searchQuery.value = ''
    selectedYear.value = ''
    selectedType.value = ''
    sortBy.value = 'year-desc'
  }

  return {
    searchQuery,
    selectedYear,
    selectedType,
    sortBy,
    filteredPublications,
    sortedPublications,
    availableYears,
    availableEntryTypes,
    resultsCount,
    updateFilter,
    filterByAuthor,
    clearFilters
  }
}