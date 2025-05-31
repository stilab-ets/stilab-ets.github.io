<script setup lang="ts">
import { ref, computed } from 'vue'

// Enhanced Event interface
interface Event {
  id: string;
  title: string;
  speaker?: string;
  date: string;
  time?: string;
  location: string;
  type: 'seminar' | 'workshop' | 'conference' | 'defense' | 'meeting' | 'colloquium' | 'masterclass';
  description: string;
  registrationUrl?: string;
  tags: string[];
  isUpcoming: boolean;
  capacity?: number;
  currentRegistrations?: number;
}

// Extended mock events
const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'Séminaire: AI in Software Engineering - Current Trends and Future Directions',
    speaker: 'Prof. Jean Martin',
    date: '2024-06-15',
    time: '14:00',
    location: 'Amphithéâtre A, Bâtiment Informatique',
    type: 'seminar',
    description: 'Présentation des dernières avancées en intelligence artificielle appliquée au génie logiciel, avec discussion sur les perspectives futures et les défis technologiques.',
    registrationUrl: 'https://events.univ.fr/register/ai-seminar',
    tags: ['AI', 'machine learning', 'software engineering'],
    isUpcoming: true,
    capacity: 150,
    currentRegistrations: 87
  },
  {
    id: 'e2',
    title: 'Workshop: Blockchain Security for Developers',
    speaker: 'Dr. Sarah Chen',
    date: '2024-06-20',
    time: '09:00',
    location: 'Salle de conférence B12',
    type: 'workshop',
    description: 'Atelier pratique sur les bonnes pratiques de sécurité lors du développement d\'applications blockchain. Incluant des démonstrations hands-on et études de cas.',
    registrationUrl: 'https://events.univ.fr/register/blockchain-workshop',
    tags: ['blockchain', 'security', 'hands-on'],
    isUpcoming: true,
    capacity: 30,
    currentRegistrations: 24
  },
  {
    id: 'e3',
    title: 'Soutenance de thèse: Alex Rodriguez',
    speaker: 'Alex Rodriguez',
    date: '2024-07-10',
    time: '10:00',
    location: 'Amphithéâtre Principal',
    type: 'defense',
    description: 'Soutenance de thèse: "Automated Detection and Management of Technical Debt in Large-Scale Software Systems"',
    tags: ['defense', 'technical debt', 'automation'],
    isUpcoming: true,
    capacity: 100,
    currentRegistrations: 45
  },
  {
    id: 'e4',
    title: 'Colloque: L\'Avenir du Développement Logiciel',
    speaker: 'Invités industriels',
    date: '2024-06-25',
    time: '09:00',
    location: 'Centre de conférences universitaire',
    type: 'colloquium',
    description: 'Journée de conférences avec des experts de l\'industrie sur les technologies émergentes, l\'impact de l\'IA sur le développement, et les métiers de demain.',
    registrationUrl: 'https://events.univ.fr/register/colloque-dev',
    tags: ['industrie', 'futur', 'technologies émergentes'],
    isUpcoming: true,
    capacity: 300,
    currentRegistrations: 156
  },
  {
    id: 'e5',
    title: 'Masterclass: Clean Code et Refactoring',
    speaker: 'Martin Fowler (visioconférence)',
    date: '2024-07-05',
    time: '15:00',
    location: 'Amphithéâtre A + Diffusion en ligne',
    type: 'masterclass',
    description: 'Masterclass exceptionnelle avec Martin Fowler sur les principes du Clean Code, les techniques de refactoring, et l\'évolution des pratiques de développement.',
    registrationUrl: 'https://events.univ.fr/register/masterclass-fowler',
    tags: ['clean code', 'refactoring', 'best practices'],
    isUpcoming: true,
    capacity: 200,
    currentRegistrations: 198
  },
  {
    id: 'e6',
    title: 'Workshop: Introduction to DevOps',
    speaker: 'Dr. Marie Dubois',
    date: '2024-07-15',
    time: '13:30',
    location: 'Laboratoire informatique C',
    type: 'workshop',
    description: 'Atelier pratique d\'introduction aux pratiques DevOps : CI/CD, containerisation avec Docker, et déploiement automatisé.',
    registrationUrl: 'https://events.univ.fr/register/devops-intro',
    tags: ['devops', 'docker', 'CI/CD'],
    isUpcoming: true,
    capacity: 25,
    currentRegistrations: 18
  },
  {
    id: 'e7',
    title: 'Conférence: DevOps Best Practices',
    speaker: 'Dr. Marie Dubois',
    date: '2024-05-15',
    time: '13:30',
    location: 'Centre de conférences universitaire',
    type: 'conference',
    description: 'Présentation des meilleures pratiques DevOps basée sur les recherches récentes du laboratoire et les retours d\'expérience industriels.',
    tags: ['devops', 'best practices', 'research'],
    isUpcoming: false
  },
  {
    id: 'e8',
    title: 'Réunion mensuelle du laboratoire',
    date: '2024-06-01',
    time: '16:00',
    location: 'Salle de réunion R205',
    type: 'meeting',
    description: 'Réunion mensuelle pour présentation des avancées et discussion des projets en cours.',
    tags: ['lab meeting', 'monthly'],
    isUpcoming: false
  },
  {
    id: 'e9',
    title: 'Séminaire: Quantum Computing and Software Engineering',
    speaker: 'Prof. Elena Vasquez (MIT)',
    date: '2024-05-20',
    time: '11:00',
    location: 'Amphithéâtre B',
    type: 'seminar',
    description: 'Exploration des implications de l\'informatique quantique sur les paradigmes de développement logiciel et les nouveaux défis algorithmiques.',
    tags: ['quantum computing', 'algorithms', 'future tech'],
    isUpcoming: false
  },
  {
    id: 'e10',
    title: 'Workshop: Cybersecurity in IoT Systems',
    speaker: 'Dr. Sarah Chen',
    date: '2024-04-18',
    time: '14:00',
    location: 'Salle de conférence B12',
    type: 'workshop',
    description: 'Atelier sur les défis de sécurité dans les systèmes IoT, les vulnérabilités communes et les stratégies de protection.',
    tags: ['cybersecurity', 'IoT', 'vulnerabilities'],
    isUpcoming: false
  }
]

