<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { usePublications } from '@/hooks/publications/usePublications'
import { useNavigation } from '@/hooks/layout/useNavigation'
import Form from '@/components/ui/Form.vue'
import Button from '@/components/ui/Button.vue'

const { t } = useLanguage()
const { createPublication, isLoading, error, clearError } = usePublications()
const { navigateToPage } = useNavigation()

// Form data matching API structure exactly
const formData = ref({
  id: '',
  entrytype: '',
  citekey: '',
  title: '',
  author: '',
  journal: '',
  booktitle: '',
  publisher: '',
  year: null as number | null,
  volume: '',
  number: '',
  pages: '',
  url: '',
  is_approved: false
})

// Form state
const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})
const successMessage = ref('')

// Entry types from the API enum
const entryTypes = [
  'article', 'book', 'booklet', 'conference', 'inbook', 
  'incollection', 'inproceedings', 'manual', 'mastersthesis', 
  'misc', 'phdthesis', 'proceedings', 'techreport', 
  'unpublished', 'online', 'presentation'
]

// BibTeX import
const bibtexText = ref('')
const showBibtexImport = ref(false)

// Auto-generate ID from citekey or timestamp
const generateId = () => {
  if (formData.value.citekey) {
    formData.value.id = formData.value.citekey.toLowerCase().replace(/[^a-z0-9]/g, '')
  } else {
    // Fallback to timestamp-based ID
    formData.value.id = `pub_${Date.now()}`
  }
}

// Generate citekey from author and year
const generateCitekey = () => {
  if (!formData.value.author || !formData.value.year) return
  
  const firstAuthor = formData.value.author.split(' and ')[0]
  const lastName = firstAuthor.split(',')[0].trim().toLowerCase().replace(/\s+/g, '')
  formData.value.citekey = `${lastName}${formData.value.year}`
  
  // Auto-generate ID after citekey is generated
  generateId()
}

// Form validation
const validateForm = () => {
  errors.value = {}
  
  // Auto-generate ID if not present
  if (!formData.value.id.trim()) {
    generateId()
  }
  
  // Required fields from API spec
  if (!formData.value.entrytype) {
    errors.value.entrytype = t.value.forms.publication.validation.entryTypeRequired
  }
  
  if (!formData.value.citekey.trim()) {
    errors.value.citekey = 'Citekey is required.'
  }
  
  // Optional field validations
  if (formData.value.year && (formData.value.year < 0 || formData.value.year > 2147483647)) {
    errors.value.year = t.value.forms.publication.validation.yearInvalid
  }
  
  return Object.keys(errors.value).length === 0
}

// Submit form
const submitForm = async () => {
  clearError()
  
  if (!validateForm()) return
  
  isSubmitting.value = true
  successMessage.value = ''
  
  try {
    // Prepare data for API - convert empty strings to null for nullable fields
    const publicationData = {
      id: formData.value.id,
      entrytype: formData.value.entrytype,
      citekey: formData.value.citekey,
      title: formData.value.title || '',
      author: formData.value.author || '',
      journal: formData.value.journal || null,
      booktitle: formData.value.booktitle || null,
      publisher: formData.value.publisher || null,
      year: formData.value.year || undefined,
      volume: formData.value.volume || null,
      number: formData.value.number || null,
      pages: formData.value.pages || null,
      url: formData.value.url || null,
      is_approved: false // Always false by default
    }
    
    const success = await createPublication(publicationData)
    
    if (success) {
      successMessage.value = 'Publication created successfully! Redirecting to dashboard...'
      
      // Reset form
      formData.value = {
        id: '',
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
        is_approved: false
      }
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigateToPage('dashboard')
      }, 2000)
      
    } else {
      errors.value.general = error.value || t.value.forms.publication.errors.submitFailed
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
  } catch (err) {
    console.error('Publication creation error:', err)
    errors.value.general = 'An unexpected error occurred'
    // Scroll to top to show error
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } finally {
    isSubmitting.value = false
  }
}

