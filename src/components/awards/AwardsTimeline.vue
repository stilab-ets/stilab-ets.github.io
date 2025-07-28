<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

interface AwardRecipient {
  id: string
  member: {
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
}
// Extended award data structure
interface Award {
  recipients: AwardRecipient[];
  id: string;
  title: string;
  url: string;
  year?: number;
  organization: string;
}

interface Props {
  awards: Award[]
}

const props = defineProps<Props>()
const { t } = useLanguage()

const currentYear = new Date().getFullYear()

const groupedAwards = computed(() => {
  const groups: { year: number; awards: Award[] }[] = []
  const yearMap = new Map<number, Award[]>()

  props.awards.forEach(awardData => {
    const year = awardData.year
    if (!year)
      return
    if (!yearMap.has(year)) {
      yearMap.set(year, [])
    }
    yearMap.get(year)!.push(awardData)
  })

  // Sort years in descending order
  const sortedYears = Array.from(yearMap.keys()).sort((a, b) => b - a)

  sortedYears.forEach(year => {
    groups.push({
      year,
      awards: yearMap.get(year)!
    })
  })

  return groups
})

const getAwardCategory = (title: string): string => {
  if (title.toLowerCase().includes('paper')) return t.value.awards.categories.publication
  if (title.toLowerCase().includes('research')) return t.value.awards.categories.research
  if (title.toLowerCase().includes('teaching')) return t.value.awards.categories.teaching
  if (title.toLowerCase().includes('service')) return t.value.awards.categories.service
  if (title.toLowerCase().includes('lifetime') || title.toLowerCase().includes('achievement')) return t.value.awards.categories.career
  return t.value.awards.categories.excellence
}
</script>

<template>
  <div class="space-y-6">
    <!-- Year Group -->
    <div v-for="yearGroup in groupedAwards" :key="yearGroup.year" class="relative bg-white rounded-xl p-4 shadow hover:shadow-md transition-shadow hover:cursor-pointer">
      <!-- Year Header -->
      <div class="flex items-center mb-2">
        <div
          class="flex items-center justify-center w-12 h-12 bg-[#08a4d4] rounded-full text-white font-bold text-lg">
          {{ yearGroup.year }}
        </div>
        <div class="ml-4">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ yearGroup.awards.length }} {{ t.awards.timeline.awardsIn }} {{ yearGroup.year }}
          </h2>
        </div>
      </div>

      <!-- Awards for this year -->
      <div class="ml-12 grid grid-cols-1 gap-2">
        <div v-for="awardData in yearGroup.awards" :key="`${awardData.recipients.map(x => x.member.first_name).concat()}-${awardData.id}`"
          class="bg-white rounded-lg duration-200 p-6 relative">
          <!-- Award Card -->
          <div class="flex items-start w-full">
            <!-- Award Details -->
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                {{ awardData.title }}
              </h3>

              <!-- Recipient -->
              <div v-for="recipient in awardData.recipients" :key="`${recipient.member.first_name}`" class="flex items-center mb-2">
                <svg class="h-4 w-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span class="text-sm font-medium text-gray-700">{{ t.awards.timeline.recipient }}:</span>
                <span class="text-sm text-[#08a4d4] ml-1 font-medium">{{ recipient.member.first_name }},{{ recipient.member.last_name }}</span>
              </div>

              <!-- Organization -->
              <div class="flex items-center mb-3">
                <svg class="h-4 w-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span class="text-sm text-gray-600">{{ awardData.organization }}</span>
              </div>

              <!-- Category/Type -->
              <div class="flex items-center justify-between">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {{ getAwardCategory(awardData.title) }}
                </span>
                <span class="text-xs text-gray-500">{{ awardData.year }}</span>
              </div>
            </div>
          </div>

          <!-- Shine effect for recent awards -->
          <div v-if="awardData.year && awardData.year >= currentYear - 1" class="absolute top-2 right-2">
            <span
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {{ t.awards.timeline.recent }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>