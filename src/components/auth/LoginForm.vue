<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Lock, XCircleIcon } from 'lucide-vue-next'
import { useLanguage } from '@/composables/useLanguage'
import { useAuth } from '@/hooks/auth/useAuth'

interface LoginForm {
  username_or_email: string
  password: string
  rememberMe: boolean
}

interface LoginErrors {
  username_or_email?: string
  password?: string
}

const emit = defineEmits<{
  login: [data: { email: string; password: string; rememberMe: boolean }]
  loginSuccess: []
  loginFailed: [error: string]
}>()

const { t: translations } = useLanguage()
const { login } = useAuth()

const t = computed(() => translations.value.auth.login)

const form = reactive<LoginForm>({
  username_or_email: '',
  password: '',
  rememberMe: false
})

const errors = ref<LoginErrors>({})
const generalError = ref<string>('')
const isSubmitting = ref(false)

const validateForm = (): boolean => {
  errors.value = {}
  
  if (!form.username_or_email) {
    errors.value.username_or_email = t.value.validation.emailRequired
  } else {
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.username_or_email)) {
      errors.value.username_or_email = t.value.validation.emailInvalid
    }
  }
  
  if (!form.password) {
    errors.value.password = t.value.validation.passwordRequired
  } else if (form.password.length < 6) {
    errors.value.password = t.value.validation.passwordMinLength
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  // Emit login event for tests
  emit('login', {
    email: form.username_or_email,
    password: form.password,
    rememberMe: form.rememberMe
  })
  
  isSubmitting.value = true
  generalError.value = ''
  
  try {
    const success = await login({
      username_or_email: form.username_or_email,
      password: form.password
    })
    
    if (success) {
      // Fetch profile after successful login
      emit('loginSuccess')
    } else {
      generalError.value = t.value.errors.loginFailed
      emit('loginFailed', t.value.errors.loginFailed)
    }
  } catch (error) {
    console.warn('Login error:', error)
    generalError.value = t.value.errors.loginFailed
    emit('loginFailed', t.value.errors.loginFailed)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="flex-1 w-full items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-lg w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{ t.title }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ t.subtitle }}
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username_or_email" class="sr-only">{{ t.form.email }}</label>
            <input
              id="username_or_email"
              name="username_or_email"
              type="text"
              autocomplete="username_or_email"
              required
              v-model="form.username_or_email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4] focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.username_or_email }"
              :placeholder="t.form.emailPlaceholder"
            />
            <p v-if="errors.username_or_email" class="mt-1 text-sm text-red-600">{{ errors.username_or_email }}</p>
          </div>
          <div>
            <label for="password" class="sr-only">{{ t.form.password }}</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="form.password"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4] focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.password }"
              :placeholder="t.form.passwordPlaceholder"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              v-model="form.rememberMe"
              class="h-4 w-4 text-[#08a4d4] focus:ring-[#08a4d4] border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              {{ t.form.rememberMe }}
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-[#08a4d4] hover:text-[#066a88]">
              {{ t.form.forgotPassword }}
            </a>
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
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <Lock class="h-5 w-5 text-[#066a88] group-hover:text-[#044c5f]" aria-hidden="true" />
            </span>
            {{ isSubmitting ? t.form.submitting : t.form.submit }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
