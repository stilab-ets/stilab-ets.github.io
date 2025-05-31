<script setup lang="ts">
// Emits
const emit = defineEmits<(e: 'setCurrentPage', page: string) => void>()

// Methods
const setCurrentPage = (page: string) => {
  emit('setCurrentPage', page)
}

// Quick links data
const quickLinks = [
  {
    page: 'publications',
    icon: '📚',
    title: 'Dernières Publications',
    description: 'Découvrez nos travaux de recherche récents',
    bgColor: 'bg-blue-50 hover:bg-blue-100'
  },
  {
    page: 'events',
    icon: '📅',
    title: 'Événements à Venir',
    description: 'Séminaires, workshops et soutenances',
    bgColor: 'bg-green-50 hover:bg-green-100'
  },
  {
    page: 'vacancies',
    icon: '💼',
    title: 'Nous Rejoindre',
    description: 'Opportunités de doctorat et post-doctorat',
    bgColor: 'bg-purple-50 hover:bg-purple-100'
  }
]
</script>

<template>
  <div class="bg-white py-16 sm:py-20">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12 sm:mb-16">
          <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6">
            Accès <span class="text-[#08a4d4]">Rapide</span>
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <button v-for="link in quickLinks" :key="link.page" @click="setCurrentPage(link.page)" :class="[
            'rounded-xl p-6 sm:p-8 text-left transition-colors group',
            link.bgColor
          ]">
            <div class="text-3xl sm:text-4xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
              {{ link.icon }}
            </div>
            <h3 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{{ link.title }}</h3>
            <p class="text-sm sm:text-base text-gray-600">{{ link.description }}</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>