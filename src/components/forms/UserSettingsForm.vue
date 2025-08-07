<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'

interface Props {
  initialData?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
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
  email: '',
  phone: '',
  office: '',
  researchDomains: '',
  biography: '',
  githubUrl: '',
  linkedinUrl: '',
  stackoverflowUrl: '',
  twitterxUrl: '',
  googlescholarUrl: '',
  dblpUrl: '',
  personalWebsite: '',
  profilePhoto: null as File | null,
  language: 'fr',
  emailNotifications: true,
  browserNotifications: false,
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const generalError = ref('')
const successMessage = ref('')
const activeSection = ref('profile')

// Initialize form with initial data
watch(() => props.initialData, (newData) => {
  if (newData) {
    Object.assign(formData.value, newData)
  }
}, { immediate: true })

// Validation
const validateProfileForm = () => {
  const profileErrors: Record<string, string> = {}
  
  if (!formData.value.firstName.trim()) {
    profileErrors.firstName = t.value.forms.userSettings.validation.firstNameRequired
  }
  
  if (!formData.value.lastName.trim()) {
    profileErrors.lastName = t.value.forms.userSettings.validation.lastNameRequired
  }
  
  if (!formData.value.email.trim()) {
    profileErrors.email = t.value.forms.userSettings.validation.emailRequired
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    profileErrors.email = t.value.forms.userSettings.validation.emailInvalid
  }
  
  return profileErrors
}

const validatePasswordForm = () => {
  const passwordErrors: Record<string, string> = {}
  
  if (formData.value.newPassword || formData.value.confirmPassword) {
    if (!formData.value.currentPassword) {
      passwordErrors.currentPassword = t.value.forms.userSettings.validation.currentPasswordRequired
    }
    
    if (formData.value.newPassword && formData.value.newPassword.length < 8) {
      passwordErrors.newPassword = t.value.forms.userSettings.validation.newPasswordMinLength
    }
    
    if (formData.value.newPassword !== formData.value.confirmPassword) {
      passwordErrors.confirmPassword = t.value.forms.userSettings.validation.passwordMismatch
    }
  }
  
  return passwordErrors
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
  errors.value = {}
  successMessage.value = ''
  
  // Validate based on active section
  if (activeSection.value === 'profile') {
    errors.value = { ...errors.value, ...validateProfileForm() }
  } else if (activeSection.value === 'security') {
    errors.value = { ...errors.value, ...validatePasswordForm() }
  }
  
  if (Object.keys(errors.value).length > 0) return
  
  isSubmitting.value = true
  generalError.value = ''
  
  try {
    emit('submit', { 
      ...formData.value,
      section: activeSection.value
    })
    
    // Show success message based on section
    if (activeSection.value === 'profile') {
      successMessage.value = t.value.forms.userSettings.success.profileUpdated
    } else if (activeSection.value === 'security') {
      successMessage.value = t.value.forms.userSettings.success.passwordChanged
      // Clear password fields after successful change
      formData.value.currentPassword = ''
      formData.value.newPassword = ''
      formData.value.confirmPassword = ''
    }
  } catch (error) {
    generalError.value = t.value.forms.userSettings.errors.updateFailed
  } finally {
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">{{ t.forms.userSettings.title }}</h1>
      <p class="text-lg text-gray-600 mt-2">{{ t.forms.userSettings.subtitle }}</p>
    </div>

    <!-- Section Navigation -->
    <div class="mb-8">
      <nav class="flex space-x-8">
        <button
          type="button"
          @click="activeSection = 'profile'"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeSection === 'profile'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          {{ t.forms.userSettings.sections.profile }}
        </button>
        <button
          type="button"
          @click="activeSection = 'preferences'"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeSection === 'preferences'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          {{ t.forms.userSettings.sections.preferences }}
        </button>
        <button
          type="button"
          @click="activeSection = 'security'"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeSection === 'security'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          {{ t.forms.userSettings.sections.security }}
        </button>
      </nav>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Profile Section -->
      <div v-if="activeSection === 'profile'">
        <Card>
          <h2 class="text-xl font-semibold text-gray-900 mb-6">
            {{ t.forms.userSettings.sections.profile }}
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.userSettings.form.firstName }}
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
                {{ t.forms.userSettings.form.lastName }}
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
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.userSettings.form.email }}
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :class="{ 'border-red-500': errors.email }"
              />
              <p v-if="errors.email" class="text-red-600 text-sm mt-1">
                {{ errors.email }}
              </p>
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.userSettings.form.phone }}
              </label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div class="md:col-span-2">
              <label for="office" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.userSettings.form.office }}
              </label>
              <input
                id="office"
                v-model="formData.office"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div class="md:col-span-2">
              <label for="researchDomains" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.userSettings.form.researchDomains }}
              </label>
              <input
                id="researchDomains"
                v-model="formData.researchDomains"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div class="md:col-span-2">
              <label for="biography" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.userSettings.form.biography }}
              </label>
              <textarea
                id="biography"
                v-model="formData.biography"
                rows="4"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label for="githubUrl" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.userSettings.form.githubUrl }}
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
                {{ t.forms.userSettings.form.linkedinUrl }}
              </label>
              <input
                id="linkedinUrl"
                v-model="formData.linkedinUrl"
                type="url"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label for="stackoverflowUrl" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.userSettings.form.stackoverflowUrl }}
              </label>
              <input
                id="stackoverflowUrl"
                v-model="formData.stackoverflowUrl"
                type="url"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label for="twitterxUrl" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.userSettings.form.twitterxUrl }}
              </label>
              <input
                id="twitterxUrl"
                v-model="formData.twitterxUrl"
                type="url"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label for="googlescholarUrl" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.userSettings.form.googlescholarUrl }}
              </label>
              <input
                id="googlescholarUrl"
                v-model="formData.googlescholarUrl"
                type="url"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label for="dblpUrl" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.userSettings.form.dblpUrl }}
              </label>
              <input
                id="dblpUrl"
                v-model="formData.dblpUrl"
                type="url"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div class="md:col-span-2">
              <label for="personalWebsite" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.userSettings.form.personalWebsite }}
              </label>
              <input
                id="personalWebsite"
                v-model="formData.personalWebsite"
                type="url"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div class="md:col-span-2">
              <label for="profilePhoto" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.userSettings.form.profilePhoto }}
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
      </div>

      <!-- Preferences Section -->
      <div v-if="activeSection === 'preferences'">
        <Card>
          <h2 class="text-xl font-semibold text-gray-900 mb-6">
            {{ t.forms.userSettings.sections.preferences }}
          </h2>
          
          <div class="space-y-6">
            <div>
              <label for="language" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.userSettings.form.language }}
              </label>
              <select
                id="language"
                v-model="formData.language"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="fr">{{ t.forms.userSettings.languages.french }}</option>
                <option value="en">{{ t.forms.userSettings.languages.english }}</option>
              </select>
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                {{ t.forms.userSettings.form.notifications }}
              </h3>
              
              <div class="space-y-3">
                <div class="flex items-center">
                  <input
                    id="emailNotifications"
                    v-model="formData.emailNotifications"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label for="emailNotifications" class="ml-2 block text-sm text-gray-900">
                    {{ t.forms.userSettings.form.emailNotifications }}
                  </label>
                </div>

                <div class="flex items-center">
                  <input
                    id="browserNotifications"
                    v-model="formData.browserNotifications"
                    type="checkbox"
                    class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label for="browserNotifications" class="ml-2 block text-sm text-gray-900">
                    {{ t.forms.userSettings.form.browserNotifications }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Security Section -->
      <div v-if="activeSection === 'security'">
        <Card>
          <h2 class="text-xl font-semibold text-gray-900 mb-6">
            {{ t.forms.userSettings.sections.security }}
          </h2>
          
          <div class="space-y-6">
            <div>
              <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.userSettings.form.currentPassword }}
              </label>
              <input
                id="currentPassword"
                v-model="formData.currentPassword"
                type="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :class="{ 'border-red-500': errors.currentPassword }"
              />
              <p v-if="errors.currentPassword" class="text-red-600 text-sm mt-1">
                {{ errors.currentPassword }}
              </p>
            </div>

            <div>
              <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.userSettings.form.newPassword }}
              </label>
              <input
                id="newPassword"
                v-model="formData.newPassword"
                type="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :class="{ 'border-red-500': errors.newPassword }"
              />
              <p v-if="errors.newPassword" class="text-red-600 text-sm mt-1">
                {{ errors.newPassword }}
              </p>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.userSettings.form.confirmPassword }}
              </label>
              <input
                id="confirmPassword"
                v-model="formData.confirmPassword"
                type="password"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :class="{ 'border-red-500': errors.confirmPassword }"
              />
              <p v-if="errors.confirmPassword" class="text-red-600 text-sm mt-1">
                {{ errors.confirmPassword }}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-lg p-4">
        <p class="text-green-800">{{ successMessage }}</p>
      </div>

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
          {{ t.forms.userSettings.form.cancel || 'Cancel' }}
        </Button>
        
        <Button
          type="submit"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? t.forms.userSettings.form.saving : t.forms.userSettings.form.save }}
        </Button>
      </div>
    </form>
  </div>
</template>