// Parse BibTeX
const parseBibtex = () => {
  const lines = bibtexText.value.split('\n')
  
  for (const line of lines) {
    const titleMatch = line.match(/title\s*=\s*[{"](.*?)["}]/)
    if (titleMatch) formData.value.title = titleMatch[1]
    
    const authorMatch = line.match(/author\s*=\s*[{"](.*?)["}]/)
    if (authorMatch) formData.value.author = authorMatch[1]
    
    const journalMatch = line.match(/journal\s*=\s*[{"](.*?)["}]/)
    if (journalMatch) formData.value.journal = journalMatch[1]
    
    const yearMatch = line.match(/year\s*=\s*[{"]*(\d{4})["}]*/)
    if (yearMatch) formData.value.year = parseInt(yearMatch[1])
    
    const volumeMatch = line.match(/volume\s*=\s*[{"](.*?)["}]/)
    if (volumeMatch) formData.value.volume = volumeMatch[1]
    
    const pagesMatch = line.match(/pages\s*=\s*[{"](.*?)["}]/)
    if (pagesMatch) formData.value.pages = pagesMatch[1]
    
    const urlMatch = line.match(/url\s*=\s*[{"](.*?)["}]/)
    if (urlMatch) formData.value.url = urlMatch[1]
  }
  
  // Auto-generate citekey and id after parsing
  generateCitekey()
  showBibtexImport.value = false
}

// Computed error for Form component
const formError = computed(() => errors.value.general || error.value)
</script>

