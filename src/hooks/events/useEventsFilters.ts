import { ref, computed, type Ref } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import type { Event } from '@/services/MainAPI';

interface UseEventsFiltersState {
  selectedType: Ref<string>;
  selectedPeriod: Ref<'all' | 'upcoming' | 'past'>;
  viewMode: Ref<'upcoming' | 'past'>;
}

interface UseEventsFiltersActions {
  updateFilter: (filterId: string, value: string) => void;
  setViewMode: (mode: 'upcoming' | 'past') => void;
  resetFilters: () => void;
}

interface UseEventsFiltersComputed {
  filteredEvents: (events: Event[]) => Event[];
  filterOptions: Ref<
    Array<{
      id: string;
      label: string;
      value: string;
      options: Array<{ value: string; label: string }>;
    }>
  >;
}

type UseEventsFiltersReturn = UseEventsFiltersState &
  UseEventsFiltersActions &
  UseEventsFiltersComputed;

export function useEventsFilters(): UseEventsFiltersReturn {
  const { t } = useLanguage();

  const selectedType = ref('');
  const selectedPeriod = ref<'all' | 'upcoming' | 'past'>('all');
  const viewMode = ref<'upcoming' | 'past'>('upcoming');

  const updateFilter = (filterId: string, value: string): void => {
    switch (filterId) {
      case 'type':
        selectedType.value = value;
        break;
      case 'period':
        selectedPeriod.value = value as 'all' | 'upcoming' | 'past';
        break;
    }
  };

  const setViewMode = (mode: 'upcoming' | 'past'): void => {
    viewMode.value = mode;
  };

  const resetFilters = (): void => {
    selectedType.value = '';
    selectedPeriod.value = 'all';
    viewMode.value = 'upcoming';
  };

  const filteredEvents = (events: Event[]): Event[] => {
    return events
      .filter((event) => {
        const matchesType =
          !selectedType.value || event.type === selectedType.value;
        const matchesPeriod =
          selectedPeriod.value === 'all' ||
          (selectedPeriod.value === 'upcoming' && event.is_upcoming) ||
          (selectedPeriod.value === 'past' && !event.is_upcoming);
        const matchesViewMode =
          (viewMode.value === 'upcoming' && event.is_upcoming) ||
          (viewMode.value === 'past' && !event.is_upcoming);

        return matchesType && matchesPeriod && matchesViewMode;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        return viewMode.value === 'upcoming'
          ? dateA - dateB // Upcoming: earliest first
          : dateB - dateA; // Past: most recent first
      });
  };

  const filterOptions = computed(() => [
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
        { value: 'masterclass', label: t.value.events.eventTypes.masterclass },
      ],
    },
    {
      id: 'period',
      label: t.value.events.filters.period,
      value: selectedPeriod.value,
      options: [
        { value: 'all', label: t.value.events.filters.all },
        { value: 'upcoming', label: t.value.events.filters.upcoming },
        { value: 'past', label: t.value.events.filters.past },
      ],
    },
  ]);

  return {
    // State
    selectedType,
    selectedPeriod,
    viewMode,

    // Actions
    updateFilter,
    setViewMode,
    resetFilters,

    // Computed
    filteredEvents,
    filterOptions,
  };
}
