export interface AwardsTranslations {
  results: any;
  pageTitle: string;
  pageSubtitle: string;
  statistics: {
    sectionTitle: string;
    totalAwards: string;
    organizations: string;
    awardedMembers: string;
    yearsOfRecognition: string;
  };
  filters: {
    year: string;
    allYears: string;
    organization: string;
    allOrganizations: string;
    member: string;
    allMembers: string;
    resultsFound: string;
    award: string;
    awards: string;
    found: string;
  };
  categories: {
    publication: string;
    research: string;
    teaching: string;
    service: string;
    career: string;
    excellence: string;
  };
  timeline: {
    awardsIn: string;
    recipient: string;
    recent: string;
  };
  notable: {
    sectionTitle: string;
    bestPaperAwards: string;
    bestPaperDescription: string;
    researchExcellence: string;
    researchExcellenceDescription: string;
    industryRecognition: string;
    industryRecognitionDescription: string;
  };
  empty: {
    title: string;
    message: string;
  };
}

type AwardsTranslationDict = {
  fr: AwardsTranslations;
  en: AwardsTranslations;
};

export const awardsTranslations: AwardsTranslationDict = {
  fr: {
    pageTitle: 'Prix & Distinctions',
    pageSubtitle:
      "Reconnaissance de l'excellence de nos recherches et de notre équipe",
    statistics: {
      sectionTitle: 'Nos Achievements',
      totalAwards: 'Prix reçus',
      organizations: 'Organisations',
      awardedMembers: 'Membres récompensés',
      yearsOfRecognition: 'Années de reconnaissance',
    },
    filters: {
      year: 'Année',
      allYears: 'Toutes les années',
      organization: 'Organisation',
      allOrganizations: 'Toutes les organisations',
      member: 'Membre',
      allMembers: 'Tous les membres',
      resultsFound: 'prix trouvé',
      award: 'prix',
      awards: 'prix',
      found: 'trouvés',
    },
    categories: {
      publication: 'Publication',
      research: 'Recherche',
      teaching: 'Enseignement',
      service: 'Service',
      career: 'Carrière',
      excellence: 'Excellence',
    },
    timeline: {
      awardsIn: 'prix en',
      recipient: 'Lauréats',
      recent: 'Récent',
    },
    notable: {
      sectionTitle: 'Achievements Notables',
      bestPaperAwards: 'Best Paper Awards',
      bestPaperDescription: 'Dans des conférences de premier plan',
      researchExcellence: 'Excellence en Recherche',
      researchExcellenceDescription: "Prix d'excellence académique",
      industryRecognition: 'Reconnaissance Industrielle',
      industryRecognitionDescription: 'Partenariats et collaborations',
    },
    empty: {
      title: 'Aucun prix trouvé',
      message: 'Essayez de modifier vos filtres.',
    },
    results: 'Résultats',
  },
  en: {
    pageTitle: 'Awards & Distinctions',
    pageSubtitle: 'Recognition of excellence in our research and team',
    statistics: {
      sectionTitle: 'Our Achievements',
      totalAwards: 'Awards received',
      organizations: 'Organizations',
      awardedMembers: 'Awarded members',
      yearsOfRecognition: 'Years of recognition',
    },
    filters: {
      year: 'Year',
      allYears: 'All years',
      organization: 'Organization',
      allOrganizations: 'All organizations',
      member: 'Member',
      allMembers: 'All members',
      resultsFound: 'award found',
      award: 'award',
      awards: 'awards',
      found: 'found',
    },
    categories: {
      publication: 'Publication',
      research: 'Research',
      teaching: 'Teaching',
      service: 'Service',
      career: 'Career',
      excellence: 'Excellence',
    },
    timeline: {
      awardsIn: 'awards in',
      recipient: 'Recipients',
      recent: 'Recent',
    },
    notable: {
      sectionTitle: 'Notable Achievements',
      bestPaperAwards: 'Best Paper Awards',
      bestPaperDescription: 'At top-tier conferences',
      researchExcellence: 'Research Excellence',
      researchExcellenceDescription: 'Academic excellence awards',
      industryRecognition: 'Industry Recognition',
      industryRecognitionDescription: 'Partnerships and collaborations',
    },
    empty: {
      title: 'No awards found',
      message: 'Try modifying your filters.',
    },
    results: 'Results',
  },
} as const;