// Event Card Component
const EventCard = {
  props: ['event', 'isPast'],
  template: `
    <div>
      <!-- Event Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <div class="flex items-center mb-2">
            <span
              :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-3',
                getTypeColor(event.type)
              ]"
            >
              {{ getTypeLabel(event.type) }}
            </span>
            <span v-if="!isPast && event.registrationUrl" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Inscription ouverte
            </span>
            <span v-if="!isPast && event.capacity && event.currentRegistrations && (event.currentRegistrations / event.capacity) > 0.8" 
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 ml-2">
              Places limitées
            </span>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ event.title }}</h3>
          <div class="flex items-center text-sm text-gray-600 space-x-4">
            <div class="flex items-center">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {{ formatDate(event.date) }}
            </div>
            <div v-if="event.time" class="flex items-center">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ event.time }}
            </div>
            <div class="flex items-center">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ event.location }}
            </div>
          </div>
        </div>
      </div>

      <!-- Speaker -->
      <div v-if="event.speaker" class="mb-4">
        <p class="text-sm text-gray-600">
          <span class="font-medium">Intervenant:</span> {{ event.speaker }}
        </p>
      </div>

      <!-- Capacity info for upcoming events -->
      <div v-if="!isPast && event.capacity && event.currentRegistrations" class="mb-4">
        <div class="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Inscriptions</span>
          <span>{{ event.currentRegistrations }} / {{ event.capacity }}</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-[#08a4d4] h-2 rounded-full" :style="{ width: (event.currentRegistrations / event.capacity * 100) + '%' }"></div>
        </div>
      </div>

      <!-- Description -->
      <p class="text-gray-700 mb-4 leading-relaxed">{{ event.description }}</p>

      <!-- Tags -->
      <div v-if="event.tags.length > 0" class="mb-4">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in event.tags"
            :key="tag"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Registration Button -->
      <div v-if="!isPast && event.registrationUrl" class="mt-4">
        <a
          :href="event.registrationUrl"
          target="_blank"
          :class="[
            'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-colors',
            event.capacity && event.currentRegistrations && event.currentRegistrations >= event.capacity
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#08a4d4] hover:bg-blue-600'
          ]"
          :disabled="event.capacity && event.currentRegistrations && event.currentRegistrations >= event.capacity"
        >
          {{ event.capacity && event.currentRegistrations && event.currentRegistrations >= event.capacity ? 'Complet' : 'S\'inscrire' }}
          <svg v-if="!(event.capacity && event.currentRegistrations && event.currentRegistrations >= event.capacity)" class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  `,
  methods: {
    getTypeColor(type: string) {
      const colors = {
        seminar: 'bg-blue-100 text-blue-800',
        workshop: 'bg-green-100 text-green-800',
        conference: 'bg-purple-100 text-purple-800',
        defense: 'bg-red-100 text-red-800',
        meeting: 'bg-yellow-100 text-yellow-800',
        colloquium: 'bg-indigo-100 text-indigo-800',
        masterclass: 'bg-pink-100 text-pink-800'
      }
      return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
    },
    getTypeLabel(type: string) {
      const labels = {
        seminar: 'Séminaire',
        workshop: 'Workshop',
        conference: 'Conférence',
        defense: 'Soutenance',
        meeting: 'Réunion',
        colloquium: 'Colloque',
        masterclass: 'Masterclass'
      }
      return labels[type as keyof typeof labels] || type
    },
    formatDate(dateString: string) {
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}

// State
const selectedType = ref('')
const selectedPeriod = ref('all')
const viewMode = ref('upcoming')

// Computed
const filteredUpcomingEvents = computed(() => {
  return mockEvents.filter(event => {
    const matchesType = !selectedType.value || event.type === selectedType.value
    const isUpcoming = event.isUpcoming
    const matchesPeriod = selectedPeriod.value === 'all' ||
      (selectedPeriod.value === 'upcoming' && isUpcoming)

    return matchesType && isUpcoming && matchesPeriod
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
})

const filteredPastEvents = computed(() => {
  return mockEvents.filter(event => {
    const matchesType = !selectedType.value || event.type === selectedType.value
    const isPast = !event.isUpcoming
    const matchesPeriod = selectedPeriod.value === 'all' ||
      (selectedPeriod.value === 'past' && isPast)

    return matchesType && isPast && matchesPeriod
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const upcomingEventsCount = computed(() => {
  return mockEvents.filter(event => event.isUpcoming).length
})

const totalRegistrations = computed(() => {
  return mockEvents
    .filter(event => event.isUpcoming && event.currentRegistrations)
    .reduce((sum, event) => sum + (event.currentRegistrations || 0), 0)
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold mb-6">
            <span class="text-[#08a4d4]">Événements</span> & Actualités
          </h1>
          <p class="text-xl text-gray-900 leading-relaxed">
            Découvrez nos séminaires, workshops, soutenances et événements du laboratoire
          </p>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl p-6 text-center shadow-sm">
            <div class="text-3xl font-bold text-[#08a4d4] mb-2">{{ upcomingEventsCount }}</div>
            <div class="text-gray-600">Événements à venir</div>
          </div>
          <div class="bg-white rounded-xl p-6 text-center shadow-sm">
            <div class="text-3xl font-bold text-[#08a4d4] mb-2">{{ totalRegistrations }}</div>
            <div class="text-gray-600">Inscriptions</div>
          </div>
          <div class="bg-white rounded-xl p-6 text-center shadow-sm">
            <div class="text-3xl font-bold text-[#08a4d4] mb-2">{{ mockEvents.length }}</div>
            <div class="text-gray-600">Total événements</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="max-w-6xl mx-auto">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div class="flex flex-col md:flex-row gap-4 items-end">
            <!-- Event Type Filter -->
            <div class="w-full md:w-48">
              <label for="type-filter" class="block text-sm font-medium text-gray-700 mb-2">
                Type d'événement
              </label>
              <select id="type-filter" v-model="selectedType"
                class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
                <option value="">Tous les types</option>
                <option value="seminar">Séminaires</option>
                <option value="workshop">Workshops</option>
                <option value="conference">Conférences</option>
                <option value="defense">Soutenances</option>
                <option value="meeting">Réunions</option>
                <option value="colloquium">Colloques</option>
                <option value="masterclass">Masterclass</option>
              </select>
            </div>

            <!-- Time Period Filter -->
            <div class="w-full md:w-48">
              <label for="period-filter" class="block text-sm font-medium text-gray-700 mb-2">
                Période
              </label>
              <select id="period-filter" v-model="selectedPeriod"
                class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
                <option value="all">Tous</option>
                <option value="upcoming">À venir</option>
                <option value="past">Passés</option>
              </select>
            </div>

            <!-- View Toggle -->
            <div class="flex border border-gray-300 rounded-md">
              <button @click="viewMode = 'upcoming'" :class="[
                'px-4 py-2 text-sm font-medium rounded-l-md',
                viewMode === 'upcoming'
                  ? 'bg-[#08a4d4] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              ]">
                À venir ({{ filteredUpcomingEvents.length }})
              </button>
              <button @click="viewMode = 'past'" :class="[
                'px-4 py-2 text-sm font-medium border-l border-gray-300 rounded-r-md',
                viewMode === 'past'
                  ? 'bg-[#08a4d4] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              ]">
                Passés ({{ filteredPastEvents.length }})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Events Content -->
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="max-w-6xl mx-auto">
        <!-- Upcoming Events Section -->
        <div v-if="viewMode === 'upcoming'" class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg class="h-6 w-6 text-[#08a4d4] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Événements à venir
          </h2>

          <div class="space-y-6">
            <div v-for="event in filteredUpcomingEvents" :key="event.id"
              class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 p-6">
              <EventCard :event="event" />
            </div>
          </div>

          <div v-if="filteredUpcomingEvents.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun événement à venir</h3>
            <p class="mt-1 text-sm text-gray-500">Consultez nos événements passés ou revenez plus tard.</p>
          </div>
        </div>

        <!-- Past Events Section -->
        <div v-if="viewMode === 'past'">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg class="h-6 w-6 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Événements passés
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="event in filteredPastEvents" :key="event.id"
              class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 p-6">
              <EventCard :event="event" :is-past="true" />
            </div>
          </div>

          <div v-if="filteredPastEvents.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun événement passé trouvé</h3>
            <p class="mt-1 text-sm text-gray-500">Essayez de modifier vos filtres.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>