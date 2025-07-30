import { ref, computed, readonly } from 'vue'
import { navigationItems, translations, type LanguageCode, type NavItem } from '@/data/translations'

// Global reactive language state
const currentLanguage = ref<LanguageCode>('en')

// Browser language detection utility
const detectBrowserLanguage = (): LanguageCode => {
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('fr')) return 'fr'
  return 'en' // Default to French
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

// Re-export types for convenience
export type { LanguageCode, NavItem }