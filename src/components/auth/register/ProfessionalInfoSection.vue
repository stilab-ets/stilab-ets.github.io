<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

interface ProfessionalData {
  role: string
  researchDomain: string
  biography: string
}

const props = defineProps<{
  modelValue: ProfessionalData
  errors: string[]
  roleDisabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: ProfessionalData]
}>()

const { t } = useLanguage()

// Update specific field while preserving others
const updateField = (field: keyof ProfessionalData, value: string) => {
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
        {{ t.auth.register.sections.professional }}
      </h3>
    </div>

    <!-- Role -->
    <div>
      <label for="role" class="block text-sm font-medium text-gray-700">
        {{ t.auth.register.form.role }}
        <span class="text-red-500">*</span>
      </label>
      <select
        id="role"
        :value="modelValue.role"
        @change="updateField('role', ($event.target as HTMLSelectElement).value)"
        required
        :disabled="roleDisabled"
        class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        :class="{
          'bg-gray-100 text-gray-500': roleDisabled,
          'border-red-500': errors.some(error => error.includes('role') || error.includes('rôle'))
        }"
      >
        <option value="">{{ t.auth.register.form.selectRole }}</option>
        <option value="professor">{{ t.auth.register.roles.professor }}</option>
        <option value="researcher">{{ t.auth.register.roles.researcher }}</option>
        <option value="postdoc">{{ t.auth.register.roles.postdoc }}</option>
        <option value="phd">{{ t.auth.register.roles.phd }}</option>
        <option value="master">{{ t.auth.register.roles.master }}</option>
        <option value="engineer">{{ t.auth.register.roles.engineer }}</option>
      </select>
    </div>

    <!-- Research Domain -->
    <div>
      <label for="researchDomain" class="block text-sm font-medium text-gray-700">
        {{ t.auth.register.form.researchDomain }}
      </label>
      <input
        id="researchDomain"
        :value="modelValue.researchDomain"
        @input="updateField('researchDomain', ($event.target as HTMLInputElement).value)"
        type="text"
        :placeholder="t.auth.register.form.researchDomainPlaceholder"
        class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <!-- Biography -->
    <div>
      <label for="biography" class="block text-sm font-medium text-gray-700">
        {{ t.auth.register.form.biography }}
      </label>
      <textarea
        id="biography"
        :value="modelValue.biography"
        @input="updateField('biography', ($event.target as HTMLTextAreaElement).value)"
        rows="4"
        :placeholder="t.auth.register.form.biographyPlaceholder"
        class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      ></textarea>
    </div>

    <!-- Validation Errors -->
    <div v-if="errors.length > 0" class="bg-red-50 border border-red-200 rounded-md p-3">
      <ul class="text-sm text-red-600 space-y-1">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>