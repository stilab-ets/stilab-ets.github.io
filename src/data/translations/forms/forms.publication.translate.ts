export interface PublicationFormTranslations {
  titleCreate: string
  titleEdit: string
  subtitle: string
  form: {
    entryType: string
    selectEntryType: string
    title: string
    titlePlaceholder: string
    authors: string
    authorsPlaceholder: string
    authorsHelp: string
    year: string
    citekey: string
    citekeyPlaceholder: string
    citekeyHelp: string
    journal: string
    journalPlaceholder: string
    booktitle: string
    booktitlePlaceholder: string
    publisher: string
    publisherPlaceholder: string
    volume: string
    volumePlaceholder: string
    number: string
    numberPlaceholder: string
    pages: string
    pagesPlaceholder: string
    url: string
    urlPlaceholder: string
    doi: string
    doiPlaceholder: string
    abstract: string
    abstractPlaceholder: string
    keywords: string
    keywordsPlaceholder: string
    cancel: string
    create: string
    update: string
    submitting: string
  }
  bibtexImport: {
    title: string
    description: string
    placeholder: string
    parse: string
    clear: string
  }
  preview: {
    title: string
  }
  validation: {
    entryTypeRequired: string
    titleRequired: string
    authorRequired: string
    yearRequired: string
    yearInvalid: string
    urlInvalid: string
    doiInvalid: string
  }
  errors: {
    submitFailed: string
    bibtexParseError: string
  }
  entryTypes: {
    article: string
    book: string
    booklet: string
    conference: string
    inbook: string
    incollection: string
    inproceedings: string
    manual: string
    mastersthesis: string
    misc: string
    phdthesis: string
    proceedings: string
    techreport: string
    unpublished: string
    online: string
    presentation: string
  }
}

