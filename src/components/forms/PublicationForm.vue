<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { XCircleIcon } from 'lucide-vue-next'
import { useLanguage } from '@/composables/useLanguage'
import { usePublications } from '@/hooks/publications/usePublications'
import type { Publication } from '@/services/MainAPI'

interface PublicationFormData {
  publication_type: string
  title: string
  authors: string
  journal: string
  year: number | undefined
  volume: string
  doi: string
  url: string
  abstract: string
}

interface PublicationErrors {
  [key: string]: string
}

const props = defineProps<{
  initialData?: Partial<Publication>
  isEditing?: boolean
}>()

const emit = defineEmits<{
  submit: [data: PublicationFormData]
  cancel: []
  success: []
}>()

const { t: translations } = useLanguage()
const t = computed(() => translations.value.forms.publication)

const { createPublication, updatePublication, isLoading } = usePublications()

const form = reactive<PublicationFormData>({
  publication_type: '',
  title: '',
  authors: '',
  journal: '',
  year: undefined,
  volume: '',
  doi: '',
  url: '',
  abstract: '',
  ...props.initialData
})

const errors = ref<PublicationErrors>({})
const generalError = ref<string>('')
const bibtexInput = ref('')
const showPreview = ref(false)

// Generate BibTeX preview
const generatedBibtex = computed(() => {
  if (!form.publication_type || !form.title) return ''
  
  const citekey = generateCitekey()
  let bibtex = `@${form.publication_type}{${citekey},\n`
  
  if (form.title) bibtex += `  title={${form.title}},\n`
  if (form.authors) bibtex += `  author={${form.authors}},\n`
  if (form.journal) bibtex += `  journal={${form.journal}},\n`
  if (form.year) bibtex += `  year={${form.year}},\n`
  if (form.volume) bibtex += `  volume={${form.volume}},\n`
  if (form.doi) bibtex += `  doi={${form.doi}},\n`
  if (form.url) bibtex += `  url={${form.url}},\n`
  if (form.abstract) bibtex += `  abstract={${form.abstract}},\n`
  
  bibtex += '}'
  return bibtex
})

const generateCitekey = (): string => {
  if (!form.authors || !form.title) return ''
  
  const firstAuthor = form.authors.split(' and ')[0].trim()
  const lastName = firstAuthor.split(',')[0].trim() || firstAuthor.split(' ').pop()
  const year = form.year || new Date().getFullYear()
  const firstWord = form.title.split(' ').find(word => 
    word.length > 3 && !['the', 'and', 'for', 'with'].includes(word.toLowerCase())
  ) || 'paper'
  
  return `${lastName}${year}${firstWord}`.toLowerCase().replace(/[^a-z0-9]/g, '')
}

const validateForm = (): boolean => {
  errors.value = {}
  
  if (!form.publication_type) {
    errors.value.publication_type = t.value.validation.entryTypeRequired
  }
  
  if (!form.title.trim()) {
    errors.value.title = t.value.validation.titleRequired
  }
  
  if (!form.authors.trim()) {
    errors.value.authors = t.value.validation.authorRequired
  }
  
  if (form.year && (form.year < 1900 || form.year > new Date().getFullYear() + 5)) {
    errors.value.year = t.value.validation.yearInvalid
  }

  if (form.url && !isValidUrl(form.url)) {
    errors.value.url = t.value.validation.urlInvalid
  }

  if (form.doi && !isValidDoi(form.doi)) {
    errors.value.doi = t.value.validation.doiInvalid
  }
  
  return Object.keys(errors.value).length === 0
}

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const isValidDoi = (doi: string): boolean => {
  return /^10\.\d{4,}\//.test(doi)
}

const parseBibtex = (bibtex: string) => {
  try {
    // Clear form first
    clearForm();

    // Extract entry type and citekey
    const entryTypeMatch = bibtex.match(/@(\w+)\s*\{\s*([^,]+),/)
    if (entryTypeMatch) {
      form.publication_type = entryTypeMatch[1].toLowerCase()
    }

    // Extract fields
    const fieldRegex = /(\w+)\s*=\s*\{([^}]*)\}/g
    let match: RegExpExecArray | null

    while ((match = fieldRegex.exec(bibtex)) !== null) {
      const [, field, value] = match
      const fieldName = field.toLowerCase()
      
      if (fieldName === 'author') {
        form.authors = value.trim()
      } else if (fieldName === 'year') {
        form.year = parseInt(value) || undefined
      } else if (fieldName in form) {
        (form[fieldName as keyof PublicationFormData] as string) = value.trim()
      }
    }
  } catch (error) {
    console.error('BibTeX parsing error:', error)
    generalError.value = t.value.errors.bibtexParseError
  }
}

const clearForm = () => {
  form.publication_type = ''
  form.title = ''
  form.authors = ''
  form.journal = ''
  form.year = undefined
  form.volume = ''
  form.doi = ''
  form.url = ''
  form.abstract = ''
  errors.value = {}
  generalError.value = ''
}

const parseBibtexInput = () => {
  if (!bibtexInput.value.trim()) return
  parseBibtex(bibtexInput.value.trim())
}

