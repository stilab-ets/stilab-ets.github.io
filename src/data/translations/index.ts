import { NavigationTranslations, navigationTranslations } from './navigation.translate'
import { HeroTranslations, heroTranslations } from './hero.translate'
import { StatsTranslations, statsTranslations } from './stats.translate'
import { CommonTranslations, commonTranslations } from './common.translate'
import { FooterTranslations, footerTranslations } from './footer.translate'
import { PersonTranslations, personTranslations } from './person.translate'
import { QuickLinksTranslations, quickLinksTranslations } from './quickLinks.translate'
import { ResearchAreasTranslations, researchAreasTranslations } from './researchAreas.translate'
import { AwardsTranslations, awardsTranslations } from './awards.translate'
import { EventsTranslations, eventsTranslations } from './events.translate'
import { PublicationsTranslations, publicationsTranslations } from './publications.translate'
import { ResearchTranslations, researchTranslations } from './research.translate'
import { TeachingTranslations, teachingTranslations } from './teaching.translate'
import { ProjectsTranslations, projectsTranslations } from './projects.translate'
import { VacanciesTranslations, vacanciesTranslations } from './vacancies.translate'
import { authTranslations, AuthTranslations } from './auth.translate'
import { dashboardTranslations, DashboardTranslations } from './dashboard.translate'
import { formsTranslations, FormsTranslations } from './forms'

export type LanguageCode = 'en' | 'fr'

export interface Translations {
  navigation: NavigationTranslations
  hero: HeroTranslations
  stats: StatsTranslations
  common: CommonTranslations
  footer: FooterTranslations
  person: PersonTranslations
  quickLinks: QuickLinksTranslations
  researchAreas: ResearchAreasTranslations
  awards: AwardsTranslations
  events: EventsTranslations
  publications: PublicationsTranslations
  research: ResearchTranslations
  teaching: TeachingTranslations
  projects: ProjectsTranslations
  vacancies: VacanciesTranslations
  auth: AuthTranslations
  forms: FormsTranslations
  dashboard: DashboardTranslations
}

export const translations: Record<LanguageCode, Translations> = {
  fr: {
    navigation: navigationTranslations.fr,
    hero: heroTranslations.fr,
    stats: statsTranslations.fr,
    common: commonTranslations.fr,
    footer: footerTranslations.fr,
    person: personTranslations.fr,
    quickLinks: quickLinksTranslations.fr,
    researchAreas: researchAreasTranslations.fr,
    awards: awardsTranslations.fr,
    events: eventsTranslations.fr,
    publications: publicationsTranslations.fr,
    research: researchTranslations.fr,
    teaching: teachingTranslations.fr,
    projects: projectsTranslations.fr,
    vacancies: vacanciesTranslations.fr,
    auth: authTranslations.fr,
    forms: formsTranslations.fr,
    dashboard: dashboardTranslations.fr
  },
  en: {
    navigation: navigationTranslations.en,
    hero: heroTranslations.en,
    stats: statsTranslations.en,
    common: commonTranslations.en,
    footer: footerTranslations.en,
    person: personTranslations.en,
    quickLinks: quickLinksTranslations.en,
    researchAreas: researchAreasTranslations.en,
    awards: awardsTranslations.en,
    events: eventsTranslations.en,
    publications: publicationsTranslations.en,
    research: researchTranslations.en,
    teaching: teachingTranslations.en,
    projects: projectsTranslations.en,
    vacancies: vacanciesTranslations.en,
    auth: authTranslations.en,
    forms: formsTranslations.en,
    dashboard: dashboardTranslations.en
  }
}

// Re-export navigation items for convenience
export { navigationItems } from './navigation.translate'
export type { NavItem } from './navigation.translate'