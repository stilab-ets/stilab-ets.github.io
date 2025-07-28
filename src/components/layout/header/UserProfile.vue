<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: string
}

interface Props {
  user?: User | null
  isMobile?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isMobile: false
})

const emit = defineEmits<{
  navigate: [page: string]
  logout: []
}>()

const { t } = useLanguage()

// Internal state for dropdown visibility
const isDropdownOpen = ref(false)

// Mock user data (in real app, this would come from auth context)
const currentUser = computed(() => props.user || {
  id: '1',
  name: 'Dr. Sarah Chen',
  email: 'sarah.chen@univ.fr',
  avatar: undefined,
  role: 'Researcher'
})

// Profile menu items
const profileMenuItems = computed(() => [
  {
    id: 'dashboard',
    label: 'Tableau de bord',
    icon: '📊',
    action: () => handleNavigation('dashboard')
  },
  {
    id: 'profile',
    label: 'Mon profil',
    icon: '👤',
    action: () => handleNavigation('profile')
  },
  {
    id: 'settings',
    label: 'Paramètres',
    icon: '⚙️',
    action: () => handleNavigation('settings')
  },
  {
    id: 'publications',
    label: 'Mes publications',
    icon: '📚',
    action: () => handleNavigation('my-publications')
  }
])

// Toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// Close dropdown when clicking outside
const closeDropdown = () => {
  isDropdownOpen.value = false
}

// Handle navigation
const handleNavigation = (page: string) => {
  emit('navigate', page)
  isDropdownOpen.value = false
}

// Handle logout
const handleLogout = () => {
  emit('logout')
  isDropdownOpen.value = false
}

// Get user initials for avatar fallback
const getUserInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
</script>

<template>
  <!-- Mobile Layout: Full-width menu -->
  <div v-if="isMobile" class="border-t border-gray-200">
    <!-- User Info Section -->
    <div class="px-4 py-3 bg-gray-50">
      <div class="flex items-center space-x-3">
        <!-- Avatar -->
        <div class="flex-shrink-0">
          <img 
            v-if="currentUser.avatar" 
            :src="currentUser.avatar" 
            :alt="currentUser.name"
            class="h-10 w-10 rounded-full object-cover"
          />
          <div 
            v-else
            class="h-10 w-10 rounded-full bg-[#08a4d4] flex items-center justify-center text-white text-sm font-medium"
          >
            {{ getUserInitials(currentUser.name) }}
          </div>
        </div>
        
        <!-- User Details -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">{{ currentUser.name }}</p>
          <p class="text-xs text-gray-500 truncate">{{ currentUser.email }}</p>
          <p class="text-xs text-gray-400">{{ currentUser.role }}</p>
        </div>
      </div>
    </div>

    <!-- Menu Items -->
    <div class="py-2">
      <button
        v-for="item in profileMenuItems"
        :key="item.id"
        @click="item.action"
        class="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-[#08a4d4] transition-colors hover:cursor-pointer"
      >
        <span class="text-lg mr-3" aria-hidden="true">{{ item.icon }}</span>
        <span class="text-sm font-medium">{{ item.label }}</span>
      </button>
      
      <!-- Logout -->
      <button
        @click="handleLogout"
        class="flex items-center w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors hover:cursor-pointer"
      >
        <span class="text-lg mr-3" aria-hidden="true">🚪</span>
        <span class="text-sm font-medium">Déconnexion</span>
      </button>
    </div>
  </div>

  <!-- Desktop Layout: Dropdown -->
  <div v-else class="relative" @blur="closeDropdown">
    <!-- Profile Button -->
    <button
      @click="toggleDropdown"
      class="flex items-center space-x-2 px-3 py-2 hover:cursor-pointer text-gray-700 hover:text-[#08a4d4] transition-colors duration-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#08a4d4] focus:ring-opacity-50"
      :aria-expanded="isDropdownOpen"
      aria-haspopup="true"
      :aria-label="`Menu utilisateur pour ${currentUser.name}`"
    >
      <!-- Avatar -->
      <div class="flex-shrink-0">
        <img 
          v-if="currentUser.avatar" 
          :src="currentUser.avatar" 
          :alt="currentUser.name"
          class="h-8 w-8 rounded-full object-cover"
        />
        <div 
          v-else
          class="h-8 w-8 rounded-full bg-[#08a4d4] flex items-center justify-center text-white text-xs font-medium"
        >
          {{ getUserInitials(currentUser.name) }}
        </div>
      </div>
      
      <!-- User Name (hidden on small screens) -->
      <span class="hidden md:block text-sm font-medium truncate max-w-32">
        {{ currentUser.name.split(' ')[0] }}
      </span>
      
      <!-- Dropdown Arrow -->
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

    <!-- Dropdown Menu -->
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
        class="absolute right-0 mt-18 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
        role="menu"
        aria-orientation="vertical"
      >
        <!-- User Info Header -->
        <div class="px-4 py-3 border-b border-gray-100">
          <div class="flex items-center space-x-3">
            <!-- Avatar -->
            <div class="flex-shrink-0">
              <img 
                v-if="currentUser.avatar" 
                :src="currentUser.avatar" 
                :alt="currentUser.name"
                class="h-12 w-12 rounded-full object-cover"
              />
              <div 
                v-else
                class="h-12 w-12 rounded-full bg-[#08a4d4] flex items-center justify-center text-white text-sm font-medium"
              >
                {{ getUserInitials(currentUser.name) }}
              </div>
            </div>
            
            <!-- User Details -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">{{ currentUser.name }}</p>
              <p class="text-xs text-gray-500 truncate">{{ currentUser.email }}</p>
              <p class="text-xs text-gray-400">{{ currentUser.role }}</p>
            </div>
          </div>
        </div>

        <!-- Menu Items -->
        <div class="py-2">
          <button
            v-for="item in profileMenuItems"
            :key="item.id"
            @click="item.action"
            class="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 hover:text-[#08a4d4] transition-colors duration-150 hover:cursor-pointer"
            role="menuitem"
          >
            <span class="text-base mr-3" aria-hidden="true">{{ item.icon }}</span>
            <span class="text-sm font-medium">{{ item.label }}</span>
          </button>
        </div>

        <!-- Logout Section -->
        <div class="border-t border-gray-100 py-2">
          <button
            @click="handleLogout"
            class="flex items-center w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors duration-150 hover:cursor-pointer"
            role="menuitem"
          >
            <span class="text-base mr-3" aria-hidden="true">🚪</span>
            <span class="text-sm font-medium">Déconnexion</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>