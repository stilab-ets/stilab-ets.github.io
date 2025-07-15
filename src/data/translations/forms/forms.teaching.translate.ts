export interface TeachingFormTranslations {
  titleEdit: string
  titleCreate: string
  subtitle: string
  sections: {
    basic: string
    content: string
    logistics: string
    assessment: string
    resources: string
  }
  form: {
    title: string
    titlePlaceholder: string
    code: string
    codePlaceholder: string
    instructor: string
    selectInstructor: string
    coInstructors: string
    selectCoInstructors: string
    semester: string
    selectSemester: string
    semesterPlaceholder: string
    level: string
    selectLevel: string
    credits: string
    creditsPlaceholder: string
    language: string
    selectLanguage: string
    description: string
    descriptionPlaceholder: string
    objectives: string
    objectivesPlaceholder: string
    prerequisites: string
    prerequisitesPlaceholder: string
    topics: string
    topicsPlaceholder: string
    schedule: string
    schedulePlaceholder: string
    location: string
    locationPlaceholder: string
    capacity: string
    capacityPlaceholder: string
    assessmentMethods: string
    assessmentMethodsPlaceholder: string
    gradingScale: string
    gradingScalePlaceholder: string
    syllabusUrl: string
    syllabusUrlPlaceholder: string
    moodleUrl: string
    moodleUrlPlaceholder: string
    githubUrl: string
    githubUrlPlaceholder: string
    materials: string
    materialsPlaceholder: string
    textbooks: string
    textbooksPlaceholder: string
    status: string
    selectStatus: string
    enrollmentOpen: string
    cancel: string
    create: string
    update: string
    submitting: string
  }
  levels: {
    undergraduate: string
    graduate: string
    phd: string
    continuing: string
  }
  semesters: {
    fall: string
    spring: string
    summer: string
    winter: string
  }
  languages: {
    french: string
    english: string
    bilingual: string
  }
  statuses: {
    draft: string
    published: string
    active: string
    completed: string
    cancelled: string
  }
  validation: {
    titleRequired: string
    codeRequired: string
    instructorRequired: string
    semesterRequired: string
    levelRequired: string
    creditsRequired: string
    creditsInvalid: string
    languageRequired: string
    descriptionRequired: string
    objectivesRequired: string
    capacityInvalid: string
    urlInvalid: string
    statusRequired: string
  }
  errors: {
    submitFailed: string
  }
}

