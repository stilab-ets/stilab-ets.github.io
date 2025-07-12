<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLanguage } from '../../composables/useLanguage'

interface Props {
  isEdit?: boolean
  awardId?: string
  initialData?: {
    title: string
    organization: string
    year: number
    recipient: string
    category: string
    description?: string
    url?: string
    amount?: string
    significance: string
    criteria?: string[]
    isRecurring?: boolean
    nextDeadline?: string
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
const t = computed(() => translations.value.forms.awards)

const formData = ref({
  title: props.initialData?.title || '',
  organization: props.initialData?.organization || '',
  year: props.initialData?.year || new Date().getFullYear(),
  recipient: props.initialData?.recipient || '',
  category: props.initialData?.category || '',
  description: props.initialData?.description || '',
  url: props.initialData?.url || '',
  amount: props.initialData?.amount || '',
  significance: props.initialData?.significance || '',
  criteria: props.initialData?.criteria || [''],
  isRecurring: props.initialData?.isRecurring || false,
  nextDeadline: props.initialData?.nextDeadline || ''
})

const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

const categories = [
  'publication',
  'research',
  'teaching',
  'service',
  'career',
  'excellence'
] as const

const significanceLevels = [
  { value: 'international', label: 'International' },
  { value: 'national', label: 'National' },
  { value: 'regional', label: 'Regional' },
  { value: 'institutional', label: 'Institutional' },
  { value: 'departmental', label: 'Departmental' }
]

const addCriterion = () => {
  formData.value.criteria.push('')
}

const removeCriterion = (index: number) => {
  formData.value.criteria.splice(index, 1)
}

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.title.trim()) {
    errors.value.title = 'Award title is required'
  }
  
  if (!formData.value.organization.trim()) {
    errors.value.organization = 'Organization is required'
  }
  
  if (!formData.value.year || formData.value.year < 1900 || formData.value.year > new Date().getFullYear() + 5) {
    errors.value.year = 'Please enter a valid year'
  }
  
  if (!formData.value.recipient.trim()) {
    errors.value.recipient = 'Recipient is required'
  }
  
  if (!formData.value.category) {
    errors.value.category = 'Category is required'
  }
  
  if (!formData.value.significance) {
    errors.value.significance = 'Significance level is required'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  try {
    // Filter out empty criteria
    const cleanData = {
      ...formData.value,
      criteria: formData.value.criteria.filter(c => c.trim())
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
      :title="isEdit ? 'Edit Award' : 'Create New Award'"
      :subtitle="isEdit ? 'Update award information and details' : 'Add a new award or distinction to the laboratory'"
      :highlight-word="isEdit ? 'Edit' : 'Create'"
    />

    <Card class="mt-8">
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Basic Information -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Award Information
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
                Award Title
              </label>
              <input
                id="title"
                v-model="formData.title"
                type="text"
                placeholder="e.g., Best Paper Award"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.title }"
              />
              <p v-if="errors.title" class="mt-1 text-sm text-red-600">
                {{ errors.title }}
              </p>
            </div>

            <div>
              <label for="organization" class="block text-sm font-medium text-gray-700 mb-2">
                Awarding Organization
              </label>
              <input
                id="organization"
                v-model="formData.organization"
                type="text"
                placeholder="e.g., IEEE Computer Society"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.organization }"
              />
              <p v-if="errors.organization" class="mt-1 text-sm text-red-600">
                {{ errors.organization }}
              </p>
            </div>

            <div>
              <label for="year" class="block text-sm font-medium text-gray-700 mb-2">
                Year Received
              </label>
              <input
                id="year"
                v-model.number="formData.year"
                type="number"
                :min="1900"
                :max="new Date().getFullYear() + 5"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.year }"
              />
              <p v-if="errors.year" class="mt-1 text-sm text-red-600">
                {{ errors.year }}
              </p>
            </div>

            <div>
              <label for="recipient" class="block text-sm font-medium text-gray-700 mb-2">
                Recipient
              </label>
              <input
                id="recipient"
                v-model="formData.recipient"
                type="text"
                placeholder="Name of award recipient"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.recipient }"
              />
              <p v-if="errors.recipient" class="mt-1 text-sm text-red-600">
                {{ errors.recipient }}
              </p>
            </div>

            <div>
              <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
                Award Category
              </label>
              <select
                id="category"
                v-model="formData.category"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.category }"
              >
                <option value="">Select category</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ t.awards.categories[category] }}
                </option>
              </select>
              <p v-if="errors.category" class="mt-1 text-sm text-red-600">
                {{ errors.category }}
              </p>
            </div>

            <div>
              <label for="significance" class="block text-sm font-medium text-gray-700 mb-2">
                Significance Level
              </label>
              <select
                id="significance"
                v-model="formData.significance"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.significance }"
              >
                <option value="">Select significance level</option>
                <option v-for="level in significanceLevels" :key="level.value" :value="level.value">
                  {{ level.label }}
                </option>
              </select>
              <p v-if="errors.significance" class="mt-1 text-sm text-red-600">
                {{ errors.significance }}
              </p>
            </div>

            <div>
              <label for="amount" class="block text-sm font-medium text-gray-700 mb-2">
                Award Amount (Optional)
              </label>
              <input
                id="amount"
                v-model="formData.amount"
                type="text"
                placeholder="e.g., €5,000"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>

            <div>
              <label for="url" class="block text-sm font-medium text-gray-700 mb-2">
                Award URL
              </label>
              <input
                id="url"
                v-model="formData.url"
                type="url"
                placeholder="Link to award announcement or details"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>
          </div>

          <div class="mt-6">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Award Description
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="4"
              placeholder="Description of the award, its purpose, and significance"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
            ></textarea>
          </div>
        </div>

        <!-- Award Criteria -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Award Criteria
          </h3>
          <div class="space-y-3">
            <div
              v-for="(criterion, index) in formData.criteria"
              :key="index"
              class="flex space-x-2"
            >
              <input
                v-model="formData.criteria[index]"
                type="text"
                placeholder="Selection criterion or requirement"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
              <Button
                type="button"
                variant="secondary"
                @click="removeCriterion(index)"
              >
                Remove
              </Button>
            </div>
            <Button type="button" variant="secondary" @click="addCriterion">
              Add Criterion
            </Button>
          </div>
        </div>

        <!-- Recurring Award Information -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Award Schedule
          </h3>
          <div class="space-y-4">
            <div class="flex items-center">
              <input
                id="isRecurring"
                v-model="formData.isRecurring"
                type="checkbox"
                class="h-4 w-4 text-[#08a4d4] focus:ring-[#08a4d4] border-gray-300 rounded"
              />
              <label for="isRecurring" class="ml-2 block text-sm text-gray-900">
                This is a recurring award
              </label>
            </div>

            <div v-if="formData.isRecurring">
              <label for="nextDeadline" class="block text-sm font-medium text-gray-700 mb-2">
                Next Application Deadline
              </label>
              <input
                id="nextDeadline"
                v-model="formData.nextDeadline"
                type="date"
                class="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
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
            {{ t.forms.publication.form.cancel }}
          </Button>
          <Button
            type="submit"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? t.forms.publication.form.submitting : (isEdit ? 'Update Award' : 'Create Award') }}
          </Button>
        </div>
      </form>
    </Card>
  </div>
</template>