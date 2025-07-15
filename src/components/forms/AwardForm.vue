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
  category: '',
  organization: '',
  year: new Date().getFullYear().toString(),
  recipient: '',
  description: '',
  url: ''
})

const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const generalError = ref('')

// Mock data for recipients
const mockMembers = [
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
    errors.value.title = t.value.forms.awards.validation.titleRequired
  }
  
  if (!formData.value.category) {
    errors.value.category = t.value.forms.awards.validation.categoryRequired
  }
  
  if (!formData.value.organization.trim()) {
    errors.value.organization = t.value.forms.awards.validation.organizationRequired
  }
  
  if (!formData.value.year) {
    errors.value.year = t.value.forms.awards.validation.yearRequired
  } else {
    const year = parseInt(formData.value.year)
    const currentYear = new Date().getFullYear()
    if (isNaN(year) || year < 1900 || year > currentYear + 5) {
      errors.value.year = t.value.forms.awards.validation.yearInvalid
    }
  }
  
  if (!formData.value.recipient) {
    errors.value.recipient = t.value.forms.awards.validation.recipientRequired
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
    generalError.value = t.value.forms.awards.errors.submitFailed
  } finally {
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  emit('cancel')
}

const formTitle = computed(() => 
  props.isEditing 
    ? t.value.forms.awards.titleEdit 
    : t.value.forms.awards.titleCreate
)

const submitButtonText = computed(() =>
  props.isEditing
    ? t.value.forms.awards.form.update
    : t.value.forms.awards.form.create
)
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">{{ formTitle }}</h1>
      <p class="text-lg text-gray-600 mt-2">{{ t.forms.awards.subtitle }}</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Basic Information -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.awards.sections.basic }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.awards.form.title }}
            </label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              :placeholder="t.forms.awards.form.titlePlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.title }"
            />
            <p v-if="errors.title" class="text-red-600 text-sm mt-1">
              {{ errors.title }}
            </p>
          </div>

          <div>
            <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.awards.form.category }}
            </label>
            <select
              id="category"
              v-model="formData.category"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.category }"
            >
              <option value="">{{ t.forms.awards.form.selectCategory }}</option>
              <option value="publication">{{ t.forms.awards.categories.publication }}</option>
              <option value="research">{{ t.forms.awards.categories.research }}</option>
              <option value="teaching">{{ t.forms.awards.categories.teaching }}</option>
              <option value="service">{{ t.forms.awards.categories.service }}</option>
              <option value="career">{{ t.forms.awards.categories.career }}</option>
              <option value="excellence">{{ t.forms.awards.categories.excellence }}</option>
            </select>
            <p v-if="errors.category" class="text-red-600 text-sm mt-1">
              {{ errors.category }}
            </p>
          </div>

          <div>
            <label for="year" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.awards.form.year }}
            </label>
            <input
              id="year"
              v-model="formData.year"
              type="number"
              min="1900"
              :max="new Date().getFullYear() + 5"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.year }"
            />
            <p v-if="errors.year" class="text-red-600 text-sm mt-1">
              {{ errors.year }}
            </p>
          </div>
        </div>
      </Card>

      <!-- Award Details -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.awards.sections.details }}
        </h2>
        
        <div class="space-y-6">
          <div>
            <label for="organization" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.awards.form.organization }}
            </label>
            <input
              id="organization"
              v-model="formData.organization"
              type="text"
              :placeholder="t.forms.awards.form.organizationPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.organization }"
            />
            <p v-if="errors.organization" class="text-red-600 text-sm mt-1">
              {{ errors.organization }}
            </p>
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.awards.form.description }}
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="4"
              :placeholder="t.forms.awards.form.descriptionPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="url" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.awards.form.url }}
            </label>
            <input
              id="url"
              v-model="formData.url"
              type="url"
              :placeholder="t.forms.awards.form.urlPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      <!-- Recipient Information -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.awards.sections.recipient }}
        </h2>
        
        <div>
          <label for="recipient" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t.forms.awards.form.recipient }}
          </label>
          <select
            id="recipient"
            v-model="formData.recipient"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            :class="{ 'border-red-500': errors.recipient }"
          >
            <option value="">{{ t.forms.awards.form.selectRecipient }}</option>
            <option v-for="member in mockMembers" :key="member.id" :value="member.id">
              {{ member.name }}
            </option>
          </select>
          <p v-if="errors.recipient" class="text-red-600 text-sm mt-1">
            {{ errors.recipient }}
          </p>
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
          {{ t.forms.awards.form.cancel }}
        </Button>
        
        <Button
          type="submit"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? t.forms.awards.form.submitting : submitButtonText }}
        </Button>
      </div>
    </form>
  </div>
</template>