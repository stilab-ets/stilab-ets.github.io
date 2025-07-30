// src/components/publications/PublicationForm.vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'

const emit = defineEmits<{
  (e: 'navigate', page: string): void
}>()

const { t } = useLanguage()

// Form data
const formData = ref({
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
  url: ''
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

// Form validation
const validateForm = () => {
  errors.value = {}
  
  if (!formData.value.entrytype) {
    errors.value.entrytype = t.value.forms.publication.validation.entryTypeRequired
  }
  
  if (!formData.value.citekey.trim()) {
    errors.value.citekey = 'Citekey is required.'
  }
  
  if (formData.value.year && (formData.value.year < 1900 || formData.value.year > new Date().getFullYear() + 5)) {
    errors.value.year = t.value.forms.publication.validation.yearInvalid
  }
  
  return Object.keys(errors.value).length === 0
}

// Generate citekey from author and year
const generateCitekey = () => {
  if (!formData.value.author || !formData.value.year) return
  
  const firstAuthor = formData.value.author.split(' and ')[0]
  const lastName = firstAuthor.split(',')[0].trim().toLowerCase().replace(/\s+/g, '')
  formData.value.citekey = `${lastName}${formData.value.year}`
}

// Submit form
const submitForm = async () => {
  if (!validateForm()) return
  
  isSubmitting.value = true
  successMessage.value = ''
  
  try {
    const response = await fetch('/api/publications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData.value,
        is_approved: false // Default to false for approval workflow
      })
    })
    
    if (!response.ok) {
      throw new Error('Failed to create publication')
    }
    
    successMessage.value = 'Publication created successfully!'
    
    // Reset form
    formData.value = {
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
      url: ''
    }
    
  } catch (error) {
    errors.value.general = t.value.forms.publication.errors.submitFailed
  } finally {
    isSubmitting.value = false
  }
}

// Parse BibTeX
const parseBibtex = () => {
  // Simple BibTeX parser - you might want to use a proper library
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
  
  // Generate citekey if not present
  if (!formData.value.citekey) {
    generateCitekey()
  }
}

// Clear BibTeX
const clearBibtex = () => {
  bibtexText.value = ''
}

// Cancel and go back
const cancel = () => {
  emit('navigate', 'publications')
}

// Get entry type label with fallback translations
const getEntryTypeLabel = (type: string) => {
  return t.value.forms.publication.entryTypes[type as keyof typeof t.value.forms.publication.entryTypes] || type.charAt(0).toUpperCase() + type.slice(1)
}

