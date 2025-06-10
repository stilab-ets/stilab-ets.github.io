<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { mockResearchers } from '@/data/mockResearchers'

// UI Components
import PageHeader from '@/ui/PageHeader.vue'
import SearchAndFilters from '@/ui/SearchAndFilters.vue'
import StatisticsGrid from '@/ui/StatisticsGrid.vue'
import EmptyState from '@/ui/EmptyState.vue'

// Awards components
import AwardsTimeline from './AwardsTimeline.vue'
import NotableAchievements from './NotableAchievements.vue'

// Extended award data structure
interface AwardWithMember {
  member: string;
  award: {
    id: string;
    title: string;
    year: number;
    organization: string;
    icon: string;
  };
  description?: string;
}

// Language and translations
const { t } = useLanguage()

// State
const selectedYear = ref('')
const selectedOrganization = ref('')
const selectedMember = ref('')
const currentYear = new Date().getFullYear()

// Generate all awards from researchers
const allAwards = computed(() => {
  const awards: AwardWithMember[] = []

  mockResearchers.forEach(researcher => {
    researcher.awards.forEach(award => {
      awards.push({
        member: researcher.name,
        award: award,
        description: generateAwardDescription(award.title, researcher.name)
      })
    })
  })

  return awards.sort((a, b) => b.award.year - a.award.year)
})

// Generate description for awards
const generateAwardDescription = (title: string, memberName: string): string => {
  const descriptions: { [key: string]: string } = {
    'Best Paper Award': `Récompense pour l'excellence de la recherche présentée par ${memberName}.`,
    'Excellence in Research Award': `Reconnaissance de la contribution exceptionnelle de ${memberName} à la recherche.`,
    'Distinguished Scientist': `Titre honorifique accordé à ${memberName} pour son expertise reconnue.`,
    'Lifetime Achievement Award': `Prix pour l'ensemble de la carrière exceptionnelle de ${memberName}.`
  }

  return descriptions[title] || `Prix décerné à ${memberName} pour ses contributions remarquables.`
}

// Computed properties
const uniqueOrganizations = computed(() => {
  return [...new Set(allAwards.value.map(a => a.award.organization))].sort()
})

const awardedMembers = computed(() => {
  return [...new Set(allAwards.value.map(a => a.member))].sort()
})

const availableYears = computed(() => {
  return [...new Set(allAwards.value.map(a => a.award.year))].sort((a, b) => b - a)
})

const oldestAwardYear = computed(() => {
  return Math.min(...allAwards.value.map(a => a.award.year))
})

const filteredAwards = computed(() => {
  return allAwards.value.filter(awardData => {
    const matchesYear = !selectedYear.value || awardData.award.year.toString() === selectedYear.value
    const matchesOrg = !selectedOrganization.value || awardData.award.organization === selectedOrganization.value
    const matchesMember = !selectedMember.value || awardData.member === selectedMember.value

    return matchesYear && matchesOrg && matchesMember
  })
})

// Statistics
const statistics = computed(() => [
  { value: allAwards.value.length, label: t.value.awards.statistics.totalAwards },
  { value: uniqueOrganizations.value.length, label: t.value.awards.statistics.organizations },
  { value: awardedMembers.value.length, label: t.value.awards.statistics.awardedMembers },
  { value: currentYear - oldestAwardYear.value + 1, label: t.value.awards.statistics.yearsOfRecognition }
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
      ...awardedMembers.value.map(member => ({ value: member, label: member }))
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

// Methods
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
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <PageHeader 
      :title="t.awards.pageTitle"
      :subtitle="t.awards.pageSubtitle"
      highlight-word="Prix"
    />

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
  </div>
</template>