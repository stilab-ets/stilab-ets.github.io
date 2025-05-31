<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockPublications, type Publication } from '../data/mockPublications'

// State
const searchQuery = ref('')
const selectedYear = ref('')
const selectedType = ref('')
const sortBy = ref('year-desc')

// Computed
const availableYears = computed(() => {
  const years = [...new Set(mockPublications.map(p => p.year))].sort((a, b) => b - a)
  return years
})

const filteredPublications = computed(() => {
  return mockPublications.filter(publication => {
    const matchesSearch = !searchQuery.value ||
      publication.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      publication.authors.some(author =>
        author.toLowerCase().includes(searchQuery.value.toLowerCase())
      ) ||
      publication.venue.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      publication.abstract.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesYear = !selectedYear.value ||
      publication.year.toString() === selectedYear.value

    const matchesType = !selectedType.value ||
      publication.type === selectedType.value

    return matchesSearch && matchesYear && matchesType
  })
})

const sortedPublications = computed(() => {
  const sorted = [...filteredPublications.value]

  switch (sortBy.value) {
    case 'year-desc':
      return sorted.sort((a, b) => b.year - a.year)
    case 'year-asc':
      return sorted.sort((a, b) => a.year - b.year)
    case 'citations-desc':
      return sorted.sort((a, b) => b.citations - a.citations)
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return sorted
  }
})

// Methods
const getTypeColor = (type: string) => {
  const colors = {
    journal: 'bg-blue-100 text-blue-800',
    conference: 'bg-green-100 text-green-800',
    workshop: 'bg-yellow-100 text-yellow-800',
    thesis: 'bg-purple-100 text-purple-800',
    book: 'bg-red-100 text-red-800'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const getTypeLabel = (type: string) => {
  const labels = {
    journal: 'Journal',
    conference: 'Conférence',
    workshop: 'Workshop',
    thesis: 'Thèse',
    book: 'Livre'
  }
  return labels[type as keyof typeof labels] || type
}

const filterByAuthor = (author: string) => {
  searchQuery.value = author
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nos <span class="text-[#08a4d4]">Publications</span>
          </h1>
          <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les travaux de recherche publiés par notre laboratoire
          </p>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Search Input -->
          <div class="lg:col-span-2">
            <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
              Rechercher une publication
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input id="search" v-model="searchQuery" type="text" placeholder="Titre, auteur, venue..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#08a4d4] focus:border-[#08a4d4]" />
            </div>
          </div>

          <!-- Year Filter -->
          <div>
            <label for="year-filter" class="block text-sm font-medium text-gray-700 mb-2">
              Année
            </label>
            <select id="year-filter" v-model="selectedYear"
              class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
              <option value="">Toutes</option>
              <option v-for="year in availableYears" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>

          <!-- Type Filter -->
          <div>
            <label for="type-filter" class="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select id="type-filter" v-model="selectedType"
              class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
              <option value="">Tous</option>
              <option value="journal">Journal</option>
              <option value="conference">Conférence</option>
              <option value="workshop">Workshop</option>
              <option value="thesis">Thèse</option>
              <option value="book">Livre</option>
            </select>
          </div>
        </div>

        <!-- Sort Options -->
        <div class="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center">
            <label for="sort" class="text-sm font-medium text-gray-700 mr-3">
              Trier par:
            </label>
            <select id="sort" v-model="sortBy"
              class="px-3 py-1 border border-gray-300 bg-white rounded-md text-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
              <option value="year-desc">Année (plus récent)</option>
              <option value="year-asc">Année (plus ancien)</option>
              <option value="citations-desc">Citations (plus cité)</option>
              <option value="title-asc">Titre (A-Z)</option>
            </select>
          </div>
          <p class="text-sm text-gray-600 mt-2 sm:mt-0">
            {{ filteredPublications.length }} publication{{ filteredPublications.length > 1 ? 's' : '' }} trouvée{{
              filteredPublications.length > 1 ? 's' : '' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Publications Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="space-y-6">
        <div v-for="publication in sortedPublications" :key="publication.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 p-6">
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
                  <span class="font-medium">Auteurs:</span>
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
                    • {{ publication.citations }} citation{{ publication.citations > 1 ? 's' : '' }}
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
              <a v-if="publication.pdfUrl" :href="publication.pdfUrl" target="_blank"
                class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg class="h-4 w-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clip-rule="evenodd" />
                </svg>
                PDF
              </a>
              <a v-if="publication.doiUrl" :href="publication.doiUrl" target="_blank"
                class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                DOI
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredPublications.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Aucune publication trouvée</h3>
        <p class="mt-1 text-sm text-gray-500">Essayez de modifier vos critères de recherche.</p>
      </div>
    </div>
  </div>
</template>