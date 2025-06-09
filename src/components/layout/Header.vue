<script setup lang="ts">
import { ref } from 'vue'
import LogoButton from './header/LogoButton.vue'
import NavItems from './header/NavItems.vue'
import MobileMenuToggle from './header/MobileMenuToggle.vue'
import LanguageToggle from './header/LanguageToggle.vue'

interface NavItem {
  id: string
  label: string
  icon: string
}

// Updated interface for localized navigation items
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
  (e: 'languageChanged', language: string): void  // Add language change emit
}>()

const mobileMenuOpen = ref(false)

const setCurrentPage = (page: string) => {
  emit('setCurrentPage', page)
  mobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// Handle language changes from the language toggle component
const handleLanguageChange = (language: string) => {
  emit('languageChanged', language)
}
</script>

<template>
  <nav class="shadow-md sticky top-0 z-50 w-full bg-white opacity-100">
    <div class="flex mx-auto px-4">
      <!-- Left section: Logo - maintains existing position -->
      <div class="flex">
        <LogoButton @navigate="setCurrentPage" />
      </div>
      
      <!-- Center section: Main navigation and right utilities -->
      <!-- This restructuring creates proper space distribution -->
      <div class="flex w-full justify-between items-center xl:justify-center xl:w-11/12 py-3">
        <!-- Main navigation items - centered on larger screens -->
        <div class="flex">
          <NavItems :items="navigationItems" :currentPage="currentPage" @navigate="setCurrentPage" />
        </div>
        
        <!-- Right section: Language toggle and mobile menu -->
        <!-- This creates a balanced layout with utilities on the right -->
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
    
    <!-- Mobile navigation dropdown - includes language info when needed -->
    <div v-if="mobileMenuOpen" class="xl:hidden bg-white border-t border-gray-200">
      <NavItems :items="navigationItems" :currentPage="currentPage" isMobile @navigate="setCurrentPage" />
    </div>
  </nav>
</template>