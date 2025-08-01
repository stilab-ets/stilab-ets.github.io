<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useEvents } from '@/hooks/events/useEvents'
import { useMembers } from '@/hooks/members/useMembers'
import { useNavigation } from '@/hooks/layout/useNavigation'
import { useLanguage } from '@/composables/useLanguage'
import Form from '@/components/ui/Form.vue'
import Button from '@/components/ui/Button.vue'

const { t } = useLanguage()
const { createEvent, isLoading, error } = useEvents()
const { members, fetchMembers } = useMembers()
const { navigateToPage } = useNavigation()

onMounted(fetchMembers)

const formData = ref({
  title: '',
  domain: '',
  location: '',
  date: '',
  time: '',
  description: '',
  speaker: '',
  registration_url: '',
  capacity: null as number | null,
  tags: [] as string[],
  tagsString: '',
})

const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})
const successMessage = ref('')

const validateURL = (url: string) =>
  /^https?:\/\/[^\s$.?#].[^\s]*$/.test(url)

const validateForm = () => {
  errors.value = {}

  if (!formData.value.title.trim()) {
    errors.value.title = 'Title is required.'
  }

  if (formData.value.description && formData.value.description.trim().length < 1) {
    errors.value.description = 'Description must be at least 1 character.'
  }

  if (formData.value.location && formData.value.location.trim().length < 1) {
    errors.value.location = 'Location must be at least 1 character.'
  }

  if (!formData.value.domain) {
    errors.value.domain = 'Domain is required.'
  }

  if (!formData.value.speaker) {
    errors.value.speaker = 'Speaker is required.'
  }

  if (formData.value.registration_url && !validateURL(formData.value.registration_url)) {
    errors.value.registration_url = 'Invalid URL format.'
  }

  if (formData.value.capacity !== null) {
    if (formData.value.capacity < 0 || formData.value.capacity > 2147483647) {
      errors.value.capacity = 'Capacity must be between 0 and 2147483647.'
    }
  }

  if (Array.isArray(formData.value.tags)) {
    const invalidTags = formData.value.tags.filter(
      tag => tag.length < 1 || tag.length > 50
    )
    if (invalidTags.length > 0) {
      errors.value.tags = 'Each tag must be between 1 and 50 characters.'
    }
  }

  return Object.keys(errors.value).length === 0
}


const submitForm = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  successMessage.value = ''

  try {
    formData.value.tags = formData.value.tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    const payload = {
      title: formData.value.title,
      domain: formData.value.domain,
      location: formData.value.location,
      date: formData.value.date,
      time: formData.value.time,
      description: formData.value.description,
      speaker_id: formData.value.speaker,
      registration_url: formData.value.registration_url,
      capacity: formData.value.capacity,
      tags: formData.value.tags,
    }

    const success = await createEvent(payload)

    if (success) {
      successMessage.value = 'Event created successfully! Redirecting...'
      setTimeout(() => navigateToPage('dashboard'), 2000)
    } else {
      errors.value.general = error.value || 'Submission failed.'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  } catch (err) {
    console.error('Error creating event:', err)
    errors.value.general = 'Unexpected error occurred.'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } finally {
    isSubmitting.value = false
  }
}

const formError = computed(() => errors.value.general || error.value)
</script>

<template>
  <Form
    :title="'Create Event'"
    :subtitle="'Add a new event to the calendar'"
    :success-message="successMessage"
    :error="formError"
  >
    <form @submit.prevent="submitForm" class="space-y-8">
      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input
          v-model="formData.title"
          type="text"
          class="w-full p-3 border rounded-lg"
          :class="{ 'border-red-500': errors.title }"
        />
        <p v-if="errors.title" class="text-sm text-red-600">{{ errors.title }}</p>
      </div>

      <!-- Domain -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Domain *</label>
        <select v-model="formData.domain" class="w-full p-3 border rounded-lg" :class="{ 'border-red-500': errors.domain }">
          <option value="">Select type</option>
          <option value="SMN">Seminar</option>
          <option value="WRK">Workshop</option>
          <option value="CNF">Conference</option>
          <option value="DFN">Defense</option>
          <option value="MTG">Meeting</option>
          <option value="CLL">Colloquium</option>
          <option value="MST">Masterclass</option>
        </select>
        <p v-if="errors.domain" class="text-sm text-red-600">{{ errors.domain }}</p>
      </div>

      <!-- Location, Date, Time -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input v-model="formData.location" type="text" class="w-full p-3 border rounded-lg" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input v-model="formData.date" type="date" class="w-full p-3 border rounded-lg" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Time</label>
          <input v-model="formData.time" type="time" class="w-full p-3 border rounded-lg" />
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea v-model="formData.description" rows="4" class="w-full p-3 border rounded-lg"></textarea>
      </div>

      <!-- Speaker -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Speaker *</label>
        <select
          v-model="formData.speaker"
          class="w-full p-3 border rounded-lg"
          :class="{ 'border-red-500': errors.speaker }"
        >
          <option value="">Select a speaker</option>
          <option v-for="member in members" :key="member.id" :value="member.id">
            {{ member.first_name }} {{ member.last_name }}
          </option>
        </select>
        <p v-if="errors.speaker" class="text-sm text-red-600">{{ errors.speaker }}</p>
      </div>

      <!-- Registration URL + Capacity -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Registration URL</label>
          <input
            v-model="formData.registration_url"
            type="url"
            class="w-full p-3 border rounded-lg"
            :class="{ 'border-red-500': errors.registration_url }"
          />
          <p v-if="errors.registration_url" class="text-sm text-red-600">
            {{ errors.registration_url }}
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
          <input v-model.number="formData.capacity" type="number" min="1" class="w-full p-3 border rounded-lg" />
        </div>
      </div>

      <!-- Tags -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
        <input
          v-model="formData.tagsString"
          type="text"
          class="w-full p-3 border rounded-lg"
          :class="{ 'border-red-500': errors.tags }"
        />
        <p v-if="errors.tags" class="text-sm text-red-600">{{ errors.tags }}</p>
      </div>

      <!-- Actions -->
      <div class="flex flex-col md:flex-row justify-between gap-4 pt-6">
        <Button type="submit" :disabled="isSubmitting || isLoading" class="w-full md:w-auto">
          <span v-if="isSubmitting || isLoading">Submitting...</span>
          <span v-else>Create Event</span>
        </Button>
        <Button type="button" variant="secondary" class="w-full md:w-auto" @click="navigateToPage('events')">
          Cancel
        </Button>
      </div>
    </form>
  </Form>
</template>
