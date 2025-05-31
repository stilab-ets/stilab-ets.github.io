<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockVacancies, type Vacancy } from '../data/mockPublications'

// State
const selectedType = ref('')
const selectedTag = ref('')
const sortBy = ref('deadline-asc')

// Computed
const availableTags = computed(() => {
  const allTags = mockVacancies.flatMap(vacancy => vacancy.tags)
  return [...new Set(allTags)].sort()
})

const filteredVacancies = computed(() => {
  return mockVacancies.filter(vacancy => {
    const matchesType = !selectedType.value || vacancy.type === selectedType.value
    const matchesTag = !selectedTag.value || vacancy.tags.includes(selectedTag.value)

    return matchesType && matchesTag
  })
})

const sortedVacancies = computed(() => {
  const sorted = [...filteredVacancies.value]

  switch (sortBy.value) {
    case 'deadline-asc':
      return sorted.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    case 'deadline-desc':
      return sorted.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime())
    case 'type':
      return sorted.sort((a, b) => a.type.localeCompare(b.type))
    case 'recent':
      return sorted.reverse() // Assuming the array is in chronological order
    default:
      return sorted
  }
})

// Methods
const getTypeColor = (type: string) => {
  const colors = {
    phd: 'bg-purple-100 text-purple-800',
    postdoc: 'bg-blue-100 text-blue-800',
    researcher: 'bg-green-100 text-green-800',
    engineer: 'bg-orange-100 text-orange-800',
    intern: 'bg-yellow-100 text-yellow-800'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const getTypeLabel = (type: string) => {
  const labels = {
    phd: 'Doctorat',
    postdoc: 'Post-doctorat',
    researcher: 'Chercheur',
    engineer: 'Ingénieur',
    intern: 'Stage'
  }
  return labels[type as keyof typeof labels] || type
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const isDeadlineSoon = (deadline: string) => {
  const deadlineDate = new Date(deadline)
  const today = new Date()
  const diffTime = deadlineDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays <= 14 && diffDays >= 0
}

const getDaysUntilDeadline = (deadline: string) => {
  const deadlineDate = new Date(deadline)
  const today = new Date()
  const diffTime = deadlineDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return 'Date limite dépassée'
  } else if (diffDays === 0) {
    return 'Date limite aujourd\'hui'
  } else if (diffDays === 1) {
    return 'Date limite demain'
  } else if (diffDays <= 7) {
    return `${diffDays} jours restants`
  } else {
    return `${diffDays} jours restants`
  }
}

const shareVacancy = (vacancy: Vacancy) => {
  if (navigator.share) {
    navigator.share({
      title: vacancy.title,
      text: vacancy.description,
      url: window.location.href
    })
  } else {
    // Fallback: copy to clipboard
    const shareText = `${vacancy.title}\n\n${vacancy.description}\n\n${window.location.href}`
    navigator.clipboard.writeText(shareText).then(() => {
      alert('Lien copié dans le presse-papiers!')
    })
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span class="text-[#08a4d4]">Recrutements</span> & Opportunités
          </h1>
          <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Rejoignez notre équipe de recherche en génie logiciel
          </p>
        </div>
      </div>
    </div>

    <!-- Information Banner -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">
              Pourquoi nous rejoindre ?
            </h3>
            <ul class="text-sm text-gray-700 space-y-1">
              <li>• Recherche de pointe en génie logiciel</li>
              <li>• Collaboration avec l'industrie</li>
              <li>• Équipe internationale et dynamique</li>
              <li>• Équipements et technologies modernes</li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">
              Contact RH
            </h3>
            <div class="text-sm text-gray-700">
              <p>📧 recrutement@labo-software.fr</p>
              <p>📞 +33 1 23 45 67 89</p>
              <p>📍 Université de Recherche, Bâtiment Informatique</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Type Filter -->
          <div>
            <label for="type-filter" class="block text-sm font-medium text-gray-700 mb-2">
              Type de poste
            </label>
            <select id="type-filter" v-model="selectedType"
              class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
              <option value="">Tous les types</option>
              <option value="phd">Doctorat</option>
              <option value="postdoc">Post-doctorat</option>
              <option value="researcher">Chercheur</option>
              <option value="engineer">Ingénieur</option>
              <option value="intern">Stage</option>
            </select>
          </div>

          <!-- Tag Filter -->
          <div>
            <label for="tag-filter" class="block text-sm font-medium text-gray-700 mb-2">
              Domaine
            </label>
            <select id="tag-filter" v-model="selectedTag"
              class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
              <option value="">Tous les domaines</option>
              <option v-for="tag in availableTags" :key="tag" :value="tag">
                {{ tag }}
              </option>
            </select>
          </div>

          <!-- Sort -->
          <div>
            <label for="sort" class="block text-sm font-medium text-gray-700 mb-2">
              Trier par
            </label>
            <select id="sort" v-model="sortBy"
              class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
              <option value="deadline-asc">Date limite (proche)</option>
              <option value="deadline-desc">Date limite (lointaine)</option>
              <option value="type">Type de poste</option>
              <option value="recent">Plus récents</option>
            </select>
          </div>
        </div>

        <!-- Results info -->
        <div class="mt-4">
          <p class="text-sm text-gray-600">
            {{ sortedVacancies.length }} offre{{ sortedVacancies.length > 1 ? 's' : '' }} disponible{{
              sortedVacancies.length > 1 ? 's' : '' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Vacancy Cards -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="space-y-6">
        <div v-for="vacancy in sortedVacancies" :key="vacancy.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 p-6">
          <!-- Vacancy Card Header -->
          <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-3',
                  getTypeColor(vacancy.type)
                ]">
                  {{ getTypeLabel(vacancy.type) }}
                </span>
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  isDeadlineSoon(vacancy.deadline) ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                ]">
                  {{ isDeadlineSoon(vacancy.deadline) ? 'Urgent' : 'Standard' }}
                </span>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ vacancy.title }}</h3>
              <div class="flex flex-wrap items-center text-sm text-gray-600 space-x-4 mb-3">
                <div class="flex items-center">
                  <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span class="font-medium">Superviseur:</span>
                  <span class="ml-1">{{ vacancy.supervisor }}</span>
                </div>
                <div v-if="vacancy.duration" class="flex items-center">
                  <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{{ vacancy.duration }}</span>
                </div>
                <div v-if="vacancy.salary" class="flex items-center">
                  <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span>{{ vacancy.salary }}</span>
                </div>
              </div>
            </div>

            <!-- Dates -->
            <div class="flex flex-col text-sm text-gray-600 lg:text-right lg:ml-6">
              <div class="flex items-center lg:justify-end mb-1">
                <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="font-medium">Date limite:</span>
                <span class="ml-1">{{ formatDate(vacancy.deadline) }}</span>
              </div>
              <div class="flex items-center lg:justify-end">
                <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="font-medium">Début:</span>
                <span class="ml-1">{{ formatDate(vacancy.startDate) }}</span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-4">
            <p class="text-gray-700 leading-relaxed">{{ vacancy.description }}</p>
          </div>

          <!-- Requirements -->
          <div class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Profil recherché</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div v-for="requirement in vacancy.requirements" :key="requirement"
                class="flex items-center text-sm text-gray-600">
                <svg class="h-3 w-3 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
                </svg>
                {{ requirement }}
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div class="mb-4">
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in vacancy.tags" :key="tag"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100">
            <div class="text-sm text-gray-500 mb-3 sm:mb-0">
              <span :class="[
                'font-medium',
                isDeadlineSoon(vacancy.deadline) ? 'text-red-600' : 'text-gray-700'
              ]">
                {{ getDaysUntilDeadline(vacancy.deadline) }}
              </span>
            </div>
            <div class="flex space-x-3">
              <button @click="shareVacancy(vacancy)"
                class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Partager
              </button>
              <a :href="vacancy.applyUrl" target="_blank"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded text-white bg-[#08a4d4] hover:bg-blue-600 transition-colors">
                Postuler
                <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="sortedVacancies.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Aucune offre trouvée</h3>
        <p class="mt-1 text-sm text-gray-500">Essayez de modifier vos filtres ou revenez plus tard.</p>
      </div>
    </div>
  </div>
</template>