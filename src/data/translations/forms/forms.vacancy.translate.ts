export interface VacancyFormTranslations {
  titleEdit: string
  titleCreate: string
  subtitle: string
  sections: {
    basic: string
    details: string
    requirements: string
    conditions: string
    application: string
    timeline: string
    compensation: string
  }
  form: {
    title: string
    titlePlaceholder: string
    type: string
    selectType: string
    description: string
    descriptionPlaceholder: string
    responsibilities: string
    responsibilitiesPlaceholder: string
    requirements: string
    requirementsPlaceholder: string
    qualifications: string
    qualificationsPlaceholder: string
    supervisor: string
    selectSupervisor: string
    team: string
    selectTeam: string
    domain: string
    selectDomain: string
    location: string
    locationPlaceholder: string
    startDate: string
    duration: string
    durationPlaceholder: string
    workingHours: string
    workingHoursPlaceholder: string
    salary: string
    salaryPlaceholder: string
    benefits: string
    benefitsPlaceholder: string
    applicationDeadline: string
    applicationMethod: string
    selectApplicationMethod: string
    applyUrl: string
    applyUrlPlaceholder: string
    contactEmail: string
    contactEmailPlaceholder: string
    contactPhone: string
    contactPhonePlaceholder: string
    requiredDocuments: string
    requiredDocumentsPlaceholder: string
    status: string
    selectStatus: string
    priority: string
    selectPriority: string
    tags: string
    tagsPlaceholder: string
    internalNotes: string
    internalNotesPlaceholder: string
    published: string
    featured: string
    deadline: string
    cancel: string
    create: string
    update: string
    submitting: string
  }
  types: {
    phd: string
    postdoc: string
    researcher: string
    engineer: string
    intern: string
    visiting: string
    technician: string
    admin: string
  }
  positionTypes: {
    phd: string
    postdoc: string
    researcher: string
    engineer: string
    intern: string
    visiting: string
    technician: string
    admin: string
  }
  domains: {
    softwareArchitecture: string
    artificialIntelligence: string
    cybersecurity: string
    devops: string
    cloudComputing: string
    softwareTesting: string
    softwareMaintenance: string
    humanComputerInteraction: string
    distributedSystems: string
    blockchain: string
  }
  applicationMethods: {
    online: string
    email: string
    portal: string
    inPerson: string
  }
  statuses: {
    draft: string
    published: string
    active: string
    closed: string
    filled: string
    cancelled: string
  }
  priorities: {
    low: string
    medium: string
    high: string
    urgent: string
  }
  validation: {
    titleRequired: string
    typeRequired: string
    descriptionRequired: string
    requirementsRequired: string
    supervisorRequired: string
    domainRequired: string
    locationRequired: string
    startDateRequired: string
    durationRequired: string
    deadlineRequired: string
    deadlineAfterToday: string
    applicationMethodRequired: string
    applyUrlRequired: string
    applyUrlInvalid: string
    contactEmailRequired: string
    emailInvalid: string
    urlInvalid: string
    phoneInvalid: string
    statusRequired: string
  }
  errors: {
    submitFailed: string
  }
}

