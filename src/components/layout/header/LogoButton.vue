<script setup lang="ts">
import { defineEmits } from 'vue'
const emit = defineEmits<(e: 'navigate', page: string) => void>()

const onClick = () => emit('navigate', 'home')
</script>

<template>
  <button @click="onClick" class="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
    <div
      class="w-12 h-10 mr-2 sm:w-12 sm:h-12 bg-gradient-to-br from-[#08a4d4] to-blue-600 rounded-lg flex items-center justify-center">
      <span class="text-white text-lg sm:text-xl font-bold">🧪</span>
    </div>
    <div class="block mr-2 text-left">
      <h1 class="text-xl lg:text-2xl font-bold text-gray-900">STIL</h1>
    </div>
  </button>
</template>
