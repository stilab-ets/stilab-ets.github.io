<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { XCircleIcon, XIcon, PlusIcon } from 'lucide-vue-next'
import { useLanguage } from '@/composables/useLanguage'

interface ProjectForm {
  projectType: 'research' | 'msc'
  title: string
  domain: string
  difficulty: string
  status: string
  description: string
  supervisor: string
  coSupervisor: string
  requirements: string[]
  objectives: string[]
  startDate: string
  endDate: string
  funding: string
  githubUrl: string
  websiteUrl: string
}

interface ProjectErrors {
  [key: string]: string
}

interface Supervisor {
  id: string
  name: string
}

const props = defineProps<{
  initialData?: Partial<ProjectForm>
  isEditing?: boolean
}>()

const emit = defineEmits<{
  submit: [data: ProjectForm]
  cancel: []
}>()

const { t: translations } = useLanguage()
const t = computed(() => translations.value.forms.project)

const form = reactive<ProjectForm>({
  projectType: 'msc',
  title: '',
  domain: '',
  difficulty: '',
  status: 'planned',
  description: '',
  supervisor: '',
  coSupervisor: '',
  requirements: [],
  objectives: [],
  startDate: '',
  endDate: '',
  funding: '',
  githubUrl: '',
  websiteUrl: '',
  ...props.initialData
})

const errors = ref<ProjectErrors>({})
const generalError = ref<string>('')
const isSubmitting = ref(false)
const supervisors = ref<Supervisor[]>([])
const newRequirement = ref('')
const newObjective = ref('')

const validateForm = (): boolean => {
  errors.value = {}
  
  if (!form.title.trim()) {
    errors.value.title = t.value.validation.titleRequired
  }
  
  if (!form.domain) {
    errors.value.domain = t.value.validation.domainRequired
  }
  
  if (!form.description.trim()) {
    errors.value.description = t.value.validation.descriptionRequired
  }
  
  if (!form.supervisor) {
    errors.value.supervisor = t.value.validation.supervisorRequired
  }
  
  if (!form.startDate) {
    errors.value.startDate = t.value.validation.startDateRequired
  }
  
  if (form.endDate && form.startDate) {
    const startDate = new Date(form.startDate)
    const endDate = new Date(form.endDate)
    
    if (endDate <= startDate) {
      errors.value.endDate = t.value.validation.endDateAfterStart
    }
  }
  
  return Object.keys(errors.value).length === 0
}

const addRequirement = () => {
  const req = newRequirement.value.trim()
  if (req && !form.requirements.includes(req)) {
    form.requirements.push(req)
    newRequirement.value = ''
  }
}

const removeRequirement = (index: number) => {
  form.requirements.splice(index, 1)
}

const addObjective = () => {
  const obj = newObjective.value.trim()
  if (obj && !form.objectives.includes(obj)) {
    form.objectives.push(obj)
    newObjective.value = ''
  }
}

const removeObjective = (index: number) => {
  form.objectives.splice(index, 1)
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  generalError.value = ''
  
  try {
    emit('submit', { ...form })
  } catch (error) {
    generalError.value = t.value.errors.submitFailed
  } finally {
    isSubmitting.value = false
  }
}

// Mock supervisors - replace with actual API call
onMounted(() => {
  supervisors.value = [
    { id: '1', name: 'Dr. Marie Dubois' },
    { id: '2', name: 'Prof. Jean Martin' },
    { id: '3', name: 'Dr. Sarah Chen' }
  ]
})
</script>