export const vacancyFormTranslations: Record<'fr' | 'en', VacancyFormTranslations> = {
  fr: {
    titleEdit: 'Modifier l\'offre',
    titleCreate: 'Créer une offre d\'emploi',
    subtitle: 'Définissez les détails de l\'offre d\'emploi',
    sections: {
      basic: 'Informations de base',
      details: 'Détails du poste',
      requirements: 'Exigences',
      conditions: 'Conditions',
      application: 'Candidature',
      timeline: 'Planning',
      compensation: 'Rémunération'
    },
    form: {
      title: 'Titre du poste',
      titlePlaceholder: 'Intitulé de l\'offre d\'emploi',
      type: 'Type de poste',
      selectType: 'Sélectionnez le type',
      description: 'Description',
      descriptionPlaceholder: 'Description générale du poste...',
      responsibilities: 'Responsabilités',
      responsibilitiesPlaceholder: 'Principales responsabilités...',
      requirements: 'Exigences',
      requirementsPlaceholder: 'Compétences et qualifications requises...',
      qualifications: 'Qualifications',
      qualificationsPlaceholder: 'Diplômes et certifications...',
      supervisor: 'Superviseur',
      selectSupervisor: 'Sélectionnez le superviseur',
      team: 'Équipe',
      selectTeam: 'Sélectionnez l\'équipe',
      domain: 'Domaine',
      selectDomain: 'Sélectionnez le domaine',
      location: 'Lieu',
      locationPlaceholder: 'Lieu de travail',
      startDate: 'Date de début',
      duration: 'Durée',
      durationPlaceholder: '6 mois, 2 ans, CDI...',
      workingHours: 'Horaires',
      workingHoursPlaceholder: 'Temps plein, mi-temps...',
      salary: 'Salaire',
      salaryPlaceholder: 'Rémunération proposée',
      benefits: 'Avantages',
      benefitsPlaceholder: 'Avantages sociaux, formations...',
      applicationDeadline: 'Date limite de candidature',
      applicationMethod: 'Méthode de candidature',
      selectApplicationMethod: 'Comment postuler',
      applyUrl: 'URL de candidature',
      applyUrlPlaceholder: 'https://candidature.univ.fr',
      contactEmail: 'Email de contact',
      contactEmailPlaceholder: 'contact@laboratoire.fr',
      contactPhone: 'Téléphone de contact',
      contactPhonePlaceholder: '+33 1 23 45 67 89',
      requiredDocuments: 'Documents requis',
      requiredDocumentsPlaceholder: 'CV, lettre de motivation, références...',
      status: 'Statut',
      selectStatus: 'Sélectionnez le statut',
      priority: 'Priorité',
      selectPriority: 'Sélectionnez la priorité',
      tags: 'Mots-clés',
      tagsPlaceholder: 'Mots-clés pour la recherche',
      internalNotes: 'Notes internes',
      internalNotesPlaceholder: 'Notes pour l\'équipe RH...',
      published: 'Publié',
      featured: 'Mise en avant',
      deadline: 'Date limite',
      cancel: 'Annuler',
      create: 'Créer',
      update: 'Mettre à jour',
      submitting: 'En cours...'
    },
    types: {
      phd: 'Doctorat',
      postdoc: 'Post-doctorat',
      researcher: 'Chercheur',
      engineer: 'Ingénieur',
      intern: 'Stage',
      visiting: 'Chercheur invité',
      technician: 'Technicien',
      admin: 'Administratif'
    },
    positionTypes: {
      phd: 'Doctorat',
      postdoc: 'Post-doctorat',
      researcher: 'Chercheur',
      engineer: 'Ingénieur',
      intern: 'Stage',
      visiting: 'Chercheur invité',
      technician: 'Technicien',
      admin: 'Administratif'
    },
    domains: {
      softwareArchitecture: 'Architecture logicielle',
      artificialIntelligence: 'Intelligence artificielle',
      cybersecurity: 'Cybersécurité',
      devops: 'DevOps',
      cloudComputing: 'Cloud computing',
      softwareTesting: 'Tests logiciels',
      softwareMaintenance: 'Maintenance logicielle',
      humanComputerInteraction: 'Interaction homme-machine',
      distributedSystems: 'Systèmes distribués',
      blockchain: 'Blockchain'
    },
    applicationMethods: {
      online: 'Candidature en ligne',
      email: 'Par email',
      portal: 'Portail de recrutement',
      inPerson: 'En personne'
    },
    statuses: {
      draft: 'Brouillon',
      published: 'Publié',
      active: 'Actif',
      closed: 'Fermé',
      filled: 'Pourvu',
      cancelled: 'Annulé'
    },
    priorities: {
      low: 'Faible',
      medium: 'Moyenne',
      high: 'Élevée',
      urgent: 'Urgente'
    },
    validation: {
      titleRequired: 'Le titre est requis',
      typeRequired: 'Le type de poste est requis',
      descriptionRequired: 'La description est requise',
      requirementsRequired: 'Les exigences sont requises',
      supervisorRequired: 'Le superviseur est requis',
      domainRequired: 'Le domaine est requis',
      locationRequired: 'Le lieu est requis',
      startDateRequired: 'La date de début est requise',
      durationRequired: 'La durée est requise',
      deadlineRequired: 'La date limite est requise',
      deadlineAfterToday: 'La date limite doit être future',
      applicationMethodRequired: 'La méthode de candidature est requise',
      applyUrlRequired: 'L\'URL de candidature est requise',
      applyUrlInvalid: 'URL de candidature invalide',
      contactEmailRequired: 'L\'email de contact est requis',
      emailInvalid: 'Format d\'email invalide',
      urlInvalid: 'URL invalide',
      phoneInvalid: 'Format de téléphone invalide',
      statusRequired: 'Le statut est requis'
    },
    errors: {
      submitFailed: 'Échec de la soumission'
    }
  },
  en: {
    titleEdit: 'Edit Job Offer',
    titleCreate: 'Create Job Offer',
    subtitle: 'Define job offer details',
    sections: {
      basic: 'Basic Information',
      details: 'Position Details',
      requirements: 'Requirements',
      conditions: 'Conditions',
      application: 'Application',
      timeline: 'Timeline',
      compensation: 'Compensation'
    },
    form: {
      title: 'Position Title',
      titlePlaceholder: 'Job offer title',
      type: 'Position Type',
      selectType: 'Select type',
      description: 'Description',
      descriptionPlaceholder: 'General position description...',
      responsibilities: 'Responsibilities',
      responsibilitiesPlaceholder: 'Main responsibilities...',
      requirements: 'Requirements',
      requirementsPlaceholder: 'Required skills and qualifications...',
      qualifications: 'Qualifications',
      qualificationsPlaceholder: 'Degrees and certifications...',
      supervisor: 'Supervisor',
      selectSupervisor: 'Select supervisor',
      team: 'Team',
      selectTeam: 'Select team',
      domain: 'Domain',
      selectDomain: 'Select domain',
      location: 'Location',
      locationPlaceholder: 'Work location',
      startDate: 'Start Date',
      duration: 'Duration',
      durationPlaceholder: '6 months, 2 years, permanent...',
      workingHours: 'Working Hours',
      workingHoursPlaceholder: 'Full-time, part-time...',
      salary: 'Salary',
      salaryPlaceholder: 'Offered compensation',
      benefits: 'Benefits',
      benefitsPlaceholder: 'Benefits, training...',
      applicationDeadline: 'Application Deadline',
      applicationMethod: 'Application Method',
      selectApplicationMethod: 'How to apply',
      applyUrl: 'Application URL',
      applyUrlPlaceholder: 'https://apply.univ.edu',
      contactEmail: 'Contact Email',
      contactEmailPlaceholder: 'contact@lab.edu',
      contactPhone: 'Contact Phone',
      contactPhonePlaceholder: '+1 234 567 8900',
      requiredDocuments: 'Required Documents',
      requiredDocumentsPlaceholder: 'CV, cover letter, references...',
      status: 'Status',
      selectStatus: 'Select status',
      priority: 'Priority',
      selectPriority: 'Select priority',
      tags: 'Keywords',
      tagsPlaceholder: 'Keywords for search',
      internalNotes: 'Internal Notes',
      internalNotesPlaceholder: 'Notes for HR team...',
      published: 'Published',
      featured: 'Featured',
      deadline: 'Deadline',
      cancel: 'Cancel',
      create: 'Create',
      update: 'Update',
      submitting: 'Submitting...'
    },
    types: {
      phd: 'PhD',
      postdoc: 'Post-doc',
      researcher: 'Researcher',
      engineer: 'Engineer',
      intern: 'Internship',
      visiting: 'Visiting Researcher',
      technician: 'Technician',
      admin: 'Administrative'
    },
    positionTypes: {
      phd: 'PhD',
      postdoc: 'Post-doc',
      researcher: 'Researcher',
      engineer: 'Engineer',
      intern: 'Internship',
      visiting: 'Visiting Researcher',
      technician: 'Technician',
      admin: 'Administrative'
    },
    domains: {
      softwareArchitecture: 'Software Architecture',
      artificialIntelligence: 'Artificial Intelligence',
      cybersecurity: 'Cybersecurity',
      devops: 'DevOps',
      cloudComputing: 'Cloud Computing',
      softwareTesting: 'Software Testing',
      softwareMaintenance: 'Software Maintenance',
      humanComputerInteraction: 'Human-Computer Interaction',
      distributedSystems: 'Distributed Systems',
      blockchain: 'Blockchain'
    },
    applicationMethods: {
      online: 'Online Application',
      email: 'By Email',
      portal: 'Recruitment Portal',
      inPerson: 'In Person'
    },
    statuses: {
      draft: 'Draft',
      published: 'Published',
      active: 'Active',
      closed: 'Closed',
      filled: 'Filled',
      cancelled: 'Cancelled'
    },
    priorities: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      urgent: 'Urgent'
    },
    validation: {
      titleRequired: 'Title is required',
      typeRequired: 'Position type is required',
      descriptionRequired: 'Description is required',
      requirementsRequired: 'Requirements are required',
      supervisorRequired: 'Supervisor is required',
      domainRequired: 'Domain is required',
      locationRequired: 'Location is required',
      startDateRequired: 'Start date is required',
      durationRequired: 'Duration is required',
      deadlineRequired: 'Deadline is required',
      deadlineAfterToday: 'Deadline must be in the future',
      applicationMethodRequired: 'Application method is required',
      applyUrlRequired: 'Application URL is required',
      applyUrlInvalid: 'Invalid application URL',
      contactEmailRequired: 'Contact email is required',
      emailInvalid: 'Invalid email format',
      urlInvalid: 'Invalid URL',
      phoneInvalid: 'Invalid phone format',
      statusRequired: 'Status is required'
    },
    errors: {
      submitFailed: 'Failed to submit'
    }
  }
} as const