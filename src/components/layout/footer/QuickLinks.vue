<script setup lang="ts">
// Navigation links configuration - centralized for maintainability
interface NavigationLink {
  id: string
  label: string
  page: string
}

const navigationLinks: NavigationLink[] = [
  { id: 'team', label: 'Équipe', page: 'people' },
  { id: 'research', label: 'Recherche', page: 'research' },
  { id: 'publications', label: 'Publications', page: 'publications' },
  { id: 'events', label: 'Événements', page: 'events' }
]

// Emit definition for page navigation
const emit = defineEmits<(e: 'navigateToPage', page: string) => void>()

// Handle navigation clicks and emit to parent
const handleNavigation = (page: string) => {
  emit('navigateToPage', page)
}
</script>

<template>
  <div>
    <h3 class="text-lg font-semibold mb-6">Navigation</h3>
    <nav aria-label="Navigation rapide du pied de page">
      <ul class="space-y-3">
        <li v-for="link in navigationLinks" :key="link.id">
          <button 
            @click="handleNavigation(link.page)"
            class="text-gray-300 hover:text-white transition-colors text-left focus:outline-none focus:text-white"
            :aria-label="`Aller à la section ${link.label}`"
          >
            {{ link.label }}
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>