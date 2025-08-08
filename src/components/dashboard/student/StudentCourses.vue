<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage';
import { GraduationCap } from 'lucide-vue-next';
import Card from '@/components/ui/Card.vue';

const { t } = useLanguage();
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-900">
        {{ t.dashboard.student.courses.title }}
      </h2>
    </div>

    <Card class="p-8 text-center">
      <GraduationCap class="h-12 w-12 mx-auto mb-4 text-gray-400" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        {{ t.dashboard.student.courses.noCoursesAvailable }}
      </h3>
      <p class="text-gray-600">
        {{ t.dashboard.student.courses.description }}
      </p>
    </Card>
  </div>
</template>
