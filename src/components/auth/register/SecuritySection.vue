<script setup lang="ts">
import { ref } from 'vue';
import { useLanguage } from '@/composables/useLanguage';

interface SecurityData {
  password: string;
  confirmPassword: string;
}

const props = defineProps<{
  modelValue: SecurityData;
  errors: string[];
}>();

const emit = defineEmits<{
  'update:modelValue': [value: SecurityData];
}>();

const { t } = useLanguage();

const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Update specific field while preserving others
const updateField = (field: keyof SecurityData, value: string) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
  });
};

// Toggle password visibility
const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
  if (field === 'password') {
    showPassword.value = !showPassword.value;
  } else {
    showConfirmPassword.value = !showConfirmPassword.value;
  }
};
</script>

<template>
  <div class="space-y-6">
    <div class="border-b border-gray-200 pb-4">
      <h3 class="text-lg font-medium text-gray-900">
        {{ t.auth.register.sections.security }}
      </h3>
      <p class="text-sm text-gray-600 mt-1">
        Choose a strong password to secure your account
      </p>
    </div>

    <!-- Password -->
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">
        {{ t.auth.register.form.password }}
        <span class="text-red-500">*</span>
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          id="password"
          :value="modelValue.password"
          :type="showPassword ? 'text' : 'password'"
          required
          minlength="8"
          class="block w-full pr-10 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          :class="{
            'border-red-500': errors.some(
              (error) =>
                error.includes('password') || error.includes('mot de passe')
            ),
          }"
          @input="
            updateField('password', ($event.target as HTMLInputElement).value)
          "
        />
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            type="button"
            class="text-gray-400 hover:text-gray-600 focus:outline-none"
            @click="togglePasswordVisibility('password')"
          >
            <svg
              v-if="showPassword"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878l-.887-.887m7.071 7.071L15.85 15.85m0 0L14.436 14.436m1.414 1.414l.707.707M14.436 14.436L12 12m2.436 2.436l-.707-.707m-7.071-7.071L7.757 7.757m0 0L6.343 6.343m1.414 1.414L6.343 6.343"
              />
            </svg>
            <svg
              v-else
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </div>
      </div>
      <p class="mt-1 text-xs text-gray-600">Minimum 8 characters required</p>
    </div>

    <!-- Confirm Password -->
    <div>
      <label
        for="confirmPassword"
        class="block text-sm font-medium text-gray-700"
      >
        {{ t.auth.register.form.confirmPassword }}
        <span class="text-red-500">*</span>
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          id="confirmPassword"
          :value="modelValue.confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          required
          minlength="8"
          class="block w-full pr-10 border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          :class="{
            'border-red-500': errors.some(
              (error) =>
                error.includes('confirm') ||
                error.includes('confirmer') ||
                error.includes('match')
            ),
          }"
          @input="
            updateField(
              'confirmPassword',
              ($event.target as HTMLInputElement).value
            )
          "
        />
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            type="button"
            class="text-gray-400 hover:text-gray-600 focus:outline-none"
            @click="togglePasswordVisibility('confirmPassword')"
          >
            <svg
              v-if="showConfirmPassword"
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878l-.887-.887m7.071 7.071L15.85 15.85m0 0L14.436 14.436m1.414 1.414l.707.707M14.436 14.436L12 12m2.436 2.436l-.707-.707m-7.071-7.071L7.757 7.757m0 0L6.343 6.343m1.414 1.414L6.343 6.343"
              />
            </svg>
            <svg
              v-else
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Password Strength Indicator -->
    <div v-if="modelValue.password" class="space-y-2">
      <div class="text-sm text-gray-600">Password strength:</div>
      <div class="flex space-x-1">
        <div
          v-for="i in 4"
          :key="i"
          class="h-1 w-1/4 rounded-full"
          :class="{
            'bg-red-400': modelValue.password.length < 8,
            'bg-yellow-400':
              modelValue.password.length >= 8 &&
              modelValue.password.length < 12,
            'bg-green-400': modelValue.password.length >= 12,
          }"
        ></div>
      </div>
    </div>

    <!-- Validation Errors -->
    <div
      v-if="errors.length > 0"
      class="bg-red-50 border border-red-200 rounded-md p-3"
    >
      <ul class="text-sm text-red-600 space-y-1">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>
