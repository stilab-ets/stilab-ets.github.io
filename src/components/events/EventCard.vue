<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useBrowserUtils } from '@/composables/useBrowserUtils'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import type { Event } from '@/services/MainAPI'

interface Props {
  eventData: Event
  isPast?: boolean
}

const props = defineProps<Props>()
const { t } = useLanguage()
const { openUrl } = useBrowserUtils()

// Provide fallback values for translations
const getTranslation = (path: string, fallback: string) => {
  try {
    const parts = path.split('.')
    let result: any = t.value
    for (const part of parts) {
      if (result && typeof result === 'object' && part in result) {
        result = result[part]
      } else {
        return fallback
      }
    }
    return result || fallback
  } catch {
    return fallback
  }
}

const getTypeColor = (type: Event['type']): string => {
  const colors: Record<Event['type'], string> = {
    seminar: 'bg-blue-100 text-blue-800',
    workshop: 'bg-green-100 text-green-800',
    conference: 'bg-purple-100 text-purple-800',
    defense: 'bg-red-100 text-red-800',
    meeting: 'bg-yellow-100 text-yellow-800',
    colloquium: 'bg-indigo-100 text-indigo-800',
    masterclass: 'bg-pink-100 text-pink-800'
  }
  return colors[type] || 'bg-gray-100 text-gray-800'
}

const getTypeLabel = (type: Event['type']): string => {
  return getTranslation(`events.eventTypes.${type}`, type)
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Format speaker name from Member object or string
const speakerName = computed((): string => {
  if (!props.eventData.speaker) return ''
  
  if (typeof props.eventData.speaker === 'string') {
    return props.eventData.speaker
  }
  
  // Speaker is Member object
  return `${props.eventData.speaker.first_name} ${props.eventData.speaker.last_name}`
})

const isCapacityNearFull = computed((): boolean => {
  const current = props.eventData.current_registrations || props.eventData.currentRegistrations
  return !!(props.eventData.capacity && current && 
           (current / props.eventData.capacity) > 0.8)
})

const isCapacityFull = computed((): boolean => {
  const current = props.eventData.current_registrations || props.eventData.currentRegistrations
  return !!(props.eventData.capacity && current && 
           current >= props.eventData.capacity)
})

const capacityPercentage = computed((): number => {
  const current = props.eventData.current_registrations || props.eventData.currentRegistrations
  if (!props.eventData.capacity || !current) return 0
  return (current / props.eventData.capacity) * 100
})

const openRegistrationLink = (): void => {
  const url = props.eventData.registration_url || props.eventData.registrationUrl
  if (url) {
    openUrl(url)
  }
}
</script>

<template>
  <Card variant="hover">
    <!-- Event Header -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <div class="flex items-center mb-2">
          <span :class="[
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-3',
            getTypeColor(eventData.domain)
          ]">
            {{ getTypeLabel(eventData.domain) }}
          </span>
          <span v-if="!isPast && (eventData.registration_url || eventData.registrationUrl)" 
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {{ getTranslation('events.eventCard.registrationOpen', 'Registration Open') }}
          </span>
          <span v-if="!isPast && isCapacityNearFull" 
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 ml-2">
            {{ getTranslation('events.eventCard.limitedSeats', 'Limited Seats') }}
          </span>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ eventData.title }}</h3>
        <div class="flex items-center text-sm text-gray-600 space-x-4" v-if="eventData.date">
          <div class="flex items-center">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(eventData.date) }}
          </div>
          <div v-if="eventData.time" class="flex items-center">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ eventData.time }}
          </div>
          <div v-if="eventData.location" class="flex items-center">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ eventData.location }}
          </div>
        </div>
      </div>
    </div>

    <!-- Speaker -->
    <div v-if="speakerName" class="mb-4">
      <p class="text-sm text-gray-600">
        <span class="font-medium">{{ getTranslation('events.eventCard.speaker', 'Speaker') }}:</span> {{ speakerName }}
      </p>
    </div>

    <!-- Capacity info for upcoming events -->
    <div v-if="!isPast && eventData.capacity && (eventData.current_registrations || eventData.currentRegistrations)" class="mb-4">
      <div class="flex items-center justify-between text-sm text-gray-600 mb-2">
        <span>{{ getTranslation('events.eventCard.registrations', 'Registrations') }}</span>
        <span>{{ eventData.current_registrations || eventData.currentRegistrations }} / {{ eventData.capacity }}</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div class="bg-[#08a4d4] h-2 rounded-full" :style="{ width: capacityPercentage + '%' }"></div>
      </div>
    </div>

    <!-- Description -->
    <p v-if="eventData.description" class="text-gray-700 mb-4 leading-relaxed">{{ eventData.description }}</p>

    <!-- Tags -->
    <div v-if="eventData.tags && eventData.tags.length > 0" class="mb-4">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in eventData.tags"
          :key="tag"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Registration Button -->
    <div v-if="!isPast && (eventData.registration_url || eventData.registrationUrl)" class="mt-4">
      <Button
        :variant="isCapacityFull ? 'secondary' : 'primary'"
        :disabled="isCapacityFull"
        @click="openRegistrationLink"
        class="w-full"
      >
        <template v-if="isCapacityFull">
          {{ getTranslation('events.eventCard.capacityFull', 'Capacity Full') }}
        </template>
        <template v-else>
          {{ getTranslation('events.eventCard.register', 'Register') }}
        </template>
      </Button>
    </div>
  </Card>
</template>
