<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

interface PersonalData {
  firstName: string
  lastName: string
  email: string
  phone: string
}

const props = defineProps<{
  modelValue: PersonalData
  errors: string[]
  emailDisabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: PersonalData]
}>()

const { t } = useLanguage()

// Update specific field while preserving others
const updateField = (field: keyof PersonalData, value: string) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}
</script>

<template>
  <div class="space-y-6">
    <div class="border-b border-gray-200 pb-4">
      <h3 class="text-lg font-medium text-gray-900">
        {{ t.auth.register.sections.personal }}
      </h3>
    </div>

    <!-- First Name and Last Name Row -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <label for="firstName" class="block text-sm font-medium text-gray-700">
          {{ t.auth.register.form.firstName }}
          <span class="text-red-500">*</span>
        </label>
        <input
          id="firstName"
          :value="modelValue.firstName"
          @input="updateField('firstName', ($event.target as HTMLInputElement).value)"
          type="text"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          :class="{
            'border-red-500': errors.some(error => error.includes('first name') || error.includes('prénom'))
          }"
        />
      </div>

      <div>
        <label for="lastName" class="block text-sm font-medium text-gray-700">
          {{ t.auth.register.form.lastName }}
          <span class="text-red-500">*</span>
        </label>
        <input
          id="lastName"
          :value="modelValue.lastName"
          @input="updateField('lastName', ($event.target as HTMLInputElement).value)"
          type="text"
          required
          class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          :class="{
            'border-red-500': errors.some(error => error.includes('last name') || error.includes('nom'))
          }"
        />
      </div>
    </div>

    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">
        {{ t.auth.register.form.email }}
        <span class="text-red-500">*</span>
      </label>
      <input
        id="email"
        :value="modelValue.email"
        @input="updateField('email', ($event.target as HTMLInputElement).value)"
        type="email"
        required
        :disabled="emailDisabled"
        class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        :class="{
          'bg-gray-100 text-gray-500': emailDisabled,
          'border-red-500': errors.some(error => error.includes('email'))
        }"
      />
    </div>

    <!-- Phone -->
    <div>
      <label for="phone" class="block text-sm font-medium text-gray-700">
        {{ t.auth.register.form.phone }}
      </label>
      <input
        id="phone"
        :value="modelValue.phone"
        @input="updateField('phone', ($event.target as HTMLInputElement).value)"
        type="tel"
        class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <!-- Validation Errors -->
    <div v-if="errors.length > 0" class="bg-red-50 border border-red-200 rounded-md p-3">
      <ul class="text-sm text-red-600 space-y-1">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>