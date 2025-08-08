<script setup lang="ts">
import { useStudentDashboard } from '@/hooks/dashboard/useStudentDashboard';
import { useLanguage } from '@/composables/useLanguage';
import Card from '@/components/ui/Card.vue';

const { t } = useLanguage();
const { myProjects } = useStudentDashboard();
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-900">
        {{ t.dashboard.student.projects.title }}
      </h2>
    </div>

    <Card>
      <div class="p-6">
        <div class="space-y-4">
          <div
            v-for="project in myProjects"
            :key="project.id"
            class="border-l-4 border-blue-500 pl-4 py-3"
          >
            <h3 class="font-medium text-gray-900">
              {{ project.title }}
            </h3>
            <p class="text-sm text-gray-600 mt-1">
              {{ t.dashboard.student.projects.supervisor }}:
              {{ project.supervisor }}
            </p>
            <div class="flex justify-between items-center mt-2">
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  project.status === 'enrolled'
                    ? 'bg-green-100 text-green-800'
                    : project.status === 'completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800',
                ]"
              >
                {{ t.dashboard.student.projects.status[project.status] }}
              </span>
              <div class="text-right">
                <div class="w-32 bg-gray-200 rounded-full h-2 mb-1">
                  <div
                    class="bg-blue-600 h-2 rounded-full"
                    :style="{ width: `${project.progress}%` }"
                  />
                </div>
                <span class="text-xs text-gray-500"
                  >{{ project.progress }}%
                  {{ t.dashboard.student.projects.complete }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
