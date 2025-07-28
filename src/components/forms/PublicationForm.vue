<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { usePublications } from '@/hooks/publications/usePublications'
import type { Publication } from '@/services/MainAPI'

// UI Components
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'

interface PublicationFormData {
  publication_type: string
  title: string
  authors: string
  journal: string
  year: number | undefined
  volume: string
  doi: string
  url: string
  abstract: string
}

interface PublicationErrors {
  [key: string]: string
}

const props = defineProps<{
  initialData?: Partial<Publication>
  isEditing?: boolean
}>()

const emit = defineEmits<{
  submit: [data: PublicationFormData]
  cancel: []
  success: []
}>()

const { t: translations } = useLanguage()
const t = computed(() => translations.value.forms.publication)

const { createPublication, updatePublication, isLoading } = usePublications()

// Initialize form with default values to ensure reactivity
const form = reactive<PublicationFormData>({
  publication_type: props.initialData?.publication_type || '',
  title: props.initialData?.title || '',
  authors: props.initialData?.authors || '',
  journal: props.initialData?.journal || '',
  year: props.initialData?.year || undefined,
  volume: props.initialData?.volume || '',
  doi: props.initialData?.doi || '',
  url: props.initialData?.url || '',
  abstract: props.initialData?.abstract || ''
})

const errors = ref<PublicationErrors>({})
const generalError = ref<string>('')
const isSubmitting = ref(false)

// Validation function
const validateForm = (): boolean => {
  errors.value = {}
  
  if (!form.publication_type) {
    errors.value.publication_type = t.value.validation.entryTypeRequired
  }
  
  if (!form.title.trim()) {
    errors.value.title = t.value.validation.titleRequired
  }
  
  if (!form.authors.trim()) {
    errors.value.authors = t.value.validation.authorsRequired
  }
  
  if (form.year && (form.year < 1900 || form.year > new Date().getFullYear() + 5)) {
    errors.value.year = t.value.validation.yearInvalid
  }
  
  if (form.doi && !/^10\.\d{4,}\/\S+/.test(form.doi)) {
    errors.value.doi = t.value.validation.doiInvalid
  }
  
  return Object.keys(errors.value).length === 0
}

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  generalError.value = ''
  
  try {
    const success = props.isEditing && props.initialData?.id
      ? await updatePublication(props.initialData.id, form)
      : await createPublication(form)

    if (success) {
      emit('success')
      if (!props.isEditing) {
        clearForm()
      }
    } else {
      generalError.value = t.value.errors.submitFailed
    }
  } catch (error: any) {
    generalError.value = error.message || t.value.errors.submitFailed
  } finally {
    isSubmitting.value = false
  }
}

// Clear form
const clearForm = () => {
  Object.assign(form, {
    publication_type: '',
    title: '',
    authors: '',
    journal: '',
    year: undefined,
    volume: '',
    doi: '',
    url: '',
    abstract: ''
  })
  errors.value = {}
  generalError.value = ''
}

// Handle cancel
const handleCancel = () => {
  emit('cancel')
}

// Submit button text
const submitButtonText = computed(() => {
  if (isSubmitting.value) return t.value.form.submitting
  return props.isEditing ? t.value.form.update : t.value.form.create
})
</script>

<template>
  <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
    <!-- Form Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <h2 class="text-2xl font-bold text-gray-900">
        {{ isEditing ? t.titleEdit : t.titleCreate }}
      </h2>
      <p class="mt-1 text-sm text-gray-600">
        {{ t.subtitle }}
      </p>
    </div>

    <!-- Form Content -->
    <form @submit.prevent="handleSubmit" class="p-6">
      <div class="space-y-8">
        
        <!-- Publication Type -->
        <Card>
          <div>
            <label for="publication_type" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.entryType }}
            </label>
            <select
              id="publication_type"
              v-model="form.publication_type"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': errors.publication_type }"
            >
              <option value="">{{ t.form.selectEntryType }}</option>
              <option value="article">{{ t.entryTypes.article }}</option>
              <option value="conference">{{ t.entryTypes.conference }}</option>
              <option value="workshop">{{ t.entryTypes.inproceedings }}</option>
              <option value="book">{{ t.entryTypes.book }}</option>
              <option value="thesis">{{ t.entryTypes.phdthesis }}</option>
              <option value="misc">{{ t.entryTypes.misc }}</option>
            </select>
            <p v-if="errors.publication_type" class="mt-1 text-sm text-red-600">{{ errors.publication_type }}</p>
          </div>
        </Card>

        <!-- Basic Information -->
        <Card>
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.sections.basic }}</h3>
          
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

            <div class="sm:col-span-2">
              <label for="authors" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.form.authors }}
              </label>
              <input
                id="authors"
                type="text"
                v-model="form.authors"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.authors }"
                :placeholder="t.form.authorsPlaceholder"
              />
              <p class="mt-1 text-xs text-gray-500">{{ t.form.authorsHelp }}</p>
              <p v-if="errors.authors" class="mt-1 text-sm text-red-600">{{ errors.authors }}</p>
            </div>

            <div>
              <label for="year" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.form.year }}
              </label>
              <input
                id="year"
                type="number"
                v-model="form.year"
                min="1900"
                :max="new Date().getFullYear() + 5"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.year }"
              />
              <p v-if="errors.year" class="mt-1 text-sm text-red-600">{{ errors.year }}</p>
            </div>

            <div>
              <label for="volume" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.form.volume }}
              </label>
              <input
                id="volume"
                type="text"
                v-model="form.volume"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :placeholder="t.form.volumePlaceholder"
              />
            </div>
          </div>
        </Card>

        <!-- Publication Venue -->
        <Card>
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.sections.venue }}</h3>
          
          <div>
            <label for="journal" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.journal }}
            </label>
            <input
              id="journal"
              type="text"
              v-model="form.journal"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :placeholder="t.form.journalPlaceholder"
            />
          </div>
        </Card>

        <!-- Links and Identifiers -->
        <Card>
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.sections.links }}</h3>
          
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="doi" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.form.doi }}
              </label>
              <input
                id="doi"
                type="text"
                v-model="form.doi"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.doi }"
                :placeholder="t.form.doiPlaceholder"
              />
              <p v-if="errors.doi" class="mt-1 text-sm text-red-600">{{ errors.doi }}</p>
            </div>

            <div>
              <label for="url" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.form.url }}
              </label>
              <input
                id="url"
                type="url"
                v-model="form.url"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :placeholder="t.form.urlPlaceholder"
              />
            </div>
          </div>
        </Card>

        <!-- Abstract -->
        <Card>
          <div>
            <label for="abstract" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.abstract }}
            </label>
            <textarea
              id="abstract"
              v-model="form.abstract"
              rows="4"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :placeholder="t.form.abstractPlaceholder"
            />
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
            {{ t.form.cancel }}
          </Button>
          
          <Button
            type="submit"
            :disabled="isSubmitting"
            :loading="isSubmitting"
          >
            {{ submitButtonText }}
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>