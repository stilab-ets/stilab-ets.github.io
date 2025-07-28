<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { XCircleIcon } from 'lucide-vue-next'
import { useLanguage } from '@/composables/useLanguage'

interface RegisterForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  role: string
  researchDomain: string
  biography: string
  githubUrl: string
  linkedinUrl: string
  personalWebsite: string
  password: string
  confirmPassword: string
}

interface RegisterErrors {
  [key: string]: string
}

const props = defineProps<{
  invitationToken?: string
  invitedEmail?: string
}>()

const { t: translations } = useLanguage()
const t = computed(() => translations.value.auth.register)

const form = reactive<RegisterForm>({
  firstName: '',
  lastName: '',
  email: props.invitedEmail || '',
  phone: '',
  role: '',
  researchDomain: '',
  biography: '',
  githubUrl: '',
  linkedinUrl: '',
  personalWebsite: '',
  password: '',
  confirmPassword: ''
})

const errors = ref<RegisterErrors>({})
const generalError = ref<string>('')
const isSubmitting = ref(false)

const validateForm = (): boolean => {
  errors.value = {}
  
  if (!form.firstName.trim()) {
    errors.value.firstName = t.value.validation.firstNameRequired
  }
  
  if (!form.lastName.trim()) {
    errors.value.lastName = t.value.validation.lastNameRequired
  }
  
  if (!form.email) {
    errors.value.email = t.value.validation.emailRequired
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.value.email = t.value.validation.emailInvalid
  }
  
  if (!form.role) {
    errors.value.role = t.value.validation.roleRequired
  }
  
  if (!form.password) {
    errors.value.password = t.value.validation.passwordRequired
  } else if (form.password.length < 8) {
    errors.value.password = t.value.validation.passwordMinLength
  }
  
  if (form.password !== form.confirmPassword) {
    errors.value.confirmPassword = t.value.validation.passwordMismatch
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  generalError.value = ''
  errors.value = {}

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: form.email.split('@')[0],
        email: form.email,
        password: form.password,
        first_name: form.firstName,
        last_name: form.lastName,
        role: form.role,
        phone: form.phone,
        research_domain: form.researchDomain,
        biography: form.biography,
        github_url: form.githubUrl,
        linkedin_url: form.linkedinUrl,
        personal_website: form.personalWebsite,
        invitationToken: props.invitationToken,
      }),
    })

    if (!response.ok) {
      const data = await response.json()
      if (typeof data === 'object') {

        errors.value = data
      } else {
        generalError.value = t.value.errors.registrationFailed
      }
      return
    }

    // Success!
    const result = await response.json()
    alert(t.value.successRegistrationMessage)
    window.location.href = '/login'
  } catch (error) {
    generalError.value = t.value.errors.registrationFailed
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ t.title }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ t.subtitle }}
        </p>
        <div class="mt-4 bg-blue-50 border border-blue-200 rounded-md p-4">
          <p class="text-sm text-blue-800">
            {{ t.invitationNote }}
          </p>
        </div>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <!-- Personal Information -->
          <div class="col-span-2">
            <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.sections.personal }}</h3>
          </div>
          
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700">
              {{ t.form.firstName }}
            </label>
            <input
              id="firstName"
              type="text"
              required
              v-model="form.firstName"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': errors.firstName }"
            />
            <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">{{ errors.firstName }}</p>
          </div>

          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700">
              {{ t.form.lastName }}
            </label>
            <input
              id="lastName"
              type="text"
              required
              v-model="form.lastName"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': errors.lastName }"
            />
            <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">{{ errors.lastName }}</p>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              {{ t.form.email }}
            </label>
            <input
              id="email"
              type="email"
              required
              v-model="form.email"
              :disabled="!!invitationToken"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-50"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">
              {{ t.form.phone }}
            </label>
            <input
              id="phone"
              type="tel"
              v-model="form.phone"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': errors.phone }"
            />
            <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
          </div>

          <!-- Professional Information -->
          <div class="col-span-2 mt-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.sections.professional }}</h3>
          </div>

          <div>
            <label for="role" class="block text-sm font-medium text-gray-700">
              {{ t.form.role }}
            </label>
            <select
              id="role"
              required
              v-model="form.role"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': errors.role }"
            >
              <option value="">{{ t.form.selectRole }}</option>
              <option value="pro">{{ t.roles.professor }}</option>
              <option value="phd">{{ t.roles.phd }}</option>
              <option value="msc">{{ t.roles.master }}</option>
            </select>
            <p v-if="errors.role" class="mt-1 text-sm text-red-600">{{ errors.role }}</p>
          </div>

          <div>
            <label for="researchDomain" class="block text-sm font-medium text-gray-700">
              {{ t.form.researchDomain }}
            </label>
            <input
              id="researchDomain"
              type="text"
              v-model="form.researchDomain"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :placeholder="t.form.researchDomainPlaceholder"
            />
          </div>

          <div class="col-span-2">
            <label for="biography" class="block text-sm font-medium text-gray-700">
              {{ t.form.biography }}
            </label>
            <textarea
              id="biography"
              rows="4"
              v-model="form.biography"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :placeholder="t.form.biographyPlaceholder"
            ></textarea>
          </div>

          <!-- URLs -->
          <div class="col-span-2 mt-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.sections.links }}</h3>
          </div>

          <div>
            <label for="githubUrl" class="block text-sm font-medium text-gray-700">
              {{ t.form.githubUrl }}
            </label>
            <input
              id="githubUrl"
              type="url"
              v-model="form.githubUrl"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://github.com/username"
            />
          </div>

          <div>
            <label for="linkedinUrl" class="block text-sm font-medium text-gray-700">
              {{ t.form.linkedinUrl }}
            </label>
            <input
              id="linkedinUrl"
              type="url"
              v-model="form.linkedinUrl"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div class="col-span-2">
            <label for="personalWebsite" class="block text-sm font-medium text-gray-700">
              {{ t.form.personalWebsite }}
            </label>
            <input
              id="personalWebsite"
              type="url"
              v-model="form.personalWebsite"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="https://yourwebsite.com"
            />
          </div>

          <!-- Password -->
          <div class="col-span-2 mt-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.sections.security }}</h3>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              {{ t.form.password }}
            </label>
            <input
              id="password"
              type="password"
              required
              v-model="form.password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': errors.password }"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              {{ t.form.confirmPassword }}
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              v-model="form.confirmPassword"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': errors.confirmPassword }"
            />
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">{{ errors.confirmPassword }}</p>
          </div>
        </div>

        <div v-if="generalError" class="rounded-md bg-red-50 p-4">
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

        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? t.form.submitting : t.form.submit }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

