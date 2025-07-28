<script setup lang="ts">
// Import decomposed footer components following modular architecture
import LabInfo from './footer/LabInfo.vue'
import QuickLinks from './footer/QuickLinks.vue'
import ContactInfo from './footer/ContactInfo.vue'
import CopyrightFooter from './footer/CopyrightFooter.vue'

// Define emits for parent component communication
const emit = defineEmits<(e: 'setCurrentPage', page: string) => void>()

// Handle page navigation from child components
// This acts as a coordinator, receiving events from QuickLinks and forwarding to parent
const handlePageNavigation = (page: string) => {
  emit('setCurrentPage', page)
}
</script>

<template>
  <!-- Main footer container with responsive design -->
  <footer class="bg-gray-900 text-white py-16" role="contentinfo" aria-label="Informations du laboratoire STIL">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <!-- Main footer content grid - responsive layout for different screen sizes -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Lab information section - takes 2 columns on desktop for prominence -->
          <LabInfo />
          
          <!-- Navigation links section - provides quick access to main site sections -->
          <QuickLinks @navigate-to-page="handlePageNavigation" />
          
          <!-- Contact information section - essential contact details -->
          <ContactInfo />
        </div>

        <!-- Copyright section - separated visually with border and centered -->
        <CopyrightFooter />
      </div>
    </div>
  </footer>
</template>