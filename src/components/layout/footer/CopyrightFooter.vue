<script setup lang="ts">
// Copyright configuration - centralized for easy annual updates
const currentYear = new Date().getFullYear()
const organizationName = 'Software Technology and Intelligence Research Lab (STIL)'
const copyrightText = 'Tous droits réservés.'
</script>

<template>
  <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
    <p>
      &copy; {{ currentYear }} {{ organizationName }}. {{ copyrightText }}
    </p>
  </div>
</template>