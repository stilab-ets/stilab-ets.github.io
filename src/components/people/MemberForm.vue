<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import { useMembers } from '@/hooks/members/useMembers';
import { useNavigation } from '@/hooks/layout/useNavigation';
import Form from '@/components/ui/Form.vue';
import Button from '@/components/ui/Button.vue';

const { t } = useLanguage();
const { createMember, loading: isLoading, error } = useMembers();
const { navigateToPage } = useNavigation();

const formData = ref({
  first_name: '',
  last_name: '',
  role: '',
  email: '',
  phone: '',
  biography: '',
  research_domain: '',
  image_url: '',
  github_url: '',
  linkedin_url: '',
  stackoverflow_url: '',
  twitter_x_url: '',
  google_scholar_url: '',
  dblp_url: '',
  personal_website: '',
  status: '',
});

const roles = ['PHD', 'MSC', 'PRO'];
const statuses = ['CRT', 'GRD'];

const isSubmitting = ref(false);
const errors = ref<Record<string, string>>({});
const successMessage = ref('');

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePhone = (phone: string) => /^\+?[0-9\s\-()]{7,20}$/.test(phone);

const validateForm = () => {
  errors.value = {};

  if (!formData.value.first_name.trim()) {
    errors.value.first_name = 'First name is required.';
  }

  if (!formData.value.last_name.trim()) {
    errors.value.last_name = 'Last name is required.';
  }

  if (formData.value.email && !validateEmail(formData.value.email)) {
    errors.value.email = 'Invalid email format.';
  }

  if (formData.value.phone && !validatePhone(formData.value.phone)) {
    errors.value.phone = 'Invalid phone number.';
  }

  return Object.keys(errors.value).length === 0;
};

const submitForm = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  successMessage.value = '';

  try {
    const success = await createMember({ ...formData.value });

    if (success) {
      successMessage.value = 'Member created successfully! Redirecting...';
      formData.value = {
        first_name: '',
        last_name: '',
        role: '',
        email: '',
        phone: '',
        biography: '',
        research_domain: '',
        image_url: '',
        github_url: '',
        linkedin_url: '',
        stackoverflow_url: '',
        twitter_x_url: '',
        google_scholar_url: '',
        dblp_url: '',
        personal_website: '',
        status: '',
      };

      setTimeout(() => navigateToPage('dashboard'), 2000);
    } else {
      errors.value.general = error.value || 'Submission failed.';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } catch (err) {
    console.error('Error creating member:', err);
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
    :title="t.forms.member.titleCreate"
    :subtitle="t.forms.member.subtitle"
    :success-message="successMessage"
    :error="formError"
  >
    <form class="space-y-8" @submit.prevent="submitForm">
      <!-- Name Fields -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >First Name *</label
          >
          <input
            v-model="formData.first_name"
            type="text"
            class="w-full p-3 border rounded-lg"
            :class="{ 'border-red-500': errors.first_name }"
          />
          <p v-if="errors.first_name" class="text-sm text-red-600">
            {{ errors.first_name }}
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Last Name *</label
          >
          <input
            v-model="formData.last_name"
            type="text"
            class="w-full p-3 border rounded-lg"
            :class="{ 'border-red-500': errors.last_name }"
          />
          <p v-if="errors.last_name" class="text-sm text-red-600">
            {{ errors.last_name }}
          </p>
        </div>
      </div>

      <!-- Role & Status -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Role</label
          >
          <select v-model="formData.role" class="w-full p-3 border rounded-lg">
            <option value="">Select role</option>
            <option v-for="role in roles" :key="role" :value="role">
              {{ role }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Status</label
          >
          <select
            v-model="formData.status"
            class="w-full p-3 border rounded-lg"
          >
            <option value="">Select status</option>
            <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
      </div>

      <!-- Contact -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <input
            v-model="formData.email"
            type="email"
            class="w-full p-3 border rounded-lg"
            :class="{ 'border-red-500': errors.email }"
          />
          <p v-if="errors.email" class="text-sm text-red-600">
            {{ errors.email }}
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Phone</label
          >
          <input
            v-model="formData.phone"
            type="tel"
            class="w-full p-3 border rounded-lg"
            :class="{ 'border-red-500': errors.phone }"
          />
          <p v-if="errors.phone" class="text-sm text-red-600">
            {{ errors.phone }}
          </p>
        </div>
      </div>

      <!-- Research + Bio -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Research Domain</label
        >
        <input
          v-model="formData.research_domain"
          type="text"
          class="w-full p-3 border rounded-lg"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Biography</label
        >
        <textarea
          v-model="formData.biography"
          rows="4"
          class="w-full p-3 border rounded-lg"
        ></textarea>
      </div>

      <!-- Links -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Image URL</label
          >
          <input
            v-model="formData.image_url"
            type="url"
            class="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >GitHub</label
          >
          <input
            v-model="formData.github_url"
            type="url"
            class="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >LinkedIn</label
          >
          <input
            v-model="formData.linkedin_url"
            type="url"
            class="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Stack Overflow</label
          >
          <input
            v-model="formData.stackoverflow_url"
            type="url"
            class="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Twitter/X</label
          >
          <input
            v-model="formData.twitter_x_url"
            type="url"
            class="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Google Scholar</label
          >
          <input
            v-model="formData.google_scholar_url"
            type="url"
            class="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >DBLP</label
          >
          <input
            v-model="formData.dblp_url"
            type="url"
            class="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Personal Website</label
          >
          <input
            v-model="formData.personal_website"
            type="url"
            class="w-full p-3 border rounded-lg"
          />
        </div>
      </div>

      <!-- Buttons -->
      <div class="flex flex-col md:flex-row justify-between gap-4 pt-6">
        <Button
          type="submit"
          :disabled="isSubmitting || isLoading"
          class="w-full md:w-auto"
        >
          <span v-if="isSubmitting || isLoading">Submitting...</span>
          <span v-else>Create Member</span>
        </Button>

        <Button
          type="button"
          variant="secondary"
          class="w-full md:w-auto"
          @click="navigateToPage('members')"
        >
          Cancel
        </Button>
      </div>
    </form>
  </Form>
</template>
