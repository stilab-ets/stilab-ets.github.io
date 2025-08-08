<script setup lang="ts">
import { useFooterData } from '@/hooks/layout/useFooterData';

const { navigationLinks, t } = useFooterData();

const emit = defineEmits<(e: 'navigateToPage', page: string) => void>();

const handleNavigation = (page: string) => {
  emit('navigateToPage', page);
};
</script>

<template>
  <div>
    <h3 class="text-lg font-semibold mb-6">{{ t.footer.navigation.title }}</h3>
    <nav aria-label="Navigation rapide du pied de page">
      <ul class="space-y-3">
        <li v-for="link in navigationLinks" :key="link.id">
          <button
            class="text-gray-300 hover:text-white hover:cursor-pointer transition-colors text-left focus:outline-none focus:text-white"
            :aria-label="`Aller à la section ${link.label}`"
            @click="handleNavigation(link.page)"
          >
            {{ link.label }}
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
