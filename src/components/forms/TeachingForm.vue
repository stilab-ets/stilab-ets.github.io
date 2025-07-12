<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLanguage } from '../../composables/useLanguage'

interface Props {
  isEdit?: boolean
  courseId?: string
  initialData?: {
    title: string
    code: string
    instructor: string
    semester: string
    level: 'undergraduate' | 'graduate'
    description: string
    credits: number
    prerequisites: string[]
    objectives: string[]
    topics: string[]
    syllabusUrl?: string
    moodleUrl?: string
    githubUrl?: string
    schedule?: {
      day: string
      time: string
      location: string
    }[]
    assessmentMethods?: string[]
    textbooks?: string[]
  }
}

const props = withDefaults(defineProps<Props>(), {
  isEdit: false
})

const emit = defineEmits<{
  submit: [data: any]
  cancel: []
}>()

const { t: translations } = useLanguage()
const t = computed(() => translations.value.forms.teaching)

const formData = ref({
  title: props.initialData?.title || '',
  code: props.initialData?.code || '',
  instructor: props.initialData?.instructor || '',
  semester: props.initialData?.semester || '',
  level: props.initialData?.level || 'undergraduate',
  description: props.initialData?.description || '',
  credits: props.initialData?.credits || 3,
  prerequisites: props.initialData?.prerequisites || [''],
  objectives: props.initialData?.objectives || [''],
  topics: props.initialData?.topics || [''],
  syllabusUrl: props.initialData?.syllabusUrl || '',
  moodleUrl: props.initialData?.moodleUrl || '',
  githubUrl: props.initialData?.githubUrl || '',
  schedule: props.initialData?.schedule || [{
    day: '',
    time: '',
    location: ''
  }],
  assessmentMethods: props.initialData?.assessmentMethods || [''],
  textbooks: props.initialData?.textbooks || ['']
})

const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

const levels = [
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'graduate', label: 'Graduate' }
]

const semesters = [
  'Fall 2024',
  'Spring 2025', 
  'Summer 2025',
  'Fall 2025',
  'Spring 2026'
]

