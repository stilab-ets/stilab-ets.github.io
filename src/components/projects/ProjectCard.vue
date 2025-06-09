<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import type { MScProject } from '@/data/mockPublications'
import Card from '@/ui/Card.vue'
import Button from '@/ui/Button.vue'

interface Props {
  project: MScProject
}

const props = defineProps<Props>()
const emit = defineEmits<{
  showInterest: [project: MScProject]
}>()

const { t } = useLanguage()

// Methods
const getStatusColor = (status: MScProject['status']) => {
  const colors: Record<MScProject['status'], string> = {
    available: 'bg-green-100 text-green-800',
    assigned: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-gray-100 text-gray-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const getStatusDotColor = (status: MScProject['status']) => {
  const colors: Record<MScProject['status'], string> = {
    available: 'bg-green-500',
    assigned: 'bg-yellow-500',
    completed: 'bg-gray-500'
  }
  return colors[status] || 'bg-gray-500'
}

const getStatusLabel = (status: MScProject['status']) => {
  const statusKey = status as keyof typeof t.value.projects.status
  return t.value.projects.status[statusKey] || status
}

const getDifficultyColor = (difficulty: MScProject['difficulty']) => {
  const colors: Record<MScProject['difficulty'], string> = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  }
  return colors[difficulty] || 'bg-gray-100 text-gray-800'
}

const getDifficultyLabel = (difficulty: MScProject['difficulty']) => {
  const difficultyKey = difficulty as keyof typeof t.value.projects.difficulty
  return t.value.projects.difficulty[difficultyKey] || difficulty
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const contactSupervisor = () => {
  const subject = encodeURIComponent(`Projet de Master: ${props.project.title}`)
  const body = encodeURIComponent(`Bonjour,

Je suis intéressé(e) par le projet de master "${props.project.title}" que vous proposez.

Pourriez-vous me donner plus d'informations sur ce projet ?

Cordialement,`)

  // This should be resolved from supervisor name in a real app
  const supervisorEmail = 'supervisor@univ.fr'
  const mailtoUrl = `mailto:${supervisorEmail}?subject=${subject}&body=${body}`
  window.location.href = mailtoUrl
}

const showInterest = () => {
  emit('showInterest', props.project)
}
</script>

<template>
  <Card variant="hover">
    <!-- Project Card Header -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <div class="flex items-center mb-2">
          <div :class="[
            'w-3 h-3 rounded-full mr-2',
            getStatusDotColor(project.status)
          ]"></div>
          <span :class="[
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            getStatusColor(project.status)
          ]">
            {{ getStatusLabel(project.status) }}
          </span>
          <span :class="[
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2',
            getDifficultyColor(project.difficulty)
          ]">
            {{ getDifficultyLabel(project.difficulty) }}
          </span>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ project.title }}</h3>
      </div>
    </div>

    <!-- Supervisors -->
    <div class="mb-4">
      <div class="flex items-center text-sm text-gray-600">
        <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="font-medium">{{ t.projects.projectCard.supervisor }}:</span>
        <span class="ml-1">{{ project.supervisor }}</span>
        <span v-if="project.coSupervisor" class="ml-2">
          • {{ t.projects.projectCard.coSupervisor }}: {{ project.coSupervisor }}
        </span>
      </div>
    </div>

    <!-- Domain -->
    <div class="mb-4">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
        {{ project.domain }}
      </span>
    </div>

    <!-- Abstract -->
    <div class="mb-4">
      <h4 class="text-sm font-medium text-gray-700 mb-2">Résumé</h4>
      <p class="text-sm text-gray-700 leading-relaxed">{{ project.abstract }}</p>
    </div>

    <!-- Requirements -->
    <div class="mb-4">
      <h4 class="text-sm font-medium text-gray-700 mb-2">{{ t.projects.projectCard.skills }}</h4>
      <div class="flex flex-wrap gap-2">
        <span v-for="requirement in project.requirements" :key="requirement"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {{ requirement }}
        </span>
      </div>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-4 border-t border-gray-100">
      <div class="text-xs text-gray-500">
        {{ t.projects.projectCard.proposedOn }} {{ formatDate(project.proposedDate) }}
      </div>
      <div class="flex space-x-2">
        <Button 
          v-if="project.status === 'available'" 
          size="sm"
          @click="showInterest"
          class="hover:cursor-pointer"
        >
          {{ t.projects.projectCard.expressInterest }}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          @click="contactSupervisor"
          class="hover:cursor-pointer"
        >
          <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {{ t.projects.projectCard.contact }}
        </Button>
      </div>
    </div>
  </Card>
</template>