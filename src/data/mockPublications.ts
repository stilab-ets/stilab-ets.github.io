export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: 'journal' | 'conference' | 'workshop' | 'thesis' | 'book';
  abstract: string;
  pdfUrl?: string;
  doiUrl?: string;
  citations: number;
  tags: string[];
}

export interface Event {
  id: string;
  title: string;
  speaker?: string;
  date: string;
  time?: string;
  location: string;
  type: 'seminar' | 'workshop' | 'conference' | 'defense' | 'meeting';
  description: string;
  registrationUrl?: string;
  tags: string[];
  isUpcoming: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  leadResearcher: string;
  participants: string[];
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'planned';
  domain: string;
  funding?: string;
  githubUrl?: string;
  websiteUrl?: string;
}

export interface MScProject {
  id: string;
  title: string;
  abstract: string;
  supervisor: string;
  coSupervisor?: string;
  requirements: string[];
  domain: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'available' | 'assigned' | 'completed';
  proposedDate: string;
}

export interface Vacancy {
  id: string;
  title: string;
  type: 'phd' | 'postdoc' | 'researcher' | 'engineer' | 'intern';
  description: string;
  requirements: string[];
  supervisor: string;
  deadline: string;
  startDate: string;
  duration?: string;
  salary?: string;
  applyUrl: string;
  tags: string[];
}

export const mockPublications: Publication[] = [
  {
    id: '1',
    title: 'Advanced Microservices Architecture Patterns for Cloud-Native Applications',
    authors: ['Marie Dubois', 'Jean Martin'],
    venue: 'IEEE Transactions on Software Engineering',
    year: 2024,
    type: 'journal',
    abstract: 'This paper presents novel architectural patterns for microservices in cloud-native environments, focusing on scalability and reliability challenges.',
    pdfUrl: 'https://example.com/paper1.pdf',
    doiUrl: 'https://doi.org/10.1109/TSE.2024.001',
    citations: 12,
    tags: ['microservices', 'cloud computing', 'architecture']
  },
  {
    id: '2',
    title: 'Machine Learning-Driven Code Review Automation',
    authors: ['Marie Dubois', 'Alex Rodriguez'],
    venue: 'International Conference on Software Engineering (ICSE)',
    year: 2023,
    type: 'conference',
    abstract: 'We propose an ML-based approach to automate code review processes, reducing manual effort while maintaining code quality standards.',
    pdfUrl: 'https://example.com/paper2.pdf',
    doiUrl: 'https://doi.org/10.1145/icse.2023.002',
    citations: 28,
    tags: ['machine learning', 'code review', 'automation']
  },
  {
    id: '3',
    title: 'DevOps Pipeline Optimization Using Continuous Integration Metrics',
    authors: ['Marie Dubois'],
    venue: 'DevOps World Conference',
    year: 2023,
    type: 'conference',
    abstract: 'Analysis of CI/CD pipeline performance metrics and their impact on software delivery efficiency.',
    citations: 8,
    tags: ['devops', 'continuous integration', 'metrics']
  },
  {
    id: '4',
    title: 'AI-Powered Software Testing: A Comprehensive Survey',
    authors: ['Jean Martin', 'Sarah Chen'],
    venue: 'ACM Computing Surveys',
    year: 2024,
    type: 'journal',
    abstract: 'A comprehensive review of artificial intelligence applications in software testing, covering automated test generation, bug detection, and test optimization.',
    citations: 45,
    tags: ['artificial intelligence', 'software testing', 'survey']
  },
  {
    id: '5',
    title: 'Blockchain-Based Software Supply Chain Security',
    authors: ['Jean Martin', 'Sarah Chen'],
    venue: 'IEEE Symposium on Security and Privacy',
    year: 2023,
    type: 'conference',
    abstract: 'Novel approach to securing software supply chains using blockchain technology and smart contracts.',
    citations: 19,
    tags: ['blockchain', 'security', 'supply chain']
  },
  {
    id: '6',
    title: 'Distributed Consensus Algorithms for Fault-Tolerant Systems',
    authors: ['Sarah Chen'],
    venue: 'Journal of Distributed Computing',
    year: 2024,
    type: 'journal',
    abstract: 'Comparative analysis of consensus algorithms in distributed systems with Byzantine fault tolerance.',
    citations: 7,
    tags: ['distributed systems', 'consensus', 'fault tolerance']
  },
  {
    id: '7',
    title: 'Cybersecurity Frameworks for IoT Applications',
    authors: ['Sarah Chen', 'Marie Dubois'],
    venue: 'International Conference on IoT Security',
    year: 2023,
    type: 'conference',
    abstract: 'Security framework design for Internet of Things applications with focus on edge computing scenarios.',
    citations: 15,
    tags: ['cybersecurity', 'iot', 'edge computing']
  },
  {
    id: '8',
    title: 'Automated Technical Debt Detection in Open Source Projects',
    authors: ['Alex Rodriguez', 'Marie Dubois'],
    venue: 'Workshop on Technical Debt',
    year: 2024,
    type: 'workshop',
    abstract: 'Machine learning approach to automatically identify and classify technical debt in large-scale open source software projects.',
    citations: 3,
    tags: ['technical debt', 'open source', 'automation']
  },
  {
    id: '9',
    title: 'User Experience Design Patterns for Developer Tools',
    authors: ['Lisa Thompson'],
    venue: 'ACM Transactions on Computer-Human Interaction',
    year: 2022,
    type: 'journal',
    abstract: 'Analysis of UX patterns that improve developer productivity and satisfaction in software development tools.',
    citations: 32,
    tags: ['user experience', 'developer tools', 'design patterns']
  },
  {
    id: '10',
    title: 'Accessibility Guidelines for Programming Environments',
    authors: ['Lisa Thompson', 'Alex Rodriguez'],
    venue: 'International Conference on Accessibility',
    year: 2022,
    type: 'conference',
    abstract: 'Comprehensive guidelines for making programming environments accessible to developers with disabilities.',
    citations: 18,
    tags: ['accessibility', 'programming environments', 'inclusive design']
  }
];

