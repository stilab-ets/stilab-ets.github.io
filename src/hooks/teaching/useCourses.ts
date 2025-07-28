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
      // API returns array directly, not paginated
      courses.value = response.data || []
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch courses'
      console.error('Error fetching courses:', err)
    } finally {
      isLoading.value = false
    }
  }

  const createCourse = async (data: Partial<Course>): Promise<boolean> => {
    isLoading.value = true
    error.value = null
    
    try {
      const response = await mainAPI.createCourse(data)
      courses.value.push(response.data)
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
      if (index !== -1) {
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

    // Computed properties
    const uniqueLevels = computed(() => {
    return Array.from(
        new Set(courses.value.map(course => course.level).filter((l): l is string => typeof l === 'string'))
    ).sort()
    })

    const uniqueSemesters = computed(() => {
    return Array.from(
        new Set(courses.value.map(course => course.semester).filter((s): s is string => typeof s === 'string'))
    ).sort()
    })


  // Filter function
  const filteredCourses = (searchQuery: string, selectedLevel: string, selectedSemester: string): Course[] => {
    return courses.value.filter((course) => {
      const matchesSearch =
        !searchQuery ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (course.teacher && 
          `${course.teacher.first_name} ${course.teacher.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()))

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