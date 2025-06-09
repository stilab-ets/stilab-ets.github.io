import { NavigationTranslations, navigationTranslations } from './navigation.translate'
import { HeroTranslations, heroTranslations } from './hero.translate'
import { StatsTranslations, statsTranslations } from './stats.translate'
import { CommonTranslations, commonTranslations } from './common.translate'
import { FooterTranslations, footerTranslations } from './footer.translate'
import { PersonTranslations, personTranslations } from './person.translate'
import { QuickLinksTranslations, quickLinksTranslations } from './quickLinks.translate'
import { ResearchAreasTranslations, researchAreasTranslations } from './researchAreas.translate'

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
    researchAreas: researchAreasTranslations.fr
  },
  en: {
    navigation: navigationTranslations.en,
    hero: heroTranslations.en,
    stats: statsTranslations.en,
    common: commonTranslations.en,
    footer: footerTranslations.en,
    person: personTranslations.en,
    quickLinks: quickLinksTranslations.en,
    researchAreas: researchAreasTranslations.en
  }
}

// Re-export navigation items for convenience
export { navigationItems } from './navigation.translate'
export type { NavItem } from './navigation.translate'