<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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

interface AwardRecipient {
  id: string
  member: {
    first_name: string
    last_name: string
    role: string
    email: string | null
    phone?: string | null
    biography?: string | null
    research_domain?: string | null
    image_url?: string | null
    github_url?: string | null
    linkedin_url?: string | null
    personal_website?: string | null
    status?: string | null
  }
}

// Extended award data structure
interface Award {
  recipients: AwardRecipient[];
  id: string;
  title: string;
  url: string;
  year: number;
  organization: string;
}

// Language and translations
const { t } = useLanguage()

// State
const allAwards = ref<Award[]>([]);
const selectedYear = ref('')
const selectedOrganization = ref('')
const selectedMember = ref('')
const currentYear = new Date().getFullYear()

// Generate all awards from researchers
const fetchAwards = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/awards')
    if (!response.ok) throw new Error('Failed to fetch awards')
    const data = await response.json()
    allAwards.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error fetching members:', error)
  }
}
onMounted(fetchAwards)

// Computed properties
const uniqueOrganizations = computed(() => {
 return [...new Set(allAwards.value.map(a => a.organization))].sort()
})

const awardedMembers = computed(() => {
  const allRecipients = allAwards.value.flatMap(award => award.recipients || []);
  const unique = new Map();
  allRecipients.forEach(recipient => {
    const key = `${recipient.member.first_name} ${recipient.member.last_name}`;
    if (!unique.has(key)) unique.set(key, recipient);
  });
  return Array.from(unique.values());
});

const availableYears = computed(() => {
  return [...new Set(allAwards.value.map(a => a.year))].sort((a, b) => b - a)
})

const oldestAwardYear = computed(() => {
  return Math.min(...allAwards.value.map(a => a.year))
})

const filteredAwards = computed(() => {
  return allAwards.value.filter(awardData => {
    const matchesYear = !selectedYear.value || awardData.year.toString() === selectedYear.value
    const matchesOrg = !selectedOrganization.value || awardData.organization === selectedOrganization.value
    const matchesMember =
      !selectedMember.value ||
      (awardData.recipients &&
        awardData.recipients.some(
          r => `${r.member.first_name} ${r.member.last_name}` === selectedMember.value
        ));

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
      ...awardedMembers.value.map(recipient => ({
        value: `${recipient.member.first_name} ${recipient.member.last_name}`,
        label: `${recipient.member.first_name} ${recipient.member.last_name}`
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