export const teachingFormTranslations: Record<'fr' | 'en', TeachingFormTranslations> = {
  fr: {
    titleEdit: 'Modifier le cours',
    titleCreate: 'Créer un cours',
    subtitle: 'Définissez les détails du cours',
    sections: {
      basic: 'Informations de base',
      content: 'Contenu du cours',
      logistics: 'Logistique',
      assessment: 'Évaluation',
      resources: 'Ressources'
    },
    form: {
      title: 'Titre',
      titlePlaceholder: 'Titre du cours',
      code: 'Code du cours',
      codePlaceholder: 'CS-101, MATH-201...',
      instructor: 'Enseignant',
      selectInstructor: 'Sélectionnez l\'enseignant',
      coInstructors: 'Co-enseignants',
      selectCoInstructors: 'Sélectionnez les co-enseignants',
      semester: 'Semestre',
      selectSemester: 'Sélectionnez le semestre',
      semesterPlaceholder: 'Automne 2024',
      level: 'Niveau',
      selectLevel: 'Sélectionnez le niveau',
      credits: 'Crédits ECTS',
      creditsPlaceholder: '6',
      language: 'Langue',
      selectLanguage: 'Sélectionnez la langue',
      description: 'Description',
      descriptionPlaceholder: 'Description générale du cours...',
      objectives: 'Objectifs pédagogiques',
      objectivesPlaceholder: 'Objectifs d\'apprentissage...',
      prerequisites: 'Prérequis',
      prerequisitesPlaceholder: 'Cours ou compétences requis...',
      topics: 'Sujets abordés',
      topicsPlaceholder: 'Liste des sujets principaux...',
      schedule: 'Horaire',
      schedulePlaceholder: 'Lundi 14h-16h, Mercredi 10h-12h...',
      location: 'Lieu',
      locationPlaceholder: 'Amphithéâtre A, Salle 101...',
      capacity: 'Capacité',
      capacityPlaceholder: 'Nombre maximum d\'étudiants',
      assessmentMethods: 'Méthodes d\'évaluation',
      assessmentMethodsPlaceholder: 'Examens, projets, participation...',
      gradingScale: 'Barème de notation',
      gradingScalePlaceholder: 'A-F, 0-20, Pass/Fail...',
      syllabusUrl: 'URL du syllabus',
      syllabusUrlPlaceholder: 'https://...',
      moodleUrl: 'URL Moodle',
      moodleUrlPlaceholder: 'https://moodle.univ.fr/...',
      githubUrl: 'URL GitHub',
      githubUrlPlaceholder: 'https://github.com/...',
      materials: 'Matériel de cours',
      materialsPlaceholder: 'Slides, exercices, laboratoires...',
      textbooks: 'Manuels',
      textbooksPlaceholder: 'Livres de référence...',
      status: 'Statut',
      selectStatus: 'Sélectionnez le statut',
      enrollmentOpen: 'Inscriptions ouvertes',
      cancel: 'Annuler',
      create: 'Créer',
      update: 'Mettre à jour',
      submitting: 'En cours...'
    },
    levels: {
      undergraduate: 'Licence',
      graduate: 'Master',
      phd: 'Doctorat',
      continuing: 'Formation continue'
    },
    semesters: {
      fall: 'Automne',
      spring: 'Printemps',
      summer: 'Été',
      winter: 'Hiver'
    },
    languages: {
      french: 'Français',
      english: 'Anglais',
      bilingual: 'Bilingue'
    },
    statuses: {
      draft: 'Brouillon',
      published: 'Publié',
      active: 'Actif',
      completed: 'Terminé',
      cancelled: 'Annulé'
    },
    validation: {
      titleRequired: 'Le titre est requis',
      codeRequired: 'Le code du cours est requis',
      instructorRequired: 'L\'enseignant est requis',
      semesterRequired: 'Le semestre est requis',
      levelRequired: 'Le niveau est requis',
      creditsRequired: 'Les crédits sont requis',
      creditsInvalid: 'Nombre de crédits invalide',
      languageRequired: 'La langue est requise',
      descriptionRequired: 'La description est requise',
      objectivesRequired: 'Les objectifs sont requis',
      capacityInvalid: 'Capacité invalide',
      urlInvalid: 'URL invalide',
      statusRequired: 'Le statut est requis'
    },
    errors: {
      submitFailed: 'Échec de la soumission'
    }
  },
  en: {
    titleEdit: 'Edit Course',
    titleCreate: 'Create Course',
    subtitle: 'Define course details',
    sections: {
      basic: 'Basic Information',
      content: 'Course Content',
      logistics: 'Logistics',
      assessment: 'Assessment',
      resources: 'Resources'
    },
    form: {
      title: 'Title',
      titlePlaceholder: 'Course title',
      code: 'Course Code',
      codePlaceholder: 'CS-101, MATH-201...',
      instructor: 'Instructor',
      selectInstructor: 'Select instructor',
      coInstructors: 'Co-instructors',
      selectCoInstructors: 'Select co-instructors',
      semester: 'Semester',
      selectSemester: 'Select semester',
      semesterPlaceholder: 'Fall 2024',
      level: 'Level',
      selectLevel: 'Select level',
      credits: 'Credits',
      creditsPlaceholder: '3',
      language: 'Language',
      selectLanguage: 'Select language',
      description: 'Description',
      descriptionPlaceholder: 'General course description...',
      objectives: 'Learning Objectives',
      objectivesPlaceholder: 'Learning objectives...',
      prerequisites: 'Prerequisites',
      prerequisitesPlaceholder: 'Required courses or skills...',
      topics: 'Topics Covered',
      topicsPlaceholder: 'List of main topics...',
      schedule: 'Schedule',
      schedulePlaceholder: 'Monday 2-4pm, Wednesday 10-12pm...',
      location: 'Location',
      locationPlaceholder: 'Auditorium A, Room 101...',
      capacity: 'Capacity',
      capacityPlaceholder: 'Maximum number of students',
      assessmentMethods: 'Assessment Methods',
      assessmentMethodsPlaceholder: 'Exams, projects, participation...',
      gradingScale: 'Grading Scale',
      gradingScalePlaceholder: 'A-F, 0-100, Pass/Fail...',
      syllabusUrl: 'Syllabus URL',
      syllabusUrlPlaceholder: 'https://...',
      moodleUrl: 'Moodle URL',
      moodleUrlPlaceholder: 'https://moodle.univ.edu/...',
      githubUrl: 'GitHub URL',
      githubUrlPlaceholder: 'https://github.com/...',
      materials: 'Course Materials',
      materialsPlaceholder: 'Slides, exercises, labs...',
      textbooks: 'Textbooks',
      textbooksPlaceholder: 'Reference books...',
      status: 'Status',
      selectStatus: 'Select status',
      enrollmentOpen: 'Enrollment open',
      cancel: 'Cancel',
      create: 'Create',
      update: 'Update',
      submitting: 'Submitting...'
    },
    levels: {
      undergraduate: 'Undergraduate',
      graduate: 'Graduate',
      phd: 'PhD',
      continuing: 'Continuing Education'
    },
    semesters: {
      fall: 'Fall',
      spring: 'Spring',
      summer: 'Summer',
      winter: 'Winter'
    },
    languages: {
      french: 'French',
      english: 'English',
      bilingual: 'Bilingual'
    },
    statuses: {
      draft: 'Draft',
      published: 'Published',
      active: 'Active',
      completed: 'Completed',
      cancelled: 'Cancelled'
    },
    validation: {
      titleRequired: 'Title is required',
      codeRequired: 'Course code is required',
      instructorRequired: 'Instructor is required',
      semesterRequired: 'Semester is required',
      levelRequired: 'Level is required',
      creditsRequired: 'Credits are required',
      creditsInvalid: 'Invalid number of credits',
      languageRequired: 'Language is required',
      descriptionRequired: 'Description is required',
      objectivesRequired: 'Objectives are required',
      capacityInvalid: 'Invalid capacity',
      urlInvalid: 'Invalid URL',
      statusRequired: 'Status is required'
    },
    errors: {
      submitFailed: 'Failed to submit'
    }
  }
} as const