import { ref, computed, type Ref } from 'vue'
import { mainAPI } from '@/services/ApiFactory'
import type { Course } from '@/services/MainAPI'

interface UseCoursesReturn {
  courses: Ref<Course[]>
  isLoading: Ref<boolean>
  error: Ref<string | null>
  fetchCourses: () => Promise<void>
  createCourse: (data: Partial<Course>) => Promise<boolean>
  updateCourse: (id: string, data: Partial<Course>) => Promise<boolean>
  deleteCourse: (id: string) => Promise<boolean>
  clearError: () => void
  filteredCourses: (searchQuery: string, selectedLevel: string, selectedSemester: string) => Course[]
  uniqueLevels: Ref<string[]>
  uniqueSemesters: Ref<string[]>
}

export function useCourses(): UseCoursesReturn {
  // Initialize with empty array to prevent undefined access
  const courses = ref<Course[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const clearError = () => {
    error.value = null
  }

  const fetchCourses = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.getCourses()
      // API returns array directly, not paginated - ensure it's always an array
      courses.value = Array.isArray(response.data) ? response.data : []
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch courses'
      console.error('Error fetching courses:', err)
      // Ensure courses is still an empty array on error
      courses.value = []
    } finally {
      isLoading.value = false
    }
  }

  const createCourse = async (data: Partial<Course>): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.createCourse(data)
      if (response.data) {
        courses.value.push(response.data)
      }
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to create course'
      console.error('Error creating course:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const updateCourse = async (id: string, data: Partial<Course>): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.updateCourse(id, data)
      const index = courses.value.findIndex(c => c.id === id)
      if (index !== -1 && response.data) {
        courses.value[index] = response.data
      }
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to update course'
      console.error('Error updating course:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const deleteCourse = async (id: string): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      await mainAPI.deleteCourse(id)
      courses.value = courses.value.filter(c => c.id !== id)
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to delete course'
      console.error('Error deleting course:', err)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Computed properties with proper null checking
  const uniqueLevels = computed(() => {
    if (!courses.value || !Array.isArray(courses.value)) {
      return []
    }
    
    return Array.from(
      new Set(courses.value
        .map(course => course.level)
        .filter((l): l is string => typeof l === 'string' && l.length > 0)
      )
    ).sort()
  })

  const uniqueSemesters = computed(() => {
    if (!courses.value || !Array.isArray(courses.value)) {
      return []
    }
    
    return Array.from(
      new Set(courses.value
        .map(course => course.semester)
        .filter((s): s is string => typeof s === 'string' && s.length > 0)
      )
    ).sort()
  })

  // Filter function with proper null checking
  const filteredCourses = (searchQuery: string, selectedLevel: string, selectedSemester: string): Course[] => {
    if (!courses.value || !Array.isArray(courses.value)) {
      return []
    }
    
    return courses.value.filter((course) => {
      if (!course) return false
      
      const matchesSearch =
        !searchQuery ||
        (course.title && course.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (course.code && course.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (course.teacher && 
          `${course.teacher.first_name || ''} ${course.teacher.last_name || ''}`.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesLevel =
        !selectedLevel || course.level === selectedLevel

      const matchesSemester =
        !selectedSemester || course.semester === selectedSemester

      return matchesSearch && matchesLevel && matchesSemester
    })
  }

  return {
    courses,
    isLoading,
    error,
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
    clearError,
    filteredCourses,
    uniqueLevels,
    uniqueSemesters
  }
}
