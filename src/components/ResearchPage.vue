<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockProjects, type Project } from '../data/mockPublications'
import { researchDomains } from '../data/mockResearchers'

// State
const openAccordions = ref<string[]>([])

// Research areas with descriptions and icons
const researchAreas = [
  {
    name: 'Software Architecture',
    description: 'Conception et optimisation d\'architectures logicielles scalables',
    icon: '🏗️'
  },
  {
    name: 'Machine Learning',
    description: 'Application de l\'IA aux processus de développement logiciel',
    icon: '🤖'
  },
  {
    name: 'Cybersecurity',
    description: 'Sécurité des systèmes distribués et applications blockchain',
    icon: '🔒'
  },
  {
    name: 'DevOps',
    description: 'Automatisation et optimisation des pipelines de développement',
    icon: '⚙️'
  },
  {
    name: 'Cloud Computing',
    description: 'Solutions cloud-native et architectures microservices',
    icon: '☁️'
  },
  {
    name: 'Software Testing',
    description: 'Méthodes avancées de test et assurance qualité',
    icon: '🧪'
  },
  {
    name: 'Software Maintenance',
    description: 'Gestion de la dette technique et maintenance prédictive',
    icon: '🔧'
  },
  {
    name: 'Human-Computer Interaction',
    description: 'Interface utilisateur et expérience développeur',
    icon: '👥'
  }
]

// Computed
const featuredProjects = computed(() => {
  return mockProjects.filter(project => project.status === 'active').slice(0, 4)
})

// Methods
const toggleAccordion = (domainName: string) => {
  const index = openAccordions.value.indexOf(domainName)
  if (index > -1) {
    openAccordions.value.splice(index, 1)
  } else {
    openAccordions.value.push(domainName)
  }
}

const getProjectsByDomain = (domain: string) => {
  return mockProjects.filter(project =>
    project.domain === domain ||
    project.title.toLowerCase().includes(domain.toLowerCase()) ||
    project.description.toLowerCase().includes(domain.toLowerCase())
  )
}

const getStatusColor = (status: string) => {
  const colors = {
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    planned: 'bg-yellow-100 text-yellow-800'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const getStatusLabel = (status: string) => {
  const labels = {
    active: 'Actif',
    completed: 'Terminé',
    planned: 'Planifié'
  }
  return labels[status as keyof typeof labels] || status
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Nos <span class="text-[#08a4d4]">Recherches</span>
          </h1>
          <p class="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez nos axes de recherche et projets innovants en génie logiciel
          </p>
        </div>
      </div>
    </div>

    <!-- Research Overview -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Vue d'ensemble</h2>
        <p class="text-lg text-gray-700 leading-relaxed mb-6">
          Notre laboratoire de génie logiciel se concentre sur l'innovation et l'excellence dans le développement
          de solutions logicielles. Nos recherches couvrent un large spectre, de l'architecture des systèmes
          distribués à l'intelligence artificielle appliquée au développement logiciel.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-[#08a4d4]">{{ mockProjects.length }}</div>
            <div class="text-sm text-gray-600">Projets actifs</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-[#08a4d4]">{{ researchDomains.length }}</div>
            <div class="text-sm text-gray-600">Domaines de recherche</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-[#08a4d4]">5+</div>
            <div class="text-sm text-gray-600">Partenaires industriels</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Projects -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Projets Phares</h2>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div v-for="project in featuredProjects" :key="project.id"
          class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ project.title }}</h3>
              <span :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                getStatusColor(project.status)
              ]">
                {{ getStatusLabel(project.status) }}
              </span>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">{{ project.startDate }} - {{ project.endDate || 'En cours' }}</p>
              <p v-if="project.funding" class="text-sm font-medium text-[#08a4d4]">{{ project.funding }}</p>
            </div>
          </div>

          <p class="text-gray-700 mb-4 leading-relaxed">{{ project.description }}</p>

          <div class="mb-4">
            <p class="text-sm font-medium text-gray-700 mb-2">Responsable:</p>
            <p class="text-sm text-gray-600">{{ project.leadResearcher }}</p>
          </div>

          <div class="mb-4">
            <p class="text-sm font-medium text-gray-700 mb-2">Participants:</p>
            <div class="flex flex-wrap gap-2">
              <span v-for="participant in project.participants" :key="participant"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {{ participant }}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {{ project.domain }}
            </span>
            <div class="flex space-x-2">
              <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank"
                class="text-gray-400 hover:text-[#08a4d4] transition-colors">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clip-rule="evenodd" />
                </svg>
              </a>
              <a v-if="project.websiteUrl" :href="project.websiteUrl" target="_blank"
                class="text-gray-400 hover:text-[#08a4d4] transition-colors">
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Research Areas Accordion -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Domaines de Recherche</h2>
      <div class="space-y-4">
        <div v-for="domain in researchAreas" :key="domain.name"
          class="bg-white rounded-lg shadow-sm border border-gray-200">
          <!-- Accordion Header -->
          <button @click="toggleAccordion(domain.name)"
            class="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#08a4d4] focus:ring-inset">
            <div class="flex items-center">
              <span class="text-2xl mr-3">{{ domain.icon }}</span>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ domain.name }}</h3>
                <p class="text-sm text-gray-600">{{ domain.description }}</p>
              </div>
            </div>
            <svg :class="[
              'h-5 w-5 text-gray-400 transition-transform duration-200',
              openAccordions.includes(domain.name) ? 'transform rotate-180' : ''
            ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Accordion Content -->
          <div v-if="openAccordions.includes(domain.name)" class="px-6 pb-6 border-t border-gray-100">
            <div class="mt-4">
              <h4 class="text-md font-medium text-gray-900 mb-3">Projets associés</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="project in getProjectsByDomain(domain.name)" :key="project.id"
                  class="border border-gray-200 rounded-lg p-4 hover:border-[#08a4d4] transition-colors">
                  <h5 class="font-medium text-gray-900 mb-2">{{ project.title }}</h5>
                  <p class="text-sm text-gray-600 mb-2">{{ project.description.substring(0, 100) }}...</p>
                  <p class="text-xs text-gray-500">
                    <strong>Responsable:</strong> {{ project.leadResearcher }}
                  </p>
                </div>
              </div>

              <div v-if="getProjectsByDomain(domain.name).length === 0" class="text-center py-8">
                <p class="text-sm text-gray-500">Aucun projet actif dans ce domaine</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
