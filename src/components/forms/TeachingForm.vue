<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'

interface Props {
  isEditing?: boolean
  initialData?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
  initialData: () => ({})
})

const emit = defineEmits<{
  submit: [data: Record<string, any>]
  cancel: []
}>()

const { t } = useLanguage()

// Form state
const formData = ref({
  title: '',
  code: '',
  instructor: '',
  level: '',
  semester: '',
  credits: '',
  description: '',
  prerequisites: '',
  objectives: '',
  topics: '',
  syllabusUrl: '',
  moodleUrl: '',
  githubUrl: ''
})

const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const generalError = ref('')

// Mock data for instructors
const mockInstructors = [
  { id: '1', name: 'Dr. Marie Dubois' },
  { id: '2', name: 'Prof. Jean Martin' },
  { id: '3', name: 'Dr. Sarah Chen' },
  { id: '4', name: 'Alex Rodriguez' }
]

// Initialize form with initial data
watch(() => props.initialData, (newData) => {
  if (newData) {
    Object.assign(formData.value, newData)
  }
}, { immediate: true })

// Validation
const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.title.trim()) {
    errors.value.title = t.value.forms.teaching.validation.titleRequired
  }
  
  if (!formData.value.code.trim()) {
    errors.value.code = t.value.forms.teaching.validation.codeRequired
  }
  
  if (!formData.value.instructor) {
    errors.value.instructor = t.value.forms.teaching.validation.instructorRequired
  }
  
  if (!formData.value.level) {
    errors.value.level = t.value.forms.teaching.validation.levelRequired
  }
  
  if (!formData.value.semester.trim()) {
    errors.value.semester = t.value.forms.teaching.validation.semesterRequired
  }
  
  if (!formData.value.credits.trim()) {
    errors.value.credits = t.value.forms.teaching.validation.creditsRequired
  } else if (isNaN(Number(formData.value.credits)) || Number(formData.value.credits) <= 0) {
    errors.value.credits = t.value.forms.teaching.validation.creditsInvalid
  }
  
  if (!formData.value.description.trim()) {
    errors.value.description = t.value.forms.teaching.validation.descriptionRequired
  }
  
  return Object.keys(errors.value).length === 0
}

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  generalError.value = ''
  
  try {
    emit('submit', { ...formData.value })
  } catch (error) {
    generalError.value = t.value.forms.teaching.errors.submitFailed
  } finally {
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  emit('cancel')
}

const formTitle = computed(() => 
  props.isEditing 
    ? t.value.forms.teaching.titleEdit 
    : t.value.forms.teaching.titleCreate
)

const submitButtonText = computed(() =>
  props.isEditing
    ? t.value.forms.teaching.form.update
    : t.value.forms.teaching.form.create
)
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">{{ formTitle }}</h1>
      <p class="text-lg text-gray-600 mt-2">{{ t.forms.teaching.subtitle }}</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Basic Information -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.teaching.sections.basic }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.teaching.form.title }}
            </label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              :placeholder="t.forms.teaching.form.titlePlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.title }"
            />
            <p v-if="errors.title" class="text-red-600 text-sm mt-1">
              {{ errors.title }}
            </p>
          </div>

          <div>
            <label for="code" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.teaching.form.code }}
            </label>
            <input
              id="code"
              v-model="formData.code"
              type="text"
              :placeholder="t.forms.teaching.form.codePlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.code }"
            />
            <p v-if="errors.code" class="text-red-600 text-sm mt-1">
              {{ errors.code }}
            </p>
          </div>

          <div>
            <label for="instructor" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.teaching.form.instructor }}
            </label>
            <select
              id="instructor"
              v-model="formData.instructor"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.instructor }"
            >
              <option value="">{{ t.forms.teaching.form.selectInstructor }}</option>
              <option v-for="instructor in mockInstructors" :key="instructor.id" :value="instructor.id">
                {{ instructor.name }}
              </option>
            </select>
            <p v-if="errors.instructor" class="text-red-600 text-sm mt-1">
              {{ errors.instructor }}
            </p>
          </div>

          <div>
            <label for="level" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.teaching.form.level }}
            </label>
            <select
              id="level"
              v-model="formData.level"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.level }"
            >
              <option value="">{{ t.forms.teaching.form.selectLevel }}</option>
              <option value="undergraduate">{{ t.forms.teaching.levels.undergraduate }}</option>
              <option value="graduate">{{ t.forms.teaching.levels.graduate }}</option>
            </select>
            <p v-if="errors.level" class="text-red-600 text-sm mt-1">
              {{ errors.level }}
            </p>
          </div>

          <div>
            <label for="semester" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.teaching.form.semester }}
            </label>
            <input
              id="semester"
              v-model="formData.semester"
              type="text"
              :placeholder="t.forms.teaching.form.semesterPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.semester }"
            />
            <p v-if="errors.semester" class="text-red-600 text-sm mt-1">
              {{ errors.semester }}
            </p>
          </div>

          <div>
            <label for="credits" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.teaching.form.credits }}
            </label>
            <input
              id="credits"
              v-model="formData.credits"
              type="number"
              min="1"
              max="12"
              :placeholder="t.forms.teaching.form.creditsPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.credits }"
            />
            <p v-if="errors.credits" class="text-red-600 text-sm mt-1">
              {{ errors.credits }}
            </p>
          </div>
        </div>
      </Card>

      <!-- Course Content -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.teaching.sections.content }}
        </h2>
        
        <div class="space-y-6">
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.teaching.form.description }}
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="4"
              :placeholder="t.forms.teaching.form.descriptionPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.description }"
            />
            <p v-if="errors.description" class="text-red-600 text-sm mt-1">
              {{ errors.description }}
            </p>
          </div>

          <div>
            <label for="prerequisites" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.teaching.form.prerequisites }}
            </label>
            <textarea
              id="prerequisites"
              v-model="formData.prerequisites"
              rows="3"
              :placeholder="t.forms.teaching.form.prerequisitesPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="objectives" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.teaching.form.objectives }}
            </label>
            <textarea
              id="objectives"
              v-model="formData.objectives"
              rows="3"
              :placeholder="t.forms.teaching.form.objectivesPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="topics" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.teaching.form.topics }}
            </label>
            <textarea
              id="topics"
              v-model="formData.topics"
              rows="3"
              :placeholder="t.forms.teaching.form.topicsPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      <!-- Resources -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.teaching.sections.resources }}
        </h2>
        
        <div class="space-y-6">
          <div>
            <label for="syllabusUrl" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.teaching.form.syllabusUrl }}
            </label>
            <input
              id="syllabusUrl"
              v-model="formData.syllabusUrl"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="moodleUrl" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.teaching.form.moodleUrl }}
            </label>
            <input
              id="moodleUrl"
              v-model="formData.moodleUrl"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="githubUrl" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.teaching.form.githubUrl }}
            </label>
            <input
              id="githubUrl"
              v-model="formData.githubUrl"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      <!-- Error Display -->
      <div v-if="generalError" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-800">{{ generalError }}</p>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          @click="handleCancel"
          :disabled="isSubmitting"
        >
          {{ t.forms.teaching.form.cancel }}
        </Button>
        
        <Button
          type="submit"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? t.forms.teaching.form.submitting : submitButtonText }}
        </Button>
      </div>
    </form>
  </div>
</template>