<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { usePublications } from '@/hooks/publications/usePublications'
import { usePublicationFilters } from '@/hooks/publications/usePublicationFilters'

// UI Components
import PageHeader from '@/components/ui/PageHeader.vue'
import SearchAndFilters from '@/components/ui/SearchAndFilters.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

// Publications components
import PublicationCard from './PublicationCard.vue'
import PublicationSortOptions from './PublicationSortOptions.vue'

const { t } = useLanguage()

// Use publications hook
const {
  publications,
  isLoading,
  error,
  fetchPublications,
  clearError
} = usePublications()

// Use filters hook
const {
  searchQuery,
  selectedYear,
  selectedType,
  sortBy,
  sortedPublications,
  availableYears,
  availableEntryTypes,
  resultsCount,
  updateFilter,
  filterByAuthor
} = usePublicationFilters(publications)

// Fetch publications on mount
onMounted(() => {
  fetchPublications()
})

// Filters configuration - with proper null checking and fallbacks
const filters = computed(() => {
  const safeT = t?.value?.publications?.filters || {
    year: 'Year',
    allYears: 'All Years',
    type: 'Type',
    allTypes: 'All Types'
  }
  
  return [
    {
      id: 'year',
      label: safeT.year,
      value: selectedYear.value,
      options: [
        { value: '', label: safeT.allYears },
        ...(availableYears.value || []).map(year => ({ 
          value: year.toString(), 
          label: year.toString() 
        }))
      ]
    },
    {
      id: 'type',
      label: safeT.type,
      value: selectedType.value,
      options: [
        { value: '', label: safeT.allTypes },
        ...(availableEntryTypes.value || []).map(type => ({ 
          value: type, 
          label: type.charAt(0).toUpperCase() + type.slice(1).replace(/_/g, ' ')
        }))
      ]
    }
  ]
})

// Results text - with proper null checking and fallbacks
const resultsText = computed(() => {
  const count = resultsCount.value || 0
  const safeT = t?.value?.publications?.results || {
    publication: 'publication',
    publications: 'publications'
  }
  
  if (count === 0) return `0 ${safeT.publication}`
  if (count === 1) return `1 ${safeT.publication}`
  return `${count} ${safeT.publications}`
})

// Page title and subtitle with fallbacks
const pageTitle = computed(() => t?.value?.publications?.pageTitle || 'Publications')
const pageSubtitle = computed(() => t?.value?.publications?.pageSubtitle || 'Our research publications')
const emptyTitle = computed(() => t?.value?.publications?.empty?.title || 'No publications found')
const emptyMessage = computed(() => t?.value?.publications?.empty?.message || 'No publications match your criteria')
const retryText = computed(() => t?.value?.common?.retry || 'Retry')
const loadingText = computed(() => t?.value?.common?.loading || 'Loading...')

// Clear error and retry fetch
const retryFetch = () => {
  clearError()
  fetchPublications()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <PageHeader 
      :title="pageTitle"
      :subtitle="pageSubtitle"
      highlight-word="Publications"
    />

    <!-- Error State -->
    <div v-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p class="text-red-600 mb-4">{{ error }}</p>
          <button 
            @click="retryFetch"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {{ retryText }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="isLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#08a4d4]"></div>
        <p class="mt-2 text-sm text-gray-600">{{ loadingText }}</p>
      </div>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Search and Filters -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchAndFilters
          :search-query="searchQuery"
          :filters="filters"
          :results-text="resultsText"
          @update:search-query="searchQuery = $event"
          @update-filter="updateFilter"
        />

        <!-- Sort Options -->
        <PublicationSortOptions 
          :sort-by="sortBy"
          @update:sort-by="sortBy = $event as string" 
        />
      </div>

      <!-- Publications Grid -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div v-if="sortedPublications && sortedPublications.length > 0" class="space-y-6">
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
          :title="emptyTitle"
          :message="emptyMessage"
          icon="book"
        />
      </div>
    </template>
  </div>
</template>