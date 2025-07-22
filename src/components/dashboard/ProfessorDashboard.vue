<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useAuthMiddleware } from '@/middleware/auth'

// Hooks
const { t } = useLanguage()
const { user } = useAuthMiddleware()

// Component state
const activeTab = ref('overview')
const showPublicationForm = ref(false)
const showEventForm = ref(false)
const showProjectForm = ref(false)

// Component props
const emit = defineEmits<{
  navigate: [page: string]
}>()

// Define available tabs
const tabs = computed(() => [
  { id: 'overview', label: t.value.dashboard.professor.tabs.overview, icon: 'Home' },
  { id: 'publications', label: t.value.dashboard.professor.tabs.publications, icon: 'FileText' },
  { id: 'teaching', label: t.value.dashboard.professor.tabs.teaching, icon: 'GraduationCap' },
  { id: 'research', label: t.value.dashboard.professor.tabs.research, icon: 'Flask' },
  { id: 'students', label: t.value.dashboard.professor.tabs.students, icon: 'Users' },
  { id: 'profile', label: t.value.dashboard.professor.tabs.profile, icon: 'User' }
])

// Quick actions for professors
const quickActions = computed(() => [
  {
    title: t.value.dashboard.professor.actions.addPublication,
    description: t.value.dashboard.professor.actions.addPublicationDesc,
    icon: 'Plus',
    action: () => showPublicationForm.value = true,
    color: 'bg-blue-500'
  },
  {
    title: t.value.dashboard.professor.actions.createEvent,
    description: t.value.dashboard.professor.actions.createEventDesc,
    icon: 'Calendar',
    action: () => showEventForm.value = true,
    color: 'bg-green-500'
  },
  {
    title: t.value.dashboard.professor.actions.manageProject,
    description: t.value.dashboard.professor.actions.manageProjectDesc,
    icon: 'Briefcase',
    action: () => showProjectForm.value = true,
    color: 'bg-purple-500'
  },
  {
    title: t.value.dashboard.professor.actions.updateProfile,
    description: t.value.dashboard.professor.actions.updateProfileDesc,
    icon: 'Settings',
    action: () => activeTab.value = 'profile',
    color: 'bg-orange-500'
  }
])

// User's content statistics
const contentStats = computed(() => [
  { label: t.value.dashboard.professor.stats.publications, value: '12', trend: '+2' },
  { label: t.value.dashboard.professor.stats.activeProjects, value: '3', trend: '+1' },
  { label: t.value.dashboard.professor.stats.students, value: '8', trend: '0' },
  { label: t.value.dashboard.professor.stats.upcomingEvents, value: '2', trend: '+1' }
])

// Mock data - replace with real API calls
const recentPublications = ref([
  {
    id: 1,
    title: 'Advances in Machine Learning for Software Engineering',
    status: 'published',
    date: '2024-12-15',
    citations: 23
  },
  {
    id: 2,
    title: 'Automated Testing in Agile Development',
    status: 'under_review',
    date: '2024-11-20',
    citations: 0
  }
])

const activeProjects = ref([
  {
    id: 1,
    title: 'AI-Driven Code Analysis',
    status: 'active',
    students: 3,
    deadline: '2025-06-30'
  },
  {
    id: 2,
    title: 'Software Quality Metrics',
    status: 'planning',
    students: 2,
    deadline: '2025-09-15'
  }
])

