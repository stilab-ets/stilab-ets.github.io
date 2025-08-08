export interface PublicationsTranslations {
  pageTitle: string;
  pageSubtitle: string;
  search: {
    label: string;
    placeholder: string;
  };
  filters: {
    year: string;
    allYears: string;
    type: string;
    allTypes: string;
    sortBy: string;
  };
  sorting: {
    yearDesc: string;
    yearAsc: string;
    citationsDesc: string;
    titleAsc: string;
  };
  publicationTypes: {
    journal: string;
    conference: string;
    workshop: string;
    thesis: string;
    book: string;
  };
  publicationCard: {
    authors: string;
    citations: string;
    citation: string;
    showBibtex: string;
    hideBibtex: string;
    copyBibtex?: string;
    bibtexCopied?: string;
  };
  results: {
    publication: string;
    publications: string;
    found: string;
  };
  links: {
    pdf: string;
    doi: string;
  };
  empty: {
    title: string;
    message: string;
  };
}

type PublicationsTranslationDict = {
  fr: PublicationsTranslations;
  en: PublicationsTranslations;
};

export const publicationsTranslations: PublicationsTranslationDict = {
  fr: {
    pageTitle: 'Nos Publications',
    pageSubtitle:
      'Découvrez les travaux de recherche publiés par notre laboratoire',
    search: {
      label: 'Rechercher une publication',
      placeholder: 'Titre, auteur, venue...',
    },
    filters: {
      year: 'Année',
      allYears: 'Toutes',
      type: 'Type',
      allTypes: 'Tous',
      sortBy: 'Trier par',
    },
    sorting: {
      yearDesc: 'Année (plus récent)',
      yearAsc: 'Année (plus ancien)',
      citationsDesc: 'Citations (plus cité)',
      titleAsc: 'Titre (A-Z)',
    },
    publicationTypes: {
      journal: 'Journal',
      conference: 'Conférence',
      workshop: 'Workshop',
      thesis: 'Thèse',
      book: 'Livre',
    },
    publicationCard: {
      authors: 'Auteurs',
      citations: 'citations',
      citation: 'citation',
      showBibtex: 'Afficher BibTeX',
      hideBibtex: 'Cacher BibTeX',
      copyBibtex: 'Copier BibTeX',
      bibtexCopied: 'BibTeX copié dans le presse-papiers',
    },
    results: {
      publication: 'publication',
      publications: 'publications',
      found: 'trouvée',
    },
    links: {
      pdf: 'PDF',
      doi: 'DOI',
    },
    empty: {
      title: 'Aucune publication trouvée',
      message: 'Essayez de modifier vos critères de recherche.',
    },
  },
  en: {
    pageTitle: 'Our Publications',
    pageSubtitle: 'Discover the research work published by our laboratory',
    search: {
      label: 'Search publications',
      placeholder: 'Title, author, venue...',
    },
    filters: {
      year: 'Year',
      allYears: 'All',
      type: 'Type',
      allTypes: 'All',
      sortBy: 'Sort by',
    },
    sorting: {
      yearDesc: 'Year (newest)',
      yearAsc: 'Year (oldest)',
      citationsDesc: 'Citations (most cited)',
      titleAsc: 'Title (A-Z)',
    },
    publicationTypes: {
      journal: 'Journal',
      conference: 'Conference',
      workshop: 'Workshop',
      thesis: 'Thesis',
      book: 'Book',
    },
    publicationCard: {
      authors: 'Authors',
      citations: 'citations',
      citation: 'citation',
      showBibtex: 'Show BibTeX',
      hideBibtex: 'Hide BibTeX',
      copyBibtex: 'Copy BibTeX',
      bibtexCopied: 'BibTeX copied to clipboard',
    },
    results: {
      publication: 'publication',
      publications: 'publications',
      found: 'found',
    },
    links: {
      pdf: 'PDF',
      doi: 'DOI',
    },
    empty: {
      title: 'No publications found',
      message: 'Try modifying your search criteria.',
    },
  },
} as const;
