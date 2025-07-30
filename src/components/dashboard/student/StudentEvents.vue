<script setup lang="ts">
import { useStudentDashboard } from '@/hooks/dashboard/useStudentDashboard'
import { useLanguage } from '@/composables/useLanguage'
import Card from '@/components/ui/Card.vue'

const { t } = useLanguage()
const { nextEvents } = useStudentDashboard()

</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-900">{{ t.dashboard.student.events.title }}</h2>
    </div>

    <Card>
      <div class="p-6">
        <div class="space-y-4">
          <div 
            v-for="event in nextEvents" 
            :key="event.id"
            class="border-l-4 border-green-500 pl-4 py-3"
          >
            <h3 class="font-medium text-gray-900">{{ event.title }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ event.location }}</p>
            <div class="flex justify-between items-center mt-2">
              <span :class="[
                'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                event.type === 'seminar' ? 'bg-purple-100 text-purple-800' :
                event.type === 'workshop' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              ]">
                {{ t.dashboard.student.events.types[event.type as keyof typeof t.dashboard.student.events.types] ?? event.type }}
              </span>
              <span class="text-sm text-gray-500">{{ event.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>