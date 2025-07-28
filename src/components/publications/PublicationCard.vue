<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import type { Publication } from '@/services/MainAPI'

// UI Components
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'

interface Props {
  publication: Publication
}

const props = defineProps<Props>()
const emit = defineEmits<{
  filterByAuthor: [author: string]
}>()

const { t } = useLanguage()

const showBibtex = ref(false)
const copySuccess = ref(false)

// Parse authors from the authors string
const authors = computed(() => {
  if (!props.publication.authors) return []
  return props.publication.authors.split(' and ').map(author => author.trim())
})

// Generate BibTeX format
const generatedBibtex = computed(() => {
  const pub = props.publication
  if (!pub.publication_type || !pub.title) return ''
  
  const citekey = generateCitekey()
  let bibtex = `@${pub.publication_type}{${citekey},\n`
  
  if (pub.title) bibtex += `  title={${pub.title}},\n`
  if (pub.authors) bibtex += `  author={${pub.authors}},\n`
  if (pub.journal) bibtex += `  journal={${pub.journal}},\n`
  if (pub.year) bibtex += `  year={${pub.year}},\n`
  if (pub.doi) bibtex += `  doi={${pub.doi}},\n`
  if (pub.url) bibtex += `  url={${pub.url}},\n`
  
  bibtex += '}'
  return bibtex
})

const generateCitekey = (): string => {
  const pub = props.publication
  if (!pub.authors || !pub.title) return `pub${pub.id}`
  
  const firstAuthor = pub.authors.split(' and ')[0].trim()
  const lastName = firstAuthor.split(',')[0].trim() || firstAuthor.split(' ').pop()
  const year = pub.year || new Date().getFullYear()
  const firstWord = pub.title.split(' ').find(word => 
    word.length > 3 && !['the', 'and', 'for', 'with'].includes(word.toLowerCase())
  ) || 'paper'
  
  return `${lastName}${year}${firstWord}`.toLowerCase().replace(/[^a-z0-9]/g, '')
}

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    article: 'bg-blue-100 text-blue-800',
    conference: 'bg-green-100 text-green-800',
    workshop: 'bg-yellow-100 text-yellow-800',
    thesis: 'bg-purple-100 text-purple-800',
    book: 'bg-red-100 text-red-800',
  }
  return colors[type] || 'bg-gray-100 text-gray-800'
}

const getTypeLabel = (type: string) => {
  const typeKey = type as keyof typeof t.value.publications.publicationTypes
  return t.value.publications.publicationTypes[typeKey] || type
}

const filterByAuthor = (author: string) => {
  emit('filterByAuthor', author)
}

const openLink = (url: string) => {
  window.open(url, '_blank')
}

const toggleBibtex = () => {
  showBibtex.value = !showBibtex.value
}

const copyBibtex = async () => {
  try {
    await navigator.clipboard.writeText(generatedBibtex.value)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 1500)
  } catch (err) {
    console.error('Failed to copy BibTeX:', err)
  }
}
</script>

<template>
  <Card variant="hover">
    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between">
      <div class="flex-1">
        <!-- Title and Type -->
        <div class="flex items-start justify-between mb-3">
          <h3 class="text-lg font-semibold text-gray-900 flex-1 mr-4">
            {{ publication.title }}
          </h3>
          <span :class="[
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            getTypeColor(publication.publication_type)
          ]">
            {{ getTypeLabel(publication.publication_type) }}
          </span>
        </div>

        <!-- Authors -->
        <div class="mb-3" v-if="authors.length > 0">
          <p class="text-sm text-gray-600">
            <span class="font-medium">{{ t.publications.publicationCard.authors }}:</span>
            <span v-for="(author, index) in authors" :key="author">
              <button 
                @click="filterByAuthor(author)" 
                class="text-[#08a4d4] hover:underline"
                type="button"
              >
                {{ author }}
              </button>
              <span v-if="index < authors.length - 1">, </span>
            </span>
          </p>
        </div>

        <!-- Publication Details -->
        <div class="mb-3 text-sm text-gray-600">
          <span class="font-medium">
            {{ publication.journal || '-' }}
          </span>
          <template v-if="publication.year">
            • {{ publication.year }}
          </template>
        </div>

        <!-- Abstract -->
        <div v-if="publication.abstract" class="mb-3">
          <p class="text-sm text-gray-600 line-clamp-3">
            {{ publication.abstract }}
          </p>
        </div>

        <!-- BibTeX Controls -->
        <div class="mb-4 flex items-center space-x-4">
          <button
            @click="toggleBibtex"
            class="text-sm text-[#08a4d4] hover:underline"
            type="button"
          >
            {{ showBibtex ? t.publications.publicationCard.hideBibtex : t.publications.publicationCard.showBibtex }}
          </button>

          <button
            v-if="showBibtex"
            @click="copyBibtex"
            class="text-sm text-[#08a4d4] hover:underline"
            type="button"
          >
            📋 {{ copySuccess ? t.publications.publicationCard.bibtexCopied : t.publications.publicationCard.copyBibtex }}
          </button>
        </div>

        <!-- BibTeX Content -->
        <pre
          v-if="showBibtex"
          class="mt-2 p-3 bg-gray-100 rounded text-xs whitespace-pre-wrap font-mono overflow-x-auto"
        >{{ generatedBibtex }}</pre>
      </div>

      <!-- Action Links -->
      <div class="flex flex-col space-y-2 lg:ml-6 lg:flex-shrink-0">
        <Button
          v-if="publication.url || publication.doi"
          variant="outline"
          size="sm"
          @click="openLink(publication.url || `https://doi.org/${publication.doi}`)"
          class="hover:cursor-pointer"
        >
          🔗 {{ t.publications.links.doi }}
        </Button>
      </div>
    </div>
  </Card>
</template>