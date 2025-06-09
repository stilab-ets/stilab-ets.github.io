export interface FooterTranslations {
  labInfo: {
    labName: string
    labFullName: string
    description: string
  }
  navigation: {
    title: string
    links: {
      team: string
      research: string
      publications: string
      events: string
    }
  }
  contact: {
    title: string
  }
  copyright: string
}

export const footerTranslations = {
  fr: {
    labInfo: {
      labName: 'STIL',
      labFullName: 'Laboratoire de Technologie Logicielle et Intelligence',
      description: 'Laboratoire de recherche dédié à l\'innovation en génie logiciel, intelligence artificielle et technologies de pointe.'
    },
    navigation: {
      title: 'Navigation',
      links: {
        team: 'Équipe',
        research: 'Recherche',
        publications: 'Publications',
        events: 'Événements'
      }
    },
    contact: {
      title: 'Contact'
    },
    copyright: 'Tous droits réservés.'
  },
  en: {
    labInfo: {
      labName: 'STIL',
      labFullName: 'Software Technology and Intelligence Research Lab',
      description: 'Research laboratory dedicated to innovation in software engineering, artificial intelligence and cutting-edge technologies.'
    },
    navigation: {
      title: 'Navigation',
      links: {
        team: 'Team',
        research: 'Research',
        publications: 'Publications',
        events: 'Events'
      }
    },
    contact: {
      title: 'Contact'
    },
    copyright: 'All rights reserved.'
  }
} as const