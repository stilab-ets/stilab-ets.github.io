<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useAwards, type ExtendedAward } from '@/hooks/awards/useAwards'

// UI Components
import PageHeader from '@/components/ui/PageHeader.vue'
import SearchAndFilters from '@/components/ui/SearchAndFilters.vue'
import StatisticsGrid from '@/components/ui/StatisticsGrid.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

// Awards components
import AwardsTimeline from './AwardsTimeline.vue'
import NotableAchievements from './NotableAchievements.vue'

// Language and translations
const { t } = useLanguage()

// Awards composable
const {
  awards: allAwards,
  isLoading,
  error,
  fetchAwards,
  uniqueOrganizations,
  awardedMembers,
  availableYears,
  totalAwards,
  yearsOfRecognition
} = useAwards({ autoFetch: false })

// Filter state
const selectedYear = ref('')
const selectedOrganization = ref('')
const selectedMember = ref('')
const searchQuery = ref('')

// Fetch awards on mount
onMounted(() => {
  fetchAwards()
})

// Filtered awards logic
const filteredAwards = computed(() => {
  return allAwards.value.filter(award => {
    const matchesYear = !selectedYear.value || 
      (award.year && award.year.toString() === selectedYear.value) ||
      (!award.year && new Date(award.date_received).getFullYear().toString() === selectedYear.value)
    
    const matchesOrganization = !selectedOrganization.value || 
      award.award_type === selectedOrganization.value
    
    const matchesMember = !selectedMember.value ||
      (award.recipients && award.recipients.some(recipient => 
        `${recipient.member.first_name} ${recipient.member.last_name}` === selectedMember.value
      ))
    
    const matchesSearch = !searchQuery.value ||
      award.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (award.description && award.description.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (award.award_type && award.award_type.toLowerCase().includes(searchQuery.value.toLowerCase()))

    return matchesYear && matchesOrganization && matchesMember && matchesSearch
  })
})

// Statistics
const statistics = computed(() => [
  {
    label: t.value.awards.statistics.totalAwards,
    value: totalAwards.value.toString(),
    icon: 'award',
    color: 'bg-yellow-500'
  },
  {
    label: t.value.awards.statistics.organizations,
    value: uniqueOrganizations.value.length.toString(),
    icon: 'building',
    color: 'bg-blue-500'
  },
  {
    label: t.value.awards.statistics.awardedMembers,
    value: awardedMembers.value.length.toString(),
    icon: 'users',
    color: 'bg-green-500'
  },
  {
    label: t.value.awards.statistics.yearsOfRecognition,
    value: yearsOfRecognition.value.toString(),
    icon: 'calendar',
    color: 'bg-purple-500'
  }
])

// Filters configuration
const filters = computed(() => [
  {
    id: 'year',
    label: t.value.awards.filters.year,
    value: selectedYear.value,
    options: [
      { value: '', label: t.value.awards.filters.allYears },
      ...availableYears.value.map(year => ({
        value: year.toString(),
        label: year.toString()
      }))
    ]
  },
  {
    id: 'organization',
    label: t.value.awards.filters.organization,
    value: selectedOrganization.value,
    options: [
      { value: '', label: t.value.awards.filters.allOrganizations },
      ...uniqueOrganizations.value.map(org => ({
        value: org,
        label: org
      }))
    ]
  },
  {
    id: 'member',
    label: t.value.awards.filters.member,
    value: selectedMember.value,
    options: [
      { value: '', label: t.value.awards.filters.allMembers },
      ...awardedMembers.value.map(member => ({
        value: member,
        label: member
      }))
    ]
  }
])

// Results text
const resultsText = computed(() => {
  const count = filteredAwards.value.length
  if (count === 0) return `0 ${t.value.awards.results.award}`
  if (count === 1) return `1 ${t.value.awards.results.award}`
  return `${count} ${t.value.awards.results.awards}`
})

// Filter update method
const updateFilter = (filterId: string, value: string) => {
  switch (filterId) {
    case 'year':
      selectedYear.value = value
      break
    case 'organization':
      selectedOrganization.value = value
      break
    case 'member':
      selectedMember.value = value
      break
    case 'search':
      searchQuery.value = value
      break
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <PageHeader 
      :title="t.awards.pageTitle"
      :subtitle="t.awards.pageSubtitle"
      highlight-word="Awards"
    />

    <!-- Loading State -->
    <div v-if="isLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-red-50 border border-red-200 rounded-md p-4">
        <div class="flex">
          <div class="text-red-400">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{{ error }}</p>
            <button
              @click="fetchAwards"
              class="mt-2 text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded transition-colors"
            >
              {{ t.common.retry }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Statistics -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatisticsGrid :statistics="statistics" />
      </div>

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

      <!-- Awards Timeline -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <AwardsTimeline 
          v-if="filteredAwards.length > 0"
          :awards="filteredAwards"
        />
        
        <!-- Empty State -->
        <EmptyState 
          v-else
          :title="t.awards.empty.title"
          :message="t.awards.empty.message"
          icon="star"
        />
      </div>

      <!-- Notable Achievements Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <NotableAchievements :all-awards="allAwards" />
      </div>
    </template>
  </div>
</template>