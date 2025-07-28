<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

// Access translation system for footer content
const { t } = useLanguage()

// Contact information configuration - centralized for easy updates
interface ContactDetail {
  id: string
  icon: string
  content: string
  type: 'email' | 'phone' | 'address'
  ariaLabel: string
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

// Format contact content for display (handles multiline addresses)
const formatContactContent = (content: string, type: string): string => {
  if (type === 'address') {
    return content.replace(/\n/g, '<br>')
  }
  return content
}
</script>

<template>
  <div>
    <h3 class="text-lg font-semibold mb-6">{{ t.footer.contact.title }}</h3>
    <address class="not-italic">
      <ul class="space-y-3 text-gray-300">
        <li v-for="detail in contactDetails" :key="detail.id" class="flex items-start space-x-2">
          <span class="text-base mt-0.5" :aria-hidden="true">{{ detail.icon }}</span>
          <div class="flex-1">
            <span 
              v-if="detail.type === 'address'"
              v-html="formatContactContent(detail.content, detail.type)"
              :aria-label="detail.ariaLabel"
              class="leading-relaxed"
            ></span>
            <span 
              v-else
              :aria-label="detail.ariaLabel"
            >
              {{ detail.content }}
            </span>
          </div>
        </li>
      </ul>
    </address>
  </div>
</template>