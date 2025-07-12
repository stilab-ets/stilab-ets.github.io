<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '../../composables/useLanguage'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastLogin: string
  createdAt: string
}

interface Props {
  users?: User[]
  selectedUserId?: string
}

const props = withDefaults(defineProps<Props>(), {
  users: () => []
})

const emit = defineEmits<{
  editUser: [userId: string]
  deleteUser: [userId: string]
  activateUser: [userId: string]
  deactivateUser: [userId: string]
  resendInvitation: [userId: string]
  bulkAction: [action: string, userIds: string[]]
  exportUsers: []
  createUser: []
}>()

const { t: translations } = useLanguage()
const t = computed(() => translations.value.admin.management)

const searchQuery = ref('')
const statusFilter = ref('')
const roleFilter = ref('')
const selectedUsers = ref<string[]>([])
const showBulkActions = ref(false)

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' }
]

const roleOptions = [
  { value: '', label: 'All Roles' },
  { value: 'professor', label: 'Professor' },
  { value: 'researcher', label: 'Researcher' },
  { value: 'postdoc', label: 'Post-Doc' },
  { value: 'phd', label: 'PhD Student' },
  { value: 'master', label: 'Master Student' },
  { value: 'engineer', label: 'Engineer' },
  { value: 'admin', label: 'Administrator' }
]

const bulkActions = [
  { value: 'activate', label: 'Activate Selected' },
  { value: 'deactivate', label: 'Deactivate Selected' },
  { value: 'delete', label: 'Delete Selected' },
  { value: 'export', label: 'Export Selected' }
]

const filteredUsers = computed(() => {
  return props.users.filter(user => {
    const matchesSearch = !searchQuery.value || 
      user.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !statusFilter.value || user.status === statusFilter.value
    const matchesRole = !roleFilter.value || user.role === roleFilter.value
    
    return matchesSearch && matchesStatus && matchesRole
  })
})

const toggleUserSelection = (userId: string) => {
  const index = selectedUsers.value.indexOf(userId)
  if (index > -1) {
    selectedUsers.value.splice(index, 1)
  } else {
    selectedUsers.value.push(userId)
  }
}

const toggleAllUsers = () => {
  if (selectedUsers.value.length === filteredUsers.value.length) {
    selectedUsers.value = []
  } else {
    selectedUsers.value = filteredUsers.value.map(user => user.id)
  }
}

const executeBulkAction = (action: string) => {
  if (selectedUsers.value.length === 0) return
  
  emit('bulkAction', action, selectedUsers.value)
  selectedUsers.value = []
  showBulkActions.value = false
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800'
    case 'inactive': return 'bg-gray-100 text-gray-800'
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const getRoleColor = (role: string) => {
  switch (role) {
    case 'professor': return 'bg-purple-100 text-purple-800'
    case 'researcher': return 'bg-blue-100 text-blue-800'
    case 'postdoc': return 'bg-indigo-100 text-indigo-800'
    case 'phd': return 'bg-cyan-100 text-cyan-800'
    case 'master': return 'bg-teal-100 text-teal-800'
    case 'engineer': return 'bg-orange-100 text-orange-800'
    case 'admin': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <PageHeader
      title="User Management"
      subtitle="Manage laboratory members, roles, and permissions"
      highlight-word="Management"
    />

    <Card class="mt-8">
      <!-- Filters and Actions -->
      <div class="p-6 border-b border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <!-- Search -->
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search users..."
                class="w-full sm:w-64 px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <!-- Status Filter -->
            <select
              v-model="statusFilter"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
            >
              <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>

            <!-- Role Filter -->
            <select
              v-model="roleFilter"
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
            >
              <option v-for="option in roleOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>

          <div class="flex space-x-2">
            <!-- Bulk Actions -->
            <div v-if="selectedUsers.length > 0" class="relative">
              <Button
                variant="secondary"
                @click="showBulkActions = !showBulkActions"
              >
                Bulk Actions ({{ selectedUsers.length }})
              </Button>
              <div
                v-if="showBulkActions"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
              >
                <div class="py-1">
                  <button
                    v-for="action in bulkActions"
                    :key="action.value"
                    @click="executeBulkAction(action.value)"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {{ action.label }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Export -->
            <Button
              variant="secondary"
              @click="emit('exportUsers')"
            >
              Export
            </Button>

            <!-- Create User -->
            <Button @click="emit('createUser')">
              Add User
            </Button>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  :checked="selectedUsers.length === filteredUsers.length && filteredUsers.length > 0"
                  :indeterminate="selectedUsers.length > 0 && selectedUsers.length < filteredUsers.length"
                  @change="toggleAllUsers"
                  class="h-4 w-4 text-[#08a4d4] focus:ring-[#08a4d4] border-gray-300 rounded"
                />
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="user in filteredUsers"
              :key="user.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  :checked="selectedUsers.includes(user.id)"
                  @change="toggleUserSelection(user.id)"
                  class="h-4 w-4 text-[#08a4d4] focus:ring-[#08a4d4] border-gray-300 rounded"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span class="text-sm font-medium text-gray-700">
                        {{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ user.firstName }} {{ user.lastName }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ user.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['inline-flex px-2 py-1 text-xs font-semibold rounded-full', getRoleColor(user.role)]">
                  {{ roleOptions.find(r => r.value === user.role)?.label || user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="['inline-flex px-2 py-1 text-xs font-semibold rounded-full', getStatusColor(user.status)]">
                  {{ user.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.lastLogin ? formatDate(user.lastLogin) : 'Never' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="emit('editUser', user.id)"
                    class="text-[#08a4d4] hover:text-[#0692c4] text-sm"
                  >
                    Edit
                  </button>
                  
                  <button
                    v-if="user.status === 'active'"
                    @click="emit('deactivateUser', user.id)"
                    class="text-yellow-600 hover:text-yellow-800 text-sm"
                  >
                    Deactivate
                  </button>
                  
                  <button
                    v-if="user.status === 'inactive'"
                    @click="emit('activateUser', user.id)"
                    class="text-green-600 hover:text-green-800 text-sm"
                  >
                    Activate
                  </button>
                  
                  <button
                    v-if="user.status === 'pending'"
                    @click="emit('resendInvitation', user.id)"
                    class="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Resend
                  </button>
                  
                  <button
                    @click="emit('deleteUser', user.id)"
                    class="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredUsers.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No users found</h3>
          <p class="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      </div>

      <!-- Pagination would go here if needed -->
    </Card>

    <!-- User Statistics -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card class="p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">
                Total Users
              </dt>
              <dd class="text-lg font-medium text-gray-900">
                {{ props.users.length }}
              </dd>
            </dl>
          </div>
        </div>
      </Card>

      <Card class="p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">
                Active Users
              </dt>
              <dd class="text-lg font-medium text-gray-900">
                {{ props.users.filter(u => u.status === 'active').length }}
              </dd>
            </dl>
          </div>
        </div>
      </Card>

      <Card class="p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">
                Pending Invitations
              </dt>
              <dd class="text-lg font-medium text-gray-900">
                {{ props.users.filter(u => u.status === 'pending').length }}
              </dd>
            </dl>
          </div>
        </div>
      </Card>

      <Card class="p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          </div>
          <div class="ml-5 w-0 flex-1">
            <dl>
              <dt class="text-sm font-medium text-gray-500 truncate">
                Administrators
              </dt>
              <dd class="text-lg font-medium text-gray-900">
                {{ props.users.filter(u => u.role === 'admin').length }}
              </dd>
            </dl>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>