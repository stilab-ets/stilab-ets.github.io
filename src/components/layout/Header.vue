<script setup lang="ts">
import { ref } from 'vue'
import LogoButton from './header/LogoButton.vue'
import NavItems from './header/NavItems.vue'
import MobileMenuToggle from './header/MobileMenuToggle.vue'

interface NavItem {
  id: string
  label: string
  icon: string
}

const props = defineProps<{
  currentPage: string
  navigationItems: NavItem[]
}>()

const emit = defineEmits<(e: 'setCurrentPage', page: string) => void>()

const mobileMenuOpen = ref(false)

const setCurrentPage = (page: string) => {
  emit('setCurrentPage', page)
  mobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<template>
  <nav class="shadow-md sticky top-0 z-50 w-full" style="background-color: var(--color-primary)">
    <div class="flex mx-auto px-4">
      <div class="flex">
        <LogoButton @navigate="setCurrentPage" />
      </div>
      <div class="flex w-full justify-end items-center xl:justify-center xl:w-11/12 py-3">
        <div class="flex">
          <NavItems :items="navigationItems" :currentPage="currentPage" @navigate="setCurrentPage" />
        </div>

        <div class="flex justify-end items-center xl:hidden">
          <MobileMenuToggle :open="mobileMenuOpen" @toggle="toggleMobileMenu" />
        </div>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="xl:hidden bg-white border-t border-gray-200">
      <NavItems :items="navigationItems" :currentPage="currentPage" isMobile @navigate="setCurrentPage" />
    </div>
  </nav>
</template>
