import { ref, computed, readonly } from 'vue'

// Language code type for type safety
export type LanguageCode = 'en' | 'fr'

// Navigation item structure with multilingual support
export interface NavItem {
  id: string
  label: Record<LanguageCode, string>
  icon: string
}

// Translation structure for all app content
export interface Translations {
  navigation: {
    home: string
    people: string
    research: string
    publications: string
    teaching: string
    events: string
    projects: string
    vacancies: string
    awards: string
  }
  hero: {
    title: {
      line1: string
      line2: string
      line3: string
    }
    subtitle: string
    cta: {
      research: string
      team: string
    }
    highlights: {
      ai: {
        title: string
        description: string
      }
      systems: {
        title: string
        description: string
      }
      security: {
        title: string
        description: string
      }
    }
    activity: string
  }
  stats: {
    sectionTitle: string
    members: string
    publications: string
    projects: string
    awards: string
  }
  common: {
    loading: string
    error: string
    backToTop: string
    readMore: string
    contact: string
    email: string
    phone: string
    address: string
  }
  footer: {
    labDescription: string
    navigation: string
    contact: string
    copyright: string
  }
}

// Complete translation definitions for both languages
const translations: Record<LanguageCode, Translations> = {
  fr: {
    navigation: {
      home: 'Accueil',
      people: 'Équipe', 
      research: 'Recherche',
      publications: 'Publications',
      teaching: 'Enseignement',
      events: 'Événements',
      projects: 'Projets M2',
      vacancies: 'Recrutements',
      awards: 'Prix'
    },
    hero: {
      title: {
        line1: 'Innovation en',
        line2: 'Génie Logiciel',
        line3: '& Intelligence'
      },
      subtitle: 'Laboratoire de recherche dédié à l\'innovation en génie logiciel, intelligence artificielle et technologies de pointe.',
      cta: {
        research: 'Découvrir nos recherches',
        team: 'Rencontrer l\'équipe'
      },
      highlights: {
        ai: {
          title: 'Intelligence Artificielle',
          description: 'Recherche de pointe en IA'
        },
        systems: {
          title: 'Systèmes Distribués',
          description: 'Architecture haute performance'
        },
        security: {
          title: 'Cybersécurité',
          description: 'Sécurité des systèmes'
        }
      },
      activity: 'Recherche active en cours...'
    },
    stats: {
      sectionTitle: 'Le laboratoire en chiffres',
      members: 'Membres',
      publications: 'Publications',
      projects: 'Projets',
      awards: 'Prix'
    },
    common: {
      loading: 'Chargement...',
      error: 'Une erreur est survenue',
      backToTop: 'Retour en haut',
      readMore: 'Lire la suite',
      contact: 'Contact',
      email: 'Email',
      phone: 'Téléphone',
      address: 'Adresse'
    },
    footer: {
      labDescription: 'Laboratoire de recherche dédié à l\'innovation en génie logiciel, intelligence artificielle et technologies de pointe.',
      navigation: 'Navigation',
      contact: 'Contact',
      copyright: 'Tous droits réservés.'
    }
  },
  en: {
    navigation: {
      home: 'Home',
      people: 'Team',
      research: 'Research', 
      publications: 'Publications',
      teaching: 'Teaching',
      events: 'Events',
      projects: 'MSc Projects',
      vacancies: 'Vacancies',
      awards: 'Awards'
    },
    hero: {
      title: {
        line1: 'Innovation in',
        line2: 'Software Engineering',
        line3: '& Intelligence'
      },
      subtitle: 'Research laboratory dedicated to innovation in software engineering, artificial intelligence and cutting-edge technologies.',
      cta: {
        research: 'Explore our research',
        team: 'Meet the team'
      },
      highlights: {
        ai: {
          title: 'Artificial Intelligence',
          description: 'Cutting-edge AI research'
        },
        systems: {
          title: 'Distributed Systems',
          description: 'High-performance architecture'
        },
        security: {
          title: 'Cybersecurity',
          description: 'Systems security'
        }
      },
      activity: 'Active research ongoing...'
    },
    stats: {
      sectionTitle: 'Our laboratory in numbers',
      members: 'Members',
      publications: 'Publications', 
      projects: 'Projects',
      awards: 'Awards'
    },
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      backToTop: 'Back to top',
      readMore: 'Read more',
      contact: 'Contact',
      email: 'Email',
      phone: 'Phone',
      address: 'Address'
    },
    footer: {
      labDescription: 'Research laboratory dedicated to innovation in software engineering, artificial intelligence and cutting-edge technologies.',
      navigation: 'Navigation',
      contact: 'Contact',
      copyright: 'All rights reserved.'
    }
  }
}

