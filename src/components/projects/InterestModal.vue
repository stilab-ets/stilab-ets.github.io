<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import type { MScProject } from '@/data/mockPublications'
import Button from '@/ui/Button.vue'

interface Props {
  isOpen: boolean
  project: MScProject | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const { t } = useLanguage()

// Interest form data
const interestForm = ref({
  name: '',
  email: '',
  level: '',
  motivation: ''
})

// Watch for modal open/close to reset form
watch(() => props.isOpen, (isOpen) => {
  if (!isOpen) {
    // Reset form when modal closes
    interestForm.value = {
      name: '',
      email: '',
      level: '',
      motivation: ''
    }
  }
})

const closeModal = () => {
  emit('close')
}

const submitInterest = () => {
  // Here you would typically send the form data to your backend
  console.log('Submitting interest for project:', props.project?.title)
  console.log('Form data:', interestForm.value)

  // Show success message (in a real app, you'd handle this properly)
  alert('Votre demande a été envoyée avec succès ! Le superviseur vous contactera bientôt.')
  closeModal()
}
</script>

<template>
  <div 
    v-if="isOpen && project" 
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    @click="closeModal"
  >
    <div 
      class="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white"
      @click.stop
    >
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b">
        <h2 class="text-xl font-bold text-gray-900">{{ t.projects.interestModal.title }}</h2>
        <Button variant="ghost" size="sm" @click="closeModal" class="hover:cursor-pointer">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      </div>

      <!-- Modal Content -->
      <div class="mt-4">
        <p class="text-sm text-gray-600 mb-4">
          {{ t.projects.interestModal.projectLabel }}: <strong>{{ project.title }}</strong>
        </p>

        <form @submit.prevent="submitInterest" class="space-y-4">
          <div>
            <label for="student-name" class="block text-sm font-medium text-gray-700">
              {{ t.projects.interestModal.fullName }} *
            </label>
            <input 
              id="student-name" 
              v-model="interestForm.name" 
              type="text" 
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]"
              :placeholder="t.projects.interestModal.fullNamePlaceholder" 
            />
          </div>

          <div>
            <label for="student-email" class="block text-sm font-medium text-gray-700">
              {{ t.projects.interestModal.email }} *
            </label>
            <input 
              id="student-email" 
              v-model="interestForm.email" 
              type="email" 
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]"
              :placeholder="t.projects.interestModal.emailPlaceholder" 
            />
          </div>

          <div>
            <label for="student-level" class="block text-sm font-medium text-gray-700">
              {{ t.projects.interestModal.studyLevel }} *
            </label>
            <select 
              id="student-level" 
              v-model="interestForm.level" 
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]"
            >
              <option value="">{{ t.projects.interestModal.selectLevel }}</option>
              <option value="M1">{{ t.projects.interestModal.master1 }}</option>
              <option value="M2">{{ t.projects.interestModal.master2 }}</option>
            </select>
          </div>

          <div>
            <label for="motivation" class="block text-sm font-medium text-gray-700">
              {{ t.projects.interestModal.motivation }} *
            </label>
            <textarea 
              id="motivation" 
              v-model="interestForm.motivation" 
              rows="4" 
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]"
              :placeholder="t.projects.interestModal.motivationPlaceholder"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" @click="closeModal" class="hover:cursor-pointer">
              {{ t.projects.interestModal.cancel }}
            </Button>
            <Button type="submit" class="hover:cursor-pointer">
              {{ t.projects.interestModal.submit }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>