export const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'Séminaire: AI in Software Engineering - Current Trends and Future Directions',
    speaker: 'Prof. Jean Martin',
    date: '2024-06-15',
    time: '14:00',
    location: 'Amphithéâtre A, Bâtiment Informatique',
    type: 'seminar',
    description: 'Présentation des dernières avancées en intelligence artificielle appliquée au génie logiciel, avec discussion sur les perspectives futures.',
    registrationUrl: 'https://events.univ.fr/register/ai-seminar',
    tags: ['AI', 'machine learning', 'software engineering'],
    isUpcoming: true
  },
  {
    id: 'e2',
    title: 'Workshop: Blockchain Security for Developers',
    speaker: 'Dr. Sarah Chen',
    date: '2024-06-20',
    time: '09:00',
    location: 'Salle de conférence B12',
    type: 'workshop',
    description: 'Atelier pratique sur les bonnes pratiques de sécurité lors du développement d\'applications blockchain.',
    registrationUrl: 'https://events.univ.fr/register/blockchain-workshop',
    tags: ['blockchain', 'security', 'hands-on'],
    isUpcoming: true
  },
  {
    id: 'e3',
    title: 'Soutenance de thèse: Alex Rodriguez',
    speaker: 'Alex Rodriguez',
    date: '2024-07-10',
    time: '10:00',
    location: 'Amphithéâtre Principal',
    type: 'defense',
    description: 'Soutenance de thèse: "Automated Detection and Management of Technical Debt in Large-Scale Software Systems"',
    tags: ['defense', 'technical debt', 'automation'],
    isUpcoming: true
  },
  {
    id: 'e4',
    title: 'Conférence: DevOps Best Practices',
    speaker: 'Dr. Marie Dubois',
    date: '2024-05-15',
    time: '13:30',
    location: 'Centre de conférences universitaire',
    type: 'conference',
    description: 'Présentation des meilleures pratiques DevOps basée sur les recherches récentes du laboratoire.',
    tags: ['devops', 'best practices', 'research'],
    isUpcoming: false
  },
  {
    id: 'e5',
    title: 'Réunion mensuelle du laboratoire',
    date: '2024-06-01',
    time: '16:00',
    location: 'Salle de réunion R205',
    type: 'meeting',
    description: 'Réunion mensuelle pour présentation des avancées et discussion des projets en cours.',
    tags: ['lab meeting', 'monthly'],
    isUpcoming: false
  }
];

export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'CloudNative Architecture Framework',
    description: 'Développement d\'un framework pour architectures cloud-native avec focus sur la scalabilité automatique et la résilience.',
    leadResearcher: 'Marie Dubois',
    participants: ['Jean Martin', 'Alex Rodriguez'],
    startDate: '2023-01-01',
    endDate: '2025-12-31',
    status: 'active',
    domain: 'Software Architecture',
    funding: 'ANR - 150,000€',
    githubUrl: 'https://github.com/lab/cloudnative-framework',
    websiteUrl: 'https://cloudnative.research.fr'
  },
  {
    id: 'p2',
    title: 'AI-Driven Code Analysis Platform',
    description: 'Plateforme d\'analyse de code utilisant l\'IA pour détecter automatiquement les bugs, vulnérabilités et optimisations possibles.',
    leadResearcher: 'Jean Martin',
    participants: ['Marie Dubois', 'Sarah Chen'],
    startDate: '2023-06-01',
    endDate: '2026-05-31',
    status: 'active',
    domain: 'Machine Learning',
    funding: 'H2020 - 300,000€',
    githubUrl: 'https://github.com/lab/ai-code-analysis'
  },
  {
    id: 'p3',
    title: 'Blockchain Security Audit Tools',
    description: 'Développement d\'outils automatisés pour l\'audit de sécurité des smart contracts et applications blockchain.',
    leadResearcher: 'Sarah Chen',
    participants: ['Jean Martin'],
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    status: 'active',
    domain: 'Cybersecurity',
    funding: 'Industrie - 80,000€'
  },
  {
    id: 'p4',
    title: 'Technical Debt Management System',
    description: 'Système de gestion automatisée de la dette technique dans les projets logiciels de grande envergure.',
    leadResearcher: 'Alex Rodriguez',
    participants: ['Marie Dubois'],
    startDate: '2022-09-01',
    endDate: '2024-08-31',
    status: 'active',
    domain: 'Software Maintenance',
    funding: 'Bourse doctorale - 120,000€'
  }
];

