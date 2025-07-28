import { ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useApiStatus } from '@/hooks/api/useApiStatus'
import { useErrorHandler } from '@/hooks/api/useErrorHandler'
import { mainAPI } from '@/services/ApiFactory'

interface SystemStats {
  totalUsers: number
  activeUsers: number
  pendingContent: number
  systemHealth: number
}

interface RecentActivity {
  id: string
  type: 'user_registration' | 'content_submission' | 'system_alert'
  description: string
  timestamp: Date
  user?: string
}

interface PendingContent {
  id: string
  type: 'publication' | 'event' | 'project'
  title: string
  author: string
  submittedAt: Date
}

export function useAdminDashboard() {
  const { t } = useLanguage()
  const { isApiHealthy } = useApiStatus()
  const { handleApiCall, hasErrors, errors } = useErrorHandler()

  const isLoading = ref(false)
  const searchQuery = ref('')
  const systemStats = ref<SystemStats>({
    totalUsers: 0,
    activeUsers: 0,
    pendingContent: 0,
    systemHealth: 100
  })
  const recentActivity = ref<RecentActivity[]>([])
  const pendingContent = ref<PendingContent[]>([])

  const tabs = computed(() => [
    { id: 'overview', label: t.value.dashboard.admin.tabs.overview, icon: 'BarChart3' },
    { id: 'users', label: t.value.dashboard.admin.tabs.users, icon: 'Users' },
    { id: 'content', label: t.value.dashboard.admin.tabs.content, icon: 'FileText' },
    { id: 'system', label: t.value.dashboard.admin.tabs.system, icon: 'Settings' },
    { id: 'reports', label: t.value.dashboard.admin.tabs.reports, icon: 'TrendingUp' }
  ])

  const quickActions = computed(() => [
    {
      title: t.value.dashboard.admin.actions.inviteUser,
      description: t.value.dashboard.admin.actions.inviteUserDesc,
      icon: 'UserPlus',
      action: () => navigateToInvite(),
      color: 'bg-blue-500'
    },
    {
      title: t.value.dashboard.admin.actions.moderateContent,
      description: t.value.dashboard.admin.actions.moderateContentDesc,
      icon: 'Shield',
      action: () => console.log('Switch to content tab'),
      color: 'bg-green-500'
    },
    {
      title: t.value.dashboard.admin.actions.systemSettings,
      description: t.value.dashboard.admin.actions.systemSettingsDesc,
      icon: 'Cog',
      action: () => console.log('Switch to system tab'),
      color: 'bg-purple-500'
    },
    {
      title: t.value.dashboard.admin.actions.viewReports,
      description: t.value.dashboard.admin.actions.viewReportsDesc,
      icon: 'BarChart',
      action: () => console.log('Switch to reports tab'),
      color: 'bg-orange-500'
    }
  ])

  const contentFilters = computed(() => [
    {
      id: 'type',
      label: 'Content Type',
      value: '',
      options: [
        { value: '', label: 'All Types' },
        { value: 'publication', label: 'Publications' },
        { value: 'event', label: 'Events' },
        { value: 'project', label: 'Projects' }
      ]
    }
  ])

  const filteredPendingContent = computed(() => {
    return pendingContent.value.filter(item => {
      const matchesSearch = !searchQuery.value ||
        item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.value.toLowerCase())
      return matchesSearch
    })
  })

  const fetchSystemStats = async () => {
    const membersResponse = await handleApiCall(() => mainAPI.getMembers())
    const publicationsResponse = await handleApiCall(() => mainAPI.getPublications())
    const eventsResponse = await handleApiCall(() => mainAPI.getEvents())
    
    if (membersResponse && publicationsResponse && eventsResponse) {
      const members = membersResponse.data.results
      const publications = publicationsResponse.data.results
      const events = eventsResponse.data.results
      
      systemStats.value = {
        totalUsers: members.length,
        activeUsers: members.filter(m => m.is_active).length,
        pendingContent: publications.length + events.length, // Simplified for now
        systemHealth: isApiHealthy.value ? 100 : 75
      }
    }
  }

  const fetchRecentActivity = async () => {
    // Mock data - in real app, this would come from an audit log API
    recentActivity.value = [
      {
        id: '1',
        type: 'user_registration',
        description: t.value.dashboard.admin.recentActivity.userRegistered,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        user: 'Alice Johnson'
      },
      {
        id: '2',
        type: 'content_submission',
        description: t.value.dashboard.admin.recentActivity.contentSubmitted,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        user: 'Bob Smith'
      },
      {
        id: '3',
        type: 'system_alert',
        description: t.value.dashboard.admin.recentActivity.systemAlert,
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000)
      }
    ]
  }

  const fetchPendingContent = async () => {
    const publicationsResponse = await handleApiCall(() => mainAPI.getPublications())
    const eventsResponse = await handleApiCall(() => mainAPI.getEvents())
    
    if (publicationsResponse && eventsResponse) {
      const publications = publicationsResponse.data.results
      const events = eventsResponse.data.results
      
      pendingContent.value = [
        ...publications
          .slice(0, 5) // Show first 5 as "pending" for demo
          .map(p => ({
            id: p.id.toString(),
            type: 'publication' as const,
            title: p.title,
            author: p.authors,
            submittedAt: new Date(p.created_at)
          })),
        ...events
          .slice(0, 3) // Show first 3 as "pending" for demo
          .map(e => ({
            id: e.id.toString(),
            type: 'event' as const,
            title: e.title,
            author: e.speaker || 'Unknown',
            submittedAt: new Date(e.created_at)
          }))
      ]
    }
  }

  const fetchDashboardData = async () => {
    isLoading.value = true
    
    await Promise.all([
      fetchSystemStats(),
      fetchRecentActivity(),
      fetchPendingContent()
    ])
    
    isLoading.value = false
  }

  const approveContent = async (contentId: string, contentType: string) => {
    try {
      if (contentType === 'publication') {
        const response = await handleApiCall(() => 
          mainAPI.updatePublication(parseInt(contentId), { title: 'Updated' }) // Simplified update
        )
        if (response) {
          pendingContent.value = pendingContent.value.filter(item => item.id !== contentId)
        }
      } else if (contentType === 'event') {
        const response = await handleApiCall(() => 
          mainAPI.updateEvent(parseInt(contentId), { title: 'Updated' }) // Simplified update
        )
        if (response) {
          pendingContent.value = pendingContent.value.filter(item => item.id !== contentId)
        }
      }
    } catch (error) {
      console.error('Failed to approve content:', error)
    }
  }

  const navigateToInvite = () => {
    console.log('Navigate to invite user form')
  }

  const formatTimestamp = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.floor((date.getTime() - Date.now()) / (1000 * 60 * 60)),
      'hour'
    )
  }

  const updateFilter = (filterId: string, value: string) => {
    console.log(`Filter ${filterId} updated to:`, value)
  }

  return {
    // State
    isLoading,
    searchQuery,
    systemStats,
    recentActivity,
    pendingContent,
    hasErrors,
    errors,
    isApiHealthy,

    // Computed
    tabs,
    quickActions,
    contentFilters,
    filteredPendingContent,

    // Methods
    fetchDashboardData,
    approveContent,
    navigateToInvite,
    formatTimestamp,
    updateFilter
  }
}