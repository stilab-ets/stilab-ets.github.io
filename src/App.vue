<script setup lang="ts">
import { ref } from 'vue'
import PeoplePage from './components/PeoplePage.vue'
import PublicationsPage from './components/PublicationsPage.vue'
import ResearchPage from './components/ResearchPage.vue'
import EventsPage from './components/EventsPage.vue'
import TeachingPage from './components/TeachingPage.vue'
import MScProjectsPage from './components/MScProjectsPage.vue'
import VacanciesPage from './components/VacanciesPage.vue'
import AwardsPage from './components/AwardsPage.vue'

// Navigation state
const currentPage = ref('home')
const mobileMenuOpen = ref(false)

// Navigation items
const navigationItems = [
  { id: 'home', label: 'Accueil', icon: '🏠' },
  { id: 'people', label: 'Équipe', icon: '👥' },
  { id: 'research', label: 'Recherche', icon: '🔬' },
  { id: 'publications', label: 'Publications', icon: '📚' },
  { id: 'teaching', label: 'Enseignement', icon: '🎓' },
  { id: 'events', label: 'Événements', icon: '📅' },
  { id: 'projects', label: 'Projets M2', icon: '🎯' },
  { id: 'vacancies', label: 'Recrutements', icon: '💼' },
  { id: 'awards', label: 'Prix', icon: '🏆' }
]

