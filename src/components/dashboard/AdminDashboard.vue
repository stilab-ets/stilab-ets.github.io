<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserAuth } from '@/hooks/auth/useUserAuth'
import { useAdminDashboard } from '@/hooks/dashboard/useAdminDashboard'

const { user } = useUserAuth()
const {
  isLoading,
  searchQuery,
  systemStats,
  recentActivity,
  hasErrors,
  errors,
  isApiHealthy,
  tabs,
  quickActions,
  contentFilters,
  filteredPendingContent,
  fetchDashboardData,
  approveContent,
  formatTimestamp,
  updateFilter
} = useAdminDashboard()

const activeTab = ref('overview')

const handleQuickAction = (action: any) => {
  if (action.title.includes('Content')) {
    activeTab.value = 'content'
  } else if (action.title.includes('System')) {
    activeTab.value = 'system'
  } else if (action.title.includes('Reports')) {
    activeTab.value = 'reports'
  } else {
    action.action()
  }
}

onMounted(() => {
  fetchDashboardData()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p class="text-gray-600">Welcome back, {{ user?.first_name || user?.username }}</p>
          </div>
          <div class="flex items-center space-x-3">
            <div :class="[
              'flex items-center px-3 py-1 rounded-full text-sm font-medium',
              isApiHealthy ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            ]">
              <div :class="[
                'w-2 h-2 rounded-full mr-2',
                isApiHealthy ? 'bg-green-500' : 'bg-red-500'
              ]"></div>
              System Health: {{ systemStats.systemHealth }}%
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Messages -->
    <div v-if="hasErrors" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div v-for="error in errors" :key="error.timestamp.getTime()" 
           class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <p class="text-red-800">{{ error.message }}</p>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            <component :is="tab.icon" class="w-5 h-5 inline-block mr-2" />
            {{ tab.label }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- Overview Tab -->
      <div v-if="activeTab === 'overview'" class="space-y-6">
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card class="p-6">
            <div class="flex items-center">
              <Users class="h-8 w-8 text-blue-500" />
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Users</p>
                <p class="text-2xl font-bold text-gray-900">{{ systemStats.totalUsers }}</p>
              </div>
            </div>
          </Card>
          
          <Card class="p-6">
            <div class="flex items-center">
              <Activity class="h-8 w-8 text-green-500" />
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Active Users</p>
                <p class="text-2xl font-bold text-gray-900">{{ systemStats.activeUsers }}</p>
              </div>
            </div>
          </Card>
          
          <Card class="p-6">
            <div class="flex items-center">
              <FileText class="h-8 w-8 text-yellow-500" />
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Pending Content</p>
                <p class="text-2xl font-bold text-gray-900">{{ systemStats.pendingContent }}</p>
              </div>
            </div>
          </Card>
          
          <Card class="p-6">
            <div class="flex items-center">
              <TrendingUp class="h-8 w-8 text-purple-500" />
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">System Health</p>
                <p class="text-2xl font-bold text-gray-900">{{ systemStats.systemHealth }}%</p>
              </div>
            </div>
          </Card>
        </div>

        <!-- Quick Actions -->
        <Card class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              v-for="action in quickActions"
              :key="action.title"
              @click="handleQuickAction(action)"
              class="p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200 text-left group"
            >
              <div :class="['w-10 h-10 rounded-lg flex items-center justify-center mb-3', action.color]">
                <component :is="action.icon" class="w-5 h-5 text-white" />
              </div>
              <h4 class="font-medium text-gray-900 group-hover:text-primary">{{ action.title }}</h4>
              <p class="text-sm text-gray-600 mt-1">{{ action.description }}</p>
            </button>
          </div>
        </Card>

        <!-- Recent Activity -->
        <Card class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start">
              <div :class="[
                'flex-shrink-0 w-2 h-2 rounded-full mt-2 mr-3',
                activity.type === 'user_registration' ? 'bg-green-500' :
                activity.type === 'content_submission' ? 'bg-blue-500' : 'bg-yellow-500'
              ]"></div>
              <div class="flex-1 min-w-0">
                <p class="text-sm text-gray-900">{{ activity.description }}</p>
                <p class="text-xs text-gray-500">{{ formatTimestamp(activity.timestamp) }}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Content Moderation Tab -->
      <div v-else-if="activeTab === 'content'" class="space-y-6">
        <Card class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Pending Reviews</h3>
          
          <!-- Search and Filters -->
          <SearchAndFilters
            v-model:search-query="searchQuery"
            :filters="contentFilters"
            search-label="Search Content"
            search-placeholder="Search by title or author..."
            :results-text="`${filteredPendingContent.length} items found`"
            @update-filter="updateFilter"
            class="mb-6"
          />
          
          <div v-if="filteredPendingContent.length === 0" class="text-center py-8">
            <p class="text-gray-500">No pending content to review</p>
          </div>
          <div v-else class="space-y-4">
            <div v-for="item in filteredPendingContent" :key="item.id" 
                 class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">{{ item.title }}</h4>
                <p class="text-sm text-gray-600">{{ item.author }} • {{ item.type }}</p>
                <p class="text-xs text-gray-500">{{ formatTimestamp(item.submittedAt) }}</p>
              </div>
              <div class="flex space-x-2">
                <Button 
                  @click="approveContent(item.id, item.type)"
                  variant="primary"
                  size="sm"
                >
                  Approve
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Other tabs placeholder -->
      <div v-else class="text-center py-12">
        <p class="text-gray-500">Content for {{ activeTab }} tab coming soon...</p>
      </div>
    </div>
  </div>
</template>