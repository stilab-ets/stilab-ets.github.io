<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage';
import stilLogo from '@/assets/stil-logo.png';
import { ref, onMounted } from 'vue';
import { usePublications } from '@/hooks/publications/usePublications';
import { useResearch } from '@/hooks/useResearch';
import { useProjects } from '@/hooks/projects/useProjects';

// Publication count
const publicationCount = ref<number | null>(null);
const { publications, fetchPublications } = usePublications();
onMounted(async () => {
  await fetchPublications();
  publicationCount.value = publications.value.length;
});

// Research count
const researchCount = ref<number | null>(null);
const { research, fetchResearch } = useResearch();
onMounted(async () => {
  await fetchResearch();
  researchCount.value = research.value.length;
});

// Projects count
const projectsCount = ref<number>();
const { projects, fetchProjects } = useProjects();
onMounted(async () => {
  await fetchProjects();
  projectsCount.value = projects.value.length;
});

// Get language utilities for localization
const { t, currentLanguage } = useLanguage();

// Define emits for navigation
const emit = defineEmits<(e: 'setCurrentPage', page: string) => void>();

// Handle navigation to different pages
const navigateToPage = (page: string) => {
  emit('setCurrentPage', page);
};
</script>

<template>
  <section
    class="relative bg-gradient-to-br from-blue-50 via-white to-gray-50 py-20 sm:py-32"
  >
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <!-- Left content -->
          <div class="text-center lg:text-left">
            <!-- Main heading with proper localization -->
            <h1
              class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              <span class="block">
                {{ t.hero.title.line1 }}
              </span>
              <span class="block text-[#08a4d4] mt-2">
                {{ t.hero.title.line2 }}
              </span>
              <span class="block mt-2">
                {{ t.hero.title.line3 }}
              </span>
            </h1>

            <!-- Subtitle with localized lab description -->
            <p
              class="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {{ t.hero.subtitle }}
            </p>

            <!-- Call to action buttons -->
            <div
              class="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                class="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-[#08a4d4] hover:bg-blue-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 hover:cursor-pointer"
                @click="navigateToPage('research')"
              >
                {{ t.hero.cta.research }}
                <svg
                  class="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>

              <button
                class="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-[#08a4d4] bg-white hover:bg-gray-50 border-2 border-[#08a4d4] rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 hover:cursor-pointer"
                @click="navigateToPage('people')"
              >
                {{ t.hero.cta.team }}
                <svg
                  class="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </button>
            </div>

            <!-- Research highlights -->
            <div
              class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center lg:text-left"
            >
              <div class="flex flex-col items-center lg:items-start">
                <div
                  class="w-12 h-12 bg-[#08a4d4] bg-opacity-10 rounded-lg flex items-center justify-center mb-3"
                >
                  <span class="text-2xl">🤖</span>
                </div>
                <h3 class="font-semibold text-gray-900 mb-1">
                  {{ t.hero.highlights.ai.title }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ t.hero.highlights.ai.description }}
                </p>
              </div>

              <div class="flex flex-col items-center lg:items-start">
                <div
                  class="w-12 h-12 bg-[#08a4d4] bg-opacity-10 rounded-lg flex items-center justify-center mb-3"
                >
                  <span class="text-2xl">⚡</span>
                </div>
                <h3 class="font-semibold text-gray-900 mb-1">
                  {{ t.hero.highlights.systems.title }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ t.hero.highlights.systems.description }}
                </p>
              </div>

              <div class="flex flex-col items-center lg:items-start">
                <div
                  class="w-12 h-12 bg-[#08a4d4] bg-opacity-10 rounded-lg flex items-center justify-center mb-3"
                >
                  <span class="text-2xl">🔒</span>
                </div>
                <h3 class="font-semibold text-gray-900 mb-1">
                  {{ t.hero.highlights.security.title }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ t.hero.highlights.security.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Right content - Visual representation -->
          <div class="relative">
            <div class="relative">
              <!-- Background decoration -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-[#08a4d4] to-blue-600 rounded-2xl transform rotate-3 opacity-10"
              ></div>

              <!-- Main visual container -->
              <div class="relative bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
                <!-- Lab logo/branding -->
                <div class="text-center mb-8">
                  <div
                    class="w-48 h-32 rounded-2xl flex items-center justify-center mx-auto"
                  >
                    <img
                      :src="stilLogo"
                      alt="STIL company logo"
                      aria-describedby="stil-logo-desc"
                    />
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">STIL</h3>
                  <p class="text-sm text-gray-600 mt-1">
                    {{
                      currentLanguage === 'fr'
                        ? 'Laboratoire de Recherche'
                        : 'Research Laboratory'
                    }}
                  </p>
                </div>

                <!-- Key metrics preview -->
                <div class="space-y-4">
                  <div
                    class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span class="text-sm font-medium text-gray-700">
                      {{
                        currentLanguage === 'fr'
                          ? 'Projets actifs'
                          : 'Active projects'
                      }}
                    </span>
                    <span class="text-lg font-bold text-[#08a4d4]">
                      {{ projectsCount !== null ? `${projectsCount}+` : '...' }}
                    </span>
                  </div>

                  <div
                    class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span class="text-sm font-medium text-gray-700">
                      {{
                        currentLanguage === 'fr'
                          ? 'Publications'
                          : 'Publications'
                      }}
                    </span>
                    <span class="text-lg font-bold text-[#08a4d4]">
                      {{
                        publicationCount !== null
                          ? `${publicationCount}+`
                          : '...'
                      }}
                    </span>
                  </div>

                  <div
                    class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span class="text-sm font-medium text-gray-700">
                      {{
                        currentLanguage === 'fr' ? 'Recherches' : 'Researches'
                      }}
                    </span>
                    <span class="text-lg font-bold text-[#08a4d4]">
                      {{ researchCount !== null ? `${researchCount}+` : '...' }}
                    </span>
                  </div>
                </div>

                <!-- Recent activity indicator -->
                <div class="mt-6 pt-6 border-t border-gray-200">
                  <div class="flex items-center text-sm text-gray-600">
                    <div
                      class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"
                    ></div>
                    {{ t.hero.activity }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Background decorative elements -->
    <div
      class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
    >
      <div
        class="absolute top-20 left-10 w-20 h-20 bg-[#08a4d4] bg-opacity-5 rounded-full opacity-20"
      ></div>
      <div
        class="absolute bottom-20 right-10 w-32 h-32 bg-blue-500 bg-opacity-5 rounded-full opacity-30"
      ></div>
      <div
        class="absolute top-3/4 left-1/5 w-128 h-128 z-10 bg-[#08a4d4] bg-opacity-5 rounded-full opacity-10"
      ></div>
    </div>
  </section>
</template>
