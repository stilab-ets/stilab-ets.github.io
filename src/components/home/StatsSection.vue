<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

// Props interface matching the data structure from App.vue
interface StatItem {
  value: number
  label: string
}

interface Props {
  labStats: {
    members: StatItem
    publications: StatItem
    projects: StatItem
    awards: StatItem
  }
}

defineProps<Props>()

// Access translation system for the section title
const { t } = useLanguage()
</script>

<template>
  <div class="bg-white py-16 sm:py-20">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          {{ t.stats.sectionTitle }}
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div class="text-center">
            <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#08a4d4] mb-2 sm:mb-3">
              {{ labStats.members.value }}+
            </div>
            <div class="text-gray-600 text-sm sm:text-base lg:text-lg">
              {{ labStats.members.label }}
            </div>
          </div>
          <div class="text-center">
            <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#08a4d4] mb-2 sm:mb-3">
              {{ labStats.publications.value }}+
            </div>
            <div class="text-gray-600 text-sm sm:text-base lg:text-lg">
              {{ labStats.publications.label }}
            </div>
          </div>
          <div class="text-center">
            <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#08a4d4] mb-2 sm:mb-3">
              {{ labStats.projects.value }}+
            </div>
            <div class="text-gray-600 text-sm sm:text-base lg:text-lg">
              {{ labStats.projects.label }}
            </div>
          </div>
          <div class="text-center">
            <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#08a4d4] mb-2 sm:mb-3">
              {{ labStats.awards.value }}+
            </div>
            <div class="text-gray-600 text-sm sm:text-base lg:text-lg">
              {{ labStats.awards.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>