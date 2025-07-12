<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLanguage } from '../../composables/useLanguage'

interface Props {
  isEdit?: boolean
  vacancyId?: string
  initialData?: {
    title: string
    type: 'phd' | 'postdoc' | 'researcher' | 'engineer' | 'intern'
    description: string
    requirements: string[]
    supervisor: string
    deadline: string
    startDate: string
    duration?: string
    salary?: string
    applyUrl: string
    tags: string[]
    benefits?: string[]
    responsibilities?: string[]
    qualifications?: string[]
    location?: string
    workType?: 'onsite' | 'remote' | 'hybrid'
    contractType?: 'permanent' | 'temporary' | 'internship'
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
const t = computed(() => translations.value.forms.vacancy)

const formData = ref({
  title: props.initialData?.title || '',
  type: props.initialData?.type || 'phd',
  description: props.initialData?.description || '',
  requirements: props.initialData?.requirements || [''],
  supervisor: props.initialData?.supervisor || '',
  deadline: props.initialData?.deadline || '',
  startDate: props.initialData?.startDate || '',
  duration: props.initialData?.duration || '',
  salary: props.initialData?.salary || '',
  applyUrl: props.initialData?.applyUrl || '',
  tags: props.initialData?.tags || [''],
  benefits: props.initialData?.benefits || [''],
  responsibilities: props.initialData?.responsibilities || [''],
  qualifications: props.initialData?.qualifications || [''],
  location: props.initialData?.location || '',
  workType: props.initialData?.workType || 'onsite',
  contractType: props.initialData?.contractType || 'permanent'
})

const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

const positionTypes = [
  { value: 'phd', label: 'PhD Position' },
  { value: 'postdoc', label: 'Post-Doctoral Researcher' },
  { value: 'researcher', label: 'Research Scientist' },
  { value: 'engineer', label: 'Research Engineer' },
  { value: 'intern', label: 'Internship' }
]

const workTypes = [
  { value: 'onsite', label: 'On-site' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' }
]

const contractTypes = [
  { value: 'permanent', label: 'Permanent' },
  { value: 'temporary', label: 'Fixed-term' },
  { value: 'internship', label: 'Internship' }
]

const addRequirement = () => {
  formData.value.requirements.push('')
}

const removeRequirement = (index: number) => {
  formData.value.requirements.splice(index, 1)
}

const addTag = () => {
  formData.value.tags.push('')
}

const removeTag = (index: number) => {
  formData.value.tags.splice(index, 1)
}

const addBenefit = () => {
  formData.value.benefits.push('')
}

const removeBenefit = (index: number) => {
  formData.value.benefits.splice(index, 1)
}

const addResponsibility = () => {
  formData.value.responsibilities.push('')
}

const removeResponsibility = (index: number) => {
  formData.value.responsibilities.splice(index, 1)
}

const addQualification = () => {
  formData.value.qualifications.push('')
}

const removeQualification = (index: number) => {
  formData.value.qualifications.splice(index, 1)
}

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.title.trim()) {
    errors.value.title = 'Position title is required'
  }
  
  if (!formData.value.description.trim()) {
    errors.value.description = 'Position description is required'
  }
  
  if (!formData.value.supervisor.trim()) {
    errors.value.supervisor = 'Supervisor is required'
  }
  
  if (!formData.value.deadline) {
    errors.value.deadline = 'Application deadline is required'
  }
  
  if (!formData.value.startDate) {
    errors.value.startDate = 'Start date is required'
  }
  
  if (formData.value.deadline && formData.value.startDate && formData.value.deadline >= formData.value.startDate) {
    errors.value.deadline = 'Application deadline must be before start date'
  }
  
  if (!formData.value.applyUrl.trim()) {
    errors.value.applyUrl = 'Application URL is required'
  } else if (!/^https?:\/\/.+/.test(formData.value.applyUrl)) {
    errors.value.applyUrl = 'Please enter a valid URL'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  try {
    // Filter out empty arrays
    const cleanData = {
      ...formData.value,
      requirements: formData.value.requirements.filter(r => r.trim()),
      tags: formData.value.tags.filter(t => t.trim()),
      benefits: formData.value.benefits.filter(b => b.trim()),
      responsibilities: formData.value.responsibilities.filter(r => r.trim()),
      qualifications: formData.value.qualifications.filter(q => q.trim())
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
      :title="isEdit ? 'Edit Position' : 'Create New Position'"
      :subtitle="isEdit ? 'Update position information and requirements' : 'Add a new job opening or vacancy'"
      :highlight-word="isEdit ? 'Edit' : 'Create'"
    />

    <Card class="mt-8">
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Basic Information -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Position Information
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
                Position Title
              </label>
              <input
                id="title"
                v-model="formData.title"
                type="text"
                placeholder="e.g., PhD Position in Machine Learning"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.title }"
              />
              <p v-if="errors.title" class="mt-1 text-sm text-red-600">
                {{ errors.title }}
              </p>
            </div>

            <div>
              <label for="type" class="block text-sm font-medium text-gray-700 mb-2">
                Position Type
              </label>
              <select
                id="type"
                v-model="formData.type"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              >
                <option v-for="type in positionTypes" :key="type.value" :value="type.value">
                  {{ type.label }}
                </option>
              </select>
            </div>

            <div>
              <label for="supervisor" class="block text-sm font-medium text-gray-700 mb-2">
                Supervisor/Contact
              </label>
              <input
                id="supervisor"
                v-model="formData.supervisor"
                type="text"
                placeholder="Principal supervisor or contact person"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.supervisor }"
              />
              <p v-if="errors.supervisor" class="mt-1 text-sm text-red-600">
                {{ errors.supervisor }}
              </p>
            </div>

            <div>
              <label for="location" class="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                id="location"
                v-model="formData.location"
                type="text"
                placeholder="City, Country"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>

            <div>
              <label for="workType" class="block text-sm font-medium text-gray-700 mb-2">
                Work Type
              </label>
              <select
                id="workType"
                v-model="formData.workType"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              >
                <option v-for="type in workTypes" :key="type.value" :value="type.value">
                  {{ type.label }}
                </option>
              </select>
            </div>

            <div>
              <label for="contractType" class="block text-sm font-medium text-gray-700 mb-2">
                Contract Type
              </label>
              <select
                id="contractType"
                v-model="formData.contractType"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              >
                <option v-for="type in contractTypes" :key="type.value" :value="type.value">
                  {{ type.label }}
                </option>
              </select>
            </div>
          </div>

          <div class="mt-6">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Position Description
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="4"
              placeholder="Detailed description of the position, research area, and objectives"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              :class="{ 'border-red-500': errors.description }"
            ></textarea>
            <p v-if="errors.description" class="mt-1 text-sm text-red-600">
              {{ errors.description }}
            </p>
          </div>
        </div>

        <!-- Timeline and Compensation -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Timeline & Compensation
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label for="deadline" class="block text-sm font-medium text-gray-700 mb-2">
                Application Deadline
              </label>
              <input
                id="deadline"
                v-model="formData.deadline"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.deadline }"
              />
              <p v-if="errors.deadline" class="mt-1 text-sm text-red-600">
                {{ errors.deadline }}
              </p>
            </div>

            <div>
              <label for="startDate" class="block text-sm font-medium text-gray-700 mb-2">
                Start Date
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
              <label for="duration" class="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <input
                id="duration"
                v-model="formData.duration"
                type="text"
                placeholder="e.g., 3 years, 18 months"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>

            <div>
              <label for="salary" class="block text-sm font-medium text-gray-700 mb-2">
                Salary/Stipend
              </label>
              <input
                id="salary"
                v-model="formData.salary"
                type="text"
                placeholder="e.g., €2,000/month"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>
          </div>
        </div>

        <!-- Requirements -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Requirements
          </h3>
          <div class="space-y-3">
            <div
              v-for="(requirement, index) in formData.requirements"
              :key="index"
              class="flex space-x-2"
            >
              <input
                v-model="formData.requirements[index]"
                type="text"
                placeholder="Educational background, skills, or experience requirement"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
              <Button
                type="button"
                variant="secondary"
                @click="removeRequirement(index)"
              >
                Remove
              </Button>
            </div>
            <Button type="button" variant="secondary" @click="addRequirement">
              Add Requirement
            </Button>
          </div>
        </div>

        <!-- Qualifications -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Preferred Qualifications
          </h3>
          <div class="space-y-3">
            <div
              v-for="(qualification, index) in formData.qualifications"
              :key="index"
              class="flex space-x-2"
            >
              <input
                v-model="formData.qualifications[index]"
                type="text"
                placeholder="Preferred skills or qualifications"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
              <Button
                type="button"
                variant="secondary"
                @click="removeQualification(index)"
              >
                Remove
              </Button>
            </div>
            <Button type="button" variant="secondary" @click="addQualification">
              Add Qualification
            </Button>
          </div>
        </div>

        <!-- Responsibilities -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Key Responsibilities
          </h3>
          <div class="space-y-3">
            <div
              v-for="(responsibility, index) in formData.responsibilities"
              :key="index"
              class="flex space-x-2"
            >
              <input
                v-model="formData.responsibilities[index]"
                type="text"
                placeholder="Main responsibility or duty"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
              <Button
                type="button"
                variant="secondary"
                @click="removeResponsibility(index)"
              >
                Remove
              </Button>
            </div>
            <Button type="button" variant="secondary" @click="addResponsibility">
              Add Responsibility
            </Button>
          </div>
        </div>

        <!-- Benefits -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Benefits & Perks
          </h3>
          <div class="space-y-3">
            <div
              v-for="(benefit, index) in formData.benefits"
              :key="index"
              class="flex space-x-2"
            >
              <input
                v-model="formData.benefits[index]"
                type="text"
                placeholder="Benefit or perk offered"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
              <Button
                type="button"
                variant="secondary"
                @click="removeBenefit(index)"
              >
                Remove
              </Button>
            </div>
            <Button type="button" variant="secondary" @click="addBenefit">
              Add Benefit
            </Button>
          </div>
        </div>

        <!-- Tags -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Tags
          </h3>
          <div class="space-y-3">
            <div
              v-for="(tag, index) in formData.tags"
              :key="index"
              class="flex space-x-2"
            >
              <input
                v-model="formData.tags[index]"
                type="text"
                placeholder="Research area or keyword tag"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
              <Button
                type="button"
                variant="secondary"
                @click="removeTag(index)"
              >
                Remove
              </Button>
            </div>
            <Button type="button" variant="secondary" @click="addTag">
              Add Tag
            </Button>
          </div>
        </div>

        <!-- Application URL -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Application Information
          </h3>
          <div>
            <label for="applyUrl" class="block text-sm font-medium text-gray-700 mb-2">
              Application URL
            </label>
            <input
              id="applyUrl"
              v-model="formData.applyUrl"
              type="url"
              placeholder="https://jobs.university.edu/apply/position-123"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              :class="{ 'border-red-500': errors.applyUrl }"
            />
            <p v-if="errors.applyUrl" class="mt-1 text-sm text-red-600">
              {{ errors.applyUrl }}
            </p>
            <p class="mt-1 text-sm text-gray-500">
              Link to the application portal or contact information
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="secondary"
            @click="emit('cancel')"
          >
            {{ t.forms.publication.form.cancel }}
          </Button>
          <Button
            type="submit"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? t.forms.publication.form.submitting : (isEdit ? 'Update Position' : 'Create Position') }}
          </Button>
        </div>
      </form>
    </Card>
  </div>
</template>