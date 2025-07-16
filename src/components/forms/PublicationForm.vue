<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { XCircleIcon } from 'lucide-vue-next'
import { useLanguage } from '@/composables/useLanguage'

interface PublicationForm {
  entrytype: string
  citekey: string
  title: string
  author: string
  journal: string
  booktitle: string
  publisher: string
  year: number | null
  volume: string
  number: string
  pages: string
  url: string
}

interface PublicationErrors {
  [key: string]: string
}

const props = defineProps<{
  initialData?: Partial<PublicationForm>
  isEditing?: boolean
}>()

const emit = defineEmits<{
  submit: [data: PublicationForm]
  cancel: []
}>()

const { t: translations } = useLanguage()
const t = computed(() => translations.value.forms.publication)

const form = reactive<PublicationForm>({
  entrytype: '',
  citekey: '',
  title: '',
  author: '',
  journal: '',
  booktitle: '',
  publisher: '',
  year: null,
  volume: '',
  number: '',
  pages: '',
  url: '',
  ...props.initialData
})

const errors = ref<PublicationErrors>({})
const generalError = ref<string>('')
const isSubmitting = ref(false)
const bibtexInput = ref('')
const showPreview = ref(false)

// Computed properties for conditional fields
const showJournal = computed(() => 
  ['article', 'misc'].includes(form.entrytype)
)

const showBooktitle = computed(() => 
  ['inproceedings', 'incollection', 'inbook', 'conference'].includes(form.entrytype)
)

const showPublisher = computed(() => 
  ['book', 'inbook', 'incollection', 'proceedings', 'techreport'].includes(form.entrytype)
)

const updateFormField = (fieldName: string, value: string) => {
  const typedFieldName = fieldName as keyof PublicationForm
  
  if (typedFieldName in form) {
    if (typedFieldName === 'year') {
      form[typedFieldName] = parseInt(value) || null
    } else {
      // Type assertion for non-year fields
      (form[typedFieldName] as string) = value
    }
  }
}


const generatedBibtex = computed(() => {
  if (!form.entrytype || !form.title) return ''
  
  const citekey = form.citekey || generateCitekey()
  let bibtex = `@${form.entrytype}{${citekey},\n`
  
  if (form.title) bibtex += `  title={${form.title}},\n`
  if (form.author) bibtex += `  author={${form.author}},\n`
  if (form.journal) bibtex += `  journal={${form.journal}},\n`
  if (form.booktitle) bibtex += `  booktitle={${form.booktitle}},\n`
  if (form.publisher) bibtex += `  publisher={${form.publisher}},\n`
  if (form.year) bibtex += `  year={${form.year}},\n`
  if (form.volume) bibtex += `  volume={${form.volume}},\n`
  if (form.number) bibtex += `  number={${form.number}},\n`
  if (form.pages) bibtex += `  pages={${form.pages}},\n`
  if (form.url) bibtex += `  url={${form.url}},\n`
  
  bibtex += '}'
  return bibtex
})

const generateCitekey = (): string => {
  if (!form.author || !form.title) return ''
  
  const firstAuthor = form.author.split(' and ')[0].trim()
  const lastName = firstAuthor.split(',')[0].trim() || firstAuthor.split(' ').pop()
  const year = form.year || new Date().getFullYear()
  const firstWord = form.title.split(' ').find(word => 
    word.length > 3 && !['the', 'and', 'for', 'with'].includes(word.toLowerCase())
  ) || 'paper'
  
  return `${lastName}${year}${firstWord}`.toLowerCase().replace(/[^a-z0-9]/g, '')
}

const validateForm = (): boolean => {
  errors.value = {}
  
  if (!form.entrytype) {
    errors.value.entrytype = t.value.validation.entryTypeRequired
  }
  
  if (!form.title.trim()) {
    errors.value.title = t.value.validation.titleRequired
  }
  
  if (!form.author.trim()) {
    errors.value.author = t.value.validation.authorRequired
  }
  
  if (form.year && (form.year < 1900 || form.year > new Date().getFullYear() + 5)) {
    errors.value.year = t.value.validation.yearInvalid
  }
  
  return Object.keys(errors.value).length === 0
}

const parseBibtex = (bibtex: string) => {
  const fieldRegex = /(\w+)\s*=\s*{([^}]*)}/g
  let match: RegExpExecArray | null

  while ((match = fieldRegex.exec(bibtex)) !== null) {
    const [, field, value] = match
    updateFormField(field.toLowerCase(), value)
  }
}

const clearForm = () => {
  const formKeys = Object.keys(form) as (keyof PublicationForm)[]
  formKeys.forEach(key => {
    if (key === 'year') {
      form[key] = null
    } else {
      form[key] = ''
    }
  })
}

