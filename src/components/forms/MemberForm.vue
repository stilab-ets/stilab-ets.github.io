<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLanguage } from '../../composables/useLanguage'

interface Props {
  isEdit?: boolean
  memberId?: string
  initialData?: {
    firstName: string
    lastName: string
    email: string
    role: string
    phone?: string
    researchDomain?: string
    biography?: string
    imageUrl?: string
    githubUrl?: string
    linkedinUrl?: string
    personalWebsite?: string
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
const t = computed(() => translations.value.forms.member)

const formData = ref({
  firstName: props.initialData?.firstName || '',
  lastName: props.initialData?.lastName || '',
  email: props.initialData?.email || '',
  role: props.initialData?.role || '',
  phone: props.initialData?.phone || '',
  researchDomain: props.initialData?.researchDomain || '',
  biography: props.initialData?.biography || '',
  imageUrl: props.initialData?.imageUrl || '',
  githubUrl: props.initialData?.githubUrl || '',
  linkedinUrl: props.initialData?.linkedinUrl || '',
  personalWebsite: props.initialData?.personalWebsite || ''
})


const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

const roles = [
  'professor',
  'researcher', 
  'postdoc',
  'phd',
  'master',
  'engineer',
  'admin'
] as const

const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.firstName.trim()) {
    errors.value.firstName = t.forms.invitation.validation.firstNameRequired
  }
  
  if (!formData.value.lastName.trim()) {
    errors.value.lastName = t.forms.invitation.validation.lastNameRequired
  }
  
  if (!formData.value.email.trim()) {
    errors.value.email = t.forms.invitation.validation.emailRequired
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = t.forms.invitation.validation.emailInvalid
  }
  
  if (!formData.value.role) {
    errors.value.role = t.auth.register.validation.roleRequired
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  try {
    emit('submit', formData.value)
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
      :title="isEdit ? 'Edit Member' : 'Add New Member'"
      :subtitle="isEdit ? 'Update member information and profile' : 'Add a new member to the laboratory'"
      :highlight-word="isEdit ? 'Edit' : 'Add'"
    />

    <Card class="mt-8">
      <form @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Personal Information -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            {{ t.auth.register.sections.personal }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.auth.register.form.firstName }}
              </label>
              <input
                id="firstName"
                v-model="formData.firstName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.firstName }"
              />
              <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">
                {{ errors.firstName }}
              </p>
            </div>

            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.auth.register.form.lastName }}
              </label>
              <input
                id="lastName"
                v-model="formData.lastName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.lastName }"
              />
              <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">
                {{ errors.lastName }}
              </p>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.auth.register.form.email }}
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.email }"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">
                {{ errors.email }}
              </p>
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.auth.register.form.phone }}
              </label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>
          </div>
        </div>

        <!-- Professional Information -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            {{ t.auth.register.sections.professional }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="role" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.auth.register.form.role }}
              </label>
              <select
                id="role"
                v-model="formData.role"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
                :class="{ 'border-red-500': errors.role }"
              >
                <option value="">{{ t.auth.register.form.selectRole }}</option>
                <option v-for="role in roles" :key="role" :value="role">
                  {{ t.auth.register.roles[role] }}
                </option>
              </select>
              <p v-if="errors.role" class="mt-1 text-sm text-red-600">
                {{ errors.role }}
              </p>
            </div>

            <div>
              <label for="researchDomain" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.auth.register.form.researchDomain }}
              </label>
              <input
                id="researchDomain"
                v-model="formData.researchDomain"
                type="text"
                :placeholder="t.auth.register.form.researchDomainPlaceholder"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>
          </div>

          <div class="mt-6">
            <label for="biography" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.auth.register.form.biography }}
            </label>
            <textarea
              id="biography"
              v-model="formData.biography"
              rows="4"
              :placeholder="t.auth.register.form.biographyPlaceholder"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
            ></textarea>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            {{ t.auth.register.sections.links }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="imageUrl" class="block text-sm font-medium text-gray-700 mb-2">
                Profile Image URL
              </label>
              <input
                id="imageUrl"
                v-model="formData.imageUrl"
                type="url"
                placeholder="https://example.com/photo.jpg"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>

            <div>
              <label for="githubUrl" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.auth.register.form.githubUrl }}
              </label>
              <input
                id="githubUrl"
                v-model="formData.githubUrl"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>

            <div>
              <label for="linkedinUrl" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.auth.register.form.linkedinUrl }}
              </label>
              <input
                id="linkedinUrl"
                v-model="formData.linkedinUrl"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#08a4d4]"
              />
            </div>

            <div>
              <label for="personalWebsite" class="block text-sm font-medium text-gray-700 mb-2">
                {{ t.auth.register.form.personalWebsite }}
              </label>
              <input
                id="personalWebsite"
                v-model="formData.personalWebsite"
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
            {{ t.forms.publication.form.cancel }}
          </Button>
          <Button
            type="submit"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? t.forms.publication.form.submitting : (isEdit ? 'Update Member' : 'Create Member') }}
          </Button>
        </div>
      </form>
    </Card>
  </div>
</template>