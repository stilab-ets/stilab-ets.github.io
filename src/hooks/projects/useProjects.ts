import { ref, computed } from 'vue'
import { mainAPI } from '@/services/ApiFactory'
import type { Project, ProjectInterest } from '@/services/MainAPI'

export function useProjects() {
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProjects = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.getProjects()
      projects.value = response.data.results || []
    } catch (err) {
      console.warn('Failed to fetch projects:', err)
      error.value = 'Failed to fetch projects'
      projects.value = []
    } finally {
      loading.value = false
    }
  }

  const createProject = async (projectData: Partial<Project>) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.createProject(projectData)
      projects.value.unshift(response.data)
      return response.data
    } catch (err) {
      console.warn('Failed to create project:', err)
      error.value = 'Failed to create project'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateProject = async (id: number, projectData: Partial<Project>) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.updateProject(id, projectData)
      const index = projects.value.findIndex(p => p.id === id)
      if (index !== -1) {
        projects.value[index] = response.data
      }
      return response.data
    } catch (err) {
      console.warn('Failed to update project:', err)
      error.value = 'Failed to update project'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteProject = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      await mainAPI.deleteProject(id)
      projects.value = projects.value.filter(p => p.id !== id)
    } catch (err) {
      console.warn('Failed to delete project:', err)
      error.value = 'Failed to delete project'
      throw err
    } finally {
      loading.value = false
    }
  }

  const submitProjectInterest = async (interestData: ProjectInterest) => {
    try {
      const response = await mainAPI.submitProjectInterest(interestData)
      return response.data
    } catch (err) {
      console.warn('Failed to submit project interest:', err)
      throw err
    }
  }

  return {
    projects: computed(() => projects.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    submitProjectInterest
  }
}