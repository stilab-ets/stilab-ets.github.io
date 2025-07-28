import { ref, computed, type Ref } from 'vue'
import { mainAPI } from '@/services/ApiFactory'
import type { Research, ApiResponse, PaginatedResponse } from '@/services/MainAPI'

interface UseResearchReturn {
  research: Ref<Research[]>
  isLoading: Ref<boolean>
  error: Ref<string | null>
  fetchResearch: () => Promise<void>
  getResearchById: (id: number) => Research | undefined
  createResearch: (data: Partial<Research>) => Promise<boolean>
  updateResearch: (id: number, data: Partial<Research>) => Promise<boolean>
  deleteResearch: (id: number) => Promise<boolean>
  activeProjects: Ref<Research[]>
  completedProjects: Ref<Research[]>
  featuredProjects: Ref<Research[]>
}

export function useResearch(): UseResearchReturn {
  const research = ref<Research[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchResearch = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response: ApiResponse<PaginatedResponse<Research>> = await mainAPI.getResearch()
      research.value = response.data.results
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch research data'
      console.error('Error fetching research:', err)
    } finally {
      isLoading.value = false
    }
  }

  const getResearchById = (id: number): Research | undefined => {
    return research.value.find(r => r.id === id)
  }

  const createResearch = async (data: Partial<Research>): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.createResearch(data)
      research.value.push(response.data)
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to create research'
      console.error('Error creating research:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const updateResearch = async (id: number, data: Partial<Research>): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.updateResearch(id, data)
      const index = research.value.findIndex(r => r.id === id)
      if (index !== -1) {
        research.value[index] = response.data
      }
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to update research'
      console.error('Error updating research:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const deleteResearch = async (id: number): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      await mainAPI.deleteResearch(id)
      research.value = research.value.filter(r => r.id !== id)
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to delete research'
      console.error('Error deleting research:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Computed properties
  const activeProjects = computed(() => 
    research.value.filter(r => r.status === 'active')
  )

  const completedProjects = computed(() => 
    research.value.filter(r => r.status === 'completed')
  )

  const featuredProjects = computed(() => 
    research.value.slice(0, 4)
  )

  return {
    research,
    isLoading,
    error,
    fetchResearch,
    getResearchById,
    createResearch,
    updateResearch,
    deleteResearch,
    activeProjects,
    completedProjects,
    featuredProjects
  }
}