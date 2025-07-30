import { ref, type Ref } from 'vue'
import { mainAPI } from '@/services/ApiFactory'
import type { Publication } from '@/services/MainAPI'

export interface UsePublicationsReturn {
  publications: Ref<Publication[]>
  isLoading: Ref<boolean>
  error: Ref<string | null>
  fetchPublications: () => Promise<void>
  refreshPublications: () => Promise<void>
  createPublication: (data: Partial<Publication>) => Promise<boolean>
  updatePublication: (id: string, data: Partial<Publication>) => Promise<boolean>
  deletePublication: (id: string) => Promise<boolean>
  clearError: () => void
}

export function usePublications(): UsePublicationsReturn {
  const publications = ref<Publication[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const clearError = () => {
    error.value = null
  }

  const fetchPublications = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.getPublications()
      
      // Handle both array and object responses
      let publicationsData: Publication[] = [];
      if (Array.isArray(response.data)) {
        publicationsData = response.data;
      } else if (response.data && typeof response.data === 'object') {
        publicationsData = response.data || [];
      }
      
      publications.value = publicationsData;
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch publications'
      // Set to empty array on error to prevent undefined access
      publications.value = []
    } finally {
      isLoading.value = false
    }
  }

  const refreshPublications = async () => {
    await fetchPublications()
  }

  const createPublication = async (data: Partial<Publication>): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await mainAPI.createPublication(data)
      if (response.data) {
        publications.value.unshift(response.data)
      }
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to create publication'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const updatePublication = async (id: string, data: Partial<Publication>): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await mainAPI.updatePublication(id, data)
      if (response.data) {
        const index = publications.value.findIndex(p => p.id === id)
        if (index !== -1) {
          publications.value[index] = response.data
        }
      }
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to update publication'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const deletePublication = async (id: string): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      await mainAPI.deletePublication(id)
      publications.value = publications.value.filter(p => p.id !== id)
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to delete publication'
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    publications,
    isLoading,
    error,
    fetchPublications,
    refreshPublications,
    createPublication,
    updatePublication,
    deletePublication,
    clearError
  }
}