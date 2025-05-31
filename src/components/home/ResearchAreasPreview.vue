<script setup lang="ts">
// Research areas data
const researchAreas = [
  {
    icon: '🏗️',
    title: 'Architecture Logicielle',
    description: 'Patterns et systèmes distribués'
  },
  {
    icon: '🤖',
    title: 'Intelligence Artificielle',
    description: 'IA appliquée au développement'
  },
  {
    icon: '🔒',
    title: 'Cybersécurité',
    description: 'Sécurité des systèmes'
  },
  {
    icon: '☁️',
    title: 'Cloud Computing',
    description: 'Solutions cloud-native'
  }
]
</script>

<template>
  <div class="bg-gray-50 py-16 sm:py-20">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12 sm:mb-16">
          <h2 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6">
            Nos <span class="text-[#08a4d4]">Domaines</span> d'Expertise
          </h2>
          <p class="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Nos recherches couvrent un large spectre du génie logiciel moderne et de l'intelligence artificielle
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div v-for="area in researchAreas" :key="area.title"
            class="bg-white rounded-xl p-6 sm:p-8 text-center shadow-sm hover:shadow-lg transition-shadow">
            <div class="text-3xl sm:text-4xl mb-3 sm:mb-4">{{ area.icon }}</div>
            <h3 class="font-semibold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">{{ area.title }}</h3>
            <p class="text-sm text-gray-600">{{ area.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>