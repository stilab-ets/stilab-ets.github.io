import { ref, computed, onMounted } from 'vue'

interface InvitationTokenData {
  token: string
  email?: string
  role?: string
  expiresAt?: string
  isValid: boolean
}

export function useInvitationToken() {
  const tokenData = ref<InvitationTokenData | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Extraire le token de l'URL
  const getTokenFromUrl = (): string | null => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('token')
  }

  // Vérifier si un token est présent dans l'URL
  const hasToken = computed(() => {
    const token = getTokenFromUrl()
    const urlParams = new URLSearchParams(window.location.search)
    const email = urlParams.get('email')
    return token !== null && token.length > 0 && email !== null && email.length > 0
  })

  // Valider le token auprès du serveur
  const validateToken = async (token: string, email: string): Promise<InvitationTokenData | null> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/validate-invitation-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token })
      })

      const data = await response.json()

      if (!response.ok || !data.valid) {
        throw new Error('Token d\'invitation invalide ou expiré')
      }
      
      return {
        token,
        email: email,
        role: undefined, // Le rôle n'est pas retourné par cet endpoint
        expiresAt: undefined, // La date d'expiration n'est pas retournée
        isValid: data.valid
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur de validation du token'
      return null
    } finally {
      isLoading.value = false
    }
  }

  // Envoyer une invitation par email
  const sendInvitation = async (email: string): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/send-mail-invitation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error('Erreur lors de l\'envoi de l\'invitation')
      }

      return data.success
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors de l\'envoi de l\'invitation'
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Initialiser la validation du token
  const initializeToken = async () => {
    const token = getTokenFromUrl()
    const urlParams = new URLSearchParams(window.location.search)
    const email = urlParams.get('email')
    
    if (token && email) {
      const validatedData = await validateToken(token, email)
      tokenData.value = validatedData
    }
  }

  // Vérifier si le token est valide et non expiré
  const isTokenValid = computed(() => {
    if (!tokenData.value) return false
    
    // Vérifier l'expiration si fournie
    if (tokenData.value.expiresAt) {
      const expirationDate = new Date(tokenData.value.expiresAt)
      const now = new Date()
      return now < expirationDate && tokenData.value.isValid
    }
    
    return tokenData.value.isValid
  })

  // Nettoyer l'URL du token après utilisation réussie
  const clearTokenFromUrl = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('token')
    url.searchParams.delete('email')
    window.history.replaceState({}, document.title, url.toString())
  }

  // Obtenir les données pré-remplies pour le formulaire d'inscription
  const getPrefilledData = () => {
    if (!tokenData.value || !isTokenValid.value) return {}
    
    return {
      email: tokenData.value.email || '',
      role: tokenData.value.role || ''
    }
  }

  // Vérifier l'accès à la page d'inscription
  const canAccessRegister = computed(() => {
    return hasToken.value && isTokenValid.value
  })

  // Message d'erreur pour l'utilisateur
  const tokenError = computed(() => {
    if (!hasToken.value) {
      return 'Un token d\'invitation et un email sont requis pour accéder à cette page.'
    }
    
    if (error.value) {
      return error.value
    }
    
    if (tokenData.value && !isTokenValid.value) {
      return 'Le token d\'invitation est invalide ou a expiré.'
    }
    
    return null
  })

  onMounted(() => {
    if (hasToken.value) {
      initializeToken()
    }
  })

  return {
    // État
    tokenData: computed(() => tokenData.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    hasToken,
    isTokenValid,
    canAccessRegister,
    tokenError,
    
    // Méthodes
    sendInvitation,
    validateToken,
    initializeToken,
    clearTokenFromUrl,
    getPrefilledData,
    getTokenFromUrl
  }
}