export const publicationFormTranslations: Record<'fr' | 'en', PublicationFormTranslations> = {
  fr: {
    titleCreate: 'Créer une publication',
    titleEdit: 'Modifier la publication',
    subtitle: 'Remplissez les détails ci-dessous',
    form: {
      entryType: 'Type d\'entrée',
      selectEntryType: 'Sélectionnez le type',
      title: 'Titre',
      titlePlaceholder: 'Titre de la publication',
      authors: 'Auteurs',
      authorsPlaceholder: 'Nom, Prénom and Nom, Prénom',
      authorsHelp: 'Séparez les auteurs avec "and"',
      year: 'Année',
      citekey: 'Clé de citation',
      citekeyPlaceholder: 'Auto-générée si vide',
      citekeyHelp: 'Identifiant unique optionnel',
      journal: 'Journal',
      journalPlaceholder: 'Journal of AI Research',
      booktitle: 'Titre du livre',
      booktitlePlaceholder: 'Nom de la conférence',
      publisher: 'Éditeur',
      publisherPlaceholder: 'Springer, IEEE...',
      volume: 'Volume',
      volumePlaceholder: '42',
      number: 'Numéro',
      numberPlaceholder: '7',
      pages: 'Pages',
      pagesPlaceholder: '123-456',
      url: 'URL',
      urlPlaceholder: 'https://...',
      doi: 'DOI',
      doiPlaceholder: '10.1000/xyz123',
      abstract: 'Résumé',
      abstractPlaceholder: 'Résumé de la publication...',
      keywords: 'Mots-clés',
      keywordsPlaceholder: 'IA, apprentissage automatique',
      cancel: 'Annuler',
      create: 'Créer',
      update: 'Mettre à jour',
      submitting: 'En cours...'
    },
    bibtexImport: {
      title: 'Importer depuis BibTeX',
      description: 'Collez le BibTeX pour remplir le formulaire',
      placeholder: 'Collez votre entrée BibTeX ici...',
      parse: 'Analyser',
      clear: 'Effacer'
    },
    preview: {
      title: 'Aperçu BibTeX'
    },
    validation: {
      entryTypeRequired: 'Le type d\'entrée est requis',
      titleRequired: 'Le titre est requis',
      authorRequired: 'L\'auteur est requis',
      yearRequired: 'L\'année est requise',
      yearInvalid: 'Année invalide',
      urlInvalid: 'URL invalide',
      doiInvalid: 'DOI invalide'
    },
    errors: {
      submitFailed: 'Échec de la soumission',
      bibtexParseError: 'Erreur d\'analyse BibTeX'
    },
    entryTypes: {
      article: 'Article',
      book: 'Livre',
      booklet: 'Livret',
      conference: 'Conférence',
      inbook: 'Dans un livre',
      incollection: 'Dans une collection',
      inproceedings: 'Dans les actes',
      manual: 'Manuel',
      mastersthesis: 'Mémoire de Master',
      misc: 'Divers',
      phdthesis: 'Thèse de doctorat',
      proceedings: 'Actes',
      techreport: 'Rapport technique',
      unpublished: 'Non publié',
      online: 'En ligne',
      presentation: 'Présentation'
    }
  },
  en: {
    titleCreate: 'Create Publication',
    titleEdit: 'Edit Publication',
    subtitle: 'Fill in the details below',
    form: {
      entryType: 'Entry Type',
      selectEntryType: 'Select type',
      title: 'Title',
      titlePlaceholder: 'Publication Title',
      authors: 'Authors',
      authorsPlaceholder: 'Last, First and Last, First',
      authorsHelp: 'Separate authors using "and"',
      year: 'Year',
      citekey: 'Citekey',
      citekeyPlaceholder: 'Auto-generated if empty',
      citekeyHelp: 'Optional unique identifier',
      journal: 'Journal',
      journalPlaceholder: 'Journal of AI Research',
      booktitle: 'Book Title',
      booktitlePlaceholder: 'Conference Name',
      publisher: 'Publisher',
      publisherPlaceholder: 'Springer, IEEE...',
      volume: 'Volume',
      volumePlaceholder: '42',
      number: 'Number',
      numberPlaceholder: '7',
      pages: 'Pages',
      pagesPlaceholder: '123-456',
      url: 'URL',
      urlPlaceholder: 'https://...',
      doi: 'DOI',
      doiPlaceholder: '10.1000/xyz123',
      abstract: 'Abstract',
      abstractPlaceholder: 'Publication abstract...',
      keywords: 'Keywords',
      keywordsPlaceholder: 'AI, machine learning',
      cancel: 'Cancel',
      create: 'Create',
      update: 'Update',
      submitting: 'Submitting...'
    },
    bibtexImport: {
      title: 'Import from BibTeX',
      description: 'Paste BibTeX to populate the form',
      placeholder: 'Paste your BibTeX entry here...',
      parse: 'Parse',
      clear: 'Clear'
    },
    preview: {
      title: 'Preview BibTeX'
    },
    validation: {
      entryTypeRequired: 'Entry type is required',
      titleRequired: 'Title is required',
      authorRequired: 'Author is required',
      yearRequired: 'Year is required',
      yearInvalid: 'Invalid year',
      urlInvalid: 'Invalid URL',
      doiInvalid: 'Invalid DOI'
    },
    errors: {
      submitFailed: 'Failed to submit',
      bibtexParseError: 'BibTeX parsing error'
    },
    entryTypes: {
      article: 'Article',
      book: 'Book',
      booklet: 'Booklet',
      conference: 'Conference',
      inbook: 'In Book',
      incollection: 'In Collection',
      inproceedings: 'In Proceedings',
      manual: 'Manual',
      mastersthesis: 'Master Thesis',
      misc: 'Misc',
      phdthesis: 'PhD Thesis',
      proceedings: 'Proceedings',
      techreport: 'Tech Report',
      unpublished: 'Unpublished',
      online: 'Online',
      presentation: 'Presentation'
    }
  }
}