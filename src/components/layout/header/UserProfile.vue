<script setup lang="ts">
import { ref } from 'vue';
import { User, Settings, LogOut, Shield, BookOpen } from 'lucide-vue-next';
import { useAuth } from '@/hooks/auth/useAuth';
import { useLanguage } from '@/composables/useLanguage';
import { MemberUser } from '@/services/user.types';

const props = defineProps<{
  user: MemberUser | null;
}>();

const emit = defineEmits<{
  navigate: [pageId: string];
}>();

const { isAuthenticated, displayName, userInitials, isAdmin, logout } =
  useAuth();

const { t } = useLanguage();

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const handleNavigation = (pageId: string) => {
  emit('navigate', pageId);
  closeDropdown();
};

const handleLogin = () => {
  emit('navigate', 'login');
};

const handleLogout = async () => {
  await logout();
  emit('navigate', 'home');
  closeDropdown();
};

// Fallback display name using either auth hook or prop
const fallbackDisplayName =
  displayName.value ||
  (props.user
    ? `${props.user.first_name} ${props.user.last_name}`.trim()
    : '') ||
  props.user?.user?.username ||
  'User';

const fallbackEmail = props.user?.email || props.user?.user?.username || '';
</script>

<template>
  <div class="relative">
    <!-- Not authenticated - Login button -->
    <button
      v-if="!isAuthenticated"
      @click="handleLogin"
      class="flex items-center hover:cursor-pointer space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#08a4d4] transition-colors duration-200"
    >
      <User class="h-4 w-4" />
      <span>{{ t.auth.login.title }}</span>
    </button>

    <!-- Authenticated - User dropdown -->
    <div v-else class="relative">
      <button
        @click="toggleDropdown"
        class="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#08a4d4] transition-colors duration-200 bg-white rounded-lg border border-gray-200 hover:border-[#08a4d4] focus:outline-none focus:ring-2 focus:ring-[#08a4d4] focus:ring-offset-2"
        :aria-expanded="isDropdownOpen"
        aria-haspopup="true"
      >
        <div
          class="w-8 h-8 bg-[#08a4d4] rounded-full flex items-center justify-center"
        >
          <span class="text-white text-sm font-semibold">
            {{ userInitials }}
          </span>
        </div>
        <span class="hidden md:block">{{ fallbackDisplayName }}</span>
        <svg
          class="h-4 w-4 transition-transform duration-200"
          :class="{ 'rotate-180': isDropdownOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <!-- Dropdown menu -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-if="isDropdownOpen"
          class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          role="menu"
          @click.stop
        >
          <!-- User info -->
          <div class="px-4 py-3 border-b border-gray-100">
            <p class="text-sm font-medium text-gray-900">
              {{ fallbackDisplayName }}
            </p>
            <p class="text-sm text-gray-500">{{ fallbackEmail }}</p>
          </div>

          <!-- Menu items -->
          <div class="py-1">
            <button
              @click="handleNavigation('dashboard')"
              class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#08a4d4] transition-colors duration-200"
              role="menuitem"
            >
              <BookOpen class="h-4 w-4 mr-3" />
              Dashboard
            </button>

            <button
              @click="handleNavigation('user-settings')"
              class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#08a4d4] transition-colors duration-200"
              role="menuitem"
            >
              <Settings class="h-4 w-4 mr-3" />
              Settings
            </button>

            <button
              v-if="isAdmin"
              @click="handleNavigation('admin-management')"
              class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#08a4d4] transition-colors duration-200"
              role="menuitem"
            >
              <Shield class="h-4 w-4 mr-3" />
              Admin
            </button>
          </div>

          <!-- Logout -->
          <div class="border-t border-gray-100 py-1">
            <button
              @click="handleLogout"
              class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
              role="menuitem"
            >
              <LogOut class="h-4 w-4 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </transition>

      <!-- Overlay to close dropdown -->
      <div
        v-if="isDropdownOpen"
        class="fixed inset-0 z-40"
        @click="closeDropdown"
      ></div>
    </div>
  </div>
</template>
