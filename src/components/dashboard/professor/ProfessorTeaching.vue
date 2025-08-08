<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage';
import { GraduationCap, Plus } from 'lucide-vue-next';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';

const { t } = useLanguage();
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-900">
        {{ t.dashboard.professor.teaching.title }}
      </h2>
      <Button>
        <Plus class="h-4 w-4 mr-2" />
        {{ t.dashboard.professor.teaching.addCourse }}
      </Button>
    </div>

    <Card class="p-8 text-center">
      <GraduationCap class="h-12 w-12 mx-auto mb-4 text-gray-400" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        {{ t.dashboard.professor.teaching.noCoursesYet }}
      </h3>
      <p class="text-gray-600 mb-4">
        {{ t.dashboard.professor.teaching.description }}
      </p>
      <Button>
        <Plus class="h-4 w-4 mr-2" />
        {{ t.dashboard.professor.teaching.addCourse }}
      </Button>
    </Card>
  </div>
</template>
