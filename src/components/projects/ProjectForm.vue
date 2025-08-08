<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import type { Project } from '@/services/MainAPI';

// UI Components
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';

interface ProjectFormData {
  type: string;
  title: string;
  domain: string;
  description: string;
  supervisor: string;
  cosupervisor: string;
  requirements: string[];
  objectives: string[];
  startDate: string | Date;
  endDate: string | Date;
  difficulty: string;
  status: string;
}

interface ProjectErrors {
  [key: string]: string;
}

const props = defineProps<{
  initialData?: Partial<Project>;
  isEditing?: boolean;
}>();

const emit = defineEmits<{
  submit: [data: ProjectFormData];
  cancel: [];
}>();

const { t: translations } = useLanguage();
const t = computed(() => translations.value.forms.project);

// Initialize form with default values to ensure reactivity
const form = reactive<ProjectFormData>({
  type: props.initialData?.type || 'msc',
  title: props.initialData?.title || '',
  domain: props.initialData?.domain || '',
  description: props.initialData?.description || '',
  supervisor: props.initialData?.supervisor || '',
  cosupervisor: props.initialData?.cosupervisor || '',
  requirements: Array.isArray(props.initialData?.requirements)
    ? [...props.initialData.requirements]
    : [],
  objectives: Array.isArray(props.initialData?.objectives)
    ? [...props.initialData.objectives]
    : [],
  startDate: props.initialData?.startDate || '',
  endDate: props.initialData?.endDate || '',
  difficulty: props.initialData?.difficulty || 'intermediate',
  status: props.initialData?.status || 'planned',
});

const errors = ref<ProjectErrors>({});
const generalError = ref<string>('');
const isSubmitting = ref(false);
const newRequirement = ref('');
const newObjective = ref('');

// Mock supervisors - replace with actual API call or prop
const supervisors = [
  { id: '1', name: 'Dr. Marie Dubois' },
  { id: '2', name: 'Prof. Jean Martin' },
  { id: '3', name: 'Dr. Sarah Chen' },
];

// Project domains
const domains = [
  {
    value: 'software-architecture',
    label: t.value.domains.softwareArchitecture,
  },
  { value: 'machine-learning', label: 'Machine Learning' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-development', label: 'Mobile Development' },
  { value: 'data-science', label: 'Data Science' },
];

// Validation function
const validateForm = (): boolean => {
  errors.value = {};

  if (!form.title.trim()) {
    errors.value.title = t.value.validation.titleRequired;
  }

  if (!form.domain) {
    errors.value.domain = t.value.validation.domainRequired;
  }

  if (!form.description.trim()) {
    errors.value.description = t.value.validation.descriptionRequired;
  }

  if (!form.supervisor) {
    errors.value.supervisor = t.value.validation.supervisorRequired;
  }

  if (!form.startDate) {
    errors.value.startDate = t.value.validation.startDateRequired;
  }

  if (
    form.endDate &&
    form.startDate &&
    new Date(form.endDate) <= new Date(form.startDate)
  ) {
    errors.value.endDate = t.value.validation.endDateAfterStart;
  }

  return Object.keys(errors.value).length === 0;
};

// Add requirement
const addRequirement = () => {
  if (newRequirement.value.trim()) {
    form.requirements.push(newRequirement.value.trim());
    newRequirement.value = '';
  }
};

// Remove requirement
const removeRequirement = (index: number) => {
  form.requirements.splice(index, 1);
};

// Add objective
const addObjective = () => {
  if (newObjective.value.trim()) {
    form.objectives.push(newObjective.value.trim());
    newObjective.value = '';
  }
};

// Remove objective
const removeObjective = (index: number) => {
  form.objectives.splice(index, 1);
};

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  generalError.value = '';

  try {
    emit('submit', { ...form });
  } catch (error: any) {
    generalError.value = error.message || t.value.errors.submitFailed;
  } finally {
    isSubmitting.value = false;
  }
};

// Handle cancel
const handleCancel = () => {
  emit('cancel');
};

// Submit button text
const submitButtonText = computed(() => {
  if (isSubmitting.value) return t.value.form.submitting;
  return props.isEditing ? t.value.form.update : t.value.form.create;
});
</script>

