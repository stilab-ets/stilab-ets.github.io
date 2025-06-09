<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

// Access translation system for footer content
const { t } = useLanguage()

// Copyright configuration - centralized for easy annual updates
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
    <p>
      &copy; {{ currentYear }} {{ t.footer.labInfo.labFullName }}. {{ t.footer.copyright }}
    </p>
  </div>
</template>