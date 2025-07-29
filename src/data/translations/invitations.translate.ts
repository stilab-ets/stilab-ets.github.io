export interface InvitationsTranslations {
  management: {
    title: string
    subtitle: string
    tabs: {
      send: string
      history: string
      stats: string
    }
  }
  sender: {
    title: string
    subtitle: string
    form: {
      email: string
      emailPlaceholder: string
      role: string
      selectRole: string
      submit: string
      submitting: string
      bulkTitle: string
      bulkSubtitle: string
      bulkEmails: string
      bulkEmailsPlaceholder: string
      bulkSubmit: string
    }
    validation: {
      emailRequired: string
      emailInvalid: string
      roleRequired: string
    }
    success: {
      invitationSent: string
      bulkInvitationsSent: string
    }
    errors: {
      sendFailed: string
      emailAlreadyExists: string
      bulkSendFailed: string
    }
  }
  history: {
    title: string
    filters: {
      all: string
      pending: string
      registered: string
      expired: string
      canceled: string
    }
    table: {
      email: string
      role: string
      status: string
      sentAt: string
      expiresAt: string
      actions: string
    }
    actions: {
      resend: string
      cancel: string
      delete: string
    }
    confirmations: {
      deleteConfirm: string
      cancelConfirm: string
    }
    empty: {
      title: string
      description: string
    }
  }
  stats: {
    total: string
    pending: string
    registered: string
    expired: string
  }
  status: {
    pending: string
    registered: string
    expired: string
    canceled: string
  }
}

type InvitationsTranslationDict = {
  fr: InvitationsTranslations;
  en: InvitationsTranslations;
};

export const invitationsTranslations: InvitationsTranslationDict = {
  en: {
    management: {
      title: 'Invitation Management',
      subtitle: 'Send invitations and manage user access',
      tabs: {
        send: 'Send Invitations',
        history: 'Invitation History',
        stats: 'Statistics'
      }
    },
    sender: {
      title: 'Send New Invitation',
      subtitle: 'Invite new users to join the platform',
      form: {
        email: 'Email Address',
        emailPlaceholder: 'Enter email address',
        role: 'Role',
        selectRole: 'Select a role',
        submit: 'Send Invitation',
        submitting: 'Sending...',
        bulkTitle: 'Bulk Invitations',
        bulkSubtitle: 'Send multiple invitations at once',
        bulkEmails: 'Email Addresses',
        bulkEmailsPlaceholder: 'Enter email addresses (one per line)',
        bulkSubmit: 'Send Bulk Invitations'
      },
      validation: {
        emailRequired: 'Email address is required',
        emailInvalid: 'Please enter a valid email address',
        roleRequired: 'Please select a role'
      },
      success: {
        invitationSent: 'Invitation sent successfully to',
        bulkInvitationsSent: 'invitations sent successfully'
      },
      errors: {
        sendFailed: 'Failed to send invitation',
        emailAlreadyExists: 'User with this email already exists',
        bulkSendFailed: 'Failed to send some invitations'
      }
    },
    history: {
      title: 'Invitation History',
      filters: {
        all: 'All Invitations',
        pending: 'Pending',
        registered: 'Registered',
        expired: 'Expired',
        canceled: 'Canceled'
      },
      table: {
        email: 'Email',
        role: 'Role',
        status: 'Status',
        sentAt: 'Sent At',
        expiresAt: 'Expires At',
        actions: 'Actions'
      },
      actions: {
        resend: 'Resend',
        cancel: 'Cancel',
        delete: 'Delete'
      },
      confirmations: {
        deleteConfirm: 'Are you sure you want to delete this invitation?',
        cancelConfirm: 'Are you sure you want to cancel this invitation?'
      },
      empty: {
        title: 'No invitations found',
        description: 'Send your first invitation to get started'
      }
    },
    stats: {
      total: 'Total Invitations',
      pending: 'Pending',
      registered: 'Registered',
      expired: 'Expired'
    },
    status: {
      pending: 'Pending',
      registered: 'Registered',
      expired: 'Expired',
      canceled: 'Canceled'
    }
  },
  fr: {
    management: {
      title: 'Gestion des Invitations',
      subtitle: 'Envoyer des invitations et gérer les accès utilisateurs',
      tabs: {
        send: 'Envoyer des Invitations',
        history: 'Historique des Invitations',
        stats: 'Statistiques'
      }
    },
    sender: {
      title: 'Envoyer une Nouvelle Invitation',
      subtitle: 'Inviter de nouveaux utilisateurs à rejoindre la plateforme',
      form: {
        email: 'Adresse Email',
        emailPlaceholder: 'Entrez l\'adresse email',
        role: 'Rôle',
        selectRole: 'Sélectionnez un rôle',
        submit: 'Envoyer l\'Invitation',
        submitting: 'Envoi...',
        bulkTitle: 'Invitations en Masse',
        bulkSubtitle: 'Envoyer plusieurs invitations à la fois',
        bulkEmails: 'Adresses Email',
        bulkEmailsPlaceholder: 'Entrez les adresses email (une par ligne)',
        bulkSubmit: 'Envoyer les Invitations en Masse'
      },
      validation: {
        emailRequired: 'L\'adresse email est requise',
        emailInvalid: 'Veuillez entrer une adresse email valide',
        roleRequired: 'Veuillez sélectionner un rôle'
      },
      success: {
        invitationSent: 'Invitation envoyée avec succès à',
        bulkInvitationsSent: 'invitations envoyées avec succès'
      },
      errors: {
        sendFailed: 'Échec de l\'envoi de l\'invitation',
        emailAlreadyExists: 'Un utilisateur avec cet email existe déjà',
        bulkSendFailed: 'Échec de l\'envoi de certaines invitations'
      }
    },
    history: {
      title: 'Historique des Invitations',
      filters: {
        all: 'Toutes les Invitations',
        pending: 'En Attente',
        registered: 'Inscrits',
        expired: 'Expirées',
        canceled: 'Annulées'
      },
      table: {
        email: 'Email',
        role: 'Rôle',
        status: 'Statut',
        sentAt: 'Envoyée le',
        expiresAt: 'Expire le',
        actions: 'Actions'
      },
      actions: {
        resend: 'Renvoyer',
        cancel: 'Annuler',
        delete: 'Supprimer'
      },
      confirmations: {
        deleteConfirm: 'Êtes-vous sûr de vouloir supprimer cette invitation ?',
        cancelConfirm: 'Êtes-vous sûr de vouloir annuler cette invitation ?'
      },
      empty: {
        title: 'Aucune invitation trouvée',
        description: 'Envoyez votre première invitation pour commencer'
      }
    },
    stats: {
      total: 'Total des Invitations',
      pending: 'En Attente',
      registered: 'Inscrits',
      expired: 'Expirées'
    },
    status: {
      pending: 'En Attente',
      registered: 'Inscrit',
      expired: 'Expirée',
      canceled: 'Annulée'
    }
  }
} as const