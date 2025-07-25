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
  updatePublication: (id: number, data: Partial<Publication>) => Promise<boolean>
  deletePublication: (id: number) => Promise<boolean>
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
      publications.value = response.data.results
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch publications'
      console.error('Error fetching publications:', err)
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
      publications.value.unshift(response.data)
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to create publication'
      console.error('Error creating publication:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const updatePublication = async (id: number, data: Partial<Publication>): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await mainAPI.updatePublication(id, data)
      const index = publications.value.findIndex(p => p.id === id)
      if (index !== -1) {
        publications.value[index] = response.data
      }
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to update publication'
      console.error('Error updating publication:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const deletePublication = async (id: number): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      await mainAPI.deletePublication(id)
      publications.value = publications.value.filter(p => p.id !== id)
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to delete publication'
      console.error('Error deleting publication:', err)
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