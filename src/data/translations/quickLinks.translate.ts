export interface QuickLinksTranslations {
  sectionTitle: string
  rapidAccess: string
  publications: {
    title: string
    description: string
  }
  events: {
    title: string
    description: string
  }
  vacancies: {
    title: string
    description: string
  }
}

export const quickLinksTranslations = {
  fr: {
    sectionTitle: 'Accès Rapide',
    rapidAccess: 'Accès',
    publications: {
      title: 'Dernières Publications',
      description: 'Découvrez nos travaux de recherche récents'
    },
    events: {
      title: 'Événements à Venir',
      description: 'Séminaires, workshops et soutenances'
    },
    vacancies: {
      title: 'Nous Rejoindre',
      description: 'Opportunités de doctorat et post-doctorat'
    }
  },
  en: {
    sectionTitle: 'Quick Access',
    rapidAccess: 'Quick',
    publications: {
      title: 'Latest Publications',
      description: 'Discover our recent research work'
    },
    events: {
      title: 'Upcoming Events',
      description: 'Seminars, workshops and defenses'
    },
    vacancies: {
      title: 'Join Us',
      description: 'PhD and post-doctoral opportunities'
    }
  }
} as const