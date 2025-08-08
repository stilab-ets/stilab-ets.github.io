<script setup lang="ts">
import { computed } from 'vue';
import { useAdminDashboard } from '@/hooks/dashboard/useAdminDashboard';
import { useLanguage } from '@/composables/useLanguage';
import { Users, Activity, UserPlus } from 'lucide-vue-next';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';

const { t } = useLanguage();
const { recentUsers, recentContent, quickActions, invitations } =
  useAdminDashboard();

const pendingInvitations = computed(() =>
  invitations.value.filter((inv) => inv.status === 'pending')
);
</script>

<template>
  <div class="space-y-8">
    <!-- Quick Actions -->
    <section>
      <h2 class="text-lg font-medium text-gray-900 mb-4">
        {{ t.dashboard.admin.overview.quickActions }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          v-for="action in quickActions"
          :key="action.title"
          class="p-4 hover:shadow-md transition-shadow cursor-pointer"
          @click="action.action"
        >
          <div class="flex items-center space-x-3">
            <div :class="['p-2 rounded-md', action.color]">
              <component :is="action.icon" class="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900">
                {{ action.title }}
              </h3>
              <p class="text-xs text-gray-500">
                {{ action.description }}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Users -->
      <section>
        <Card>
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">
                {{ t.dashboard.admin.overview.recentUsers }}
              </h3>
              <Button variant="outline" size="sm">
                <Users class="h-4 w-4 mr-2" />
                {{ t.dashboard.admin.overview.viewAll }}
              </Button>
            </div>
            <div class="space-y-3">
              <div
                v-for="user in recentUsers.slice(0, 5)"
                :key="user.id"
                class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div
                  class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white text-xs font-semibold">
                    {{ user.initials }}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{ user.name }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ user.email }}
                  </p>
                </div>
                <div class="text-right">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      user.role === 'admin'
                        ? 'bg-red-100 text-red-800'
                        : user.role === 'professor'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800',
                    ]"
                  >
                    {{
                      t.dashboard.admin.overview.roles[
                        user.role as keyof typeof t.dashboard.admin.overview.roles
                      ]
                    }}
                  </span>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ user.joined }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <!-- Pending Invitations -->
      <section>
        <Card>
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">
                {{ t.dashboard.admin.overview.pendingInvitations }}
              </h3>
              <Button variant="outline" size="sm">
                <UserPlus class="h-4 w-4 mr-2" />
                {{ t.dashboard.admin.overview.sendInvitation }}
              </Button>
            </div>
            <div class="space-y-3">
              <div
                v-for="invitation in pendingInvitations.slice(0, 5)"
                :key="invitation.id"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {{ invitation.email }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ t.dashboard.admin.overview.invitationDetails }}
                    {{
                      t.dashboard.admin.overview.roles[
                        invitation.role as keyof typeof t.dashboard.admin.overview.roles
                      ]
                    }}
                    • {{ t.dashboard.admin.overview.sent }}
                    {{ new Date(invitation.sentAt).toLocaleDateString() }}
                  </p>
                </div>
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800"
                >
                  {{ t.dashboard.admin.invitations.status.pending }}
                </span>
              </div>
              <div
                v-if="pendingInvitations.length === 0"
                class="text-center py-4 text-gray-500"
              >
                <UserPlus class="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p class="text-sm">
                  {{ t.dashboard.admin.overview.noPendingInvitations }}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>

    <!-- Recent Content Activity -->
    <section>
      <Card>
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              {{ t.dashboard.admin.overview.recentActivity }}
            </h3>
            <Button variant="outline" size="sm">
              <Activity class="h-4 w-4 mr-2" />
              {{ t.dashboard.admin.overview.viewAll }}
            </Button>
          </div>
          <div class="space-y-3">
            <div
              v-for="item in recentContent.slice(0, 8)"
              :key="item.id"
              class="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg"
            >
              <div
                :class="[
                  'p-2 rounded-md',
                  item.type === 'publication'
                    ? 'bg-blue-100 text-blue-600'
                    : item.type === 'event'
                      ? 'bg-green-100 text-green-600'
                      : item.type === 'project'
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-gray-100 text-gray-600',
                ]"
              >
                <component :is="item.icon" class="h-4 w-4" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ item.title }}
                </p>
                <p class="text-xs text-gray-500">
                  {{ t.dashboard.admin.overview.byAuthor }} {{ item.author }} •
                  {{ item.timestamp }}
                </p>
              </div>
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  item.status === 'published'
                    ? 'bg-green-100 text-green-800'
                    : item.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800',
                ]"
              >
                {{
                  t.dashboard.admin.overview.contentStatus[
                    item.status as keyof typeof t.dashboard.admin.overview.contentStatus
                  ]
                }}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </section>
  </div>
</template>
