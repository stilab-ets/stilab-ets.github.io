<script setup lang="ts">
import { ref, computed } from 'vue'
import { mockResearchers, type Researcher } from '@/data/mockResearchers'
import { useLanguage } from '@/composables/useLanguage'
import PersonCard from './PersonCard.vue'
import PersonModal from './PersonModal.vue'
import PeopleFilters from './PeopleFilters.vue'

// State
const searchQuery = ref('')
const selectedDomain = ref('')
const selectedStatus = ref('')
const selectedResearcher = ref<Researcher | null>(null)

// Language
const { t } = useLanguage()

// Computed
const filteredResearchers = computed(() => {
  return mockResearchers.filter(researcher => {
    const matchesSearch = !searchQuery.value ||
      researcher.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      researcher.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      researcher.researchDomains.some(domain =>
        domain.toLowerCase().includes(searchQuery.value.toLowerCase())
      )

    const matchesDomain = !selectedDomain.value ||
      researcher.researchDomains.includes(selectedDomain.value)

    const matchesStatus = !selectedStatus.value ||
      researcher.status === selectedStatus.value

    return matchesSearch && matchesDomain && matchesStatus
  })
})

// Methods
const openModal = (researcher: Researcher) => {
  selectedResearcher.value = researcher
}

const closeModal = () => {
  selectedResearcher.value = null
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Page Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span class="text-[#08a4d4]">{{ t.person.pageTitle }}</span>
          </h1>
          <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            {{ t.person.pageSubtitle }}
          </p>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PeopleFilters
        v-model:search-query="searchQuery"
        v-model:selected-domain="selectedDomain"
        v-model:selected-status="selectedStatus"
        :results-count="filteredResearchers.length"
      />
    </div>

    <!-- People Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PersonCard
          v-for="researcher in filteredResearchers"
          :key="researcher.id"
          :researcher="researcher"
          @open-modal="openModal"
        />
      </div>

      <!-- Empty State -->
      <div v-if="filteredResearchers.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">{{ t.person.empty.title }}</h3>
        <p class="mt-1 text-sm text-gray-500">{{ t.person.empty.message }}</p>
      </div>
    </div>

    <!-- Researcher Modal -->
    <PersonModal
      :researcher="selectedResearcher"
      :is-open="selectedResearcher !== null"
      @close="closeModal"
    />
  </div>
</template>