<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useNavigation } from '@/composables/useNavigation'
import { authMiddleware } from '@/middleware/auth'

// Composables
const { currentLanguage, localizedNavigationItems, setLanguage, t } = useLanguage()
const { currentPage, navigateToPage, initializeNavigation } = useNavigation()

// Lab statistics data
const labStats = computed(() => ({
  members: { 
    value: 15, 
    label: t.value.stats.members 
  },
  publications: { 
    value: 45, 
    label: t.value.stats.publications 
  },
  projects: { 
    value: 8, 
    label: t.value.stats.projects 
  },
  awards: { 
    value: 12, 
    label: t.value.stats.awards 
  }
}))

// Navigation cleanup function
let cleanupNavigation: (() => void) | null = null

// Lifecycle
onMounted(async () => {
  cleanupNavigation = initializeNavigation()
  await authMiddleware.initialize()
})

onUnmounted(() => {
  if (cleanupNavigation) {
    cleanupNavigation()
  }
})

// Event handlers
const handlePageNavigation = (page: string) => {
  navigateToPage(page)
}

const handleLanguageChange = (language: 'en' | 'fr') => {
  setLanguage(language)
}

const handleLogout = async () => {
  await authMiddleware.logout()
  navigateToPage('home')
}
</script>

<template>
  <div id="app" class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Header -->
    <Header
      :current-page="currentPage"
      :navigation-items="localizedNavigationItems"
      :current-language="currentLanguage"
      :user="authMiddleware.state.user.value"
      @set-current-page="handlePageNavigation"
      @language-changed="handleLanguageChange"
      @logout="handleLogout"
    />

    <!-- Main Content -->
    <main class="">
      <!-- Home Page -->
      <div v-if="currentPage === 'home'" class="space-y-12">
        <Hero @set-current-page="handlePageNavigation" />
        <StatsSection :lab-stats="labStats" />
        <ResearchAreasPreview />
        <QuickLinksHome @set-current-page="handlePageNavigation" />
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

      <!-- Auth Pages -->
      <LoginPage v-else-if="currentPage === 'login'" />

      <!-- Dashboard (authenticated) -->
      <DashboardPage v-else-if="currentPage === 'dashboard' && authMiddleware.state.isAuthenticated.value" />

      <!-- Form Pages (authenticated) -->
      <PublicationForm v-else-if="currentPage === 'publication-form' && authMiddleware.state.isAuthenticated.value" />
      <EventForm v-else-if="currentPage === 'event-form' && authMiddleware.state.isAuthenticated.value" />
      <ProjectForm v-else-if="currentPage === 'project-form' && authMiddleware.state.isAuthenticated.value" />
      <MemberForm v-else-if="currentPage === 'member-form' && authMiddleware.state.isAuthenticated.value" />
      <ResearchForm v-else-if="currentPage === 'research-form' && authMiddleware.state.isAuthenticated.value" />
      <TeachingForm v-else-if="currentPage === 'teaching-form' && authMiddleware.state.isAuthenticated.value" />
      <AwardForm v-else-if="currentPage === 'award-form' && authMiddleware.state.isAuthenticated.value" />
      <VacancyForm v-else-if="currentPage === 'vacancy-form' && authMiddleware.state.isAuthenticated.value" />
      <UserSettingsForm v-else-if="currentPage === 'user-settings-form' && authMiddleware.state.isAuthenticated.value" />
      <AdminManagementForm v-else-if="currentPage === 'admin-management-form' && authMiddleware.state.isAuthenticated.value" />

      <!-- 404 Fallback -->
      <div v-else class="min-h-screen flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p class="text-lg text-gray-600 mb-8">Page not found</p>
          <Button @click="handlePageNavigation('home')" variant="primary">
            Go Home
          </Button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <Footer @set-current-page="handlePageNavigation" />
  </div>
</template>