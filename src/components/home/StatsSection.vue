<script setup lang="ts">
// Props
interface Props {
  labStats: {
    members: number
    publications: number
    projects: number
    awards: number
  }
}

defineProps<Props>()
</script>

<template>
  <div class="bg-white py-16 sm:py-20">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          Le laboratoire en chiffres
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div class="text-center">
            <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#08a4d4] mb-2 sm:mb-3">
              {{ labStats.members }}+
            </div>
            <div class="text-gray-600 text-sm sm:text-base lg:text-lg">Membres de l'équipe</div>
          </div>
          <div class="text-center">
            <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#08a4d4] mb-2 sm:mb-3">
              {{ labStats.publications }}+
            </div>
            <div class="text-gray-600 text-sm sm:text-base lg:text-lg">Publications</div>
          </div>
          <div class="text-center">
            <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#08a4d4] mb-2 sm:mb-3">
              {{ labStats.projects }}+
            </div>
            <div class="text-gray-600 text-sm sm:text-base lg:text-lg">Projets actifs</div>
          </div>
          <div class="text-center">
            <div class="text-3xl sm:text-4xl md:text-5xl font-bold text-[#08a4d4] mb-2 sm:mb-3">
              {{ labStats.awards }}+
            </div>
            <div class="text-gray-600 text-sm sm:text-base lg:text-lg">Prix reçus</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>