const upcomingEvents = ref([
  {
    id: 1,
    title: 'Research Seminar: AI in Education',
    date: '2025-02-15',
    type: 'seminar',
    attendees: 45
  },
  {
    id: 2,
    title: 'Workshop: Advanced Vue.js Techniques',
    date: '2025-02-28',
    type: 'workshop',
    attendees: 25
  }
])
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <PageHeader 
      :title="t.dashboard.professor.title"
      :subtitle="`${t.dashboard.professor.welcome} ${user?.first_name || user?.username}`"
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
        <StatisticsGrid :stats="contentStats" />

        <!-- Recent Activity Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Recent Publications -->
          <Card>
            <div class="p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">{{ t.dashboard.professor.overview.recentPublications }}</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  @click="activeTab = 'publications'"
                >
                  {{ t.dashboard.professor.overview.viewAll }}
                </Button>
              </div>
              <div class="space-y-3">
                <div 
                  v-for="pub in recentPublications.slice(0, 3)" 
                  :key="pub.id"
                  class="border-l-4 border-blue-500 pl-3"
                >
                  <h4 class="font-medium text-sm text-gray-900">{{ pub.title }}</h4>
                  <div class="flex justify-between items-center mt-1">
                    <span 
                      :class="[
                        'text-xs px-2 py-1 rounded',
                        pub.status === 'published' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      ]"
                    >
                      {{ pub.status }}
                    </span>
                    <span class="text-xs text-gray-500">{{ pub.date }}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <!-- Active Projects -->
          <Card>
            <div class="p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">{{ t.dashboard.professor.overview.activeProjects }}</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  @click="activeTab = 'research'"
                >
                  {{ t.dashboard.professor.overview.viewAll }}
                </Button>
              </div>
              <div class="space-y-3">
                <div 
                  v-for="project in activeProjects.slice(0, 3)" 
                  :key="project.id"
                  class="border-l-4 border-purple-500 pl-3"
                >
                  <h4 class="font-medium text-sm text-gray-900">{{ project.title }}</h4>
                  <div class="flex justify-between items-center mt-1">
                    <span class="text-xs text-gray-600">
                      {{ project.students }} students
                    </span>
                    <span class="text-xs text-gray-500">{{ project.deadline }}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <!-- Upcoming Events -->
          <Card>
            <div class="p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">{{ t.dashboard.professor.overview.upcomingEvents }}</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  @click="emit('navigate', 'events')"
                >
                  {{ t.dashboard.professor.overview.viewAll }}
                </Button>
              </div>
              <div class="space-y-3">
                <div 
                  v-for="event in upcomingEvents.slice(0, 3)" 
                  :key="event.id"
                  class="border-l-4 border-green-500 pl-3"
                >
                  <h4 class="font-medium text-sm text-gray-900">{{ event.title }}</h4>
                  <div class="flex justify-between items-center mt-1">
                    <span class="text-xs text-gray-600">
                      {{ event.attendees }} attendees
                    </span>
                    <span class="text-xs text-gray-500">{{ event.date }}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <!-- Publications Tab -->
      <div v-else-if="activeTab === 'publications'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">{{ t.dashboard.professor.publications.title }}</h2>
          <Button @click="showPublicationForm = true">
            <component :is="'Plus'" class="h-4 w-4 mr-2" />
            {{ t.dashboard.professor.publications.addNew }}
          </Button>
        </div>

        <Card>
          <div class="p-6">
            <div class="space-y-4">
              <div 
                v-for="pub in recentPublications" 
                :key="pub.id"
                class="border rounded-lg p-4 hover:bg-gray-50"
              >
                <div class="flex justify-between items-start">
                  <div class="flex-1">
                    <h3 class="font-medium text-gray-900">{{ pub.title }}</h3>
                    <div class="flex items-center space-x-4 mt-2">
                      <span 
                        :class="[
                          'text-xs px-2 py-1 rounded',
                          pub.status === 'published' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        ]"
                      >
                        {{ pub.status }}
                      </span>
                      <span class="text-sm text-gray-600">{{ pub.date }}</span>
                      <span class="text-sm text-gray-600">{{ pub.citations }} citations</span>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <Button variant="outline" size="sm">
                      {{ t.dashboard.professor.publications.edit }}
                    </Button>
                    <Button variant="outline" size="sm">
                      {{ t.dashboard.professor.publications.view }}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Teaching Tab -->
      <div v-else-if="activeTab === 'teaching'">
        <TeachingForm />
      </div>

      <!-- Research Tab -->
      <div v-else-if="activeTab === 'research'">
        <ResearchForm />
      </div>

      <!-- Students Tab -->
      <div v-else-if="activeTab === 'students'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">{{ t.dashboard.professor.students.title }}</h2>
          <Button @click="emit('navigate', 'member-form')">
            <component :is="'UserPlus'" class="h-4 w-4 mr-2" />
            {{ t.dashboard.professor.students.addNew }}
          </Button>
        </div>

        <Card>
          <div class="p-6">
            <div class="text-center py-8 text-gray-500">
              <component :is="'Users'" class="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>{{ t.dashboard.professor.students.empty }}</p>
            </div>
          </div>
        </Card>
      </div>

      <!-- Profile Tab -->
      <div v-else-if="activeTab === 'profile'">
        <UserSettingsForm />
      </div>
    </div>

    <!-- Modals -->
    <PublicationForm 
      v-if="showPublicationForm" 
      @close="showPublicationForm = false"
      @submit="showPublicationForm = false"
    />
    <EventForm 
      v-if="showEventForm" 
      @close="showEventForm = false"
      @submit="showEventForm = false"
    />
    <ProjectForm 
      v-if="showProjectForm" 
      @close="showProjectForm = false"
      @submit="showProjectForm = false"
    />
  </div>
</template>