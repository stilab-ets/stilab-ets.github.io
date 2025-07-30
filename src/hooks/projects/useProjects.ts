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
      
      // Handle both array and object responses
      let projectsData: Project[] = []
      if (Array.isArray(response.data)) {
        projectsData = response.data
      } else if (response.data && typeof response.data === 'object') {
        projectsData = response.data || []
      }
      
      projects.value = projectsData
    } catch (err: any) {
      // Handle 404s gracefully - projects endpoint might not exist
      if (err.status === 404) {
        projects.value = []
        error.value = null // Don't treat 404 as an error for optional endpoints
      } else {
        error.value = err.message || 'Failed to fetch projects'
        projects.value = [] // Set to empty array on error
      }
    } finally {
      isLoading.value = false
    }
  }

  const createProject = async (data: Partial<Project>): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.createProject(data)
      if (response.data) {
        projects.value.push(response.data)
      }
      return true
    } catch (err: any) {
      if (err.status === 404) {
        error.value = 'Projects functionality is not available'
      } else {
        error.value = err.message || 'Failed to create project'
      }
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
      if (response.data) {
        const index = projects.value.findIndex((p: { id: string }) => p.id === id)
        if (index !== -1) {
          projects.value[index] = response.data
        }
      }
      return true
    } catch (err: any) {
      if (err.status === 404) {
        error.value = 'Project not found or functionality unavailable'
      } else {
        error.value = err.message || 'Failed to update project'
      }
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
      projects.value = projects.value.filter((p: { id: string }) => p.id !== id)
      return true
    } catch (err: any) {
      if (err.status === 404) {
        error.value = 'Project not found or functionality unavailable'
      } else {
        error.value = err.message || 'Failed to delete project'
      }
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Computed properties with null checking
  const availableProjects = computed(() => {
    return projects.value.filter((project: { status: string }) => project.status === 'available')
  })

  const assignedProjects = computed(() => {
    return projects.value.filter((project: { status: string }) => project.status === 'assigned')
  })

  const completedProjects = computed(() => {
    return projects.value.filter((project: { status: string }) => project.status === 'completed')
  })

  const uniqueDomains = computed(() => {
    if (!projects.value || !Array.isArray(projects.value)) {
      return []
    }
    const domains = new Set(projects.value.map((project: { domain: any }) => project.domain).filter(Boolean))
    return Array.from(domains).sort()
  })

  // Filter function with null checking
  const filteredProjects = (searchQuery: string, selectedStatus: string, selectedDifficulty: string): Project[] => {
    if (!projects.value || !Array.isArray(projects.value)) {
      return []
    }
    
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