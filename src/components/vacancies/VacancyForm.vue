<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';

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

const { t } = useLanguage();

// Form state
const formData = ref({
  title: '',
  type: '',
  supervisor: '',
  domain: '',
  description: '',
  requirements: '',
  duration: '',
  startDate: '',
  deadline: '',
  salary: '',
  applyUrl: '',
  tags: [] as string[],
});

const errors = ref<Record<string, string>>({});
const isSubmitting = ref(false);
const generalError = ref('');
const newTag = ref('');

// Mock data for supervisors
const mockSupervisors = [
  { id: '1', name: 'Dr. Marie Dubois' },
  { id: '2', name: 'Prof. Jean Martin' },
  { id: '3', name: 'Dr. Sarah Chen' },
  { id: '4', name: 'Alex Rodriguez' },
];

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
    errors.value.title = t.value.forms.vacancy.validation.titleRequired;
  }

  if (!formData.value.type) {
    errors.value.type = t.value.forms.vacancy.validation.typeRequired;
  }

  if (!formData.value.supervisor) {
    errors.value.supervisor =
      t.value.forms.vacancy.validation.supervisorRequired;
  }

  if (!formData.value.domain) {
    errors.value.domain = t.value.forms.vacancy.validation.domainRequired;
  }

  if (!formData.value.description.trim()) {
    errors.value.description =
      t.value.forms.vacancy.validation.descriptionRequired;
  }

  if (!formData.value.duration.trim()) {
    errors.value.duration = t.value.forms.vacancy.validation.durationRequired;
  }

  if (!formData.value.startDate) {
    errors.value.startDate = t.value.forms.vacancy.validation.startDateRequired;
  }

  if (!formData.value.deadline) {
    errors.value.deadline = t.value.forms.vacancy.validation.deadlineRequired;
  } else if (new Date(formData.value.deadline) <= new Date()) {
    errors.value.deadline = t.value.forms.vacancy.validation.deadlineAfterToday;
  }

  if (!formData.value.applyUrl.trim()) {
    errors.value.applyUrl = t.value.forms.vacancy.validation.applyUrlRequired;
  } else if (!/^https?:\/\/.+/.test(formData.value.applyUrl)) {
    errors.value.applyUrl = t.value.forms.vacancy.validation.applyUrlInvalid;
  }

  return Object.keys(errors.value).length === 0;
};

// Tag management
const addTag = () => {
  if (
    newTag.value.trim() &&
    !formData.value.tags.includes(newTag.value.trim())
  ) {
    formData.value.tags.push(newTag.value.trim());
    newTag.value = '';
  }
};

const removeTag = (index: number) => {
  formData.value.tags.splice(index, 1);
};

const handleTagKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTag();
  }
};

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  generalError.value = '';

  try {
    emit('submit', { ...formData.value });
  } catch (error) {
    generalError.value = t.value.forms.vacancy.errors.submitFailed;
  } finally {
    isSubmitting.value = false;
  }
};

const handleCancel = () => {
  emit('cancel');
};

const formTitle = computed(() =>
  props.isEditing
    ? t.value.forms.vacancy.titleEdit
    : t.value.forms.vacancy.titleCreate
);

