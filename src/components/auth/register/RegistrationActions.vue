<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import Button from '@/components/ui/Button.vue'

const props = defineProps<{
  isFormValid: boolean
  isSubmitting: boolean
  hasSuccess: boolean
}>()

const emit = defineEmits<{
  submit: []
  cancel: []
}>()

const { t } = useLanguage()

const handleSubmit = () => {
  if (props.isFormValid && !props.isSubmitting) {
    emit('submit')
  }
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Success Message -->
    <div v-if="hasSuccess" class="bg-green-50 border border-green-200 rounded-md p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-green-800">
            Registration Successful!
          </h3>
          <div class="mt-2 text-sm text-green-700">
            <p>Your account has been created successfully. You will be redirected to the login page shortly.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
      <Button
        type="button"
        variant="secondary"
        @click="handleCancel"
        :disabled="isSubmitting"
      >
        Cancel
      </Button>
      
      <Button
        type="submit"
        variant="primary"
        @click="handleSubmit"
        :disabled="!isFormValid || isSubmitting"
        class="min-w-[120px]"
      >
        <div v-if="isSubmitting" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ t.auth.register.form.submitting }}
        </div>
        <span v-else>
          {{ t.auth.register.form.submit }}
        </span>
      </Button>
    </div>

    <!-- Form Validation Hint -->
    <div v-if="!isFormValid && !isSubmitting" class="text-center">
      <p class="text-sm text-gray-500">
        Please fill in all required fields to continue
      </p>
    </div>
  </div>
</template>