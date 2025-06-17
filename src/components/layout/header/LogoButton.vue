<script setup lang="ts">
import { defineEmits } from 'vue'
import stilLogo from '@/assets/stil-logo.png'

const emit = defineEmits<(e: 'navigate', page: string) => void>()

const onClick = () => emit('navigate', 'home')
</script>

<template>
  <button @click="onClick" class="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
    <div
      class="w-12 h-12 mr-2 sm:w-18 sm:h-18 rounded-lg flex items-center justify-center">
      <img
        :src="stilLogo"
        alt="STIL company logo"
        aria-describedby="stil-logo-desc"
      />
    </div>
    
    <div class="block mr-2 text-left">
      <h1 class="text-xl lg:text-2xl font-bold text-gray-900">STIL</h1>
    </div>
  </button>
</template>
