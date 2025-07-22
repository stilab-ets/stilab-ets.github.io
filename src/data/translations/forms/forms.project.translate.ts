export interface ProjectFormTranslations {
  titleEdit: string
  titleCreate: string
  subtitle: string
  sections: {
    objectives: any
    type: string
    basic: string
    supervision: string
    requirements: string
    timeline: string
    additional: string
  }
  form: {
    type: any
    cosupervisor: any
    abstract: any
    abstractPlaceholder: string | undefined
    projectType: string
    selectProjectType: string
    title: string
    titlePlaceholder: string
    domain: string
    selectDomain: string
    description: string
    descriptionPlaceholder: string
    supervisor: string
    selectSupervisor: string
    coSupervisor: string
    selectCoSupervisor: string
    startDate: string
    endDate: string
    status: string
    selectStatus: string
    difficulty: string
    selectDifficulty: string
    funding: string
    fundingPlaceholder: string
    requirements: string
    requirementsPlaceholder: string
    objectives: string
    objectivesPlaceholder: string
    githubUrl: string
    githubUrlPlaceholder: string
    websiteUrl: string
    websiteUrlPlaceholder: string
    tags: string
    tagsPlaceholder: string
    cancel: string
    create: string
    update: string
    submitting: string
  }
  projectTypes: {
    research: string
    msc: string
    industry: string
    internal: string
  }
  domains: {
    machineLearning: any
    distributedSystems: any
    blockchain: any
    uiUx: any
    dataScience: any
    softwareArchitecture: string
    artificialIntelligence: string
    cybersecurity: string
    devops: string
    cloudComputing: string
    softwareTesting: string
    softwareMaintenance: string
    humanComputerInteraction: string
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
    cancelled: string
  }
  validation: {
    projectTypeRequired: string
    titleRequired: string
    domainRequired: string
    descriptionRequired: string
    supervisorRequired: string
    startDateRequired: string
    endDateAfterStart: string
    statusRequired: string
    urlInvalid: string
  }
  errors: {
    submitFailed: string
  }
}

