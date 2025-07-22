<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import Card from '@/components/ui/Card.vue'

interface Project {
  id: string
  title: string
  start_date: string
  end_date?: string | null
  description: string
  funding_source?: string
  funding_amount?: number
  status: string
  team_members: string[]
}

interface Props {
  projects: Project[]
}

const props = defineProps<Props>()

const { t } = useLanguage()

const formatCurrency = (amount: number | undefined): string => {
  if (!amount) return ''
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800'
    case 'completed':
      return 'bg-blue-100 text-blue-800'
    case 'planned':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ t.research.featuredProjects.title }}</h2>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card 
        v-for="project in projects" 
        :key="project.id"
        variant="hover"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ project.title }}</h3>
            <span 
              :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getStatusColor(project.status)]"
            >
              {{ t.research.featuredProjects.status[project.status as keyof typeof t.research.featuredProjects.status] || project.status }}
            </span>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500">
              {{ project.start_date }} - {{ project.end_date || t.research.featuredProjects.ongoing }}
            </p>
          </div>
        </div>

        <p class="text-gray-700 mb-4 leading-relaxed">{{ project.description }}</p>

        <div v-if="project.funding_source || project.funding_amount" class="mb-4">
          <p class="text-sm font-medium text-gray-700 mb-1">
            {{ t.research.featuredProjects.funding }}:
          </p>
          <p class="text-sm text-gray-600">
            <span v-if="project.funding_source">{{ project.funding_source }}</span>
            <span v-if="project.funding_amount && project.funding_source"> - </span>
            <span v-if="project.funding_amount">{{ formatCurrency(project.funding_amount) }}</span>
          </p>
        </div>

        <div v-if="project.team_members?.length > 0" class="mb-4">
          <p class="text-sm font-medium text-gray-700 mb-2">
            {{ t.research.featuredProjects.participants }}:
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(member, index) in project.team_members"
              :key="index"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {{ member }}
            </span>
          </div>
        </div>
      </Card>
    </div>

    <!-- Empty State -->
    <div v-if="projects.length === 0" class="text-center py-12">
      <div class="text-gray-400 mb-4">
        <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      </div>
      <p class="text-sm text-gray-500">No research projects available</p>
    </div>
  </div>
</template>