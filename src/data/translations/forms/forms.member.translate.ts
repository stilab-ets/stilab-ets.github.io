export interface MemberFormTranslations {
  titleEdit: string
  titleCreate: string
  subtitle: string
  sections: {
    [x: string]: any
    personal: string
    professional: string
    contact: string
    links: string
    research: string
  }
  form: {
    profilePhoto: any
    department: any
    departmentPlaceholder: string | undefined
    firstName: string
    firstNamePlaceholder: string
    lastName: string
    lastNamePlaceholder: string
    title: string
    titlePlaceholder: string
    email: string
    emailPlaceholder: string
    phone: string
    phonePlaceholder: string
    office: string
    officePlaceholder: string
    role: string
    selectRole: string
    status: string
    selectStatus: string
    researchDomains: string
    researchDomainsPlaceholder: string
    biography: string
    biographyPlaceholder: string
    githubUrl: string
    githubUrlPlaceholder: string
    linkedinUrl: string
    linkedinUrlPlaceholder: string
    personalWebsite: string
    personalWebsitePlaceholder: string
    orcidId: string
    orcidIdPlaceholder: string
    photo: string
    uploadPhoto: string
    removePhoto: string
    joinDate: string
    leaveDate: string
    cancel: string
    create: string
    update: string
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
    visiting: string
  }
  statuses: {
    active: string
    alumni: string
    visitor: string
  }
  validation: {
    titleRequired: string
    firstNameRequired: string
    lastNameRequired: string
    emailRequired: string
    emailInvalid: string
    phoneInvalid: string
    roleRequired: string
    statusRequired: string
    urlInvalid: string
    orcidInvalid: string
    joinDateRequired: string
    leaveDateAfterJoin: string
  }
  errors: {
    submitFailed: string
    photoUploadFailed: string
  }
}

