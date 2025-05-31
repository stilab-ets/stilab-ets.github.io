<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockMScProjects, type MScProject } from '../data/mockPublications'

// State
const searchQuery = ref('')
const selectedDomain = ref('')
const selectedStatus = ref('')
const showModal = ref(false)
const selectedProject = ref<MScProject | null>(null)

// Interest form data
const interestForm = ref({
  name: '',
  email: '',
  level: '',
  motivation: ''
})

// Computed
const availableDomains = computed(() => {
  return [...new Set(mockMScProjects.map(project => project.domain))].sort()
})

const filteredProjects = computed(() => {
  return mockMScProjects.filter(project => {
    const matchesSearch = !searchQuery.value ||
      project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.abstract.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.supervisor.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      project.domain.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesDomain = !selectedDomain.value ||
      project.domain === selectedDomain.value

    const matchesStatus = !selectedStatus.value ||
      project.status === selectedStatus.value

    return matchesSearch && matchesDomain && matchesStatus
  })
})

// Methods
const getStatusColor = (status: string) => {
  const colors = {
    available: 'bg-green-100 text-green-800',
    assigned: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-gray-100 text-gray-800'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const getStatusDotColor = (status: string) => {
  const colors = {
    available: 'bg-green-500',
    assigned: 'bg-yellow-500',
    completed: 'bg-gray-500'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-500'
}

const getStatusLabel = (status: string) => {
  const labels = {
    available: 'Disponible',
    assigned: 'Assigné',
    completed: 'Terminé'
  }
  return labels[status as keyof typeof labels] || status
}

const getDifficultyColor = (difficulty: string) => {
  const colors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  }
  return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const getDifficultyLabel = (difficulty: string) => {
  const labels = {
    beginner: 'Débutant',
    intermediate: 'Intermédiaire',
    advanced: 'Avancé'
  }
  return labels[difficulty as keyof typeof labels] || difficulty
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const showInterestForm = (project: MScProject) => {
  selectedProject.value = project
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedProject.value = null
  // Reset form
  interestForm.value = {
    name: '',
    email: '',
    level: '',
    motivation: ''
  }
}

const submitInterest = () => {
  // Here you would typically send the form data to your backend
  console.log('Submitting interest for project:', selectedProject.value?.title)
  console.log('Form data:', interestForm.value)

  // Show success message (in a real app, you'd handle this properly)
  alert('Votre demande a été envoyée avec succès ! Le superviseur vous contactera bientôt.')
  closeModal()
}

const contactSupervisor = (project: MScProject) => {
  // Create mailto link
  const subject = encodeURIComponent(`Projet de Master: ${project.title}`)
  const body = encodeURIComponent(`Bonjour,

Je suis intéressé(e) par le projet de master "${project.title}" que vous proposez.

Pourriez-vous me donner plus d'informations sur ce projet ?

Cordialement,`)

  // Find supervisor email (this would come from your data structure)
  const supervisorEmail = 'supervisor@univ.fr' // This should be resolved from supervisor name

  window.location.href = `mailto:${supervisorEmail}?subject=${subject}&body=${body}`
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Projets de <span class="text-[#08a4d4]">Master</span>
          </h1>
          <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les sujets de mémoire proposés par notre laboratoire
          </p>
        </div>
      </div>
    </div>

    <!-- Information Banner -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-blue-50 border-l-4 border-[#08a4d4] p-4 rounded-r-lg">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-[#08a4d4]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-blue-800">
              Information pour les étudiants
            </h3>
            <div class="mt-2 text-sm text-blue-700">
              <p>
                Les projets de master sont ouverts aux étudiants en M2. Pour postuler, contactez directement
                le superviseur du projet qui vous intéresse. N'hésitez pas à nous faire part de vos propres idées de
                projets !
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Search -->
          <div class="lg:col-span-2">
            <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
              Rechercher un projet
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input id="search" v-model="searchQuery" type="text" placeholder="Titre, domaine, superviseur..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#08a4d4] focus:border-[#08a4d4]" />
            </div>
          </div>

          <!-- Domain Filter -->
          <div>
            <label for="domain-filter" class="block text-sm font-medium text-gray-700 mb-2">
              Domaine
            </label>
            <select id="domain-filter" v-model="selectedDomain"
              class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
              <option value="">Tous les domaines</option>
              <option v-for="domain in availableDomains" :key="domain" :value="domain">
                {{ domain }}
              </option>
            </select>
          </div>

          <!-- Status Filter -->
          <div>
            <label for="status-filter" class="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <select id="status-filter" v-model="selectedStatus"
              class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
              <option value="">Tous</option>
              <option value="available">Disponibles</option>
              <option value="assigned">Assignés</option>
              <option value="completed">Terminés</option>
            </select>
          </div>
        </div>

        <!-- Results info -->
        <div class="mt-4 flex justify-between items-center">
          <p class="text-sm text-gray-600">
            {{ filteredProjects.length }} projet{{ filteredProjects.length > 1 ? 's' : '' }} trouvé{{
              filteredProjects.length > 1 ? 's' : '' }}
          </p>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">Légende:</span>
            <div class="flex items-center space-x-4">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                <span class="text-xs text-gray-600">Disponible</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                <span class="text-xs text-gray-600">Assigné</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 bg-gray-500 rounded-full mr-1"></div>
                <span class="text-xs text-gray-600">Terminé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Cards -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div v-for="project in filteredProjects" :key="project.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 p-6">
          <!-- Project Card Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <div :class="[
                  'w-3 h-3 rounded-full mr-2',
                  getStatusDotColor(project.status)
                ]"></div>
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  getStatusColor(project.status)
                ]">
                  {{ getStatusLabel(project.status) }}
                </span>
                <span :class="[
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-2',
                  getDifficultyColor(project.difficulty)
                ]">
                  {{ getDifficultyLabel(project.difficulty) }}
                </span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ project.title }}</h3>
            </div>
          </div>

          <!-- Supervisors -->
          <div class="mb-4">
            <div class="flex items-center text-sm text-gray-600">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="font-medium">Superviseur:</span>
              <span class="ml-1">{{ project.supervisor }}</span>
              <span v-if="project.coSupervisor" class="ml-2">
                • Co-superviseur: {{ project.coSupervisor }}
              </span>
            </div>
          </div>

          <!-- Domain -->
          <div class="mb-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {{ project.domain }}
            </span>
          </div>

          <!-- Abstract -->
          <div class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Résumé</h4>
            <p class="text-sm text-gray-700 leading-relaxed">{{ project.abstract }}</p>
          </div>

          <!-- Requirements -->
          <div class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Compétences requises</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="requirement in project.requirements" :key="requirement"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {{ requirement }}
              </span>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <div class="text-xs text-gray-500">
              Proposé le {{ formatDate(project.proposedDate) }}
            </div>
            <div class="flex space-x-2">
              <button v-if="project.status === 'available'" @click="showInterestForm(project)"
                class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-[#08a4d4] hover:bg-blue-600 transition-colors">
                Manifester mon intérêt
              </button>
              <button @click="contactSupervisor(project)"
                class="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                <svg class="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contacter
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun projet trouvé</h3>
        <p class="mt-1 text-sm text-gray-500">Essayez de modifier vos critères de recherche.</p>
      </div>
    </div>

    <!-- Interest Form Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click="closeModal">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white"
        @click.stop>
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-4 border-b">
          <h2 class="text-xl font-bold text-gray-900">Manifester mon intérêt</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="mt-4">
          <p class="text-sm text-gray-600 mb-4">
            Projet: <strong>{{ selectedProject?.title }}</strong>
          </p>

          <form @submit.prevent="submitInterest" class="space-y-4">
            <div>
              <label for="student-name" class="block text-sm font-medium text-gray-700">
                Nom complet *
              </label>
              <input id="student-name" v-model="interestForm.name" type="text" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]"
                placeholder="Votre nom complet" />
            </div>

            <div>
              <label for="student-email" class="block text-sm font-medium text-gray-700">
                Email universitaire *
              </label>
              <input id="student-email" v-model="interestForm.email" type="email" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]"
                placeholder="votre.email@univ.fr" />
            </div>

            <div>
              <label for="student-level" class="block text-sm font-medium text-gray-700">
                Niveau d'étude *
              </label>
              <select id="student-level" v-model="interestForm.level" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
                <option value="">Sélectionnez votre niveau</option>
                <option value="M1">Master 1</option>
                <option value="M2">Master 2</option>
              </select>
            </div>

            <div>
              <label for="motivation" class="block text-sm font-medium text-gray-700">
                Motivation *
              </label>
              <textarea id="motivation" v-model="interestForm.motivation" rows="4" required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]"
                placeholder="Expliquez pourquoi ce projet vous intéresse et quelles compétences vous pourriez apporter..."></textarea>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <button type="button" @click="closeModal"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Annuler
              </button>
              <button type="submit"
                class="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-[#08a4d4] hover:bg-blue-600 transition-colors">
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
