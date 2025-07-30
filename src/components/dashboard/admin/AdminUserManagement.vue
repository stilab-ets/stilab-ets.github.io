<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAdminDashboard } from '@/hooks/dashboard/useAdminDashboard'
import { useLanguage } from '@/composables/useLanguage'
import { UserPlus, Search, Settings } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'

const { t } = useLanguage()
const { recentUsers, userManagement } = useAdminDashboard()

const searchQuery = ref('')
const selectedRole = ref('all')

const roleOptions = computed(() => [
  { value: 'all', label: t.value.dashboard.admin.users.filters.allRoles },
  { value: 'admin', label: t.value.dashboard.admin.users.filters.admin },
  { value: 'professor', label: t.value.dashboard.admin.users.filters.professor },
  { value: 'researcher', label: t.value.dashboard.admin.users.filters.researcher },
  { value: 'student', label: t.value.dashboard.admin.users.filters.student }
])

const filteredUsers = computed(() => {
  let filtered = recentUsers.value

  if (searchQuery.value) {
    filtered = filtered.filter((user: { name: string; email: string }) => 
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedRole.value !== 'all') {
    filtered = filtered.filter((user: { role: string }) => user.role === selectedRole.value)
  }

  return filtered
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-xl font-semibold text-gray-900">
          {{ t.dashboard.admin.users.title }}
        </h2>
        <p class="text-sm text-gray-600">
          {{ t.dashboard.admin.users.description }}
        </p>
      </div>
      <Button>
        <UserPlus class="h-4 w-4 mr-2" />
        {{ t.dashboard.admin.users.addUser }}
      </Button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card class="p-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">{{ userManagement.totalUsers }}</div>
          <div class="text-sm text-gray-500">{{ t.dashboard.admin.users.stats.totalUsers }}</div>
        </div>
      </Card>
      <Card class="p-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">{{ userManagement.activeUsers }}</div>
          <div class="text-sm text-gray-500">{{ t.dashboard.admin.users.stats.activeUsers }}</div>
        </div>
      </Card>
      <Card class="p-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-purple-600">{{ userManagement.adminUsers }}</div>
          <div class="text-sm text-gray-500">{{ t.dashboard.admin.users.stats.adminUsers }}</div>
        </div>
      </Card>
      <Card class="p-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-orange-600">{{ userManagement.recentRegistrations }}</div>
          <div class="text-sm text-gray-500">{{ t.dashboard.admin.users.stats.newThisWeek }}</div>
        </div>
      </Card>
    </div>

    <!-- Filters -->
    <Card class="p-4">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t.dashboard.admin.users.searchPlaceholder"
              class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div class="sm:w-48">
          <select
            v-model="selectedRole"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option v-for="option in roleOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </Card>

    <!-- Users Table -->
    <Card>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ t.dashboard.admin.users.table.user }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ t.dashboard.admin.users.table.role }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ t.dashboard.admin.users.table.joined }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ t.dashboard.admin.users.table.actions }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-semibold">{{ user.initials }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  user.role === 'admin' ? 'bg-red-100 text-red-800' :
                  user.role === 'professor' ? 'bg-blue-100 text-blue-800' :
                  user.role === 'researcher' ? 'bg-purple-100 text-purple-800' :
                  'bg-green-100 text-green-800'
                ]">
                  {{ t.dashboard.admin.users.roles[user.role as keyof typeof t.dashboard.admin.users.roles] }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.joined }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button variant="outline" size="sm">
                  <Settings class="h-4 w-4" />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
</template>