export const memberFormTranslations: Record<'fr' | 'en', MemberFormTranslations> = {
  fr: {
    titleEdit: 'Modifier le membre',
    titleCreate: 'Ajouter un membre',
    subtitle: 'Gérez les informations du membre de l\'équipe',
    sections: {
      personal: 'Informations personnelles',
      professional: 'Informations professionnelles',
      contact: 'Contact',
      links: 'Liens externes',
      research: 'Recherche'
    },
    form: {
      firstName: 'Prénom',
      firstNamePlaceholder: 'Entrez le prénom',
      lastName: 'Nom',
      lastNamePlaceholder: 'Entrez le nom',
      title: 'Titre académique',
      titlePlaceholder: 'Dr., Prof., etc.',
      email: 'Email',
      emailPlaceholder: 'nom@univ.fr',
      phone: 'Téléphone',
      phonePlaceholder: '+33 1 23 45 67 89',
      office: 'Bureau',
      officePlaceholder: 'Bâtiment A, Salle 123',
      role: 'Rôle',
      selectRole: 'Sélectionnez un rôle',
      status: 'Statut',
      selectStatus: 'Sélectionnez un statut',
      researchDomains: 'Domaines de recherche',
      researchDomainsPlaceholder: 'IA, Génie logiciel, etc.',
      biography: 'Biographie',
      biographyPlaceholder: 'Décrivez le parcours et les intérêts de recherche...',
      githubUrl: 'GitHub',
      githubUrlPlaceholder: 'https://github.com/username',
      linkedinUrl: 'LinkedIn',
      linkedinUrlPlaceholder: 'https://linkedin.com/in/username',
      personalWebsite: 'Site web personnel',
      personalWebsitePlaceholder: 'https://website.com',
      orcidId: 'ORCID iD',
      orcidIdPlaceholder: '0000-0000-0000-0000',
      photo: 'Photo',
      uploadPhoto: 'Télécharger une photo',
      removePhoto: 'Supprimer la photo',
      joinDate: 'Date d\'arrivée',
      leaveDate: 'Date de départ',
      cancel: 'Annuler',
      create: 'Créer',
      update: 'Mettre à jour',
      submitting: 'En cours...',
      profilePhoto: undefined,
      department: undefined,
      departmentPlaceholder: undefined
    },
    roles: {
      professor: 'Professeur',
      researcher: 'Chercheur',
      postdoc: 'Post-doctorant',
      phd: 'Doctorant',
      master: 'Étudiant Master',
      engineer: 'Ingénieur de recherche',
      admin: 'Administrateur',
      visiting: 'Chercheur invité'
    },
    statuses: {
      active: 'Actif',
      alumni: 'Alumni',
      visitor: 'Visiteur'
    },
    validation: {
      firstNameRequired: 'Le prénom est requis',
      lastNameRequired: 'Le nom est requis',
      emailRequired: 'L\'email est requis',
      emailInvalid: 'Format d\'email invalide',
      phoneInvalid: 'Format de téléphone invalide',
      roleRequired: 'Le rôle est requis',
      statusRequired: 'Le statut est requis',
      urlInvalid: 'URL invalide',
      orcidInvalid: 'Format ORCID invalide',
      joinDateRequired: 'La date d\'arrivée est requise',
      leaveDateAfterJoin: 'La date de départ doit être après l\'arrivée',
      titleRequired: ""
    },
    errors: {
      submitFailed: 'Échec de la soumission',
      photoUploadFailed: 'Échec du téléchargement de la photo'
    }
  },
  en: {
    titleEdit: 'Edit Member',
    titleCreate: 'Add Member',
    subtitle: 'Manage team member information',
    sections: {
      personal: 'Personal Information',
      professional: 'Professional Information',
      contact: 'Contact',
      links: 'External Links',
      research: 'Research'
    },
    form: {
      firstName: 'First Name',
      firstNamePlaceholder: 'Enter first name',
      lastName: 'Last Name',
      lastNamePlaceholder: 'Enter last name',
      title: 'Academic Title',
      titlePlaceholder: 'Dr., Prof., etc.',
      email: 'Email',
      emailPlaceholder: 'name@univ.edu',
      phone: 'Phone',
      phonePlaceholder: '+1 234 567 8900',
      office: 'Office',
      officePlaceholder: 'Building A, Room 123',
      role: 'Role',
      selectRole: 'Select a role',
      status: 'Status',
      selectStatus: 'Select a status',
      researchDomains: 'Research Domains',
      researchDomainsPlaceholder: 'AI, Software Engineering, etc.',
      biography: 'Biography',
      biographyPlaceholder: 'Describe background and research interests...',
      githubUrl: 'GitHub',
      githubUrlPlaceholder: 'https://github.com/username',
      linkedinUrl: 'LinkedIn',
      linkedinUrlPlaceholder: 'https://linkedin.com/in/username',
      personalWebsite: 'Personal Website',
      personalWebsitePlaceholder: 'https://website.com',
      orcidId: 'ORCID iD',
      orcidIdPlaceholder: '0000-0000-0000-0000',
      photo: 'Photo',
      uploadPhoto: 'Upload Photo',
      removePhoto: 'Remove Photo',
      joinDate: 'Join Date',
      leaveDate: 'Leave Date',
      cancel: 'Cancel',
      create: 'Create',
      update: 'Update',
      submitting: 'Submitting...',
      profilePhoto: undefined,
      department: undefined,
      departmentPlaceholder: undefined
    },
    roles: {
      professor: 'Professor',
      researcher: 'Researcher',
      postdoc: 'Post-doctoral Researcher',
      phd: 'PhD Student',
      master: 'Master Student',
      engineer: 'Research Engineer',
      admin: 'Administrator',
      visiting: 'Visiting Researcher'
    },
    statuses: {
      active: 'Active',
      alumni: 'Alumni',
      visitor: 'Visitor'
    },
    validation: {
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Invalid email format',
      phoneInvalid: 'Invalid phone format',
      roleRequired: 'Role is required',
      statusRequired: 'Status is required',
      urlInvalid: 'Invalid URL',
      orcidInvalid: 'Invalid ORCID format',
      joinDateRequired: 'Join date is required',
      leaveDateAfterJoin: 'Leave date must be after join date',
      titleRequired: ""
    },
    errors: {
      submitFailed: 'Failed to submit',
      photoUploadFailed: 'Failed to upload photo'
    }
  }
} as const