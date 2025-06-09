export interface VacanciesTranslations {
  pageTitle: string
  pageSubtitle: string
  infoBox: {
    whyJoinUs: string
    benefits: readonly string[]
    hrContact: string
    email: string
    phone: string
    address: string
  }
  filters: {
    positionType: string
    allTypes: string
    domain: string
    allDomains: string
    sortBy: string
  }
  positionTypes: {
    phd: string
    postdoc: string
    researcher: string
    engineer: string
    intern: string
  }
  sorting: {
    deadlineClose: string
    deadlineFar: string
    positionType: string
    recent: string
  }
  vacancyCard: {
    supervisor: string
    duration: string
    salary: string
    deadline: string
    startDate: string
    urgent: string
    standard: string
    profile: string
    apply: string
    share: string
  }
  deadlineStatus: {
    deadlinePassed: string
    deadlineToday: string
    deadlineTomorrow: string
    daysRemaining: string
  }
  results: {
    offer: string
    offers: string
    available: string
  }
  empty: {
    title: string
    message: string
  }
}

export const vacanciesTranslations = {
  fr: {
    pageTitle: 'Recrutements & Opportunités',
    pageSubtitle: 'Rejoignez notre équipe de recherche en génie logiciel',
    infoBox: {
      whyJoinUs: 'Pourquoi nous rejoindre ?',
      benefits: [
        'Recherche de pointe en génie logiciel',
        'Collaboration avec l\'industrie',
        'Équipe internationale et dynamique',
        'Équipements et technologies modernes'
      ],
      hrContact: 'Contact RH',
      email: 'recrutement@labo-software.fr',
      phone: '+33 1 23 45 67 89',
      address: 'Université de Recherche, Bâtiment Informatique'
    },
    filters: {
      positionType: 'Type de poste',
      allTypes: 'Tous les types',
      domain: 'Domaine',
      allDomains: 'Tous les domaines',
      sortBy: 'Trier par'
    },
    positionTypes: {
      phd: 'Doctorat',
      postdoc: 'Post-doctorat',
      researcher: 'Chercheur',
      engineer: 'Ingénieur',
      intern: 'Stage'
    },
    sorting: {
      deadlineClose: 'Date limite (proche)',
      deadlineFar: 'Date limite (lointaine)',
      positionType: 'Type de poste',
      recent: 'Plus récents'
    },
    vacancyCard: {
      supervisor: 'Superviseur',
      duration: 'Durée',
      salary: 'Salaire',
      deadline: 'Date limite',
      startDate: 'Début',
      urgent: 'Urgent',
      standard: 'Standard',
      profile: 'Profil recherché',
      apply: 'Postuler',
      share: 'Partager'
    },
    deadlineStatus: {
      deadlinePassed: 'Date limite dépassée',
      deadlineToday: 'Date limite aujourd\'hui',
      deadlineTomorrow: 'Date limite demain',
      daysRemaining: 'jours restants'
    },
    results: {
      offer: 'offre',
      offers: 'offres',
      available: 'disponible'
    },
    empty: {
      title: 'Aucune offre trouvée',
      message: 'Essayez de modifier vos filtres ou revenez plus tard.'
    }
  },
  en: {
    pageTitle: 'Vacancies & Opportunities',
    pageSubtitle: 'Join our software engineering research team',
    infoBox: {
      whyJoinUs: 'Why join us?',
      benefits: [
        'Cutting-edge software engineering research',
        'Industry collaboration',
        'International and dynamic team',
        'Modern equipment and technologies'
      ],
      hrContact: 'HR Contact',
      email: 'recruitment@lab-software.edu',
      phone: '+33 1 23 45 67 89',
      address: 'Research University, Computer Science Building'
    },
    filters: {
      positionType: 'Position type',
      allTypes: 'All types',
      domain: 'Domain',
      allDomains: 'All domains',
      sortBy: 'Sort by'
    },
    positionTypes: {
      phd: 'PhD',
      postdoc: 'Post-doc',
      researcher: 'Researcher',
      engineer: 'Engineer',
      intern: 'Internship'
    },
    sorting: {
      deadlineClose: 'Deadline (close)',
      deadlineFar: 'Deadline (far)',
      positionType: 'Position type',
      recent: 'Most recent'
    },
    vacancyCard: {
      supervisor: 'Supervisor',
      duration: 'Duration',
      salary: 'Salary',
      deadline: 'Deadline',
      startDate: 'Start date',
      urgent: 'Urgent',
      standard: 'Standard',
      profile: 'Profile sought',
      apply: 'Apply',
      share: 'Share'
    },
    deadlineStatus: {
      deadlinePassed: 'Deadline passed',
      deadlineToday: 'Deadline today',
      deadlineTomorrow: 'Deadline tomorrow',
      daysRemaining: 'days remaining'
    },
    results: {
      offer: 'offer',
      offers: 'offers',
      available: 'available'
    },
    empty: {
      title: 'No offers found',
      message: 'Try modifying your filters or come back later.'
    }
  }
} as const