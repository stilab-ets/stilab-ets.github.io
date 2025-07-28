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

    // Success! Redirect or show success message
    console.log('Registration successful')
  } catch (error) {
    console.error('Registration error:', error)
    generalError.value = t.value.errors.registrationFailed
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ t.title }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ t.subtitle }}
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <!-- Personal Information -->
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">
                {{ t.form.firstName }}
              </label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4] sm:text-sm"
                :class="{ 'border-red-500': errors.firstName }"
                :placeholder="t.form.firstNamePlaceholder"
              />
              <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">{{ errors.firstName }}</p>
            </div>

            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700">
                {{ t.form.lastName }}
              </label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4] sm:text-sm"
                :class="{ 'border-red-500': errors.lastName }"
                :placeholder="t.form.lastNamePlaceholder"
              />
              <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">{{ errors.lastName }}</p>
            </div>
          </div>

          <div>
            <label for="username_or_email" class="block text-sm font-medium text-gray-700">
              {{ t.form.email }}
            </label>
            <input
              id="username_or_email"
              v-model="form.email"
              type="email"
              required
              :disabled="!!props.invitedEmail"
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4] sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              :class="{ 'border-red-500': errors.email }"
              :placeholder="t.form.emailPlaceholder"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <div>
            <label for="role" class="block text-sm font-medium text-gray-700">
              {{ t.form.role }}
            </label>
            <select
              id="role"
              v-model="form.role"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4] sm:text-sm"
              :class="{ 'border-red-500': errors.role }"
            >
              <option value="">{{ t.form.selectRole }}</option>
              <option value="professor">{{ t.roles.professor }}</option>
              <option value="engineer">{{ t.roles.engineer }}</option>
              <option value="phd">{{ t.roles.phd }}</option>
              <option value="msc">{{ t.roles.master }}</option>
            </select>
            <p v-if="errors.role" class="mt-1 text-sm text-red-600">{{ errors.role }}</p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              {{ t.form.password }}
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4] sm:text-sm"
              :class="{ 'border-red-500': errors.password }"
              :placeholder="t.form.passwordPlaceholder"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              {{ t.form.confirmPassword }}
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              required
              class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4] sm:text-sm"
              :class="{ 'border-red-500': errors.confirmPassword }"
              :placeholder="t.form.confirmPasswordPlaceholder"
            />
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">{{ errors.confirmPassword }}</p>
          </div>
        </div>

        <!-- Error Display -->
        <div v-if="generalError" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex">
            <div class="text-red-400">
              <XCircleIcon class="h-5 w-5" />
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-700">{{ generalError }}</p>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#08a4d4] hover:bg-[#066a88] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#08a4d4] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? t.form.submitting : t.form.submit }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>