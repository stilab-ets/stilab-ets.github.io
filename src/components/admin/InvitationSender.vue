<script setup lang="ts">
import { ref, computed } from 'vue';
import { useInvitationManagement } from '@/hooks/invitations/useInvitationManagement';
import { useLanguage } from '@/composables/useLanguage';
import { invitationsTranslations } from '@/data/translations/invitations.translate';
import SingleInvitationForm from './invitation/SingleInvitationForm.vue';
import BulkInvitationForm from './invitation/BulkInvitationForm.vue';

// Define emits
const emit = defineEmits<{
  'invitation-sent': [];
}>();

const { currentLanguage } = useLanguage();
const t = computed(() => invitationsTranslations[currentLanguage.value].sender);

const { sendInvitation, isLoading, error } = useInvitationManagement();

// Active form type
const activeForm = ref<'single' | 'bulk'>('single');

// Handle single invitation
const handleSingleInvitation = async (data: {
  email: string;
  role: string;
}) => {
  const success = await sendInvitation(data.email);

  if (success) {
    emit('invitation-sent');
  }
};

// Handle bulk invitations
const handleBulkInvitations = async (data: {
  emails: string[];
  role: string;
}) => {
  // Process each email individually
  const results = {
    success: [] as string[],
    errors: [] as string[],
  };

  for (const email of data.emails) {
    const success = await sendInvitation(email);

    if (success) {
      results.success.push(email);
    } else {
      results.errors.push(`${email}: ${error.value || 'Failed to send'}`);
    }
  }

  // Emit success if at least one invitation was sent
  if (results.success.length > 0) {
    emit('invitation-sent');
  }
};

// Toggle between single and bulk forms
const setActiveForm = (form: 'single' | 'bulk') => {
  activeForm.value = form;
};
</script>

<template>
  <div class="space-y-6">
    <!-- Form Type Toggle -->
    <div class="flex items-center justify-center">
      <div class="flex bg-gray-100 rounded-lg p-1">
        <button
          @click="setActiveForm('single')"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            activeForm === 'single'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          Single Invitation
        </button>
        <button
          @click="setActiveForm('bulk')"
          :class="[
            'px-4 py-2 text-sm font-medium rounded-md transition-colors',
            activeForm === 'bulk'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700',
          ]"
        >
          Bulk Invitations
        </button>
      </div>
    </div>

    <!-- Single Invitation Form -->
    <SingleInvitationForm
      v-if="activeForm === 'single'"
      :is-loading="isLoading"
      :error="error"
      @send-invitation="handleSingleInvitation"
    />

    <!-- Bulk Invitation Form -->
    <BulkInvitationForm
      v-if="activeForm === 'bulk'"
      :is-loading="isLoading"
      :error="error"
      @send-bulk-invitations="handleBulkInvitations"
    />
  </div>
</template>
