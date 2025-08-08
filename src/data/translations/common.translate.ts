export interface CommonTranslations {
  mustBeLogged: string;
  loginHere: string;
  successMessage: string;
  cancel: string;
  settings: string;
  loading: string;
  error: string;
  backToTop: string;
  readMore: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  retry: string;
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
    settings: 'Paramètres',
    cancel: 'Annuler',
    mustBeLogged: 'Vous devez être connecté pour accéder à ce formulaire',
    loginHere: 'Connectez-vous ici',
    successMessage: 'Succès',
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
    settings: 'Settings',
    cancel: 'Cancel',
    mustBeLogged: 'Must be logged in to acces this form',
    loginHere: 'Login here',
    successMessage: 'Succes',
  },
} as const;
