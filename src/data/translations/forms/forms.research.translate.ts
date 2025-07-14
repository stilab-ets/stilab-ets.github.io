export interface ResearchFormTranslations {
  titleEdit: string
  titleCreate: string
  subtitle: string
  sections: {
    description: any
    timeline: any
    basic: string
    details: string
    team: string
    resources: string
    outcomes: string
  }
  form: {
    leader: any
    selectLeader: any
    funding: any
    fundingPlaceholder: string | undefined
    githubUrl: any
    websiteUrl: any
    title: string
    titlePlaceholder: string
    domain: string
    selectDomain: string
    description: string
    descriptionPlaceholder: string
    objectives: string
    objectivesPlaceholder: string
    methodology: string
    methodologyPlaceholder: string
    expectedResults: string
    expectedResultsPlaceholder: string
    leadResearcher: string
    selectLeadResearcher: string
    participants: string
    selectParticipants: string
    collaborators: string
    collaboratorsPlaceholder: string
    startDate: string
    endDate: string
    budget: string
    budgetPlaceholder: string
    fundingSource: string
    fundingSourcePlaceholder: string
    equipment: string
    equipmentPlaceholder: string
    publications: string
    patents: string
    software: string
    datasets: string
    status: string
    selectStatus: string
    priority: string
    selectPriority: string
    keywords: string
    keywordsPlaceholder: string
    cancel: string
    create: string
    update: string
    submitting: string
  }
  domains: {
    distributedSystems: any
    blockchain: any
    softwareArchitecture: string
    artificialIntelligence: string
    cybersecurity: string
    devops: string
    cloudComputing: string
    softwareTesting: string
    softwareMaintenance: string
    humanComputerInteraction: string
  }
  statuses: {
    planned: any
    proposal: string
    approved: string
    active: string
    completed: string
    suspended: string
    cancelled: string
  }
  priorities: {
    low: string
    medium: string
    high: string
    critical: string
  }
  validation: {
    leaderRequired: string
    titleRequired: string
    domainRequired: string
    descriptionRequired: string
    objectivesRequired: string
    leadResearcherRequired: string
    startDateRequired: string
    endDateAfterStart: string
    budgetInvalid: string
    statusRequired: string
  }
  errors: {
    submitFailed: string
  }
}

