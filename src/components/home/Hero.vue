<script setup lang="ts">
// Emits
const emit = defineEmits<(e: 'setCurrentPage', page: string) => void>()

// Methods
const setCurrentPage = (page: string) => {
  emit('setCurrentPage', page)
}
</script>

<template>
  <div class="bg-white text-gray-900">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold mb-6 sm:mb-8">
          Software Technology & <span class="text-[#08a4d4]">Intelligence</span>
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-gray-900 leading-relaxed max-w-3xl mx-auto">
          Laboratoire de recherche en génie logiciel, intelligence artificielle et technologies innovantes
        </p>
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <button @click="setCurrentPage('research')"
            class="px-6 sm:px-8 py-3 sm:py-4 bg-[#08a4d4] text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors text-base sm:text-lg">
            Découvrir nos recherches
          </button>
          <button @click="setCurrentPage('people')"
            class="px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#08a4d4] text-[#08a4d4] rounded-lg font-semibold hover:bg-[#08a4d4] hover:text-white transition-colors text-base sm:text-lg">
            Rencontrer l'équipe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>