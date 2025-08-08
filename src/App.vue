<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue';
import { useLanguage } from './composables/useLanguage';
import { useAuth } from './hooks/auth/useAuth';
import { useNavigation } from './hooks/layout/useNavigation';
import { useRouteGuard } from './composables/useRouteGuard';

// Layout components
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';

// Home page components
import Hero from './components/home/Hero.vue';
import StatsSection from './components/home/StatsSection.vue';
import ResearchAreasPreview from './components/home/ResearchAreasPreview.vue';
import QuickLinks from './components/home/QuickLinks.vue';

// Page components
import PeoplePage from './components/people/PeoplePage.vue';
import PublicationsPage from './components/publications/PublicationsPage.vue';
import ResearchPage from './components/research/ResearchPage.vue';
import EventPage from './components/events/EventPage.vue';
import TeachingPage from './components/teaching/TeachingPage.vue';
import ProjectPage from './components/projects/ProjectPage.vue';
import VacanciesPage from './components/vacancies/VacanciesPage.vue';
import AwardsPage from './components/awards/AwardsPage.vue';

// Authentication components
import LoginPage from './components/auth/LoginPage.vue';

// Dashboard components
import AdminDashboard from './components/dashboard/admin/AdminDashboard.vue';
import ProfessorDashboard from './components/dashboard/professor/ProfessorDashboard.vue';
import StudentDashboard from './components/dashboard/student/StudentDashboard.vue';
import DashboardPage from './components/dashboard/DashboardPage.vue';

import { authMiddleware } from '@/middleware/auth';
import PublicationForm from './components/publications/PublicationForm.vue';
import MemberForm from './components/people/MemberForm.vue';
import ResearchForm from './components/research/ResearchForm.vue';
import TeachingForm from './components/teaching/TeachingForm.vue';
import EventForm from './components/events/EventForm.vue';
import AwardForm from './components/awards/AwardForm.vue';

// Add this navigation event handler to your existing script:
const handleNavigationEvent = (event: CustomEvent) => {
  if (event.detail?.page) {
    navigateToPage(event.detail.page);
  }
};

onMounted(() => {
  window.addEventListener('navigate', handleNavigationEvent as EventListener);
});

onUnmounted(() => {
  window.removeEventListener(
    'navigate',
    handleNavigationEvent as EventListener
  );
});

// Initialize auth middleware on app mount
onMounted(async () => {
  await authMiddleware.initialize();
});

// Initialize systems
const { currentLanguage, t, localizedNavigationItems, setLanguage } =
  useLanguage();
const { isAuthenticated, profile, isLoading, userRole, canAccessDashboard } =
  useAuth();
const {
  currentPage,
  navigateToPage,
  canAccessRoute,
  getAccessError,
  initializeNavigation,
} = useNavigation();

const { isAccessDenied, accessError, safeNavigate } = useRouteGuard({
  redirectOnFailure: 'login',
  showAccessDenied: true,
});

// Navigation methods - utilise le système de navigation sécurisé
const setCurrentPage = (page: string) => {
  // Tenter une navigation sécurisée
  if (!safeNavigate(page)) {
    // Si la navigation échoue, rediriger vers login ou afficher une erreur
    const error = getAccessError(page);
    if (error && !isAuthenticated.value) {
      navigateToPage('login');
    }
  }
};

// Laboratory statistics
const labStats = computed(() => ({
  members: { value: 12, label: t.value.stats.members },
  publications: { value: 45, label: t.value.stats.publications },
  projects: { value: 8, label: t.value.stats.projects },
  awards: { value: 6, label: t.value.stats.awards },
}));

// Language change handler
const handleLanguageChange = (language: string) => {
  setLanguage(language as 'en' | 'fr');
};

// Page title management
const updatePageTitle = () => {
  const baseTitle =
    currentLanguage.value === 'en'
      ? 'STIL - Research Laboratory'
      : 'STIL - Laboratoire de Recherche';

  if (currentPage.value === 'home') {
    document.title = baseTitle;
    return;
  }

  const currentNav = localizedNavigationItems.value.find(
    (item) => item.id === currentPage.value
  );
  if (currentNav) {
    document.title = `${currentNav.label} - ${baseTitle}`;
  }
};

