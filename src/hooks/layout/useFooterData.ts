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
      content: 'contact@stil-lab.fr',
      type: 'email',
      ariaLabel: 'Adresse email du laboratoire'
    },
    {
      id: 'phone',
      icon: '📞',
      content: '+33 1 23 45 67 89',
      type: 'phone',
      ariaLabel: 'Numéro de téléphone du laboratoire'
    },
    {
      id: 'address',
      icon: '📍',
      content: 'Université de Recherche\nBâtiment Informatique\n75000 Paris',
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