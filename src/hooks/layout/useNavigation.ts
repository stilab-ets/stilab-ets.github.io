import { useLanguage } from '@/composables/useLanguage';
import { useAuth } from '@/hooks/auth/useAuth';
import { ref, computed } from 'vue';
import type { ComputedRef } from 'vue';

export type UserRole = 'admin' | 'professor' | 'researcher' | 'student';

interface RouteProtection {
  requiresAuth: boolean;
  allowedRoles?: UserRole[];
  requireAllRoles?: boolean; // true = tous les rôles requis, false = au moins un rôle (default)
  requiresInvitationToken?: boolean; // true = nécessite un token d'invitation (pour register)
}

interface NavigationComposable {
  currentPage: ComputedRef<string>;
  navigateToPage: (page: string) => void;
  isCurrentPage: (page: string) => boolean;
  isProtectedRoute: (page: string) => boolean;
  canAccessRoute: (page: string) => boolean;
  hasValidInvitationToken: () => boolean;
  getInvitationToken: () => string | null;
  getRouteProtection: (page: string) => RouteProtection | null;
  initializeNavigation: () => () => void;
  validRoutes: string[];
  getAccessError: (page: string) => string | null;
}

interface LocalizedNavItem {
  id: string;
  label: string;
  icon: string;
}

// Navigation state management
const currentPage = ref('home');

// Valid routes for the application
const validRoutes = [
  'home',
  'people',
  'research',
  'publications',
  'teaching',
  'events',
  'projects',
  'vacancies',
  'awards',
  'login',
  'register',
  'dashboard',
  'admin-dashboard',
  'professor-dashboard',
  'student-dashboard',
  'publication-form',
  'event-form',
  'project-form',
  'member-form',
  'research-form',
  'teaching-form',
  'award-form',
  'vacancy-form',
  'user-settings-form',
  'admin-management-form',
];

// Configuration des protections de routes
const routeProtections: Record<string, RouteProtection> = {
  // Routes publiques (pas de protection)
  home: { requiresAuth: false },
  people: { requiresAuth: false },
  research: { requiresAuth: false },
  publications: { requiresAuth: false },
  teaching: { requiresAuth: false },
  events: { requiresAuth: false },
  projects: { requiresAuth: false },
  vacancies: { requiresAuth: false },
  awards: { requiresAuth: false },
  login: { requiresAuth: false },
  register: { requiresAuth: false, requiresInvitationToken: true }, // Nécessite token d'invitation

  // Dashboards - rôles spécifiques
  dashboard: { requiresAuth: true }, // Dashboard générique - tous les rôles authentifiés
  'admin-dashboard': { requiresAuth: true, allowedRoles: ['admin'] },
  'professor-dashboard': {
    requiresAuth: true,
    allowedRoles: ['professor', 'researcher'],
  },
  'student-dashboard': { requiresAuth: true, allowedRoles: ['student'] },

  // Formulaires - combinaisons de rôles (professeurs et chercheurs)
  'publication-form': { requiresAuth: true, allowedRoles: ['admin'] },
  'event-form': { requiresAuth: true, allowedRoles: ['admin'] },
  'project-form': { requiresAuth: true, allowedRoles: ['admin'] },
  'research-form': { requiresAuth: true, allowedRoles: ['admin'] },
  'teaching-form': { requiresAuth: true, allowedRoles: ['admin'] },
  'award-form': { requiresAuth: true, allowedRoles: ['admin'] },
  'vacancy-form': { requiresAuth: true, allowedRoles: ['admin'] },

  // Gestion des membres - admin
  'member-form': { requiresAuth: true, allowedRoles: ['admin'] },

  // Paramètres utilisateur - tous les rôles authentifiés
  'user-settings-form': {
    requiresAuth: true,
    allowedRoles: ['admin', 'professor', 'researcher', 'student'],
  },

  // Administration - admin uniquement
  'admin-management-form': { requiresAuth: true, allowedRoles: ['admin'] },
};

// Browser history management
const updateBrowserHistory = (page: string) => {
  const path = page === 'home' ? '/' : `/${page}`;
  const title = `STIL - ${page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' ')}`;

  // Update browser URL without reloading page
  window.history.pushState({ page }, title, path);
  document.title = title;
};

// Handle browser back/forward buttons
const handlePopState = (event: PopStateEvent) => {
  const page = event.state?.page ?? 'home';
  if (validRoutes.includes(page)) {
    currentPage.value = page;
  }
};

// Gestion des tokens d'invitation
const getInvitationToken = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('token');
};

const hasValidInvitationToken = (): boolean => {
  const token = getInvitationToken();
  return token !== null && token.length > 0;
};
const initializeNavigation = () => {
  // Listen for browser navigation
  window.addEventListener('popstate', handlePopState);

  // Set initial page from URL
  const path = window.location.pathname;
  const page = path === '/' ? 'home' : path.slice(1);

  if (validRoutes.includes(page)) {
    currentPage.value = page;
  }

  // Return cleanup function
  return () => {
    window.removeEventListener('popstate', handlePopState);
  };
};

