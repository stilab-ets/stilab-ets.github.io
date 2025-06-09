<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'
import type { Publication } from '@/data/mockPublications'
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

// Methods
const getTypeColor = (type: Publication['type']) => {
  const colors: Record<Publication['type'], string> = {
    journal: 'bg-blue-100 text-blue-800',
    conference: 'bg-green-100 text-green-800',
    workshop: 'bg-yellow-100 text-yellow-800',
    thesis: 'bg-purple-100 text-purple-800',
    book: 'bg-red-100 text-red-800'
  }
  return colors[type] || 'bg-gray-100 text-gray-800'
}

const getTypeLabel = (type: Publication['type']) => {
  const typeKey = type as keyof typeof t.value.publications.publicationTypes
  return t.value.publications.publicationTypes[typeKey] || type
}

const filterByAuthor = (author: string) => {
  emit('filterByAuthor', author)
}

const openLink = (url: string) => {
  window.open(url, '_blank')
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
            getTypeColor(publication.type)
          ]">
            {{ getTypeLabel(publication.type) }}
          </span>
        </div>

        <!-- Authors -->
        <div class="mb-3">
          <p class="text-sm text-gray-600">
            <span class="font-medium">{{ t.publications.publicationCard.authors }}:</span>
            <span v-for="(author, index) in publication.authors" :key="author">
              <button @click="filterByAuthor(author)" class="text-[#08a4d4] hover:underline">
                {{ author }}
              </button>
              <span v-if="index < publication.authors.length - 1">, </span>
            </span>
          </p>
        </div>

        <!-- Venue and Year -->
        <div class="mb-3">
          <p class="text-sm text-gray-600">
            <span class="font-medium">{{ publication.venue }}</span> • {{ publication.year }}
            <span v-if="publication.citations > 0" class="ml-2">
              • {{ publication.citations }} {{ publication.citations > 1 ? t.publications.publicationCard.citations : t.publications.publicationCard.citation }}
            </span>
          </p>
        </div>

        <!-- Abstract -->
        <div class="mb-4">
          <p class="text-sm text-gray-700 leading-relaxed">
            {{ publication.abstract }}
          </p>
        </div>

        <!-- Tags -->
        <div v-if="publication.tags.length > 0" class="mb-4">
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in publication.tags" :key="tag"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Links -->
      <div class="flex flex-col space-y-2 lg:ml-6 lg:flex-shrink-0">
        <Button
          v-if="publication.pdfUrl"
          variant="outline"
          size="sm"
          class="hover:cursor-pointer"
          @click="openLink(publication.pdfUrl)"
        >
          <svg class="h-4 w-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clip-rule="evenodd" />
          </svg>
          {{ t.publications.links.pdf }}
        </Button>
        <Button
          v-if="publication.doiUrl"
          variant="outline"
          size="sm"
          @click="openLink(publication.doiUrl)"
          class="hover:cursor-pointer"
        >
          <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          {{ t.publications.links.doi }}
        </Button>
      </div>
    </div>
  </Card>
</template>