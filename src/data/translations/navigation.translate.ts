export interface NavigationTranslations {
  home: string;
  people: string;
  research: string;
  publications: string;
  teaching: string;
  events: string;
  projects: string;
  vacancies: string;
  awards: string;
}

type NavigationTranslationDict = {
  fr: NavigationTranslations;
  en: NavigationTranslations;
};

export const navigationTranslations: NavigationTranslationDict = {
  fr: {
    home: 'Accueil',
    people: 'Équipe',
    research: 'Recherche',
    publications: 'Publications',
    teaching: 'Enseignement',
    events: 'Événements',
    projects: 'Projets M2',
    vacancies: 'Recrutements',
    awards: 'Prix',
  },
  en: {
    home: 'Home',
    people: 'Team',
    research: 'Research',
    publications: 'Publications',
    teaching: 'Teaching',
    events: 'Events',
    projects: 'MSc Projects',
    vacancies: 'Vacancies',
    awards: 'Awards',
  },
} as const;

export interface NavItem {
  id: string;
  label: Record<'en' | 'fr', string>;
  icon: string;
}

export const navigationItems: NavItem[] = [
  { id: 'home', label: { fr: 'Accueil', en: 'Home' }, icon: '🏠' },
  { id: 'people', label: { fr: 'Équipe', en: 'Team' }, icon: '👥' },
  { id: 'research', label: { fr: 'Recherche', en: 'Research' }, icon: '🔬' },
  {
    id: 'publications',
    label: { fr: 'Publications', en: 'Publications' },
    icon: '📚',
  },
  { id: 'teaching', label: { fr: 'Enseignement', en: 'Teaching' }, icon: '🎓' },
  { id: 'events', label: { fr: 'Événements', en: 'Events' }, icon: '📅' },
  {
    id: 'projects',
    label: { fr: 'Projets M2', en: 'MSc Projects' },
    icon: '🎯',
  },
  {
    id: 'vacancies',
    label: { fr: 'Recrutements', en: 'Vacancies' },
    icon: '💼',
  },
  { id: 'awards', label: { fr: 'Prix', en: 'Awards' }, icon: '🏆' },
];
