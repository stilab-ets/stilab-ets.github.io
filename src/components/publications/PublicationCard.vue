<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import { useLanguage } from '@/composables/useLanguage'
import { ref } from 'vue'

interface Props {
  publication: {
    id: string
    entrytype: string
    citekey: string
    title: string
    author: string
    journal: string | null
    booktitle: string | null
    publisher: string | null
    year: number
    volume: string | null
    number: string | null
    pages: string | null
    url: string | null
    is_approved: boolean
    bibtex: string
  }
}

const props = defineProps<Props>()
const emit = defineEmits<{
  filterByAuthor: [author: string]
}>()

const { t } = useLanguage()

const authors = props.publication.author.split(' and ')
const showBibtex = ref(false)
const copySuccess = ref(false)

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    article: 'bg-blue-100 text-blue-800',
    booklet: 'bg-green-100 text-green-800',
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
    await navigator.clipboard.writeText(props.publication.bibtex)
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
    <!-- Publication Card -->
    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between">
      <div class="flex-1">
        <!-- Title and Type -->
        <div class="flex items-start justify-between mb-3">
          <h3 class="text-lg font-semibold text-gray-900 flex-1 mr-4">
            {{ publication.title }}
          </h3>
          <span :class="[
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            getTypeColor(publication.entrytype)
          ]">
            {{ getTypeLabel(publication.entrytype) }}
          </span>
        </div>

        <!-- Authors -->
        <div class="mb-3">
          <p class="text-sm text-gray-600">
            <span class="font-medium">{{ t.publications.publicationCard.authors }}:</span>
            <span v-for="(author, index) in authors" :key="author">
              <button @click="filterByAuthor(author)" class="text-[#08a4d4] hover:underline">
                {{ author }}
              </button>
              <span v-if="index < authors.length - 1">, </span>
            </span>
          </p>
        </div>

        <!-- Venue, Year, Volume, Number, Pages -->
        <div class="mb-3 text-sm text-gray-600">
          <span class="font-medium">
            {{ publication.journal || publication.booktitle || publication.publisher || '-' }}
          </span>
          • {{ publication.year }}
          <template v-if="publication.volume"> • Vol. {{ publication.volume }}</template>
          <template v-if="publication.number"> • No. {{ publication.number }}</template>
          <template v-if="publication.pages"> • pp. {{ publication.pages }}</template>
        </div>

        <!-- Bibtex toggle -->
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

        <!-- Bibtex content -->
        <pre
          v-if="showBibtex"
          class="mt-2 p-3 bg-gray-100 rounded text-xs whitespace-pre-wrap font-mono overflow-x-auto"
        >
{{ publication.bibtex }}
        </pre>
      </div>

      <!-- Links -->
      <div class="flex flex-col space-y-2 lg:ml-6 lg:flex-shrink-0">
        <Button
          v-if="publication.url"
          variant="outline"
          size="sm"
          @click="openLink(publication.url)"
          class="hover:cursor-pointer"
        >
          🔗 {{ t.publications.links.doi }}
        </Button>
      </div>
    </div>
  </Card>
</template>
