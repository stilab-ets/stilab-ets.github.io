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

// Filters configuration
const filters = computed(() => [
  {
    id: 'year',
    label: t.value.publications.filters.year,
    value: selectedYear.value,
    options: [
      { value: '', label: t.value.publications.filters.allYears },
      ...availableYears.value.map(year => ({ 
        value: year.toString(), 
        label: year.toString() 
      }))
    ]
  },
  {
    id: 'type',
    label: t.value.publications.filters.type,
    value: selectedType.value,
    options: [
      { value: '', label: t.value.publications.filters.allTypes },
      ...availableEntryTypes.value.map(type => ({ 
        value: type, 
        label: type 
      }))
    ]
  }
])

// Results text
const resultsText = computed(() => {
  const count = resultsCount.value
  if (count === 0) return `0 ${t.value.publications.results.publications} ${t.value.publications.results.found}`
  if (count === 1) return `1 ${t.value.publications.results.publication} ${t.value.publications.results.found}`
  return `${count} ${t.value.publications.results.publications} ${t.value.publications.results.found}`
})

// Error handling
const handleRetry = () => {
  clearError()
  fetchPublications()
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

    <!-- Error State -->
    <div v-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-red-50 border border-red-200 rounded-md p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              {{ error }}
            </h3>
            <div class="mt-2">
              <button
                @click="handleRetry"
                class="bg-red-100 px-2 py-1 rounded text-sm text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {{ t.common.retry }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="isLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#08a4d4]"></div>
        <p class="mt-2 text-sm text-gray-600">{{ t.common.loading }}</p>
      </div>
    </div>

    <!-- Content -->
    <template v-else>
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
    </template>
  </div>
</template>