<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import Card from '@/ui/Card.vue'

interface AwardWithMember {
  member: string;
  award: {
    id: string;
    title: string;
    year: number;
    organization: string;
    icon: string;
  };
  description?: string;
}

interface Props {
  allAwards: AwardWithMember[]
}

const props = defineProps<Props>()
const { t } = useLanguage()

// Award statistics
const bestPaperAwards = computed(() => {
  return props.allAwards.filter(a =>
    a.award.title.toLowerCase().includes('best paper') ||
    a.award.title.toLowerCase().includes('paper award')
  ).length
})

const researchExcellenceAwards = computed(() => {
  return props.allAwards.filter(a =>
    a.award.title.toLowerCase().includes('excellence') ||
    a.award.title.toLowerCase().includes('distinguished') ||
    a.award.title.toLowerCase().includes('achievement')
  ).length
})

const industryAwards = computed(() => {
  return props.allAwards.filter(a =>
    a.award.organization.toLowerCase().includes('industry') ||
    a.award.organization.toLowerCase().includes('ieee') ||
    a.award.organization.toLowerCase().includes('acm')
  ).length
})

const achievementData = computed(() => [
  {
    icon: '📄',
    title: t.value.awards.notable.bestPaperAwards,
    count: bestPaperAwards.value,
    description: t.value.awards.notable.bestPaperDescription,
    bgClass: 'bg-gradient-to-br from-blue-50 to-indigo-50'
  },
  {
    icon: '🔬',
    title: t.value.awards.notable.researchExcellence,
    count: researchExcellenceAwards.value,
    description: t.value.awards.notable.researchExcellenceDescription,
    bgClass: 'bg-gradient-to-br from-green-50 to-emerald-50'
  },
  {
    icon: '🏭',
    title: t.value.awards.notable.industryRecognition,
    count: industryAwards.value,
    description: t.value.awards.notable.industryRecognitionDescription,
    bgClass: 'bg-gradient-to-br from-purple-50 to-pink-50'
  }
])
</script>

<template>
  <Card>
    <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ t.awards.notable.sectionTitle }}</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="achievement in achievementData" 
        :key="achievement.title"
        :class="['text-center p-6 rounded-lg', achievement.bgClass]"
      >
        <div class="text-4xl mb-4">{{ achievement.icon }}</div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ achievement.title }}</h3>
        <p class="text-3xl font-bold text-[#08a4d4] mb-2">{{ achievement.count }}</p>
        <p class="text-sm text-gray-600">{{ achievement.description }}</p>
      </div>
    </div>
  </Card>
</template>