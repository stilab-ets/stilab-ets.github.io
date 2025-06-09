<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useLanguage } from "@/composables/useLanguage"

// Layout components
import Header from '@/layout/Header.vue'
import Footer from '@/layout/Footer.vue'

// Home page components
import Hero from '@/home/Hero.vue'
import StatsSection from '@/home/StatsSection.vue'
import ResearchAreasPreview from '@/home/ResearchAreasPreview.vue'
import QuickLinks from '@/home/QuickLinks.vue'

// Page components
import PeoplePage from '@/people/PeoplePage.vue'
import PublicationsPage from './components/PublicationsPage.vue'
import ResearchPage from './components/ResearchPage.vue'
import EventsPage from './components/EventsPage.vue'
import TeachingPage from './components/TeachingPage.vue'
import MScProjectsPage from './components/MScProjectsPage.vue'
import VacanciesPage from './components/VacanciesPage.vue'
import AwardsPage from './components/AwardsPage.vue'

// Initialize language management system
const { 
  currentLanguage, 
  t, 
  localizedNavigationItems, 
  setLanguage, 
} = useLanguage()

// Navigation state management
const currentPage = ref('home')

// Laboratory statistics with reactive formatting
const labStats = computed(() => ({
  members: { value: 12, label: t.value.stats.members },
  publications: { value: 45, label: t.value.stats.publications },
  projects: { value: 8, label: t.value.stats.projects },
  awards: { value: 6, label: t.value.stats.awards }
}))

// Navigation methods
const setCurrentPage = (page: string) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Language change handler
const handleLanguageChange = (language: string) => {
  setLanguage(language as 'en' | 'fr')
}

// Page title management based on current page and language
const updatePageTitle = () => {
  const baseTitle = currentLanguage.value === 'en' 
    ? 'STIL - Laboratoire de Recherche'
    : 'STIL - Research Laboratory'
  
  if (currentPage.value === 'home') {
    document.title = baseTitle
    return
  }
  
  const currentNav = localizedNavigationItems.value.find(item => item.id === currentPage.value)
  if (currentNav) {
    document.title = `${currentNav.label} - ${baseTitle}`
  }
}

// Store unwatch functions for cleanup
let unwatchPage: (() => void) | null = null
let unwatchLanguage: (() => void) | null = null

// Initialize page metadata and set up watchers
onMounted(() => {
  // Set initial document language
  document.documentElement.lang = currentLanguage.value
  updatePageTitle()
  
  // Watch for page changes and update title
  unwatchPage = watch(currentPage, () => {
    updatePageTitle()
  })
  
  // Watch for language changes and update document attributes + title
  unwatchLanguage = watch(currentLanguage, (newLang) => {
    document.documentElement.lang = newLang
    updatePageTitle()
  })
})

// Cleanup watchers when component unmounts
onUnmounted(() => {
  if (unwatchPage) unwatchPage()
  if (unwatchLanguage) unwatchLanguage()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header with language support -->
    <Header 
      :current-page="currentPage" 
      :navigation-items="localizedNavigationItems"
      :current-language="currentLanguage"
      @set-current-page="setCurrentPage"
      @language-changed="handleLanguageChange"
    />
    
    <!-- Main Content -->
    <main>
      <!-- Homepage -->
      <div v-if="currentPage === 'home'">
        <!-- Hero Section -->
        <Hero @set-current-page="setCurrentPage" />
        
        <!-- Stats Section with localized labels -->
        <StatsSection :lab-stats="labStats" />
        
        <!-- Research Areas Preview -->
        <ResearchAreasPreview />
        
        <!-- Quick Links -->
        <QuickLinks @set-current-page="setCurrentPage" />
      </div>
      
      <!-- Dynamic Page Components -->
      <!-- Each page component will receive language context through provide/inject -->
      <PeoplePage v-else-if="currentPage === 'people'" />
      <PublicationsPage v-else-if="currentPage === 'publications'" />
      <ResearchPage v-else-if="currentPage === 'research'" />
      <EventsPage v-else-if="currentPage === 'events'" />
      <TeachingPage v-else-if="currentPage === 'teaching'" />
      <MScProjectsPage v-else-if="currentPage === 'projects'" />
      <VacanciesPage v-else-if="currentPage === 'vacancies'" />
      <AwardsPage v-else-if="currentPage === 'awards'" />
    </main>
    
    <!-- Footer with language support -->
    <Footer @set-current-page="setCurrentPage" />
  </div>
</template>