<script setup lang="ts">
import { ref, computed } from 'vue'

// Language configuration - centralized for easy maintenance and expansion
interface Language {
  code: string
  label: string
  flag: string
  ariaLabel: string
}

const availableLanguages: Language[] = [
  { 
    code: 'fr', 
    label: 'Français', 
    flag: '🇫🇷', 
    ariaLabel: 'Basculer vers le français' 
  },
  { 
    code: 'en', 
    label: 'English', 
    flag: '🇬🇧', 
    ariaLabel: 'Switch to English' 
  }
]

// Props to receive current language from parent
const props = defineProps<{
  currentLanguage?: string
}>()

// Emit language change events to parent component
const emit = defineEmits<(e: 'languageChanged', language: string) => void>()

// Internal state for dropdown visibility
const isDropdownOpen = ref(false)

// Computed property to find current language object
// This makes it easy to display current language info in the toggle button
const currentLang = computed(() => {
  return availableLanguages.find(lang => lang.code === props.currentLanguage) || availableLanguages[0]
})

// Computed property to get available languages (excluding current)
// This keeps the dropdown clean by not showing the currently selected language
const otherLanguages = computed(() => {
  return availableLanguages.filter(lang => lang.code !== props.currentLanguage)
})

// Handle language selection and emit to parent
const selectLanguage = (languageCode: string) => {
  emit('languageChanged', languageCode)
  isDropdownOpen.value = false // Close dropdown after selection
}

// Toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// Close dropdown when clicking outside (for better UX)
const closeDropdown = () => {
  isDropdownOpen.value = false
}
</script>

<template>
  <div class="relative" @blur="closeDropdown">
    <!-- Main language toggle button - displays current language -->
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-2 px-3 py-2 hover:cursor-pointer text-gray-700 hover:text-[#08a4d4] transition-colors duration-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#08a4d4] focus:ring-opacity-50"
      :aria-label="currentLang.ariaLabel"
      :aria-expanded="isDropdownOpen"
      aria-haspopup="true"
    >
      <!-- Current language flag and code -->
      <span class="text-lg" aria-hidden="true">{{ currentLang.flag }}</span>
      <span class="text-sm font-medium uppercase tracking-wide">{{ currentLang.code }}</span>
      
      <!-- Dropdown indicator arrow -->
      <svg 
        class="w-4 h-4 transition-transform duration-200" 
        :class="{ 'rotate-180': isDropdownOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Language dropdown menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isDropdownOpen"
        class="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 hover:cursor-pointer"
        role="menu"
        aria-orientation="vertical"
      >
        <!-- Language options (excluding current language) -->
        <button
          v-for="language in otherLanguages"
          :key="language.code"
          @click="selectLanguage(language.code)"
          class="flex items-center space-x-3 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 hover:text-[#08a4d4] transition-colors duration-150 hover:cursor-pointer"
          role="menuitem"
          :aria-label="language.ariaLabel"
        >
          <span class="text-lg" aria-hidden="true">{{ language.flag }}</span>
          <span class="text-sm font-medium">{{ language.label }}</span>
        </button>
      </div>
    </transition>
  </div>
</template>