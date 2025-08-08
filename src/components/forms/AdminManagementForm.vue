<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLanguage } from '@/composables/useLanguage';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';

const emit = defineEmits<{
  submit: [data: Record<string, any>];
  deleteUser: [userId: string];
  approveContent: [contentId: string, type: string];
  rejectContent: [contentId: string, type: string];
}>();

const { t } = useLanguage();

// Form state
const systemSettings = ref({
  labName: 'STIL - Software Technology and Intelligence Lab',
  labDescription:
    'Research laboratory dedicated to innovation in software engineering, artificial intelligence and cutting-edge technologies.',
  contactEmail: 'contact@stil-lab.fr',
  contactPhone: '+33 1 23 45 67 89',
  address:
    'Université de Recherche, Bâtiment Informatique, 123 Rue de la Science, 75000 Paris',
  maintenanceMode: false,
  enableRegistration: true,
  requireApproval: true,
});

const errors = ref<Record<string, string>>({});
const isSubmitting = ref(false);
const generalError = ref('');
const successMessage = ref('');
const activeSection = ref('users');
const searchQuery = ref('');
const selectedRole = ref('');
const selectedStatus = ref('');
const showDeleteModal = ref(false);
const userToDelete = ref<any>(null);

// Mock data
const mockUsers = ref([
  {
    id: '1',
    name: 'Dr. Marie Dubois',
    email: 'marie.dubois@stil-lab.fr',
    role: 'professor',
    status: 'active',
    joinDate: '2020-01-15',
  },
  {
    id: '2',
    name: 'Prof. Jean Martin',
    email: 'jean.martin@stil-lab.fr',
    role: 'professor',
    status: 'active',
    joinDate: '2019-09-01',
  },
  {
    id: '3',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@stil-lab.fr',
    role: 'phd',
    status: 'active',
    joinDate: '2022-10-01',
  },
]);

const mockPendingPublications = ref([
  {
    id: 'pub1',
    title: 'Advanced Machine Learning Techniques for Software Testing',
    author: 'Dr. Marie Dubois',
    submittedDate: '2024-01-15',
  },
  {
    id: 'pub2',
    title: 'Blockchain Security in Distributed Systems',
    author: 'Prof. Jean Martin',
    submittedDate: '2024-01-10',
  },
]);

const mockPendingEvents = ref([
  {
    id: 'event1',
    title: 'Workshop on AI Ethics',
    organizer: 'Dr. Sarah Chen',
    proposedDate: '2024-02-20',
  },
]);

// Computed properties
const filteredUsers = computed(() => {
  return mockUsers.value.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesRole = !selectedRole.value || user.role === selectedRole.value;
    const matchesStatus =
      !selectedStatus.value || user.status === selectedStatus.value;

    return matchesSearch && matchesRole && matchesStatus;
  });
});

// Validation
const validateSystemSettings = () => {
  errors.value = {};

  if (!systemSettings.value.labName.trim()) {
    errors.value.labName =
      t.value.forms.adminManagement.validation.labNameRequired;
  }

  if (
    systemSettings.value.contactEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(systemSettings.value.contactEmail)
  ) {
    errors.value.contactEmail =
      t.value.forms.adminManagement.validation.contactEmailInvalid;
  }

  return Object.keys(errors.value).length === 0;
};

// Form submission
const handleSubmit = async () => {
  if (activeSection.value === 'system' && !validateSystemSettings()) return;

  isSubmitting.value = true;
  generalError.value = '';
  successMessage.value = '';

  try {
    emit('submit', {
      section: activeSection.value,
      data: activeSection.value === 'system' ? systemSettings.value : {},
    });
    successMessage.value =
      t.value.forms.adminManagement.success.settingsUpdated;
  } catch (error) {
    generalError.value = t.value.forms.adminManagement.errors.updateFailed;
  } finally {
    isSubmitting.value = false;
  }
};

// User management
const confirmDeleteUser = (user: any) => {
  userToDelete.value = user;
  showDeleteModal.value = true;
};

const deleteUser = async () => {
  if (!userToDelete.value) return;

  try {
    emit('deleteUser', userToDelete.value.id);
    mockUsers.value = mockUsers.value.filter(
      (u) => u.id !== userToDelete.value.id
    );
    successMessage.value = t.value.forms.adminManagement.success.userDeleted;
  } catch (error) {
    generalError.value = t.value.forms.adminManagement.errors.deleteFailed;
  } finally {
    showDeleteModal.value = false;
    userToDelete.value = null;
  }
};