export const researchFormTranslations: Record<'fr' | 'en', ResearchFormTranslations> = {
  fr: {
    titleEdit: 'Modifier la recherche',
    titleCreate: 'Créer un projet de recherche',
    subtitle: 'Définissez votre projet de recherche',
    sections: {
      basic: 'Informations de base',
      details: 'Détails de la recherche',
      team: 'Équipe de recherche',
      resources: 'Ressources',
      outcomes: 'Résultats attendus',
      description: undefined,
      timeline: undefined
    },
    form: {
      title: 'Titre',
      titlePlaceholder: 'Titre du projet de recherche',
      domain: 'Domaine',
      selectDomain: 'Sélectionnez un domaine',
      description: 'Description',
      descriptionPlaceholder: 'Description générale du projet...',
      objectives: 'Objectifs',
      objectivesPlaceholder: 'Objectifs principaux de la recherche...',
      methodology: 'Méthodologie',
      methodologyPlaceholder: 'Approche méthodologique...',
      expectedResults: 'Résultats attendus',
      expectedResultsPlaceholder: 'Résultats et impact prévus...',
      leadResearcher: 'Chercheur principal',
      selectLeadResearcher: 'Sélectionnez le chercheur principal',
      participants: 'Participants',
      selectParticipants: 'Sélectionnez les participants',
      collaborators: 'Collaborateurs externes',
      collaboratorsPlaceholder: 'Institutions ou entreprises partenaires',
      startDate: 'Date de début',
      endDate: 'Date de fin',
      budget: 'Budget',
      budgetPlaceholder: 'Budget total en euros',
      fundingSource: 'Source de financement',
      fundingSourcePlaceholder: 'ANR, H2020, industrie...',
      equipment: 'Équipement requis',
      equipmentPlaceholder: 'Matériel et logiciels nécessaires...',
      publications: 'Publications visées',
      patents: 'Brevets prévus',
      software: 'Logiciels à développer',
      datasets: 'Jeux de données',
      status: 'Statut',
      selectStatus: 'Sélectionnez le statut',
      priority: 'Priorité',
      selectPriority: 'Sélectionnez la priorité',
      keywords: 'Mots-clés',
      keywordsPlaceholder: 'Mots-clés de recherche',
      cancel: 'Annuler',
      create: 'Créer',
      update: 'Mettre à jour',
      submitting: 'En cours...',
      leader: undefined,
      selectLeader: undefined,
      funding: undefined,
      fundingPlaceholder: undefined,
      githubUrl: undefined,
      websiteUrl: undefined
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
      distributedSystems: undefined,
      blockchain: undefined
    },
    statuses: {
      proposal: 'Proposition',
      approved: 'Approuvé',
      active: 'Actif',
      completed: 'Terminé',
      suspended: 'Suspendu',
      cancelled: 'Annulé',
      planned: undefined
    },
    priorities: {
      low: 'Faible',
      medium: 'Moyenne',
      high: 'Élevée',
      critical: 'Critique'
    },
    validation: {
      titleRequired: 'Le titre est requis',
      domainRequired: 'Le domaine est requis',
      descriptionRequired: 'La description est requise',
      objectivesRequired: 'Les objectifs sont requis',
      leadResearcherRequired: 'Le chercheur principal est requis',
      startDateRequired: 'La date de début est requise',
      endDateAfterStart: 'La date de fin doit être après le début',
      budgetInvalid: 'Budget invalide',
      statusRequired: 'Le statut est requis',
      leaderRequired: ""
    },
    errors: {
      submitFailed: 'Échec de la soumission'
    }
  },
  en: {
    titleEdit: 'Edit Research',
    titleCreate: 'Create Research Project',
    subtitle: 'Define your research project',
    sections: {
      basic: 'Basic Information',
      details: 'Research Details',
      team: 'Research Team',
      resources: 'Resources',
      outcomes: 'Expected Outcomes',
      description: undefined,
      timeline: undefined
    },
    form: {
      title: 'Title',
      titlePlaceholder: 'Research project title',
      domain: 'Domain',
      selectDomain: 'Select a domain',
      description: 'Description',
      descriptionPlaceholder: 'General project description...',
      objectives: 'Objectives',
      objectivesPlaceholder: 'Main research objectives...',
      methodology: 'Methodology',
      methodologyPlaceholder: 'Methodological approach...',
      expectedResults: 'Expected Results',
      expectedResultsPlaceholder: 'Expected outcomes and impact...',
      leadResearcher: 'Lead Researcher',
      selectLeadResearcher: 'Select lead researcher',
      participants: 'Participants',
      selectParticipants: 'Select participants',
      collaborators: 'External Collaborators',
      collaboratorsPlaceholder: 'Partner institutions or companies',
      startDate: 'Start Date',
      endDate: 'End Date',
      budget: 'Budget',
      budgetPlaceholder: 'Total budget in currency',
      fundingSource: 'Funding Source',
      fundingSourcePlaceholder: 'NSF, EU, industry...',
      equipment: 'Required Equipment',
      equipmentPlaceholder: 'Hardware and software needed...',
      publications: 'Target Publications',
      patents: 'Planned Patents',
      software: 'Software to Develop',
      datasets: 'Datasets',
      status: 'Status',
      selectStatus: 'Select status',
      priority: 'Priority',
      selectPriority: 'Select priority',
      keywords: 'Keywords',
      keywordsPlaceholder: 'Research keywords',
      cancel: 'Cancel',
      create: 'Create',
      update: 'Update',
      submitting: 'Submitting...',
      leader: undefined,
      selectLeader: undefined,
      funding: undefined,
      fundingPlaceholder: undefined,
      githubUrl: undefined,
      websiteUrl: undefined
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
      distributedSystems: undefined,
      blockchain: undefined
    },
    statuses: {
      proposal: 'Proposal',
      approved: 'Approved',
      active: 'Active',
      completed: 'Completed',
      suspended: 'Suspended',
      cancelled: 'Cancelled',
      planned: undefined
    },
    priorities: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      critical: 'Critical'
    },
    validation: {
      titleRequired: 'Title is required',
      domainRequired: 'Domain is required',
      descriptionRequired: 'Description is required',
      objectivesRequired: 'Objectives are required',
      leadResearcherRequired: 'Lead researcher is required',
      startDateRequired: 'Start date is required',
      endDateAfterStart: 'End date must be after start date',
      budgetInvalid: 'Invalid budget',
      statusRequired: 'Status is required',
      leaderRequired: ""
    },
    errors: {
      submitFailed: 'Failed to submit'
    }
  }
} as const