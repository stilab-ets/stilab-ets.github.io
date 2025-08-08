export interface ResearchAreasTranslations {
  sectionTitle: {
    part1: string;
    part2: string;
  };
  subtitle: string;
  areas: {
    architecture: {
      title: string;
      description: string;
    };
    ai: {
      title: string;
      description: string;
    };
    security: {
      title: string;
      description: string;
    };
    cloud: {
      title: string;
      description: string;
    };
  };
}

type ResearchAreasTranslationDict = {
  fr: ResearchAreasTranslations;
  en: ResearchAreasTranslations;
};

export const researchAreasTranslations: ResearchAreasTranslationDict = {
  fr: {
    sectionTitle: {
      part1: 'Nos',
      part2: 'Domaines',
    },
    subtitle:
      "Nos recherches couvrent un large spectre du génie logiciel moderne et de l'intelligence artificielle",
    areas: {
      architecture: {
        title: 'Architecture Logicielle',
        description: 'Patterns et systèmes distribués',
      },
      ai: {
        title: 'Intelligence Artificielle',
        description: 'IA appliquée au développement',
      },
      security: {
        title: 'Cybersécurité',
        description: 'Sécurité des systèmes',
      },
      cloud: {
        title: 'Cloud Computing',
        description: 'Solutions cloud-native',
      },
    },
  },
  en: {
    sectionTitle: {
      part1: 'Our',
      part2: 'Expertise',
    },
    subtitle:
      'Our research covers a broad spectrum of modern software engineering and artificial intelligence',
    areas: {
      architecture: {
        title: 'Software Architecture',
        description: 'Patterns and distributed systems',
      },
      ai: {
        title: 'Artificial Intelligence',
        description: 'AI applied to development',
      },
      security: {
        title: 'Cybersecurity',
        description: 'Systems security',
      },
      cloud: {
        title: 'Cloud Computing',
        description: 'Cloud-native solutions',
      },
    },
  },
} as const;
