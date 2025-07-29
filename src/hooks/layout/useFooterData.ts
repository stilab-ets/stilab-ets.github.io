import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

interface ContactDetail {
  id: string
  icon: string
  content: string
  type: 'email' | 'phone' | 'address'
  ariaLabel: string
}


export function useFooterData() {

  const { t } = useLanguage()
  
  interface NavigationLink {
    id: string
    labelKey: keyof typeof t.value.footer.navigation.links
    page: string
  }
  
  const contactDetails: ContactDetail[] = [
    {
      id: 'email',
      icon: '📧',
      content: 'ali.ouni@etsmtl.ca',
      type: 'email',
      ariaLabel: 'Adresse email du laboratoire'
    },
    {
      id: 'phone',
      icon: '📞',
      content: '+1 514-396-8739',
      type: 'phone',
      ariaLabel: 'Numéro de téléphone du laboratoire'
    },
    {
      id: 'address',
      icon: '📍',
      content: ' 1100 rue Notre-Dame Ouest, Montreal',
      type: 'address',
      ariaLabel: 'Adresse du laboratoire'
    }
  ]

  const navigationLinksConfig: NavigationLink[] = [
    { id: 'team', labelKey: 'team', page: 'people' },
    { id: 'research', labelKey: 'research', page: 'research' },
    { id: 'publications', labelKey: 'publications', page: 'publications' },
    { id: 'events', labelKey: 'events', page: 'events' }
  ]

  const navigationLinks = computed(() => 
    navigationLinksConfig.map(link => ({
      ...link,
      label: t.value.footer.navigation.links[link.labelKey]
    }))
  )

  const currentYear = computed(() => new Date().getFullYear())

  const formatContactContent = (content: string, type: string): string => {
    if (type === 'address') {
      return content.replace(/\n/g, '<br>')
    }
    return content
  }

  return {
    contactDetails,
    navigationLinks,
    currentYear,
    formatContactContent,
    t
  }
}