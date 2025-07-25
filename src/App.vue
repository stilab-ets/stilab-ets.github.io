<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useLanguage } from './composables/useLanguage'
import { useAuthMiddleware } from './middleware/auth'

// Layout components
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'

// Home page components
import Hero from './components/home/Hero.vue'
import StatsSection from './components/home/StatsSection.vue'
import ResearchAreasPreview from './components/home/ResearchAreasPreview.vue'
import QuickLinks from './components/home/QuickLinks.vue'

// Page components
import PeoplePage from './components/people/PeoplePage.vue'
import PublicationsPage from './components/publications/PublicationsPage.vue'
import ResearchPage from './components/research/ResearchPage.vue'
import EventsPage from './components/events/EventsPage.vue'
import TeachingPage from './components/teaching/TeachingPage.vue'
import ProjectsPage from './components/projects/ProjectsPage.vue'
import VacanciesPage from './components/vacancies/VacanciesPage.vue'
import AwardsPage from './components/awards/AwardsPage.vue'

// Authentication components
import LoginPage from './components/auth/LoginPage.vue'

// Dashboard components
import AdminDashboard from './components/dashboard/AdminDashboard.vue'
import ProfessorDashboard from './components/dashboard/ProfessorDashboard.vue'

// Initialize systems
const { currentLanguage, t, localizedNavigationItems, setLanguage } = useLanguage()
const { isAuthenticated, user, isLoading } = useAuthMiddleware()

// Navigation state
const currentPage = ref('home')

// User role computed property
const userRole = computed(() => {
  if (!user.value) return 'guest'
  if (user.value.is_staff) return 'admin'
  return user.value.role || 'professor'
})

// Check if user can access dashboard
const canAccessDashboard = computed(() => {
  return isAuthenticated.value && userRole.value !== 'guest'
})

// Protected routes that require authentication
const protectedRoutes = ['dashboard', 'admin-dashboard', 'professor-dashboard']

// Laboratory statistics
const labStats = computed(() => ({
  members: { value: 12, label: t.value.stats.members },
  publications: { value: 45, label: t.value.stats.publications },
  projects: { value: 8, label: t.value.stats.projects },
  awards: { value: 6, label: t.value.stats.awards }
}))

// Navigation methods
const setCurrentPage = (page: string) => {
  // Check if page requires authentication
  if (protectedRoutes.includes(page)) {
    if (!isAuthenticated.value) {
      currentPage.value = 'login'
      return
    }
    // Check role-specific access
    if (page === 'admin-dashboard' && userRole.value !== 'admin') {
      currentPage.value = 'dashboard' // Redirect to appropriate dashboard
      return
    }
    // Redirect to role-specific dashboard
    if (page === 'dashboard') {
      page = userRole.value === 'admin' ? 'admin-dashboard' : 'professor-dashboard'
    }
  }
  
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Language change handler
const handleLanguageChange = (language: string) => {
  setLanguage(language as 'en' | 'fr')
}

// Page title management
const updatePageTitle = () => {
  const baseTitle = currentLanguage.value === 'en' 
    ? 'STIL - Research Laboratory'
    : 'STIL - Laboratoire de Recherche'
  
  if (currentPage.value === 'home') {
    document.title = baseTitle
    return
  }
  
  const currentNav = localizedNavigationItems.value.find(item => item.id === currentPage.value)
  if (currentNav) {
    document.title = `${currentNav.label} - ${baseTitle}`
  }
}

// Authentication state watchers
watch(isAuthenticated, (newValue) => {
  if (!newValue && protectedRoutes.includes(currentPage.value)) {
    currentPage.value = 'home'
  }
})

// Initialize
let unwatchPage: (() => void) | null = null
let unwatchLanguage: (() => void) | null = null

onMounted(() => {
  document.documentElement.lang = currentLanguage.value
  updatePageTitle()
  
  unwatchPage = watch(currentPage, updatePageTitle)
  unwatchLanguage = watch(currentLanguage, (newLang) => {
    document.documentElement.lang = newLang
    updatePageTitle()
  })
})

onUnmounted(() => {
  if (unwatchPage) unwatchPage()
  if (unwatchLanguage) unwatchLanguage()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading state -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>

    <!-- Main application -->
    <template v-else>
      <!-- Header -->
      <Header 
        :current-page="currentPage" 
        :navigation-items="localizedNavigationItems"
        :current-language="currentLanguage"
        :user="user"
        :can-access-dashboard="canAccessDashboard"
        @set-current-page="setCurrentPage"
        @language-changed="handleLanguageChange"
      />
      
      <!-- Main Content -->
      <main>
        <!-- Homepage -->
        <div v-if="currentPage === 'home'">
          <Hero @set-current-page="setCurrentPage" />
          <StatsSection :lab-stats="labStats" />
          <ResearchAreasPreview />
          <QuickLinks @set-current-page="setCurrentPage" />
        </div>
        
        <!-- Public Pages - Available to all users -->
        <PeoplePage v-else-if="currentPage === 'people'" />
        <PublicationsPage v-else-if="currentPage === 'publications'" />
        <ResearchPage v-else-if="currentPage === 'research'" />
        <EventsPage v-else-if="currentPage === 'events'" />
        <TeachingPage v-else-if="currentPage === 'teaching'" />
        <ProjectsPage v-else-if="currentPage === 'projects'" />
        <VacanciesPage v-else-if="currentPage === 'vacancies'" />
        <AwardsPage v-else-if="currentPage === 'awards'" />
        
        <!-- Authentication -->
        <LoginPage v-else-if="currentPage === 'login'" @login-success="setCurrentPage('home')" />
        
        <!-- Protected Dashboards -->
        <AdminDashboard 
          v-else-if="currentPage === 'admin-dashboard' && userRole === 'admin'"
          @navigate="setCurrentPage"
        />
        <ProfessorDashboard 
          v-else-if="currentPage === 'professor-dashboard' && userRole === 'professor'"
          @navigate="setCurrentPage"
        />
        
        <!-- Fallback for invalid routes -->
        <div v-else class="container mx-auto px-4 py-8">
          <div class="text-center">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h1>
            <p class="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
            <button 
              @click="setCurrentPage('home')"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go Home
            </button>
          </div>
        </div>
      </main>
      
      <!-- Footer -->
      <Footer @set-current-page="setCurrentPage" />
    </template>
  </div>
</template>