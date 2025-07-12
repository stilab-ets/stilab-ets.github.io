<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLanguage } from '../../composables/useLanguage'

interface Props {
  isEdit?: boolean
  researchId?: string
  initialData?: {
    title: string
    description: string
    domain: string
    status: string
    leadResearcher: string
    participants: string[]
    startDate: string
    endDate?: string
    funding?: string
    githubUrl?: string
    websiteUrl?: string
    publications?: string[]
    keyAchievements?: string[]
    technologies?: string[]
  }
}

const props = withDefaults(defineProps<Props>(), {
  isEdit: false
})

const emit = defineEmits<{
  submit: [data: any]
  cancel: []
}>()

const { t: translations } = useLanguage()
const t = computed(() => translations.value.forms.research)

const formData = ref({
  title: props.initialData?.title || '',
  description: props.initialData?.description || '',
  domain: props.initialData?.domain || '',
  status: props.initialData?.status || 'active',
  leadResearcher: props.initialData?.leadResearcher || '',
  participants: props.initialData?.participants || [],
  startDate: props.initialData?.startDate || '',
  endDate: props.initialData?.endDate || '',
  funding: props.initialData?.funding || '',
  githubUrl: props.initialData?.githubUrl || '',
  websiteUrl: props.initialData?.websiteUrl || '',
  publications: props.initialData?.publications || [],
  keyAchievements: props.initialData?.keyAchievements || [''],
  technologies: props.initialData?.technologies || ['']
})

const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

const domains = [
  'softwareArchitecture',
  'machineLearning', 
  'cybersecurity',
  'distributedSystems',
  'devops',
  'blockchain',
  'uiUx',
  'dataScience'
] as const

const statuses = ['planned', 'active', 'completed'] as const

const newParticipant = ref('')
const newPublication = ref('')

const addParticipant = () => {
  if (newParticipant.value.trim()) {
    formData.value.participants.push(newParticipant.value.trim())
    newParticipant.value = ''
  }
}

const removeParticipant = (index: number) => {
  formData.value.participants.splice(index, 1)
}

const addPublication = () => {
  if (newPublication.value.trim()) {
    formData.value.publications.push(newPublication.value.trim())
    newPublication.value = ''
  }
}

const removePublication = (index: number) => {
  formData.value.publications.splice(index, 1)
}

const addAchievement = () => {
  formData.value.keyAchievements.push('')
}

const removeAchievement = (index: number) => {
  formData.value.keyAchievements.splice(index, 1)
}

const addTechnology = () => {
  formData.value.technologies.push('')
}

