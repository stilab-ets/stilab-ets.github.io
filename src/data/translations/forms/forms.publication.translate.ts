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
    yearInvalid: string
  }
  errors: {
    submitFailed: string
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

export const publicationFormTranslations: Record<'en' | 'fr', PublicationFormTranslations> = {
  en: {
    titleCreate: 'Create Publication',
    titleEdit: 'Edit Publication',
    subtitle: 'Fill in the details below.',
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
      cancel: 'Cancel',
      create: 'Create',
      update: 'Update',
      submitting: 'Submitting...'
    },
    bibtexImport: {
      title: 'Import from BibTeX',
      description: 'Paste BibTeX to populate the form.',
      placeholder: 'Paste your BibTeX entry here...',
      parse: 'Parse',
      clear: 'Clear'
    },
    preview: {
      title: 'Preview BibTeX'
    },
    validation: {
      entryTypeRequired: 'Entry type is required.',
      titleRequired: 'Title is required.',
      authorRequired: 'Author is required.',
      yearInvalid: 'Invalid year.'
    },
    errors: {
      submitFailed: 'Failed to submit.'
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
  },
  fr: {
    titleCreate: 'Créer une Publication',
    titleEdit: 'Modifier la Publication',
    subtitle: 'Remplissez les détails ci-dessous.',
    form: {
      entryType: 'Type d\'Entrée',
      selectEntryType: 'Sélectionner le type',
      title: 'Titre',
      titlePlaceholder: 'Titre de la Publication',
      authors: 'Auteurs',
      authorsPlaceholder: 'Nom, Prénom et Nom, Prénom',
      authorsHelp: 'Séparez les auteurs avec "and"',
      year: 'Année',
      citekey: 'Clé de Citation',
      citekeyPlaceholder: 'Auto-généré si vide',
      citekeyHelp: 'Identifiant unique optionnel',
      journal: 'Journal',
      journalPlaceholder: 'Journal de Recherche IA',
      booktitle: 'Titre du Livre',
      booktitlePlaceholder: 'Nom de la Conférence',
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
      cancel: 'Annuler',
      create: 'Créer',
      update: 'Mettre à jour',
      submitting: 'Envoi en cours...'
    },
    bibtexImport: {
      title: 'Importer depuis BibTeX',
      description: 'Collez le BibTeX pour remplir le formulaire.',
      placeholder: 'Collez votre entrée BibTeX ici...',
      parse: 'Analyser',
      clear: 'Effacer'
    },
    preview: {
      title: 'Aperçu BibTeX'
    },
    validation: {
      entryTypeRequired: 'Le type d\'entrée est requis.',
      titleRequired: 'Le titre est requis.',
      authorRequired: 'L\'auteur est requis.',
      yearInvalid: 'Année invalide.'
    },
    errors: {
      submitFailed: 'Échec de l\'envoi.'
    },
    entryTypes: {
      article: 'Article',
      book: 'Livre',
      booklet: 'Livret',
      conference: 'Conférence',
      inbook: 'Dans un Livre',
      incollection: 'Dans une Collection',
      inproceedings: 'Dans les Actes',
      manual: 'Manuel',
      mastersthesis: 'Mémoire de Master',
      misc: 'Divers',
      phdthesis: 'Thèse de Doctorat',
      proceedings: 'Actes',
      techreport: 'Rapport Technique',
      unpublished: 'Non Publié',
      online: 'En Ligne',
      presentation: 'Présentation'
    }
  }
}