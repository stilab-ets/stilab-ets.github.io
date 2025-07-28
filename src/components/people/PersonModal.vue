<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import Button from '@/ui/Button.vue'

interface Member {
  id: string
  first_name: string
  last_name: string
  role: string
  email: string | null
  phone?: string | null
  biography?: string | null
  research_domain?: string | null
  image_url?: string | null
  github_url?: string | null
  linkedin_url?: string | null
  personal_website?: string | null
  status?: string | null
}

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
            :src="member.image_url || '/default-profile.png'"
            :alt="member.first_name + ' ' + member.last_name"
            class="h-20 w-20 rounded-full object-cover"
          />
          <div class="ml-4">
            <h2 class="text-2xl font-bold text-gray-900">{{ member.first_name }} {{ member.last_name }}</h2>
            <p class="text-lg text-gray-600">{{ member.role }}</p>
            <div class="flex items-center mt-2 space-x-4">
              <a
                v-if="member.email"
                :href="`mailto:${member.email}`"
                class="text-[#08a4d4] hover:underline"
              >
                {{ member.email }}
              </a>
              <span v-if="member.phone" class="text-gray-600">
                {{ member.phone }}
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
          <h3 class="text-lg font-semibold text-gray-900 mb-3">{{ t.person.modal.biography }}</h3>
          <p class="text-gray-700 leading-relaxed">{{ member.biography || 'No biography available.' }}</p>
        </section>

        <!-- Research Domain -->
        <section class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">{{ t.person.modal.researchDomains }}</h3>
          <div>
            <span
              v-if="member.research_domain"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              {{ member.research_domain }}
            </span>
            <span v-else class="text-gray-400 italic">No research domain specified</span>
          </div>
        </section>

        <!-- External Links -->
        <section class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">{{ t.person.modal.externalLinks }}</h3>
          <div class="flex flex-wrap gap-3">
            <button
              v-if="member.github_url"
              class="btn btn-outline"
              @click="openExternalLink(member.github_url)"
            >
              <!-- GitHub icon SVG -->
              <svg class="h-4 w-4 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clip-rule="evenodd" />
              </svg>
              GitHub
            </button>

            <button
              v-if="member.linkedin_url"
              class="btn btn-outline"
              @click="openExternalLink(member.linkedin_url)"
            >
              <!-- LinkedIn icon SVG -->
              <svg class="h-4 w-4 mr-2 inline" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                  clip-rule="evenodd" />
              </svg>
              LinkedIn
            </button>

            <button
              v-if="member.personal_website"
              class="btn btn-outline"
              @click="openExternalLink(member.personal_website)"
            >
              Website
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
