<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useNavigation } from '@/composables/useNavigation'

// Composables
const { currentLanguage, localizedNavigationItems, setLanguage, t } = useLanguage()
const { currentPage, navigateToPage, initializeNavigation } = useNavigation()

// State management
const isMobileMenuOpen = ref(false)
const currentUser = ref(null)

// Lab statistics data
const labStats = computed(() => ({
  members: { value: 12, label: t.value.stats.members },
  publications: { value: 34, label: t.value.stats.publications },
  projects: { value: 5, label: t.value.stats.projects },
  awards: { value: 8, label: t.value.stats.awards }
}))

// Authentication state
const isAuthenticated = computed(() => currentUser.value !== null)

// Initialize navigation system
let cleanupNavigation: (() => void) | null = null

onMounted(() => {
  cleanupNavigation = initializeNavigation()
})

onUnmounted(() => {
  if (cleanupNavigation) {
    cleanupNavigation()
  }
})

// Event handlers
const handleLanguageChange = (language: 'en' | 'fr') => {
  setLanguage(language)
}

const handleNavigation = (page: string) => {
  navigateToPage(page)
  isMobileMenuOpen.value = false
}

const handleMobileMenuToggle = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleLogin = (credentials: any) => {
  console.log('Login attempt:', credentials)
  // TODO: Implement actual authentication
}

const handleRegister = (userData: any) => {
  console.log('Registration attempt:', userData)
  // TODO: Implement actual registration
}

const handleLogout = () => {
  currentUser.value = null
  navigateToPage('home')
}

const handleFormSubmit = (formData: any) => {
  console.log('Form submitted:', formData)
  // TODO: Implement form submission logic
}

// Close mobile menu when clicking outside
const handleOutsideClick = (event: Event) => {
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
}
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50" @click="handleOutsideClick">
    <!-- Header -->
    <Header
      :current-page="currentPage"
      :navigation-items="localizedNavigationItems"
      :current-language="currentLanguage"
      :is-mobile-menu-open="isMobileMenuOpen"
      :user="currentUser"
      @set-current-page="handleNavigation"
      @language-changed="handleLanguageChange"
      @toggle-mobile-menu="handleMobileMenuToggle"
      @logout="handleLogout"
    />

    <!-- Main Content -->
    <main class="pt-16">
      <!-- Home Page -->
      <div v-if="currentPage === 'home'">
        <Hero @set-current-page="handleNavigation" />
        <StatsSection :lab-stats="labStats" />
        <ResearchAreasPreview />
        <QuickLinksHome @set-current-page="handleNavigation" />
      </div>

      <!-- People Page -->
      <PeoplePage v-else-if="currentPage === 'people'" />

      <!-- Research Page -->
      <ResearchPage v-else-if="currentPage === 'research'" />

      <!-- Publications Page -->
      <PublicationsPage v-else-if="currentPage === 'publications'" />

      <!-- Teaching Page -->
      <TeachingPage v-else-if="currentPage === 'teaching'" />

      <!-- Events Page -->
      <EventsPage v-else-if="currentPage === 'events'" />

      <!-- Projects Page -->
      <ProjectsPage v-else-if="currentPage === 'projects'" />

      <!-- Vacancies Page -->
      <VacanciesPage v-else-if="currentPage === 'vacancies'" />

      <!-- Awards Page -->
      <AwardsPage v-else-if="currentPage === 'awards'" />

      <!-- Authentication Pages -->
      <div v-else-if="currentPage === 'login'" class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <LoginForm @login="handleLogin" />
      </div>

      <div v-else-if="currentPage === 'register'" class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <RegisterForm @register="handleRegister" />
      </div>

      <!-- Form Pages -->
      <div v-else-if="currentPage === 'publication-form'" class="container mx-auto px-4 py-8">
        <PublicationForm @submit="handleFormSubmit" />
      </div>

      <div v-else-if="currentPage === 'event-form'" class="container mx-auto px-4 py-8">
        <EventForm @submit="handleFormSubmit" />
      </div>

      <div v-else-if="currentPage === 'project-form'" class="container mx-auto px-4 py-8">
        <ProjectForm @submit="handleFormSubmit" />
      </div>

      <div v-else-if="currentPage === 'member-form'" class="container mx-auto px-4 py-8">
        <MemberForm @submit="handleFormSubmit" />
      </div>

      <div v-else-if="currentPage === 'research-form'" class="container mx-auto px-4 py-8">
        <ResearchForm @submit="handleFormSubmit" />
      </div>

      <div v-else-if="currentPage === 'teaching-form'" class="container mx-auto px-4 py-8">
        <TeachingForm @submit="handleFormSubmit" />
      </div>

      <div v-else-if="currentPage === 'award-form'" class="container mx-auto px-4 py-8">
        <AwardForm @submit="handleFormSubmit" />
      </div>

      <div v-else-if="currentPage === 'vacancy-form'" class="container mx-auto px-4 py-8">
        <VacancyForm @submit="handleFormSubmit" />
      </div>

      <div v-else-if="currentPage === 'user-settings-form'" class="container mx-auto px-4 py-8">
        <UserSettingsForm @submit="handleFormSubmit" />
      </div>

      <div v-else-if="currentPage === 'admin-management-form'" class="container mx-auto px-4 py-8">
        <AdminManagementForm @submit="handleFormSubmit" />
      </div>

      <!-- 404 Page -->
      <div v-else class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-6xl font-bold text-gray-900">404</h1>
          <p class="text-xl text-gray-600 mt-4">Page not found</p>
          <button
            @click="handleNavigation('home')"
            class="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Return Home
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <Footer @set-current-page="handleNavigation" />
  </div>
</template>