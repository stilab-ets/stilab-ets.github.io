<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLanguage } from '../../composables/useLanguage'

interface Props {
  initialData?: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    researchDomain?: string
    biography?: string
    imageUrl?: string
    githubUrl?: string
    linkedinUrl?: string
    personalWebsite?: string
    notifications: {
      emailNotifications: boolean
      eventReminders: boolean
      publicationAlerts: boolean
      weeklyDigest: boolean
    }
    privacy: {
      profileVisibility: 'public' | 'internal' | 'private'
      showEmail: boolean
      showPhone: boolean
    }
    preferences: {
      language: 'en' | 'fr'
      timezone: string
      dateFormat: string
    }
  }
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  submit: [data: any]
  cancel: []
  changePassword: []
  deactivateAccount: []
}>()

const { t: translations } = useLanguage()
const t = computed(() => translations.value)

const formData = ref({
  firstName: props.initialData?.firstName || '',
  lastName: props.initialData?.lastName || '',
  email: props.initialData?.email || '',
  phone: props.initialData?.phone || '',
  researchDomain: props.initialData?.researchDomain || '',
  biography: props.initialData?.biography || '',
  imageUrl: props.initialData?.imageUrl || '',
  githubUrl: props.initialData?.githubUrl || '',
  linkedinUrl: props.initialData?.linkedinUrl || '',
  personalWebsite: props.initialData?.personalWebsite || '',
  notifications: {
    emailNotifications: props.initialData?.notifications?.emailNotifications ?? true,
    eventReminders: props.initialData?.notifications?.eventReminders ?? true,
    publicationAlerts: props.initialData?.notifications?.publicationAlerts ?? false,
    weeklyDigest: props.initialData?.notifications?.weeklyDigest ?? false
  },
  privacy: {
    profileVisibility: props.initialData?.privacy?.profileVisibility || 'public',
    showEmail: props.initialData?.privacy?.showEmail ?? false,
    showPhone: props.initialData?.privacy?.showPhone ?? false
  },
  preferences: {
    language: props.initialData?.preferences?.language || 'en',
    timezone: props.initialData?.preferences?.timezone || 'UTC',
    dateFormat: props.initialData?.preferences?.dateFormat || 'DD/MM/YYYY'
  }
})

const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})
const activeTab = ref('profile')

const tabs = [
  { id: 'profile', label: 'Profile Information' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'security', label: 'Security' }
]

const profileVisibilityOptions = [
  { value: 'public', label: 'Public - Visible to everyone' },
  { value: 'internal', label: 'Internal - Lab members only' },
  { value: 'private', label: 'Private - Only visible to administrators' }
]

const timezones = [
  'UTC',
  'Europe/Paris',
  'Europe/London',
  'America/New_York',
  'America/Los_Angeles',
  'Asia/Tokyo',
  'Australia/Sydney'
]

