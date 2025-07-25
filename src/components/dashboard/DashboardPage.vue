<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthMiddleware } from '@/middleware/auth'
import { mainAPI } from '@/services/ApiFactory'
import { FileText, Calendar, Users, Award, Briefcase, Search } from 'lucide-vue-next'
import Card from '@/ui/Card.vue'

const emit = defineEmits<{
  setCurrentPage: [page: string]
}>()

const { getUser } = useAuthMiddleware()

// Dashboard data
const stats = ref({
  publications: 0,
  projects: 0,
  events: 0,
  members: 0,
  awards: 0
})

const recentActivity = ref<Array<{
  type: string
  title: string
  time: string
}>>([])

const loading = ref(false)

// Computed
const fullName = computed(() => {
  const currentUser = getUser()
  if (currentUser?.first_name && currentUser?.last_name) {
    return `${currentUser.first_name} ${currentUser.last_name}`
  }
  return currentUser?.username || 'User'
})

const quickActions = [
  { id: 'create-publication', label: 'Add Publication', icon: FileText, color: 'bg-blue-500' },
  { id: 'create-event', label: 'Create Event', icon: Calendar, color: 'bg-green-500' },
  { id: 'create-project', label: 'New Project', icon: Search, color: 'bg-purple-500' },
  { id: 'create-member', label: 'Add Member', icon: Users, color: 'bg-orange-500' },
  { id: 'create-award', label: 'Add Award', icon: Award, color: 'bg-yellow-500' },
  { id: 'create-vacancy', label: 'Post Vacancy', icon: Briefcase, color: 'bg-pink-500' }
]

// Methods
const fetchDashboardData = async () => {
  loading.value = true
  
  try {
    // Fetch all data in parallel
    const [
      publicationsResponse,
      projectsResponse,
      membersResponse,
      awardsResponse
    ] = await Promise.allSettled([
      mainAPI.getPublications(),
      mainAPI.getProjects(),
      mainAPI.getMembers(),
      mainAPI.getAwards()
    ])

    // Update stats
    if (publicationsResponse.status === 'fulfilled') {
      stats.value.publications = publicationsResponse.value.data.count || publicationsResponse.value.data.results?.length || 0
      
      // Add recent publications to activity
      const recentPubs = publicationsResponse.value.data.results?.slice(0, 2) || []
      recentPubs.forEach(pub => {
        recentActivity.value.push({
          type: 'publication',
          title: pub.title,
          time: getRelativeTime(pub.created_at)
        })
      })
    } else {
      console.warn('Failed to fetch publications:', publicationsResponse.reason)
    }

    if (projectsResponse.status === 'fulfilled') {
      stats.value.projects = projectsResponse.value.data.count || projectsResponse.value.data.results?.length || 0
      
      // Add recent projects to activity
      const recentProjects = projectsResponse.value.data.results?.slice(0, 2) || []
      recentProjects.forEach(project => {
        recentActivity.value.push({
          type: 'project',
          title: project.title,
          time: getRelativeTime(project.created_at)
        })
      })
    } else {
      console.warn('Failed to fetch projects:', projectsResponse.reason)
    }

    if (membersResponse.status === 'fulfilled') {
      stats.value.members = membersResponse.value.data.count || membersResponse.value.data.results?.length || 0
    } else {
      console.warn('Failed to fetch members:', membersResponse.reason)
    }

    if (awardsResponse.status === 'fulfilled') {
      stats.value.awards = awardsResponse.value.data.count || awardsResponse.value.data.results?.length || 0
      
      // Add recent awards to activity
      const recentAwards = awardsResponse.value.data.results?.slice(0, 1) || []
      recentAwards.forEach(award => {
        recentActivity.value.push({
          type: 'award',
          title: award.title,
          time: getRelativeTime(award.created_at)
        })
      })
    } else {
      console.warn('Failed to fetch awards:', awardsResponse.reason)
    }

    // Sort activity by most recent (assuming created_at format)
    recentActivity.value.sort((a, b) => {
      // This is a simple sort - in production you'd want better date handling
      return b.time.localeCompare(a.time)
    })
    
    // Keep only the 5 most recent items
    recentActivity.value = recentActivity.value.slice(0, 5)

  } catch (error) {
    console.warn('Error fetching dashboard data:', error)
  } finally {
    loading.value = false
  }
}

