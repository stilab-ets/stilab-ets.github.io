<script setup lang="ts">
import { ref, computed, onMounted} from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import axios from 'axios'

// UI Components
import PageHeader from '@/ui/PageHeader.vue'
import SearchAndFilters from '@/ui/SearchAndFilters.vue'
import StatisticsGrid from '@/ui/StatisticsGrid.vue'
import EmptyState from '@/ui/EmptyState.vue'

// Events components
import EventCard from './EventCard.vue'

interface Participant {
  id: string
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

interface AcademicEvent {
  id: string;
  title: string;
  speaker?: Participant;
  date: string;
  time?: string;
  location: string;
  domain: 'seminar' | 'workshop' | 'conference' | 'defense' | 'meeting' | 'colloquium' | 'masterclass';
  description: string;
  registration_url?: string;
  tags: string[];
  is_upcoming: boolean;
  capacity?: number;
  current_registrations?: number;
  participants: Participant[]
}



// Language and translations
const { t } = useLanguage()

// State
const events = ref<AcademicEvent[]>([]);
const selectedType = ref('')
const selectedPeriod = ref('all')
const viewMode = ref('upcoming')

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
// Generate all awards from researchers
const fetchAwards = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/events`)
    events.value = response.data 
  } catch (error) {
    console.error('Error fetching events:', error)
  }
}
onMounted(fetchAwards)

// Computed
const filteredUpcomingEvents = computed(() => {
  return events.value.filter(event => {
    const matchesType = !selectedType.value || event.domain === selectedType.value
    const isUpcoming = event.is_upcoming
    const matchesPeriod = selectedPeriod.value === 'all' ||
      (selectedPeriod.value === 'upcoming' && isUpcoming)

    return matchesType && isUpcoming && matchesPeriod
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

const filteredPastEvents = computed(() => {
  return events.value.filter(event => {
    const matchesType = !selectedType.value || event.domain === selectedType.value
    const isPast = !event.is_upcoming
    const matchesPeriod = selectedPeriod.value === 'all' ||
      (selectedPeriod.value === 'past' && isPast)

    return matchesType && isPast && matchesPeriod
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const upcomingEventsCount = computed(() => {
  return events.value.filter(event => event.is_upcoming).length
})

const totalRegistrations = computed(() => {
  return events.value
    .filter(event => event.is_upcoming && event.current_registrations)
    .reduce((sum, event) => sum + (event.current_registrations || 0), 0)
})

// Statistics
const statistics = computed(() => [
  { value: upcomingEventsCount.value, label: t.value.events.statistics.upcomingEvents },
  { value: totalRegistrations.value, label: t.value.events.statistics.registrations },
  { value: events.value.length, label: t.value.events.statistics.totalEvents }
])

// Filters configuration
const filters = computed(() => [
  {
    id: 'type',
    label: t.value.events.filters.eventType,
    value: selectedType.value,
    options: [
      { value: '', label: t.value.events.filters.allTypes },
      { value: 'seminar', label: t.value.events.eventTypes.seminar },
      { value: 'workshop', label: t.value.events.eventTypes.workshop },
      { value: 'conference', label: t.value.events.eventTypes.conference },
      { value: 'defense', label: t.value.events.eventTypes.defense },
      { value: 'meeting', label: t.value.events.eventTypes.meeting },
      { value: 'colloquium', label: t.value.events.eventTypes.colloquium },
      { value: 'masterclass', label: t.value.events.eventTypes.masterclass }
    ]
  },
  {
    id: 'period',
    label: t.value.events.filters.period,
    value: selectedPeriod.value,
    options: [
      { value: 'all', label: t.value.events.filters.all },
      { value: 'upcoming', label: t.value.events.filters.upcoming },
      { value: 'past', label: t.value.events.filters.past }
    ]
  }
])

// Methods
const updateFilter = (filterId: string, value: string) => {
  switch (filterId) {
    case 'type':
      selectedType.value = value
      break
    case 'period':
      selectedPeriod.value = value
      break
  }
}

const currentEvents = computed(() => {
  return viewMode.value === 'upcoming' ? filteredUpcomingEvents.value : filteredPastEvents.value
})

const currentEventsTitle = computed(() => {
  return viewMode.value === 'upcoming' ? t.value.events.sections.upcomingEvents : t.value.events.sections.pastEvents
})

const emptyStateConfig = computed(() => {
  if (viewMode.value === 'upcoming') {
    return {
      title: t.value.events.empty.noUpcoming,
      message: t.value.events.empty.noUpcomingMessage
    }
  } else {
    return {
      title: t.value.events.empty.noPast,
      message: t.value.events.empty.noPastMessage
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <PageHeader 
      :title="t.events.pageTitle"
      :subtitle="t.events.pageSubtitle"
      highlight-word="Événements"
    />

    <!-- Statistics -->
    <StatisticsGrid 
      :statistics="statistics"
      :columns="3"
    />

    <!-- Filters -->
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="max-w-6xl mx-auto">
        <SearchAndFilters
          :filters="filters"
          @update-filter="updateFilter"
        />
        
        <!-- View Toggle -->
        <div class="mt-4 flex justify-center">
          <div class="flex border border-gray-300 rounded-md">
            <button @click="viewMode = 'upcoming'" :class="[
              'px-4 py-2 text-sm font-medium rounded-l-md hover:cursor-pointer',
              viewMode === 'upcoming'
                ? 'bg-[#08a4d4] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            ]">
              {{ t.events.filters.upcoming }} ({{ filteredUpcomingEvents.length }})
            </button>
            <button @click="viewMode = 'past'" :class="[
              'px-4 py-2 text-sm font-medium border-l border-gray-300 rounded-r-md hover:cursor-pointer',
              viewMode === 'past'
                ? 'bg-[#08a4d4] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            ]">
              {{ t.events.filters.past }} ({{ filteredPastEvents.length }})
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Events Content -->
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <svg class="h-6 w-6 text-[#08a4d4] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              :d="viewMode === 'upcoming' ? 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' : 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'" />
          </svg>
          {{ currentEventsTitle }}
        </h2>

        <div v-if="currentEvents.length > 0" class="space-y-6">
          <EventCard
            v-for="event in currentEvents"
            :key="event.id"
            :event-data="event"
            :is-past="viewMode === 'past'"
          />
        </div>

        <!-- Empty State -->
        <EmptyState 
          v-else
          :title="emptyStateConfig.title"
          :message="emptyStateConfig.message"
          icon="calendar"
        />
      </div>
    </div>
  </div>
</template>