const dateFormats = [
  'DD/MM/YYYY',
  'MM/DD/YYYY',
  'YYYY-MM-DD',
  'DD-MM-YYYY'
]

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.firstName.trim()) {
    errors.value.firstName = t.auth.register.validation.firstNameRequired
  }
  
  if (!formData.value.lastName.trim()) {
    errors.value.lastName = t.auth.register.validation.lastNameRequired
  }
  
  if (!formData.value.email.trim()) {
    errors.value.email = t.auth.register.validation.emailRequired
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = t.auth.register.validation.emailInvalid
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  try {
    emit('submit', formData.value)
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}

const setActiveTab = (tabId: string) => {
  activeTab.value = tabId
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <PageHeader
      title="User Settings"
      subtitle="Manage your profile, notifications, and account preferences"
      highlight-word="Settings"
    />

    <Card class="mt-8">
      <!-- Tab Navigation -->
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="setActiveTab(tab.id)"
            :class="[
              'py-2 px-1 border-b-2 font-medium text-sm',
              activeTab === tab.id
                ? 'border-[#08a4d4] text-[#08a4d4]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <form @submit.prevent="handleSubmit" class="p-6">
        <!-- Profile Information Tab -->
        <div v-if="activeTab === 'profile'" class="space-y-6">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ t.auth.register.sections.personal }}
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.auth.register.form.firstName }}
              </label>
              <input
                id="firstName"
                v-model="formData.firstName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.firstName }"
              />
              <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">
                {{ errors.firstName }}
              </p>
            </div>

            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.auth.register.form.lastName }}
              </label>
              <input
                id="lastName"
                v-model="formData.lastName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.lastName }"
              />
              <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">
                {{ errors.lastName }}
              </p>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.auth.register.form.email }}
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.email }"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                {{ errors.email }}
              </p>
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.auth.register.form.phone }}
              </label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>

            <div>
              <label for="researchDomain" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.auth.register.form.researchDomain }}
              </label>
              <input
                id="researchDomain"
                v-model="formData.researchDomain"
                type="text"
                :placeholder="t.auth.register.form.researchDomainPlaceholder"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>

            <div>
              <label for="imageUrl" class="block text-sm font-medium text-gray-700 mb-2">
                Profile Image URL
              </label>
              <input
                id="imageUrl"
                v-model="formData.imageUrl"
                type="url"
                placeholder="https://example.com/photo.jpg"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>
          </div>

          <div>
            <label for="biography" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.auth.register.form.biography }}
            </label>
            <textarea
              id="biography"
              v-model="formData.biography"
              rows="4"
              :placeholder="t.auth.register.form.biographyPlaceholder"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label for="githubUrl" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.auth.register.form.githubUrl }}
              </label>
              <input
                id="githubUrl"
                v-model="formData.githubUrl"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>

            <div>
              <label for="linkedinUrl" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.auth.register.form.linkedinUrl }}
              </label>
              <input
                id="linkedinUrl"
                v-model="formData.linkedinUrl"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>

            <div>
              <label for="personalWebsite" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.auth.register.form.personalWebsite }}
              </label>
              <input
                id="personalWebsite"
                v-model="formData.personalWebsite"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>
          </div>
        </div>

        <!-- Notifications Tab -->
        <div v-if="activeTab === 'notifications'" class="space-y-6">
          <h3 class="text-lg font-semibold text-gray-900">
            Email Notifications
          </h3>
          
          <div class="space-y-4">
            <div class="flex items-center">
              <input
                id="emailNotifications"
                v-model="formData.notifications.emailNotifications"
                type="checkbox"
                class="h-4 w-4 text-[#08a4d4] focus:ring-[#08a4d4] border-gray-300 rounded"
              />
              <label for="emailNotifications" class="ml-3 block text-sm text-gray-900">
                Enable email notifications
              </label>
            </div>

            <div class="flex items-center">
              <input
                id="eventReminders"
                v-model="formData.notifications.eventReminders"
                type="checkbox"
                class="h-4 w-4 text-[#08a4d4] focus:ring-[#08a4d4] border-gray-300 rounded"
              />
              <label for="eventReminders" class="ml-3 block text-sm text-gray-900">
                Event reminders
              </label>
            </div>

            <div class="flex items-center">
              <input
                id="publicationAlerts"
                v-model="formData.notifications.publicationAlerts"
                type="checkbox"
                class="h-4 w-4 text-[#08a4d4] focus:ring-[#08a4d4] border-gray-300 rounded"
              />
              <label for="publicationAlerts" class="ml-3 block text-sm text-gray-900">
                New publication alerts
              </label>
            </div>

            <div class="flex items-center">
              <input
                id="weeklyDigest"
                v-model="formData.notifications.weeklyDigest"
                type="checkbox"
                class="h-4 w-4 text-[#08a4d4] focus:ring-[#08a4d4] border-gray-300 rounded"
              />
              <label for="weeklyDigest" class="ml-3 block text-sm text-gray-900">
                Weekly lab digest
              </label>
            </div>
          </div>
        </div>

        <!-- Privacy Tab -->
        <div v-if="activeTab === 'privacy'" class="space-y-6">
          <h3 class="text-lg font-semibold text-gray-900">
            Privacy Settings
          </h3>
          
          <div class="space-y-6">
            <div>
              <label for="profileVisibility" class="block text-sm font-medium text-gray-700 mb-2">
                Profile Visibility
              </label>
              <select
                id="profileVisibility"
                v-model="formData.privacy.profileVisibility"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              >
                <option v-for="option in profileVisibilityOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-900">Contact Information Visibility</h4>
              
              <div class="flex items-center">
                <input
                  id="showEmail"
                  v-model="formData.privacy.showEmail"
                  type="checkbox"
                  class="h-4 w-4 text-[#08a4d4] focus:ring-[#08a4d4] border-gray-300 rounded"
                />
                <label for="showEmail" class="ml-3 block text-sm text-gray-900">
                  Show email address on public profile
                </label>
              </div>

              <div class="flex items-center">
                <input
                  id="showPhone"
                  v-model="formData.privacy.showPhone"
                  type="checkbox"
                  class="h-4 w-4 text-[#08a4d4] focus:ring-[#08a4d4] border-gray-300 rounded"
                />
                <label for="showPhone" class="ml-3 block text-sm text-gray-900">
                  Show phone number on public profile
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Preferences Tab -->
        <div v-if="activeTab === 'preferences'" class="space-y-6">
          <h3 class="text-lg font-semibold text-gray-900">
            User Preferences
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label for="language" class="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                id="language"
                v-model="formData.preferences.language"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>

            <div>
              <label for="timezone" class="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                id="timezone"
                v-model="formData.preferences.timezone"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              >
                <option v-for="tz in timezones" :key="tz" :value="tz">
                  {{ tz }}
                </option>
              </select>
            </div>

            <div>
              <label for="dateFormat" class="block text-sm font-medium text-gray-700 mb-2">
                Date Format
              </label>
              <select
                id="dateFormat"
                v-model="formData.preferences.dateFormat"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              >
                <option v-for="format in dateFormats" :key="format" :value="format">
                  {{ format }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Security Tab -->
        <div v-if="activeTab === 'security'" class="space-y-6">
          <h3 class="text-lg font-semibold text-gray-900">
            Security & Account
          </h3>
          
          <div class="space-y-6">
            <div class="border border-gray-200 rounded-lg p-4">
              <h4 class="text-sm font-medium text-gray-900 mb-2">Password</h4>
              <p class="text-sm text-gray-600 mb-4">
                Change your password to keep your account secure
              </p>
              <Button
                type="button"
                variant="secondary"
                @click="emit('changePassword')"
              >
                Change Password
              </Button>
            </div>

            <div class="border border-red-200 rounded-lg p-4">
              <h4 class="text-sm font-medium text-red-900 mb-2">Danger Zone</h4>
              <p class="text-sm text-red-600 mb-4">
                Deactivating your account will remove your access but preserve your data
              </p>
              <Button
                type="button"
                variant="secondary"
                class="text-red-600 border-red-300 hover:bg-red-50"
                @click="emit('deactivateAccount')"
              >
                Deactivate Account
              </Button>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-8">
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
            {{ isSubmitting ? t.forms.publication.form.submitting : 'Save Changes' }}
          </Button>
        </div>
      </form>
    </Card>
  </div>
</template>