<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStudentDashboard } from '@/hooks/dashboard/useStudentDashboard'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
const {
  tabs,
  quickActions,
  studentStats,
  myProjects,
  nextEvents,
  isLoading
} = useStudentDashboard()

const activeTab = ref('overview')

const setActiveTab = (tabId: string) => {
  activeTab.value = tabId
}

const statsCards = computed(() => [
  {
    title: t.value.dashboard.student?.stats?.enrolledProjects || 'Enrolled Projects',
    value: studentStats.value.enrolledProjects,
    icon: 'Briefcase',
    color: 'text-blue-600'
  },
  {
    title: t.value.dashboard.student?.stats?.upcomingEvents || 'Upcoming Events',
    value: studentStats.value.upcomingEvents,
    icon: 'Calendar',
    color: 'text-green-600'
  },
  {
    title: t.value.dashboard.student?.stats?.completedCourses || 'Completed Courses',
    value: studentStats.value.completedCourses,
    icon: 'GraduationCap',
    color: 'text-purple-600'
  },
  {
    title: t.value.dashboard.student?.stats?.submissions || 'Submissions',
    value: studentStats.value.submissions,
    icon: 'FileText',
    color: 'text-orange-600'
  }
])

onMounted(() => {
  // Initialize dashboard data
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ t.dashboard.student?.title || 'Student Dashboard' }}
        </h1>
        <p class="mt-2 text-gray-600">
          {{ t.dashboard.student?.welcome || 'Welcome back,' }}
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <div v-else>
        <!-- Tab Navigation -->
        <div class="border-b border-gray-200 mb-8">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="setActiveTab(tab.id)"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <!-- Overview Tab -->
        <div v-if="activeTab === 'overview'">
          <!-- Stats Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div
              v-for="stat in statsCards"
              :key="stat.title"
              class="bg-white rounded-lg shadow p-6"
            >
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <component :is="stat.icon" :class="['h-8 w-8', stat.color]" />
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500">{{ stat.title }}</p>
                  <p class="text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="mb-8">
            <h2 class="text-lg font-medium text-gray-900 mb-4">
              {{ t.dashboard.student?.actions.quickActions || 'Quick Actions' }}
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                v-for="action in quickActions"
                :key="action.title"
                @click="action.action"
                class="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 text-left"
              >
                <div class="flex items-center mb-2">
                  <div :class="['p-2 rounded-md', action.color]">
                    <component :is="action.icon" class="h-5 w-5 text-white" />
                  </div>
                </div>
                <h3 class="text-sm font-medium text-gray-900">{{ action.title }}</h3>
                <p class="text-sm text-gray-500">{{ action.description }}</p>
              </button>
            </div>
          </div>

          <!-- My Projects -->
          <div class="mb-8">
            <h2 class="text-lg font-medium text-gray-900 mb-4">
              {{ t.dashboard.student?.overview.myProjects || 'My Projects' }}
            </h2>
            <div class="bg-white rounded-lg shadow">
              <div v-if="myProjects.length === 0" class="p-6 text-center">
                <p class="text-gray-500">
                  {{ t.dashboard.student?.projects.noProjects || 'No enrolled projects yet' }}
                </p>
              </div>
              <div v-else class="divide-y divide-gray-200">
                <div
                  v-for="project in myProjects"
                  :key="project.id"
                  class="p-6 hover:bg-gray-50"
                >
                  <h3 class="text-lg font-medium text-gray-900">{{ project.title }}</h3>
                  <div class="mt-2 flex items-center text-sm text-gray-500">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {{ project.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Upcoming Events -->
          <div>
            <h2 class="text-lg font-medium text-gray-900 mb-4">
              {{ t.dashboard.student?.overview.upcomingEvents || 'Upcoming Events' }}
            </h2>
            <div class="bg-white rounded-lg shadow">
              <div v-if="nextEvents.length === 0" class="p-6 text-center">
                <p class="text-gray-500">
                  {{ t.dashboard.student?.events.noEvents || 'No upcoming events' }}
                </p>
              </div>
              <div v-else class="divide-y divide-gray-200">
                <div
                  v-for="event in nextEvents"
                  :key="event.id"
                  class="p-6 hover:bg-gray-50"
                >
                  <h3 class="text-lg font-medium text-gray-900">{{ event.title }}</h3>
                  <p class="text-sm text-gray-600 mt-1">{{ event.description }}</p>
                  <div class="mt-2 flex items-center text-sm text-gray-500">
                    <Calendar class="h-4 w-4 mr-1" />
                    <span>{{ event.date }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Projects Tab -->
        <div v-else-if="activeTab === 'projects'" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">My Projects</h2>
          <p class="text-gray-500">Project management interface would go here.</p>
        </div>

        <!-- Courses Tab -->
        <div v-else-if="activeTab === 'courses'" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Courses</h2>
          <p class="text-gray-500">Course management interface would go here.</p>
        </div>

        <!-- Events Tab -->
        <div v-else-if="activeTab === 'events'" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Events</h2>
          <p class="text-gray-500">Event registration interface would go here.</p>
        </div>

        <!-- Profile Tab -->
        <div v-else-if="activeTab === 'profile'" class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Profile</h2>
          <p class="text-gray-500">Profile management interface would go here.</p>
        </div>
      </div>
    </div>
  </div>
</template>