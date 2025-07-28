import { ref, computed, type Ref } from 'vue'
import { mainAPI } from '@/services/ApiFactory'
import type { Vacancy } from '@/services/MainAPI'

interface UseVacanciesReturn {
  vacancies: Ref<Vacancy[]>
  isLoading: Ref<boolean>
  error: Ref<string | null>
  fetchVacancies: () => Promise<void>
  createVacancy: (data: Partial<Vacancy>) => Promise<boolean>
  updateVacancy: (id: string, data: Partial<Vacancy>) => Promise<boolean>
  deleteVacancy: (id: string) => Promise<boolean>
  clearError: () => void
  filteredVacancies: (searchQuery: string, selectedType: string, selectedSupervisor: string) => Vacancy[]
  activeVacancies: Ref<Vacancy[]>
  expiredVacancies: Ref<Vacancy[]>
  upcomingDeadlines: Ref<Vacancy[]>
  uniqueTypes: Ref<string[]>
  uniqueSupervisors: Ref<string[]>
}

export function useVacancies(): UseVacanciesReturn {
  const vacancies = ref<Vacancy[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const clearError = () => {
    error.value = null
  }

  const fetchVacancies = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.getVacancies()
      // API returns array directly, not paginated
      vacancies.value = response.data || []
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch vacancies'
      console.error('Error fetching vacancies:', err)
    } finally {
      isLoading.value = false
    }
  }

  const createVacancy = async (data: Partial<Vacancy>): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.createVacancy(data)
      vacancies.value.push(response.data)
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to create vacancy'
      console.error('Error creating vacancy:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const updateVacancy = async (id: string, data: Partial<Vacancy>): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.updateVacancy(id, data)
      const index = vacancies.value.findIndex(v => v.id === id)
      if (index !== -1) {
        vacancies.value[index] = response.data
      }
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to update vacancy'
      console.error('Error updating vacancy:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const deleteVacancy = async (id: string): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      await mainAPI.deleteVacancy(id)
      vacancies.value = vacancies.value.filter(v => v.id !== id)
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to delete vacancy'
      console.error('Error deleting vacancy:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Computed properties
  const activeVacancies = computed(() => {
    const now = new Date()
    return vacancies.value.filter(vacancy => 
      vacancy.is_active && new Date(vacancy.deadline) > now
    )
  })

  const expiredVacancies = computed(() => {
    const now = new Date()
    return vacancies.value.filter(vacancy => 
      !vacancy.is_active || new Date(vacancy.deadline) <= now
    )
  })

  const upcomingDeadlines = computed(() => {
    const now = new Date()
    const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    return activeVacancies.value.filter(vacancy => 
      new Date(vacancy.deadline) <= oneWeekFromNow
    ).sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
  })

  const uniqueTypes = computed(() => {
    const types = new Set(vacancies.value.map(vacancy => vacancy.type))
    return Array.from(types).sort()
  })

  const uniqueSupervisors = computed(() => {
    const supervisors = new Set(vacancies.value.map(vacancy => vacancy.supervisor))
    return Array.from(supervisors).sort()
  })

  // Filter function
  const filteredVacancies = (searchQuery: string, selectedType: string, selectedSupervisor: string): Vacancy[] => {
    return vacancies.value.filter((vacancy) => {
      const matchesSearch =
        !searchQuery ||
        vacancy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vacancy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vacancy.supervisor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vacancy.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesType =
        !selectedType || vacancy.type === selectedType

      const matchesSupervisor =
        !selectedSupervisor || vacancy.supervisor === selectedSupervisor

      return matchesSearch && matchesType && matchesSupervisor
    })
  }

  return {
    vacancies,
    isLoading,
    error,
    fetchVacancies,
    createVacancy,
    updateVacancy,
    deleteVacancy,
    clearError,
    filteredVacancies,
    activeVacancies,
    expiredVacancies,
    upcomingDeadlines,
    uniqueTypes,
    uniqueSupervisors
  }
}