// Methods
const setCurrentPage = (page: string) => {
  currentPage.value = page
  mobileMenuOpen.value = false
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Stats for homepage
const labStats = {
  members: 12,
  publications: 45,
  projects: 8,
  awards: 6
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation Header -->
    <nav class="bg-white shadow-lg sticky top-0 z-40">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center h-20 px-4 relative">
          <!-- Logo and title -->
          <div class="flex items-center space-x-4">
            <button @click="setCurrentPage('home')"
              class="flex items-center hover:opacity-80 transition-opacity space-x-4">
              <div
                class="w-12 h-12 bg-gradient-to-br from-[#08a4d4] to-blue-600 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-xl">🧪</span>
              </div>
              <div class="hidden sm:block">
                <h1 class="text-2xl font-bold text-gray-900">STIL</h1>
                <p class="text-sm text-gray-600">Software Technology and Intelligence Research Lab</p>
              </div>
            </button>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-6"> <button
              v-for="item in navigationItems" :key="item.id" @click="setCurrentPage(item.id)" :class="[
                'px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 hover:cursor-pointer',
                currentPage === item.id
                  ? 'bg-[#08a4d4] text-white'
                  : 'text-gray-700 hover:text-[#08a4d4] hover:bg-gray-100'
              ]">
              <span class="mr-2">{{ item.icon }}</span>
              {{ item.label }}
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="lg:hidden flex items-center">
            <button @click="toggleMobileMenu"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#08a4d4] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#08a4d4]">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div v-if="mobileMenuOpen" class="lg:hidden bg-white border-t border-gray-200">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <button v-for="item in navigationItems" :key="item.id" @click="setCurrentPage(item.id)" :class="[
            'block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
            currentPage === item.id
              ? 'bg-[#08a4d4] text-white'
              : 'text-gray-700 hover:text-[#08a4d4] hover:bg-gray-100'
          ]">
            <span class="mr-2">{{ item.icon }}</span>
            {{ item.label }}
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <!-- Homepage -->
      <div v-if="currentPage === 'home'">
        <!-- Hero Section -->
        <div class="bg-white text-gray-900">
          <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-18">
            <div class="max-w-4xl mx-auto text-center">
              <h1 class="text-xl md:text-7xl font-extrabold mb-8">
                Software Technology & <span class="text-[#08a4d4]">Intelligence</span>
              </h1>
              <p class="text-xl md:text-2xl mb-10 text-gray-900 leading-relaxed">
                Laboratoire de recherche en génie logiciel, intelligence artificielle et technologies innovantes
              </p>
              <div class="flex flex-col sm:flex-row gap-6 justify-center">
                <button @click="setCurrentPage('research')"
                  class="px-8 py-4 bg-white text-[#08a4d4] rounded-lg font-semibold hover:bg-blue-50 transition-colors text-lg">
                  Découvrir nos recherches
                </button>
                <button @click="setCurrentPage('people')"
                  class="px-8 py-4 border-2 border-white text-[#08a4d4] rounded-lg font-semibold hover:bg-white hover:text-[#08a4d4] transition-colors text-lg">
                  Rencontrer l'équipe
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="bg-white py-20">
          <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-6xl mx-auto">
              <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Le laboratoire en chiffres</h2>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div class="text-center">
                  <div class="text-4xl md:text-5xl font-bold text-[#08a4d4] mb-3">{{ labStats.members }}+</div>
                  <div class="text-gray-600 text-lg">Membres de l'équipe</div>
                </div>
                <div class="text-center">
                  <div class="text-4xl md:text-5xl font-bold text-[#08a4d4] mb-3">{{ labStats.publications }}+</div>
                  <div class="text-gray-600 text-lg">Publications</div>
                </div>
                <div class="text-center">
                  <div class="text-4xl md:text-5xl font-bold text-[#08a4d4] mb-3">{{ labStats.projects }}+</div>
                  <div class="text-gray-600 text-lg">Projets actifs</div>
                </div>
                <div class="text-center">
                  <div class="text-4xl md:text-5xl font-bold text-[#08a4d4] mb-3">{{ labStats.awards }}+</div>
                  <div class="text-gray-600 text-lg">Prix reçus</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Research Areas Preview -->
        <div class="bg-gray-50 py-20">
          <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-6xl mx-auto">
              <div class="text-center mb-16">
                <h2 class="text-4xl font-extrabold text-gray-900 mb-6">
                  Nos <span class="text-[#08a4d4]">Domaines</span> d'Expertise
                </h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                  Nos recherches couvrent un large spectre du génie logiciel moderne et de l'intelligence artificielle
                </p>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
                  <div class="text-4xl mb-4">🏗️</div>
                  <h3 class="font-semibold text-gray-900 mb-3">Architecture Logicielle</h3>
                  <p class="text-sm text-gray-600">Patterns et systèmes distribués</p>
                </div>
                <div class="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
                  <div class="text-4xl mb-4">🤖</div>
                  <h3 class="font-semibold text-gray-900 mb-3">Intelligence Artificielle</h3>
                  <p class="text-sm text-gray-600">IA appliquée au développement</p>
                </div>
                <div class="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
                  <div class="text-4xl mb-4">🔒</div>
                  <h3 class="font-semibold text-gray-900 mb-3">Cybersécurité</h3>
                  <p class="text-sm text-gray-600">Sécurité des systèmes</p>
                </div>
                <div class="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
                  <div class="text-4xl mb-4">☁️</div>
                  <h3 class="font-semibold text-gray-900 mb-3">Cloud Computing</h3>
                  <p class="text-sm text-gray-600">Solutions cloud-native</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="bg-white py-20">
          <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-6xl mx-auto">
              <div class="text-center mb-16">
                <h2 class="text-4xl font-extrabold text-gray-900 mb-6">
                  Accès <span class="text-[#08a4d4]">Rapide</span>
                </h2>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <button @click="setCurrentPage('publications')"
                  class="bg-blue-50 rounded-xl p-8 text-left hover:bg-blue-100 transition-colors group">
                  <div class="text-4xl mb-6 group-hover:scale-110 transition-transform">📚</div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-3">Dernières Publications</h3>
                  <p class="text-gray-600">Découvrez nos travaux de recherche récents</p>
                </button>
                <button @click="setCurrentPage('events')"
                  class="bg-green-50 rounded-xl p-8 text-left hover:bg-green-100 transition-colors group">
                  <div class="text-4xl mb-6 group-hover:scale-110 transition-transform">📅</div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-3">Événements à Venir</h3>
                  <p class="text-gray-600">Séminaires, workshops et soutenances</p>
                </button>
                <button @click="setCurrentPage('vacancies')"
                  class="bg-purple-50 rounded-xl p-8 text-left hover:bg-purple-100 transition-colors group">
                  <div class="text-4xl mb-6 group-hover:scale-110 transition-transform">💼</div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-3">Nous Rejoindre</h3>
                  <p class="text-gray-600">Opportunités de doctorat et post-doctorat</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dynamic Page Components -->
      <PeoplePage v-else-if="currentPage === 'people'" />
      <PublicationsPage v-else-if="currentPage === 'publications'" />
      <ResearchPage v-else-if="currentPage === 'research'" />
      <EventsPage v-else-if="currentPage === 'events'" />
      <TeachingPage v-else-if="currentPage === 'teaching'" />
      <MScProjectsPage v-else-if="currentPage === 'projects'" />
      <VacanciesPage v-else-if="currentPage === 'vacancies'" />
      <AwardsPage v-else-if="currentPage === 'awards'" />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-16">
      <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- Lab Info -->
            <div class="md:col-span-2">
              <div class="flex items-center space-x-3 mb-6">
                <div
                  class="w-10 h-10 bg-gradient-to-br from-[#08a4d4] to-blue-600 rounded-lg flex items-center justify-center">
                  <span class="text-white font-bold">🧪</span>
                </div>
                <div>
                  <h3 class="text-xl font-semibold">STIL</h3>
                  <p class="text-sm text-gray-300">Software Technology and Intelligence Research Lab</p>
                </div>
              </div>
              <p class="text-gray-300 mb-6 leading-relaxed">
                Laboratoire de recherche dédié à l'innovation en génie logiciel,
                intelligence artificielle et technologies de pointe.
              </p>
              <div class="flex space-x-4">
                <a href="https://github.com/stil-lab" target="_blank"
                  class="text-gray-400 hover:text-white transition-colors">
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="https://linkedin.com/company/stil-lab" target="_blank"
                  class="text-gray-400 hover:text-white transition-colors">
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div>
              <h3 class="text-lg font-semibold mb-6">Navigation</h3>
              <ul class="space-y-3">
                <li><button @click="setCurrentPage('people')"
                    class="text-gray-300 hover:text-white transition-colors">Équipe</button></li>
                <li><button @click="setCurrentPage('research')"
                    class="text-gray-300 hover:text-white transition-colors">Recherche</button></li>
                <li><button @click="setCurrentPage('publications')"
                    class="text-gray-300 hover:text-white transition-colors">Publications</button></li>
                <li><button @click="setCurrentPage('events')"
                    class="text-gray-300 hover:text-white transition-colors">Événements</button></li>
              </ul>
            </div>

            <!-- Contact -->
            <div>
              <h3 class="text-lg font-semibold mb-6">Contact</h3>
              <ul class="space-y-3 text-gray-300">
                <li>📧 contact@stil-lab.fr</li>
                <li>📞 +33 1 23 45 67 89</li>
                <li>📍 Université de Recherche<br>Bâtiment Informatique<br>75000 Paris</li>
              </ul>
            </div>
          </div>

          <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Software Technology and Intelligence Research Lab (STIL). Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>