export function useNavigation(): NavigationComposable {
  const { isAuthenticated, userRole } = useAuth();

  const navigateToPage = (page: string) => {
    if (validRoutes.includes(page)) {
      currentPage.value = page;
      updateBrowserHistory(page);
    }
  };

  const isCurrentPage = (page: string): boolean => {
    return currentPage.value === page;
  };

  const isProtectedRoute = (page: string): boolean => {
    const protection = routeProtections[page];
    return protection?.requiresAuth ?? false;
  };

  const getRouteProtection = (page: string): RouteProtection | null => {
    return routeProtections[page] || null;
  };

  const canAccessRoute = (page: string): boolean => {
    const protection = routeProtections[page];

    // Route publique sans restriction
    if (
      !protection ||
      (!protection.requiresAuth && !protection.requiresInvitationToken)
    ) {
      return true;
    }

    // Route nécessitant un token d'invitation (comme register)
    if (protection.requiresInvitationToken) {
      return hasValidInvitationToken();
    }

    // Doit être authentifié
    if (protection.requiresAuth && !isAuthenticated.value) {
      return false;
    }

    // Aucune restriction de rôle = accessible à tous les utilisateurs authentifiés
    if (!protection.allowedRoles || protection.allowedRoles.length === 0) {
      return true;
    }

    // Vérifier si l'utilisateur a un rôle valide
    if (!userRole.value) {
      return false;
    }

    // Vérifier si le rôle de l'utilisateur est dans la liste des rôles autorisés
    if (protection.requireAllRoles) {
      // Tous les rôles requis (peu probable d'être utilisé, mais disponible)
      return protection.allowedRoles.every((role) => userRole.value === role);
    } else {
      // Au moins un rôle requis (comportement par défaut)
      return protection.allowedRoles.includes(userRole.value);
    }
  };

  const getAccessError = (page: string): string | null => {
    const protection = routeProtections[page];

    if (
      !protection ||
      (!protection.requiresAuth && !protection.requiresInvitationToken)
    ) {
      return null; // Route publique
    }

    // Vérifier le token d'invitation pour register
    if (protection.requiresInvitationToken && !hasValidInvitationToken()) {
      return "Un token d'invitation valide est requis pour accéder à cette page.";
    }

    if (protection.requiresAuth && !isAuthenticated.value) {
      return 'Vous devez être connecté pour accéder à cette page.';
    }

    if (!userRole.value && protection.requiresAuth) {
      return 'Rôle utilisateur non défini.';
    }

    if (
      protection.allowedRoles &&
      userRole.value &&
      !protection.allowedRoles.includes(userRole.value)
    ) {
      const roleNames = {
        admin: 'Administrateur',
        professor: 'Professeur',
        researcher: 'Chercheur',
        student: 'Étudiant',
      };

      const allowedRoleNames = protection.allowedRoles
        .map((role) => roleNames[role])
        .join(' ou ');

      return `Cette page est réservée aux ${allowedRoleNames}.`;
    }

    return null;
  };

  return {
    currentPage: computed(() => currentPage.value),
    navigateToPage,
    isCurrentPage,
    isProtectedRoute,
    canAccessRoute,
    hasValidInvitationToken,
    getInvitationToken,
    getRouteProtection,
    initializeNavigation,
    validRoutes,
    getAccessError,
  };
}

// Mobile Navigation Composable
export function useMobileNavigation() {
  const { currentLanguage } = useLanguage();
  const mobileMenuOpen = ref(false);

  // Import navigation items (assuming they exist)
  const navigationItemsData = [
    { id: 'home', label: { en: 'Home', fr: 'Accueil' }, icon: 'Home' },
    { id: 'people', label: { en: 'People', fr: 'Équipe' }, icon: 'Users' },
    {
      id: 'research',
      label: { en: 'Research', fr: 'Recherche' },
      icon: 'Search',
    },
    {
      id: 'publications',
      label: { en: 'Publications', fr: 'Publications' },
      icon: 'FileText',
    },
    {
      id: 'teaching',
      label: { en: 'Teaching', fr: 'Enseignement' },
      icon: 'GraduationCap',
    },
    {
      id: 'events',
      label: { en: 'Events', fr: 'Événements' },
      icon: 'Calendar',
    },
    {
      id: 'projects',
      label: { en: 'Projects', fr: 'Projets' },
      icon: 'Briefcase',
    },
    {
      id: 'vacancies',
      label: { en: 'Vacancies', fr: 'Postes' },
      icon: 'UserPlus',
    },
    { id: 'awards', label: { en: 'Awards', fr: 'Prix' }, icon: 'Award' },
  ];

  const navigationItems = computed((): LocalizedNavItem[] => {
    return navigationItemsData.map((item) => ({
      id: item.id,
      label: item.label[currentLanguage.value as 'en' | 'fr'],
      icon: item.icon,
    }));
  });

  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
  };

  const closeMobileMenu = () => {
    mobileMenuOpen.value = false;
  };

  return {
    mobileMenuOpen,
    navigationItems,
    toggleMobileMenu,
    closeMobileMenu,
  };
}
