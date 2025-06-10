export interface HeroTranslations {
  title: {
    line1: string
    line2: string
    line3: string
  }
  subtitle: string
  cta: {
    research: string
    team: string
  }
  highlights: {
    ai: {
      title: string
      description: string
    }
    systems: {
      title: string
      description: string
    }
    security: {
      title: string
      description: string
    }
  }
  activity: string
}

export const heroTranslations = {
  fr: {
    title: {
      line1: 'Innovation en',
      line2: 'Génie Logiciel',
      line3: '& Intelligence'
    },
    subtitle: 'Laboratoire de recherche dédié à l\'innovation en génie logiciel, intelligence artificielle et technologies de pointe.',
    cta: {
      research: 'Découvrir nos recherches',
      team: 'Rencontrer l\'équipe'
    },
    highlights: {
      ai: {
        title: 'Intelligence Artificielle',
        description: 'Recherche de pointe en IA'
      },
      systems: {
        title: 'Systèmes Distribués',
        description: 'Architecture haute performance'
      },
      security: {
        title: 'Cybersécurité',
        description: 'Sécurité des systèmes'
      }
    },
    activity: 'Recherche active en cours...'
  },
  en: {
    title: {
      line1: 'Innovation in',
      line2: 'Software Engineering',
      line3: '& Intelligence'
    },
    subtitle: 'Research laboratory dedicated to innovation in software engineering, artificial intelligence and cutting-edge technologies.',
    cta: {
      research: 'Explore our research',
      team: 'Meet the team'
    },
    highlights: {
      ai: {
        title: 'Artificial Intelligence',
        description: 'Cutting-edge AI research'
      },
      systems: {
        title: 'Distributed Systems',
        description: 'High-performance architecture'
      },
      security: {
        title: 'Cybersecurity',
        description: 'Systems security'
      }
    },
    activity: 'Active research ongoing...'
  }
} as const