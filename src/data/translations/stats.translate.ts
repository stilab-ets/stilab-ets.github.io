export interface StatsTranslations {
  sectionTitle: string
  members: string
  publications: string
  projects: string
  awards: string
}

type StatsTranslationDict = {
  fr: StatsTranslations;
  en: StatsTranslations;
};

export const statsTranslations: StatsTranslationDict = {
  fr: {
    sectionTitle: 'Le laboratoire en chiffres',
    members: 'Membres',
    publications: 'Publications',
    projects: 'Projets',
    awards: 'Prix'
  },
  en: {
    sectionTitle: 'Our laboratory in numbers',
    members: 'Members',
    publications: 'Publications', 
    projects: 'Projects',
    awards: 'Awards'
  }
} as const