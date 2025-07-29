export interface AdminInvitationManagementTranslations {
  title: string
  subtitle: string
  accessDenied: {
    title: string
    message: string
  }
  navigation: {
    send: string
    stats: string
    history: string
  }
  loading: {
    invitations: string
    action: string
  }
  errors: {
    fetchFailed: string
    actionFailed: string
    unauthorized: string
  }
  refresh: {
    button: string
    lastUpdated: string
  }
}

type AdminInvitationManagementTranslationDict = {
  fr: AdminInvitationManagementTranslations;
  en: AdminInvitationManagementTranslations;
};

export const adminInvitationManagementTranslations: AdminInvitationManagementTranslationDict = {
  en: {
    title: 'Invitation Management',
    subtitle: 'Manage user invitations and access control',
    accessDenied: {
      title: 'Access Denied',
      message: 'You do not have permission to access this page. Administrator privileges required.'
    },
    navigation: {
      send: 'Send Invitations',
      stats: 'Statistics',
      history: 'History'
    },
    loading: {
      invitations: 'Loading invitations...',
      action: 'Processing...'
    },
    errors: {
      fetchFailed: 'Failed to load invitation data',
      actionFailed: 'Action failed. Please try again.',
      unauthorized: 'Unauthorized access'
    },
    refresh: {
      button: 'Refresh Data',
      lastUpdated: 'Last updated'
    }
  },
  fr: {
    title: 'Gestion des Invitations',
    subtitle: 'Gérer les invitations utilisateurs et le contrôle d\'accès',
    accessDenied: {
      title: 'Accès Refusé',
      message: 'Vous n\'avez pas la permission d\'accéder à cette page. Privilèges administrateur requis.'
    },
    navigation: {
      send: 'Envoyer des Invitations',
      stats: 'Statistiques',
      history: 'Historique'
    },
    loading: {
      invitations: 'Chargement des invitations...',
      action: 'Traitement...'
    },
    errors: {
      fetchFailed: 'Échec du chargement des données d\'invitation',
      actionFailed: 'Action échouée. Veuillez réessayer.',
      unauthorized: 'Accès non autorisé'
    },
    refresh: {
      button: 'Actualiser les Données',
      lastUpdated: 'Dernière mise à jour'
    }
  }
} as const