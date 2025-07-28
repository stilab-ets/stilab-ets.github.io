export interface EventsTranslations {
  stats: any
  results: any
  pageTitle: string
  pageSubtitle: string
  statistics: {
    upcomingEvents: string
    registrations: string
    totalEvents: string
  }
  filters: {
    view: any
    type: any
    eventType: string
    allTypes: string
    period: string
    all: string
    upcoming: string
    past: string
  }
  eventTypes: {
    seminar: string
    workshop: string
    conference: string
    defense: string
    meeting: string
    colloquium: string
    masterclass: string
  }
  eventCard: {
    capacityFull: any
    speaker: string
    registrations: string
    registrationOpen: string
    limitedSeats: string
    register: string
    full: string
    capacity: string
  }
  sections: {
    upcomingEvents: string
    pastEvents: string
  }
  empty: {
    noUpcoming: string
    noUpcomingMessage: string
    noPast: string
    noPastMessage: string
  }
}

type EventsTranslationDict = {
  fr: EventsTranslations;
  en: EventsTranslations;
};

export const eventsTranslations: EventsTranslationDict = {
  fr: {
    pageTitle: 'Événements & Actualités',
    pageSubtitle: 'Découvrez nos séminaires, workshops, soutenances et événements du laboratoire',
    statistics: {
      upcomingEvents: 'Événements à venir',
      registrations: 'Inscriptions',
      totalEvents: 'Total événements'
    },
    filters: {
      eventType: 'Type d\'événement',
      allTypes: 'Tous les types',
      period: 'Période',
      all: 'Tous',
      upcoming: 'À venir',
      past: 'Passés',
      view: 'Vue',
      type: 'Type'
    },
    eventTypes: {
      seminar: 'Séminaires',
      workshop: 'Workshops',
      conference: 'Conférences',
      defense: 'Soutenances',
      meeting: 'Réunions',
      colloquium: 'Colloques',
      masterclass: 'Masterclass'
    },
    eventCard: {
      speaker: 'Intervenant',
      registrations: 'Inscriptions',
      registrationOpen: 'Inscription ouverte',
      limitedSeats: 'Places limitées',
      register: 'S\'inscrire',
      full: 'Complet',
      capacity: 'Capacité',
      capacityFull: undefined
    },
    sections: {
      upcomingEvents: 'Événements à venir',
      pastEvents: 'Événements passés'
    },
    empty: {
      noUpcoming: 'Aucun événement à venir',
      noUpcomingMessage: 'Consultez nos événements passés ou revenez plus tard.',
      noPast: 'Aucun événement passé trouvé',
      noPastMessage: 'Essayez de modifier vos filtres.'
    },
    stats: 'Statistiques',
    results: 'Résultats'
  },
  en: {
    pageTitle: 'Events & News',
    pageSubtitle: 'Discover our seminars, workshops, defenses and laboratory events',
    statistics: {
      upcomingEvents: 'Upcoming events',
      registrations: 'Registrations',
      totalEvents: 'Total events'
    },
    filters: {
      eventType: 'Event type',
      allTypes: 'All types',
      period: 'Period',
      all: 'All',
      upcoming: 'Upcoming',
      past: 'Past',
      view: undefined,
      type: undefined
    },
    eventTypes: {
      seminar: 'Seminars',
      workshop: 'Workshops',
      conference: 'Conferences',
      defense: 'Defenses',
      meeting: 'Meetings',
      colloquium: 'Colloquiums',
      masterclass: 'Masterclasses'
    },
    eventCard: {
      speaker: 'Speaker',
      registrations: 'Registrations',
      registrationOpen: 'Registration open',
      limitedSeats: 'Limited seats',
      register: 'Register',
      full: 'Full',
      capacity: 'Capacity',
      capacityFull: undefined
    },
    sections: {
      upcomingEvents: 'Upcoming events',
      pastEvents: 'Past events'
    },
    empty: {
      noUpcoming: 'No upcoming events',
      noUpcomingMessage: 'Check our past events or come back later.',
      noPast: 'No past events found',
      noPastMessage: 'Try modifying your filters.'
    },
    stats: 'Statistics',
    results: 'Results'
  }
} as const