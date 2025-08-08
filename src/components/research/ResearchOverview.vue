<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage';

const { t } = useLanguage();
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">
        {{ t.research.overview.title }}
      </h2>
      <p class="text-lg text-gray-700 leading-relaxed mb-6">
        {{ t.research.overview.description }}
      </p>
    </div>
  </div>
</template>
