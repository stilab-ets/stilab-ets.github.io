export interface AwardsFormTranslations {
  title: string
  description: string
  fields: {
    name: string
    email: string
    role: string
  }
  actions: {
    save: string
    cancel: string
    delete: string
  }
}

export const awardsFormTranslations: Record<'fr' | 'en', AwardsFormTranslations> = {
  fr: {
    title: 'Gestion des administrateurs',
    description: 'Ajoutez ou modifiez des comptes administrateurs.',
    fields: {
      name: 'Nom',
      email: 'Courriel',
      role: 'Rôle'
    },
    actions: {
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer'
    }
  },
  en: {
    title: 'Admin Management',
    description: 'Add or edit administrator accounts.',
    fields: {
      name: 'Name',
      email: 'Email',
      role: 'Role'
    },
    actions: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete'
    }
  }
} as const