<template>
  <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
    <!-- Form Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <h2 class="text-2xl font-bold text-gray-900">
        {{ isEditing ? t.titleEdit : t.titleCreate }}
      </h2>
      <p class="mt-1 text-sm text-gray-600">
        {{ t.subtitle }}
      </p>
    </div>

    <!-- Form Content -->
    <form class="p-6" @submit.prevent="handleSubmit">
      <div class="space-y-8">
        <!-- Project Type -->
        <Card>
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ t.sections.type }}
          </h3>

          <div>
            <label
              for="type"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t.form.type }}
            </label>
            <select
              id="type"
              v-model="form.type"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="msc">{{ t.projectTypes.msc }}</option>
              <option value="research">{{ t.projectTypes.research }}</option>
            </select>
          </div>
        </Card>

        <!-- Basic Information -->
        <Card>
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ t.sections.basic }}
          </h3>

          <div class="space-y-6">
            <div>
              <label
                for="title"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                {{ t.form.title }}
              </label>
              <input
                id="title"
                v-model="form.title"
                type="text"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.title }"
              />
              <p v-if="errors.title" class="mt-1 text-sm text-red-600">
                {{ errors.title }}
              </p>
            </div>

            <div>
              <label
                for="domain"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                {{ t.form.domain }}
              </label>
              <select
                id="domain"
                v-model="form.domain"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.domain }"
              >
                <option value="">Select a domain</option>
                <option
                  v-for="domain in domains"
                  :key="domain.value"
                  :value="domain.value"
                >
                  {{ domain.label }}
                </option>
              </select>
              <p v-if="errors.domain" class="mt-1 text-sm text-red-600">
                {{ errors.domain }}
              </p>
            </div>

            <div>
              <label
                for="description"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                {{ t.form.description }}
              </label>
              <textarea
                id="description"
                v-model="form.description"
                required
                rows="4"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.description }"
              />
              <p v-if="errors.description" class="mt-1 text-sm text-red-600">
                {{ errors.description }}
              </p>
            </div>
          </div>
        </Card>

        <!-- Supervision -->
        <Card>
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ t.sections.supervision }}
          </h3>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                for="supervisor"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                {{ t.form.supervisor }}
              </label>
              <select
                id="supervisor"
                v-model="form.supervisor"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.supervisor }"
              >
                <option value="">Select a supervisor</option>
                <option
                  v-for="supervisor in supervisors"
                  :key="supervisor.id"
                  :value="supervisor.name"
                >
                  {{ supervisor.name }}
                </option>
              </select>
              <p v-if="errors.supervisor" class="mt-1 text-sm text-red-600">
                {{ errors.supervisor }}
              </p>
            </div>

            <div>
              <label
                for="cosupervisor"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                {{ t.form.cosupervisor }}
              </label>
              <select
                id="cosupervisor"
                v-model="form.cosupervisor"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select a co-supervisor (optional)</option>
                <option
                  v-for="supervisor in supervisors"
                  :key="supervisor.id"
                  :value="supervisor.name"
                >
                  {{ supervisor.name }}
                </option>
              </select>
            </div>
          </div>
        </Card>

        <!-- Requirements -->
        <Card>
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ t.sections.requirements }}
          </h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.requirements }}
            </label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span
                v-for="(req, index) in form.requirements"
                :key="index"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {{ req }}
                <button
                  type="button"
                  class="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-green-400 hover:bg-green-200 hover:text-green-500 focus:outline-none focus:bg-green-500 focus:text-white"
                  @click="removeRequirement(index)"
                >
                  ×
                </button>
              </span>
            </div>
            <div class="flex">
              <input
                v-model="newRequirement"
                class="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :placeholder="t.form.requirementsPlaceholder"
                @keydown.enter.prevent="addRequirement"
              />
              <button
                type="button"
                class="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                @click="addRequirement"
              >
                +
              </button>
            </div>
          </div>
        </Card>

        <!-- Objectives (for MSc projects) -->
        <Card v-if="form.type === 'msc'">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ t.sections.objectives }}
          </h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.objectives }}
            </label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span
                v-for="(obj, index) in form.objectives"
                :key="index"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ obj }}
                <button
                  type="button"
                  class="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
                  @click="removeObjective(index)"
                >
                  ×
                </button>
              </span>
            </div>
            <div class="flex">
              <input
                v-model="newObjective"
                class="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :placeholder="t.form.objectivesPlaceholder"
                @keydown.enter.prevent="addObjective"
              />
              <button
                type="button"
                class="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                @click="addObjective"
              >
                +
              </button>
            </div>
          </div>
        </Card>

        <!-- Timeline -->
        <Card>
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ t.sections.timeline }}
          </h3>

          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                for="startDate"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                {{ t.form.startDate }}
              </label>
              <input
                id="startDate"
                v-model="form.startDate"
                type="date"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.startDate }"
              />
              <p v-if="errors.startDate" class="mt-1 text-sm text-red-600">
                {{ errors.startDate }}
              </p>
            </div>

            <div>
              <label
                for="endDate"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                {{ t.form.endDate }}
              </label>
              <input
                id="endDate"
                v-model="form.endDate"
                type="date"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.endDate }"
              />
              <p v-if="errors.endDate" class="mt-1 text-sm text-red-600">
                {{ errors.endDate }}
              </p>
            </div>
          </div>
        </Card>

        <!-- Error Display -->
        <div
          v-if="generalError"
          class="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <p class="text-red-800">{{ generalError }}</p>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            :disabled="isSubmitting"
            @click="handleCancel"
          >
            {{ t.form.cancel }}
          </Button>

          <Button type="submit" :disabled="isSubmitting">
            {{ submitButtonText }}
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>
