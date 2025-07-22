import { ref, computed } from 'vue'
import { useProjects } from '@/hooks/projects/useProjects'
import { useEvents } from '@/hooks/events/useEvents'
import { useErrorHandler } from '@/hooks/api/useErrorHandler'

interface StudentStats {
  enrolledProjects: number
  upcomingEvents: number
  completedCourses: number
  submissions: number
}

export function useStudentDashboard() {
  const { projects, fetchProjects } = useProjects()
  const { upcomingEvents, fetchEvents } = useEvents()
  const { hasErrors, errors } = useErrorHandler()

  const isLoading = ref(false)

  const tabs = computed(() => [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'projects', label: 'My Projects', icon: 'Briefcase' },
    { id: 'courses', label: 'Courses', icon: 'GraduationCap' },
    { id: 'events', label: 'Events', icon: 'Calendar' },
    { id: 'profile', label: 'Profile', icon: 'User' }
  ])

  const quickActions = computed(() => [
    {
      title: 'Browse Projects',
      description: 'Find new research opportunities',
      icon: 'Plus',
      action: () => navigateToPage('projects'),
      color: 'bg-blue-500'
    },
    {
      title: 'Register for Events',
      description: 'Join upcoming seminars and workshops',
      icon: 'Calendar',
      action: () => navigateToPage('events'),
      color: 'bg-green-500'
    },
    {
      title: 'View Courses',
      description: 'Check your enrolled courses',
      icon: 'GraduationCap',
      action: () => console.log('Switch to courses tab'),
      color: 'bg-purple-500'
    },
    {
      title: 'Update Profile',
      description: 'Manage your account settings',
      icon: 'Settings',
      action: () => console.log('Switch to profile tab'),
      color: 'bg-orange-500'
    }
  ])

  const studentStats = computed<StudentStats>(() => ({
    enrolledProjects: projects.value.filter(p => p.status === 'assigned').length,
    upcomingEvents: upcomingEvents.value.length,
    completedCourses: 0, // Would be calculated from actual course data
    submissions: 0 // Would be calculated from actual submission data
  }))

  const myProjects = computed(() => 
    projects.value.filter(p => p.status === 'assigned').slice(0, 3)
  )

  const nextEvents = computed(() => 
    upcomingEvents.value
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3)
  )

  const availableProjects = computed(() => 
    projects.value.filter(p => p.status === 'available').slice(0, 5)
  )

  const fetchDashboardData = async () => {
    isLoading.value = true
    
    await Promise.all([
      fetchProjects(),
      fetchEvents()
    ])
    
    isLoading.value = false
  }

  const navigateToPage = (page: string) => {
    console.log(`Navigate to ${page}`)
  }

  const expressInterest = (projectId: number) => {
    console.log(`Express interest in project ${projectId}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return {
    // State
    isLoading,
    hasErrors,
    errors,

    // Computed
    tabs,
    quickActions,
    studentStats,
    myProjects,
    nextEvents,
    availableProjects,

    // Methods
    fetchDashboardData,
    navigateToPage,
    expressInterest,
    formatDate
  }
}