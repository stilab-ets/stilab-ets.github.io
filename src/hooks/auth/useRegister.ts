import { ref } from 'vue'

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  role: string
  password: string
  confirmPassword: string
  researchDomain?: string
  biography?: string
  phone?: string
  githubUrl?: string
  linkedinUrl?: string
  personalWebsite?: string
}

interface RegisterResponse {
  success: boolean
  message?: string
  user?: any
}

export function useRegister() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const success = ref(false)

  // Inscription avec token d'invitation
  const registerWithToken = async (
    formData: RegisterData, 
    invitationToken: string
  ): Promise<RegisterResponse> => {
    isLoading.value = true
    error.value = null
    success.value = false

    try {
      const response = await fetch('/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          role: formData.role,
          password: formData.password,
          research_domain: formData.researchDomain,
          biography: formData.biography,
          phone: formData.phone,
          github_url: formData.githubUrl,
          linkedin_url: formData.linkedinUrl,
          personal_website: formData.personalWebsite,
          invitation_token: invitationToken
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'inscription')
      }

      success.value = true
      return {
        success: true,
        message: data.message || 'Inscription réussie',
        user: data.user
      }

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors de l\'inscription'
      return {
        success: false,
        message: error.value
      }
    } finally {
      isLoading.value = false
    }
  }

  // Validation des données du formulaire
  const validateFormData = (formData: RegisterData): string[] => {
    const errors: string[] = []

    if (!formData.firstName.trim()) {
      errors.push('Le prénom est requis')
    }

    if (!formData.lastName.trim()) {
      errors.push('Le nom est requis')
    }

    if (!formData.email.trim()) {
      errors.push('L\'email est requis')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('L\'email n\'est pas valide')
    }

    if (!formData.role) {
      errors.push('Le rôle est requis')
    }

    if (!formData.password) {
      errors.push('Le mot de passe est requis')
    } else if (formData.password.length < 8) {
      errors.push('Le mot de passe doit contenir au moins 8 caractères')
    }

    if (formData.password !== formData.confirmPassword) {
      errors.push('Les mots de passe ne correspondent pas')
    }

    return errors
  }

  // Nettoyer l'état
  const resetState = () => {
    error.value = null
    success.value = false
  }

  return {
    // État
    isLoading,
    error,
    success,

    // Méthodes
    registerWithToken,
    validateFormData,
    resetState
  }
}