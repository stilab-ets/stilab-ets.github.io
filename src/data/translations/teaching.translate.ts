export interface TeachingTranslations {
  stats: any;
  results: any;
  pageTitle: string;
  pageSubtitle: string;
  statistics: {
    coursesOffered: string;
    instructors: string;
    studyLevels: string;
  };
  search: {
    label: string;
    placeholder: string;
  };
  filters: {
    level: string;
    allLevels: string;
    semester: string;
    allSemesters: string;
  };
  levels: {
    undergraduate: string;
    graduate: string;
  };
  courseCard: {
    instructor: string;
    semester: string;
    prerequisites: string;
    objectives: string;
    topics: string;
    credits: string;
  };
  links: {
    syllabus: string;
    moodle: string;
    github: string;
  };
  empty: {
    title: string;
    message: string;
  };
  semesters: {
    fall: string;
    summer: string;
    winter: string;
  };
}

type TeachingTranslationDict = {
  fr: TeachingTranslations;
  en: TeachingTranslations;
};

export const teachingTranslations: TeachingTranslationDict = {
  fr: {
    pageTitle: 'Enseignement',
    pageSubtitle:
      'Découvrez les cours dispensés par les membres de notre laboratoire',
    statistics: {
      coursesOffered: 'Cours proposés',
      instructors: 'Enseignants',
      studyLevels: "Niveaux d'étude",
    },
    search: {
      label: 'Rechercher un cours',
      placeholder: 'Titre, code, enseignant...',
    },
    filters: {
      level: 'Niveau',
      allLevels: 'Tous les niveaux',
      semester: 'Semestre',
      allSemesters: 'Tous les semestres',
    },
    levels: {
      undergraduate: 'Licence',
      graduate: 'Master',
    },
    courseCard: {
      instructor: 'Enseignant',
      semester: 'Semestre',
      prerequisites: 'Prérequis',
      objectives: 'Objectifs',
      topics: 'Sujets abordés',
      credits: 'ECTS',
    },
    links: {
      syllabus: 'Syllabus',
      moodle: 'Moodle',
      github: 'GitHub',
    },
    empty: {
      title: 'Aucun cours trouvé',
      message: 'Essayez de modifier vos critères de recherche.',
    },
    semesters: {
      fall: 'Automne',
      summer: 'Été',
      winter: 'Hiver',
    },
    stats: 'Statistiques',
    results: 'Résultats',
  },
  en: {
    pageTitle: 'Teaching',
    pageSubtitle: 'Discover the courses taught by our laboratory members',
    statistics: {
      coursesOffered: 'Courses offered',
      instructors: 'Instructors',
      studyLevels: 'Study levels',
    },
    search: {
      label: 'Search courses',
      placeholder: 'Title, code, instructor...',
    },
    filters: {
      level: 'Level',
      allLevels: 'All levels',
      semester: 'Semester',
      allSemesters: 'All semesters',
    },
    levels: {
      undergraduate: 'Undergraduate',
      graduate: 'Graduate',
    },
    courseCard: {
      instructor: 'Instructor',
      semester: 'Semester',
      prerequisites: 'Prerequisites',
      objectives: 'Objectives',
      topics: 'Topics covered',
      credits: 'ECTS',
    },
    links: {
      syllabus: 'Syllabus',
      moodle: 'Moodle',
      github: 'GitHub',
    },
    empty: {
      title: 'No courses found',
      message: 'Try modifying your search criteria.',
    },
    semesters: {
      fall: 'Fall',
      summer: 'Summer',
      winter: 'Winter',
    },
    stats: 'Statistics',
    results: 'Results',
  },
} as const;
