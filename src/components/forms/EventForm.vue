<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

interface EventFormData {
  title: string
  type: string
  speaker?: string
  date: string
  time?: string
  duration?: string
  location: string
  description: string
  tags: string[]
  meetingUrl?: string
  recordingUrl?: string
  registrationRequired?: boolean
  capacity?: number
  registrationDeadline?: string
  registrationUrl?: string
  visibility?: 'public' | 'internal' | 'private'
}

interface Props {
  initialData?: Partial<EventFormData>
  isEditing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
  initialData: () => ({})
})

const emit = defineEmits<{
  submit: [data: EventFormData]
  cancel: []
}>()

const { t } = useLanguage()

// Form data
const formData = ref<EventFormData>({
  title: '',
  type: '',
  speaker: '',
  date: '',
  time: '',
  duration: '',
  location: '',
  description: '',
  tags: [],
  meetingUrl: '',
  recordingUrl: '',
  registrationRequired: false,
  capacity: undefined,
  registrationDeadline: '',
  registrationUrl: '',
  visibility: 'public',
  ...props.initialData
})

// Form state
const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})
const tagInput = ref('')

// Validation
const validateForm = (): boolean => {
  errors.value = {}
  
  if (!formData.value.title) {
    errors.value.title = t.value.forms.events.validation.titleRequired
  }
  
  if (!formData.value.type) {
    errors.value.type = t.value.forms.events.validation.typeRequired
  }
  
  if (!formData.value.date) {
    errors.value.date = t.value.forms.events.validation.dateRequired
  } else {
    const eventDate = new Date(formData.value.date)
    if (eventDate < new Date()) {
      errors.value.date = t.value.forms.events.validation.dateInPast
    }
  }
  
  if (!formData.value.location) {
    errors.value.location = t.value.forms.events.validation.locationRequired
  }
  
  if (!formData.value.description) {
    errors.value.description = t.value.forms.events.validation.descriptionRequired
  }
  
  if (formData.value.registrationRequired && formData.value.registrationDeadline) {
    const deadline = new Date(formData.value.registrationDeadline)
    const eventDate = new Date(formData.value.date)
    if (deadline >= eventDate) {
      errors.value.registrationDeadline = t.value.forms.events.validation.deadlineAfterEvent
    }
  }
  
  return Object.keys(errors.value).length === 0
}

// Tag management
const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !formData.value.tags.includes(tag)) {
    formData.value.tags.push(tag)
    tagInput.value = ''
  }
}

const removeTag = (index: number) => {
  formData.value.tags.splice(index, 1)
}

const handleTagKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    addTag()
  }
}

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  
  try {
    emit('submit', { ...formData.value })
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  emit('cancel')
}

// Page title
const pageTitle = computed(() => {
  return props.isEditing 
    ? t.value.forms.events?.titleEdit || 'Edit Event'
    : t.value.forms.events?.titleCreate || 'Create Event'
})