const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`
  } else if (diffInMinutes < 1440) { // 24 hours
    const hours = Math.floor(diffInMinutes / 60)
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else {
    const days = Math.floor(diffInMinutes / 1440)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }
}

const handleNavigation = (pageId: string) => {
  emit('setCurrentPage', pageId)
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'publication': return FileText
    case 'project': return Search
    case 'award': return Award
    case 'event': return Calendar
    default: return FileText
  }
}

const getActivityColor = (type: string) => {
  switch (type) {
    case 'publication': return 'text-blue-500'
    case 'project': return 'text-purple-500'
    case 'award': return 'text-yellow-500'
    case 'event': return 'text-green-500'
    default: return 'text-gray-500'
  }
}

// Lifecycle
onMounted(() => {
  fetchDashboardData()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {{ fullName }}!
        </h1>
        <p class="text-gray-600">
          Manage your research activities and laboratory content
        </p>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#08a4d4]"></div>
        <span class="ml-2 text-gray-600">Loading dashboard...</span>
      </div>

      <div v-else>
        <!-- Quick actions grid -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <button
              v-for="action in quickActions"
              :key="action.id"
              @click="handleNavigation(action.id)"
              class="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-[#08a4d4] transition-all duration-200 group"
            >
              <div :class="[action.color, 'w-12 h-12 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200']">
                <component :is="action.icon" class="h-6 w-6 text-white" />
              </div>
              <span class="text-sm font-medium text-gray-900 text-center">{{ action.label }}</span>
            </button>
          </div>
        </div>

        <!-- Dashboard sections -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Recent activity -->
          <div class="lg:col-span-2">
            <Card>
              <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div v-if="recentActivity.length > 0" class="space-y-4">
                  <div
                    v-for="activity in recentActivity"
                    :key="`${activity.type}-${activity.title}`"
                    class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div class="flex-shrink-0">
                      <component 
                        :is="getActivityIcon(activity.type)" 
                        :class="['h-5 w-5', getActivityColor(activity.type)]" 
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                      <p class="text-sm text-gray-500">{{ activity.time }}</p>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-8">
                  <p class="text-gray-500">No recent activity</p>
                </div>
              </div>
            </Card>
          </div>

          <!-- Quick stats -->
          <div class="space-y-6">
            <Card>
              <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div class="space-y-4">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Publications</span>
                    <span class="text-lg font-semibold text-gray-900">{{ stats.publications }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Active Projects</span>
                    <span class="text-lg font-semibold text-gray-900">{{ stats.projects }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Team Members</span>
                    <span class="text-lg font-semibold text-gray-900">{{ stats.members }}</span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Awards</span>
                    <span class="text-lg font-semibold text-gray-900">{{ stats.awards }}</span>
                  </div>
                </div>
              </div>
            </Card>

            <!-- Quick links -->
            <Card>
              <div class="p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
                <div class="space-y-2">
                  <button
                    @click="handleNavigation('user-settings')"
                    class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#08a4d4] rounded-md transition-colors duration-200"
                  >
                    Profile Settings
                  </button>
                  <button
                    @click="handleNavigation('admin-management')"
                    class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#08a4d4] rounded-md transition-colors duration-200"
                  >
                    Admin Panel
                  </button>
                  <button
                    @click="handleNavigation('publications')"
                    class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#08a4d4] rounded-md transition-colors duration-200"
                  >
                    View Publications
                  </button>
                  <button
                    @click="handleNavigation('projects')"
                    class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#08a4d4] rounded-md transition-colors duration-200"
                  >
                    View Projects
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>