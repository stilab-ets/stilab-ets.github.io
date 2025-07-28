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
  updateEvent: (id: number, eventData: Partial<Event>) => Promise<Event | null>
  deleteEvent: (id: number) => Promise<boolean>
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
      events.value = response.data.results
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

  const updateEvent = async (id: number, eventData: Partial<Event>): Promise<Event | null> => {
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

  const deleteEvent = async (id: number): Promise<boolean> => {
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

  const filterByType = (type: string): Event[] => {
    if (!type) return events.value
    return events.value.filter(event => event.type === type)
  }

  const filterByUpcoming = (): Event[] => {
    return events.value.filter(event => event.is_upcoming)
  }

  const filterByPast = (): Event[] => {
    return events.value.filter(event => !event.is_upcoming)
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

  const upcomingEvents = computed(() => filterByUpcoming())
  const pastEvents = computed(() => filterByPast())

  const upcomingEventsCount = computed(() => upcomingEvents.value.length)

  const totalRegistrations = computed(() => {
    return upcomingEvents.value
      .filter(event => event.current_registrations)
      .reduce((sum, event) => sum + (event.current_registrations || 0), 0)
  })

  const eventTypes = computed(() => {
    const types = [...new Set(events.value.map(event => event.type))]
    return types.sort()
  })

  return {
    // State
    events,
    isLoading,
    error,
    
    // Actions
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    clearError,
    
    // Filters
    filterByType,
    filterByUpcoming,
    filterByPast,
    filterByPeriod,
    
    // Computed
    upcomingEvents,
    pastEvents,
    upcomingEventsCount,
    totalRegistrations,
    eventTypes
  }
}