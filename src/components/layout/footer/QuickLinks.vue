<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

// Access translation system for footer content
const { t } = useLanguage()

// Navigation links configuration - using translations
interface NavigationLink {
  id: string
  labelKey: keyof typeof t.value.footer.navigation.links
  page: string
}

const navigationLinksConfig: NavigationLink[] = [
  { id: 'team', labelKey: 'team', page: 'people' },
  { id: 'research', labelKey: 'research', page: 'research' },
  { id: 'publications', labelKey: 'publications', page: 'publications' },
  { id: 'events', labelKey: 'events', page: 'events' }
]

// Computed navigation links with translated labels
const navigationLinks = computed(() => 
  navigationLinksConfig.map(link => ({
    ...link,
    label: t.value.footer.navigation.links[link.labelKey]
  }))
)

// Emit definition for page navigation
const emit = defineEmits<(e: 'navigateToPage', page: string) => void>()

// Handle navigation clicks and emit to parent
const handleNavigation = (page: string) => {
  emit('navigateToPage', page)
}
</script>

<template>
  <div>
    <h3 class="text-lg font-semibold mb-6">{{ t.footer.navigation.title }}</h3>
    <nav aria-label="Navigation rapide du pied de page">
      <ul class="space-y-3">
        <li v-for="link in navigationLinks" :key="link.id">
          <button 
            @click="handleNavigation(link.page)"
            class="text-gray-300 hover:text-white hover:cursor-pointer transition-colors text-left focus:outline-none focus:text-white"
            :aria-label="`Aller à la section ${link.label}`"
          >
            {{ link.label }}
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>