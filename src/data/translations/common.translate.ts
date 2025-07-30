export interface CommonTranslations {
  cancel: string
  settings: string
  loading: string
  error: string
  backToTop: string
  readMore: string
  contact: string
  email: string
  phone: string
  address: string
  retry: string
}

type CommonTranslationDict = {
  fr: CommonTranslations;
  en: CommonTranslations;
};

export const commonTranslations: CommonTranslationDict = {
  fr: {
    loading: 'Chargement...',
    error: 'Une erreur est survenue',
    backToTop: 'Retour en haut',
    readMore: 'Lire la suite',
    contact: 'Contact',
    email: 'Email',
    phone: 'Téléphone',
    address: 'Adresse',
    retry: 'Réessayer',
    settings: "Paramètres",
    cancel: "Annuler"
  },
  en: {
    loading: 'Loading...',
    error: 'An error occurred',
    backToTop: 'Back to top',
    readMore: 'Read more',
    contact: 'Contact',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    retry: 'Retry',
    settings: "Settings",
    cancel: "Cancel"
  }
} as const