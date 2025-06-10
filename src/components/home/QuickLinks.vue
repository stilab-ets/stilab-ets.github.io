<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

// Get language utilities for localization
const { t } = useLanguage()

// Emits
const emit = defineEmits<(e: 'setCurrentPage', page: string) => void>()

// Methods
const setCurrentPage = (page: string) => {
  emit('setCurrentPage', page)
}

// Quick links data with translations
const quickLinks = computed(() => [
  {
    page: 'publications',
    icon: '📚',
    title: t.value.quickLinks.publications.title,
    description: t.value.quickLinks.publications.description,
    bgColor: 'bg-blue-50 hover:bg-blue-100'
  },
  {
    page: 'events',
    icon: '📅',
    title: t.value.quickLinks.events.title,
    description: t.value.quickLinks.events.description,
    bgColor: 'bg-green-50 hover:bg-green-100'
  },
  {
    page: 'vacancies',
    icon: '💼',
    title: t.value.quickLinks.vacancies.title,
    description: t.value.quickLinks.vacancies.description,
    bgColor: 'bg-purple-50 hover:bg-purple-100'
  }
])
</script>

<template>
  <div class="bg-white py-16 sm:py-20">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12 sm:mb-16">
          <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6">
            {{ t.quickLinks.rapidAccess }} <span class="text-[#08a4d4]">{{ t.quickLinks.sectionTitle.split(' ')[1] || t.quickLinks.sectionTitle }}</span>
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <button 
            v-for="link in quickLinks" 
            :key="link.page" 
            @click="setCurrentPage(link.page)" 
            :class="[
              'rounded-xl p-6 sm:p-8 text-left transition-colors group hover:cursor-pointer',
              link.bgColor
            ]"
          >
            <div class="text-3xl sm:text-4xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              {{ link.icon }}
            </div>
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
              {{ link.title }}
            </h3>
            <p class="text-sm sm:text-base text-gray-600">
              {{ link.description }}
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>