onMounted(() => {
  // Set initial values if editing
  if (props.isEditing && props.initialData) {
    Object.assign(formData.value, props.initialData)
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">{{ pageTitle }}</h1>
      <p class="mt-2 text-gray-600">{{ t.forms.events?.subtitle || 'Fill in the event details' }}</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Basic Information -->
      <div class="bg-white p-6 rounded-lg border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Title -->
          <div class="md:col-span-2">
            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.events?.form?.title || 'Title' }}
            </label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              :placeholder="t.forms.events?.form?.titlePlaceholder || 'Enter a title'"
              class="input-field"
              :class="{ 'input-error': errors.title }"
            />
            <p v-if="errors.title" class="error-message">{{ errors.title }}</p>
          </div>

          <!-- Type -->
          <div>
            <label for="type" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.events?.form?.type || 'Type' }}
            </label>
            <select
              id="type"
              v-model="formData.type"
              class="select-field"
              :class="{ 'input-error': errors.type }"
            >
              <option value="">{{ t.forms.events?.form?.selectType || 'Select a type' }}</option>
              <option value="seminar">{{ t.forms.events?.eventTypes?.seminar || 'Seminar' }}</option>
              <option value="workshop">{{ t.forms.events?.eventTypes?.workshop || 'Workshop' }}</option>
              <option value="conference">{{ t.forms.events?.eventTypes?.conference || 'Conference' }}</option>
              <option value="defense">{{ t.forms.events?.eventTypes?.defense || 'Defense' }}</option>
              <option value="meeting">{{ t.forms.events?.eventTypes?.meeting || 'Meeting' }}</option>
              <option value="colloquium">{{ t.forms.events?.eventTypes?.colloquium || 'Colloquium' }}</option>
              <option value="masterclass">{{ t.forms.events?.eventTypes?.masterclass || 'Masterclass' }}</option>
            </select>
            <p v-if="errors.type" class="error-message">{{ errors.type }}</p>
          </div>

          <!-- Speaker -->
          <div>
            <label for="speaker" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.events?.form?.speaker || 'Speaker' }}
            </label>
            <input
              id="speaker"
              v-model="formData.speaker"
              type="text"
              :placeholder="t.forms.events?.form?.speakerPlaceholder || 'Optional speaker name'"
              class="input-field"
            />
          </div>

          <!-- Date -->
          <div>
            <label for="date" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.events?.form?.date || 'Date' }}
            </label>
            <input
              id="date"
              v-model="formData.date"
              type="date"
              class="input-field"
              :class="{ 'input-error': errors.date }"
            />
            <p v-if="errors.date" class="error-message">{{ errors.date }}</p>
          </div>

          <!-- Time -->
          <div>
            <label for="time" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.events?.form?.time || 'Time' }}
            </label>
            <input
              id="time"
              v-model="formData.time"
              type="time"
              class="input-field"
            />
          </div>

          <!-- Duration -->
          <div>
            <label for="duration" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.events?.form?.duration || 'Duration' }}
            </label>
            <select
              id="duration"
              v-model="formData.duration"
              class="select-field"
            >
              <option value="">{{ t.forms.events?.form?.selectDuration || 'Select duration' }}</option>
              <option value="30">30 {{ t.forms.events?.form?.minutes || 'minutes' }}</option>
              <option value="60">1 {{ t.forms.events?.form?.hour || 'hour' }}</option>
              <option value="90">1.5 {{ t.forms.events?.form?.hours || 'hours' }}</option>
              <option value="120">2 {{ t.forms.events?.form?.hours || 'hours' }}</option>
              <option value="180">3 {{ t.forms.events?.form?.hours || 'hours' }}</option>
              <option value="full-day">{{ t.forms.events?.form?.fullDay || 'Full Day' }}</option>
            </select>
          </div>

          <!-- Location -->
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.events?.form?.location || 'Location' }}
            </label>
            <input
              id="location"
              v-model="formData.location"
              type="text"
              :placeholder="t.forms.events?.form?.locationPlaceholder || 'Enter the location'"
              class="input-field"
              :class="{ 'input-error': errors.location }"
            />
            <p v-if="errors.location" class="error-message">{{ errors.location }}</p>
          </div>
        </div>

        <!-- Description -->
        <div class="mt-6">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t.forms.events?.form?.description || 'Description' }}
          </label>
          <textarea
            id="description"
            v-model="formData.description"
            rows="4"
            :placeholder="t.forms.events?.form?.descriptionPlaceholder || 'Enter a description'"
            class="input-field"
            :class="{ 'input-error': errors.description }"
          ></textarea>
          <p v-if="errors.description" class="error-message">{{ errors.description }}</p>
        </div>

        <!-- Tags -->
        <div class="mt-6">
          <label for="tags" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t.forms.events?.form?.tags || 'Tags' }}
          </label>
          <div class="space-y-2">
            <input
              id="tagInput"
              v-model="tagInput"
              type="text"
              :placeholder="t.forms.events?.form?.tagsPlaceholder || 'Press enter to add a tag'"
              class="input-field"
              @keydown="handleTagKeydown"
            />
            <p class="text-sm text-gray-500">{{ t.forms.events?.form?.tagsHelp || 'Use keywords to help categorize your event.' }}</p>
            <div v-if="formData.tags.length > 0" class="flex flex-wrap gap-2">
              <span
                v-for="(tag, index) in formData.tags"
                :key="index"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ tag }}
                <button
                  type="button"
                  @click="removeTag(index)"
                  class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Online Meeting -->
      <div class="bg-white p-6 rounded-lg border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Online Meeting</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Meeting URL -->
          <div>
            <label for="meetingUrl" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.events?.form?.meetingUrl || 'Meeting URL' }}
            </label>
            <input
              id="meetingUrl"
              v-model="formData.meetingUrl"
              type="url"
              :placeholder="t.forms.events?.form?.meetingUrlPlaceholder || 'https://...'"
              class="input-field"
            />
          </div>

          <!-- Recording URL -->
          <div>
            <label for="recordingUrl" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.events?.form?.recordingUrl || 'Recording URL' }}
            </label>
            <input
              id="recordingUrl"
              v-model="formData.recordingUrl"
              type="url"
              :placeholder="t.forms.events?.form?.recordingUrlPlaceholder || 'https://...'"
              class="input-field"
            />
          </div>
        </div>
      </div>

      <!-- Registration -->
      <div class="bg-white p-6 rounded-lg border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">
          {{ t.forms.events?.registration?.title || 'Registration' }}
        </h2>
        
        <!-- Registration Required -->
        <div class="mb-4">
          <label class="flex items-center">
            <input
              v-model="formData.registrationRequired"
              type="checkbox"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span class="ml-2 text-sm text-gray-700">
              {{ t.forms.events?.registration?.required || 'Requires registration' }}
            </span>
          </label>
        </div>

        <div v-if="formData.registrationRequired" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Capacity -->
          <div>
            <label for="capacity" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.events?.registration?.capacity || 'Capacity' }}
            </label>
            <input
              id="capacity"
              v-model.number="formData.capacity"
              type="number"
              min="1"
              :placeholder="t.forms.events?.registration?.capacityPlaceholder || 'Max participants'"
              class="input-field"
            />
          </div>

          <!-- Registration Deadline -->
          <div>
            <label for="registrationDeadline" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.events?.registration?.deadline || 'Registration deadline' }}
            </label>
            <input
              id="registrationDeadline"
              v-model="formData.registrationDeadline"
              type="date"
              class="input-field"
              :class="{ 'input-error': errors.registrationDeadline }"
            />
            <p v-if="errors.registrationDeadline" class="error-message">{{ errors.registrationDeadline }}</p>
          </div>

          <!-- Registration URL -->
          <div class="md:col-span-2">
            <label for="registrationUrl" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.events?.registration?.url || 'Registration URL' }}
            </label>
            <input
              id="registrationUrl"
              v-model="formData.registrationUrl"
              type="url"
              :placeholder="t.forms.events?.registration?.urlPlaceholder || 'https://register.com'"
              class="input-field"
            />
            <p class="mt-1 text-sm text-gray-500">
              {{ t.forms.events?.registration?.urlHelp || 'Optional link for registration.' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Visibility -->
      <div class="bg-white p-6 rounded-lg border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">
          {{ t.forms.events?.visibility?.title || 'Visibility' }}
        </h2>
        
        <div class="space-y-3">
          <label class="flex items-center">
            <input
              v-model="formData.visibility"
              type="radio"
              value="public"
              class="text-blue-600 focus:ring-blue-500"
            />
            <span class="ml-2 text-sm text-gray-700">
              {{ t.forms.events?.visibility?.public || 'Public' }}
            </span>
          </label>
          <label class="flex items-center">
            <input
              v-model="formData.visibility"
              type="radio"
              value="internal"
              class="text-blue-600 focus:ring-blue-500"
            />
            <span class="ml-2 text-sm text-gray-700">
              {{ t.forms.events?.visibility?.internal || 'Internal' }}
            </span>
          </label>
          <label class="flex items-center">
            <input
              v-model="formData.visibility"
              type="radio"
              value="private"
              class="text-blue-600 focus:ring-blue-500"
            />
            <span class="ml-2 text-sm text-gray-700">
              {{ t.forms.events?.visibility?.private || 'Private' }}
            </span>
          </label>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          @click="handleCancel"
          :disabled="isSubmitting"
        >
          {{ t.forms.events?.form?.cancel || 'Cancel' }}
        </Button>
        <Button
          type="submit"
          variant="primary"
          :disabled="isSubmitting"
        >
          {{ isSubmitting 
            ? (t.forms.events?.form?.submitting || 'Submitting...') 
            : (props.isEditing 
              ? (t.forms.events?.form?.update || 'Update') 
              : (t.forms.events?.form?.create || 'Create')
            ) 
          }}
        </Button>
      </div>
    </form>
  </div>
</template>