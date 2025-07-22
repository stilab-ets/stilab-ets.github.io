export interface PersonTranslations {
  pageTitle: string
  pageSubtitle: string
  search: {
    placeholder: string
    label: string
    domainLabel: string
    statusLabel: string
    allDomains: string
    allStatuses: string
    active: string
    alumni: string
    visitors: string
  }
  card: {
    researchDomains: string
    status: {
      active: string
      alumni: string
      visitor: string
    }
  }
  modal: {
    biography: string
    researchDomains: string
    awards: string
    teaching: string
    externalLinks: string
    github: string
    linkedin: string
    website: string
  }
  results: {
    member: string
    members: string
    found: string
    noResults: string
  }
  sections: {
    phd: string
    msc: string
    pro: string
  }
  empty: {
    title: string
    message: string
  }
}

type PersonTranslationDict = {
  fr: PersonTranslations;
  en: PersonTranslations;
};

export const personTranslations: PersonTranslationDict = {
  fr: {
    pageTitle: 'Notre Équipe',
    pageSubtitle: 'Découvrez les chercheurs et doctorants qui forment notre laboratoire de génie logiciel',
    search: {
      placeholder: 'Nom, titre, domaine de recherche...',
      label: 'Rechercher un membre',
      domainLabel: 'Domaine de recherche',
      statusLabel: 'Statut',
      allDomains: 'Tous les domaines',
      allStatuses: 'Tous',
      active: 'Actifs',
      alumni: 'Alumni',
      visitors: 'Visiteurs'
    },
    card: {
      researchDomains: 'Domaines de recherche',
      status: {
        active: 'Actif',
        alumni: 'Alumni',
        visitor: 'Visiteur'
      }
    },
    modal: {
      biography: 'Biographie',
      researchDomains: 'Domaines de recherche',
      awards: 'Prix et distinctions',
      teaching: 'Enseignements',
      externalLinks: 'Liens externes',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      website: 'Site Web'
    },
    results: {
      member: 'membre',
      members: 'membres',
      found: 'trouvé',
      noResults: 'trouvés',
    },
    sections: {
      phd: 'Doctorants',
      msc: 'Masters',
      pro: 'Professeurs'
    },
    empty: {
      title: 'Aucun membre trouvé',
      message: 'Essayez de modifier vos critères de recherche.'
    }
  },
  en: {
    pageTitle: 'Our Team',
    pageSubtitle: 'Meet the researchers and PhD students who form our software engineering laboratory',
    search: {
      placeholder: 'Name, title, research domain...',
      label: 'Search for a member',
      domainLabel: 'Research domain',
      statusLabel: 'Status',
      allDomains: 'All domains',
      allStatuses: 'All',
      active: 'Active',
      alumni: 'Alumni',
      visitors: 'Visitors'
    },
    card: {
      researchDomains: 'Research domains',
      status: {
        active: 'Active',
        alumni: 'Alumni',
        visitor: 'Visitor'
      }
    },
    modal: {
      biography: 'Biography',
      researchDomains: 'Research domains',
      awards: 'Awards and distinctions',
      teaching: 'Teaching',
      externalLinks: 'External links',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      website: 'Website'
    },
    results: {
      member: 'member',
      members: 'members',
      found: 'found',
      noResults: 'found',
    },
    sections: {
      phd: 'PhD Students',
      msc: 'Masters',
      pro: 'Professors'
    },
    empty: {
      title: 'No members found',
      message: 'Try modifying your search criteria.'
    }
  }
} as const