<template>
  <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
    <div class="px-6 py-4 border-b border-gray-200">
      <h2 class="text-2xl font-bold text-gray-900">
        {{ isEditing ? t.titleEdit : t.titleCreate }}
      </h2>
      <p class="mt-1 text-sm text-gray-600">
        {{ t.subtitle }}
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="p-6">
      <div class="space-y-8">
        <!-- Project Type -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.sections.type }}</h3>
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div class="flex items-center">
              <input
                id="research"
                type="radio"
                value="research"
                v-model="form.projectType"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label for="research" class="ml-2 block text-sm text-gray-900">
                {{ t.projectTypes.research }}
              </label>
            </div>
            
            <div class="flex items-center">
              <input
                id="msc"
                type="radio"
                value="msc"
                v-model="form.projectType"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label for="msc" class="ml-2 block text-sm text-gray-900">
                {{ t.projectTypes.msc }}
              </label>
            </div>
          </div>
        </div>

        <!-- Basic Information -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.sections.basic }}</h3>
          
          <div class="space-y-6">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.form.title }}
              </label>
              <input
                id="title"
                type="text"
                v-model="form.title"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.title }"
                :placeholder="t.form.titlePlaceholder"
              />
              <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
            </div>

            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label for="domain" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.form.domain }}
                </label>
                <select
                  id="domain"
                  v-model="form.domain"
                  required
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  :class="{ 'border-red-500': errors.domain }"
                >
                  <option value="">{{ t.form.selectDomain }}</option>
                  <option value="software-architecture">{{ t.domains.softwareArchitecture }}</option>
                  <option value="machine-learning">{{ t.domains.machineLearning }}</option>
                  <option value="cybersecurity">{{ t.domains.cybersecurity }}</option>
                  <option value="distributed-systems">{{ t.domains.distributedSystems }}</option>
                  <option value="devops">{{ t.domains.devops }}</option>
                  <option value="blockchain">{{ t.domains.blockchain }}</option>
                  <option value="ui-ux">{{ t.domains.uiUx }}</option>
                  <option value="data-science">{{ t.domains.dataScience }}</option>
                </select>
                <p v-if="errors.domain" class="mt-1 text-sm text-red-600">{{ errors.domain }}</p>
              </div>

              <div v-if="form.projectType === 'msc'">
                <label for="difficulty" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.form.difficulty }}
                </label>
                <select
                  id="difficulty"
                  v-model="form.difficulty"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">{{ t.form.selectDifficulty }}</option>
                  <option value="beginner">{{ t.difficulties.beginner }}</option>
                  <option value="intermediate">{{ t.difficulties.intermediate }}</option>
                  <option value="advanced">{{ t.difficulties.advanced }}</option>
                </select>
              </div>

              <div v-if="form.projectType === 'research'">
                <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.form.status }}
                </label>
                <select
                  id="status"
                  v-model="form.status"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="planned">{{ t.statuses.planned }}</option>
                  <option value="active">{{ t.statuses.active }}</option>
                  <option value="completed">{{ t.statuses.completed }}</option>
                </select>
              </div>
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
                {{ form.projectType === 'msc' ? t.form.abstract : t.form.description }}
              </label>
              <textarea
                id="description"
                rows="5"
                v-model="form.description"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.description }"
                :placeholder="form.projectType === 'msc' ? t.form.abstractPlaceholder : t.form.descriptionPlaceholder"
              ></textarea>
              <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
            </div>
          </div>
        </div>

        <!-- Supervision -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.sections.supervision }}</h3>
          
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="supervisor" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.form.supervisor }}
              </label>
              <select
                id="supervisor"
                v-model="form.supervisor"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.supervisor }"
              >
                <option value="">{{ t.form.selectSupervisor }}</option>
                <option v-for="member in supervisors" :key="member.id" :value="member.id">
                  {{ member.name }}
                </option>
              </select>
              <p v-if="errors.supervisor" class="mt-1 text-sm text-red-600">{{ errors.supervisor }}</p>
            </div>

            <div>
              <label for="coSupervisor" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.form.coSupervisor }}
              </label>
              <select
                id="coSupervisor"
                v-model="form.coSupervisor"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">{{ t.form.selectCoSupervisor }}</option>
                <option v-for="member in supervisors" :key="member.id" :value="member.id">
                  {{ member.name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Requirements & Skills -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.sections.requirements }}</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.form.requirements }}
              </label>
              <div class="flex flex-wrap gap-2 mb-2">
                <span
                  v-for="(req, index) in form.requirements"
                  :key="index"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  {{ req }}
                  <button
                    type="button"
                    @click="removeRequirement(index)"
                    class="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-green-400 hover:bg-green-200 hover:text-green-500 focus:outline-none focus:bg-green-500 focus:text-white"
                  >
                    <XIcon class="h-3 w-3" />
                  </button>
                </span>
              </div>
              <div class="flex">
                <input
                  v-model="newRequirement"
                  @keydown.enter.prevent="addRequirement"
                  @keydown.comma.prevent="addRequirement"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  :placeholder="t.form.requirementsPlaceholder"
                />
                <button
                  type="button"
                  @click="addRequirement"
                  class="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <PlusIcon class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div v-if="form.projectType === 'msc'">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.form.objectives }}
              </label>
              <div class="flex flex-wrap gap-2 mb-2">
                <span
                  v-for="(obj, index) in form.objectives"
                  :key="index"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                >
                  {{ obj }}
                  <button
                    type="button"
                    @click="removeObjective(index)"
                    class="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-purple-400 hover:bg-purple-200 hover:text-purple-500 focus:outline-none focus:bg-purple-500 focus:text-white"
                  >
                    <XIcon class="h-3 w-3" />
                  </button>
                </span>
              </div>
              <div class="flex">
                <input
                  v-model="newObjective"
                  @keydown.enter.prevent="addObjective"
                  @keydown.comma.prevent="addObjective"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  :placeholder="t.form.objectivesPlaceholder"
                />
                <button
                  type="button"
                  @click="addObjective"
                  class="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <PlusIcon class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.sections.timeline }}</h3>
          
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="startDate" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.form.startDate }}
              </label>
              <input
                id="startDate"
                type="date"
                v-model="form.startDate"
                required
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.startDate }"
              />
              <p v-if="errors.startDate" class="mt-1 text-sm text-red-600">{{ errors.startDate }}</p>
            </div>

            <div>
              <label for="endDate" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.form.endDate }}
              </label>
              <input
                id="endDate"
                type="date"
                v-model="form.endDate"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :class="{ 'border-red-500': errors.endDate }"
              />
              <p v-if="errors.endDate" class="mt-1 text-sm text-red-600">{{ errors.endDate }}</p>
            </div>
          </div>
        </div>

        <!-- Additional Information -->
        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.sections.additional }}</h3>
          
          <div class="space-y-6">
            <div v-if="form.projectType === 'research'">
              <label for="funding" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.form.funding }}
              </label>
              <input
                id="funding"
                type="text"
                v-model="form.funding"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                :placeholder="t.form.fundingPlaceholder"
              />
            </div>

            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label for="githubUrl" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.form.githubUrl }}
                </label>
                <input
                  id="githubUrl"
                  type="url"
                  v-model="form.githubUrl"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="https://github.com/organization/project"
                />
              </div>

              <div>
                <label for="websiteUrl" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.form.websiteUrl }}
                </label>
                <input
                  id="websiteUrl"
                  type="url"
                  v-model="form.websiteUrl"
                  class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="https://project-website.com"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Display -->
      <div v-if="generalError" class="mt-6 rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <XCircleIcon class="h-5 w-5 text-red-400" />
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
              {{ generalError }}
            </h3>
          </div>
        </div>
      </div>

      <!-- Submit Buttons -->
      <div class="mt-8 flex justify-end space-x-3">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {{ t.form.cancel }}
        </button>
        
        <button
          type="submit"
          :disabled="isSubmitting"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? t.form.submitting : (isEditing ? t.form.update : t.form.create) }}
        </button>
      </div>
    </form>
  </div>
</template>