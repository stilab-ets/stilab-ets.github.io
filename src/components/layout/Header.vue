<script setup lang="ts">
import { ref, watch } from 'vue'
import LogoButton from './header/LogoButton.vue'
import NavItems from './header/NavItems.vue'
import MobileMenuToggle from './header/MobileMenuToggle.vue'
import LanguageToggle from './header/LanguageToggle.vue'
import UserProfile from './header/UserProfile.vue'

interface LocalizedNavItem {
  id: string
  label: string
  icon: string
}

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
}

const props = defineProps<{
  currentPage: string
  navigationItems: LocalizedNavItem[]
  currentLanguage: string
  user?: User | null
}>()

const emit = defineEmits<{
  (e: 'setCurrentPage', page: string): void
  (e: 'languageChanged', language: string): void
  (e: 'userLogout'): void
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

const handleUserNavigation = (page: string) => {
  setCurrentPage(page)
}

const handleUserLogout = () => {
  emit('userLogout')
  mobileMenuOpen.value = false
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
      </div>
      
      <!-- Right section: User profile, Language toggle and mobile menu -->
      <div class="flex justify-end items-center space-x-2">
        <!-- Language toggle - visible on desktop only -->
        <LanguageToggle
          class="hidden xl:flex"
          :current-language="currentLanguage"
          @language-changed="handleLanguageChange"
        />
        
        <!-- User Profile - visible on desktop only -->
        <UserProfile
          class="hidden xl:flex"
          :user="user"
          @navigate="handleUserNavigation"
          @logout="handleUserLogout"
        />
         
        <!-- Mobile menu toggle - only visible on smaller screens -->
        <div class="xl:hidden">
          <MobileMenuToggle :open="mobileMenuOpen" @toggle="toggleMobileMenu" />
        </div>
      </div>
    </div>
   
    <!-- Mobile navigation dropdown -->
    <div v-if="mobileMenuOpen" class="xl:hidden bg-white border-t border-gray-200">
      <!-- User Profile Mobile -->
      <UserProfile
        :user="user"
        :is-mobile="true"
        @navigate="handleUserNavigation"
        @logout="handleUserLogout"
      />

      <div class="w-full flex justify-center">
        <div class="border border-gray-200 w-5/6 items-center"/>
      </div>
      <!-- Navigation Items -->
      <NavItems
        :items="navigationItems"
        :currentPage="internalCurrentPage"
        isMobile
        @navigate="setCurrentPage"
      />
      
      <!-- Language Toggle Mobile -->
      <LanguageToggle
        :current-language="currentLanguage"
        :is-mobile="true"
        :show-labels="true"
        @language-changed="handleLanguageChange"
      />
    </div>
  </nav>
</template>