// Authentication state watchers
watch(isAuthenticated, (newValue) => {
  if (!newValue) {
    // Vérifier si la page actuelle nécessite une authentification
    if (!canAccessRoute(currentPage.value)) {
      navigateToPage('home');
    }
  }
});

// Initialize
let unwatchPage: (() => void) | null = null;
let unwatchLanguage: (() => void) | null = null;

onMounted(() => {
  document.documentElement.lang = currentLanguage.value;
  updatePageTitle();

  // Initialize navigation to handle URL routing
  const cleanupNavigation = initializeNavigation();

  unwatchPage = watch(currentPage, updatePageTitle);
  unwatchLanguage = watch(currentLanguage, (newLang) => {
    document.documentElement.lang = newLang;
    updatePageTitle();
  });

  // Store cleanup function for navigation
  return () => {
    cleanupNavigation();
  };
});

onUnmounted(() => {
  if (unwatchPage) unwatchPage();
  if (unwatchLanguage) unwatchLanguage();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading state -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div
        class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"
      ></div>
    </div>

    <!-- Main application -->
    <template v-else>
      <!-- Header -->
      <Header
        :current-page="currentPage"
        :navigation-items="localizedNavigationItems"
        :current-language="currentLanguage"
        :user="profile"
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
        <EventPage v-else-if="currentPage === 'events'" />
        <TeachingPage v-else-if="currentPage === 'teaching'" />
        <ProjectPage v-else-if="currentPage === 'projects'" />
        <VacanciesPage v-else-if="currentPage === 'vacancies'" />
        <AwardsPage v-else-if="currentPage === 'awards'" />

        <!-- Authentication -->
        <LoginPage
          v-else-if="currentPage === 'login'"
          @login-success="setCurrentPage('home')"
        />

        <!-- Generic Dashboard Page -->
        <DashboardPage
          v-else-if="currentPage === 'dashboard'"
          @navigate="setCurrentPage"
        />

        <PublicationForm
          v-else-if="currentPage === 'publication-form'"
          @navigate="setCurrentPage"
        />

        <MemberForm
          v-else-if="currentPage === 'member-form'"
          @navigate="setCurrentPage"
        />

        <ResearchForm
          v-else-if="currentPage === 'research-form'"
          @navigate="setCurrentPage"
        />

        <TeachingForm
          v-else-if="currentPage === 'teaching-form'"
          @navigate="setCurrentPage"
        />

        <EventForm
          v-else-if="currentPage === 'event-form'"
          @navigate="setCurrentPage"
        />

        <EventForm
          v-else-if="currentPage === 'award-form'"
          @navigate="setCurrentPage"
        />

        <!-- Role-specific Protected Dashboards -->
        <AdminDashboard
          v-else-if="currentPage === 'admin-dashboard'"
          @navigate="setCurrentPage"
        />
        <ProfessorDashboard
          v-else-if="currentPage === 'professor-dashboard'"
          @navigate="setCurrentPage"
        />
        <StudentDashboard
          v-else-if="currentPage === 'student-dashboard'"
          @navigate="setCurrentPage"
        />

        <!-- Show generic dashboard if trying to access role-specific but userRole is null -->
        <DashboardPage
          v-else-if="
            /*(currentPage === 'admin-dashboard' ||
              currentPage === 'professor-dashboard' ||
              currentPage === 'student-dashboard') &&*/
            userRole === null
          "
          @navigate="setCurrentPage"
        />

        <!-- Access Denied for wrong role trying to access dashboard -->
        <div v-else-if="isAccessDenied" class="container mx-auto px-4 py-8">
          <div class="text-center">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">Accès Refusé</h1>
            <p class="text-gray-600 mb-4">
              {{
                accessError ||
                "Vous n'avez pas les permissions pour accéder à cette page."
              }}
            </p>
            <button
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              @click="setCurrentPage('home')"
            >
              Retour à l'Accueil
            </button>
          </div>
        </div>

        <!-- Fallback for invalid routes -->
        <div v-else class="container mx-auto px-4 py-8">
          <div class="text-center">
            <h1 class="text-2xl font-bold text-gray-800 mb-4">
              Page Not Found
            </h1>
            <p class="text-gray-600 mb-4">
              The page you're looking for doesn't exist.
            </p>
            <button
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              @click="setCurrentPage('home')"
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
