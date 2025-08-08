<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import { invitationsTranslations } from '@/data/translations/invitations.translate';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';

const props = defineProps<{
  isLoading: boolean;
  error: string | null;
}>();

const emit = defineEmits<{
  'send-invitation': [data: { email: string; role: string }];
}>();

const { currentLanguage } = useLanguage();
const t = computed(() => invitationsTranslations[currentLanguage.value].sender);

// Form state
const formData = ref({
  email: '',
  role: '',
});

const successMessage = ref<string | null>(null);

// Validation
const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(formData.value.email);
});

const isFormValid = computed(() => {
  return isValidEmail.value && formData.value.role !== '';
});

// Clear messages
const clearMessages = () => {
  successMessage.value = null;
};

// Submit form
const handleSubmit = async () => {
  if (!isFormValid.value || props.isLoading) return;

  clearMessages();

  emit('send-invitation', {
    email: formData.value.email,
    role: formData.value.role,
  });

  // Reset form on successful submission
  if (!props.error) {
    successMessage.value = `${t.value.success.invitationSent} ${formData.value.email}`;
    formData.value = {
      email: '',
      role: '',
    };
  }
};

// Available roles
const roles = [
  { value: 'professor', label: 'Professor' },
  { value: 'researcher', label: 'Researcher' },
  { value: 'postdoc', label: 'Post-Doctoral Researcher' },
  { value: 'phd', label: 'PhD Student' },
  { value: 'master', label: 'Master Student' },
  { value: 'engineer', label: 'Research Engineer' },
  { value: 'admin', label: 'Administrator' },
];
</script>

<template>
  <Card class="p-6">
    <div class="space-y-6">
      <!-- Header -->
      <div>
        <h3 class="text-lg font-medium text-gray-900">{{ t.title }}</h3>
        <p class="mt-1 text-sm text-gray-600">{{ t.subtitle }}</p>
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="bg-green-50 border border-green-200 rounded-md p-4"
      >
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-green-800">{{ successMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg
              class="h-5 w-5 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-800">{{ error }}</p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <!-- Email Input -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            {{ t.form.email }}
            <span class="text-red-500">*</span>
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              :placeholder="t.form.emailPlaceholder"
              class="pl-10 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              :class="{
                'border-red-500': formData.email && !isValidEmail,
              }"
            />
          </div>
          <p
            v-if="formData.email && !isValidEmail"
            class="mt-1 text-sm text-red-600"
          >
            {{ t.validation.emailInvalid }}
          </p>
        </div>

        <!-- Role Selection -->
        <div>
          <label for="role" class="block text-sm font-medium text-gray-700">
            {{ t.form.role }}
            <span class="text-red-500">*</span>
          </label>
          <select
            id="role"
            v-model="formData.role"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{{ t.form.selectRole }}</option>
            <option v-for="role in roles" :key="role.value" :value="role.value">
              {{ role.label }}
            </option>
          </select>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            :disabled="!isFormValid || isLoading"
            class="min-w-[140px]"
          >
            <div v-if="isLoading" class="flex items-center">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ t.form.submitting }}
            </div>
            <span v-else>
              {{ t.form.submit }}
            </span>
          </Button>
        </div>
      </form>
    </div>
  </Card>
</template>
