<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
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

// Page components
import PeoplePage from '@/people/PeoplePage.vue'
import PublicationsPage from '@/publications/PublicationsPage.vue'
import ResearchPage from '@/research/ResearchPage.vue'
import EventsPage from '@/events/EventsPage.vue'
import TeachingPage from '@/teaching/TeachingPage.vue'
import ProjectPage from '@/projects/ProjectPage.vue'
import VacanciesPage from '@/vacancies/VacanciesPage.vue'
import AwardsPage from '@/awards/AwardsPage.vue'

// Auth components
import LoginForm from '@/auth/LoginForm.vue'
import RegisterForm from '@/auth/RegisterForm.vue'

// Form components
import PublicationForm from '@/forms/PublicationForm.vue'
import EventForm from '@/forms/EventForm.vue'
import ProjectForm from '@/forms/ProjectForm.vue'

// Authentication state
const isAuthenticated = ref(true)
const currentUser = ref(null)

// Initialize systems
const {
  currentLanguage,
  t,
  localizedNavigationItems,
  setLanguage,
} = useLanguage()

const navigation = useNavigation()

const currentPage = navigation.currentPage
const navigateToPage = navigation.navigateToPage
const initializeNavigation = navigation.initializeNavigation

// Laboratory statistics with reactive formatting
const labStats = computed(() => ({
  members: { value: 12, label: t.value.stats.members },
  publications: { value: 45, label: t.value.stats.publications },
  projects: { value: 8, label: t.value.stats.projects },
  awards: { value: 6, label: t.value.stats.awards }
}))

// Authentication handlers
const handleLogin = (userData: any) => {
  isAuthenticated.value = true
  currentUser.value = userData
  navigateToPage('home')
}

const handleLogout = () => {
  isAuthenticated.value = false
  currentUser.value = null
  navigateToPage('home')
}

const handleRegistration = (userData: any) => {
  // Handle successful registration
  navigateToPage('login')
}

// Language change handler
const handleLanguageChange = (language: string) => {
  setLanguage(language as 'en' | 'fr')
}

// Form submission handlers
const handlePublicationSubmit = (publicationData: any) => {
  console.log('Publication submitted:', publicationData)
  navigateToPage('publications')
}

const handleEventSubmit = (eventData: any) => {
  console.log('Event submitted:', eventData)
  navigateToPage('events')
}

const handleProjectSubmit = (projectData: any) => {
  console.log('Project submitted:', projectData)
  navigateToPage('projects')
}

const handleInvitationSubmit = (invitationData: any) => {
  console.log('Invitation submitted:', invitationData)
  navigateToPage('people')
}

// Initialize navigation and cleanup
let cleanupNavigation: (() => void) | null = null

onMounted(() => {
  cleanupNavigation = initializeNavigation()
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
    <!-- Header with authentication support -->
    <Header
      :current-page="currentPage"
      :navigation-items="localizedNavigationItems"
      :current-language="currentLanguage"
      :user="currentUser"
      @set-current-page="navigateToPage"
      @language-changed="handleLanguageChange"
      @logout="handleLogout"
    />
   
    <!-- Main Content -->
    <main>
      <!-- Authentication Pages -->
      <LoginForm 
        v-if="currentPage === 'login'"
        @login-success="handleLogin"
        @navigate="navigateToPage"
      />
      
      <RegisterForm 
        v-else-if="currentPage === 'register'"
        @registration-success="handleRegistration"
        @navigate="navigateToPage"
      />

      <!-- Form Pages (Protected Routes) -->
      <PublicationForm 
        v-else-if="currentPage === 'publication-form' && isAuthenticated"
        @submit="handlePublicationSubmit"
        @cancel="() => navigateToPage('publications')"
      />
      
      <EventForm 
        v-else-if="currentPage === 'event-form' && isAuthenticated"
        @submit="handleEventSubmit"
        @cancel="() => navigateToPage('events')"
      />
      
      <ProjectForm 
        v-else-if="currentPage === 'project-form' && isAuthenticated"
        @submit="handleProjectSubmit"
        @cancel="() => navigateToPage('projects')"
      />
      
      <!-- Homepage -->
      <div v-else-if="currentPage === 'home'">
        <Hero @set-current-page="navigateToPage" />
        <StatsSection :lab-stats="labStats" />
        <ResearchAreasPreview />
        <QuickLinks @set-current-page="navigateToPage" />
      </div>
     
      <!-- Page Components -->
      <PeoplePage v-else-if="currentPage === 'people'" />
      <PublicationsPage v-else-if="currentPage === 'publications'" />
      <ResearchPage v-else-if="currentPage === 'research'" />
      <EventsPage v-else-if="currentPage === 'events'" />
      <TeachingPage v-else-if="currentPage === 'teaching'" />
      <ProjectPage v-else-if="currentPage === 'projects'" />
      <VacanciesPage v-else-if="currentPage === 'vacancies'" />
      <AwardsPage v-else-if="currentPage === 'awards'" />

      <!-- Redirect to login for protected routes -->
      <div v-else-if="!isAuthenticated && ['publication-form', 'event-form', 'project-form', 'invitation-form'].includes(currentPage)" 
           class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ t.auth.login.title }}</h2>
          <p class="text-gray-600 mb-6">{{ t.auth.login.subtitle }}</p>
          <button 
            @click="navigateToPage('login')"
            class="btn-primary"
          >
            {{ t.auth.login.form.submit }}
          </button>
        </div>
      </div>
    </main>
   
    <!-- Footer -->
    <Footer @set-current-page="navigateToPage" />
  </div>
</template>