<script setup lang="ts">
import { useStudentDashboard } from '@/hooks/dashboard/useStudentDashboard';
import { useLanguage } from '@/composables/useLanguage';
import { Briefcase, Calendar } from 'lucide-vue-next';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';

const { t } = useLanguage();
const { quickActions, myProjects, nextEvents } = useStudentDashboard();
</script>

<template>
  <div class="space-y-8">
    <!-- Quick Actions -->
    <section>
      <h2 class="text-lg font-medium text-gray-900 mb-4">
        {{ t.dashboard.student.overview.quickActions }}
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
              <h3 class="text-sm font-medium text-gray-900">
                {{ action.title }}
              </h3>
              <p class="text-xs text-gray-500">
                {{ action.description }}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- My Projects -->
      <section>
        <Card>
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">
                {{ t.dashboard.student.overview.myProjects }}
              </h3>
              <Button variant="outline" size="sm">
                <Briefcase class="h-4 w-4 mr-2" />
                {{ t.dashboard.student.overview.viewAll }}
              </Button>
            </div>
            <div class="space-y-3">
              <div
                v-for="project in myProjects.slice(0, 3)"
                :key="project.id"
                class="border-l-4 border-blue-500 pl-3"
              >
                <h4 class="font-medium text-sm text-gray-900">
                  {{ project.title }}
                </h4>
                <div class="flex justify-between items-center mt-1">
                  <span class="text-xs text-gray-600">
                    Supervisor: {{ project.supervisor }}
                  </span>
                  <span
                    :class="[
                      'text-xs px-2 py-1 rounded-full',
                      project.status === 'enrolled'
                        ? 'bg-green-100 text-green-800'
                        : project.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800',
                    ]"
                  >
                    {{ project.status }}
                  </span>
                </div>
                <div class="mt-2">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="bg-blue-600 h-2 rounded-full"
                      :style="{ width: `${project.progress}%` }"
                    />
                  </div>
                  <span class="text-xs text-gray-500"
                    >{{ project.progress }}% complete</span
                  >
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
                {{ t.dashboard.student.overview.upcomingEvents }}
              </h3>
              <Button variant="outline" size="sm">
                <Calendar class="h-4 w-4 mr-2" />
                {{ t.dashboard.student.overview.viewAll }}
              </Button>
            </div>
            <div class="space-y-3">
              <div
                v-for="event in nextEvents.slice(0, 4)"
                :key="event.id"
                class="border-l-4 border-green-500 pl-3"
              >
                <h4 class="font-medium text-sm text-gray-900">
                  {{ event.title }}
                </h4>
                <div class="flex justify-between items-center mt-1">
                  <span class="text-xs text-gray-600">{{
                    event.location
                  }}</span>
                  <span class="text-xs text-gray-500">{{ event.date }}</span>
                </div>
                <span
                  :class="[
                    'inline-flex mt-1 px-2 py-1 text-xs font-semibold rounded-full',
                    event.type === 'seminar'
                      ? 'bg-purple-100 text-purple-800'
                      : event.type === 'workshop'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800',
                  ]"
                >
                  {{ event.type }}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>

    <!-- Academic Progress -->
    <section>
      <Card>
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ t.dashboard.student.overview.academicProgress }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="text-2xl font-bold text-blue-600">
                {{ myProjects.length }}
              </div>
              <div class="text-sm text-gray-500">Enrolled Projects</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600">
                {{ nextEvents.length }}
              </div>
              <div class="text-sm text-gray-500">Upcoming Events</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-600">
                {{ myProjects.filter((p) => p.status === 'completed').length }}
              </div>
              <div class="text-sm text-gray-500">Completed Projects</div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  </div>
</template>
