<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useLanguage } from '@/composables/useLanguage'
import { Plus, FileText, Calendar, Users, Award, Briefcase, BookOpen, Search } from 'lucide-vue-next'

const emit = defineEmits<{
  setCurrentPage: [page: string]
}>()

const { user, fullName } = useAuth()
const { t } = useLanguage()

const quickActions = [
  { id: 'create-publication', label: 'Add Publication', icon: FileText, color: 'bg-blue-500' },
  { id: 'create-event', label: 'Create Event', icon: Calendar, color: 'bg-green-500' },
  { id: 'create-project', label: 'New Project', icon: Search, color: 'bg-purple-500' },
  { id: 'create-member', label: 'Add Member', icon: Users, color: 'bg-orange-500' },
  { id: 'create-award', label: 'Add Award', icon: Award, color: 'bg-yellow-500' },
  { id: 'create-vacancy', label: 'Post Vacancy', icon: Briefcase, color: 'bg-pink-500' }
]

const recentActivity = ref([
  { type: 'publication', title: 'AI in Software Engineering', time: '2 hours ago' },
  { type: 'event', title: 'Weekly Lab Meeting', time: '1 day ago' },
  { type: 'project', title: 'Cloud Architecture Framework', time: '3 days ago' }
])

const handleNavigation = (pageId: string) => {
  emit('setCurrentPage', pageId)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {{ fullName || user?.username }}!
        </h1>
        <p class="text-gray-600">
          Manage your research activities and laboratory content
        </p>
      </div>

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
              <div class="space-y-4">
                <div
                  v-for="activity in recentActivity"
                  :key="activity.title"
                  class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div class="flex-shrink-0">
                    <FileText v-if="activity.type === 'publication'" class="h-5 w-5 text-blue-500" />
                    <Calendar v-else-if="activity.type === 'event'" class="h-5 w-5 text-green-500" />
                    <Search v-else class="h-5 w-5 text-purple-500" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                    <p class="text-sm text-gray-500">{{ activity.time }}</p>
                  </div>
                </div>
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
                  <span class="text-lg font-semibold text-gray-900">24</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Active Projects</span>
                  <span class="text-lg font-semibold text-gray-900">8</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Upcoming Events</span>
                  <span class="text-lg font-semibold text-gray-900">3</span>
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
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>