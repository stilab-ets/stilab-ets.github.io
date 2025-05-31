<script setup lang="ts">
import { ref } from 'vue'

// Layout components
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'

// Home page components
import Hero from './components/home/Hero.vue'
import StatsSection from './components/home/StatsSection.vue'
import ResearchAreasPreview from './components/home/ResearchAreasPreview.vue'
import QuickLinks from './components/home/QuickLinks.vue'

// Page components
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
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
    <!-- Header -->
    <Header :current-page="currentPage" :navigation-items="navigationItems" @set-current-page="setCurrentPage" />

    <!-- Main Content -->
    <main>
      <!-- Homepage -->
      <div v-if="currentPage === 'home'">
        <!-- Hero Section -->
        <Hero @set-current-page="setCurrentPage" />

        <!-- Stats Section -->
        <StatsSection :lab-stats="labStats" />

        <!-- Research Areas Preview -->
        <ResearchAreasPreview />

        <!-- Quick Links -->
        <QuickLinks @set-current-page="setCurrentPage" />
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
    <Footer @set-current-page="setCurrentPage" />
  </div>
</template>