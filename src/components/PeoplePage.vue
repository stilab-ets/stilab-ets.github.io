<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockResearchers, researchDomains, type Researcher } from '../data/mockResearchers'

// State
const searchQuery = ref('')
const selectedDomain = ref('')
const selectedStatus = ref('')
const selectedResearcher = ref<Researcher | null>(null)

// Computed
const filteredResearchers = computed(() => {
  return mockResearchers.filter(researcher => {
    const matchesSearch = !searchQuery.value ||
      researcher.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      researcher.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      researcher.researchDomains.some(domain =>
        domain.toLowerCase().includes(searchQuery.value.toLowerCase())
      )

    const matchesDomain = !selectedDomain.value ||
      researcher.researchDomains.includes(selectedDomain.value)

    const matchesStatus = !selectedStatus.value ||
      researcher.status === selectedStatus.value

    return matchesSearch && matchesDomain && matchesStatus
  })
})

// Methods
const openModal = (researcher: Researcher) => {
  selectedResearcher.value = researcher
}

const closeModal = () => {
  selectedResearcher.value = null
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Notre <span class="text-[#08a4d4]">Équipe</span>
          </h1>
          <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les chercheurs et doctorants qui forment notre laboratoire de génie logiciel
          </p>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex flex-col md:flex-row gap-4 items-end">
          <!-- Search Bar -->
          <div class="flex-1">
            <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
              Rechercher un membre
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input id="search" v-model="searchQuery" type="text" placeholder="Nom, titre, domaine de recherche..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#08a4d4] focus:border-[#08a4d4]" />
            </div>
          </div>

          <!-- Domain Filter -->
          <div class="w-full md:w-64">
            <label for="domain-filter" class="block text-sm font-medium text-gray-700 mb-2">
              Domaine de recherche
            </label>
            <select id="domain-filter" v-model="selectedDomain"
              class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
              <option value="">Tous les domaines</option>
              <option v-for="domain in researchDomains" :key="domain" :value="domain">
                {{ domain }}
              </option>
            </select>
          </div>

          <!-- Status Filter -->
          <div class="w-full md:w-48">
            <label for="status-filter" class="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <select id="status-filter" v-model="selectedStatus"
              class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
              <option value="">Tous</option>
              <option value="active">Actifs</option>
              <option value="alumni">Alumni</option>
              <option value="visitor">Visiteurs</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Results Counter -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-sm text-gray-600 mb-6">
        {{ filteredResearchers.length }} membre{{ filteredResearchers.length > 1 ? 's' : '' }} trouvé{{
          filteredResearchers.length > 1 ? 's' : '' }}
      </p>
    </div>

    <!-- People Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="researcher in filteredResearchers" :key="researcher.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
          @click="openModal(researcher)">
          <!-- Researcher Card -->
          <div class="p-6">
            <!-- Photo and Basic Info -->
            <div class="flex items-center mb-4">
              <img :src="researcher.photo" :alt="researcher.name"
                class="h-16 w-16 rounded-full object-cover flex-shrink-0" />
              <div class="ml-4 flex-1">
                <h3 class="text-lg font-semibold text-gray-900">{{ researcher.name }}</h3>
                <p class="text-sm text-gray-600">{{ researcher.title }}</p>
                <p class="text-sm text-[#08a4d4] capitalize">{{ researcher.status }}</p>
              </div>
            </div>

            <!-- Research Domains -->
            <div class="mb-4">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Domaines de recherche</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="domain in researcher.researchDomains.slice(0, 3)" :key="domain"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ domain }}
                </span>
                <span v-if="researcher.researchDomains.length > 3"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  +{{ researcher.researchDomains.length - 3 }}
                </span>
              </div>
            </div>

            <!-- Contact Links -->
            <div class="flex items-center justify-between">
              <div class="flex space-x-2">
                <a v-if="researcher.email" :href="`mailto:${researcher.email}`"
                  class="text-gray-400 hover:text-[#08a4d4] transition-colors" @click.stop>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </a>
                <a v-if="researcher.githubUrl" :href="researcher.githubUrl" target="_blank"
                  class="text-gray-400 hover:text-[#08a4d4] transition-colors" @click.stop>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clip-rule="evenodd" />
                  </svg>
                </a>
                <a v-if="researcher.linkedinUrl" :href="researcher.linkedinUrl" target="_blank"
                  class="text-gray-400 hover:text-[#08a4d4] transition-colors" @click.stop>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                      clip-rule="evenodd" />
                  </svg>
                </a>
              </div>

              <!-- Awards Icons -->
              <div v-if="researcher.awards.length > 0" class="flex space-x-1">
                <span v-for="award in researcher.awards.slice(0, 3)" :key="award.id" :title="award.title"
                  class="text-lg">
                  {{ award.icon }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredResearchers.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun membre trouvé</h3>
        <p class="mt-1 text-sm text-gray-500">Essayez de modifier vos critères de recherche.</p>
      </div>
    </div>

    <!-- Researcher Modal -->
    <div v-if="selectedResearcher" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click="closeModal">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white"
        @click.stop>
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-4 border-b">
          <div class="flex items-center">
            <img :src="selectedResearcher.photo" :alt="selectedResearcher.name"
              class="h-20 w-20 rounded-full object-cover" />
            <div class="ml-4">
              <h2 class="text-2xl font-bold text-gray-900">{{ selectedResearcher.name }}</h2>
              <p class="text-lg text-gray-600">{{ selectedResearcher.title }}</p>
              <div class="flex items-center mt-2 space-x-4">
                <a v-if="selectedResearcher.email" :href="`mailto:${selectedResearcher.email}`"
                  class="text-[#08a4d4] hover:underline">
                  {{ selectedResearcher.email }}
                </a>
                <span v-if="selectedResearcher.phone" class="text-gray-600">
                  {{ selectedResearcher.phone }}
                </span>
              </div>
            </div>
          </div>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="mt-6 max-h-96 overflow-y-auto">
          <!-- Biography -->
          <section class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Biographie</h3>
            <p class="text-gray-700 leading-relaxed">{{ selectedResearcher.biography }}</p>
          </section>

          <!-- Research Domains -->
          <section class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Domaines de recherche</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="domain in selectedResearcher.researchDomains" :key="domain"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {{ domain }}
              </span>
            </div>
          </section>

          <!-- Awards -->
          <section v-if="selectedResearcher.awards.length > 0" class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Prix et distinctions</h3>
            <div class="space-y-2">
              <div v-for="award in selectedResearcher.awards" :key="award.id"
                class="flex items-center p-3 bg-yellow-50 rounded-lg">
                <span class="text-2xl mr-3">{{ award.icon }}</span>
                <div>
                  <p class="font-medium text-gray-900">{{ award.title }}</p>
                  <p class="text-sm text-gray-600">{{ award.organization }}, {{ award.year }}</p>
                </div>
              </div>
            </div>
          </section>

          <!-- Courses Taught -->
          <section v-if="selectedResearcher.coursesTaught.length > 0" class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Enseignements</h3>
            <div class="space-y-3">
              <div v-for="course in selectedResearcher.coursesTaught" :key="course.id"
                class="border border-gray-200 rounded-lg p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <h4 class="font-medium text-gray-900">{{ course.title }}</h4>
                    <p class="text-sm text-gray-600">{{ course.code }} - {{ course.semester }}</p>
                    <p class="text-sm text-gray-500 mt-1">{{ course.description }}</p>
                  </div>
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {{ course.level }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <!-- External Links -->
          <section class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-3">Liens externes</h3>
            <div class="flex flex-wrap gap-3">
              <a v-if="selectedResearcher.githubUrl" :href="selectedResearcher.githubUrl" target="_blank"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg class="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clip-rule="evenodd" />
                </svg>
                GitHub
              </a>
              <a v-if="selectedResearcher.linkedinUrl" :href="selectedResearcher.linkedinUrl" target="_blank"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg class="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                    clip-rule="evenodd" />
                </svg>
                LinkedIn
              </a>
              <a v-if="selectedResearcher.personalWebsite" :href="selectedResearcher.personalWebsite" target="_blank"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Site Web
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>