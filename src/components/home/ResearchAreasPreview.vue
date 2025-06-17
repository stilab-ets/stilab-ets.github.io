<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

// Get language utilities for localization
const { t } = useLanguage()

// Research areas data with translations
const researchAreas = computed(() => [
  {
    icon: '🏗️',
    title: t.value.researchAreas.areas.architecture.title,
    description: t.value.researchAreas.areas.architecture.description
  },
  {
    icon: '🤖',
    title: t.value.researchAreas.areas.ai.title,
    description: t.value.researchAreas.areas.ai.description
  },
  {
    icon: '🔒',
    title: t.value.researchAreas.areas.security.title,
    description: t.value.researchAreas.areas.security.description
  },
  {
    icon: '☁️',
    title: t.value.researchAreas.areas.cloud.title,
    description: t.value.researchAreas.areas.cloud.description
  }
])
</script>

<template>
  <div class="bg-gray-50 py-16 sm:py-20">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12 sm:mb-16">
          <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6">
            {{ t.researchAreas.sectionTitle.part1 }} <span class="text-[#08a4d4]">{{ t.researchAreas.sectionTitle.part2 }}</span>
          </h2>
          <p class="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t.researchAreas.subtitle }}
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div 
            v-for="area in researchAreas" 
            :key="area.title"
            class="bg-white rounded-xl p-6 sm:p-8 text-center shadow-sm hover:shadow-lg transition-shadow"
          >
            <div class="text-3xl sm:text-4xl mb-3 sm:mb-4">{{ area.icon }}</div>
            <h3 class="font-semibold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">
              {{ area.title }}
            </h3>
            <p class="text-sm text-gray-600">{{ area.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>