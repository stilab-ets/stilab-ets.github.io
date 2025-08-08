<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage';
import Card from '@/ui/Card.vue';
import type { Member } from '@/services/MainAPI';

interface Props {
  member: Member;
}

const props = defineProps<Props>();
const emit = defineEmits<(e: 'open-modal', member: Member) => void>();

const { t } = useLanguage();

const openModal = () => {
  emit('open-modal', props.member);
};

const getStatusLabel = (status: string | null) => {
  return status || '';
};
</script>

<template>
  <Card variant="hover" :clickable="true" @click="openModal">
    <div class="flex items-center mb-4">
      <img
        :src="member.image_url || '/default-profile.png'"
        :alt="`${member.first_name} ${member.last_name}`"
        class="h-16 w-16 rounded-full object-cover flex-shrink-0"
      />
      <div class="ml-4 flex-1">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ member.first_name }} {{ member.last_name }}
        </h3>
        <p class="text-sm text-gray-600">{{ member.role }}</p>
        <p class="text-sm text-[#08a4d4] capitalize">
          {{ getStatusLabel(member.status ?? null) }}
        </p>
      </div>
    </div>

    <div class="mb-4">
      <h4 class="text-sm font-medium text-gray-700 mb-2">Research Domain</h4>
      <div>
        <span
          v-if="member.research_domain"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
        >
          {{ member.research_domain }}
        </span>
        <span v-else class="text-gray-400 italic">No domain specified</span>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex space-x-2">
        <a
          v-if="member.github_url"
          :href="member.github_url"
          target="_blank"
          class="text-gray-400 hover:text-[#08a4d4] transition-colors"
          @click.stop
        >
          <!-- GitHub icon SVG -->
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
        <a
          v-if="member.linkedin_url"
          :href="member.linkedin_url"
          target="_blank"
          class="text-gray-400 hover:text-[#08a4d4] transition-colors"
          @click.stop
        >
          <!-- LinkedIn icon SVG -->
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
        <a
          v-if="member.stackoverflow_url"
          :href="member.stackoverflow_url"
          target="_blank"
          class="text-gray-400 hover:text-[#08a4d4] transition-colors"
          @click.stop
        >
          <!-- Stack Overflow icon SVG -->
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 100 100">
            <path
              class="st0"
              d="M84.4 93.8V70.6h7.7v30.9H22.6V70.6h7.7v23.2z"
            />
            <path
              class="st1"
              d="M38.8 68.4l37.8 7.9 1.6-7.6-37.8-7.9-1.6 7.6zm5-18l35 16.3 3.2-7-35-16.4-3.2 7.1zm9.7-17.2l29.7 24.7 4.9-5.9-29.7-24.7-4.9 5.9zm19.2-18.3l-6.2 4.6 23 31 6.2-4.6-23-31zM38 86h38.6v-7.7H38V86z"
            />
          </svg>
        </a>
        <a
          v-if="member.twitter_x_url"
          :href="member.twitter_x_url"
          target="_blank"
          class="text-gray-400 hover:text-[#08a4d4] transition-colors"
          @click.stop
        >
          <!-- Twitter/X icon SVG -->
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 350 350">
            <path
              d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"
            />
          </svg>
        </a>

        <a
          v-if="member.google_scholar_url"
          :href="member.google_scholar_url"
          target="_blank"
          class="text-gray-400 hover:text-[#08a4d4] transition-colors"
          @click.stop
        >
          <!-- Google Scholar icon SVG -->
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 350 350">
            <path fill="#4285f4" d="M256 411.12L0 202.667 256 0z" />
            <path fill="#356ac3" d="M256 411.12l256-208.453L256 0z" />
            <circle fill="#a0c3ff" cx="256" cy="362.667" r="149.333" />
            <path
              fill="#76a7fa"
              d="M121.037 298.667c23.968-50.453 75.392-85.334 134.963-85.334s110.995 34.881 134.963 85.334H121.037z"
            />
          </svg>
        </a>

        <a
          v-if="member.dblp_url"
          :href="member.dblp_url"
          target="_blank"
          class="text-gray-400 hover:text-[#08a4d4] transition-colors"
          @click.stop
        >
          <!-- DBLP icon SVG -->
          <svg class="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M3.075.002c-.096.013-.154.092-.094.31L4.97 7.73 3.1 8.6s-.56.26-.4.85l2.45 9.159s.16.59.72.33l6.169-2.869 1.3-.61s.52-.24.42-.79l-.01-.06-1.13-4.22-.658-2.45-.672-2.49v-.04s-.16-.59-.84-1L3.5.141s-.265-.16-.425-.139zM18.324 5.03a.724.724 0 0 0-.193.06l-5.602 2.6.862 3.2 1.09 4.08.01.06c.05.47-.411.79-.411.79l-1.88.87.5 1.89.04.1c.07.17.28.6.81.91l6.95 4.269s.68.41.52-.17l-1.981-7.4 1.861-.86s.56-.26.4-.85L18.85 5.42s-.116-.452-.526-.39z"
            />
          </svg>
        </a>
      </div>
    </div>
  </Card>
</template>
