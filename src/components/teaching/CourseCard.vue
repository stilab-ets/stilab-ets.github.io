<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'

interface ExtendedCourse {
  id: string;
  title: string;
  code: string;
  instructor: string;
  semester: string;
  level: 'undergraduate' | 'graduate';
  description: string;
  credits?: number;
  prerequisites?: string[];
  objectives?: string[];
  topics?: string[];
  syllabusUrl?: string;
  moodleUrl?: string;
  githubUrl?: string;
}

interface Props {
  course: ExtendedCourse
}

const props = defineProps<Props>()
const { t } = useLanguage()

// Methods
const getLevelColor = (level: ExtendedCourse['level']) => {
  const colors: Record<ExtendedCourse['level'], string> = {
    undergraduate: 'bg-green-100 text-green-800',
    graduate: 'bg-blue-100 text-blue-800'
  }
  return colors[level] || 'bg-gray-100 text-gray-800'
}

const getLevelLabel = (level: ExtendedCourse['level']) => {
  const levelKey = level as keyof typeof t.value.teaching.levels
  return t.value.teaching.levels[levelKey] || level
}

const openLink = (url: string) => {
  window.open(url, '_blank')
}
</script>

<template>
  <Card variant="hover" class="hover:cursor-pointer">
    <!-- Course Card -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <div class="flex items-center mb-2">
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-3">
            {{ course.code }}
          </span>
          <span :class="[
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            getLevelColor(course.level)
          ]">
            {{ getLevelLabel(course.level) }}
          </span>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ course.title }}</h3>
        <div class="flex items-center text-sm text-gray-600 space-x-4 mb-3">
          <div class="flex items-center">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {{ course.instructor }}
          </div>
          <div class="flex items-center">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ course.semester }}
          </div>
        </div>
      </div>
    </div>

    <!-- Description -->
    <p class="text-gray-700 mb-4 leading-relaxed">{{ course.description }}</p>

    <!-- Course Details -->
    <div class="space-y-2 text-sm text-gray-600">
      <div v-if="course.prerequisites" class="flex">
        <span class="font-medium mr-2">{{ t.teaching.courseCard.prerequisites }}:</span>
        <span>{{ course.prerequisites.join(', ') }}</span>
      </div>
      <div v-if="course.objectives" class="flex">
        <span class="font-medium mr-2">{{ t.teaching.courseCard.objectives }}:</span>
        <span>{{ course.objectives.join(', ') }}</span>
      </div>
      <div v-if="course.topics" class="flex flex-wrap">
        <span class="font-medium mr-2">{{ t.teaching.courseCard.topics }}:</span>
        <div class="flex flex-wrap gap-1">
          <span v-for="topic in course.topics" :key="topic"
            class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
            {{ topic }}
          </span>
        </div>
      </div>
    </div>

    <!-- Course Links -->
    <div class="mt-4 flex items-center justify-between">
      <div class="flex space-x-2">
        <Button 
          v-if="course.syllabusUrl"
          variant="outline"
          size="sm"
          @click="openLink(course.syllabusUrl)"
          class="hover:cursor-pointer"
        >
          <svg class="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clip-rule="evenodd" />
          </svg>
          {{ t.teaching.links.syllabus }}
        </Button>
        <Button 
          v-if="course.moodleUrl"
          variant="outline"
          size="sm"
          @click="openLink(course.moodleUrl)"
          class="hover:cursor-pointer"
        >
          <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {{ t.teaching.links.moodle }}
        </Button>
        <Button 
          v-if="course.githubUrl"
          variant="outline"
          size="sm"
          @click="openLink(course.githubUrl)"
          class="hover:cursor-pointer"
        >
          <svg class="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clip-rule="evenodd" />
          </svg>
          {{ t.teaching.links.github }}
        </Button>
      </div>
      <div v-if="course.credits" class="text-sm text-gray-500">
        {{ course.credits }} {{ t.teaching.courseCard.credits }}
      </div>
    </div>
  </Card>
</template>