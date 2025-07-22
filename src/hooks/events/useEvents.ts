import { ref, computed, type Ref } from 'vue'
import { mainAPI } from '@/services/ApiFactory'
import type { Event } from '@/services/MainAPI'

interface UseEventsState {
  events: Ref<Event[]>
  isLoading: Ref<boolean>
  error: Ref<string | null>
}

interface UseEventsActions {
  fetchEvents: () => Promise<void>
  createEvent: (eventData: Partial<Event>) => Promise<Event | null>
  updateEvent: (id: string, eventData: Partial<Event>) => Promise<Event | null>
  deleteEvent: (id: string) => Promise<boolean>
  clearError: () => void
}

interface UseEventsFilters {
  filterByType: (type: string) => Event[]
  filterByUpcoming: () => Event[]
  filterByPast: () => Event[]
  filterByPeriod: (period: 'all' | 'upcoming' | 'past') => Event[]
}

interface UseEventsComputed {
  upcomingEvents: Ref<Event[]>
  pastEvents: Ref<Event[]>
  upcomingEventsCount: Ref<number>
  totalRegistrations: Ref<number>
  eventTypes: Ref<string[]>
}

type UseEventsReturn = UseEventsState & UseEventsActions & UseEventsFilters & UseEventsComputed

export function useEvents(): UseEventsReturn {
  const events = ref<Event[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchEvents = async (): Promise<void> => {
    try {
      isLoading.value = true
      error.value = null
      
      const response = await mainAPI.getEvents()
      // API returns array directly, not paginated
      events.value = response.data || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch events'
      console.error('Error fetching events:', err)
    } finally {
      isLoading.value = false
    }
  }

  const createEvent = async (eventData: Partial<Event>): Promise<Event | null> => {
    try {
      isLoading.value = true
      error.value = null

      const response = await mainAPI.createEvent(eventData)
      const newEvent = response.data
      
      events.value.push(newEvent)
      return newEvent
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create event'
      console.error('Error creating event:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event | null> => {
    try {
      isLoading.value = true
      error.value = null

      const response = await mainAPI.updateEvent(id, eventData)
      const updatedEvent = response.data
      
      const index = events.value.findIndex(e => e.id === id)
      if (index !== -1) {
        events.value[index] = updatedEvent
      }
      
      return updatedEvent
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update event'
      console.error('Error updating event:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  const deleteEvent = async (id: string): Promise<boolean> => {
    try {
      isLoading.value = true
      error.value = null

      await mainAPI.deleteEvent(id)
      events.value = events.value.filter(e => e.id !== id)
      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete event'
      console.error('Error deleting event:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const clearError = (): void => {
    error.value = null
  }

  // Computed properties
  const upcomingEvents = computed(() => {
    const now = new Date()
    return events.value.filter(event => {
      if (!event.date) return false
      return new Date(event.date) >= now
    }).sort((a, b) => {
      if (!a.date || !b.date) return 0
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    })
  })

  const pastEvents = computed(() => {
    const now = new Date()
    return events.value.filter(event => {
      if (!event.date) return false
      return new Date(event.date) < now
    }).sort((a, b) => {
      if (!a.date || !b.date) return 0
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  })

  const upcomingEventsCount = computed(() => upcomingEvents.value.length)

  const totalRegistrations = computed(() => {
    // Since we don't have registration data in the current model, return 0
    return 0
  })

  const eventTypes = computed(() => {
    const types = new Set(events.value.map(event => event.domain).filter(Boolean))
    return Array.from(types).sort()
  })

  // Filter methods
  const filterByType = (type: string): Event[] => {
    return events.value.filter(event => event.domain === type)
  }

  const filterByUpcoming = (): Event[] => {
    return upcomingEvents.value
  }

  const filterByPast = (): Event[] => {
    return pastEvents.value
  }

  const filterByPeriod = (period: 'all' | 'upcoming' | 'past'): Event[] => {
    switch (period) {
      case 'upcoming':
        return filterByUpcoming()
      case 'past':
        return filterByPast()
      default:
        return events.value
    }
  }

  return {
    events,
    isLoading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    clearError,
    upcomingEvents,
    pastEvents,
    upcomingEventsCount,
    totalRegistrations,
    eventTypes,
    filterByType,
    filterByUpcoming,
    filterByPast,
    filterByPeriod
  }
}
