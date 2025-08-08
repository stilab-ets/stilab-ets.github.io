<script setup lang="ts">
import { useAuth } from '@/hooks/auth/useAuth';
import { useLanguage } from '@/composables/useLanguage';
import { User, Settings } from 'lucide-vue-next';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';

const { t } = useLanguage();
const { user, displayName } = useAuth();
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-900">
        {{ t.dashboard.student.profile.title }}
      </h2>
      <Button>
        <Settings class="h-4 w-4 mr-2" />
        {{ t.dashboard.student.profile.editProfile }}
      </Button>
    </div>

    <Card>
      <div class="p-6">
        <div class="flex items-center space-x-4 mb-6">
          <div
            class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center"
          >
            <User class="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 class="text-lg font-medium text-gray-900">
              {{ displayName }}
            </h3>
            <p class="text-gray-600">
              {{ user?.email }}
            </p>
            <span
              class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"
            >
              {{
                t.dashboard.student.profile.roleLabel[
                  user?.role as keyof typeof t.dashboard.student.profile.roleLabel
                ] || t.dashboard.student.profile.defaultRole
              }}
            </span>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">{{
              t.dashboard.student.profile.fields.firstName
            }}</label>
            <p class="text-gray-900">
              {{ user?.first_name || t.dashboard.student.profile.notSet }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">{{
              t.dashboard.student.profile.fields.lastName
            }}</label>
            <p class="text-gray-900">
              {{ user?.last_name || t.dashboard.student.profile.notSet }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">{{
              t.dashboard.student.profile.fields.email
            }}</label>
            <p class="text-gray-900">
              {{ user?.email }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">{{
              t.dashboard.student.profile.fields.memberSince
            }}</label>
            <p class="text-gray-900">
              {{
                user?.date_joined
                  ? new Date(user.date_joined).toLocaleDateString()
                  : t.dashboard.student.profile.unknown
              }}
            </p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