export const mockMScProjects: MScProject[] = [
  {
    id: 'msc1',
    title: 'Développement d\'un plugin VS Code pour l\'analyse de performance',
    abstract: 'Créer un plugin Visual Studio Code qui analyse en temps réel les performances du code et propose des optimisations.',
    supervisor: 'Marie Dubois',
    requirements: ['Expérience en TypeScript/JavaScript', 'Connaissance des APIs VS Code', 'Bases en analyse statique'],
    domain: 'Software Tools',
    difficulty: 'intermediate',
    status: 'available',
    proposedDate: '2024-03-01'
  },
  {
    id: 'msc2',
    title: 'IA pour la génération automatique de tests unitaires',
    abstract: 'Développer un système basé sur l\'IA pour générer automatiquement des tests unitaires pertinents à partir du code source.',
    supervisor: 'Jean Martin',
    coSupervisor: 'Sarah Chen',
    requirements: ['Machine Learning', 'Python', 'Analyse de code', 'Frameworks de test'],
    domain: 'AI in Software Engineering',
    difficulty: 'advanced',
    status: 'available',
    proposedDate: '2024-02-15'
  },
  {
    id: 'msc3',
    title: 'Interface utilisateur pour la visualisation de données blockchain',
    abstract: 'Concevoir et implémenter une interface web interactive pour visualiser les transactions et structures de données blockchain.',
    supervisor: 'Sarah Chen',
    requirements: ['React/Vue.js', 'D3.js ou Chart.js', 'Bases en blockchain', 'Design UX/UI'],
    domain: 'Blockchain',
    difficulty: 'intermediate',
    status: 'assigned',
    proposedDate: '2024-01-20'
  }
];

export const mockVacancies: Vacancy[] = [
  {
    id: 'v1',
    title: 'Thèse CIFRE: DevOps et Intelligence Artificielle',
    type: 'phd',
    description: 'Recherche sur l\'application de l\'IA aux processus DevOps en collaboration avec une entreprise partenaire.',
    requirements: ['Master en informatique', 'Expérience en DevOps', 'Bases en Machine Learning', 'Anglais courant'],
    supervisor: 'Marie Dubois',
    deadline: '2024-07-15',
    startDate: '2024-10-01',
    duration: '3 ans',
    salary: '2000€/mois + avantages entreprise',
    applyUrl: 'https://jobs.univ.fr/apply/phd-devops-ai',
    tags: ['CIFRE', 'DevOps', 'AI', 'Industry collaboration']
  },
  {
    id: 'v2',
    title: 'Post-doctorat: Sécurité des systèmes distribués',
    type: 'postdoc',
    description: 'Recherche avancée sur les protocoles de sécurité pour systèmes distribués et applications blockchain.',
    requirements: ['Doctorat en informatique', 'Expertise en sécurité', 'Publications en conférences A', 'Expérience blockchain'],
    supervisor: 'Sarah Chen',
    deadline: '2024-06-30',
    startDate: '2024-09-01',
    duration: '18 mois',
    salary: '3200€/mois',
    applyUrl: 'https://jobs.univ.fr/apply/postdoc-security',
    tags: ['Security', 'Distributed Systems', 'Blockchain', 'Research']
  },
  {
    id: 'v3',
    title: 'Ingénieur de recherche: Plateforme d\'analyse de code',
    type: 'engineer',
    description: 'Développement et maintenance de la plateforme d\'analyse de code basée sur l\'IA du laboratoire.',
    requirements: ['Bac+5 en informatique', 'Expérience en Python/Java', 'Connaissance en analyse statique', 'DevOps'],
    supervisor: 'Jean Martin',
    deadline: '2024-06-20',
    startDate: '2024-07-01',
    duration: 'CDI',
    salary: '45,000€-55,000€/an selon expérience',
    applyUrl: 'https://jobs.univ.fr/apply/research-engineer',
    tags: ['Software Development', 'AI', 'Platform', 'Full-time']
  }
];