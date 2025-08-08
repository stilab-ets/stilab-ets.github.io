<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useResearch } from '@/hooks/useResearch';
import { useMembers } from '@/hooks/members/useMembers';
import { useNavigation } from '@/hooks/layout/useNavigation';
import { useLanguage } from '@/composables/useLanguage';
import Form from '@/components/ui/Form.vue';
import Button from '@/components/ui/Button.vue';

const { t } = useLanguage();
const { createResearch, isLoading, error } = useResearch();
const { members, fetchMembers } = useMembers();
const { navigateToPage } = useNavigation();

onMounted(fetchMembers);

const formData = ref({
  title: '',
  start_date: '',
  end_date: '',
  description: '',
  project_url: '',
  github_url: '',
  participants: [] as string[], // array of member ids
});

const isSubmitting = ref(false);
const errors = ref<Record<string, string>>({});
const successMessage = ref('');

const validateURL = (url: string) => /^https?:\/\/[^\s$.?#].[^\s]*$/.test(url);

const validateForm = () => {
  errors.value = {};

  if (!formData.value.title.trim()) {
    errors.value.title = 'Title is required.';
  }

  if (!formData.value.start_date) {
    errors.value.start_date = 'Start date is required.';
  }

  if (!formData.value.description.trim()) {
    errors.value.description = 'Description is required.';
  }

  if (formData.value.project_url && !validateURL(formData.value.project_url)) {
    errors.value.project_url = 'Invalid URL format.';
  }

  if (formData.value.github_url && !validateURL(formData.value.github_url)) {
    errors.value.github_url = 'Invalid URL format.';
  }

  return Object.keys(errors.value).length === 0;
};

const submitForm = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  successMessage.value = '';

  try {
    const payload = {
      ...formData.value,
      participants: formData.value.participants.map((id) => ({ id })),
    };

    const success = await createResearch(payload);

    if (success) {
      successMessage.value =
        'Research project created successfully! Redirecting...';
      formData.value = {
        title: '',
        start_date: '',
        end_date: '',
        description: '',
        project_url: '',
        github_url: '',
        participants: [],
      };
      setTimeout(() => navigateToPage('dashboard'), 2000);
    } else {
      errors.value.general = error.value || 'Submission failed.';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } catch (err) {
    console.error('Error creating research:', err);
    errors.value.general = 'Unexpected error occurred.';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } finally {
    isSubmitting.value = false;
  }
};

const formError = computed(() => errors.value.general || error.value);
</script>

<template>
  <Form
    :title="t.forms.research.titleCreate || 'Create Research Project'"
    :subtitle="t.forms.research.subtitle || 'Add a new research project entry'"
    :success-message="successMessage"
    :error="formError"
  >
    <form @submit.prevent="submitForm" class="space-y-8">
      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Title *</label
        >
        <input
          v-model="formData.title"
          type="text"
          class="w-full p-3 border rounded-lg"
          :class="{ 'border-red-500': errors.title }"
        />
        <p v-if="errors.title" class="text-sm text-red-600">
          {{ errors.title }}
        </p>
      </div>

      <!-- Dates -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Start Date *</label
          >
          <input
            v-model="formData.start_date"
            type="date"
            class="w-full p-3 border rounded-lg"
            :class="{ 'border-red-500': errors.start_date }"
          />
          <p v-if="errors.start_date" class="text-sm text-red-600">
            {{ errors.start_date }}
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >End Date</label
          >
          <input
            v-model="formData.end_date"
            type="date"
            class="w-full p-3 border rounded-lg"
          />
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Description *</label
        >
        <textarea
          v-model="formData.description"
          rows="5"
          class="w-full p-3 border rounded-lg"
          :class="{ 'border-red-500': errors.description }"
        ></textarea>
        <p v-if="errors.description" class="text-sm text-red-600">
          {{ errors.description }}
        </p>
      </div>

      <!-- Links -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Project URL</label
          >
          <input
            v-model="formData.project_url"
            type="url"
            class="w-full p-3 border rounded-lg"
            :class="{ 'border-red-500': errors.project_url }"
          />
          <p v-if="errors.project_url" class="text-sm text-red-600">
            {{ errors.project_url }}
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >GitHub URL</label
          >
          <input
            v-model="formData.github_url"
            type="url"
            class="w-full p-3 border rounded-lg"
            :class="{ 'border-red-500': errors.github_url }"
          />
          <p v-if="errors.github_url" class="text-sm text-red-600">
            {{ errors.github_url }}
          </p>
        </div>
      </div>

      <!-- Participants -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Participants</label
        >
        <select
          v-model="formData.participants"
          multiple
          class="w-full p-3 border rounded-lg h-40"
        >
          <option v-for="member in members" :key="member.id" :value="member.id">
            {{ member.first_name }} {{ member.last_name }}
          </option>
        </select>
      </div>

      <!-- Buttons -->
      <div class="flex flex-col md:flex-row justify-between gap-4 pt-6">
        <Button
          type="submit"
          :disabled="isSubmitting || isLoading"
          class="w-full md:w-auto"
        >
          <span v-if="isSubmitting || isLoading">Submitting...</span>
          <span v-else>Create Research</span>
        </Button>

        <Button
          type="button"
          variant="secondary"
          class="w-full md:w-auto"
          @click="navigateToPage('research')"
        >
          Cancel
        </Button>
      </div>
    </form>
  </Form>
</template>
