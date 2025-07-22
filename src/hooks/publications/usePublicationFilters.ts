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

  // Compute available years for filter dropdown - with null checking
  const availableYears = computed(() => {
    if (!publications.value || !Array.isArray(publications.value)) {
      return []
    }
    
    const yearsSet = new Set<number>()
    publications.value.forEach(pub => {
      if (pub && pub.year && typeof pub.year === 'number') {
        yearsSet.add(pub.year)
      }
    })
    return Array.from(yearsSet).sort((a, b) => b - a)
  })

  // Compute unique entry types for type filter dropdown - with null checking
  const availableEntryTypes = computed(() => {
    if (!publications.value || !Array.isArray(publications.value)) {
      return []
    }
    
    const typesSet = new Set<string>()
    publications.value.forEach(pub => {
      if (pub && pub.publication_type && typeof pub.publication_type === 'string') {
        typesSet.add(pub.publication_type)
      }
    })
    return Array.from(typesSet).sort()
  })

  // Filter publications based on search, year, and type - with null checking
  const filteredPublications = computed(() => {
    if (!publications.value || !Array.isArray(publications.value)) {
      return []
    }
    
    return publications.value.filter(pub => {
      if (!pub) return false
      
      // Search filter (title, authors, journal)
      const searchLower = searchQuery.value.toLowerCase()
      const matchesSearch =
        !searchQuery.value ||
        (pub.title && pub.title.toLowerCase().includes(searchLower)) ||
        (pub.authors && pub.authors.toLowerCase().includes(searchLower)) ||
        (pub.journal && pub.journal.toLowerCase().includes(searchLower))

      // Year filter
      const matchesYear = !selectedYear.value || (pub.year && pub.year.toString() === selectedYear.value)

      // Type filter
      const matchesType = !selectedType.value || (pub.publication_type === selectedType.value)

      return matchesSearch && matchesYear && matchesType
    })
  })

  // Sort filtered publications - with null checking
  const sortedPublications = computed(() => {
    if (!filteredPublications.value || !Array.isArray(filteredPublications.value)) {
      return []
    }
    
    const sorted = [...filteredPublications.value]

    switch (sortBy.value) {
      case 'year-desc':
        return sorted.sort((a, b) => (b?.year ?? 0) - (a?.year ?? 0))
      case 'year-asc':
        return sorted.sort((a, b) => (a?.year ?? 0) - (b?.year ?? 0))
      case 'title-asc':
        return sorted.sort((a, b) => (a?.title ?? '').localeCompare(b?.title ?? ''))
      default:
        return sorted
    }
  })

  const resultsCount = computed(() => filteredPublications.value?.length ?? 0)

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