// Navigation items with multilingual labels
const navigationItems: NavItem[] = [
  { id: 'home', label: { fr: 'Accueil', en: 'Home' }, icon: '🏠' },
  { id: 'people', label: { fr: 'Équipe', en: 'Team' }, icon: '👥' },
  { id: 'research', label: { fr: 'Recherche', en: 'Research' }, icon: '🔬' },
  { id: 'publications', label: { fr: 'Publications', en: 'Publications' }, icon: '📚' },
  { id: 'teaching', label: { fr: 'Enseignement', en: 'Teaching' }, icon: '🎓' },
  { id: 'events', label: { fr: 'Événements', en: 'Events' }, icon: '📅' },
  { id: 'projects', label: { fr: 'Projets M2', en: 'MSc Projects' }, icon: '🎯' },
  { id: 'vacancies', label: { fr: 'Recrutements', en: 'Vacancies' }, icon: '💼' },
  { id: 'awards', label: { fr: 'Prix', en: 'Awards' }, icon: '🏆' }
]

// Global reactive language state
const currentLanguage = ref<LanguageCode>('fr')

// Browser language detection utility
const detectBrowserLanguage = (): LanguageCode => {
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('en')) return 'en'
  return 'fr' // Default to French
}

// Initialize language from localStorage or browser preference
const initializeLanguage = (): LanguageCode => {
  try {
    const savedLang = localStorage.getItem('stil-lab-language') as LanguageCode
    if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
      return savedLang
    }
  } catch (error) {
    console.warn('Failed to read language from localStorage:', error)
  }
  return detectBrowserLanguage()
}

// Set initial language
currentLanguage.value = initializeLanguage()

/**
 * Language management composable
 * Provides reactive language state and translation utilities
 */
export const useLanguage = () => {
  // Computed property for current translations
  const t = computed(() => translations[currentLanguage.value])
  
  // Computed property for current navigation items with proper labels
  const localizedNavigationItems = computed(() => 
    navigationItems.map(item => ({
      id: item.id,
      label: item.label[currentLanguage.value],
      icon: item.icon
    }))
  )

  // Language switching function with persistence
  const setLanguage = (language: LanguageCode) => {
    if (language !== currentLanguage.value) {
      currentLanguage.value = language
      
      // Persist language preference
      try {
        localStorage.setItem('stil-lab-language', language)
      } catch (error) {
        console.warn('Failed to save language to localStorage:', error)
      }
      
      // Update document language attribute for accessibility
      document.documentElement.lang = language
      
      // Dispatch custom event for components that need to react to language changes
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language } 
      }))
    }
  }

  // Translation helper function for dynamic keys
  const translate = (key: string, fallback?: string): string => {
    const keys = key.split('.')
    let value: any = t.value
    
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) break
    }
    
    return value ?? fallback ?? key
  }

  // Format number/stat with proper locale
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat(currentLanguage.value === 'fr' ? 'fr-FR' : 'en-US').format(num)
  }

  // Format date with proper locale
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat(
      currentLanguage.value === 'fr' ? 'fr-FR' : 'en-US',
      { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }
    ).format(date)
  }

  // Return readonly current language and all utilities
  return {
    currentLanguage: readonly(currentLanguage),
    t,
    localizedNavigationItems,
    setLanguage,
    translate,
    formatNumber,
    formatDate,
    isEnglish: computed(() => currentLanguage.value === 'en'),
    isFrench: computed(() => currentLanguage.value === 'fr')
  }
}