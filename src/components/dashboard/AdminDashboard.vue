<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useAuthMiddleware } from '@/middleware/auth'

// Hooks
const { t } = useLanguage()
const { user } = useAuthMiddleware()

// Component state
const activeTab = ref('overview')
const showInviteModal = ref(false)

// Define available tabs
const tabs = computed(() => [
  { id: 'overview', label: t.value.dashboard.admin.tabs.overview, icon: 'BarChart3' },
  { id: 'users', label: t.value.dashboard.admin.tabs.users, icon: 'Users' },
  { id: 'content', label: t.value.dashboard.admin.tabs.content, icon: 'FileText' },
  { id: 'system', label: t.value.dashboard.admin.tabs.system, icon: 'Settings' },
  { id: 'reports', label: t.value.dashboard.admin.tabs.reports, icon: 'TrendingUp' }
])

// Component props
const emit = defineEmits<{
  navigate: [page: string]
}>()

// Quick actions
const quickActions = computed(() => [
  { 
    title: t.value.dashboard.admin.actions.inviteUser,
    description: t.value.dashboard.admin.actions.inviteUserDesc,
    icon: 'UserPlus',
    action: () => showInviteModal.value = true,
    color: 'bg-blue-500'
  },
  {
    title: t.value.dashboard.admin.actions.moderateContent,
    description: t.value.dashboard.admin.actions.moderateContentDesc,
    icon: 'Shield',
    action: () => activeTab.value = 'content',
    color: 'bg-green-500'
  },
  {
    title: t.value.dashboard.admin.actions.systemSettings,
    description: t.value.dashboard.admin.actions.systemSettingsDesc,
    icon: 'Cog',
    action: () => activeTab.value = 'system',
    color: 'bg-purple-500'
  },
  {
    title: t.value.dashboard.admin.actions.viewReports,
    description: t.value.dashboard.admin.actions.viewReportsDesc,
    icon: 'BarChart',
    action: () => activeTab.value = 'reports',
    color: 'bg-orange-500'
  }
])
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <PageHeader 
      :title="t.dashboard.admin.title"
      :subtitle="`${t.dashboard.admin.welcome} ${user?.first_name || user?.username}`"
    />

    <!-- Quick Actions Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card
        v-for="action in quickActions"
        :key="action.title"
        class="cursor-pointer hover:shadow-lg transition-shadow duration-200"
        @click="action.action"
      >
        <div class="flex items-center p-4">
          <div :class="[action.color, 'p-3 rounded-lg text-white mr-4']">
            <component :is="action.icon" class="h-6 w-6" />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">{{ action.title }}</h3>
            <p class="text-sm text-gray-600">{{ action.description }}</p>
          </div>
        </div>
      </Card>
    </div>

    <!-- Tab Navigation -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="-mb-px flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2',
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          <component :is="tab.icon" class="h-4 w-4" />
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="space-y-6">
      <!-- Overview Tab -->
      <div v-if="activeTab === 'overview'" class="space-y-6">
        <StatisticsGrid 
          :stats="[
            { label: t.dashboard.admin.stats.totalUsers, value: '47', trend: '+12%' },
            { label: t.dashboard.admin.stats.activeUsers, value: '42', trend: '+5%' },
            { label: t.dashboard.admin.stats.pendingContent, value: '8', trend: '-3%' },
            { label: t.dashboard.admin.stats.systemHealth, value: '98%', trend: '+1%' }
          ]"
        />

        <!-- Recent Activity -->
        <Card>
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-4">{{ t.dashboard.admin.recentActivity.title }}</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between py-2 border-b">
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span class="text-sm">{{ t.dashboard.admin.recentActivity.userRegistered }}</span>
                </div>
                <span class="text-xs text-gray-500">2 hours ago</span>
              </div>
              <div class="flex items-center justify-between py-2 border-b">
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span class="text-sm">{{ t.dashboard.admin.recentActivity.contentSubmitted }}</span>
                </div>
                <span class="text-xs text-gray-500">4 hours ago</span>
              </div>
              <div class="flex items-center justify-between py-2">
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span class="text-sm">{{ t.dashboard.admin.recentActivity.systemAlert }}</span>
                </div>
                <span class="text-xs text-gray-500">6 hours ago</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Users Tab -->
      <div v-else-if="activeTab === 'users'">
        <AdminManagementForm />
      </div>

      <!-- Content Tab -->
      <div v-else-if="activeTab === 'content'" class="space-y-6">
        <Card>
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold">{{ t.dashboard.admin.content.pendingReviews }}</h3>
              <Button variant="outline" size="sm">
                {{ t.dashboard.admin.content.reviewAll }}
              </Button>
            </div>
            
            <!-- Pending Publications -->
            <div class="space-y-4">
              <div class="border rounded-lg p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="font-medium text-gray-900">New Research Paper on AI Ethics</h4>
                    <p class="text-sm text-gray-600 mt-1">Submitted by Dr. Sarah Johnson</p>
                    <p class="text-xs text-gray-500 mt-2">Submitted 2 days ago</p>
                  </div>
                  <div class="flex space-x-2">
                    <Button size="sm" variant="outline">
                      {{ t.dashboard.admin.content.review }}
                    </Button>
                    <Button size="sm">
                      {{ t.dashboard.admin.content.approve }}
                    </Button>
                  </div>
                </div>
              </div>

              <!-- Pending Events -->
              <div class="border rounded-lg p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="font-medium text-gray-900">AI Workshop Series</h4>
                    <p class="text-sm text-gray-600 mt-1">Submitted by Prof. Michael Chen</p>
                    <p class="text-xs text-gray-500 mt-2">Submitted 1 day ago</p>
                  </div>
                  <div class="flex space-x-2">
                    <Button size="sm" variant="outline">
                      {{ t.dashboard.admin.content.review }}
                    </Button>
                    <Button size="sm">
                      {{ t.dashboard.admin.content.approve }}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- System Tab -->
      <div v-else-if="activeTab === 'system'" class="space-y-6">
        <Card>
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-4">{{ t.dashboard.admin.system.settings }}</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.dashboard.admin.system.maintenanceMode }}
                </label>
                <div class="flex items-center">
                  <input type="checkbox" class="rounded border-gray-300" />
                  <span class="ml-2 text-sm text-gray-600">Enable maintenance mode</span>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.dashboard.admin.system.registrationOpen }}
                </label>
                <div class="flex items-center">
                  <input type="checkbox" checked class="rounded border-gray-300" />
                  <span class="ml-2 text-sm text-gray-600">Allow new registrations</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <!-- System Health -->
        <Card>
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-4">{{ t.dashboard.admin.system.health }}</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Database Connection</span>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span class="text-sm text-green-600">Healthy</span>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">API Response Time</span>
                <span class="text-sm text-gray-900">< 200ms</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Storage Usage</span>
                <span class="text-sm text-gray-900">73% (2.1GB)</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Reports Tab -->
      <div v-else-if="activeTab === 'reports'">
        <Card>
          <div class="p-6">
            <h3 class="text-lg font-semibold mb-4">{{ t.dashboard.admin.reports.title }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                class="h-20 flex flex-col items-center justify-center"
                @click="emit('navigate', 'reports-users')"
              >
                <component :is="'Users'" class="h-6 w-6 mb-2" />
                <span class="text-sm">{{ t.dashboard.admin.reports.userReport }}</span>
              </Button>
              <Button 
                variant="outline" 
                class="h-20 flex flex-col items-center justify-center"
                @click="emit('navigate', 'reports-content')"
              >
                <component :is="'FileText'" class="h-6 w-6 mb-2" />
                <span class="text-sm">{{ t.dashboard.admin.reports.contentReport }}</span>
              </Button>
              <Button 
                variant="outline" 
                class="h-20 flex flex-col items-center justify-center"
                @click="emit('navigate', 'reports-system')"
              >
                <component :is="'Activity'" class="h-6 w-6 mb-2" />
                <span class="text-sm">{{ t.dashboard.admin.reports.systemReport }}</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>