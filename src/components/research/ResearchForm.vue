<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'

interface Props {
  isEditing?: boolean
  initialData?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
  initialData: () => ({})
})

const emit = defineEmits<{
  submit: [data: Record<string, any>]
  cancel: []
}>()

const { t } = useLanguage()

// Form state
const formData = ref({
  title: '',
  domain: '',
  status: 'planned',
  description: '',
  objectives: '',
  methodology: '',
  leader: '',
  participants: [] as string[],
  startDate: '',
  endDate: '',
  budget: '',
  funding: '',
  githubUrl: '',
  websiteUrl: ''
})

const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)
const generalError = ref('')

// Mock data for dropdowns
const mockMembers = [
  { id: '1', name: 'Dr. Marie Dubois' },
  { id: '2', name: 'Prof. Jean Martin' },
  { id: '3', name: 'Dr. Sarah Chen' },
  { id: '4', name: 'Alex Rodriguez' }
]

// Initialize form with initial data
watch(() => props.initialData, (newData) => {
  if (newData) {
    Object.assign(formData.value, newData)
  }
}, { immediate: true })

// Validation
const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.title.trim()) {
    errors.value.title = t.value.forms.research.validation.titleRequired
  }
  
  if (!formData.value.domain) {
    errors.value.domain = t.value.forms.research.validation.domainRequired
  }
  
  if (!formData.value.status) {
    errors.value.status = t.value.forms.research.validation.statusRequired
  }
  
  if (!formData.value.description.trim()) {
    errors.value.description = t.value.forms.research.validation.descriptionRequired
  }
  
  if (!formData.value.leader) {
    errors.value.leader = t.value.forms.research.validation.leaderRequired
  }
  
  if (!formData.value.startDate) {
    errors.value.startDate = t.value.forms.research.validation.startDateRequired
  }
  
  if (formData.value.endDate && formData.value.startDate && 
      new Date(formData.value.endDate) <= new Date(formData.value.startDate)) {
    errors.value.endDate = t.value.forms.research.validation.endDateAfterStart
  }
  
  return Object.keys(errors.value).length === 0
}

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  generalError.value = ''
  
  try {
    emit('submit', { ...formData.value })
  } catch (error) {
    generalError.value = t.value.forms.research.errors.submitFailed
  } finally {
    isSubmitting.value = false
  }
}

const handleCancel = () => {
  emit('cancel')
}

const formTitle = computed(() => 
  props.isEditing 
    ? t.value.forms.research.titleEdit 
    : t.value.forms.research.titleCreate
)

