<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

// UI Components
import PageHeader from '@/ui/PageHeader.vue'
import SearchAndFilters from '@/ui/SearchAndFilters.vue'
import StatisticsGrid from '@/ui/StatisticsGrid.vue'
import EmptyState from '@/ui/EmptyState.vue'

// Events components
import EventCard from './EventCard.vue'

// Interface matching EventCard's AcademicEvent
interface AcademicEvent {
  id: string;
  title: string;
  speaker?: string;
  date: string;
  time?: string;
  location: string;
  type: 'seminar' | 'workshop' | 'conference' | 'defense' | 'meeting' | 'colloquium' | 'masterclass';
  description: string;
  registrationUrl?: string;
  tags: string[];
  isUpcoming: boolean;
  capacity?: number;
  currentRegistrations?: number;
}

const mockEvents: AcademicEvent[] = [
  {
    id: 'e1',
    title: 'Séminaire: AI in Software Engineering - Current Trends and Future Directions',
    speaker: 'Prof. Jean Martin',
    date: '2024-06-15',
    time: '14:00',
    location: 'Amphithéâtre A, Bâtiment Informatique',
    type: 'seminar',
    description: 'Présentation des dernières avancées en intelligence artificielle appliquée au génie logiciel, avec discussion sur les perspectives futures et les défis technologiques.',
    registrationUrl: 'https://event.univ.fr/register/ai-seminar',
    tags: ['AI', 'machine learning', 'software engineering'],
    isUpcoming: true,
    capacity: 150,
    currentRegistrations: 87
  },
  {
    id: 'e2',
    title: 'Workshop: Blockchain Security for Developers',
    speaker: 'Dr. Sarah Chen',
    date: '2024-06-20',
    time: '09:00',
    location: 'Salle de conférence B12',
    type: 'workshop',
    description: 'Atelier pratique sur les bonnes pratiques de sécurité lors du développement d\'applications blockchain.',
    registrationUrl: 'https://event.univ.fr/register/blockchain-workshop',
    tags: ['blockchain', 'security', 'hands-on'],
    isUpcoming: true,
    capacity: 30,
    currentRegistrations: 24
  },
  {
    id: 'e3',
    title: 'Soutenance de thèse: Alex Rodriguez',
    speaker: 'Alex Rodriguez',
    date: '2024-07-10',
    time: '10:00',
    location: 'Amphithéâtre Principal',
    type: 'defense',
    description: 'Soutenance de thèse: "Automated Detection and Management of Technical Debt in Large-Scale Software Systems"',
    tags: ['defense', 'technical debt', 'automation'],
    isUpcoming: true,
    capacity: 100,
    currentRegistrations: 45
  }
]

// Language and translations
const { t } = useLanguage()

// State
const selectedType = ref('')
const selectedPeriod = ref('all')
const viewMode = ref('upcoming')

// Computed
const filteredUpcomingEvents = computed(() => {
  return mockEvents.filter(event => {
    const matchesType = !selectedType.value || event.type === selectedType.value
    const isUpcoming = event.isUpcoming
    const matchesPeriod = selectedPeriod.value === 'all' ||
      (selectedPeriod.value === 'upcoming' && isUpcoming)

    return matchesType && isUpcoming && matchesPeriod
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

const filteredPastEvents = computed(() => {
  return mockEvents.filter(event => {
    const matchesType = !selectedType.value || event.type === selectedType.value
    const isPast = !event.isUpcoming
    const matchesPeriod = selectedPeriod.value === 'all' ||
      (selectedPeriod.value === 'past' && isPast)

    return matchesType && isPast && matchesPeriod
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const upcomingEventsCount = computed(() => {
  return mockEvents.filter(event => event.isUpcoming).length
})

const totalRegistrations = computed(() => {
  return mockEvents
    .filter(event => event.isUpcoming && event.currentRegistrations)
    .reduce((sum, event) => sum + (event.currentRegistrations || 0), 0)
})

// Statistics
const statistics = computed(() => [
  { value: upcomingEventsCount.value, label: t.value.event.statistics.upcomingEvents },
  { value: totalRegistrations.value, label: t.value.event.statistics.registrations },
  { value: mockEvents.length, label: t.value.event.statistics.totalEvents }
])

// Filters configuration
const filters = computed(() => [
  {
    id: 'type',
    label: t.value.event.filters.eventType,
    value: selectedType.value,
    options: [
      { value: '', label: t.value.event.filters.allTypes },
      { value: 'seminar', label: t.value.event.eventTypes.seminar },
      { value: 'workshop', label: t.value.event.eventTypes.workshop },
      { value: 'conference', label: t.value.event.eventTypes.conference },
      { value: 'defense', label: t.value.event.eventTypes.defense },
      { value: 'meeting', label: t.value.event.eventTypes.meeting },
      { value: 'colloquium', label: t.value.event.eventTypes.colloquium },
      { value: 'masterclass', label: t.value.event.eventTypes.masterclass }
    ]
  },
  {
    id: 'period',
    label: t.value.event.filters.period,
    value: selectedPeriod.value,
    options: [
      { value: 'all', label: t.value.event.filters.all },
      { value: 'upcoming', label: t.value.event.filters.upcoming },
      { value: 'past', label: t.value.event.filters.past }
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
  return viewMode.value === 'upcoming' ? t.value.event.sections.upcomingEvents : t.value.event.sections.pastEvents
})

const emptyStateConfig = computed(() => {
  if (viewMode.value === 'upcoming') {
    return {
      title: t.value.event.empty.noUpcoming,
      message: t.value.event.empty.noUpcomingMessage
    }
  } else {
    return {
      title: t.value.event.empty.noPast,
      message: t.value.event.empty.noPastMessage
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <PageHeader 
      :title="t.event.pageTitle"
      :subtitle="t.event.pageSubtitle"
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
              {{ t.event.filters.upcoming }} ({{ filteredUpcomingEvents.length }})
            </button>
            <button @click="viewMode = 'past'" :class="[
              'px-4 py-2 text-sm font-medium border-l border-gray-300 rounded-r-md hover:cursor-pointer',
              viewMode === 'past'
                ? 'bg-[#08a4d4] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            ]">
              {{ t.event.filters.past }} ({{ filteredPastEvents.length }})
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