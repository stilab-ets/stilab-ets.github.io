<script setup lang="ts">
import { ref } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import type { Project } from '@/data/mockPublications'
import Card from '@/components/ui/Card.vue'

interface ResearchArea {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Props {
  researchAreas: ResearchArea[]
  getProjectsByDomain: (domain: string) => Project[]
}

const props = defineProps<Props>()
const { t } = useLanguage()

// State
const openAccordions = ref<string[]>([])

// Methods
const toggleAccordion = (domainName: string) => {
  const index = openAccordions.value.indexOf(domainName)
  if (index > -1) {
    openAccordions.value.splice(index, 1)
  } else {
    openAccordions.value.push(domainName)
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ t.research.researchAreas.title }}</h2>
    <div class="space-y-4">
      <div v-for="domain in researchAreas" :key="domain.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200">
        <!-- Accordion Header -->
        <button @click="toggleAccordion(domain.name)"
          class="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#08a4d4] focus:ring-inset hover:cursor-pointer">
          <div class="flex items-center">
            <span class="text-2xl mr-3">{{ domain.icon }}</span>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ domain.name }}</h3>
              <p class="text-sm text-gray-600">{{ domain.description }}</p>
            </div>
          </div>
          <svg :class="[
            'h-5 w-5 text-gray-400 transition-transform duration-200',
            openAccordions.includes(domain.name) ? 'transform rotate-180' : ''
          ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Accordion Content -->
        <div v-if="openAccordions.includes(domain.name)" class="px-6 pb-6 border-t border-gray-100">
          <div class="mt-4">
            <h4 class="text-md font-medium text-gray-900 mb-3">{{ t.research.researchAreas.associatedProjects }}</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card
                v-for="project in getProjectsByDomain(domain.name)" 
                :key="project.id"
                class="border border-gray-200 hover:border-[#08a4d4] transition-colors hover:cursor-pointer"
              >
                <h5 class="font-medium text-gray-900 mb-2">{{ project.title }}</h5>
                <p class="text-sm text-gray-600 mb-2">{{ project.description.substring(0, 100) }}...</p>
                <p class="text-xs text-gray-500">
                  <strong>{{ t.research.featuredProjects.leader }}:</strong> {{ project.leadResearcher }}
                </p>
              </Card>
            </div>

            <div v-if="getProjectsByDomain(domain.name).length === 0" class="text-center py-8">
              <p class="text-sm text-gray-500">{{ t.research.researchAreas.noActiveProjects }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>