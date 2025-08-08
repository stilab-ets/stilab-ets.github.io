<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import { invitationsTranslations } from '@/data/translations/invitations.translate';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';

interface Invitation {
  id: number;
  email: string;
  role: string;
  status: 'pending' | 'registered' | 'expired' | 'canceled';
  sentAt: string;
  expiresAt: string;
}

const props = defineProps<{
  invitations: Invitation[];
  isLoading: boolean;
}>();

const emit = defineEmits<{
  resend: [email: string];
  cancel: [id: number];
  delete: [id: number];
}>();

const { currentLanguage } = useLanguage();
const t = computed(
  () => invitationsTranslations[currentLanguage.value].history
);

const statuses = [
  'all',
  'pending',
  'registered',
  'expired',
  'canceled',
] as const;
type Status = (typeof statuses)[number];

// Filter state
const filterStatus = ref<Status>('all');

// Filtered invitations
const filteredInvitations = computed(() => {
  if (filterStatus.value === 'all') {
    return props.invitations;
  }
  return props.invitations.filter(
    (invitation) => invitation.status === filterStatus.value
  );
});

// Get status color classes
const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'registered':
      return 'bg-green-100 text-green-800';
    case 'expired':
      return 'bg-red-100 text-red-800';
    case 'canceled':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(
    currentLanguage.value === 'fr' ? 'fr-FR' : 'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  ).format(date);
};

// Check if invitation is expired
const isInvitationExpired = (expiresAt: string) => {
  return new Date(expiresAt) < new Date();
};

// Action handlers
const handleResend = (email: string) => {
  emit('resend', email);
};

const handleCancel = (id: number) => {
  if (confirm(t.value.confirmations.cancelConfirm)) {
    emit('cancel', id);
  }
};

const handleDelete = (id: number) => {
  if (confirm(t.value.confirmations.deleteConfirm)) {
    emit('delete', id);
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- Filters -->
    <Card class="p-4">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="status in statuses"
          :key="status"
          :class="[
            'px-3 py-1 text-sm font-medium rounded-md transition-colors',
            filterStatus === status
              ? 'bg-blue-100 text-blue-700 border border-blue-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          ]"
          @click="filterStatus = status"
        >
          {{ t.filters[status] }}
        </button>
      </div>
    </Card>

    <!-- Loading state -->
    <div v-if="isLoading" class="space-y-3">
      <div v-for="i in 5" :key="i" class="animate-pulse">
        <Card class="p-4">
          <div class="h-16 bg-gray-200 rounded"></div>
        </Card>
      </div>
    </div>

    <!-- Empty state -->
    <Card v-else-if="filteredInvitations.length === 0" class="p-8 text-center">
      <div
        class="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4"
      >
        <svg
          class="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m0 0v5h12v-5m-12 0L8 9m8 4l4-4"
          />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        {{ t.empty.title }}
      </h3>
      <p class="text-gray-600">{{ t.empty.description }}</p>
    </Card>

    <!-- Invitations table/list -->
    <Card v-else class="overflow-hidden">
      <!-- Desktop table view -->
      <div class="hidden md:block">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t.table.email }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t.table.role }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t.table.status }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t.table.sentAt }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t.table.expiresAt }}
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t.table.actions }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="invitation in filteredInvitations" :key="invitation.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ invitation.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ invitation.role }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusColor(invitation.status),
                  ]"
                >
                  {{
                    invitationsTranslations[currentLanguage].status[
                      invitation.status
                    ]
                  }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {{ formatDate(invitation.sentAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                <span
                  :class="{
                    'text-red-600': isInvitationExpired(invitation.expiresAt),
                  }"
                >
                  {{ formatDate(invitation.expiresAt) }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"
              >
                <Button
                  v-if="invitation.status === 'pending'"
                  variant="secondary"
                  size="sm"
                  @click="handleCancel(invitation.id)"
                >
                  {{ t.actions.cancel }}
                </Button>
                <Button
                  v-if="invitation.status === 'expired'"
                  variant="primary"
                  size="sm"
                  @click="handleResend(invitation.email)"
                >
                  {{ t.actions.resend }}
                </Button>
                <Button
                  v-if="['expired', 'canceled'].includes(invitation.status)"
                  variant="secondary"
                  size="sm"
                  @click="handleDelete(invitation.id)"
                >
                  {{ t.actions.delete }}
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile card view -->
      <div class="md:hidden space-y-4 p-4">
        <div
          v-for="invitation in filteredInvitations"
          :key="invitation.id"
          class="bg-gray-50 rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-2">
            <div class="font-medium text-gray-900">{{ invitation.email }}</div>
            <span
              :class="[
                'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                getStatusColor(invitation.status),
              ]"
            >
              {{
                invitationsTranslations[currentLanguage].status[
                  invitation.status
                ]
              }}
            </span>
          </div>
          <div class="text-sm text-gray-600 space-y-1">
            <div>Role: {{ invitation.role }}</div>
            <div>Sent: {{ formatDate(invitation.sentAt) }}</div>
            <div
              :class="{
                'text-red-600': isInvitationExpired(invitation.expiresAt),
              }"
            >
              Expires: {{ formatDate(invitation.expiresAt) }}
            </div>
          </div>
          <div class="flex space-x-2 mt-3">
            <Button
              v-if="invitation.status === 'pending'"
              variant="secondary"
              size="sm"
              @click="handleCancel(invitation.id)"
            >
              {{ t.actions.cancel }}
            </Button>
            <Button
              v-if="invitation.status === 'expired'"
              variant="primary"
              size="sm"
              @click="handleResend(invitation.email)"
            >
              {{ t.actions.resend }}
            </Button>
            <Button
              v-if="['expired', 'canceled'].includes(invitation.status)"
              variant="secondary"
              size="sm"
              @click="handleDelete(invitation.id)"
            >
              {{ t.actions.delete }}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