// Generate preview BibTeX
const previewBibtex = computed(() => {
  if (!formData.value.entrytype || !formData.value.citekey) return ''
  
  let bibtex = `@${formData.value.entrytype}{${formData.value.citekey},\n`
  
  if (formData.value.title) bibtex += `  title = {${formData.value.title}},\n`
  if (formData.value.author) bibtex += `  author = {${formData.value.author}},\n`
  if (formData.value.journal) bibtex += `  journal = {${formData.value.journal}},\n`
  if (formData.value.booktitle) bibtex += `  booktitle = {${formData.value.booktitle}},\n`
  if (formData.value.publisher) bibtex += `  publisher = {${formData.value.publisher}},\n`
  if (formData.value.year) bibtex += `  year = {${formData.value.year}},\n`
  if (formData.value.volume) bibtex += `  volume = {${formData.value.volume}},\n`
  if (formData.value.number) bibtex += `  number = {${formData.value.number}},\n`
  if (formData.value.pages) bibtex += `  pages = {${formData.value.pages}},\n`
  if (formData.value.url) bibtex += `  url = {${formData.value.url}},\n`
  
  bibtex = bibtex.replace(/,\n$/, '\n') + '}'
  
  return bibtex
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ t.forms.publication.titleCreate }}
        </h1>
        <p class="mt-2 text-gray-600">
          {{ t.forms.publication.subtitle }}
        </p>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
        {{ successMessage }}
      </div>

      <!-- General Error -->
      <div v-if="errors.general" class="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        {{ errors.general }}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Form -->
        <div class="lg:col-span-2">
          <Card>
            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Entry Type -->
              <div>
                <label for="entrytype" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.forms.publication.form.entryType }} *
                </label>
                <select
                  id="entrytype"
                  v-model="formData.entrytype"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:cursor-pointer"
                  :class="{ 'border-red-500': errors.entrytype }"
                >
                  <option value="">{{ t.forms.publication.form.selectEntryType }}</option>
                  <option v-for="type in entryTypes" :key="type" :value="type">
                    {{ getEntryTypeLabel(type) }}
                  </option>
                </select>
                <p v-if="errors.entrytype" class="mt-1 text-sm text-red-600">{{ errors.entrytype }}</p>
              </div>

              <!-- Citekey -->
              <div>
                <label for="citekey" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.forms.publication.form.citekey }} *
                </label>
                <input
                  id="citekey"
                  v-model="formData.citekey"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :class="{ 'border-red-500': errors.citekey }"
                  :placeholder="t.forms.publication.form.citekeyPlaceholder"
                  maxlength="255"
                />
                <p class="mt-1 text-xs text-gray-500">{{ t.forms.publication.form.citekeyHelp }}</p>
                <p v-if="errors.citekey" class="mt-1 text-sm text-red-600">{{ errors.citekey }}</p>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  @click="generateCitekey"
                  class="mt-2 hover:cursor-pointer"
                >
                  Generate from Author & Year
                </Button>
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="t.forms.publication.form.titlePlaceholder"
                  maxlength="255"
                />
              </div>

              <!-- Authors -->
              <div>
                <label for="author" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.forms.publication.form.authors }}
                </label>
                <textarea
                  id="author"
                  v-model="formData.author"
                  rows="2"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="t.forms.publication.form.authorsPlaceholder"
                  maxlength="3000"
                ></textarea>
                <p class="mt-1 text-xs text-gray-500">{{ t.forms.publication.form.authorsHelp }}</p>
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
                  min="1900"
                  :max="new Date().getFullYear() + 5"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :class="{ 'border-red-500': errors.year }"
                />
                <p v-if="errors.year" class="mt-1 text-sm text-red-600">{{ errors.year }}</p>
              </div>

              <!-- Journal -->
              <div v-if="formData.entrytype === 'article'">
                <label for="journal" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.forms.publication.form.journal }}
                </label>
                <input
                  id="journal"
                  v-model="formData.journal"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="t.forms.publication.form.journalPlaceholder"
                  maxlength="255"
                />
              </div>

              <!-- Book Title -->
              <div v-if="['inproceedings', 'incollection', 'inbook', 'conference'].includes(formData.entrytype)">
                <label for="booktitle" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.forms.publication.form.booktitle }}
                </label>
                <input
                  id="booktitle"
                  v-model="formData.booktitle"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="t.forms.publication.form.booktitlePlaceholder"
                  maxlength="255"
                />
              </div>

              <!-- Publisher -->
              <div v-if="['book', 'inbook', 'incollection', 'manual', 'proceedings'].includes(formData.entrytype)">
                <label for="publisher" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t.forms.publication.form.publisher }}
                </label>
                <input
                  id="publisher"
                  v-model="formData.publisher"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="t.forms.publication.form.publisherPlaceholder"
                  maxlength="255"
                />
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="t.forms.publication.form.volumePlaceholder"
                  maxlength="255"
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="t.forms.publication.form.numberPlaceholder"
                  maxlength="255"
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="t.forms.publication.form.pagesPlaceholder"
                  maxlength="255"
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
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="t.forms.publication.form.urlPlaceholder"
                  maxlength="255"
                />
              </div>

              <!-- Form Actions -->
              <div class="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  @click="cancel"
                  class="hover:cursor-pointer"
                >
                  {{ t.forms.publication.form.cancel }}
                </Button>
                <Button
                  type="submit"
                  :disabled="isSubmitting"
                  class="hover:cursor-pointer"
                >
                  {{ isSubmitting ? t.forms.publication.form.submitting : t.forms.publication.form.create }}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- BibTeX Import -->
          <Card>
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              {{ t.forms.publication.bibtexImport.title }}
            </h3>
            <p class="text-sm text-gray-600 mb-4">
              {{ t.forms.publication.bibtexImport.description }}
            </p>
            
            <textarea
              v-model="bibtexText"
              rows="6"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
              :placeholder="t.forms.publication.bibtexImport.placeholder"
            ></textarea>
            
            <div class="flex space-x-2">
              <Button
                type="button"
                size="sm"
                @click="parseBibtex"
                :disabled="!bibtexText.trim()"
                class="hover:cursor-pointer"
              >
                {{ t.forms.publication.bibtexImport.parse }}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                @click="clearBibtex"
                class="hover:cursor-pointer"
              >
                {{ t.forms.publication.bibtexImport.clear }}
              </Button>
            </div>
          </Card>

          <!-- BibTeX Preview -->
          <Card v-if="previewBibtex">
            <h3 class="text-lg font-medium text-gray-900 mb-4">
              {{ t.forms.publication.preview.title }}
            </h3>
            <pre class="text-xs bg-gray-100 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">{{ previewBibtex }}</pre>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>