<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage';
import type { Project } from '@/services/MainAPI';
import Button from '@/ui/Button.vue';

interface FormData {
  name: string;
  email: string;
  level: string;
  motivation: string;
}

interface Props {
  isOpen: boolean;
  project: Project | null;
  formData: FormData;
  submitting: boolean;
  submitError: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
  submit: [];
  'update:formData': [data: FormData];
}>();

const { t } = useLanguage();

const updateFormField = (field: keyof FormData, value: string) => {
  emit('update:formData', {
    ...props.formData,
    [field]: value,
  });
};

const closeModal = () => {
  emit('close');
};

const submitInterest = () => {
  emit('submit');
};
</script>

<template>
  <div
    v-if="isOpen && project"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    @click="closeModal"
  >
    <div
      class="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white"
      @click.stop
    >
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b">
        <h2 class="text-xl font-bold text-gray-900">
          {{ t.projects.interestModal.title }}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          class="hover:cursor-pointer"
          @click="closeModal"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </div>

      <!-- Modal Content -->
      <div class="mt-4">
        <p class="text-sm text-gray-600 mb-4">
          {{ t.projects.interestModal.projectLabel }}:
          <strong>{{ project.title }}</strong>
        </p>

        <!-- Error Message -->
        <div
          v-if="submitError"
          class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md"
        >
          <p class="text-sm text-red-600">{{ submitError }}</p>
        </div>

        <form class="space-y-4" @submit.prevent="submitInterest">
          <div>
            <label
              for="student-name"
              class="block text-sm font-medium text-gray-700"
            >
              {{ t.projects.interestModal.fullName }} *
            </label>
            <input
              id="student-name"
              :value="formData.name"
              type="text"
              required
              :disabled="submitting"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4] disabled:bg-gray-50 disabled:text-gray-500"
              :placeholder="t.projects.interestModal.fullNamePlaceholder"
              @input="
                updateFormField(
                  'name',
                  ($event.target as HTMLInputElement).value
                )
              "
            />
          </div>

          <div>
            <label
              for="student-email"
              class="block text-sm font-medium text-gray-700"
            >
              {{ t.projects.interestModal.email }} *
            </label>
            <input
              id="student-email"
              :value="formData.email"
              type="email"
              required
              :disabled="submitting"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4] disabled:bg-gray-50 disabled:text-gray-500"
              :placeholder="t.projects.interestModal.emailPlaceholder"
              @input="
                updateFormField(
                  'email',
                  ($event.target as HTMLInputElement).value
                )
              "
            />
          </div>

          <div>
            <label
              for="student-level"
              class="block text-sm font-medium text-gray-700"
            >
              {{ t.projects.interestModal.studyLevel }} *
            </label>
            <select
              id="student-level"
              :value="formData.level"
              required
              :disabled="submitting"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4] disabled:bg-gray-50 disabled:text-gray-500"
              @change="
                updateFormField(
                  'level',
                  ($event.target as HTMLSelectElement).value
                )
              "
            >
              <option value="">
                {{ t.projects.interestModal.selectLevel }}
              </option>
              <option value="M1">{{ t.projects.interestModal.master1 }}</option>
              <option value="M2">{{ t.projects.interestModal.master2 }}</option>
            </select>
          </div>

          <div>
            <label
              for="motivation"
              class="block text-sm font-medium text-gray-700"
            >
              {{ t.projects.interestModal.motivation }} *
            </label>
            <textarea
              id="motivation"
              :value="formData.motivation"
              rows="4"
              required
              :disabled="submitting"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4] disabled:bg-gray-50 disabled:text-gray-500"
              :placeholder="t.projects.interestModal.motivationPlaceholder"
              @input="
                updateFormField(
                  'motivation',
                  ($event.target as HTMLTextAreaElement).value
                )
              "
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              :disabled="submitting"
              class="hover:cursor-pointer"
              @click="closeModal"
            >
              {{ t.projects.interestModal.cancel }}
            </Button>
            <Button
              type="submit"
              :disabled="submitting"
              class="hover:cursor-pointer flex items-center"
            >
              <div
                v-if="submitting"
                class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
              ></div>
              {{ submitting ? 'Envoi...' : t.projects.interestModal.submit }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
