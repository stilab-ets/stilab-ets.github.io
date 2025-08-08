<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ open: boolean }>();

const emit = defineEmits<(e: 'toggle') => void>();

const toggle = () => emit('toggle');
</script>

<template>
  <button
    class="flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#08a4d4] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#08a4d4] cursor-pointer"
    @click="toggle"
  >
    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        v-if="!props.open"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
      <path
        v-else
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</template>
