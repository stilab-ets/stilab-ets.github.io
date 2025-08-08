// dashboard/admin/AdminInvitations.vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useInvitations } from '@/hooks/admin/useInvitations';
import { useLanguage } from '@/composables/useLanguage';
import { UserPlus, Search, Trash2, X, Mail } from 'lucide-vue-next';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';

const { t } = useLanguage();
const {
  invitations,
  pendingInvitations,
  expiredInvitations,
  registeredInvitations,
  isLoading,
  error,
  sendInvitation,
  deleteInvitation,
  cancelInvitation,
} = useInvitations();

const showInviteForm = ref(false);
const newInvitation = ref({ email: '', role: 'student' });
const searchQuery = ref('');
const selectedStatus = ref('all');

const roleOptions = computed(() => [
  {
    value: 'student',
    label: t.value.dashboard.admin.invitations.roles.student,
  },
  {
    value: 'professor',
    label: t.value.dashboard.admin.invitations.roles.professor,
  },
  {
    value: 'researcher',
    label: t.value.dashboard.admin.invitations.roles.researcher,
  },
  { value: 'admin', label: t.value.dashboard.admin.invitations.roles.admin },
]);

const statusOptions = computed(() => [
  { value: 'all', label: t.value.dashboard.admin.invitations.status.all },
  {
    value: 'pending',
    label: t.value.dashboard.admin.invitations.status.pending,
  },
  {
    value: 'expired',
    label: t.value.dashboard.admin.invitations.status.expired,
  },
  {
    value: 'registered',
    label: t.value.dashboard.admin.invitations.status.registered,
  },
  {
    value: 'canceled',
    label: t.value.dashboard.admin.invitations.status.canceled,
  },
]);

const filteredInvitations = computed(() => {
  let filtered = invitations.value;

  if (searchQuery.value) {
    filtered = filtered.filter((inv) =>
      inv.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter((inv) => inv.status === selectedStatus.value);
  }

  return filtered.sort(
    (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
  );
});

const handleSendInvitation = async () => {
  if (!newInvitation.value.email) return;

  const success = await sendInvitation(newInvitation.value);
  if (success) {
    showInviteForm.value = false;
    newInvitation.value = { email: '', role: 'student' };
  }
};

const handleDeleteInvitation = async (id: string) => {
  if (confirm(t.value.dashboard.admin.invitations.confirmDelete)) {
    await deleteInvitation(id);
  }
};

const handleCancelInvitation = async (id: string) => {
  if (confirm(t.value.dashboard.admin.invitations.confirmCancel)) {
    await cancelInvitation(id);
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'expired':
      return 'bg-red-100 text-red-800';
    case 'registered':
      return 'bg-green-100 text-green-800';
    case 'canceled':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin':
      return 'bg-red-100 text-red-800';
    case 'professor':
      return 'bg-blue-100 text-blue-800';
    case 'researcher':
      return 'bg-purple-100 text-purple-800';
    case 'student':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">
          {{ t.dashboard.admin.invitations.title }}
        </h2>
        <p class="text-sm text-gray-600">
          {{ t.dashboard.admin.invitations.description }}
        </p>
      </div>
      <Button @click="showInviteForm = true">
        <UserPlus class="h-4 w-4 mr-2" />
        {{ t.dashboard.admin.invitations.sendInvitation }}
      </Button>
    </div>

    <!-- Error Display -->
    <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-4">
      <div class="flex">
        <X class="h-5 w-5 text-red-400" />
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">{{ t.common.error }}</h3>
          <p class="text-sm text-red-700 mt-1">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card class="p-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">
            {{ invitations.length }}
          </div>
          <div class="text-sm text-gray-500">
            {{ t.dashboard.admin.invitations.stats.total }}
          </div>
        </div>
      </Card>
      <Card class="p-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-yellow-600">
            {{ pendingInvitations.length }}
          </div>
          <div class="text-sm text-gray-500">
            {{ t.dashboard.admin.invitations.stats.pending }}
          </div>
        </div>
      </Card>
      <Card class="p-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">
            {{ registeredInvitations.length }}
          </div>
          <div class="text-sm text-gray-500">
            {{ t.dashboard.admin.invitations.stats.registered }}
          </div>
        </div>
      </Card>
      <Card class="p-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-red-600">
            {{ expiredInvitations.length }}
          </div>
          <div class="text-sm text-gray-500">
            {{ t.dashboard.admin.invitations.stats.expired }}
          </div>
        </div>
      </Card>
    </div>

    <!-- Filters -->
    <Card class="p-4">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <Search
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
            />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t.dashboard.admin.invitations.searchPlaceholder"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div class="sm:w-48">
          <select
            v-model="selectedStatus"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option
              v-for="option in statusOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </Card>

    <!-- Invitations Table -->
    <Card>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t.dashboard.admin.invitations.table.email }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t.dashboard.admin.invitations.table.role }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t.dashboard.admin.invitations.table.status }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t.dashboard.admin.invitations.table.sentDate }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t.dashboard.admin.invitations.table.expires }}
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ t.dashboard.admin.invitations.table.actions }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="invitation in filteredInvitations"
              :key="invitation.id"
              class="hover:bg-gray-50"
            >
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {{ invitation.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getRoleColor(invitation.role),
                  ]"
                >
                  {{
                    t.dashboard.admin.invitations.roles[
                      invitation.role as keyof typeof t.dashboard.admin.invitations.roles
                    ]
                  }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusColor(invitation.status),
                  ]"
                >
                  {{ t.dashboard.admin.invitations.status[invitation.status] }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ new Date(invitation.sentAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ new Date(invitation.expiresAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <Button
                    v-if="invitation.status === 'pending'"
                    variant="outline"
                    size="sm"
                    @click="handleCancelInvitation(invitation.id)"
                  >
                    <X class="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    @click="handleDeleteInvitation(invitation.id)"
                  >
                    <Trash2 class="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>

    <!-- Send Invitation Modal -->
    <div
      v-if="showInviteForm"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
    >
      <Card class="p-6 max-w-md w-full mx-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ t.dashboard.admin.invitations.sendInvitationModal.title }}
          </h3>
          <button
            class="text-gray-400 hover:text-gray-600"
            @click="showInviteForm = false"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700"
              >{{
                t.dashboard.admin.invitations.sendInvitationModal.email
              }}</label
            >
            <input
              id="email"
              v-model="newInvitation.email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              :placeholder="
                t.dashboard.admin.invitations.sendInvitationModal
                  .emailPlaceholder
              "
            />
          </div>

          <div>
            <label for="role" class="block text-sm font-medium text-gray-700">{{
              t.dashboard.admin.invitations.sendInvitationModal.role
            }}</label>
            <select
              id="role"
              v-model="newInvitation.role"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option
                v-for="option in roleOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>

        <div class="mt-6 flex justify-end space-x-3">
          <Button variant="outline" @click="showInviteForm = false">
            {{ t.common.cancel }}
          </Button>
          <Button
            :disabled="!newInvitation.email || isLoading"
            @click="handleSendInvitation"
          >
            <Mail class="h-4 w-4 mr-2" />
            {{
              isLoading
                ? t.dashboard.admin.invitations.sending
                : t.dashboard.admin.invitations.sendInvitation
            }}
          </Button>
        </div>
      </Card>
    </div>
  </div>
</template>