const parseBibtexInput = () => {
  try {
    const bibtex = bibtexInput.value.trim()
    if (!bibtex) return

    clearForm()

    const entryTypeMatch = bibtex.match(/@(\w+)\s*\{\s*([^,]+),/)
    if (entryTypeMatch) {
      form.entrytype = entryTypeMatch[1].toLowerCase()
      form.citekey = entryTypeMatch[2].trim()
    }

    const fieldRegex = /(\w+)\s*=\s*\{([^}]*)\}/g
    let match: RegExpExecArray | null

    while ((match = fieldRegex.exec(bibtex)) !== null) {
      const [, field, value] = match
      updateFormField(field.toLowerCase(), value.trim())
    }
  } catch (error) {
    console.error('BibTeX parsing error:', error)
  }
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  generalError.value = ''
  
  try {
    if (!form.citekey) {
      form.citekey = generateCitekey()
    }
    
    emit('submit', { ...form })
  } catch (error) {
    generalError.value = t.value.errors.submitFailed
  } finally {
    isSubmitting.value = false
  }
}

// Auto-generate citekey when form changes
watch([() => form.author, () => form.title, () => form.year], () => {
  if (!form.citekey && form.author && form.title) {
    form.citekey = generateCitekey()
  }
})

// Show preview when form has content
watch(() => [form.entrytype, form.title], () => {
  showPreview.value = Boolean(form.entrytype && form.title)
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
        <!-- Entry Type -->
        <div>
          <label for="entrytype" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t.form.entryType }}
          </label>
          <select
            id="entrytype"
            v-model="form.entrytype"
            required
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            :class="{ 'border-red-500': errors.entrytype }"
          >
            <option value="">{{ t.form.selectEntryType }}</option>
            <option value="article">{{ t.entryTypes.article }}</option>
            <option value="book">{{ t.entryTypes.book }}</option>
            <option value="booklet">{{ t.entryTypes.booklet }}</option>
            <option value="conference">{{ t.entryTypes.conference }}</option>
            <option value="inbook">{{ t.entryTypes.inbook }}</option>
            <option value="incollection">{{ t.entryTypes.incollection }}</option>
            <option value="inproceedings">{{ t.entryTypes.inproceedings }}</option>
            <option value="manual">{{ t.entryTypes.manual }}</option>
            <option value="mastersthesis">{{ t.entryTypes.mastersthesis }}</option>
            <option value="misc">{{ t.entryTypes.misc }}</option>
            <option value="phdthesis">{{ t.entryTypes.phdthesis }}</option>
            <option value="proceedings">{{ t.entryTypes.proceedings }}</option>
            <option value="techreport">{{ t.entryTypes.techreport }}</option>
            <option value="unpublished">{{ t.entryTypes.unpublished }}</option>
            <option value="online">{{ t.entryTypes.online }}</option>
            <option value="presentation">{{ t.entryTypes.presentation }}</option>
          </select>
          <p v-if="errors.entrytype" class="mt-1 text-sm text-red-600">{{ errors.entrytype }}</p>
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
            <label for="author" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.authors }}
            </label>
            <input
              id="author"
              type="text"
              v-model="form.author"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{ 'border-red-500': errors.author }"
              :placeholder="t.form.authorsPlaceholder"
            />
            <p class="mt-1 text-xs text-gray-500">{{ t.form.authorsHelp }}</p>
            <p v-if="errors.author" class="mt-1 text-sm text-red-600">{{ errors.author }}</p>
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
            <label for="citekey" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.citekey }}
            </label>
            <input
              id="citekey"
              type="text"
              v-model="form.citekey"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :placeholder="t.form.citekeyPlaceholder"
            />
            <p class="mt-1 text-xs text-gray-500">{{ t.form.citekeyHelp }}</p>
          </div>
        </div>

        <!-- Publication Venue -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div v-if="showJournal">
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

          <div v-if="showBooktitle">
            <label for="booktitle" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.booktitle }}
            </label>
            <input
              id="booktitle"
              type="text"
              v-model="form.booktitle"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :placeholder="t.form.booktitlePlaceholder"
            />
          </div>

          <div v-if="showPublisher">
            <label for="publisher" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.publisher }}
            </label>
            <input
              id="publisher"
              type="text"
              v-model="form.publisher"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :placeholder="t.form.publisherPlaceholder"
            />
          </div>
        </div>

        <!-- Publication Details -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
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

          <div>
            <label for="number" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.number }}
            </label>
            <input
              id="number"
              type="text"
              v-model="form.number"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :placeholder="t.form.numberPlaceholder"
            />
          </div>

          <div>
            <label for="pages" class="block text-sm font-medium text-gray-700 mb-2">
              {{ t.form.pages }}
            </label>
            <input
              id="pages"
              type="text"
              v-model="form.pages"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :placeholder="t.form.pagesPlaceholder"
            />
          </div>
        </div>

        <!-- URL -->
        <div>
          <label for="url" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t.form.url }}
          </label>
          <input
            id="url"
            type="url"
            v-model="form.url"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            :placeholder="t.form.urlPlaceholder"
          />
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
          :disabled="isSubmitting"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? t.form.submitting : (isEditing ? t.form.update : t.form.create) }}
        </button>
      </div>
    </form>
  </div>
</template>