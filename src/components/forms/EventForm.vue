<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { XCircleIcon, XIcon, PlusIcon } from 'lucide-vue-next'
import { useLanguage } from '@/composables/useLanguage';

interface EventForm {
  title: string
  type: string
  speaker: string
  date: string
  time: string
  duration: string
  location: string
  description: string
  requiresRegistration: boolean
  capacity: number | null
  registrationDeadline: string
  registrationUrl: string
  tags: string[]
  meetingUrl: string
  recordingUrl: string
  visibility: 'public' | 'internal' | 'private'
}

interface EventErrors {
  [key: string]: string
}

const props = defineProps<{
  initialData?: Partial<EventForm>
  isEditing?: boolean
}>()

const emit = defineEmits<{
  submit: [data: EventForm]
  cancel: []
}>()

const { t: translations } = useLanguage()
const t = computed(() => translations.value.forms.events)

const form = reactive<EventForm>({
  title: '',
  type: '',
  speaker: '',
  date: '',
  time: '',
  duration: '',
  location: '',
  description: '',
  requiresRegistration: false,
  capacity: null,
  registrationDeadline: '',
  registrationUrl: '',
  tags: [],
  meetingUrl: '',
  recordingUrl: '',
  visibility: 'public',
  ...props.initialData
})

const errors = ref<EventErrors>({})
const generalError = ref<string>('')
const isSubmitting = ref(false)
const newTag = ref('')

