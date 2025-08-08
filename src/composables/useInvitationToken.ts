import { ref, computed, onMounted } from 'vue';
import { adminAPI } from '@/services/ApiFactory';

interface InvitationTokenData {
  token: string;
  email?: string;
  role?: string;
  expiresAt?: string;
  isValid: boolean;
}

export function useInvitationToken() {
  const tokenData = ref<InvitationTokenData | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const getTokenFromUrl = (): string | null => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
  };

  const hasToken = computed(() => {
    const token = getTokenFromUrl();
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    return (
      token !== null && token.length > 0 && email !== null && email.length > 0
    );
  });

  const validateToken = async (
    token: string,
    email: string
  ): Promise<InvitationTokenData | null> => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await adminAPI.validateInvitationToken({ email, token });

      if (!response.data.valid) {
        throw new Error("Token d'invitation invalide ou expiré");
      }

      return {
        token,
        email: email,
        role: undefined,
        expiresAt: undefined,
        isValid: response.data.valid,
      };
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Erreur de validation du token';
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const sendInvitation = async (email: string): Promise<boolean> => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await adminAPI.sendInvitation({ email });
      return response.data.success;
    } catch (err) {
      error.value =
        err instanceof Error
          ? err.message
          : "Erreur lors de l'envoi de l'invitation";
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const initializeToken = async () => {
    const token = getTokenFromUrl();
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

    if (token && email) {
      const validatedData = await validateToken(token, email);
      tokenData.value = validatedData;
    }
  };

  const isTokenValid = computed(() => {
    if (!tokenData.value) return false;

    if (tokenData.value.expiresAt) {
      const expirationDate = new Date(tokenData.value.expiresAt);
      const now = new Date();
      return now < expirationDate && tokenData.value.isValid;
    }

    return tokenData.value.isValid;
  });

  const clearTokenFromUrl = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('token');
    url.searchParams.delete('email');
    window.history.replaceState({}, document.title, url.toString());
  };

  const getPrefilledData = () => {
    if (!tokenData.value || !isTokenValid.value) return {};

    return {
      email: tokenData.value.email || '',
      role: tokenData.value.role || '',
    };
  };

  const canAccessRegister = computed(() => {
    return hasToken.value && isTokenValid.value;
  });

  const tokenError = computed(() => {
    if (!hasToken.value) {
      return "Un token d'invitation et un email sont requis pour accéder à cette page.";
    }

    if (error.value) {
      return error.value;
    }

    if (tokenData.value && !isTokenValid.value) {
      return "Le token d'invitation est invalide ou a expiré.";
    }

    return null;
  });

  onMounted(() => {
    if (hasToken.value) {
      initializeToken();
    }
  });

  return {
    tokenData: computed(() => tokenData.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    hasToken,
    isTokenValid,
    canAccessRegister,
    tokenError,
    sendInvitation,
    validateToken,
    initializeToken,
    clearTokenFromUrl,
    getPrefilledData,
    getTokenFromUrl,
  };
}