const handleSubmit = async () => {
  if (!validateForm()) return

  generalError.value = ''

  try {
    const success = props.isEditing && props.initialData?.id
      ? await updatePublication(props.initialData.id, form)
      : await createPublication(form)

    if (success) {
      emit('success')
      if (!props.isEditing) {
        clearForm()
      }
    } else {
      generalError.value = t.value.errors.submitFailed
    }
  } catch (error: any) {
    generalError.value = error.message || t.value.errors.submitFailed
  }
}

// Show preview when form has content
watch(() => [form.publication_type, form.title], () => {
  showPreview.value = Boolean(form.publication_type && form.title)
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
        <!-- Publication Type -->
        <div>
          <label for="publication_type" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t.form.entryType }}
          </label>
          <select
            id="publication_type"
            v-model="form.publication_type"
            required
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            :class="{ 'border-red-500': errors.publication_type }"
          >
            <option value="">{{ t.form.selectEntryType }}</option>
            <option value="article">{{ t.entryTypes.article }}</option>
            <option value="conference">{{ t.entryTypes.conference }}</option>
            <option value="workshop">{{ t.entryTypes.inproceedings }}</option>
            <option value="book">{{ t.entryTypes.book }}</option>
            <option value="thesis">{{ t.entryTypes.phdthesis }}</option>
            <option value="misc">{{ t.entryTypes.misc }}</option>
          </select>
          <p v-if="errors.publication_type" class="mt-1 text-sm text-red-600">{{ errors.publication_type }}</p>
        </div>

        <!-- Basic Information -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
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

          <div class="sm:col-span-2">
            <label for="authors" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.authors }}
            </label>
            <input
              id="authors"
              type="text"
              v-model="form.authors"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': errors.authors }"
              :placeholder="t.form.authorsPlaceholder"
            />
            <p class="mt-1 text-xs text-gray-500">{{ t.form.authorsHelp }}</p>
            <p v-if="errors.authors" class="mt-1 text-sm text-red-600">{{ errors.authors }}</p>
          </div>

          <div>
            <label for="year" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.year }}
            </label>
            <input
              id="year"
              type="number"
              v-model="form.year"
              min="1900"
              :max="new Date().getFullYear() + 5"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': errors.year }"
            />
            <p v-if="errors.year" class="mt-1 text-sm text-red-600">{{ errors.year }}</p>
          </div>

          <div>
            <label for="volume" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.volume }}
            </label>
            <input
              id="volume"
              type="text"
              v-model="form.volume"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :placeholder="t.form.volumePlaceholder"
            />
          </div>
        </div>

        <!-- Publication Venue -->
        <div>
          <label for="journal" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t.form.journal }}
          </label>
          <input
            id="journal"
            type="text"
            v-model="form.journal"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            :placeholder="t.form.journalPlaceholder"
          />
        </div>

        <!-- DOI and URL -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label for="doi" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.doi }}
            </label>
            <input
              id="doi"
              type="text"
              v-model="form.doi"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': errors.doi }"
              :placeholder="t.form.doiPlaceholder"
            />
            <p v-if="errors.doi" class="mt-1 text-sm text-red-600">{{ errors.doi }}</p>
          </div>

          <div>
            <label for="url" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.url }}
            </label>
            <input
              id="url"
              type="url"
              v-model="form.url"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': errors.url }"
              :placeholder="t.form.urlPlaceholder"
            />
            <p v-if="errors.url" class="mt-1 text-sm text-red-600">{{ errors.url }}</p>
          </div>
        </div>

        <!-- Abstract -->
        <div>
          <label for="abstract" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t.form.abstract }}
          </label>
          <textarea
            id="abstract"
            v-model="form.abstract"
            rows="4"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            :placeholder="t.form.abstractPlaceholder"
          ></textarea>
        </div>

        <!-- BibTeX Import -->
        <div class="border-t pt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.bibtexImport.title }}</h3>
          <p class="text-sm text-gray-600 mb-4">{{ t.bibtexImport.description }}</p>
          
          <div class="space-y-4">
            <textarea
              v-model="bibtexInput"
              rows="8"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono text-sm"
              :placeholder="t.bibtexImport.placeholder"
            ></textarea>
            
            <div class="flex space-x-3">
              <button
                type="button"
                @click="parseBibtexInput"
                :disabled="!bibtexInput.trim()"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {{ t.bibtexImport.parse }}
              </button>
              
              <button
                type="button"
                @click="clearForm"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {{ t.bibtexImport.clear }}
              </button>
            </div>
          </div>
        </div>

        <!-- Preview -->
        <div v-if="showPreview" class="border-t pt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">{{ t.preview.title }}</h3>
          <div class="bg-gray-50 rounded-md p-4">
            <pre class="text-sm font-mono whitespace-pre-wrap">{{ generatedBibtex }}</pre>
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
          :disabled="isLoading"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? t.form.submitting : (isEditing ? t.form.update : t.form.create) }}
        </button>
      </div>
    </form>
  </div>
</template>