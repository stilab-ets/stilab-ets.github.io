<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useEvents } from '@/hooks/useEvents'
import { useEventsFilters } from '@/hooks/useEventsFilters'
import { useEventsStatistics } from '@/hooks/useEventsStatistics'

// UI Components
import PageHeader from '@/components/ui/PageHeader.vue'
import SearchAndFilters from '@/components/ui/SearchAndFilters.vue'
import StatisticsGrid from '@/components/ui/StatisticsGrid.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

// Events components
import EventCard from './EventCard.vue'

const { t } = useLanguage()

// Events management
const {
  events,
  isLoading,
  error,
  fetchEvents,
  clearError
} = useEvents()

// Filters management
const {
  viewMode,
  updateFilter,
  setViewMode,
  filteredEvents,
  filterOptions
} = useEventsFilters()

// Statistics
const { statistics } = useEventsStatistics(events)

// Computed properties
const currentEvents = computed(() => filteredEvents(events.value))

const upcomingEventsCount = computed(() => 
  events.value.filter(event => event.is_upcoming).length
)

const pastEventsCount = computed(() => 
  events.value.filter(event => !event.is_upcoming).length
)

const currentEventsTitle = computed(() => {
  return viewMode.value === 'upcoming' 
    ? t.value.events.sections.upcomingEvents 
    : t.value.events.sections.pastEvents
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

// Lifecycle
onMounted(() => {
  fetchEvents()
})

// Error handling
const handleError = (): void => {
  clearError()
  fetchEvents()
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <PageHeader 
      :title="t.events.pageTitle"
      :subtitle="t.events.pageSubtitle"
      highlight-word="Événements"
    />

    <!-- Error Message -->
    <div v-if="error" class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="max-w-6xl mx-auto">
        <div class="bg-red-50 border border-red-200 rounded-md p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.76 0L3.054 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">{{ t.common.error }}</h3>
              <div class="mt-2 text-sm text-red-700">
                <p>{{ error }}</p>
              </div>
              <div class="mt-4">
                <button
                  @click="handleError"
                  class="bg-red-100 px-2 py-1 rounded text-red-800 hover:bg-red-200 text-sm"
                >
                  {{ t.common.retry || 'Retry' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading && events.length === 0" class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="max-w-6xl mx-auto text-center">
        <div class="animate-pulse">
          <div class="h-8 bg-gray-300 rounded w-1/4 mx-auto mb-4"></div>
          <div class="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-8"></div>
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="i in 6" :key="i" class="h-64 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Statistics -->
      <StatisticsGrid 
        :statistics="statistics"
        :columns="3"
      />

      <!-- Filters -->
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="max-w-6xl mx-auto">
          <SearchAndFilters
            :filters="filterOptions"
            @update-filter="updateFilter"
          />
          
          <!-- View Toggle -->
          <div class="mt-4 flex justify-center">
            <div class="flex border border-gray-300 rounded-md">
              <button 
                @click="setViewMode('upcoming')" 
                :class="[
                  'px-4 py-2 text-sm font-medium rounded-l-md hover:cursor-pointer',
                  viewMode === 'upcoming'
                    ? 'bg-[#08a4d4] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                ]"
              >
                {{ t.events.filters.upcoming }} ({{ upcomingEventsCount }})
              </button>
              <button 
                @click="setViewMode('past')" 
                :class="[
                  'px-4 py-2 text-sm font-medium border-l border-gray-300 rounded-r-md hover:cursor-pointer',
                  viewMode === 'past'
                    ? 'bg-[#08a4d4] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                ]"
              >
                {{ t.events.filters.past }} ({{ pastEventsCount }})
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

          <!-- Events List -->
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
    </template>
  </div>
</template>