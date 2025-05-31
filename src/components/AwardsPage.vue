<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockResearchers } from '../data/mockResearchers'

// Extended award data structure
interface AwardWithMember {
  member: string;
  award: {
    id: string;
    title: string;
    year: number;
    organization: string;
    icon: string;
  };
  description?: string;
}

// State
const selectedYear = ref('')
const selectedOrganization = ref('')
const selectedMember = ref('')
const currentYear = new Date().getFullYear()

// Generate all awards from researchers
const allAwards = computed(() => {
  const awards: AwardWithMember[] = []

  mockResearchers.forEach(researcher => {
    researcher.awards.forEach(award => {
      awards.push({
        member: researcher.name,
        award: award,
        description: generateAwardDescription(award.title, researcher.name)
      })
    })
  })

  return awards.sort((a, b) => b.award.year - a.award.year)
})

// Generate description for awards
const generateAwardDescription = (title: string, memberName: string): string => {
  const descriptions: { [key: string]: string } = {
    'Best Paper Award': `Récompense pour l'excellence de la recherche présentée par ${memberName}.`,
    'Excellence in Research Award': `Reconnaissance de la contribution exceptionnelle de ${memberName} à la recherche.`,
    'Distinguished Scientist': `Titre honorifique accordé à ${memberName} pour son expertise reconnue.`,
    'Lifetime Achievement Award': `Prix pour l'ensemble de la carrière exceptionnelle de ${memberName}.`
  }

  return descriptions[title] || `Prix décerné à ${memberName} pour ses contributions remarquables.`
}

// Computed properties
const totalAwards = computed(() => allAwards.value.length)

const uniqueOrganizations = computed(() => {
  return [...new Set(allAwards.value.map(a => a.award.organization))].sort()
})

const awardedMembers = computed(() => {
  return [...new Set(allAwards.value.map(a => a.member))].sort()
})

const availableYears = computed(() => {
  return [...new Set(allAwards.value.map(a => a.award.year))].sort((a, b) => b - a)
})

const oldestAwardYear = computed(() => {
  return Math.min(...allAwards.value.map(a => a.award.year))
})

const filteredAwards = computed(() => {
  return allAwards.value.filter(awardData => {
    const matchesYear = !selectedYear.value || awardData.award.year.toString() === selectedYear.value
    const matchesOrg = !selectedOrganization.value || awardData.award.organization === selectedOrganization.value
    const matchesMember = !selectedMember.value || awardData.member === selectedMember.value

    return matchesYear && matchesOrg && matchesMember
  })
})

const groupedAwards = computed(() => {
  const groups: { year: number; awards: AwardWithMember[] }[] = []
  const yearMap = new Map<number, AwardWithMember[]>()

  filteredAwards.value.forEach(awardData => {
    const year = awardData.award.year
    if (!yearMap.has(year)) {
      yearMap.set(year, [])
    }
    yearMap.get(year)!.push(awardData)
  })

  // Sort years in descending order
  const sortedYears = Array.from(yearMap.keys()).sort((a, b) => b - a)

  sortedYears.forEach(year => {
    groups.push({
      year,
      awards: yearMap.get(year)!
    })
  })

  return groups
})

// Award statistics
const bestPaperAwards = computed(() => {
  return allAwards.value.filter(a =>
    a.award.title.toLowerCase().includes('best paper') ||
    a.award.title.toLowerCase().includes('paper award')
  ).length
})

const researchExcellenceAwards = computed(() => {
  return allAwards.value.filter(a =>
    a.award.title.toLowerCase().includes('excellence') ||
    a.award.title.toLowerCase().includes('distinguished') ||
    a.award.title.toLowerCase().includes('achievement')
  ).length
})

const industryAwards = computed(() => {
  return allAwards.value.filter(a =>
    a.award.organization.toLowerCase().includes('industry') ||
    a.award.organization.toLowerCase().includes('ieee') ||
    a.award.organization.toLowerCase().includes('acm')
  ).length
})

