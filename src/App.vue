<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { useLanguage } from "@/composables/useLanguage"
import { useNavigation } from "@/composables/useNavigation"

// Layout components
import Header from '@/layout/Header.vue'
import Footer from '@/layout/Footer.vue'

// Home page components
import Hero from '@/home/Hero.vue'
import StatsSection from '@/home/StatsSection.vue'
import ResearchAreasPreview from '@/home/ResearchAreasPreview.vue'
import QuickLinks from '@/home/QuickLinks.vue'

import PeoplePage from '@/people/PeoplePage.vue'
import PublicationsPage from '@/publications/PublicationsPage.vue'
import ResearchPage from '@/research/ResearchPage.vue'
import EventsPage from '@/events/EventsPage.vue'
import TeachingPage from '@/teaching/TeachingPage.vue'
import ProjectPage from '@/projects/ProjectPage.vue'
import VacanciesPage from '@/vacancies/VacanciesPage.vue'
import AwardsPage from '@/awards/AwardsPage.vue'

// Initialize systems
const { 
  currentLanguage, 
  t, 
  localizedNavigationItems, 
  setLanguage, 
} = useLanguage()

const { 
  currentPage, 
  navigateToPage, 
  initializeNavigation 
} = useNavigation()

// Laboratory statistics with reactive formatting
const labStats = computed(() => ({
  members: { value: 12, label: t.value.stats.members },
  publications: { value: 45, label: t.value.stats.publications },
  projects: { value: 8, label: t.value.stats.projects },
  awards: { value: 6, label: t.value.stats.awards }
}))

// Language change handler
const handleLanguageChange = (language: string) => {
  setLanguage(language as 'en' | 'fr')
}

// Initialize navigation and cleanup
let cleanupNavigation: (() => void) | null = null

onMounted(() => {
  // Initialize navigation system
  cleanupNavigation = initializeNavigation()
  
  // Set initial document language
  document.documentElement.lang = currentLanguage.value
})

onUnmounted(() => {
  if (cleanupNavigation) {
    cleanupNavigation()
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header with language support -->
    <Header 
      :current-page="currentPage" 
      :navigation-items="localizedNavigationItems"
      :current-language="currentLanguage"
      @set-current-page="navigateToPage"
      @language-changed="handleLanguageChange"
    />
    
    <!-- Main Content -->
    <main>
      <!-- Homepage -->
      <div v-if="currentPage === 'home'">
        <!-- Hero Section -->
        <Hero @set-current-page="navigateToPage" />
        
        <!-- Stats Section with localized labels -->
        <StatsSection :lab-stats="labStats" />
        
        <!-- Research Areas Preview -->
        <ResearchAreasPreview />
        
        <!-- Quick Links -->
        <QuickLinks @set-current-page="navigateToPage" />
      </div>
      
      <!-- Dynamic Page Components -->
      <PeoplePage v-else-if="currentPage === 'people'" />
      <PublicationsPage v-else-if="currentPage === 'publications'" />
      <ResearchPage v-else-if="currentPage === 'research'" />
      <EventsPage v-else-if="currentPage === 'events'" />
      <TeachingPage v-else-if="currentPage === 'teaching'" />
      <ProjectPage v-else-if="currentPage === 'projects'" />
      <VacanciesPage v-else-if="currentPage === 'vacancies'" />
      <AwardsPage v-else-if="currentPage === 'awards'" />
    </main>
    
    <!-- Footer with language support -->
    <Footer @set-current-page="navigateToPage" />
  </div>
</template>