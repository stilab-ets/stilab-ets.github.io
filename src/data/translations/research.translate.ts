export interface ResearchTranslations {
  pageTitle: string
  pageSubtitle: string
  overview: {
    title: string
    description: string
    activeProjects: string
    researchDomains: string
    industryPartners: string
  }
  featuredProjects: {
    title: string
    status: {
      active: string
      completed: string
      planned: string
    }
    ongoing: string
    funding: string
    leader: string
    participants: string
  }
  researchAreas: {
    title: string
    associatedProjects: string
    noActiveProjects: string
  }
  domains: {
    softwareArchitecture: {
      title: string
      description: string
    }
    artificialIntelligence: {
      title: string
      description: string
    }
    cybersecurity: {
      title: string
      description: string
    }
    devops: {
      title: string
      description: string
    }
    cloudComputing: {
      title: string
      description: string
    }
    softwareTesting: {
      title: string
      description: string
    }
    softwareMaintenance: {
      title: string
      description: string
    }
    humanComputerInteraction: {
      title: string
      description: string
    }
  }
}

type ResearchTranslationDict = {
  fr: ResearchTranslations;
  en: ResearchTranslations;
};

export const researchTranslations: ResearchTranslationDict = {
  fr: {
    pageTitle: 'Nos Recherches',
    pageSubtitle: 'Découvrez nos axes de recherche et projets innovants en génie logiciel',
    overview: {
      title: 'Vue d\'ensemble',
      description: 'Notre laboratoire de génie logiciel se concentre sur l\'innovation et l\'excellence dans le développement de solutions logicielles. Nos recherches couvrent un large spectre, de l\'architecture des systèmes distribués à l\'intelligence artificielle appliquée au développement logiciel.',
      activeProjects: 'Projets actifs',
      researchDomains: 'Domaines de recherche',
      industryPartners: 'Partenaires industriels'
    },
    featuredProjects: {
      title: 'Projets Phares',
      status: {
        active: 'Actif',
        completed: 'Terminé',
        planned: 'Planifié'
      },
      ongoing: 'En cours',
      funding: 'Financement',
      leader: 'Responsable',
      participants: 'Participants'
    },
    researchAreas: {
      title: 'Domaines de Recherche',
      associatedProjects: 'Projets associés',
      noActiveProjects: 'Aucun projet actif dans ce domaine'
    },
    domains: {
      softwareArchitecture: {
        title: 'Architecture Logicielle',
        description: 'Conception et optimisation d\'architectures logicielles scalables'
      },
      artificialIntelligence: {
        title: 'Intelligence Artificielle',
        description: 'Application de l\'IA aux processus de développement logiciel'
      },
      cybersecurity: {
        title: 'Cybersécurité',
        description: 'Sécurité des systèmes distribués et applications blockchain'
      },
      devops: {
        title: 'DevOps',
        description: 'Automatisation et optimisation des pipelines de développement'
      },
      cloudComputing: {
        title: 'Cloud Computing',
        description: 'Solutions cloud-native et architectures microservices'
      },
      softwareTesting: {
        title: 'Tests Logiciels',
        description: 'Méthodes avancées de test et assurance qualité'
      },
      softwareMaintenance: {
        title: 'Maintenance Logicielle',
        description: 'Gestion de la dette technique et maintenance prédictive'
      },
      humanComputerInteraction: {
        title: 'Interaction Homme-Machine',
        description: 'Interface utilisateur et expérience développeur'
      }
    }
  },
  en: {
    pageTitle: 'Our Research',
    pageSubtitle: 'Discover our research axes and innovative projects in software engineering',
    overview: {
      title: 'Overview',
      description: 'Our software engineering laboratory focuses on innovation and excellence in developing software solutions. Our research covers a broad spectrum, from distributed system architectures to artificial intelligence applied to software development.',
      activeProjects: 'Active projects',
      researchDomains: 'Research domains',
      industryPartners: 'Industry partners'
    },
    featuredProjects: {
      title: 'Featured Projects',
      status: {
        active: 'Active',
        completed: 'Completed',
        planned: 'Planned'
      },
      ongoing: 'Ongoing',
      funding: 'Funding',
      leader: 'Leader',
      participants: 'Participants'
    },
    researchAreas: {
      title: 'Research Areas',
      associatedProjects: 'Associated projects',
      noActiveProjects: 'No active projects in this domain'
    },
    domains: {
      softwareArchitecture: {
        title: 'Software Architecture',
        description: 'Design and optimization of scalable software architectures'
      },
      artificialIntelligence: {
        title: 'Artificial Intelligence',
        description: 'AI application to software development processes'
      },
      cybersecurity: {
        title: 'Cybersecurity',
        description: 'Distributed systems security and blockchain applications'
      },
      devops: {
        title: 'DevOps',
        description: 'Automation and optimization of development pipelines'
      },
      cloudComputing: {
        title: 'Cloud Computing',
        description: 'Cloud-native solutions and microservices architectures'
      },
      softwareTesting: {
        title: 'Software Testing',
        description: 'Advanced testing methods and quality assurance'
      },
      softwareMaintenance: {
        title: 'Software Maintenance',
        description: 'Technical debt management and predictive maintenance'
      },
      humanComputerInteraction: {
        title: 'Human-Computer Interaction',
        description: 'User interface and developer experience'
      }
    }
  }
} as const