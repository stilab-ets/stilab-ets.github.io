<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import { useEvents } from '@/hooks/events/useEvents';

// UI Components
import PageHeader from '@/components/ui/PageHeader.vue';
import SearchAndFilters from '@/components/ui/SearchAndFilters.vue';
import StatisticsGrid from '@/components/ui/StatisticsGrid.vue';
import EmptyState from '@/components/ui/EmptyState.vue';

// Events components
import EventCard from './EventCard.vue';

const { t } = useLanguage();

// Events management using the fixed hook
const {
  events,
  isLoading,
  error,
  fetchEvents,
  upcomingEvents,
  pastEvents,
  upcomingEventsCount,
  eventTypes,
  clearError,
} = useEvents();

// Filter state
const viewMode = ref<'upcoming' | 'past'>('upcoming');
const selectedType = ref('');
const searchQuery = ref('');

// Fetch events on mount
onMounted(() => {
  fetchEvents();
});

// Computed properties
const currentEvents = computed(() => {
  let filtered =
    viewMode.value === 'upcoming' ? upcomingEvents.value : pastEvents.value;

  // Apply type filter (using domain field from API)
  if (selectedType.value) {
    filtered = filtered.filter((event) => event.domain === selectedType.value);
  }

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (event) =>
        event.title.toLowerCase().includes(query) ||
        (event.description &&
          event.description.toLowerCase().includes(query)) ||
        (event.location && event.location.toLowerCase().includes(query)) ||
        (event.speaker &&
          `${event.speaker.first_name} ${event.speaker.last_name}`
            .toLowerCase()
            .includes(query))
    );
  }

  // Map events to include computed fields for EventCard compatibility
  return filtered.map((event) => {
    const mappedType = mapDomainToType(event.domain);

    return {
      ...event,
      type: mappedType,
      is_upcoming: event.date ? new Date(event.date) > new Date() : false,
      tags: event.tags || [],
    } as any;
  });
});

// Helper function to map domain to event type
const mapDomainToType = (domain: string): Event['type'] => {
  const lowerDomain = domain.toLowerCase();
  const validTypes: Event['type'][] = [
    'seminar',
    'workshop',
    'conference',
    'defense',
    'meeting',
    'colloquium',
    'masterclass',
  ];

  // Check if domain matches any valid type
  if (validTypes.includes(lowerDomain as Event['type'])) {
    return lowerDomain as Event['type'];
  }

  // Map common variations
  const domainTypeMap: Record<string, Event['type']> = {
    seminaire: 'seminar',
    atelier: 'workshop',
    conférence: 'conference',
    soutenance: 'defense',
    réunion: 'meeting',
    colloque: 'colloquium',
    cours: 'masterclass',
  };

  return domainTypeMap[lowerDomain] || 'seminar';
};

const statistics = computed(() => [
  {
    label: t.value.events.statistics.totalEvents,
    value: events.value.length,
  },
  {
    label: t.value.events.statistics.upcomingEvents,
    value: upcomingEventsCount.value,
  },
  {
    label: t.value.events.statistics.registrations,
    value: pastEvents.value.length,
  },
]);

// Filters configuration
const filters = computed(() => [
  {
    id: 'view',
    label: t.value.events.filters.view,
    value: viewMode.value,
    options: [
      { value: 'upcoming', label: t.value.events.filters.upcoming },
      { value: 'past', label: t.value.events.filters.past },
    ],
  },
  {
    id: 'type',
    label: t.value.events.filters.type,
    value: selectedType.value,
    options: [
      { value: '', label: t.value.events.filters.allTypes },
      ...eventTypes.value.map((type) => ({
        value: type,
        label: type,
      })),
    ],
  },
]);

const currentEventsTitle = computed(() => {
  return viewMode.value === 'upcoming'
    ? t.value.events.sections.upcomingEvents
    : t.value.events.sections.pastEvents;
});

const emptyStateConfig = computed(() => {
  if (viewMode.value === 'upcoming') {
    return {
      title: t.value.events.empty.noUpcoming,
      message: t.value.events.empty.noUpcomingMessage,
    };
  } else {
    return {
      title: t.value.events.empty.noPast,
      message: t.value.events.empty.noPastMessage,
    };
  }
});

// Results text
const resultsText = computed(() => {
  const count = currentEvents.value.length;
  if (count === 0) return `0 ${t.value.events.results.event}`;
  if (count === 1) return `1 ${t.value.events.results.event}`;
  return `${count} ${t.value.events.results.events}`;
});

// Filter methods
const updateFilter = (filterId: string, value: string) => {
  switch (filterId) {
    case 'view':
      viewMode.value = value as 'upcoming' | 'past';
      break;
    case 'type':
      selectedType.value = value;
      break;
    case 'search':
      searchQuery.value = value;
      break;
  }
};

// Error handling
const handleError = (): void => {
  clearError();
  fetchEvents();
};
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
    <StatisticsGrid :statistics="statistics" :columns="3" />

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

    <!-- Error Message -->
    <div v-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="bg-red-50 border border-red-200 rounded-md p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
            <div class="mt-2">
              <button
                class="text-sm bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded transition-colors"
                @click="handleError"
              >
                {{ t.common.retry }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-else-if="isLoading"
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div class="flex justify-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
      </div>
    </div>

    <!-- Events List -->
    <template v-else>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ currentEventsTitle }}
          </h2>
        </div>

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
    </template>
  </div>
</template>
