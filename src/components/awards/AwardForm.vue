<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

import { useMembers } from '@/hooks/members/useMembers';
import { useAwards } from '@/hooks/awards/useAwards';
import { useLanguage } from '@/composables/useLanguage';
import { useNavigation } from '@/hooks/layout/useNavigation';

import Form from '@/components/ui/Form.vue';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';

const { t } = useLanguage();
const { createAward, isLoading, error } = useAwards();
const { members, fetchMembers } = useMembers();
const { navigateToPage } = useNavigation();

onMounted(fetchMembers);

interface Props {
  isEditing?: boolean;
  initialData?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
  initialData: () => ({}),
});

const emit = defineEmits<{
  submit: [data: Record<string, any>];
  cancel: [];
}>();

// Form state
const formData = ref({
  title: '',
  organization: '',
  year: new Date().getFullYear().toString(),
  recipients: [] as string[],
  description: '',
  url: '',
});

const errors = ref<Record<string, string>>({});
const isSubmitting = ref(false);
const generalError = ref('');
const successMessage = ref('');

// Initialize form with initial data
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      Object.assign(formData.value, newData);
    }
  },
  { immediate: true }
);

// Validation
const validateForm = () => {
  errors.value = {};

  if (!formData.value.title.trim()) {
    errors.value.title = t.value.forms.awards.validation.titleRequired;
  }

  if (!formData.value.organization.trim()) {
    errors.value.organization =
      t.value.forms.awards.validation.organizationRequired;
  }

  if (!formData.value.year) {
    errors.value.year = t.value.forms.awards.validation.yearRequired;
  } else {
    const year = parseInt(formData.value.year);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1900 || year > currentYear + 5) {
      errors.value.year = t.value.forms.awards.validation.yearInvalid;
    }
  }

  if (formData.value.recipients.length == 0) {
    errors.value.recipients = t.value.forms.awards.validation.recipientRequired;
  }

  return Object.keys(errors.value).length === 0;
};

// Form submission
const submitForm = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  generalError.value = '';

  try {
    const payload = {
      ...formData.value,
      recipients: formData.value.recipients.map((id) => ({ id })),
    };

    const success = await createAward(payload);

    if (success) {
      successMessage.value = 'Award created successfully! Redirecting...';

      formData.value = {
        title: '',
        organization: '',
        year: '',
        recipients: [],
        description: '',
        url: '',
      };

      setTimeout(() => navigateToPage('dashboard'), 2000);
    } else {
      errors.value.general = error.value || 'Submission failed.';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } catch (error) {
    errors.value.general = 'Unexpected error occurred.';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } finally {
    isSubmitting.value = false;
  }
};

const handleCancel = () => {
  emit('cancel');
};

const formTitle = computed(() =>
  props.isEditing
    ? t.value.forms.awards.titleEdit
    : t.value.forms.awards.titleCreate
);

const submitButtonText = computed(() =>
  props.isEditing
    ? t.value.forms.awards.form.update
    : t.value.forms.awards.form.create
);

const formError = computed(() => errors.value.general || error.value);
</script>

<template>
  <Form
    :title="t.forms.awards.titleCreate"
    :subtitle="t.forms.awards.subtitle"
    :success-message="successMessage"
    :error="formError"
  >
    <form @submit.prevent="submitForm" class="space-y-8">
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.awards.sections.basic }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label
              for="title"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t.forms.awards.form.title }}
            </label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              :placeholder="t.forms.awards.form.titlePlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.title }"
            />
            <p v-if="errors.title" class="text-red-600 text-sm mt-1">
              {{ errors.title }}
            </p>
          </div>

          <div>
            <label
              for="year"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t.forms.awards.form.year }}
            </label>
            <input
              id="year"
              v-model="formData.year"
              type="number"
              min="1900"
              :max="new Date().getFullYear() + 5"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.year }"
            />
            <p v-if="errors.year" class="text-red-600 text-sm mt-1">
              {{ errors.year }}
            </p>
          </div>
        </div>
      </Card>

      <!-- Award Details -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.awards.sections.details }}
        </h2>

        <div class="space-y-6">
          <div>
            <label
              for="organization"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t.forms.awards.form.organization }}
            </label>
            <input
              id="organization"
              v-model="formData.organization"
              type="text"
              :placeholder="t.forms.awards.form.organizationPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.organization }"
            />
            <p v-if="errors.organization" class="text-red-600 text-sm mt-1">
              {{ errors.organization }}
            </p>
          </div>

          <div>
            <label
              for="description"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t.forms.awards.form.description }}
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="4"
              :placeholder="t.forms.awards.form.descriptionPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              for="url"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t.forms.awards.form.url }}
            </label>
            <input
              id="url"
              v-model="formData.url"
              type="url"
              :placeholder="t.forms.awards.form.urlPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      <!-- Recipient Information -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.awards.sections.recipients }}
        </h2>
        <div>
          <select
            id="recipients"
            v-model="formData.recipients"
            multiple
            class="w-full p-3 border rounded-lg h-40"
          >
            <option
              v-for="member in members"
              :key="member.id"
              :value="member.id"
            >
              {{ member.first_name }} {{ member.last_name }}
            </option>
          </select>
        </div>

        <!-- Error Display -->
        <div
          v-if="generalError"
          class="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <p class="text-red-800">{{ generalError }}</p>
        </div>

        <!-- Form Actions -->
        <div class="flex flex-col md:flex-row justify-between gap-4 pt-6">
          <Button
            type="submit"
            :disabled="isSubmitting || isLoading"
            class="w-full md:w-auto"
          >
            {{
              isSubmitting ? t.forms.awards.form.submitting : submitButtonText
            }}
          </Button>

          <Button
            type="button"
            variant="secondary"
            class="w-full md:w-auto"
            @click="navigateToPage('awards')"
          >
            {{ t.forms.awards.form.cancel }}
          </Button>
        </div>
      </Card>
    </form>
  </Form>
</template>