// Content management
const approveContent = (contentId: string, type: string) => {
  emit('approveContent', contentId, type);
  if (type === 'publication') {
    mockPendingPublications.value = mockPendingPublications.value.filter(
      (p) => p.id !== contentId
    );
  } else if (type === 'event') {
    mockPendingEvents.value = mockPendingEvents.value.filter(
      (e) => e.id !== contentId
    );
  }
  successMessage.value = t.value.forms.adminManagement.success.contentApproved;
};

const rejectContent = (contentId: string, type: string) => {
  emit('rejectContent', contentId, type);
  if (type === 'publication') {
    mockPendingPublications.value = mockPendingPublications.value.filter(
      (p) => p.id !== contentId
    );
  } else if (type === 'event') {
    mockPendingEvents.value = mockPendingEvents.value.filter(
      (e) => e.id !== contentId
    );
  }
};
</script>

<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">
        {{ t.forms.adminManagement.title }}
      </h1>
      <p class="text-lg text-gray-600 mt-2">
        {{ t.forms.adminManagement.subtitle }}
      </p>
    </div>

    <!-- Section Navigation -->
    <div class="mb-8">
      <nav class="flex space-x-8">
        <button
          type="button"
          @click="activeSection = 'users'"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeSection === 'users'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          ]"
        >
          {{ t.forms.adminManagement.sections.users }}
        </button>
        <button
          type="button"
          @click="activeSection = 'system'"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeSection === 'system'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          ]"
        >
          {{ t.forms.adminManagement.sections.system }}
        </button>
        <button
          type="button"
          @click="activeSection = 'content'"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeSection === 'content'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          ]"
        >
          {{ t.forms.adminManagement.sections.content }}
        </button>
      </nav>
    </div>

    <!-- User Management Section -->
    <div v-if="activeSection === 'users'" class="space-y-6">
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.adminManagement.sections.users }}
        </h2>

        <!-- User Filters -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="
                t.forms.adminManagement.userManagement.searchPlaceholder
              "
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              v-model="selectedRole"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">
                {{ t.forms.adminManagement.userManagement.allRoles }}
              </option>
              <option value="professor">Professor</option>
              <option value="researcher">Researcher</option>
              <option value="phd">PhD Student</option>
              <option value="master">Master Student</option>
            </select>
          </div>
          <div>
            <select
              v-model="selectedStatus"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">
                {{ t.forms.adminManagement.userManagement.allStatuses }}
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>
        </div>

        <!-- User List -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Join Date
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in filteredUsers" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">
                      {{ user.name }}
                    </div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"
                  >
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ user.joinDate }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2"
                >
                  <Button variant="secondary" size="sm">
                    {{ t.forms.adminManagement.userManagement.editUser }}
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    @click="confirmDeleteUser(user)"
                    class="text-red-600 hover:text-red-900"
                  >
                    {{ t.forms.adminManagement.userManagement.deleteUser }}
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>

    <!-- System Settings Section -->
    <div v-if="activeSection === 'system'">
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <Card>
          <h2 class="text-xl font-semibold text-gray-900 mb-6">
            {{ t.forms.adminManagement.sections.system }}
          </h2>

          <div class="space-y-6">
            <div>
              <label
                for="labName"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                {{ t.forms.adminManagement.systemSettings.labName }}
              </label>
              <input
                id="labName"
                v-model="systemSettings.labName"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :class="{ 'border-red-500': errors.labName }"
              />
              <p v-if="errors.labName" class="text-red-600 text-sm mt-1">
                {{ errors.labName }}
              </p>
            </div>

            <div>
              <label
                for="labDescription"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                {{ t.forms.adminManagement.systemSettings.labDescription }}
              </label>
              <textarea
                id="labDescription"
                v-model="systemSettings.labDescription"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="contactEmail"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  {{ t.forms.adminManagement.systemSettings.contactEmail }}
                </label>
                <input
                  id="contactEmail"
                  v-model="systemSettings.contactEmail"
                  type="email"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :class="{ 'border-red-500': errors.contactEmail }"
                />
                <p v-if="errors.contactEmail" class="text-red-600 text-sm mt-1">
                  {{ errors.contactEmail }}
                </p>
              </div>

              <div>
                <label
                  for="contactPhone"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  {{ t.forms.adminManagement.systemSettings.contactPhone }}
                </label>
                <input
                  id="contactPhone"
                  v-model="systemSettings.contactPhone"
                  type="tel"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label
                for="address"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                {{ t.forms.adminManagement.systemSettings.address }}
              </label>
              <textarea
                id="address"
                v-model="systemSettings.address"
                rows="2"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div class="space-y-4">
              <div class="flex items-center">
                <input
                  id="maintenanceMode"
                  v-model="systemSettings.maintenanceMode"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  for="maintenanceMode"
                  class="ml-2 block text-sm text-gray-900"
                >
                  {{ t.forms.adminManagement.systemSettings.maintenanceMode }}
                </label>
              </div>

              <div class="flex items-center">
                <input
                  id="enableRegistration"
                  v-model="systemSettings.enableRegistration"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  for="enableRegistration"
                  class="ml-2 block text-sm text-gray-900"
                >
                  {{
                    t.forms.adminManagement.systemSettings.enableRegistration
                  }}
                </label>
              </div>

              <div class="flex items-center">
                <input
                  id="requireApproval"
                  v-model="systemSettings.requireApproval"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  for="requireApproval"
                  class="ml-2 block text-sm text-gray-900"
                >
                  {{ t.forms.adminManagement.systemSettings.requireApproval }}
                </label>
              </div>
            </div>
          </div>
        </Card>

        <!-- Form Actions for System Settings -->
        <div class="flex justify-end space-x-4">
          <Button type="submit" :disabled="isSubmitting">
            {{
              isSubmitting
                ? t.forms.adminManagement.form.saving
                : t.forms.adminManagement.form.save
            }}
          </Button>
        </div>
      </form>
    </div>

    <!-- Content Management Section -->
    <div v-if="activeSection === 'content'" class="space-y-6">
      <!-- Pending Publications -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.adminManagement.contentManagement.pendingPublications }}
        </h2>

        <div
          v-if="mockPendingPublications.length === 0"
          class="text-gray-500 text-center py-8"
        >
          No pending publications
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="publication in mockPendingPublications"
            :key="publication.id"
            class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div>
              <h3 class="font-medium text-gray-900">{{ publication.title }}</h3>
              <p class="text-sm text-gray-500">
                {{ publication.author }} • {{ publication.submittedDate }}
              </p>
            </div>
            <div class="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                @click="approveContent(publication.id, 'publication')"
                class="text-green-600 hover:text-green-800"
              >
                {{ t.forms.adminManagement.contentManagement.approve }}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                @click="rejectContent(publication.id, 'publication')"
                class="text-red-600 hover:text-red-800"
              >
                {{ t.forms.adminManagement.contentManagement.reject }}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <!-- Pending Events -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.adminManagement.contentManagement.pendingEvents }}
        </h2>

        <div
          v-if="mockPendingEvents.length === 0"
          class="text-gray-500 text-center py-8"
        >
          No pending events
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="event in mockPendingEvents"
            :key="event.id"
            class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
          >
            <div>
              <h3 class="font-medium text-gray-900">{{ event.title }}</h3>
              <p class="text-sm text-gray-500">
                {{ event.organizer }} • {{ event.proposedDate }}
              </p>
            </div>
            <div class="flex space-x-2">
              <Button
                variant="secondary"
                size="sm"
                @click="approveContent(event.id, 'event')"
                class="text-green-600 hover:text-green-800"
              >
                {{ t.forms.adminManagement.contentManagement.approve }}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                @click="rejectContent(event.id, 'event')"
                class="text-red-600 hover:text-red-800"
              >
                {{ t.forms.adminManagement.contentManagement.reject }}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <!-- Success Message -->
    <div
      v-if="successMessage"
      class="bg-green-50 border border-green-200 rounded-lg p-4"
    >
      <p class="text-green-800">{{ successMessage }}</p>
    </div>

    <!-- Error Display -->
    <div
      v-if="generalError"
      class="bg-red-50 border border-red-200 rounded-lg p-4"
    >
      <p class="text-red-800">{{ generalError }}</p>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
      >
        <div class="mt-3 text-center">
          <h3 class="text-lg font-medium text-gray-900">
            {{ t.forms.adminManagement.userManagement.confirmDelete }}
          </h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              {{ t.forms.adminManagement.userManagement.deleteConfirmMessage }}
            </p>
          </div>
          <div class="flex justify-center space-x-4 px-4 py-3">
            <Button variant="secondary" @click="showDeleteModal = false">
              {{ t.forms.adminManagement.form.cancel }}
            </Button>
            <Button
              @click="deleteUser"
              class="bg-red-600 hover:bg-red-700 text-white"
            >
              {{ t.forms.adminManagement.userManagement.deleteUser }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
