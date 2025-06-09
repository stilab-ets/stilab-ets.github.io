<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import Card from '@/ui/Card.vue'
import Button from '@/ui/Button.vue'

interface Event {
  id: string;
  title: string;
  speaker?: string;
  date: string;
  time?: string;
  location: string;
  type: 'seminar' | 'workshop' | 'conference' | 'defense' | 'meeting' | 'colloquium' | 'masterclass';
  description: string;
  registrationUrl?: string;
  tags: string[];
  isUpcoming: boolean;
  capacity?: number;
  currentRegistrations?: number;
}

interface Props {
  event: Event
  isPast?: boolean
}

const props = defineProps<Props>()
const { t } = useLanguage()

const getTypeColor = (type: Event['type']) => {
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

const getTypeLabel = (type: Event['type']) => {
  const typeKey = type as keyof typeof t.value.events.eventTypes
  return t.value.events.eventTypes[typeKey] || type
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const isCapacityNearFull = () => {
  return props.event.capacity && props.event.currentRegistrations && 
         (props.event.currentRegistrations / props.event.capacity) > 0.8
}

const isCapacityFull = () => {
  return props.event.capacity && props.event.currentRegistrations && 
         props.event.currentRegistrations >= props.event.capacity
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
            getTypeColor(event.type)
          ]">
            {{ getTypeLabel(event.type) }}
          </span>
          <span v-if="!isPast && event.registrationUrl" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {{ t.events.eventCard.registrationOpen }}
          </span>
          <span v-if="!isPast && isCapacityNearFull()" 
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 ml-2">
            {{ t.events.eventCard.limitedSeats }}
          </span>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ event.title }}</h3>
        <div class="flex items-center text-sm text-gray-600 space-x-4">
          <div class="flex items-center">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {{ formatDate(event.date) }}
          </div>
          <div v-if="event.time" class="flex items-center">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ event.time }}
          </div>
          <div class="flex items-center">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ event.location }}
          </div>
        </div>
      </div>
    </div>

    <!-- Speaker -->
    <div v-if="event.speaker" class="mb-4">
      <p class="text-sm text-gray-600">
        <span class="font-medium">{{ t.events.eventCard.speaker }}:</span> {{ event.speaker }}
      </p>
    </div>

    <!-- Capacity info for upcoming events -->
    <div v-if="!isPast && event.capacity && event.currentRegistrations" class="mb-4">
      <div class="flex items-center justify-between text-sm text-gray-600 mb-2">
        <span>{{ t.events.eventCard.registrations }}</span>
        <span>{{ event.currentRegistrations }} / {{ event.capacity }}</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div class="bg-[#08a4d4] h-2 rounded-full" :style="{ width: (event.currentRegistrations / event.capacity * 100) + '%' }"></div>
      </div>
    </div>

    <!-- Description -->
    <p class="text-gray-700 mb-4 leading-relaxed">{{ event.description }}</p>

    <!-- Tags -->
    <div v-if="event.tags.length > 0" class="mb-4">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in event.tags"
          :key="tag"
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Registration Button -->
    <div v-if="!isPast && event.registrationUrl" class="mt-4">
      <Button
        :variant="isCapacityFull() ? 'secondary' : 'primary'"
        :disabled="!!isCapacityFull()"
        @click="() => window.open(event.registrationUrl, '_blank')"
      >
        {{ isCapacityFull() ? t.events.eventCard.full : t.events.eventCard.register }}
        <svg v-if="!isCapacityFull()" class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </Button>
    </div>
  </Card>
</template>