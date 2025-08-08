import { computed, type Ref } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import type { Event } from '@/services/MainAPI';

interface Statistic {
  value: number;
  label: string;
}

interface UseEventsStatisticsReturn {
  statistics: Ref<Statistic[]>;
  upcomingEventsCount: Ref<number>;
  totalRegistrations: Ref<number>;
  totalEventsCount: Ref<number>;
  capacityUtilization: Ref<number>;
  averageCapacity: Ref<number>;
}

export function useEventsStatistics(
  events: Ref<Event[]>
): UseEventsStatisticsReturn {
  const { t } = useLanguage();

  const upcomingEventsCount = computed(() => {
    return events.value.filter((event) => event.is_upcoming).length;
  });

  const totalRegistrations = computed(() => {
    return events.value
      .filter((event) => event.is_upcoming && event.current_registrations)
      .reduce((sum, event) => sum + (event.current_registrations || 0), 0);
  });

  const totalEventsCount = computed(() => {
    return events.value.length;
  });

  const capacityUtilization = computed(() => {
    const upcomingWithCapacity = events.value.filter(
      (event) =>
        event.is_upcoming && event.capacity && event.current_registrations
    );

    if (upcomingWithCapacity.length === 0) return 0;

    const totalCapacity = upcomingWithCapacity.reduce(
      (sum, event) => sum + (event.capacity || 0),
      0
    );
    const totalRegistered = upcomingWithCapacity.reduce(
      (sum, event) => sum + (event.current_registrations || 0),
      0
    );

    return totalCapacity > 0
      ? Math.round((totalRegistered / totalCapacity) * 100)
      : 0;
  });

  const averageCapacity = computed(() => {
    const eventsWithCapacity = events.value.filter((event) => event.capacity);

    if (eventsWithCapacity.length === 0) return 0;

    const totalCapacity = eventsWithCapacity.reduce(
      (sum, event) => sum + (event.capacity || 0),
      0
    );
    return Math.round(totalCapacity / eventsWithCapacity.length);
  });

  const statistics = computed(() => [
    {
      value: upcomingEventsCount.value,
      label: t.value.events.statistics.upcomingEvents,
    },
    {
      value: totalRegistrations.value,
      label: t.value.events.statistics.registrations,
    },
    {
      value: totalEventsCount.value,
      label: t.value.events.statistics.totalEvents,
    },
  ]);

  return {
    statistics,
    upcomingEventsCount,
    totalRegistrations,
    totalEventsCount,
    capacityUtilization,
    averageCapacity,
  };
}
