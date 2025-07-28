import { ref, computed, type Ref } from 'vue'
import { mainAPI } from '@/services/ApiFactory'
import type { Project } from '@/services/MainAPI'

interface UseProjectsReturn {
  projects: Ref<Project[]>
  isLoading: Ref<boolean>
  error: Ref<string | null>
  fetchProjects: () => Promise<void>
  createProject: (data: Partial<Project>) => Promise<boolean>
  updateProject: (id: string, data: Partial<Project>) => Promise<boolean>
  deleteProject: (id: string) => Promise<boolean>
  clearError: () => void
  filteredProjects: (searchQuery: string, selectedStatus: string, selectedDifficulty: string) => Project[]
  availableProjects: Ref<Project[]>
  assignedProjects: Ref<Project[]>
  completedProjects: Ref<Project[]>
  uniqueDomains: Ref<string[]>
}

export function useProjects(): UseProjectsReturn {
  const projects = ref<Project[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const clearError = () => {
    error.value = null
  }

  const fetchProjects = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.getProjects()
      // API returns array directly, not paginated
      projects.value = response.data || []
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch projects'
      console.error('Error fetching projects:', err)
    } finally {
      isLoading.value = false
    }
  }

  const createProject = async (data: Partial<Project>): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.createProject(data)
      projects.value.push(response.data)
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to create project'
      console.error('Error creating project:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const updateProject = async (id: string, data: Partial<Project>): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.updateProject(id, data)
      const index = projects.value.findIndex(p => p.id === id)
      if (index !== -1) {
        projects.value[index] = response.data
      }
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to update project'
      console.error('Error updating project:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const deleteProject = async (id: string): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      await mainAPI.deleteProject(id)
      projects.value = projects.value.filter(p => p.id !== id)
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to delete project'
      console.error('Error deleting project:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Computed properties
  const availableProjects = computed(() => {
    return projects.value.filter(project => project.status === 'available')
  })

  const assignedProjects = computed(() => {
    return projects.value.filter(project => project.status === 'assigned')
  })

  const completedProjects = computed(() => {
    return projects.value.filter(project => project.status === 'completed')
  })

  const uniqueDomains = computed(() => {
    const domains = new Set(projects.value.map(project => project.domain).filter(Boolean))
    return Array.from(domains).sort()
  })

  // Filter function
  const filteredProjects = (searchQuery: string, selectedStatus: string, selectedDifficulty: string): Project[] => {
    return projects.value.filter((project) => {
      const matchesSearch =
        !searchQuery ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.supervisor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.co_supervisor && project.co_supervisor.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesStatus =
        !selectedStatus || project.status === selectedStatus

      const matchesDifficulty =
        !selectedDifficulty || project.difficulty === selectedDifficulty

      return matchesSearch && matchesStatus && matchesDifficulty
    })
  }

  return {
    projects,
    isLoading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    clearError,
    filteredProjects,
    availableProjects,
    assignedProjects,
    completedProjects,
    uniqueDomains
  }
}