<template>
  <Form
    :title="t.forms.publication.titleCreate"
    :subtitle="t.forms.publication.subtitle"
    :success-message="successMessage"
    :error="formError"
  >
    <!-- BibTeX Import Section -->
    <div class="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 class="text-lg font-medium text-blue-900 mb-3">
        {{ t.forms.publication.bibtexImport.title }}
      </h3>
      <p class="text-sm text-blue-700 mb-4">
        {{ t.forms.publication.bibtexImport.description }}
      </p>
      
      <button
        @click="showBibtexImport = !showBibtexImport"
        class="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {{ showBibtexImport ? 'Hide Import' : 'Show Import' }}
      </button>

      <div v-if="showBibtexImport" class="space-y-4">
        <div>
          <textarea
            v-model="bibtexText"
            :placeholder="t.forms.publication.bibtexImport.placeholder"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="6"
          ></textarea>
        </div>
        <button
          @click="parseBibtex"
          :disabled="!bibtexText.trim()"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {{ t.forms.publication.bibtexImport.parse }}
        </button>
      </div>
    </div>

    <!-- Publication Form -->
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- Entry Type (required) -->
      <div>
        <label for="entrytype" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t.forms.publication.form.entryType }} *
        </label>
        <select
          id="entrytype"
          v-model="formData.entrytype"
          required
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': errors.entrytype }"
        >
          <option value="">{{ t.forms.publication.form.selectEntryType }}</option>
          <option v-for="type in entryTypes" :key="type" :value="type">
            {{ t.forms.publication.entryTypes[type as keyof typeof t.forms.publication.entryTypes] }}
          </option>
        </select>
        <p v-if="errors.entrytype" class="mt-1 text-sm text-red-600">
          {{ errors.entrytype }}
        </p>
      </div>

      <!-- Citekey (required) -->
      <div>
        <label for="citekey" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t.forms.publication.form.citekey }} *
        </label>
        <div class="flex space-x-2">
          <input
            id="citekey"
            v-model="formData.citekey"
            type="text"
            required
            class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            :class="{ 'border-red-500': errors.citekey }"
            :placeholder="t.forms.publication.form.citekeyPlaceholder"
            @input="generateId"
          />
          <button
            type="button"
            @click="generateCitekey"
            class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            :disabled="!formData.author || !formData.year"
          >
            Generate
          </button>
        </div>
        <p v-if="errors.citekey" class="mt-1 text-sm text-red-600">
          {{ errors.citekey }}
        </p>
        <p class="mt-1 text-xs text-gray-500">ID will be auto-generated from citekey</p>
      </div>

      <!-- Title -->
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t.forms.publication.form.title }}
        </label>
        <input
          id="title"
          v-model="formData.title"
          type="text"
          maxlength="255"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :placeholder="t.forms.publication.form.titlePlaceholder"
        />
      </div>

      <!-- Author -->
      <div>
        <label for="author" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t.forms.publication.form.authors }}
        </label>
        <input
          id="author"
          v-model="formData.author"
          type="text"
          maxlength="3000"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :placeholder="t.forms.publication.form.authorsPlaceholder"
          @input="generateCitekey"
        />
        <p class="mt-1 text-xs text-gray-500">{{ t.forms.publication.form.authorsHelp }}</p>
      </div>

      <!-- Journal -->
      <div>
        <label for="journal" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t.forms.publication.form.journal }}
        </label>
        <input
          id="journal"
          v-model="formData.journal"
          type="text"
          maxlength="255"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :placeholder="t.forms.publication.form.journalPlaceholder"
        />
      </div>

      <!-- Book Title -->
      <div>
        <label for="booktitle" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t.forms.publication.form.booktitle }}
        </label>
        <input
          id="booktitle"
          v-model="formData.booktitle"
          type="text"
          maxlength="255"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :placeholder="t.forms.publication.form.booktitlePlaceholder"
        />
      </div>

      <!-- Publisher -->
      <div>
        <label for="publisher" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t.forms.publication.form.publisher }}
        </label>
        <input
          id="publisher"
          v-model="formData.publisher"
          type="text"
          maxlength="255"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :placeholder="t.forms.publication.form.publisherPlaceholder"
        />
      </div>

      <!-- Year -->
      <div>
        <label for="year" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t.forms.publication.form.year }}
        </label>
        <input
          id="year"
          v-model.number="formData.year"
          type="number"
          min="0"
          max="2147483647"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :class="{ 'border-red-500': errors.year }"
          placeholder="2024"
          @input="generateCitekey"
        />
        <p v-if="errors.year" class="mt-1 text-sm text-red-600">
          {{ errors.year }}
        </p>
      </div>

      <!-- Volume -->
      <div>
        <label for="volume" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t.forms.publication.form.volume }}
        </label>
        <input
          id="volume"
          v-model="formData.volume"
          type="text"
          maxlength="255"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :placeholder="t.forms.publication.form.volumePlaceholder"
        />
      </div>

      <!-- Number -->
      <div>
        <label for="number" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t.forms.publication.form.number }}
        </label>
        <input
          id="number"
          v-model="formData.number"
          type="text"
          maxlength="255"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :placeholder="t.forms.publication.form.numberPlaceholder"
        />
      </div>

      <!-- Pages -->
      <div>
        <label for="pages" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t.forms.publication.form.pages }}
        </label>
        <input
          id="pages"
          v-model="formData.pages"
          type="text"
          maxlength="255"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :placeholder="t.forms.publication.form.pagesPlaceholder"
        />
      </div>

      <!-- URL -->
      <div>
        <label for="url" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t.forms.publication.form.url }}
        </label>
        <input
          id="url"
          v-model="formData.url"
          type="url"
          maxlength="255"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          :placeholder="t.forms.publication.form.urlPlaceholder"
        />
      </div>

      <!-- Approval Status Info -->
      <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p class="text-sm text-gray-600">
          <strong>Note:</strong> Publications are submitted for approval by default and will be reviewed before appearing publicly.
        </p>
      </div>

      <!-- Submit Button -->
      <div class="flex space-x-4 pt-6">
        <Button
          type="submit"
          :disabled="isSubmitting || isLoading"
          class="flex-1"
        >
          <span v-if="isSubmitting || isLoading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ t.forms.publication.form.submitting }}
          </span>
          <span v-else>
            {{ t.forms.publication.form.create }}
          </span>
        </Button>
        
        <Button
          type="button"
          variant="secondary"
          @click="navigateToPage('publications')"
        >
          {{ t.forms.publication.form.cancel }}
        </Button>
      </div>
    </form>
  </Form>
</template>
