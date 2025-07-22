<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import type { Course } from '@/services/MainAPI'

interface Props {
  course: Course 
}

const props = defineProps<Props>()

const { t } = useLanguage()

// Methods
const getLevelColor = (code: string) => {
  if (code.startsWith('GRD') || code.match(/^[6-9]\d{2}/)) {
    return 'bg-blue-100 text-blue-800'
  }
  return 'bg-green-100 text-green-800'
}

const getLevelLabel = (code: string) => {
  if (code.startsWith('GRD') || code.match(/^[6-9]\d{2}/)) {
    return t.value.teaching.levels.graduate
  }
  return t.value.teaching.levels.undergraduate
}

const getSemesterLabel = (semester: string, year: number) => {
  let semesterLabel = ''
  switch (semester) {
    case 'F':
      semesterLabel = t.value.teaching.semesters.fall
      break
    case 'W':
      semesterLabel = t.value.teaching.semesters.winter
      break
    case 'S':
      semesterLabel = t.value.teaching.semesters.summer
      break
    default:
      semesterLabel = semester
  }
  return `${semesterLabel} ${year}`
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
            getLevelColor(course.code)
          ]">
            {{ getLevelLabel(course.code) }}
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
            {{ getSemesterLabel(course.semester, course.year) }}
          </div>
          <div class="flex items-center">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            {{ course.credits }} {{ t.teaching.courseCard.credits }}
          </div>
        </div>
      </div>
    </div>

    <!-- Description -->
    <p v-if="course.description" class="text-gray-700 mb-4 leading-relaxed">{{ course.description }}</p>

    <!-- Prerequisites -->
    <div v-if="course.prerequisites" class="mb-4">
      <h4 class="text-sm font-medium text-gray-900 mb-1">{{ t.teaching.courseCard.prerequisites }}</h4>
      <p class="text-sm text-gray-600">{{ course.prerequisites }}</p>
    </div>

    <!-- Learning Objectives -->
    <div v-if="course.learning_objectives" class="mb-4">
      <h4 class="text-sm font-medium text-gray-900 mb-1">{{ t.teaching.courseCard.objectives }}</h4>
      <p class="text-sm text-gray-600">{{ course.learning_objectives }}</p>
    </div>

    <!-- Course Links -->
    <div class="mt-4 flex items-center justify-between">
      <div class="flex space-x-2">
        <Button 
          variant="outline"
          size="sm"
          @click="openLink(`/courses/${course.id}`)"
          class="hover:cursor-pointer"
        >
          <svg class="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
              clip-rule="evenodd" />
          </svg>
          {{ t.teaching.links.syllabus }}
        </Button>
      </div>
    </div>
  </Card>
</template>