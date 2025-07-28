import { ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { usePublications } from '@/hooks/publications/usePublications'
import { useProjects } from '@/hooks/projects/useProjects'
import { useEvents } from '@/hooks/events/useEvents'
import { useErrorHandler } from '@/hooks/api/useErrorHandler'

interface UserStats {
  publications: number
  activeProjects: number
  students: number
  upcomingEvents: number
}

export function useProfessorDashboard() {
  const { t } = useLanguage()
  const { publications, fetchPublications } = usePublications()
  const { projects, fetchProjects } = useProjects()
  const { upcomingEvents, fetchEvents } = useEvents()
  const { hasErrors, errors } = useErrorHandler()

  const isLoading = ref(false)

  const tabs = computed(() => [
    { id: 'overview', label: t.value.dashboard.professor.tabs.overview, icon: 'BarChart3' },
    { id: 'publications', label: t.value.dashboard.professor.tabs.publications, icon: 'FileText' },
    { id: 'teaching', label: t.value.dashboard.professor.tabs.teaching, icon: 'GraduationCap' },
    { id: 'research', label: t.value.dashboard.professor.tabs.research, icon: 'TrendingUp' },
    { id: 'students', label: t.value.dashboard.professor.tabs.students, icon: 'Users' },
    { id: 'profile', label: t.value.dashboard.professor.tabs.profile, icon: 'User' }
  ])

  const quickActions = computed(() => [
    {
      title: t.value.dashboard.professor.actions.addPublication,
      description: t.value.dashboard.professor.actions.addPublicationDesc,
      icon: 'Plus',
      action: () => navigateToForm('publication-form'),
      color: 'bg-blue-500'
    },
    {
      title: t.value.dashboard.professor.actions.createEvent,
      description: t.value.dashboard.professor.actions.createEventDesc,
      icon: 'Calendar',
      action: () => navigateToForm('event-form'),
      color: 'bg-green-500'
    },
    {
      title: t.value.dashboard.professor.actions.manageProject,
      description: t.value.dashboard.professor.actions.manageProjectDesc,
      icon: 'Briefcase',
      action: () => console.log('Switch to research tab'),
      color: 'bg-purple-500'
    },
    {
      title: t.value.dashboard.professor.actions.updateProfile,
      description: t.value.dashboard.professor.actions.updateProfileDesc,
      icon: 'Settings',
      action: () => console.log('Switch to profile tab'),
      color: 'bg-orange-500'
    }
  ])

  const userStats = computed<UserStats>(() => ({
    publications: publications.value.length,
    activeProjects: projects.value.filter(p => p.status === 'available').length,
    students: 0, // Would be calculated from actual student data
    upcomingEvents: upcomingEvents.value.length
  }))

  const recentPublications = computed(() => 
    publications.value
      .slice()
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5)
  )

  const activeProjects = computed(() => 
    projects.value
      .filter(p => p.status === 'available')
      .slice(0, 3)
  )

  const nextEvents = computed(() => 
    upcomingEvents.value
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3)
  )

  const fetchDashboardData = async () => {
    isLoading.value = true
    
    await Promise.all([
      fetchPublications(),
      fetchProjects(),
      fetchEvents()
    ])
    
    isLoading.value = false
  }

  const navigateToForm = (formType: string) => {
    console.log(`Navigate to ${formType}`)
  }

  const navigateToPage = (page: string) => {
    console.log(`Navigate to ${page}`)
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
    userStats,
    recentPublications,
    activeProjects,
    nextEvents,
    publications,

    // Methods
    fetchDashboardData,
    navigateToForm,
    navigateToPage,
    formatDate
  }
}