<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import type { Member } from '@/services/MainAPI'

interface Props {
  member: Member | null
  isOpen: boolean
}

defineProps<Props>()
const emit = defineEmits<{ close: [] }>()

const { t } = useLanguage()

const closeModal = () => {
  emit('close')
}

const openExternalLink = (url: string) => {
  window.open(url, '_blank')
}

const formatJoinDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const getStatusLabel = (isActive: boolean) => {
  return isActive ? t.value.person.card.status.active : t.value.person.card.status.alumni
}
</script>

<template>
  <div
    v-if="isOpen && member"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    @click="closeModal"
  >
    <div
      class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white"
      @click.stop
    >
      <!-- Header -->
      <div class="flex items-center justify-between pb-4 border-b">
        <div class="flex items-center">
          <img
            :src="member.profile_image || '/default-profile.png'"
            :alt="`${member.first_name} ${member.last_name}`"
            class="h-20 w-20 rounded-full object-cover"
          />
          <div class="ml-4">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ member.first_name }} {{ member.last_name }}
            </h2>
            <p class="text-lg text-gray-600">{{ member.position }}</p>
            <p class="text-sm text-[#08a4d4] capitalize mt-1">
              {{ getStatusLabel(member.is_active) }}
            </p>
            <div class="flex items-center mt-2 space-x-4">
              <span class="text-gray-600 text-sm">
                Joined {{ formatJoinDate(member.joined_date) }}
              </span>
            </div>
          </div>
        </div>
        <button @click="closeModal" class="p-2 hover:bg-gray-200 rounded-md">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="mt-6 max-h-96 overflow-y-auto">
        <!-- Biography -->
        <section class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            {{ t.person.modal.biography }}
          </h3>
          <p class="text-gray-700 leading-relaxed">
            {{ member.bio || 'No biography available.' }}
          </p>
        </section>

        <!-- Research Interests -->
        <section class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            {{ t.person.modal.researchDomains }}
          </h3>
          <div>
            <span
              v-if="member.research_interests"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              {{ member.research_interests }}
            </span>
            <span v-else class="text-gray-400 italic">
              No research interests specified
            </span>
          </div>
        </section>

        <!-- External Links -->
        <section class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            {{ t.person.modal.externalLinks }}
          </h3>
          <div class="flex flex-wrap gap-3">
            <button
              v-if="member.google_scholar"
              class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#08a4d4]"
              @click="openExternalLink(member.google_scholar)"
            >
              <svg class="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
              </svg>
              Google Scholar
            </button>

            <button
              v-if="member.linkedin_url"
              class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#08a4d4]"
              @click="openExternalLink(member.linkedin_url)"
            >
              <svg class="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                  clip-rule="evenodd" />
              </svg>
              LinkedIn
            </button>

            <button
              v-if="member.personal_website"
              class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#08a4d4]"
              @click="openExternalLink(member.personal_website)"
            >
              <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              {{ t.person.modal.website }}
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>