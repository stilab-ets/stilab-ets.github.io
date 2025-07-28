export interface CommonTranslations {
  loading: string
  error: string
  backToTop: string
  readMore: string
  contact: string
  email: string
  phone: string
  address: string
}

export const commonTranslations = {
  fr: {
    loading: 'Chargement...',
    error: 'Une erreur est survenue',
    backToTop: 'Retour en haut',
    readMore: 'Lire la suite',
    contact: 'Contact',
    email: 'Email',
    phone: 'Téléphone',
    address: 'Adresse'
  },
  en: {
    loading: 'Loading...',
    error: 'An error occurred',
    backToTop: 'Back to top',
    readMore: 'Read more',
    contact: 'Contact',
    email: 'Email',
    phone: 'Phone',
    address: 'Address'
  }
} as const