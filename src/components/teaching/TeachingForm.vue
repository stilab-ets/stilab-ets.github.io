<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCourses } from '@/hooks/teaching/useCourses';
import { useMembers } from '@/hooks/members/useMembers';
import { useNavigation } from '@/hooks/layout/useNavigation';
import { useLanguage } from '@/composables/useLanguage';
import Form from '@/components/ui/Form.vue';
import Button from '@/components/ui/Button.vue';

const { t } = useLanguage();
const { createCourse, isLoading, error } = useCourses();
const { members, fetchMembers } = useMembers();
const { navigateToPage } = useNavigation();

onMounted(fetchMembers);

const formData = ref({
  title: '',
  code: '',
  url: '',
  year: null as number | null,
  level: '',
  semester: '',
  description: '',
  teacher: '', // member ID
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

  if (!formData.value.code.trim()) {
    errors.value.code = 'Code is required.';
  }

  if (!formData.value.teacher) {
    errors.value.teacher = 'Teacher is required.';
  }

  if (formData.value.url && !validateURL(formData.value.url)) {
    errors.value.url = 'Invalid URL format.';
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
      teacher_id: formData.value.teacher,
    };

    const success = await createCourse(payload);

    if (success) {
      successMessage.value = 'Course created successfully! Redirecting...';
      formData.value = {
        title: '',
        code: '',
        url: '',
        year: null,
        level: '',
        semester: '',
        description: '',
        teacher: '',
      };
      setTimeout(() => navigateToPage('dashboard'), 2000);
    } else {
      errors.value.general = error.value || 'Submission failed.';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } catch (err) {
    console.error('Error creating course:', err);
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
    :title="'Create Course'"
    :subtitle="'Add a new teaching entry'"
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

      <!-- Code -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Code *</label
        >
        <input
          v-model="formData.code"
          type="text"
          class="w-full p-3 border rounded-lg"
          :class="{ 'border-red-500': errors.code }"
        />
        <p v-if="errors.code" class="text-sm text-red-600">{{ errors.code }}</p>
      </div>

      <!-- Optional Fields: URL, Year -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >URL</label
          >
          <input
            v-model="formData.url"
            type="url"
            class="w-full p-3 border rounded-lg"
            :class="{ 'border-red-500': errors.url }"
          />
          <p v-if="errors.url" class="text-sm text-red-600">{{ errors.url }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Year</label
          >
          <input
            v-model.number="formData.year"
            type="number"
            min="0"
            max="2147483647"
            class="w-full p-3 border rounded-lg"
          />
        </div>
      </div>

      <!-- Level & Semester -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Level</label
          >
          <select v-model="formData.level" class="w-full p-3 border rounded-lg">
            <option value="">Select level</option>
            <option value="UGR">Undergraduate</option>
            <option value="GRD">Graduate</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Semester</label
          >
          <select
            v-model="formData.semester"
            class="w-full p-3 border rounded-lg"
          >
            <option value="">Select semester</option>
            <option value="F">Fall</option>
            <option value="S">Spring</option>
            <option value="W">Winter</option>
          </select>
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Description</label
        >
        <textarea
          v-model="formData.description"
          rows="4"
          class="w-full p-3 border rounded-lg"
        ></textarea>
      </div>

      <!-- Teacher -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Teacher *</label
        >
        <select
          v-model="formData.teacher"
          class="w-full p-3 border rounded-lg"
          :class="{ 'border-red-500': errors.teacher }"
        >
          <option value="">Select a teacher</option>
          <option v-for="member in members" :key="member.id" :value="member.id">
            {{ member.first_name }} {{ member.last_name }}
          </option>
        </select>
        <p v-if="errors.teacher" class="text-sm text-red-600">
          {{ errors.teacher }}
        </p>
      </div>

      <!-- Buttons -->
      <div class="flex flex-col md:flex-row justify-between gap-4 pt-6">
        <Button
          type="submit"
          :disabled="isSubmitting || isLoading"
          class="w-full md:w-auto"
        >
          <span v-if="isSubmitting || isLoading">Submitting...</span>
          <span v-else>Create Course</span>
        </Button>
        <Button
          type="button"
          variant="secondary"
          class="w-full md:w-auto"
          @click="navigateToPage('courses')"
        >
          Cancel
        </Button>
      </div>
    </form>
  </Form>
</template>
