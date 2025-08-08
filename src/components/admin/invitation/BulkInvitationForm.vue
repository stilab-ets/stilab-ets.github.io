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
  'send-bulk-invitations': [data: { emails: string[]; role: string }];
}>();

const { currentLanguage } = useLanguage();
const t = computed(() => invitationsTranslations[currentLanguage.value].sender);

// Form state
const bulkForm = ref({
  emails: '',
  role: '',
});

const bulkResults = ref<{
  success: string[];
  errors: string[];
}>({
  success: [],
  errors: [],
});

// Validation
const emailList = computed(() => {
  return bulkForm.value.emails
    .split('\n')
    .map((email) => email.trim())
    .filter((email) => email.length > 0);
});

const validEmails = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailList.value.filter((email) => emailRegex.test(email));
});

const invalidEmails = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailList.value.filter((email) => !emailRegex.test(email));
});

const isBulkFormValid = computed(() => {
  return (
    validEmails.value.length > 0 &&
    bulkForm.value.role !== '' &&
    invalidEmails.value.length === 0
  );
});

// Clear results
const clearResults = () => {
  bulkResults.value = { success: [], errors: [] };
};

// Submit bulk form
const handleBulkSubmit = async () => {
  if (!isBulkFormValid.value || props.isLoading) return;

  clearResults();

  emit('send-bulk-invitations', {
    emails: validEmails.value,
    role: bulkForm.value.role,
  });

  // Reset form on successful submission
  if (!props.error) {
    bulkForm.value = {
      emails: '',
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
        <h3 class="text-lg font-medium text-gray-900">
          {{ t.form.bulkTitle }}
        </h3>
        <p class="mt-1 text-sm text-gray-600">{{ t.form.bulkSubtitle }}</p>
      </div>

      <!-- Bulk Results -->
      <div
        v-if="bulkResults.success.length > 0 || bulkResults.errors.length > 0"
        class="space-y-3"
      >
        <!-- Success Results -->
        <div
          v-if="bulkResults.success.length > 0"
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
              <h4 class="text-sm font-medium text-green-800">
                {{ bulkResults.success.length }}
                {{ t.success.bulkInvitationsSent }}
              </h4>
              <div class="mt-2 text-sm text-green-700">
                <ul class="list-disc list-inside space-y-1">
                  <li v-for="email in bulkResults.success" :key="email">
                    {{ email }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Error Results -->
        <div
          v-if="bulkResults.errors.length > 0"
          class="bg-red-50 border border-red-200 rounded-md p-4"
        >
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
              <h4 class="text-sm font-medium text-red-800">
                {{ t.errors.bulkSendFailed }}
              </h4>
              <div class="mt-2 text-sm text-red-700">
                <ul class="list-disc list-inside space-y-1">
                  <li v-for="error in bulkResults.errors" :key="error">
                    {{ error }}
                  </li>
                </ul>
              </div>
            </div>
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
      <form @submit.prevent="handleBulkSubmit" class="space-y-4">
        <!-- Role Selection -->
        <div>
          <label for="bulkRole" class="block text-sm font-medium text-gray-700">
            {{ t.form.role }}
            <span class="text-red-500">*</span>
          </label>
          <select
            id="bulkRole"
            v-model="bulkForm.role"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">{{ t.form.selectRole }}</option>
            <option v-for="role in roles" :key="role.value" :value="role.value">
              {{ role.label }}
            </option>
          </select>
        </div>

        <!-- Email List Input -->
        <div>
          <label
            for="bulkEmails"
            class="block text-sm font-medium text-gray-700"
          >
            {{ t.form.bulkEmails }}
            <span class="text-red-500">*</span>
          </label>
          <textarea
            id="bulkEmails"
            v-model="bulkForm.emails"
            rows="6"
            required
            :placeholder="t.form.bulkEmailsPlaceholder"
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            :class="{
              'border-red-500': invalidEmails.length > 0,
            }"
          ></textarea>

          <!-- Email validation feedback -->
          <div v-if="emailList.length > 0" class="mt-2 space-y-2">
            <div v-if="validEmails.length > 0" class="text-sm text-green-600">
              ✓ {{ validEmails.length }} valid email(s) found
            </div>
            <div v-if="invalidEmails.length > 0" class="text-sm text-red-600">
              ✗ {{ invalidEmails.length }} invalid email(s):
              <ul class="list-disc list-inside ml-4 mt-1">
                <li v-for="email in invalidEmails" :key="email">{{ email }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            :disabled="!isBulkFormValid || isLoading"
            class="min-w-[180px]"
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
              {{ t.form.bulkSubmit }}
            </span>
          </Button>
        </div>

        <!-- Form Summary -->
        <div
          v-if="emailList.length > 0"
          class="text-sm text-gray-600 text-center"
        >
          Ready to send {{ validEmails.length }} invitation(s)
        </div>
      </form>
    </div>
  </Card>
</template>
