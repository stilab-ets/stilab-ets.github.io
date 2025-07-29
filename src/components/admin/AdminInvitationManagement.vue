<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouteGuard } from '@/composables/useRouteGuard'
import { useInvitationManagement } from '@/hooks/invitations/useInvitationManagement'
import { useLanguage } from '@/composables/useLanguage'
import { adminInvitationManagementTranslations } from '@/data/translations/adminInvitationManagement.translate'
import InvitationNavigationTabs from './invitation/InvitationNavigationTabs.vue'
import InvitationSender from './InvitationSender.vue'
import InvitationStatsSection from './invitation/InvitationStatsSection.vue'
import InvitationHistorySection from './invitation/InvitationHistorySection.vue'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'

const { currentLanguage } = useLanguage()
const t = computed(() => adminInvitationManagementTranslations[currentLanguage.value])

// Admin route protection
const { requireRole } = useRouteGuard()

// Invitation management
const {
  invitations,
  isLoading,
  error,
  invitationStats,
  fetchInvitations,
  updateInvitation,
  deleteInvitation,
  cancelInvitation,
  resendInvitation,
  clearError
} = useInvitationManagement()

// Check admin permissions
const canManageInvitations = computed(() => requireRole('admin'))

// Active tab state
const activeTab = ref<'send' | 'stats' | 'history'>('send')

// Last updated timestamp
const lastUpdated = ref<Date | null>(null)

// Refresh data
const refreshData = async () => {
  await fetchInvitations()
  lastUpdated.value = new Date()
}

// Handle invitation actions
const handleResendInvitation = async (email: string) => {
  const success = await resendInvitation(email)
  if (success) {
    clearError()
    await refreshData()
  }
}

const handleCancelInvitation = async (id: number) => {
  const success = await cancelInvitation(id)
  if (success) {
    clearError()
    await refreshData()
  }
}

const handleDeleteInvitation = async (id: number) => {
  const success = await deleteInvitation(id)
  if (success) {
    clearError()
    await refreshData()
  }
}

// Handle invitation sent event
const handleInvitationSent = async () => {
  await refreshData()
}

// Format last updated time
const formatLastUpdated = computed(() => {
  if (!lastUpdated.value) return ''
  
  return new Intl.DateTimeFormat(currentLanguage.value === 'fr' ? 'fr-FR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(lastUpdated.value)
})

// Initialize component
onMounted(async () => {
  if (canManageInvitations.value) {
    await refreshData()
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Access Denied -->
    <div v-if="!canManageInvitations" class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card class="p-8 text-center">
        <div class="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ t.accessDenied.title }}</h2>
        <p class="text-gray-600">{{ t.accessDenied.message }}</p>
      </Card>
    </div>

    <!-- Main Content -->
    <div v-else>
      <!-- Header -->
      <div class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ t.title }}</h1>
              <p class="mt-2 text-gray-600">{{ t.subtitle }}</p>
            </div>
            
            <!-- Refresh Button and Last Updated -->
            <div class="flex items-center space-x-4">
              <div v-if="lastUpdated" class="text-sm text-gray-500">
                {{ t.refresh.lastUpdated }}: {{ formatLastUpdated }}
              </div>
              <Button
                @click="refreshData"
                variant="secondary"
                :disabled="isLoading"
              >
                <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {{ t.refresh.button }}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <InvitationNavigationTabs v-model:activeTab="activeTab" />

      <!-- Content Container -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Global Error Message -->
        <div v-if="error" class="mb-6">
          <Card class="p-4 bg-red-50 border border-red-200">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">{{ t.errors.fetchFailed }}</h3>
                <div class="mt-2 text-sm text-red-700">
                  <p>{{ error }}</p>
                </div>
              </div>
              <div class="ml-auto pl-3">
                <button
                  @click="clearError"
                  class="inline-flex text-red-400 hover:text-red-600"
                >
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </Card>
        </div>

        <!-- Tab Content -->
        <div>
          <!-- Send Invitations Tab -->
          <div v-if="activeTab === 'send'">
            <InvitationSender @invitation-sent="handleInvitationSent" />
          </div>

          <!-- Statistics Tab -->
          <div v-else-if="activeTab === 'stats'">
            <InvitationStatsSection
              :stats="invitationStats"
              :is-loading="isLoading"
            />
          </div>

          <!-- History Tab -->
          <div v-else-if="activeTab === 'history'">
            <InvitationHistorySection
              :invitations="invitations"
              :is-loading="isLoading"
              @resend="handleResendInvitation"
              @cancel="handleCancelInvitation"
              @delete="handleDeleteInvitation"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>