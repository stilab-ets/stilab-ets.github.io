<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Lock, XCircleIcon } from 'lucide-vue-next'
import { useLanguage } from '@/composables/useLanguage.ts'

interface LoginForm {
  email: string
  password: string
  rememberMe: boolean
}

interface LoginErrors {
  email?: string
  password?: string
}

const emit = defineEmits<{
  login: [credentials: LoginForm]
}>()

const { t: translations } = useLanguage()

const t = computed(() => translations.value.auth.login)

const form = reactive<LoginForm>({
  email: '',
  password: '',
  rememberMe: false
})

const errors = ref<LoginErrors>({})
const generalError = ref<string>('')
const isSubmitting = ref(false)

const validateForm = (): boolean => {
  errors.value = {}
  
  if (!form.email) {
    errors.value.email = t.value.validation.emailRequired
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.value.email = t.value.validation.emailInvalid
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
  
  isSubmitting.value = true
  generalError.value = ''
  
  try {
    emit('login', { ...form })
  } catch (error) {
    generalError.value = t.value.errors.loginFailed
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
            <label for="email" class="sr-only">{{ t.form.email }}</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              v-model="form.email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              :class="{ 'border-red-500': errors.email }"
              :placeholder="t.form.emailPlaceholder"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
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
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
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
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              {{ t.form.rememberMe }}
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
              {{ t.form.forgotPassword }}
            </a>
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
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <Lock class="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
            </span>
            {{ isSubmitting ? t.form.submitting : t.form.submit }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