export const projectFormTranslations: Record<'fr' | 'en', ProjectFormTranslations> = {
  fr: {
    titleEdit: 'Modifier le projet',
    titleCreate: 'Créer un projet',
    subtitle: 'Remplissez le formulaire du projet',
    sections: {
      type: 'Type de projet',
      basic: 'Informations de base',
      supervision: 'Encadrement',
      requirements: 'Exigences',
      timeline: 'Calendrier',
      additional: 'Informations supplémentaires',
      objectives: undefined
    },
    form: {
      projectType: 'Type de projet',
      selectProjectType: 'Sélectionnez un type',
      title: 'Titre',
      titlePlaceholder: 'Entrez le titre du projet',
      domain: 'Domaine',
      selectDomain: 'Sélectionnez un domaine',
      description: 'Description',
      descriptionPlaceholder: 'Décrivez le projet...',
      supervisor: 'Superviseur',
      selectSupervisor: 'Sélectionnez un superviseur',
      coSupervisor: 'Co-superviseur',
      selectCoSupervisor: 'Sélectionnez un co-superviseur (optionnel)',
      startDate: 'Date de début',
      endDate: 'Date de fin',
      status: 'Statut',
      selectStatus: 'Sélectionnez un statut',
      difficulty: 'Difficulté',
      selectDifficulty: 'Sélectionnez la difficulté',
      funding: 'Financement',
      fundingPlaceholder: 'Source et montant du financement',
      requirements: 'Exigences',
      requirementsPlaceholder: 'Ajoutez une exigence',
      objectives: 'Objectifs',
      objectivesPlaceholder: 'Ajoutez un objectif',
      githubUrl: 'GitHub',
      githubUrlPlaceholder: 'https://github.com/user/repo',
      websiteUrl: 'Site web',
      websiteUrlPlaceholder: 'https://project-website.com',
      tags: 'Mots-clés',
      tagsPlaceholder: 'Appuyez sur Entrée pour ajouter',
      cancel: 'Annuler',
      create: 'Créer',
      update: 'Mettre à jour',
      submitting: 'En cours...',
      abstract: undefined,
      abstractPlaceholder: undefined,
      type: undefined,
      cosupervisor: undefined
    },
    projectTypes: {
      research: 'Projet de recherche',
      msc: 'Projet de Master',
      industry: 'Projet industriel',
      internal: 'Projet interne'
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
      machineLearning: undefined,
      distributedSystems: undefined,
      blockchain: undefined,
      uiUx: undefined,
      dataScience: undefined
    },
    difficulties: {
      beginner: 'Débutant',
      intermediate: 'Intermédiaire',
      advanced: 'Avancé'
    },
    statuses: {
      planned: 'Planifié',
      active: 'Actif',
      completed: 'Terminé',
      cancelled: 'Annulé'
    },
    validation: {
      projectTypeRequired: 'Le type de projet est requis',
      titleRequired: 'Le titre est requis',
      domainRequired: 'Le domaine est requis',
      descriptionRequired: 'La description est requise',
      supervisorRequired: 'Le superviseur est requis',
      startDateRequired: 'La date de début est requise',
      endDateAfterStart: 'La date de fin doit être après le début',
      statusRequired: 'Le statut est requis',
      urlInvalid: 'URL invalide'
    },
    errors: {
      submitFailed: 'Échec de la soumission du formulaire'
    }
  },
  en: {
    titleEdit: 'Edit Project',
    titleCreate: 'Create Project',
    subtitle: 'Fill out the project form',
    sections: {
      type: 'Project Type',
      basic: 'Basic Information',
      supervision: 'Supervision',
      requirements: 'Requirements',
      timeline: 'Timeline',
      additional: 'Additional Information',
      objectives: undefined
    },
    form: {
      projectType: 'Project Type',
      selectProjectType: 'Select a type',
      title: 'Title',
      titlePlaceholder: 'Enter project title',
      domain: 'Domain',
      selectDomain: 'Select a domain',
      description: 'Description',
      descriptionPlaceholder: 'Describe the project...',
      supervisor: 'Supervisor',
      selectSupervisor: 'Select a supervisor',
      coSupervisor: 'Co-supervisor',
      selectCoSupervisor: 'Select a co-supervisor (optional)',
      startDate: 'Start Date',
      endDate: 'End Date',
      status: 'Status',
      selectStatus: 'Select a status',
      difficulty: 'Difficulty',
      selectDifficulty: 'Select difficulty',
      funding: 'Funding',
      fundingPlaceholder: 'Funding source and amount',
      requirements: 'Requirements',
      requirementsPlaceholder: 'Add a requirement',
      objectives: 'Objectives',
      objectivesPlaceholder: 'Add an objective',
      githubUrl: 'GitHub',
      githubUrlPlaceholder: 'https://github.com/user/repo',
      websiteUrl: 'Website',
      websiteUrlPlaceholder: 'https://project-website.com',
      tags: 'Tags',
      tagsPlaceholder: 'Press Enter to add',
      cancel: 'Cancel',
      create: 'Create',
      update: 'Update',
      submitting: 'Submitting...',
      abstract: undefined,
      abstractPlaceholder: undefined,
      type: undefined,
      cosupervisor: undefined
    },
    projectTypes: {
      research: 'Research Project',
      msc: 'Master Project',
      industry: 'Industry Project',
      internal: 'Internal Project'
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
      machineLearning: undefined,
      distributedSystems: undefined,
      blockchain: undefined,
      uiUx: undefined,
      dataScience: undefined
    },
    difficulties: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced'
    },
    statuses: {
      planned: 'Planned',
      active: 'Active',
      completed: 'Completed',
      cancelled: 'Cancelled'
    },
    validation: {
      projectTypeRequired: 'Project type is required',
      titleRequired: 'Title is required',
      domainRequired: 'Domain is required',
      descriptionRequired: 'Description is required',
      supervisorRequired: 'Supervisor is required',
      startDateRequired: 'Start date is required',
      endDateAfterStart: 'End date must be after start date',
      statusRequired: 'Status is required',
      urlInvalid: 'Invalid URL'
    },
    errors: {
      submitFailed: 'Failed to submit the form'
    }
  }
} as const