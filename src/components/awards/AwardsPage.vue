<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useAwards } from '@/composables/useAwards'
import { useFilteredAwards } from '@/composables/useFilteredAwards'

// UI Components
import PageHeader from '@/ui/PageHeader.vue'
import SearchAndFilters from '@/ui/SearchAndFilters.vue'
import StatisticsGrid from '@/ui/StatisticsGrid.vue'
import EmptyState from '@/ui/EmptyState.vue'

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
  uniqueOrganizations,
  awardedMembers,
  availableYears,
  totalAwards,
  yearsOfRecognition
} = useAwards()

// Filtered awards composable
const {
  selectedYear,
  selectedOrganization,
  selectedMember,
  filteredAwards,
  updateFilter
} = useFilteredAwards({ awards: allAwards })

// Statistics
const statistics = computed(() => [
  { value: totalAwards.value, label: t.value.awards.statistics.totalAwards },
  { value: uniqueOrganizations.value.length, label: t.value.awards.statistics.organizations },
  { value: awardedMembers.value.length, label: t.value.awards.statistics.awardedMembers },
  { value: yearsOfRecognition.value, label: t.value.awards.statistics.yearsOfRecognition }
])

// Filters configuration
const filters = computed(() => [
  {
    id: 'year',
    label: t.value.awards.filters.year,
    value: selectedYear.value,
    options: [
      { value: '', label: t.value.awards.filters.allYears },
      ...availableYears.value.map(year => ({ value: year.toString(), label: year.toString() }))
    ]
  },
  {
    id: 'organization',
    label: t.value.awards.filters.organization,
    value: selectedOrganization.value,
    options: [
      { value: '', label: t.value.awards.filters.allOrganizations },
      ...uniqueOrganizations.value.map(org => ({ value: org, label: org }))
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
  if (count === 0) return `0 ${t.value.awards.filters.award} ${t.value.awards.filters.found}`
  if (count === 1) return `1 ${t.value.awards.filters.award} ${t.value.awards.filters.found}`
  return `${count} ${t.value.awards.filters.awards} ${t.value.awards.filters.found}${t.value.awards.filters.found}`
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <PageHeader 
      :title="t.awards.pageTitle"
      :subtitle="t.awards.pageSubtitle"
      highlight-word="Prix"
    />

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#08a4d4]"></div>
      <span class="ml-2 text-gray-600">{{ t.common.loading }}</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-red-50 border border-red-200 rounded-lg p-4">
        <div class="flex">
          <div class="text-red-400">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-700">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Statistics -->
      <StatisticsGrid 
        :statistics="statistics"
        :columns="4"
        :title="t.awards.statistics.sectionTitle"
        background-class="bg-gradient-to-r from-yellow-50 to-orange-50"
      />

      <!-- Filters -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <SearchAndFilters
          :filters="filters"
          :results-text="resultsText"
          @update-filter="updateFilter"
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