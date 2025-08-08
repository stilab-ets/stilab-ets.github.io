<script setup lang="ts">
import { useProfessorDashboard } from '@/hooks/dashboard/useProfessorDashboard';
import { useLanguage } from '@/composables/useLanguage';
import { Plus } from 'lucide-vue-next';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';

const { t } = useLanguage();
const { recentPublications } = useProfessorDashboard();
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-900">
        {{ t.dashboard.professor.publications.title }}
      </h2>
      <Button>
        <Plus class="h-4 w-4 mr-2" />
        {{ t.dashboard.professor.publications.addPublication }}
      </Button>
    </div>

    <Card>
      <div class="p-6">
        <div class="space-y-4">
          <div
            v-for="publication in recentPublications"
            :key="publication.id"
            class="border-l-4 border-blue-500 pl-4 py-3"
          >
            <h3 class="font-medium text-gray-900">
              {{ publication.title }}
            </h3>
            <div class="flex justify-between items-center mt-2">
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  publication.status === 'published'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800',
                ]"
              >
                {{
                  t.dashboard.professor.publications.status[
                    publication.status as keyof typeof t.dashboard.professor.publications.status
                  ]
                }}
              </span>
              <span class="text-sm text-gray-500">{{ publication.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
