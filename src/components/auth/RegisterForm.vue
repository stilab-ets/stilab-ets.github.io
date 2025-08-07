<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useInvitationToken } from '@/composables/useInvitationToken'
import { useRegister } from '@/hooks/auth/useRegister'
import { useRouteGuard } from '@/composables/useRouteGuard'
import { useLanguage } from '@/composables/useLanguage'
import Card from '@/components/ui/Card.vue'
import PersonalInfoSection from './register/PersonalInfoSection.vue'
import ProfessionalInfoSection from './register/ProfessionalInfoSection.vue'
import LinksSection from './register/LinksSection.vue'
import SecuritySection from './register/SecuritySection.vue'
import RegistrationActions from './register/RegistrationActions.vue'

const { t } = useLanguage()

// Invitation token management
const { 
  tokenData, 
  isLoading: tokenLoading, 
  canAccessRegister, 
  tokenError, 
  getPrefilledData,
  clearTokenFromUrl 
} = useInvitationToken()

// Registration management
const { 
  registerWithToken, 
  isLoading: registerLoading, 
  error: registerError,
  success: registerSuccess,
  validateFormData,
  resetState
} = useRegister()

// Route protection
const { isAccessDenied, accessError } = useRouteGuard({
  redirectOnFailure: 'home',
  showAccessDenied: true
})

// Define emits
const emit = defineEmits<{
  navigate: [page: string]
}>()

// Form data sections
const personalData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})

const professionalData = ref({
  role: '',
  researchDomain: '',
  biography: ''
})

const linksData = ref({
  githubUrl: '',
  linkedinUrl: '',
  stackoverflowUrl: '',
  twitterxUrl: '',
  googlescholarUrl: '',
  dblpUrl: '',
  personalWebsite: ''
})

const securityData = ref({
  password: '',
  confirmPassword: ''
})

// Validation errors
const validationErrors = ref<string[]>([])

// Computed form data for validation
const formData = computed(() => ({
  firstName: personalData.value.firstName,
  lastName: personalData.value.lastName,
  email: personalData.value.email,
  phone: personalData.value.phone,
  role: professionalData.value.role,
  researchDomain: professionalData.value.researchDomain,
  biography: professionalData.value.biography,
  githubUrl: linksData.value.githubUrl,
  linkedinUrl: linksData.value.linkedinUrl,
  stackoverflowUrl: linksData.value.stackoverflowUrl,
  twitterxUrl: linksData.value.twitterxUrl,
  googlescholarUrl: linksData.value.googlescholarUrl,
  dblpUrl: linksData.value.dblpUrl,
  password: securityData.value.password,
  confirmPassword: securityData.value.confirmPassword
}))

// Form validation
const isFormValid = computed(() => {
  return validateFormData(formData.value).length === 0
})

// Prefill form with invitation data
const prefillForm = () => {
  const prefilledData = getPrefilledData()
  personalData.value.email = prefilledData.email || ''
  professionalData.value.role = prefilledData.role || ''
}

// Submit registration
const handleSubmit = async () => {
  if (!isFormValid.value || !tokenData.value) return

  // Validate the form data
  const errors = validateFormData(formData.value)
  if (errors.length > 0) {
    validationErrors.value = errors
    return
  }

  validationErrors.value = []
  const result = await registerWithToken(formData.value, tokenData.value.token)
  
  if (result.success) {
    clearTokenFromUrl()
    
    // Redirect to login after success
    setTimeout(() => {
      emit('navigate', 'login')
    }, 2000)
  }
}

// Handle cancel
const handleCancel = () => {
  emit('navigate', 'home')
}

// Watch for token data changes to prefill form
watch(tokenData, (newTokenData) => {
  if (newTokenData) {
    prefillForm()
  }
}, { immediate: true })

// Initialize on mount
onMounted(() => {
  resetState()
  
  // Prefill form if token data is already available
  if (tokenData.value) {
    prefillForm()
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
        {{ t.auth.register.title }}
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        {{ t.auth.register.subtitle }}
      </p>
      
      <!-- Invitation note -->
      <div v-if="tokenData" class="mt-4 bg-blue-50 border border-blue-200 rounded-md p-3">
        <p class="text-sm text-blue-700 text-center">
          {{ t.auth.register.invitationNote }}
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
      <Card class="py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Access denied message -->
        <div v-if="isAccessDenied" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Access Denied</h3>
              <div class="mt-2 text-sm text-red-700">
                <p>{{ accessError || 'You need a valid invitation to register.' }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Token loading -->
        <div v-if="tokenLoading" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-2 text-sm text-gray-600">Validating invitation...</p>
        </div>

        <!-- Token error -->
        <div v-if="tokenError" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div class="text-sm text-red-700">{{ tokenError }}</div>
        </div>

        <!-- Registration error -->
        <div v-if="registerError" class="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <div class="text-sm text-red-700">{{ registerError }}</div>
        </div>

        <!-- Registration form -->
        <form v-if="canAccessRegister && !tokenLoading" @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Personal Information Section -->
          <PersonalInfoSection
            v-model="personalData"
            :errors="validationErrors.filter(error => 
              error.includes('name') || error.includes('email') || error.includes('phone') ||
              error.includes('nom') || error.includes('prénom')
            )"
            :email-disabled="true"
          />

          <!-- Professional Information Section -->
          <ProfessionalInfoSection
            v-model="professionalData"
            :errors="validationErrors.filter(error => 
              error.includes('role') || error.includes('domain') || error.includes('biography') ||
              error.includes('rôle') || error.includes('domaine') || error.includes('biographie')
            )"
            :role-disabled="true"
          />

          <!-- Links Section -->
          <LinksSection
            v-model="linksData"
            :errors="validationErrors.filter(error => 
              error.includes('url') || error.includes('website') || error.includes('link') ||
              error.includes('github') || error.includes('linkedin') || error.includes('stackoverflow') 
              || error.includes('twitterx') || error.includes('googlescholar') || error.includes('dblp') 
            )"
          />

          <!-- Security Section -->
          <SecuritySection
            v-model="securityData"
            :errors="validationErrors.filter(error => 
              error.includes('password') || error.includes('confirm') ||
              error.includes('mot de passe') || error.includes('confirmer')
            )"
          />

          <!-- Actions -->
          <RegistrationActions
            :is-form-valid="isFormValid"
            :is-submitting="registerLoading"
            :has-success="registerSuccess"
            @submit="handleSubmit"
            @cancel="handleCancel"
          />
        </form>
      </Card>
    </div>
  </div>
</template>