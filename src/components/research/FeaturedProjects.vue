<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import Card from '@/components/ui/Card.vue'

interface Participant {
  id: string
  first_name: string
  last_name: string
  email: string
  role: string
}

interface Project {
  id: string
  title: string
  start_date: string
  end_date: string
  description: string
  github_url?: string
  project_url?: string
  leader: Participant
  participants: Participant[]
}

interface Props {
  projects: Project[]
}

const props = defineProps<Props>()
const { t } = useLanguage()

const openLink = (url: string) => {
  window.open(url, '_blank')
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 hover:cursor-pointer">
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
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-500">
              {{ project.start_date }} - {{ project.end_date || t.research.featuredProjects.ongoing }}
            </p>
          </div>
        </div>

        <p class="text-gray-700 mb-4 leading-relaxed">{{ project.description }}</p>

        <div class="mb-4">
          <p class="text-sm font-medium text-gray-700 mb-2">
            {{ t.research.featuredProjects.leader }}:
          </p>
          <p class="text-sm text-gray-600">
            {{ project.leader.first_name }} {{ project.leader.last_name }} ({{ project.leader.role }})
          </p>
        </div>

        <div class="mb-4">
          <p class="text-sm font-medium text-gray-700 mb-2">
            {{ t.research.featuredProjects.participants }}:
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="participant in project.participants"
              :key="participant.id"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            >
              {{ participant.first_name }} {{ participant.last_name }}
            </span>
          </div>
        </div>

        <div class="flex items-center justify-end space-x-2">
          <a
            v-if="project.github_url"
            @click="openLink(project.github_url)"
            class="text-gray-400 hover:text-[#08a4d4] transition-colors cursor-pointer"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clip-rule="evenodd" />
            </svg>
          </a>
          <a
            v-if="project.project_url"
            @click="openLink(project.project_url)"
            class="text-gray-400 hover:text-[#08a4d4] transition-colors cursor-pointer"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </Card>
    </div>
  </div>
</template>