const submitButtonText = computed(() =>
  props.isEditing
    ? t.value.forms.research.form.update
    : t.value.forms.research.form.create
)
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">{{ formTitle }}</h1>
      <p class="text-lg text-gray-600 mt-2">{{ t.forms.research.subtitle }}</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <!-- Basic Information -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.research.sections.basic }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.research.form.title }}
            </label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              :placeholder="t.forms.research.form.titlePlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.title }"
            />
            <p v-if="errors.title" class="text-red-600 text-sm mt-1">
              {{ errors.title }}
            </p>
          </div>

          <div>
            <label for="domain" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.research.form.domain }}
            </label>
            <select
              id="domain"
              v-model="formData.domain"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.domain }"
            >
              <option value="">{{ t.forms.research.form.selectDomain }}</option>
              <option value="software-architecture">{{ t.forms.research.domains.softwareArchitecture }}</option>
              <option value="artificial-intelligence">{{ t.forms.research.domains.artificialIntelligence }}</option>
              <option value="cybersecurity">{{ t.forms.research.domains.cybersecurity }}</option>
              <option value="devops">{{ t.forms.research.domains.devops }}</option>
              <option value="cloud-computing">{{ t.forms.research.domains.cloudComputing }}</option>
              <option value="software-testing">{{ t.forms.research.domains.softwareTesting }}</option>
              <option value="distributed-systems">{{ t.forms.research.domains.distributedSystems }}</option>
              <option value="blockchain">{{ t.forms.research.domains.blockchain }}</option>
            </select>
            <p v-if="errors.domain" class="text-red-600 text-sm mt-1">
              {{ errors.domain }}
            </p>
          </div>

          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.research.form.status }}
            </label>
            <select
              id="status"
              v-model="formData.status"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.status }"
            >
              <option value="">{{ t.forms.research.form.selectStatus }}</option>
              <option value="planned">{{ t.forms.research.statuses.planned }}</option>
              <option value="active">{{ t.forms.research.statuses.active }}</option>
              <option value="completed">{{ t.forms.research.statuses.completed }}</option>
            </select>
            <p v-if="errors.status" class="text-red-600 text-sm mt-1">
              {{ errors.status }}
            </p>
          </div>
        </div>
      </Card>

      <!-- Project Description -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.research.sections.description }}
        </h2>
        
        <div class="space-y-6">
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.research.form.description }}
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="4"
              :placeholder="t.forms.research.form.descriptionPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.description }"
            />
            <p v-if="errors.description" class="text-red-600 text-sm mt-1">
              {{ errors.description }}
            </p>
          </div>

          <div>
            <label for="objectives" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.research.form.objectives }}
            </label>
            <textarea
              id="objectives"
              v-model="formData.objectives"
              rows="3"
              :placeholder="t.forms.research.form.objectivesPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="methodology" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.research.form.methodology }}
            </label>
            <textarea
              id="methodology"
              v-model="formData.methodology"
              rows="3"
              :placeholder="t.forms.research.form.methodologyPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      <!-- Team Members -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.research.sections.team }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="leader" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.research.form.leader }}
            </label>
            <select
              id="leader"
              v-model="formData.leader"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.leader }"
            >
              <option value="">{{ t.forms.research.form.selectLeader }}</option>
              <option v-for="member in mockMembers" :key="member.id" :value="member.id">
                {{ member.name }}
              </option>
            </select>
            <p v-if="errors.leader" class="text-red-600 text-sm mt-1">
              {{ errors.leader }}
            </p>
          </div>

          <div>
            <label for="participants" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.research.form.participants }}
            </label>
            <select
              id="participants"
              v-model="formData.participants"
              multiple
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option v-for="member in mockMembers" :key="member.id" :value="member.id">
                {{ member.name }}
              </option>
            </select>
            <p class="text-gray-500 text-sm mt-1">
              {{ t.forms.research.form.selectParticipants }}
            </p>
          </div>
        </div>
      </Card>

      <!-- Resources & Funding -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.research.sections.resources }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="budget" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.research.form.budget }}
            </label>
            <input
              id="budget"
              v-model="formData.budget"
              type="text"
              :placeholder="t.forms.research.form.budgetPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="funding" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.research.form.funding }}
            </label>
            <input
              id="funding"
              v-model="formData.funding"
              type="text"
              :placeholder="t.forms.research.form.fundingPlaceholder"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="githubUrl" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.research.form.githubUrl }}
            </label>
            <input
              id="githubUrl"
              v-model="formData.githubUrl"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label for="websiteUrl" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.research.form.websiteUrl }}
            </label>
            <input
              id="websiteUrl"
              v-model="formData.websiteUrl"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      <!-- Timeline -->
      <Card>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
          {{ t.forms.research.sections.timeline }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="startDate" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.research.form.startDate }}
            </label>
            <input
              id="startDate"
              v-model="formData.startDate"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.startDate }"
            />
            <p v-if="errors.startDate" class="text-red-600 text-sm mt-1">
              {{ errors.startDate }}
            </p>
          </div>

          <div>
            <label for="endDate" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.forms.research.form.endDate }}
            </label>
            <input
              id="endDate"
              v-model="formData.endDate"
              type="date"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': errors.endDate }"
            />
            <p v-if="errors.endDate" class="text-red-600 text-sm mt-1">
              {{ errors.endDate }}
            </p>
          </div>
        </div>
      </Card>

      <!-- Error Display -->
      <div v-if="generalError" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-800">{{ generalError }}</p>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          @click="handleCancel"
          :disabled="isSubmitting"
        >
          {{ t.forms.research.form.cancel }}
        </Button>
        
        <Button
          type="submit"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? t.forms.research.form.submitting : submitButtonText }}
        </Button>
      </div>
    </form>
  </div>
</template>