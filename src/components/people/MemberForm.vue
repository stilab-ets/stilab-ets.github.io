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
  firstName: '',
  lastName: '',
  title: '',
  email: '',
  phone: '',
  office: '',
  role: '',
  status: 'active',
  department: '',
  researchDomains: '',
  biography: '',
  githubUrl: '',
  linkedinUrl: '',
  personalWebsite: '',
  profilePhoto: null as File | null
})

const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const generalError = ref('')

// Initialize form with initial data
watch(() => props.initialData, (newData) => {
  if (newData) {
    Object.assign(formData.value, newData)
  }
}, { immediate: true })

// Validation
const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.firstName.trim()) {
    errors.value.firstName = t.value.forms.member.validation.firstNameRequired
  }
  
  if (!formData.value.lastName.trim()) {
    errors.value.lastName = t.value.forms.member.validation.lastNameRequired
  }
  
  if (!formData.value.title.trim()) {
    errors.value.title = t.value.forms.member.validation.titleRequired
  }
  
  if (!formData.value.email.trim()) {
    errors.value.email = t.value.forms.member.validation.emailRequired
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = t.value.forms.member.validation.emailInvalid
  }
  
  if (!formData.value.role) {
    errors.value.role = t.value.forms.member.validation.roleRequired
  }
  
  if (!formData.value.status) {
    errors.value.status = t.value.forms.member.validation.statusRequired
  }
  
  return Object.keys(errors.value).length === 0
}

// File handling
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    formData.value.profilePhoto = target.files[0]
  }
}

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  generalError.value = ''
  
  try {
    emit('submit', { ...formData.value })
  } catch (error) {
    generalError.value = t.value.forms.member.errors.submitFailed
  } finally {
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  emit('cancel')
}

const formTitle = computed(() => 
  props.isEditing 
    ? t.value.forms.member.titleEdit 
    : t.value.forms.member.titleCreate
)

const submitButtonText = computed(() =>
  props.isEditing
    ? t.value.forms.member.form.update
    : t.value.forms.member.form.create
)
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">{{ formTitle }}</h1>
      <p class="text-lg text-gray-600 mt-2">{{ t.forms.member.subtitle }}</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Personal Information -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.member.sections.personal }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.member.form.firstName }}
            </label>
            <input
              id="firstName"
              v-model="formData.firstName"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.firstName }"
            />
            <p v-if="errors.firstName" class="text-red-600 text-sm mt-1">
              {{ errors.firstName }}
            </p>
          </div>

          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.member.form.lastName }}
            </label>
            <input
              id="lastName"
              v-model="formData.lastName"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.lastName }"
            />
            <p v-if="errors.lastName" class="text-red-600 text-sm mt-1">
              {{ errors.lastName }}
            </p>
          </div>

          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.member.form.title }}
            </label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              :placeholder="t.forms.member.form.titlePlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.title }"
            />
            <p v-if="errors.title" class="text-red-600 text-sm mt-1">
              {{ errors.title }}
            </p>
          </div>

          <div>
            <label for="profilePhoto" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.member.form.profilePhoto }}
            </label>
            <input
              id="profilePhoto"
              type="file"
              accept="image/*"
              @change="handleFileUpload"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      <!-- Academic Information -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.member.sections.academic }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.member.form.role }}
            </label>
            <select
              id="role"
              v-model="formData.role"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.role }"
            >
              <option value="">{{ t.forms.member.form.selectRole }}</option>
              <option value="professor">{{ t.forms.member.roles.professor }}</option>
              <option value="researcher">{{ t.forms.member.roles.researcher }}</option>
              <option value="postdoc">{{ t.forms.member.roles.postdoc }}</option>
              <option value="phd">{{ t.forms.member.roles.phd }}</option>
              <option value="master">{{ t.forms.member.roles.master }}</option>
              <option value="engineer">{{ t.forms.member.roles.engineer }}</option>
              <option value="admin">{{ t.forms.member.roles.admin }}</option>
            </select>
            <p v-if="errors.role" class="text-red-600 text-sm mt-1">
              {{ errors.role }}
            </p>
          </div>

          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.member.form.status }}
            </label>
            <select
              id="status"
              v-model="formData.status"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.status }"
            >
              <option value="">{{ t.forms.member.form.selectStatus }}</option>
              <option value="active">{{ t.forms.member.statuses.active }}</option>
              <option value="alumni">{{ t.forms.member.statuses.alumni }}</option>
              <option value="visitor">{{ t.forms.member.statuses.visitor }}</option>
            </select>
            <p v-if="errors.status" class="text-red-600 text-sm mt-1">
              {{ errors.status }}
            </p>
          </div>

          <div>
            <label for="department" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.member.form.department }}
            </label>
            <input
              id="department"
              v-model="formData.department"
              type="text"
              :placeholder="t.forms.member.form.departmentPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="researchDomains" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.member.form.researchDomains }}
            </label>
            <input
              id="researchDomains"
              v-model="formData.researchDomains"
              type="text"
              :placeholder="t.forms.member.form.researchDomainsPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div class="md:col-span-2">
            <label for="biography" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.member.form.biography }}
            </label>
            <textarea
              id="biography"
              v-model="formData.biography"
              rows="4"
              :placeholder="t.forms.member.form.biographyPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      <!-- Contact Information -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.member.sections.contact }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="username_or_email" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.member.form.email }}
            </label>
            <input
              id="username_or_email"
              v-model="formData.email"
              type="email"
              :placeholder="t.forms.member.form.emailPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="text-red-600 text-sm mt-1">
              {{ errors.email }}
            </p>
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.member.form.phone }}
            </label>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              :placeholder="t.forms.member.form.phonePlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div class="md:col-span-2">
            <label for="office" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.member.form.office }}
            </label>
            <input
              id="office"
              v-model="formData.office"
              type="text"
              :placeholder="t.forms.member.form.officePlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      <!-- Additional Information -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.member.sections.additional }}
        </h2>
        
        <div class="space-y-6">
          <div>
            <label for="githubUrl" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.member.form.githubUrl }}
            </label>
            <input
              id="githubUrl"
              v-model="formData.githubUrl"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="linkedinUrl" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.member.form.linkedinUrl }}
            </label>
            <input
              id="linkedinUrl"
              v-model="formData.linkedinUrl"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="personalWebsite" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.member.form.personalWebsite }}
            </label>
            <input
              id="personalWebsite"
              v-model="formData.personalWebsite"
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
          {{ t.forms.member.form.cancel }}
        </Button>
        
        <Button
          type="submit"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? t.forms.member.form.submitting : submitButtonText }}
        </Button>
      </div>
    </form>
  </div>
</template>