<script setup lang="ts">
import { useProfessorDashboard } from '@/hooks/dashboard/useProfessorDashboard'
import { useLanguage } from '@/composables/useLanguage'
import { Calendar, Briefcase, FileText } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'

const { t } = useLanguage()
const {
  quickActions,
  recentPublications,
  activeProjects,
  upcomingEvents
} = useProfessorDashboard()
</script>

<template>
  <div class="space-y-8">
    <!-- Quick Actions -->
    <section>
      <h2 class="text-lg font-medium text-gray-900 mb-4">
        {{ t.dashboard.professor.overview.quickActions }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          v-for="action in quickActions" 
          :key="action.title"
          class="p-4 hover:shadow-md transition-shadow cursor-pointer"
          @click="action.action"
        >
          <div class="flex items-center space-x-3">
            <div :class="['p-2 rounded-md', action.color]">
              <component :is="action.icon" class="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900">{{ action.title }}</h3>
              <p class="text-xs text-gray-500">{{ action.description }}</p>
            </div>
          </div>
        </Card>
      </div>
    </section>

    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      <!-- Recent Publications -->
      <section>
        <Card>
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">
                {{ t.dashboard.professor.overview.recentPublications }}
              </h3>
              <Button variant="outline" size="sm">
                <FileText class="h-4 w-4 mr-2" />
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
                  <span :class="[
                    'text-xs px-2 py-1 rounded-full',
                    pub.status === 'published' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  ]">
                    {{ pub.status }}
                  </span>
                  <span class="text-xs text-gray-500">{{ pub.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <!-- Active Projects -->
      <section>
        <Card>
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">
                {{ t.dashboard.professor.overview.activeProjects }}
              </h3>
              <Button variant="outline" size="sm">
                <Briefcase class="h-4 w-4 mr-2" />
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
                    Due: {{ project.deadline }}
                  </span>
                  <span class="text-xs text-gray-500">{{ project.status }}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <!-- Upcoming Events -->
      <section>
        <Card>
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">
                {{ t.dashboard.professor.overview.upcomingEvents }}
              </h3>
              <Button variant="outline" size="sm">
                <Calendar class="h-4 w-4 mr-2" />
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
                    {{ event.type }}
                  </span>
                  <span class="text-xs text-gray-500">{{ event.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>

    <!-- Performance Metrics -->
    <section>
      <Card>
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ t.dashboard.professor.overview.performanceMetrics }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600">{{ recentPublications.length }}</div>
              <div class="text-sm text-gray-500">Total Publications</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600">{{ activeProjects.length }}</div>
              <div class="text-sm text-gray-500">Active Projects</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-600">{{ upcomingEvents.length }}</div>
              <div class="text-sm text-gray-500">Upcoming Events</div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  </div>
</template>