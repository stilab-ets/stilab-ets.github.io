export interface ProjectsTranslations {
  interest: {
    successMessage: string;
  };
  pageTitle: string;
  pageSubtitle: string;
  infoBox: {
    title: string;
    message: string;
  };
  search: {
    label: string;
    placeholder: string;
  };
  filters: {
    domain: string;
    allDomains: string;
    status: string;
    allStatuses: string;
    available: string;
    assigned: string;
    completed: string;
  };
  projectCard: {
    supervisor: string;
    coSupervisor: string;
    skills: string;
    proposedOn: string;
    contact: string;
    expressInterest: string;
  };
  status: {
    available: string;
    assigned: string;
    completed: string;
  };
  difficulty: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  interestModal: {
    title: string;
    projectLabel: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    studyLevel: string;
    selectLevel: string;
    master1: string;
    master2: string;
    motivation: string;
    motivationPlaceholder: string;
    cancel: string;
    submit: string;
  };
  results: {
    project: string;
    projects: string;
    found: string;
  };
  empty: {
    title: string;
    message: string;
  };
}

type ProjectsTranslationDict = {
  fr: ProjectsTranslations;
  en: ProjectsTranslations;
};

export const projectsTranslations: ProjectsTranslationDict = {
  fr: {
    pageTitle: 'Projets de Master',
    pageSubtitle:
      'Découvrez les sujets de mémoire proposés par notre laboratoire',
    infoBox: {
      title: 'Information pour les étudiants',
      message:
        "Les projets de master sont ouverts aux étudiants en M2. Pour postuler, contactez directement le superviseur du projet qui vous intéresse. N'hésitez pas à nous faire part de vos propres idées de projets !",
    },
    search: {
      label: 'Rechercher un projet',
      placeholder: 'Titre, domaine, superviseur...',
    },
    filters: {
      domain: 'Domaine',
      allDomains: 'Tous les domaines',
      status: 'Statut',
      allStatuses: 'Tous',
      available: 'Disponibles',
      assigned: 'Assignés',
      completed: 'Terminés',
    },
    projectCard: {
      supervisor: 'Superviseur',
      coSupervisor: 'Co-superviseur',
      skills: 'Compétences requises',
      proposedOn: 'Proposé le',
      contact: 'Contacter',
      expressInterest: 'Manifester mon intérêt',
    },
    status: {
      available: 'Disponible',
      assigned: 'Assigné',
      completed: 'Terminé',
    },
    difficulty: {
      beginner: 'Débutant',
      intermediate: 'Intermédiaire',
      advanced: 'Avancé',
    },
    interestModal: {
      title: 'Manifester mon intérêt',
      projectLabel: 'Projet',
      fullName: 'Nom complet',
      fullNamePlaceholder: 'Votre nom complet',
      email: 'Email universitaire',
      emailPlaceholder: 'votre.email@univ.fr',
      studyLevel: "Niveau d'étude",
      selectLevel: 'Sélectionnez votre niveau',
      master1: 'Master 1',
      master2: 'Master 2',
      motivation: 'Motivation',
      motivationPlaceholder:
        'Expliquez pourquoi ce projet vous intéresse et quelles compétences vous pourriez apporter...',
      cancel: 'Annuler',
      submit: 'Envoyer',
    },
    results: {
      project: 'projet',
      projects: 'projets',
      found: 'trouvé',
    },
    empty: {
      title: 'Aucun projet trouvé',
      message: 'Essayez de modifier vos critères de recherche.',
    },
    interest: {
      successMessage: 'Succès',
    },
  },
  en: {
    pageTitle: 'Master Projects',
    pageSubtitle: 'Discover the thesis topics proposed by our laboratory',
    infoBox: {
      title: 'Information for students',
      message:
        'Master projects are open to M2 students. To apply, contact directly the supervisor of the project you are interested in. Feel free to share your own project ideas with us!',
    },
    search: {
      label: 'Search projects',
      placeholder: 'Title, domain, supervisor...',
    },
    filters: {
      domain: 'Domain',
      allDomains: 'All domains',
      status: 'Status',
      allStatuses: 'All',
      available: 'Available',
      assigned: 'Assigned',
      completed: 'Completed',
    },
    projectCard: {
      supervisor: 'Supervisor',
      coSupervisor: 'Co-supervisor',
      skills: 'Required skills',
      proposedOn: 'Proposed on',
      contact: 'Contact',
      expressInterest: 'Express interest',
    },
    status: {
      available: 'Available',
      assigned: 'Assigned',
      completed: 'Completed',
    },
    difficulty: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    },
    interestModal: {
      title: 'Express interest',
      projectLabel: 'Project',
      fullName: 'Full name',
      fullNamePlaceholder: 'Your full name',
      email: 'University email',
      emailPlaceholder: 'your.email@univ.edu',
      studyLevel: 'Study level',
      selectLevel: 'Select your level',
      master1: 'Master 1',
      master2: 'Master 2',
      motivation: 'Motivation',
      motivationPlaceholder:
        'Explain why this project interests you and what skills you could bring...',
      cancel: 'Cancel',
      submit: 'Submit',
    },
    results: {
      project: 'project',
      projects: 'projects',
      found: 'found',
    },
    empty: {
      title: 'No projects found',
      message: 'Try modifying your search criteria.',
    },
    interest: {
      successMessage: 'Success',
    },
  },
} as const;
