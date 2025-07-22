<script setup lang="ts">
import LabInfo from './footer/LabInfo.vue'
import QuickLinks from './footer/QuickLinks.vue'
import ContactInfo from './footer/ContactInfo.vue'
import CopyrightFooter from './footer/CopyrightFooter.vue'

const emit = defineEmits<(e: 'setCurrentPage', page: string) => void>()

const handlePageNavigation = (page: string) => {
  emit('setCurrentPage', page)
}
</script>

<template>
  <footer class="bg-gray-900 text-white py-16" role="contentinfo" aria-label="Informations du laboratoire STIL">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <LabInfo />
          <QuickLinks @navigate-to-page="handlePageNavigation" />
          <ContactInfo />
        </div>
        <CopyrightFooter />
      </div>
    </div>
  </footer>
</template>