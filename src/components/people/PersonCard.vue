<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import Card from '@/ui/Card.vue'
import type { Member } from '@/services/MainAPI'

interface Props {
  member: Member
}

const props = defineProps<Props>()
const emit = defineEmits<(e: 'open-modal', member: Member) => void>()

const { t } = useLanguage()

const openModal = () => {
  emit('open-modal', props.member)
}

const getStatusLabel = (isActive: boolean) => {
  return isActive ? t.value.person.card.status.active : t.value.person.card.status.alumni
}

const formatJoinDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}
</script>

<template>
  <Card 
    variant="hover" 
    :clickable="true" 
    @click="openModal"
  >
    <div class="flex items-center mb-4">
      <img 
        :src="member.profile_image || '/default-profile.png'" 
        :alt="`${member.first_name} ${member.last_name}`"
        class="h-16 w-16 rounded-full object-cover flex-shrink-0" 
      />
      <div class="ml-4 flex-1">
        <h3 class="text-lg font-semibold text-gray-900">
          {{ member.first_name }} {{ member.last_name }}
        </h3>
        <p class="text-sm text-gray-600">{{ member.position }}</p>
        <p class="text-sm text-[#08a4d4] capitalize">
          {{ getStatusLabel(member.is_active) }}
        </p>
      </div>
    </div>

    <div class="mb-4">
      <h4 class="text-sm font-medium text-gray-700 mb-2">
        {{ t.person.card.researchDomains }}
      </h4>
      <div>
        <span 
          v-if="member.research_interests"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
        >
          {{ member.research_interests }}
        </span>
        <span v-else class="text-gray-400 italic">
          No research interests specified
        </span>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex space-x-2">
        <a 
          v-if="member.email" 
          :href="`mailto:${member.email}`"
          class="text-gray-400 hover:text-[#08a4d4] transition-colors" 
          @click.stop
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </a>
        
        <a 
          v-if="member.google_scholar" 
          :href="member.google_scholar" 
          target="_blank"
          class="text-gray-400 hover:text-[#08a4d4] transition-colors" 
          @click.stop
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
          </svg>
        </a>
        
        <a 
          v-if="member.linkedin_url" 
          :href="member.linkedin_url" 
          target="_blank"
          class="text-gray-400 hover:text-[#08a4d4] transition-colors" 
          @click.stop
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
              clip-rule="evenodd" 
            />
          </svg>
        </a>
        
        <a 
          v-if="member.personal_website" 
          :href="member.personal_website" 
          target="_blank"
          class="text-gray-400 hover:text-[#08a4d4] transition-colors" 
          @click.stop
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </a>
      </div>
      
      <div class="text-xs text-gray-500">
        Joined {{ formatJoinDate(member.joined_date) }}
      </div>
    </div>
  </Card>
</template>