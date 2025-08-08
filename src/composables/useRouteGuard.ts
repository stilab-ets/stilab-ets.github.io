import { computed, watch, ref } from 'vue';
import { useNavigation } from '@/hooks/layout/useNavigation';
import { useAuth } from '@/hooks/auth/useAuth';
import { useInvitationToken } from './useInvitationToken';
import type { UserRole } from '@/hooks/layout/useNavigation';

interface RouteGuardOptions {
  redirectOnFailure?: string; // Page de redirection en cas d'échec
  showAccessDenied?: boolean; // Afficher un message d'accès refusé
}

export function useRouteGuard(options: RouteGuardOptions = {}) {
  const { currentPage, canAccessRoute, getAccessError, navigateToPage } =
    useNavigation();

  const { isAuthenticated, isLoading, userRole } = useAuth();
  const { canAccessRegister, tokenError } = useInvitationToken();

  const accessError = ref<string | null>(null);
  const isAccessDenied = ref(false);

  // Vérifier l'accès à la page actuelle
  const checkCurrentPageAccess = () => {
    if (isLoading.value) return;

    const page = currentPage.value;

    // Cas spécial pour la page register avec token
    if (page === 'register') {
      const hasAccess = canAccessRegister.value;
      const error = tokenError.value;

      accessError.value = error;
      isAccessDenied.value = !hasAccess;

      if (!hasAccess && options.redirectOnFailure) {
        navigateToPage(options.redirectOnFailure);
      }
      return;
    }

    // Vérification normale pour les autres pages
    const hasAccess = canAccessRoute(page);
    const error = getAccessError(page);

    accessError.value = error;
    isAccessDenied.value = !hasAccess;

    if (!hasAccess && options.redirectOnFailure) {
      navigateToPage(options.redirectOnFailure);
    }
  };

  // Surveiller les changements de page et d'authentification
  watch([currentPage, isAuthenticated, userRole], checkCurrentPageAccess, {
    immediate: true,
  });

  // Fonctions utilitaires
  const requireRole = (requiredRoles: UserRole | UserRole[]): boolean => {
    if (!isAuthenticated.value || !userRole.value) return false;

    const roles = Array.isArray(requiredRoles)
      ? requiredRoles
      : [requiredRoles];
    return roles.includes(userRole.value);
  };

  const requireAuth = (): boolean => {
    return isAuthenticated.value;
  };

  const canNavigateTo = (page: string): boolean => {
    return canAccessRoute(page);
  };

  const safeNavigate = (page: string): boolean => {
    if (canAccessRoute(page)) {
      navigateToPage(page);
      return true;
    }
    return false;
  };

  return {
    // État
    isAccessDenied: computed(() => isAccessDenied.value),
    accessError: computed(() => accessError.value),
    isLoading: computed(() => isLoading.value),

    // Vérifications
    requireRole,
    requireAuth,
    canNavigateTo,

    // Navigation sécurisée
    safeNavigate,

    // Utilitaires
    checkCurrentPageAccess,
  };
}