const daysOfWeek = [
  'Monday',
  'Tuesday', 
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const addPrerequisite = () => {
  formData.value.prerequisites.push('')
}

const removePrerequisite = (index: number) => {
  formData.value.prerequisites.splice(index, 1)
}

const addObjective = () => {
  formData.value.objectives.push('')
}

const removeObjective = (index: number) => {
  formData.value.objectives.splice(index, 1)
}

const addTopic = () => {
  formData.value.topics.push('')
}

const removeTopic = (index: number) => {
  formData.value.topics.splice(index, 1)
}

const addScheduleSlot = () => {
  formData.value.schedule.push({
    day: '',
    time: '',
    location: ''
  })
}

const removeScheduleSlot = (index: number) => {
  formData.value.schedule.splice(index, 1)
}

const addAssessmentMethod = () => {
  formData.value.assessmentMethods.push('')
}

const removeAssessmentMethod = (index: number) => {
  formData.value.assessmentMethods.splice(index, 1)
}

const addTextbook = () => {
  formData.value.textbooks.push('')
}

const removeTextbook = (index: number) => {
  formData.value.textbooks.splice(index, 1)
}

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.title.trim()) {
    errors.value.title = 'Course title is required'
  }
  
  if (!formData.value.code.trim()) {
    errors.value.code = 'Course code is required'
  }
  
  if (!formData.value.instructor.trim()) {
    errors.value.instructor = 'Instructor is required'
  }
  
  if (!formData.value.semester) {
    errors.value.semester = 'Semester is required'
  }
  
  if (!formData.value.description.trim()) {
    errors.value.description = 'Course description is required'
  }
  
  if (formData.value.credits < 1 || formData.value.credits > 12) {
    errors.value.credits = 'Credits must be between 1 and 12'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  try {
    // Filter out empty arrays
    const cleanData = {
      ...formData.value,
      prerequisites: formData.value.prerequisites.filter(p => p.trim()),
      objectives: formData.value.objectives.filter(o => o.trim()),
      topics: formData.value.topics.filter(t => t.trim()),
      schedule: formData.value.schedule.filter(s => s.day && s.time),
      assessmentMethods: formData.value.assessmentMethods.filter(a => a.trim()),
      textbooks: formData.value.textbooks.filter(t => t.trim())
    }
    emit('submit', cleanData)
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <PageHeader
      :title="isEdit ? 'Edit Course' : 'Create New Course'"
      :subtitle="isEdit ? 'Update course information and curriculum' : 'Add a new course to the teaching catalog'"
      :highlight-word="isEdit ? 'Edit' : 'Create'"
    />

    <Card class="mt-8">
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Basic Information -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Basic Course Information
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
                Course Title
              </label>
              <input
                id="title"
                v-model="formData.title"
                type="text"
                placeholder="e.g., Advanced Software Engineering"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.title }"
              />
              <p v-if="errors.title" class="mt-1 text-sm text-red-600">
                {{ errors.title }}
              </p>
            </div>

            <div>
              <label for="code" class="block text-sm font-medium text-gray-700 mb-2">
                Course Code
              </label>
              <input
                id="code"
                v-model="formData.code"
                type="text"
                placeholder="e.g., CS-501"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.code }"
              />
              <p v-if="errors.code" class="mt-1 text-sm text-red-600">
                {{ errors.code }}
              </p>
            </div>

            <div>
              <label for="instructor" class="block text-sm font-medium text-gray-700 mb-2">
                Instructor
              </label>
              <input
                id="instructor"
                v-model="formData.instructor"
                type="text"
                placeholder="Professor name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.instructor }"
              />
              <p v-if="errors.instructor" class="mt-1 text-sm text-red-600">
                {{ errors.instructor }}
              </p>
            </div>

            <div>
              <label for="semester" class="block text-sm font-medium text-gray-700 mb-2">
                Semester
              </label>
              <select
                id="semester"
                v-model="formData.semester"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.semester }"
              >
                <option value="">Select semester</option>
                <option v-for="semester in semesters" :key="semester" :value="semester">
                  {{ semester }}
                </option>
              </select>
              <p v-if="errors.semester" class="mt-1 text-sm text-red-600">
                {{ errors.semester }}
              </p>
            </div>

            <div>
              <label for="level" class="block text-sm font-medium text-gray-700 mb-2">
                Course Level
              </label>
              <select
                id="level"
                v-model="formData.level"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              >
                <option v-for="level in levels" :key="level.value" :value="level.value">
                  {{ level.label }}
                </option>
              </select>
            </div>

            <div>
              <label for="credits" class="block text-sm font-medium text-gray-700 mb-2">
                Credits
              </label>
              <input
                id="credits"
                v-model.number="formData.credits"
                type="number"
                min="1"
                max="12"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.credits }"
              />
              <p v-if="errors.credits" class="mt-1 text-sm text-red-600">
                {{ errors.credits }}
              </p>
            </div>
          </div>

          <div class="mt-6">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Course Description
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="4"
              placeholder="Detailed course description, learning outcomes, and methodology"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              :class="{ 'border-red-500': errors.description }"
            ></textarea>
            <p v-if="errors.description" class="mt-1 text-sm text-red-600">
              {{ errors.description }}
            </p>
          </div>
        </div>

        <!-- Prerequisites -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Prerequisites
          </h3>
          <div class="space-y-3">
            <div
              v-for="(prerequisite, index) in formData.prerequisites"
              :key="index"
              class="flex space-x-2"
            >
              <input
                v-model="formData.prerequisites[index]"
                type="text"
                placeholder="e.g., Introduction to Programming"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
              <Button
                type="button"
                variant="secondary"
                @click="removePrerequisite(index)"
              >
                Remove
              </Button>
            </div>
            <Button type="button" variant="secondary" @click="addPrerequisite">
              Add Prerequisite
            </Button>
          </div>
        </div>

        <!-- Learning Objectives -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Learning Objectives
          </h3>
          <div class="space-y-3">
            <div
              v-for="(objective, index) in formData.objectives"
              :key="index"
              class="flex space-x-2"
            >
              <input
                v-model="formData.objectives[index]"
                type="text"
                placeholder="Students will be able to..."
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
              <Button
                type="button"
                variant="secondary"
                @click="removeObjective(index)"
              >
                Remove
              </Button>
            </div>
            <Button type="button" variant="secondary" @click="addObjective">
              Add Objective
            </Button>
          </div>
        </div>

        <!-- Course Topics -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Course Topics
          </h3>
          <div class="space-y-3">
            <div
              v-for="(topic, index) in formData.topics"
              :key="index"
              class="flex space-x-2"
            >
              <input
                v-model="formData.topics[index]"
                type="text"
                placeholder="Main topic or chapter"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
              <Button
                type="button"
                variant="secondary"
                @click="removeTopic(index)"
              >
                Remove
              </Button>
            </div>
            <Button type="button" variant="secondary" @click="addTopic">
              Add Topic
            </Button>
          </div>
        </div>

        <!-- Schedule -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Class Schedule
          </h3>
          <div class="space-y-4">
            <div
              v-for="(slot, index) in formData.schedule"
              :key="index"
              class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-md"
            >
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Day
                </label>
                <select
                  v-model="formData.schedule[index].day"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                >
                  <option value="">Select day</option>
                  <option v-for="day in daysOfWeek" :key="day" :value="day">
                    {{ day }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  v-model="formData.schedule[index].time"
                  type="time"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  v-model="formData.schedule[index].location"
                  type="text"
                  placeholder="Room or building"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                />
              </div>

              <div class="flex items-end">
                <Button
                  type="button"
                  variant="secondary"
                  @click="removeScheduleSlot(index)"
                  class="w-full"
                >
                  Remove
                </Button>
              </div>
            </div>
            <Button type="button" variant="secondary" @click="addScheduleSlot">
              Add Schedule Slot
            </Button>
          </div>
        </div>

        <!-- Assessment Methods -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Assessment Methods
          </h3>
          <div class="space-y-3">
            <div
              v-for="(method, index) in formData.assessmentMethods"
              :key="index"
              class="flex space-x-2"
            >
              <input
                v-model="formData.assessmentMethods[index]"
                type="text"
                placeholder="e.g., Midterm Exam (30%), Final Project (40%)"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
              <Button
                type="button"
                variant="secondary"
                @click="removeAssessmentMethod(index)"
              >
                Remove
              </Button>
            </div>
            <Button type="button" variant="secondary" @click="addAssessmentMethod">
              Add Assessment Method
            </Button>
          </div>
        </div>

        <!-- Textbooks -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Required Textbooks
          </h3>
          <div class="space-y-3">
            <div
              v-for="(textbook, index) in formData.textbooks"
              :key="index"
              class="flex space-x-2"
            >
              <input
                v-model="formData.textbooks[index]"
                type="text"
                placeholder="Author, Title, Edition, Publisher"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
              <Button
                type="button"
                variant="secondary"
                @click="removeTextbook(index)"
              >
                Remove
              </Button>
            </div>
            <Button type="button" variant="secondary" @click="addTextbook">
              Add Textbook
            </Button>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Course Resources
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label for="syllabusUrl" class="block text-sm font-medium text-gray-700 mb-2">
                Syllabus URL
              </label>
              <input
                id="syllabusUrl"
                v-model="formData.syllabusUrl"
                type="url"
                placeholder="Link to course syllabus"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>

            <div>
              <label for="moodleUrl" class="block text-sm font-medium text-gray-700 mb-2">
                Moodle URL
              </label>
              <input
                id="moodleUrl"
                v-model="formData.moodleUrl"
                type="url"
                placeholder="Moodle course page"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>

            <div>
              <label for="githubUrl" class="block text-sm font-medium text-gray-700 mb-2">
                GitHub Repository
              </label>
              <input
                id="githubUrl"
                v-model="formData.githubUrl"
                type="url"
                placeholder="Course materials repository"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            @click="emit('cancel')"
          >
            {{ t.forms.publication.form.cancel }}
          </Button>
          <Button
            type="submit"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? t.forms.publication.form.submitting : (isEdit ? 'Update Course' : 'Create Course') }}
          </Button>
        </div>
      </form>
    </Card>
  </div>
</template>