export interface Researcher {
  id: string;
  name: string;
  title: string;
  photo: string;
  email: string;
  phone?: string;
  researchDomains: string[];
  biography: string;
  githubUrl?: string;
  linkedinUrl?: string;
  personalWebsite?: string;
  awards: Award[];
  publications: string[]; // Publication IDs
  coursesTaught: Course[];
  status: 'active' | 'alumni' | 'visitor';
}

export interface Award {
  id: string;
  title: string;
  year: number;
  organization: string;
  icon: string;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  semester: string;
  level: 'undergraduate' | 'graduate';
  description: string;
}

export const mockResearchers: Researcher[] = [
  {
    id: '1',
    name: 'Dr. Marie Dubois',
    title: 'Professeur Associé',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    email: 'marie.dubois@univ.fr',
    phone: '+33 1 23 45 67 89',
    researchDomains: ['Software Architecture', 'DevOps', 'Cloud Computing'],
    biography: 'Dr. Marie Dubois est une experte reconnue en architecture logicielle avec plus de 15 ans d\'expérience. Elle dirige plusieurs projets de recherche sur les systèmes distribués et l\'optimisation des performances.',
    githubUrl: 'https://github.com/mariedubois',
    linkedinUrl: 'https://linkedin.com/in/mariedubois',
    personalWebsite: 'https://mariedubois.research.fr',
    awards: [
      {
        id: 'a1',
        title: 'Best Paper Award',
        year: 2023,
        organization: 'IEEE Software Engineering Conference',
        icon: '🏆'
      }
    ],
    publications: ['1', '2', '3'],
    coursesTaught: [
      {
        id: 'c1',
        title: 'Software Architecture Patterns',
        code: 'CS-501',
        semester: 'Fall 2024',
        level: 'graduate',
        description: 'Advanced patterns and practices in software architecture design.'
      }
    ],
    status: 'active'
  },
  {
    id: '2',
    name: 'Prof. Jean Martin',
    title: 'Directeur de Recherche',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    email: 'jean.martin@univ.fr',
    researchDomains: ['Machine Learning', 'Software Testing', 'AI in Software Engineering'],
    biography: 'Prof. Jean Martin est directeur de recherche spécialisé dans l\'application de l\'intelligence artificielle aux processus de développement logiciel. Il a publié plus de 80 articles dans des revues internationales.',
    githubUrl: 'https://github.com/jeanmartin',
    linkedinUrl: 'https://linkedin.com/in/jeanmartin',
    awards: [
      {
        id: 'a2',
        title: 'Excellence in Research Award',
        year: 2022,
        organization: 'ACM SIGSOFT',
        icon: '🎖️'
      },
      {
        id: 'a3',
        title: 'Distinguished Scientist',
        year: 2021,
        organization: 'IEEE Computer Society',
        icon: '⭐'
      }
    ],
    publications: ['1', '4', '5'],
    coursesTaught: [
      {
        id: 'c2',
        title: 'Introduction to Machine Learning',
        code: 'CS-302',
        semester: 'Spring 2024',
        level: 'undergraduate',
        description: 'Fundamentals of machine learning algorithms and applications.'
      }
    ],
    status: 'active'
  },
  {
    id: '3',
    name: 'Dr. Sarah Chen',
    title: 'Chercheuse Post-Doc',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    email: 'sarah.chen@univ.fr',
    researchDomains: ['Cybersecurity', 'Blockchain', 'Distributed Systems'],
    biography: 'Dr. Sarah Chen travaille sur la sécurité des systèmes distribués et les applications blockchain. Elle a rejoint l\'équipe en 2023 après son doctorat à Stanford.',
    githubUrl: 'https://github.com/sarahchen',
    awards: [],
    publications: ['6', '7'],
    coursesTaught: [],
    status: 'active'
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    title: 'Doctorant',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    email: 'alex.rodriguez@univ.fr',
    researchDomains: ['Software Maintenance', 'Code Analysis', 'Technical Debt'],
    biography: 'Alex Rodriguez est doctorant en 3ème année, travaillant sur l\'analyse automatique de la dette technique dans les projets logiciels open source.',
    githubUrl: 'https://github.com/alexrodriguez',
    awards: [],
    publications: ['8'],
    coursesTaught: [],
    status: 'active'
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    title: 'Professeur Émérite',
    photo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face',
    email: 'lisa.thompson@univ.fr',
    researchDomains: ['Human-Computer Interaction', 'Usability Engineering'],
    biography: 'Dr. Lisa Thompson est professeur émérite avec une expertise en interaction homme-machine. Elle continue de superviser des projets de recherche.',
    awards: [
      {
        id: 'a4',
        title: 'Lifetime Achievement Award',
        year: 2020,
        organization: 'ACM SIGCHI',
        icon: '🏅'
      }
    ],
    publications: ['9', '10'],
    coursesTaught: [],
    status: 'alumni'
  }
];

export const researchDomains = [
  'Software Architecture',
  'DevOps',
  'Cloud Computing',
  'Machine Learning',
  'Software Testing',
  'AI in Software Engineering',
  'Cybersecurity',
  'Blockchain',
  'Distributed Systems',
  'Software Maintenance',
  'Code Analysis',
  'Technical Debt',
  'Human-Computer Interaction',
  'Usability Engineering'
];