const removeTechnology = (index: number) => {
  formData.value.technologies.splice(index, 1)
}

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.title.trim()) {
    errors.value.title = t.forms.project.validation.titleRequired
  }
  
  if (!formData.value.description.trim()) {
    errors.value.description = t.forms.project.validation.descriptionRequired
  }
  
  if (!formData.value.domain) {
    errors.value.domain = t.forms.project.validation.domainRequired
  }
  
  if (!formData.value.leadResearcher.trim()) {
    errors.value.leadResearcher = t.forms.project.validation.supervisorRequired
  }
  
  if (!formData.value.startDate) {
    errors.value.startDate = t.forms.project.validation.startDateRequired
  }
  
  if (formData.value.endDate && formData.value.startDate && formData.value.endDate <= formData.value.startDate) {
    errors.value.endDate = t.forms.project.validation.endDateAfterStart
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  try {
    // Filter out empty achievements and technologies
    const cleanData = {
      ...formData.value,
      keyAchievements: formData.value.keyAchievements.filter(a => a.trim()),
      technologies: formData.value.technologies.filter(t => t.trim())
    }
    emit('submit', cleanData)
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <PageHeader
      :title="isEdit ? 'Edit Research Project' : 'Create New Research Project'"
      :subtitle="isEdit ? 'Update research project information' : 'Add a new research project to the laboratory'"
      :highlight-word="isEdit ? 'Edit' : 'Create'"
    />

    <Card class="mt-8">
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Basic Information -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            {{ t.forms.project.sections.basic }}
          </h3>
          <div class="space-y-6">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.project.form.title }}
              </label>
              <input
                id="title"
                v-model="formData.title"
                type="text"
                :placeholder="t.forms.project.form.titlePlaceholder"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.title }"
              />
              <p v-if="errors.title" class="mt-1 text-sm text-red-600">
                {{ errors.title }}
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label for="domain" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.forms.project.form.domain }}
                </label>
                <select
                  id="domain"
                  v-model="formData.domain"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                  :class="{ 'border-red-500': errors.domain }"
                >
                  <option value="">{{ t.forms.project.form.selectDomain }}</option>
                  <option v-for="domain in domains" :key="domain" :value="domain">
                    {{ t.forms.project.domains[domain] }}
                  </option>
                </select>
                <p v-if="errors.domain" class="mt-1 text-sm text-red-600">
                  {{ errors.domain }}
                </p>
              </div>

              <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.forms.project.form.status }}
                </label>
                <select
                  id="status"
                  v-model="formData.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                >
                  <option v-for="status in statuses" :key="status" :value="status">
                    {{ t.forms.project.statuses[status] }}
                  </option>
                </select>
              </div>

              <div>
                <label for="leadResearcher" class="block text-sm font-medium text-gray-700 mb-2">
                  Lead Researcher
                </label>
                <input
                  id="leadResearcher"
                  v-model="formData.leadResearcher"
                  type="text"
                  placeholder="Principal investigator"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                  :class="{ 'border-red-500': errors.leadResearcher }"
                />
                <p v-if="errors.leadResearcher" class="mt-1 text-sm text-red-600">
                  {{ errors.leadResearcher }}
                </p>
              </div>
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.project.form.description }}
              </label>
              <textarea
                id="description"
                v-model="formData.description"
                rows="4"
                :placeholder="t.forms.project.form.descriptionPlaceholder"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.description }"
              ></textarea>
              <p v-if="errors.description" class="mt-1 text-sm text-red-600">
                {{ errors.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- Timeline & Funding -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            {{ t.forms.project.sections.timeline }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label for="startDate" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.project.form.startDate }}
              </label>
              <input
                id="startDate"
                v-model="formData.startDate"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.startDate }"
              />
              <p v-if="errors.startDate" class="mt-1 text-sm text-red-600">
                {{ errors.startDate }}
              </p>
            </div>

            <div>
              <label for="endDate" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.project.form.endDate }}
              </label>
              <input
                id="endDate"
                v-model="formData.endDate"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.endDate }"
              />
              <p v-if="errors.endDate" class="mt-1 text-sm text-red-600">
                {{ errors.endDate }}
              </p>
            </div>

            <div>
              <label for="funding" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.project.form.funding }}
              </label>
              <input
                id="funding"
                v-model="formData.funding"
                type="text"
                :placeholder="t.forms.project.form.fundingPlaceholder"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>
          </div>
        </div>

        <!-- Participants -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Project Participants
          </h3>
          <div class="space-y-4">
            <div class="flex space-x-2">
              <input
                v-model="newParticipant"
                type="text"
                placeholder="Add participant name"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                @keyup.enter="addParticipant"
              />
              <Button type="button" @click="addParticipant">
                Add
              </Button>
            </div>
            
            <div v-if="formData.participants.length > 0" class="flex flex-wrap gap-2">
              <span
                v-for="(participant, index) in formData.participants"
                :key="index"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {{ participant }}
                <button
                  type="button"
                  @click="removeParticipant(index)"
                  class="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            </div>
          </div>
        </div>

        <!-- Key Achievements -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Key Achievements
          </h3>
          <div class="space-y-3">
            <div
              v-for="(achievement, index) in formData.keyAchievements"
              :key="index"
              class="flex space-x-2"
            >
              <input
                v-model="formData.keyAchievements[index]"
                type="text"
                placeholder="Describe a key achievement or milestone"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
              <Button
                type="button"
                variant="secondary"
                @click="removeAchievement(index)"
              >
                Remove
              </Button>
            </div>
            <Button type="button" variant="secondary" @click="addAchievement">
              Add Achievement
            </Button>
          </div>
        </div>

        <!-- Technologies -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Technologies Used
          </h3>
          <div class="space-y-3">
            <div
              v-for="(technology, index) in formData.technologies"
              :key="index"
              class="flex space-x-2"
            >
              <input
                v-model="formData.technologies[index]"
                type="text"
                placeholder="Technology, framework, or tool"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
              <Button
                type="button"
                variant="secondary"
                @click="removeTechnology(index)"
              >
                Remove
              </Button>
            </div>
            <Button type="button" variant="secondary" @click="addTechnology">
              Add Technology
            </Button>
          </div>
        </div>

        <!-- Related Publications -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Related Publications
          </h3>
          <div class="space-y-4">
            <div class="flex space-x-2">
              <input
                v-model="newPublication"
                type="text"
                placeholder="Publication title or DOI"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                @keyup.enter="addPublication"
              />
              <Button type="button" @click="addPublication">
                Add
              </Button>
            </div>
            
            <div v-if="formData.publications.length > 0" class="space-y-2">
              <div
                v-for="(publication, index) in formData.publications"
                :key="index"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <span class="text-sm">{{ publication }}</span>
                <button
                  type="button"
                  @click="removePublication(index)"
                  class="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            {{ t.forms.project.sections.additional }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="githubUrl" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.project.form.githubUrl }}
              </label>
              <input
                id="githubUrl"
                v-model="formData.githubUrl"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>

            <div>
              <label for="websiteUrl" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.forms.project.form.websiteUrl }}
              </label>
              <input
                id="websiteUrl"
                v-model="formData.websiteUrl"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            @click="emit('cancel')"
          >
            {{ t.forms.project.form.cancel }}
          </Button>
          <Button
            type="submit"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? t.forms.project.form.submitting : (isEdit ? t.forms.project.form.update : t.forms.project.form.create) }}
          </Button>
        </div>
      </form>
    </Card>
  </div>
</template>