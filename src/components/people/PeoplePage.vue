<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { useMembers, useMemberFilters } from '@/hooks/members'
import PersonCard from './PersonCard.vue'
import PersonModal from './PersonModal.vue'
import PeopleFilters from './PeopleFilters.vue'
import type { Member } from '@/services/MainAPI'

// Hooks
const { t } = useLanguage()
const { members, loading, error, fetchMembers, uniqueResearchDomains } = useMembers()
const {
  searchQuery,
  selectedDomain,
  selectedStatus,
  getFilteredMembers,
  getPhdStudents,
  getMscStudents,
  getProfessors
} = useMemberFilters()

// Modal state
const selectedMember = ref<Member | null>(null)

// Computed filtered members
const filteredMembers = computed(() => getFilteredMembers(members.value))
const phdStudents = computed(() => getPhdStudents(filteredMembers.value))
const mscStudents = computed(() => getMscStudents(filteredMembers.value))
const professors = computed(() => getProfessors(filteredMembers.value))

// Modal methods
const openModal = (member: Member) => {
  selectedMember.value = member
}

const closeModal = () => {
  selectedMember.value = null
}

// Initialize data
onMounted(() => {
  fetchMembers()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          <span class="text-[#08a4d4]">{{ t.person.pageTitle }}</span>
        </h1>
        <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          {{ t.person.pageSubtitle }}
        </p>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PeopleFilters
        v-model:search-query="searchQuery"
        v-model:selected-domain="selectedDomain"
        v-model:selected-status="selectedStatus"
        :available-domains="uniqueResearchDomains"
        :results-count="filteredMembers.length"
      />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#08a4d4] mx-auto"></div>
        <p class="mt-4 text-gray-600">{{ t.common.loading }}</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <div class="text-red-500 mb-4">
          <svg class="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">{{ t.common.error }}</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button 
          @click="fetchMembers"
          class="btn btn-primary"
        >
          {{ t.common.retry }}
        </button>
      </div>
    </div>

    <!-- Member sections -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-12">
      <!-- Professors Section -->
      <section>
        <h2 class="text-2xl font-bold mb-4">{{ t.person.sections.pro }}</h2>
        <div v-if="professors.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PersonCard
            v-for="member in professors"
            :key="member.id"
            :member="member"
            @open-modal="openModal"
          />
        </div>
        <div v-else class="text-center py-8">
          <p class="text-gray-500">{{ t.person.empty.message }}</p>
        </div>
      </section>

      <!-- PhD Students Section -->
      <section>
        <h2 class="text-2xl font-bold mb-4">{{ t.person.sections.phd }}</h2>
        <div v-if="phdStudents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PersonCard
            v-for="member in phdStudents"
            :key="member.id"
            :member="member"
            @open-modal="openModal"
          />
        </div>
        <div v-else class="text-center py-8">
          <p class="text-gray-500">{{ t.person.empty.message }}</p>
        </div>
      </section>

      <!-- Master Students Section -->
      <section>
        <h2 class="text-2xl font-bold mb-4">{{ t.person.sections.msc }}</h2>
        <div v-if="mscStudents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PersonCard
            v-for="member in mscStudents"
            :key="member.id"
            :member="member"
            @open-modal="openModal"
          />
        </div>
        <div v-else class="text-center py-8">
          <p class="text-gray-500">{{ t.person.empty.message }}</p>
        </div>
      </section>
    </div>

    <!-- Modal -->
    <PersonModal
      :member="selectedMember"
      :is-open="selectedMember !== null"
      @close="closeModal"
    />
  </div>
</template>