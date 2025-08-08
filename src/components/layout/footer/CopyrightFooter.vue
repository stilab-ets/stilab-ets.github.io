<script setup lang="ts">
import { useFooterData } from '@/hooks/layout/useFooterData';

const { currentYear, t } = useFooterData();
</script>

<template>
  <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
    <p>
      &copy; {{ currentYear }} {{ t.footer.labInfo.labFullName }}.
      {{ t.footer.copyright }}
    </p>
  </div>
</template>
