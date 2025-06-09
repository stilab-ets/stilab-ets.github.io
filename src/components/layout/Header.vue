<script setup lang="ts">
import { ref, watch } from 'vue'
import LogoButton from './header/LogoButton.vue'
import NavItems from './header/NavItems.vue'
import MobileMenuToggle from './header/MobileMenuToggle.vue'
import LanguageToggle from './header/LanguageToggle.vue'

interface LocalizedNavItem {
  id: string
  label: string
  icon: string
}

const props = defineProps<{
  currentPage: string
  navigationItems: LocalizedNavItem[]
  currentLanguage: string
}>()

const emit = defineEmits<{
  (e: 'setCurrentPage', page: string): void
  (e: 'languageChanged', language: string): void
}>()

// Internal reactive state for current page
const internalCurrentPage = ref(props.currentPage)
const mobileMenuOpen = ref(false)

// Watch for prop changes and update internal state
watch(() => props.currentPage, (newPage) => {
  internalCurrentPage.value = newPage
}, { immediate: true })

const setCurrentPage = (page: string) => {
  // Update internal state immediately for responsive UI
  internalCurrentPage.value = page
  // Emit to parent
  emit('setCurrentPage', page)
  // Close mobile menu
  mobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const handleLanguageChange = (language: string) => {
  emit('languageChanged', language)
}
</script>

<template>
  <nav class="shadow-md sticky top-0 z-50 w-full bg-white opacity-100">
    <div class="flex mx-auto px-4">
      <!-- Left section: Logo -->
      <div class="flex">
        <LogoButton @navigate="setCurrentPage" />
      </div>
      
      <!-- Center section: Main navigation and right utilities -->
      <div class="flex w-full justify-between items-center xl:justify-center xl:w-11/12 py-3">
        <!-- Main navigation items - centered on larger screens -->
        <div class="flex">
          <NavItems 
            :items="navigationItems" 
            :currentPage="internalCurrentPage" 
            @navigate="setCurrentPage" 
          />
        </div>
        
        <!-- Right section: Language toggle and mobile menu -->
        <div class="flex items-center space-x-2">
          <!-- Language toggle - visible on all screen sizes -->
          <LanguageToggle 
            :current-language="currentLanguage" 
            @language-changed="handleLanguageChange" 
          />
          
          <!-- Mobile menu toggle - only visible on smaller screens -->
          <div class="xl:hidden">
            <MobileMenuToggle :open="mobileMenuOpen" @toggle="toggleMobileMenu" />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mobile navigation dropdown -->
    <div v-if="mobileMenuOpen" class="xl:hidden bg-white border-t border-gray-200">
      <NavItems 
        :items="navigationItems" 
        :currentPage="internalCurrentPage" 
        isMobile 
        @navigate="setCurrentPage" 
      />
    </div>
  </nav>
</template>