const validateForm = (): boolean => {
  errors.value = {}
  
  if (!form.title.trim()) {
    errors.value.title = t.value.validation.titleRequired
  }
  
  if (!form.type) {
    errors.value.type = t.value.validation.typeRequired
  }
  
  if (!form.date) {
    errors.value.date = t.value.validation.dateRequired
  } else {
    const eventDate = new Date(form.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (eventDate < today) {
      errors.value.date = t.value.validation.dateInPast
    }
  }
  
  if (!form.location.trim()) {
    errors.value.location = t.value.validation.locationRequired
  }
  
  if (!form.description.trim()) {
    errors.value.description = t.value.validation.descriptionRequired
  }
  
  if (form.requiresRegistration) {
    if (form.registrationDeadline) {
      const deadlineDate = new Date(form.registrationDeadline)
      const eventDate = new Date(form.date)
      
      if (deadlineDate >= eventDate) {
        errors.value.registrationDeadline = t.value.validation.deadlineAfterEvent
      }
    }
  }
  
  return Object.keys(errors.value).length === 0
}

const addTag = () => {
  const tag = newTag.value.trim()
  if (tag && !form.tags.includes(tag)) {
    form.tags.push(tag)
    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  form.tags.splice(index, 1)
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  generalError.value = ''
  
  try {
    emit('submit', { ...form })
  } catch (error) {
    generalError.value = t.value.errors.submitFailed
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
    <div class="px-6 py-4 border-b border-gray-200">
      <h2 class="text-2xl font-bold text-gray-900">
        {{ isEditing ? t.titleEdit : t.titleCreate }}
      </h2>
      <p class="mt-1 text-sm text-gray-600">
        {{ t.subtitle }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6">
      <div class="space-y-6">
        <!-- Basic Information -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.title }}
            </label>
            <input
              id="title"
              type="text"
              v-model="form.title"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': errors.title }"
              :placeholder="t.form.titlePlaceholder"
            />
            <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
          </div>

          <div>
            <label for="type" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.type }}
            </label>
            <select
              id="type"
              v-model="form.type"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': errors.type }"
            >
              <option value="">{{ t.form.selectType }}</option>
              <option value="seminar">{{ t.eventTypes.seminar }}</option>
              <option value="workshop">{{ t.eventTypes.workshop }}</option>
              <option value="conference">{{ t.eventTypes.conference }}</option>
              <option value="defense">{{ t.eventTypes.defense }}</option>
              <option value="meeting">{{ t.eventTypes.meeting }}</option>
              <option value="colloquium">{{ t.eventTypes.colloquium }}</option>
              <option value="masterclass">{{ t.eventTypes.masterclass }}</option>
            </select>
            <p v-if="errors.type" class="mt-1 text-sm text-red-600">{{ errors.type }}</p>
          </div>

          <div>
            <label for="speaker" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.speaker }}
            </label>
            <input
              id="speaker"
              type="text"
              v-model="form.speaker"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :placeholder="t.form.speakerPlaceholder"
            />
          </div>
        </div>

        <!-- Date and Time -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label for="date" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.date }}
            </label>
            <input
              id="date"
              type="date"
              v-model="form.date"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': errors.date }"
            />
            <p v-if="errors.date" class="mt-1 text-sm text-red-600">{{ errors.date }}</p>
          </div>

          <div>
            <label for="time" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.time }}
            </label>
            <input
              id="time"
              type="time"
              v-model="form.time"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label for="duration" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.duration }}
            </label>
            <select
              id="duration"
              v-model="form.duration"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">{{ t.form.selectDuration }}</option>
              <option value="30">30 {{ t.form.minutes }}</option>
              <option value="60">1 {{ t.form.hour }}</option>
              <option value="90">1.5 {{ t.form.hours }}</option>
              <option value="120">2 {{ t.form.hours }}</option>
              <option value="180">3 {{ t.form.hours }}</option>
              <option value="240">4 {{ t.form.hours }}</option>
              <option value="480">{{ t.form.fullDay }}</option>
            </select>
          </div>
        </div>

        <!-- Location -->
        <div>
          <label for="location" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t.form.location }}
          </label>
          <input
            id="location"
            type="text"
            v-model="form.location"
            required
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            :class="{ 'border-red-500': errors.location }"
            :placeholder="t.form.locationPlaceholder"
          />
          <p v-if="errors.location" class="mt-1 text-sm text-red-600">{{ errors.location }}</p>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t.form.description }}
          </label>
          <textarea
            id="description"
            rows="4"
            v-model="form.description"
            required
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            :class="{ 'border-red-500': errors.description }"
            :placeholder="t.form.descriptionPlaceholder"
          ></textarea>
          <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
        </div>

        <!-- Registration Settings -->
        <div class="border-t pt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.registration.title }}</h3>
          
          <div class="space-y-4">
            <div class="flex items-center">
              <input
                id="requiresRegistration"
                type="checkbox"
                v-model="form.requiresRegistration"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="requiresRegistration" class="ml-2 block text-sm text-gray-900">
                {{ t.registration.required }}
              </label>
            </div>

            <div v-if="form.requiresRegistration" class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label for="capacity" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.registration.capacity }}
                </label>
                <input
                  id="capacity"
                  type="number"
                  v-model="form.capacity"
                  min="1"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  :placeholder="t.registration.capacityPlaceholder"
                />
              </div>

              <div>
                <label for="registrationDeadline" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.registration.deadline }}
                </label>
                <input
                  id="registrationDeadline"
                  type="date"
                  v-model="form.registrationDeadline"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <div class="sm:col-span-2">
                <label for="registrationUrl" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.registration.url }}
                </label>
                <input
                  id="registrationUrl"
                  type="url"
                  v-model="form.registrationUrl"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  :placeholder="t.registration.urlPlaceholder"
                />
                <p class="mt-1 text-xs text-gray-500">{{ t.registration.urlHelp }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tags -->
        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t.form.tags }}
          </label>
          <div class="flex flex-wrap gap-2 mb-2">
            <span
              v-for="(tag, index) in form.tags"
              :key="index"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {{ tag }}
              <button
                type="button"
                @click="removeTag(index)"
                class="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
              >
                <XIcon class="h-3 w-3" />
              </button>
            </span>
          </div>
          <div class="flex">
            <input
              id="tagInput"
              type="text"
              v-model="newTag"
              @keydown.enter.prevent="addTag"
              @keydown.comma.prevent="addTag"
              class="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :placeholder="t.form.tagsPlaceholder"
            />
            <button
              type="button"
              @click="addTag"
              class="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <PlusIcon class="h-4 w-4" />
            </button>
          </div>
          <p class="mt-1 text-xs text-gray-500">{{ t.form.tagsHelp }}</p>
        </div>

        <!-- Additional Links -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label for="meetingUrl" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.meetingUrl }}
            </label>
            <input
              id="meetingUrl"
              type="url"
              v-model="form.meetingUrl"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :placeholder="t.form.meetingUrlPlaceholder"
            />
          </div>

          <div>
            <label for="recordingUrl" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.recordingUrl }}
            </label>
            <input
              id="recordingUrl"
              type="url"
              v-model="form.recordingUrl"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :placeholder="t.form.recordingUrlPlaceholder"
            />
          </div>
        </div>

        <!-- Visibility Settings -->
        <div class="border-t pt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.visibility.title }}</h3>
          
          <div class="space-y-3">
            <div class="flex items-center">
              <input
                id="isPublic"
                type="radio"
                value="public"
                v-model="form.visibility"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label for="isPublic" class="ml-2 block text-sm text-gray-900">
                {{ t.visibility.public }}
              </label>
            </div>
            
            <div class="flex items-center">
              <input
                id="isInternal"
                type="radio"
                value="internal"
                v-model="form.visibility"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label for="isInternal" class="ml-2 block text-sm text-gray-900">
                {{ t.visibility.internal }}
              </label>
            </div>
            
            <div class="flex items-center">
              <input
                id="isPrivate"
                type="radio"
                value="private"
                v-model="form.visibility"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label for="isPrivate" class="ml-2 block text-sm text-gray-900">
                {{ t.visibility.private }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Display -->
      <div v-if="generalError" class="mt-6 rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <XCircleIcon class="h-5 w-5 text-red-400" />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              {{ generalError }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Submit Buttons -->
      <div class="mt-8 flex justify-end space-x-3">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {{ t.form.cancel }}
        </button>
        
        <button
          type="submit"
          :disabled="isSubmitting"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? t.form.submitting : (isEditing ? t.form.update : t.form.create) }}
        </button>
      </div>
    </form>
  </div>
</template>