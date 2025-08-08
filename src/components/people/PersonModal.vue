<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage';
import type { Member } from '@/services/MainAPI';

interface Props {
  member: Member | null;
  isOpen: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{ close: [] }>();
const { t } = useLanguage();

const closeModal = () => {
  emit('close');
};

const openExternalLink = (url: string) => {
  window.open(url, '_blank');
};

const formatJoinDate = (dateString?: string | null) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};

const getStatusLabel = (isActive: boolean) => {
  return isActive
    ? t.value.person.card.status.active
    : t.value.person.card.status.alumni;
};
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
            :alt="`${member.first_name} ${member.last_name}`"
            class="h-20 w-20 rounded-full object-cover"
          />
          <div class="ml-4">
            <h2 class="text-2xl font-bold text-gray-900">
              {{ member.first_name }} {{ member.last_name }}
            </h2>
            <p class="text-lg text-gray-600">{{ member.role }}</p>
            <p class="text-sm text-[#08a4d4] capitalize mt-1">
              {{ member.status }}
            </p>
          </div>
        </div>
        <button @click="closeModal" class="p-2 hover:bg-gray-200 rounded-md">
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
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
            {{ member.biography || 'No biography available.' }}
          </p>
        </section>

        <!-- Research Interests -->
        <section class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            {{ t.person.modal.researchDomains }}
          </h3>
          <div>
            <span
              v-if="props.member?.research_domain"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              {{ props.member.research_domain }}
            </span>
            <span v-else class="text-gray-400 italic"
              >No research interests specified</span
            >
          </div>
        </section>

        <!-- External Links -->
        <section class="mb-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            {{ t.person.modal.externalLinks }}
          </h3>
          <div class="flex flex-wrap gap-3">
            <button
              v-if="member.github_url"
              class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#08a4d4]"
              @click="openExternalLink(member.github_url)"
            >
              <!-- GitHub icon SVG -->
              <svg class="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clip-rule="evenodd"
                />
              </svg>
              GitHub
            </button>

            <button
              v-if="member.linkedin_url"
              class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#08a4d4]"
              @click="openExternalLink(member.linkedin_url)"
            >
              <!-- LinkedIn icon SVG -->
              <svg class="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                  clip-rule="evenodd"
                />
              </svg>
              LinkedIn
            </button>

            <button
              v-if="member.stackoverflow_url"
              class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#08a4d4]"
              @click="openExternalLink(member.stackoverflow_url)"
            >
              <!-- Stack Overflow icon SVG -->
              <svg
                class="h-4 w-4 mr-2"
                fill="currentColor"
                viewBox="0 0 100 100"
              >
                <path d="M84.4 93.8V70.6h7.7v30.9H22.6V70.6h7.7v23.2z" />
                <path
                  d="M38.8 68.4l37.8 7.9 1.6-7.6-37.8-7.9-1.6 7.6zm5-18l35 16.3 3.2-7-35-16.4-3.2 7.1zm9.7-17.2l29.7 24.7 4.9-5.9-29.7-24.7-4.9 5.9zm19.2-18.3l-6.2 4.6 23 31 6.2-4.6-23-31zM38 86h38.6v-7.7H38V86z"
                />
              </svg>
              Stack Overflow
            </button>

            <button
              v-if="member.twitter_x_url"
              class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#08a4d4]"
              @click="openExternalLink(member.twitter_x_url)"
            >
              <!-- Twitter / X icon SVG -->
              <svg
                class="h-4 w-4 mr-2"
                fill="currentColor"
                viewBox="0 0 350 350"
              >
                <path
                  d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"
                />
              </svg>
              Twitter / X
            </button>

            <button
              v-if="member.google_scholar_url"
              class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#08a4d4]"
              @click="openExternalLink(member.google_scholar_url)"
            >
              <!-- Google Scholar SVG -->
              <svg
                class="h-4 w-4 mr-2"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path fill="#4285f4" d="M256 411.12L0 202.667 256 0z" />
                <path fill="#356ac3" d="M256 411.12l256-208.453L256 0z" />
                <circle fill="#a0c3ff" cx="256" cy="362.667" r="149.333" />
                <path
                  fill="#76a7fa"
                  d="M121.037 298.667c23.968-50.453 75.392-85.334 134.963-85.334s110.995 34.881 134.963 85.334H121.037z"
                />
              </svg>
              Google Scholar
            </button>

            <button
              v-if="member.dblp_url"
              class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#08a4d4]"
              @click="openExternalLink(member.dblp_url)"
            >
              <!--DBLP SVG -->
              <svg class="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M3.075.002c-.096.013-.154.092-.094.31L4.97 7.73 3.1 8.6s-.56.26-.4.85l2.45 9.159s.16.59.72.33l6.169-2.869 1.3-.61s.52-.24.42-.79l-.01-.06-1.13-4.22-.658-2.45-.672-2.49v-.04s-.16-.59-.84-1L3.5.141s-.265-.16-.425-.139zM18.324 5.03a.724.724 0 0 0-.193.06l-5.602 2.6.862 3.2 1.09 4.08.01.06c.05.47-.411.79-.411.79l-1.88.87.5 1.89.04.1c.07.17.28.6.81.91l6.95 4.269s.68.41.52-.17l-1.981-7.4 1.861-.86s.56-.26.4-.85L18.85 5.42s-.116-.452-.526-.39z"
                />
              </svg>
              DBLP
            </button>

            <button
              v-if="member.personal_website"
              class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#08a4d4]"
              @click="openExternalLink(member.personal_website)"
            >
              <svg
                class="h-4 w-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              {{ t.person.modal.website }}
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