// Methods
const getAwardCategory = (title: string): string => {
  if (title.toLowerCase().includes('paper')) return 'Publication'
  if (title.toLowerCase().includes('research')) return 'Recherche'
  if (title.toLowerCase().includes('teaching')) return 'Enseignement'
  if (title.toLowerCase().includes('service')) return 'Service'
  if (title.toLowerCase().includes('lifetime') || title.toLowerCase().includes('achievement')) return 'Carrière'
  return 'Excellence'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span class="text-[#08a4d4]">Prix</span> & Distinctions
          </h1>
          <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Reconnaissance de l'excellence de nos recherches et de notre équipe
          </p>
        </div>
      </div>
    </div>

    <!-- Statistics -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Nos Achievements</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-[#08a4d4]">{{ totalAwards }}</div>
            <div class="text-sm text-gray-600">Prix reçus</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-[#08a4d4]">{{ uniqueOrganizations.length }}</div>
            <div class="text-sm text-gray-600">Organisations</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-[#08a4d4]">{{ awardedMembers.length }}</div>
            <div class="text-sm text-gray-600">Membres récompensés</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-[#08a4d4]">{{ currentYear - oldestAwardYear + 1 }}</div>
            <div class="text-sm text-gray-600">Années de reconnaissance</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Year Filter -->
          <div>
            <label for="year-filter" class="block text-sm font-medium text-gray-700 mb-2">
              Année
            </label>
            <select id="year-filter" v-model="selectedYear"
              class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
              <option value="">Toutes les années</option>
              <option v-for="year in availableYears" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>

          <!-- Organization Filter -->
          <div>
            <label for="org-filter" class="block text-sm font-medium text-gray-700 mb-2">
              Organisation
            </label>
            <select id="org-filter" v-model="selectedOrganization"
              class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
              <option value="">Toutes les organisations</option>
              <option v-for="org in uniqueOrganizations" :key="org" :value="org">
                {{ org }}
              </option>
            </select>
          </div>

          <!-- Member Filter -->
          <div>
            <label for="member-filter" class="block text-sm font-medium text-gray-700 mb-2">
              Membre
            </label>
            <select id="member-filter" v-model="selectedMember"
              class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4]">
              <option value="">Tous les membres</option>
              <option v-for="member in awardedMembers" :key="member" :value="member">
                {{ member }}
              </option>
            </select>
          </div>
        </div>

        <!-- Results info -->
        <div class="mt-4">
          <p class="text-sm text-gray-600">
            {{ groupedAwards.length }} prix trouvé{{ groupedAwards.length > 1 ? 's' : '' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Awards Timeline -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="space-y-8">
        <!-- Year Group -->
        <div v-for="yearGroup in groupedAwards" :key="yearGroup.year" class="relative">
          <!-- Year Header -->
          <div class="flex items-center mb-6">
            <div
              class="flex items-center justify-center w-12 h-12 bg-[#08a4d4] rounded-full text-white font-bold text-lg">
              {{ yearGroup.year }}
            </div>
            <div class="ml-4">
              <h2 class="text-xl font-semibold text-gray-900">
                {{ yearGroup.awards.length }} prix en {{ yearGroup.year }}
              </h2>
            </div>
          </div>

          <!-- Awards for this year -->
          <div class="ml-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div v-for="awardData in yearGroup.awards" :key="`${awardData.member}-${awardData.award.id}`"
              class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 p-6 relative">
              <!-- Award Card -->
              <div class="flex items-start">
                <!-- Award Icon -->
                <div class="flex-shrink-0 mr-4">
                  <div
                    class="w-16 h-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center text-3xl">
                    {{ awardData.award.icon }}
                  </div>
                </div>

                <!-- Award Details -->
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">
                    {{ awardData.award.title }}
                  </h3>

                  <!-- Recipient -->
                  <div class="flex items-center mb-2">
                    <svg class="h-4 w-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="text-sm font-medium text-gray-700">Lauréat:</span>
                    <span class="text-sm text-[#08a4d4] ml-1 font-medium">{{ awardData.member }}</span>
                  </div>

                  <!-- Organization -->
                  <div class="flex items-center mb-3">
                    <svg class="h-4 w-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span class="text-sm text-gray-600">{{ awardData.award.organization }}</span>
                  </div>

                  <!-- Description if available -->
                  <div v-if="awardData.description" class="mb-3">
                    <p class="text-sm text-gray-700 leading-relaxed">{{ awardData.description }}</p>
                  </div>

                  <!-- Category/Type -->
                  <div class="flex items-center justify-between">
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {{ getAwardCategory(awardData.award.title) }}
                    </span>
                    <span class="text-xs text-gray-500">{{ awardData.award.year }}</span>
                  </div>
                </div>
              </div>

              <!-- Shine effect for recent awards -->
              <div v-if="awardData.award.year >= currentYear - 1" class="absolute top-2 right-2">
                <span
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Récent
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="groupedAwards.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun prix trouvé</h3>
        <p class="mt-1 text-sm text-gray-500">Essayez de modifier vos filtres.</p>
      </div>
    </div>

    <!-- Notable Achievements Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Achievements Notables</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Best Paper Awards -->
          <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
            <div class="text-4xl mb-4">📄</div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Best Paper Awards</h3>
            <p class="text-3xl font-bold text-[#08a4d4] mb-2">{{ bestPaperAwards }}</p>
            <p class="text-sm text-gray-600">Dans des conférences de premier plan</p>
          </div>

          <!-- Research Excellence -->
          <div class="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <div class="text-4xl mb-4">🔬</div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Excellence en Recherche</h3>
            <p class="text-3xl font-bold text-[#08a4d4] mb-2">{{ researchExcellenceAwards }}</p>
            <p class="text-sm text-gray-600">Prix d'excellence académique</p>
          </div>

          <!-- Industry Recognition -->
          <div class="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
            <div class="text-4xl mb-4">🏭</div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Reconnaissance Industrielle</h3>
            <p class="text-3xl font-bold text-[#08a4d4] mb-2">{{ industryAwards }}</p>
            <p class="text-sm text-gray-600">Partenariats et collaborations</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>