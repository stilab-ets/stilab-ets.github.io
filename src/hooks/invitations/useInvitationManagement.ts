import { ref, computed } from 'vue'

export interface Invitation {
  id: number
  email: string
  role: string
  sentAt: string
  status: 'pending' | 'expired' | 'registered' | 'canceled'
  expiresAt: string
}

export function useInvitationManagement() {
  const invitations = ref<Invitation[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Récupérer toutes les invitations
  const fetchInvitations = async (): Promise<void> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch('/api/invitations', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des invitations')
      }

      const data = await response.json()
      invitations.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors de la récupération des invitations'
    } finally {
      isLoading.value = false
    }
  }

  // Envoyer une nouvelle invitation
  const sendInvitation = async (email: string): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch('/api/send-mail-invitation', {
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

      // Recharger la liste des invitations après envoi
      await fetchInvitations()
      
      return data.success
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors de l\'envoi de l\'invitation'
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Mettre à jour une invitation
  const updateInvitation = async (
    id: number, 
    updates: Partial<Pick<Invitation, 'status' | 'role'>>
  ): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/invitation/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'invitation')
      }

      // Mettre à jour localement
      const invitationIndex = invitations.value.findIndex(inv => inv.id === id)
      if (invitationIndex > -1) {
        Object.assign(invitations.value[invitationIndex], updates)
      }

      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors de la mise à jour de l\'invitation'
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Supprimer une invitation
  const deleteInvitation = async (id: number): Promise<boolean> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(`/api/invitations/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'invitation')
      }

      // Supprimer localement
      const invitationIndex = invitations.value.findIndex(inv => inv.id === id)
      if (invitationIndex > -1) {
        invitations.value.splice(invitationIndex, 1)
      }

      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors de la suppression de l\'invitation'
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Annuler une invitation (met le statut à "canceled")
  const cancelInvitation = async (id: number): Promise<boolean> => {
    return await updateInvitation(id, { status: 'canceled' })
  }

  // Renvoyer une invitation (recrée une nouvelle invitation)
  const resendInvitation = async (email: string): Promise<boolean> => {
    return await sendInvitation(email)
  }

  // Statistiques des invitations
  const invitationStats = computed(() => {
    const total = invitations.value.length
    const pending = invitations.value.filter(inv => inv.status === 'pending').length
    const registered = invitations.value.filter(inv => inv.status === 'registered').length
    const expired = invitations.value.filter(inv => inv.status === 'expired').length
    const canceled = invitations.value.filter(inv => inv.status === 'canceled').length

    return {
      total,
      pending,
      registered,
      expired,
      canceled,
      registrationRate: total > 0 ? Math.round((registered / total) * 100) : 0
    }
  })

  // Filtrer les invitations par statut
  const getInvitationsByStatus = (status?: Invitation['status']) => {
    if (!status) return invitations.value
    return invitations.value.filter(inv => inv.status === status)
  }

  // Vérifier si une invitation est expirée
  const isInvitationExpired = (invitation: Invitation): boolean => {
    if (invitation.status === 'expired') return true
    
    const expirationDate = new Date(invitation.expiresAt)
    const now = new Date()
    return now > expirationDate
  }

  // Formater les dates
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Obtenir la couleur du badge selon le statut
  const getStatusColor = (status: Invitation['status']): string => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'registered':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'canceled':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  // Obtenir le libellé du statut
  const getStatusLabel = (status: Invitation['status']): string => {
    switch (status) {
      case 'pending':
        return 'En attente'
      case 'registered':
        return 'Inscrit'
      case 'expired':
        return 'Expiré'
      case 'canceled':
        return 'Annulé'
      default:
        return 'Inconnu'
    }
  }

  // Nettoyer l'état d'erreur
  const clearError = () => {
    error.value = null
  }

  return {
    // État
    invitations: computed(() => invitations.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    invitationStats,

    // Méthodes principales
    fetchInvitations,
    sendInvitation,
    updateInvitation,
    deleteInvitation,
    cancelInvitation,
    resendInvitation,

    // Méthodes utilitaires
    getInvitationsByStatus,
    isInvitationExpired,
    formatDate,
    getStatusColor,
    getStatusLabel,
    clearError
  }
}