const submitButtonText = computed(() =>
  props.isEditing
    ? t.value.forms.vacancy.form.update
    : t.value.forms.vacancy.form.create
);
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">{{ formTitle }}</h1>
      <p class="text-lg text-gray-600 mt-2">{{ t.forms.vacancy.subtitle }}</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Basic Information -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.vacancy.sections.basic }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label
              for="title"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t.forms.vacancy.form.title }}
            </label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              :placeholder="t.forms.vacancy.form.titlePlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.title }"
            />
            <p v-if="errors.title" class="text-red-600 text-sm mt-1">
              {{ errors.title }}
            </p>
          </div>

          <div>
            <label
              for="type"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t.forms.vacancy.form.type }}
            </label>
            <select
              id="type"
              v-model="formData.type"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.type }"
            >
              <option value="">{{ t.forms.vacancy.form.selectType }}</option>
              <option value="phd">{{ t.forms.vacancy.types.phd }}</option>
              <option value="postdoc">
                {{ t.forms.vacancy.types.postdoc }}
              </option>
              <option value="researcher">
                {{ t.forms.vacancy.types.researcher }}
              </option>
              <option value="engineer">
                {{ t.forms.vacancy.types.engineer }}
              </option>
              <option value="intern">{{ t.forms.vacancy.types.intern }}</option>
            </select>
            <p v-if="errors.type" class="text-red-600 text-sm mt-1">
              {{ errors.type }}
            </p>
          </div>

          <div>
            <label
              for="supervisor"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t.forms.vacancy.form.supervisor }}
            </label>
            <select
              id="supervisor"
              v-model="formData.supervisor"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.supervisor }"
            >
              <option value="">
                {{ t.forms.vacancy.form.selectSupervisor }}
              </option>
              <option
                v-for="supervisor in mockSupervisors"
                :key="supervisor.id"
                :value="supervisor.id"
              >
                {{ supervisor.name }}
              </option>
            </select>
            <p v-if="errors.supervisor" class="text-red-600 text-sm mt-1">
              {{ errors.supervisor }}
            </p>
          </div>

          <div class="md:col-span-2">
            <label
              for="domain"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t.forms.vacancy.form.domain }}
            </label>
            <select
              id="domain"
              v-model="formData.domain"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.domain }"
            >
              <option value="">{{ t.forms.vacancy.form.selectDomain }}</option>
              <option value="software-architecture">
                {{ t.forms.vacancy.domains.softwareArchitecture }}
              </option>
              <option value="artificial-intelligence">
                {{ t.forms.vacancy.domains.artificialIntelligence }}
              </option>
              <option value="cybersecurity">
                {{ t.forms.vacancy.domains.cybersecurity }}
              </option>
              <option value="devops">
                {{ t.forms.vacancy.domains.devops }}
              </option>
              <option value="cloud-computing">
                {{ t.forms.vacancy.domains.cloudComputing }}
              </option>
              <option value="software-testing">
                {{ t.forms.vacancy.domains.softwareTesting }}
              </option>
              <option value="distributed-systems">
                {{ t.forms.vacancy.domains.distributedSystems }}
              </option>
              <option value="blockchain">
                {{ t.forms.vacancy.domains.blockchain }}
              </option>
            </select>
            <p v-if="errors.domain" class="text-red-600 text-sm mt-1">
              {{ errors.domain }}
            </p>
          </div>

          <div class="md:col-span-2">
            <label
              for="description"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t.forms.vacancy.form.description }}
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="4"
              :placeholder="t.forms.vacancy.form.descriptionPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.description }"
            />
            <p v-if="errors.description" class="text-red-600 text-sm mt-1">
              {{ errors.description }}
            </p>
          </div>
        </div>
      </Card>

      <!-- Requirements -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.vacancy.sections.requirements }}
        </h2>

        <div>
          <label
            for="requirements"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            {{ t.forms.vacancy.form.requirements }}
          </label>
          <textarea
            id="requirements"
            v-model="formData.requirements"
            rows="4"
            :placeholder="t.forms.vacancy.form.requirementsPlaceholder"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </Card>

      <!-- Timeline -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.vacancy.sections.timeline }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label
              for="duration"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t.forms.vacancy.form.duration }}
            </label>
            <input
              id="duration"
              v-model="formData.duration"
              type="text"
              :placeholder="t.forms.vacancy.form.durationPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.duration }"
            />
            <p v-if="errors.duration" class="text-red-600 text-sm mt-1">
              {{ errors.duration }}
            </p>
          </div>

          <div>
            <label
              for="startDate"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t.forms.vacancy.form.startDate }}
            </label>
            <input
              id="startDate"
              v-model="formData.startDate"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.startDate }"
            />
            <p v-if="errors.startDate" class="text-red-600 text-sm mt-1">
              {{ errors.startDate }}
            </p>
          </div>

          <div>
            <label
              for="deadline"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t.forms.vacancy.form.deadline }}
            </label>
            <input
              id="deadline"
              v-model="formData.deadline"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.deadline }"
            />
            <p v-if="errors.deadline" class="text-red-600 text-sm mt-1">
              {{ errors.deadline }}
            </p>
          </div>
        </div>
      </Card>

      <!-- Compensation -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.vacancy.sections.compensation }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              for="salary"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t.forms.vacancy.form.salary }}
            </label>
            <input
              id="salary"
              v-model="formData.salary"
              type="text"
              :placeholder="t.forms.vacancy.form.salaryPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              for="applyUrl"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              {{ t.forms.vacancy.form.applyUrl }}
            </label>
            <input
              id="applyUrl"
              v-model="formData.applyUrl"
              type="url"
              :placeholder="t.forms.vacancy.form.applyUrlPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.applyUrl }"
            />
            <p v-if="errors.applyUrl" class="text-red-600 text-sm mt-1">
              {{ errors.applyUrl }}
            </p>
          </div>
        </div>

        <!-- Tags -->
        <div class="mt-6">
          <label
            for="newTag"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            {{ t.forms.vacancy.form.tags }}
          </label>
          <div class="flex flex-wrap gap-2 mb-3">
            <span
              v-for="(tag, index) in formData.tags"
              :key="index"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {{ tag }}
              <button
                type="button"
                @click="removeTag(index)"
                class="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          </div>
          <div class="flex gap-2">
            <input
              id="newTag"
              v-model="newTag"
              type="text"
              :placeholder="t.forms.vacancy.form.tagsPlaceholder"
              @keydown="handleTagKeydown"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button
              type="button"
              variant="secondary"
              @click="addTag"
              :disabled="!newTag.trim()"
            >
              Add
            </Button>
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
          @click="handleCancel"
          :disabled="isSubmitting"
        >
          {{ t.forms.vacancy.form.cancel }}
        </Button>

        <Button type="submit" :disabled="isSubmitting">
          {{
            isSubmitting ? t.forms.vacancy.form.submitting : submitButtonText
          }}
        </Button>
      </div>
    </form>
  </div>
</template>
