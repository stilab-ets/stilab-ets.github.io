export interface FormsTranslations {
  publication: {
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
    bibtexImport: {
      title: string
      description: string
      placeholder: string
      parse: string
      clear: string
      parseError: string
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
  }
  event: {
    titleCreate: string
    titleEdit: string
    subtitle: string
    form: {
      title: string
      titlePlaceholder: string
      type: string
      selectType: string
      speaker: string
      speakerPlaceholder: string
      date: string
      time: string
      duration: string
      selectDuration: string
      minutes: string
      hour: string
      hours: string
      fullDay: string
      location: string
      locationPlaceholder: string
      description: string
      descriptionPlaceholder: string
      tags: string
      tagsPlaceholder: string
      tagsHelp: string
      meetingUrl: string
      meetingUrlPlaceholder: string
      recordingUrl: string
      recordingUrlPlaceholder: string
      cancel: string
      create: string
      update: string
      submitting: string
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
    registration: {
      title: string
      required: string
      capacity: string
      capacityPlaceholder: string
      deadline: string
      url: string
      urlPlaceholder: string
      urlHelp: string
    }
    visibility: {
      title: string
      public: string
      internal: string
      private: string
    }
    validation: {
      titleRequired: string
      typeRequired: string
      dateRequired: string
      dateInPast: string
      locationRequired: string
      descriptionRequired: string
      deadlineAfterEvent: string
    }
    errors: {
      submitFailed: string
    }
  }
  project: {
    titleCreate: string
    titleEdit: string
    subtitle: string
    sections: {
      type: string
      basic: string
      supervision: string
      requirements: string
      timeline: string
      additional: string
    }
    projectTypes: {
      research: string
      msc: string
    }
    form: {
      title: string
      titlePlaceholder: string
      domain: string
      selectDomain: string
      difficulty: string
      selectDifficulty: string
      status: string
      description: string
      descriptionPlaceholder: string
      abstract: string
      abstractPlaceholder: string
      supervisor: string
      selectSupervisor: string
      coSupervisor: string
      selectCoSupervisor: string
      requirements: string
      requirementsPlaceholder: string
      objectives: string
      objectivesPlaceholder: string
      startDate: string
      endDate: string
      funding: string
      fundingPlaceholder: string
      githubUrl: string
      websiteUrl: string
      cancel: string
      create: string
      update: string
      submitting: string
    }
    domains: {
      softwareArchitecture: string
      machineLearning: string
      cybersecurity: string
      distributedSystems: string
      devops: string
      blockchain: string
      uiUx: string
      dataScience: string
    }
    difficulties: {
      beginner: string
      intermediate: string
      advanced: string
    }
    statuses: {
      planned: string
      active: string
      completed: string
    }
    validation: {
      titleRequired: string
      domainRequired: string
      descriptionRequired: string
      supervisorRequired: string
      startDateRequired: string
      endDateAfterStart: string
    }
    errors: {
      submitFailed: string
    }
  }
  invitation: {
    title: string
    subtitle: string
    sections: {
      type: string
      singleInvite: string
      bulkInvite: string
      csvUpload: string
      settings: string
    }
    invitationTypes: {
      single: string
      bulk: string
      csv: string
    }
    form: {
      firstName: string
      lastName: string
      email: string
      emailPlaceholder: string
      suggestedRole: string
      selectRole: string
      department: string
      departmentPlaceholder: string
      emailList: string
      emailListPlaceholder: string
      emailListHelp: string
      defaultRole: string
      csvFile: string
      uploadFile: string
      orDragDrop: string
      csvOnly: string
      selectedFile: string
      expirationDays: string
      days7: string
      days14: string
      days30: string
      days60: string
      days90: string
      customMessage: string
      customMessagePlaceholder: string
      customMessageHelp: string
      sendWelcomeEmail: string
      requireApproval: string
      cancel: string
      showPreview: string
      hidePreview: string
      sendInvitations: string
      submitting: string
    }
    roles: {
      professor: string
      researcher: string
      postdoc: string
      phd: string
      master: string
      engineer: string
      admin: string
    }
    csvFormat: {
      title: string
      description: string
      example: string
      downloadTemplate: string
    }
    preview: {
      title: string
      type: string
      recipient: string
      recipients: string
      file: string
      noFile: string
      expiration: string
      days: string
      customMessage: string
    }
    validation: {
      emailRequired: string
      emailInvalid: string
      emailListRequired: string
      emailListInvalid: string
      csvFileRequired: string
      csvFileInvalid: string
    }
    errors: {
      submitFailed: string
    }
  }
}

export const formsTranslations = {
  en: {
    publication: {
      titleCreate: 'Create New Publication',
      titleEdit: 'Edit Publication',
      subtitle: 'Add or edit a research publication in the laboratory database',
      form: {
        entryType: 'Publication Type',
        selectEntryType: 'Select publication type',
        title: 'Title',
        titlePlaceholder: 'Enter the publication title',
        authors: 'Authors',
        authorsPlaceholder: 'Last, First and Last, First',
        authorsHelp: 'Separate multiple authors with " and ". Format: Last, First',
        year: 'Year',
        citekey: 'Citation Key',
        citekeyPlaceholder: 'Auto-generated if empty',
        citekeyHelp: 'Unique identifier for BibTeX citations',
        journal: 'Journal',
        journalPlaceholder: 'Journal name',
        booktitle: 'Book/Conference Title',
        booktitlePlaceholder: 'Conference or book title',
        publisher: 'Publisher',
        publisherPlaceholder: 'Publisher name',
        volume: 'Volume',
        volumePlaceholder: 'e.g., 15',
        number: 'Number/Issue',
        numberPlaceholder: 'e.g., 3',
        pages: 'Pages',
        pagesPlaceholder: 'e.g., 123-145',
        url: 'URL',
        urlPlaceholder: 'https://doi.org/...',
        cancel: 'Cancel',
        create: 'Create Publication',
        update: 'Update Publication',
        submitting: 'Saving...'
      },
      entryTypes: {
        article: 'Journal Article',
        book: 'Book',
        booklet: 'Booklet',
        conference: 'Conference Paper',
        inbook: 'Book Chapter',
        incollection: 'Article in Collection',
        inproceedings: 'Conference Proceedings',
        manual: 'Manual',
        mastersthesis: 'Master\'s Thesis',
        misc: 'Miscellaneous',
        phdthesis: 'PhD Thesis',
        proceedings: 'Conference Proceedings',
        techreport: 'Technical Report',
        unpublished: 'Unpublished',
        online: 'Online Resource',
        presentation: 'Presentation'
      },
      bibtexImport: {
        title: 'Import from BibTeX',
        description: 'Paste BibTeX entry below to automatically fill the form',
        placeholder: '@article{key,\n  title={Title},\n  author={Author},\n  journal={Journal},\n  year={2024}\n}',
        parse: 'Parse BibTeX',
        clear: 'Clear Form',
        parseError: 'Error parsing BibTeX. Please check the format.'
      },
      preview: {
        title: 'BibTeX Preview'
      },
      validation: {
        entryTypeRequired: 'Publication type is required',
        titleRequired: 'Title is required',
        authorRequired: 'At least one author is required',
        yearInvalid: 'Please enter a valid year'
      },
      errors: {
        submitFailed: 'Failed to save publication. Please try again.'
      }
    },
    event: {
      titleCreate: 'Create New Event',
      titleEdit: 'Edit Event',
      subtitle: 'Schedule and manage laboratory events, seminars, and meetings',
      form: {
        title: 'Event Title',
        titlePlaceholder: 'Enter event title',
        type: 'Event Type',
        selectType: 'Select event type',
        speaker: 'Speaker/Presenter',
        speakerPlaceholder: 'Speaker name (optional)',
        date: 'Date',
        time: 'Time',
        duration: 'Duration',
        selectDuration: 'Select duration',
        minutes: 'minutes',
        hour: 'hour',
        hours: 'hours',
        fullDay: 'Full day',
        location: 'Location',
        locationPlaceholder: 'Room, building, or online platform',
        description: 'Description',
        descriptionPlaceholder: 'Event description and agenda',
        tags: 'Tags',
        tagsPlaceholder: 'Add a tag',
        tagsHelp: 'Press Enter or comma to add tags',
        meetingUrl: 'Meeting URL',
        meetingUrlPlaceholder: 'Zoom, Teams, or other meeting link',
        recordingUrl: 'Recording URL',
        recordingUrlPlaceholder: 'Link to event recording',
        cancel: 'Cancel',
        create: 'Create Event',
        update: 'Update Event',
        submitting: 'Saving...'
      },
      eventTypes: {
        seminar: 'Seminar',
        workshop: 'Workshop',
        conference: 'Conference',
        defense: 'Thesis Defense',
        meeting: 'Meeting',
        colloquium: 'Colloquium',
        masterclass: 'Masterclass'
      },
      registration: {
        title: 'Registration Settings',
        required: 'Require registration',
        capacity: 'Maximum Capacity',
        capacityPlaceholder: 'Number of participants',
        deadline: 'Registration Deadline',
        url: 'Registration URL',
        urlPlaceholder: 'External registration link',
        urlHelp: 'Leave empty to use internal registration system'
      },
      visibility: {
        title: 'Event Visibility',
        public: 'Public - Visible to everyone',
        internal: 'Internal - Lab members only',
        private: 'Private - Invited participants only'
      },
      validation: {
        titleRequired: 'Event title is required',
        typeRequired: 'Event type is required',
        dateRequired: 'Event date is required',
        dateInPast: 'Event date cannot be in the past',
        locationRequired: 'Location is required',
        descriptionRequired: 'Description is required',
        deadlineAfterEvent: 'Registration deadline must be before event date'
      },
      errors: {
        submitFailed: 'Failed to save event. Please try again.'
      }
    },
    project: {
      titleCreate: 'Create New Project',
      titleEdit: 'Edit Project',
      subtitle: 'Add research projects or MSc thesis proposals',
      sections: {
        type: 'Project Type',
        basic: 'Basic Information',
        supervision: 'Supervision',
        requirements: 'Requirements & Skills',
        timeline: 'Timeline',
        additional: 'Additional Information'
      },
      projectTypes: {
        research: 'Research Project',
        msc: 'MSc Project/Thesis'
      },
      form: {
        title: 'Project Title',
        titlePlaceholder: 'Enter project title',
        domain: 'Research Domain',
        selectDomain: 'Select research domain',
        difficulty: 'Difficulty Level',
        selectDifficulty: 'Select difficulty',
        status: 'Status',
        description: 'Project Description',
        descriptionPlaceholder: 'Detailed project description, goals, and methodology',
        abstract: 'Project Abstract',
        abstractPlaceholder: 'Brief project summary for students',
        supervisor: 'Supervisor',
        selectSupervisor: 'Select supervisor',
        coSupervisor: 'Co-Supervisor',
        selectCoSupervisor: 'Select co-supervisor (optional)',
        requirements: 'Required Skills',
        requirementsPlaceholder: 'e.g., Python, Machine Learning',
        objectives: 'Learning Objectives',
        objectivesPlaceholder: 'e.g., Learn deep learning techniques',
        startDate: 'Start Date',
        endDate: 'End Date',
        funding: 'Funding Source',
        fundingPlaceholder: 'e.g., ANR, H2020, Industry partnership',
        githubUrl: 'GitHub Repository',
        websiteUrl: 'Project Website',
        cancel: 'Cancel',
        create: 'Create Project',
        update: 'Update Project',
        submitting: 'Saving...'
      },
      domains: {
        softwareArchitecture: 'Software Architecture',
        machineLearning: 'Machine Learning',
        cybersecurity: 'Cybersecurity',
        distributedSystems: 'Distributed Systems',
        devops: 'DevOps',
        blockchain: 'Blockchain',
        uiUx: 'UI/UX Design',
        dataScience: 'Data Science'
      },
      difficulties: {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced'
      },
      statuses: {
        planned: 'Planned',
        active: 'Active',
        completed: 'Completed'
      },
      validation: {
        titleRequired: 'Project title is required',
        domainRequired: 'Research domain is required',
        descriptionRequired: 'Project description is required',
        supervisorRequired: 'Supervisor is required',
        startDateRequired: 'Start date is required',
        endDateAfterStart: 'End date must be after start date'
      },
      errors: {
        submitFailed: 'Failed to save project. Please try again.'
      }
    },
    invitation: {
      title: 'Send Invitations',
      subtitle: 'Invite new members to join the laboratory',
      sections: {
        type: 'Invitation Type',
        singleInvite: 'Single Invitation',
        bulkInvite: 'Bulk Invitations',
        csvUpload: 'CSV Upload',
        settings: 'Invitation Settings'
      },
      invitationTypes: {
        single: 'Single Person',
        bulk: 'Multiple Emails',
        csv: 'CSV File Upload'
      },
      form: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email Address',
        emailPlaceholder: 'user@university.edu',
        suggestedRole: 'Suggested Role',
        selectRole: 'Select role',
        department: 'Department',
        departmentPlaceholder: 'e.g., Computer Science',
        emailList: 'Email List',
        emailListPlaceholder: 'Enter one email per line\nuser1@university.edu\nuser2@university.edu',
        emailListHelp: 'Enter one email address per line',
        defaultRole: 'Default Role for All',
        csvFile: 'CSV File',
        uploadFile: 'Upload a file',
        orDragDrop: 'or drag and drop',
        csvOnly: 'CSV files only',
        selectedFile: 'Selected file',
        expirationDays: 'Invitation Expires In',
        days7: '7 days',
        days14: '14 days',
        days30: '30 days',
        days60: '60 days',
        days90: '90 days',
        customMessage: 'Custom Message',
        customMessagePlaceholder: 'Add a personal message to the invitation email...',
        customMessageHelp: 'This message will be included in the invitation email',
        sendWelcomeEmail: 'Send welcome email after registration',
        requireApproval: 'Require admin approval for registration',
        cancel: 'Cancel',
        showPreview: 'Show Preview',
        hidePreview: 'Hide Preview',
        sendInvitations: 'Send Invitations',
        submitting: 'Sending...'
      },
      roles: {
        professor: 'Professor',
        researcher: 'Researcher',
        postdoc: 'Post-Doctoral Researcher',
        phd: 'PhD Student',
        master: 'Master Student',
        engineer: 'Research Engineer',
        admin: 'Administrator'
      },
      csvFormat: {
        title: 'CSV Format Requirements',
        description: 'Your CSV file must include the following columns: email (required), firstName, lastName, role, department',
        example: 'email,firstName,lastName,role,department\nexample@university.edu,John,Doe,phd,Computer Science',
        downloadTemplate: 'Download CSV template'
      },
      preview: {
        title: 'Invitation Preview',
        type: 'Type',
        recipient: 'Recipient',
        recipients: 'Recipients',
        file: 'File',
        noFile: 'No file selected',
        expiration: 'Expires in',
        days: 'days',
        customMessage: 'Custom message'
      },
      validation: {
        emailRequired: 'Email address is required',
        emailInvalid: 'Please enter a valid email address',
        emailListRequired: 'Please enter at least one email address',
        emailListInvalid: 'Some email addresses are invalid',
        csvFileRequired: 'Please select a CSV file',
        csvFileInvalid: 'Please select a valid CSV file'
      },
      errors: {
        submitFailed: 'Failed to send invitations. Please try again.'
      }
    }
  },
  fr: {
    publication: {
      titleCreate: 'Créer une nouvelle publication',
      titleEdit: 'Modifier la publication',
      subtitle: 'Ajouter ou modifier une publication de recherche dans la base de données du laboratoire',
      form: {
        entryType: 'Type de publication',
        selectEntryType: 'Sélectionner le type de publication',
        title: 'Titre',
        titlePlaceholder: 'Entrez le titre de la publication',
        authors: 'Auteurs',
        authorsPlaceholder: 'Nom, Prénom and Nom, Prénom',
        authorsHelp: 'Séparez plusieurs auteurs avec " and ". Format: Nom, Prénom',
        year: 'Année',
        citekey: 'Clé de citation',
        citekeyPlaceholder: 'Auto-généré si vide',
        citekeyHelp: 'Identifiant unique pour les citations BibTeX',
        journal: 'Journal',
        journalPlaceholder: 'Nom du journal',
        booktitle: 'Titre du livre/conférence',
        booktitlePlaceholder: 'Titre de la conférence ou du livre',
        publisher: 'Éditeur',
        publisherPlaceholder: 'Nom de l\'éditeur',
        volume: 'Volume',
        volumePlaceholder: 'ex. 15',
        number: 'Numéro/Issue',
        numberPlaceholder: 'ex. 3',
        pages: 'Pages',
        pagesPlaceholder: 'ex. 123-145',
        url: 'URL',
        urlPlaceholder: 'https://doi.org/...',
        cancel: 'Annuler',
        create: 'Créer la publication',
        update: 'Mettre à jour la publication',
        submitting: 'Enregistrement...'
      },
      entryTypes: {
        article: 'Article de journal',
        book: 'Livre',
        booklet: 'Livret',
        conference: 'Article de conférence',
        inbook: 'Chapitre de livre',
        incollection: 'Article dans une collection',
        inproceedings: 'Actes de conférence',
        manual: 'Manuel',
        mastersthesis: 'Mémoire de Master',
        misc: 'Divers',
        phdthesis: 'Thèse de Doctorat',
        proceedings: 'Actes de conférence',
        techreport: 'Rapport technique',
        unpublished: 'Non publié',
        online: 'Ressource en ligne',
        presentation: 'Présentation'
      },
      bibtexImport: {
        title: 'Importer depuis BibTeX',
        description: 'Collez une entrée BibTeX ci-dessous pour remplir automatiquement le formulaire',
        placeholder: '@article{cle,\n  title={Titre},\n  author={Auteur},\n  journal={Journal},\n  year={2024}\n}',
        parse: 'Analyser BibTeX',
        clear: 'Vider le formulaire',
        parseError: 'Erreur lors de l\'analyse BibTeX. Vérifiez le format.'
      },
      preview: {
        title: 'Aperçu BibTeX'
      },
      validation: {
        entryTypeRequired: 'Le type de publication est requis',
        titleRequired: 'Le titre est requis',
        authorRequired: 'Au moins un auteur est requis',
        yearInvalid: 'Veuillez entrer une année valide'
      },
      errors: {
        submitFailed: 'Échec de l\'enregistrement de la publication. Veuillez réessayer.'
      }
    },
    event: {
      titleCreate: 'Créer un nouvel événement',
      titleEdit: 'Modifier l\'événement',
      subtitle: 'Planifier et gérer les événements, séminaires et réunions du laboratoire',
      form: {
        title: 'Titre de l\'événement',
        titlePlaceholder: 'Entrez le titre de l\'événement',
        type: 'Type d\'événement',
        selectType: 'Sélectionner le type d\'événement',
        speaker: 'Intervenant/Présentateur',
        speakerPlaceholder: 'Nom de l\'intervenant (optionnel)',
        date: 'Date',
        time: 'Heure',
        duration: 'Durée',
        selectDuration: 'Sélectionner la durée',
        minutes: 'minutes',
        hour: 'heure',
        hours: 'heures',
        fullDay: 'Journée complète',
        location: 'Lieu',
        locationPlaceholder: 'Salle, bâtiment ou plateforme en ligne',
        description: 'Description',
        descriptionPlaceholder: 'Description de l\'événement et agenda',
        tags: 'Tags',
        tagsPlaceholder: 'Ajouter un tag',
        tagsHelp: 'Appuyez sur Entrée ou virgule pour ajouter des tags',
        meetingUrl: 'URL de réunion',
        meetingUrlPlaceholder: 'Lien Zoom, Teams ou autre réunion',
        recordingUrl: 'URL d\'enregistrement',
        recordingUrlPlaceholder: 'Lien vers l\'enregistrement de l\'événement',
        cancel: 'Annuler',
        create: 'Créer l\'événement',
        update: 'Mettre à jour l\'événement',
        submitting: 'Enregistrement...'
      },
      eventTypes: {
        seminar: 'Séminaire',
        workshop: 'Workshop',
        conference: 'Conférence',
        defense: 'Soutenance de thèse',
        meeting: 'Réunion',
        colloquium: 'Colloque',
        masterclass: 'Masterclass'
      },
      registration: {
        title: 'Paramètres d\'inscription',
        required: 'Inscription requise',
        capacity: 'Capacité maximale',
        capacityPlaceholder: 'Nombre de participants',
        deadline: 'Date limite d\'inscription',
        url: 'URL d\'inscription',
        urlPlaceholder: 'Lien d\'inscription externe',
        urlHelp: 'Laisser vide pour utiliser le système d\'inscription interne'
      },
      visibility: {
        title: 'Visibilité de l\'événement',
        public: 'Public - Visible par tous',
        internal: 'Interne - Membres du labo uniquement',
        private: 'Privé - Participants invités uniquement'
      },
      validation: {
        titleRequired: 'Le titre de l\'événement est requis',
        typeRequired: 'Le type d\'événement est requis',
        dateRequired: 'La date de l\'événement est requise',
        dateInPast: 'La date de l\'événement ne peut pas être dans le passé',
        locationRequired: 'Le lieu est requis',
        descriptionRequired: 'La description est requise',
        deadlineAfterEvent: 'La date limite d\'inscription doit être avant la date de l\'événement'
      },
      errors: {
        submitFailed: 'Échec de l\'enregistrement de l\'événement. Veuillez réessayer.'
      }
    },
    project: {
      titleCreate: 'Créer un nouveau projet',
      titleEdit: 'Modifier le projet',
      subtitle: 'Ajouter des projets de recherche ou des propositions de mémoire de Master',
      sections: {
        type: 'Type de projet',
        basic: 'Informations de base',
        supervision: 'Encadrement',
        requirements: 'Exigences et compétences',
        timeline: 'Calendrier',
        additional: 'Informations supplémentaires'
      },
      projectTypes: {
        research: 'Projet de recherche',
        msc: 'Projet/Mémoire de Master'
      },
      form: {
        title: 'Titre du projet',
        titlePlaceholder: 'Entrez le titre du projet',
        domain: 'Domaine de recherche',
        selectDomain: 'Sélectionner le domaine de recherche',
        difficulty: 'Niveau de difficulté',
        selectDifficulty: 'Sélectionner la difficulté',
        status: 'Statut',
        description: 'Description du projet',
        descriptionPlaceholder: 'Description détaillée du projet, objectifs et méthodologie',
        abstract: 'Résumé du projet',
        abstractPlaceholder: 'Bref résumé du projet pour les étudiants',
        supervisor: 'Superviseur',
        selectSupervisor: 'Sélectionner le superviseur',
        coSupervisor: 'Co-superviseur',
        selectCoSupervisor: 'Sélectionner le co-superviseur (optionnel)',
        requirements: 'Compétences requises',
        requirementsPlaceholder: 'ex. Python, Apprentissage automatique',
        objectives: 'Objectifs d\'apprentissage',
        objectivesPlaceholder: 'ex. Apprendre les techniques d\'apprentissage profond',
        startDate: 'Date de début',
        endDate: 'Date de fin',
        funding: 'Source de financement',
        fundingPlaceholder: 'ex. ANR, H2020, Partenariat industriel',
        githubUrl: 'Dépôt GitHub',
        websiteUrl: 'Site web du projet',
        cancel: 'Annuler',
        create: 'Créer le projet',
        update: 'Mettre à jour le projet',
        submitting: 'Enregistrement...'
      },
      domains: {
        softwareArchitecture: 'Architecture logicielle',
        machineLearning: 'Apprentissage automatique',
        cybersecurity: 'Cybersécurité',
        distributedSystems: 'Systèmes distribués',
        devops: 'DevOps',
        blockchain: 'Blockchain',
        uiUx: 'Design UI/UX',
        dataScience: 'Science des données'
      },
      difficulties: {
        beginner: 'Débutant',
        intermediate: 'Intermédiaire',
        advanced: 'Avancé'
      },
      statuses: {
        planned: 'Planifié',
        active: 'Actif',
        completed: 'Terminé'
      },
      validation: {
        titleRequired: 'Le titre du projet est requis',
        domainRequired: 'Le domaine de recherche est requis',
        descriptionRequired: 'La description du projet est requise',
        supervisorRequired: 'Le superviseur est requis',
        startDateRequired: 'La date de début est requise',
        endDateAfterStart: 'La date de fin doit être après la date de début'
      },
      errors: {
        submitFailed: 'Échec de l\'enregistrement du projet. Veuillez réessayer.'
      }
    },
    invitation: {
      title: 'Envoyer des invitations',
      subtitle: 'Inviter de nouveaux membres à rejoindre le laboratoire',
      sections: {
        type: 'Type d\'invitation',
        singleInvite: 'Invitation unique',
        bulkInvite: 'Invitations en masse',
        csvUpload: 'Téléchargement CSV',
        settings: 'Paramètres d\'invitation'
      },
      invitationTypes: {
        single: 'Personne unique',
        bulk: 'Plusieurs emails',
        csv: 'Téléchargement de fichier CSV'
      },
      form: {
        firstName: 'Prénom',
        lastName: 'Nom',
        email: 'Adresse email',
        emailPlaceholder: 'utilisateur@universite.fr',
        suggestedRole: 'Rôle suggéré',
        selectRole: 'Sélectionner le rôle',
        department: 'Département',
        departmentPlaceholder: 'ex. Informatique',
        emailList: 'Liste d\'emails',
        emailListPlaceholder: 'Entrez un email par ligne\nutilisateur1@universite.fr\nutilisateur2@universite.fr',
        emailListHelp: 'Entrez une adresse email par ligne',
        defaultRole: 'Rôle par défaut pour tous',
        csvFile: 'Fichier CSV',
        uploadFile: 'Télécharger un fichier',
        orDragDrop: 'ou glisser-déposer',
        csvOnly: 'Fichiers CSV uniquement',
        selectedFile: 'Fichier sélectionné',
        expirationDays: 'L\'invitation expire dans',
        days7: '7 jours',
        days14: '14 jours',
        days30: '30 jours',
        days60: '60 jours',
        days90: '90 jours',
        customMessage: 'Message personnalisé',
        customMessagePlaceholder: 'Ajouter un message personnel à l\'email d\'invitation...',
        customMessageHelp: 'Ce message sera inclus dans l\'email d\'invitation',
        sendWelcomeEmail: 'Envoyer un email de bienvenue après l\'inscription',
        requireApproval: 'Requérir l\'approbation de l\'admin pour l\'inscription',
        cancel: 'Annuler',
        showPreview: 'Afficher l\'aperçu',
        hidePreview: 'Masquer l\'aperçu',
        sendInvitations: 'Envoyer les invitations',
        submitting: 'Envoi...'
      },
      roles: {
        professor: 'Professeur',
        researcher: 'Chercheur',
        postdoc: 'Chercheur Post-Doctoral',
        phd: 'Doctorant',
        master: 'Étudiant Master',
        engineer: 'Ingénieur de Recherche',
        admin: 'Administrateur'
      },
      csvFormat: {
        title: 'Exigences du format CSV',
        description: 'Votre fichier CSV doit inclure les colonnes suivantes : email (requis), firstName, lastName, role, department',
        example: 'email,firstName,lastName,role,department\nexemple@universite.fr,Jean,Dupont,phd,Informatique',
        downloadTemplate: 'Télécharger le modèle CSV'
      },
      preview: {
        title: 'Aperçu de l\'invitation',
        type: 'Type',
        recipient: 'Destinataire',
        recipients: 'Destinataires',
        file: 'Fichier',
        noFile: 'Aucun fichier sélectionné',
        expiration: 'Expire dans',
        days: 'jours',
        customMessage: 'Message personnalisé'
      },
      validation: {
        emailRequired: 'L\'adresse email est requise',
        emailInvalid: 'Veuillez entrer une adresse email valide',
        emailListRequired: 'Veuillez entrer au moins une adresse email',
        emailListInvalid: 'Certaines adresses email sont invalides',
        csvFileRequired: 'Veuillez sélectionner un fichier CSV',
        csvFileInvalid: 'Veuillez sélectionner un fichier CSV valide'
      },
      errors: {
        submitFailed: 'Échec de l\'envoi des invitations. Veuillez réessayer.'
      }
    }
  }
} as const