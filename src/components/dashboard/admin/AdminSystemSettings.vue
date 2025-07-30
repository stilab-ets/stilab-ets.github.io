<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import Card from '@/components/ui/Card.vue'

const { t } = useLanguage()
</script>

<template>
  <div class="space-y-6">
    <Card class="p-8 text-center">
      <h3 class="text-lg font-medium text-gray-900 mb-2">{{ t.dashboard.admin.settings.title }}</h3>
      <p class="text-gray-600">{{ t.dashboard.admin.settings.description }}</p>
    </Card>
  </div>
</template>