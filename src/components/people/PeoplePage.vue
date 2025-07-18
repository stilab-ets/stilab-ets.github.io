<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import PersonCard from './PersonCard.vue'
import PersonModal from './PersonModal.vue'
import PeopleFilters from './PeopleFilters.vue'

interface Member {
  id: string
  first_name: string
  last_name: string
  role: string
  email: string | null
  phone?: string | null
  biography?: string | null
  research_domain?: string | null
  image_url?: string | null
  github_url?: string | null
  linkedin_url?: string | null
  personal_website?: string | null
  status?: string | null
}

// State
const members = ref<Member[]>([])
const searchQuery = ref('')
const selectedDomain = ref('')
const selectedStatus = ref('')
const selectedMember = ref<Member | null>(null)

// Language
const { t } = useLanguage()

// Fetch members on mount
const fetchMembers = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/members')
    if (!response.ok) throw new Error('Failed to fetch members')
    const data = await response.json()
    members.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error fetching members:', error)
  }
}
onMounted(fetchMembers)

// Dynamically get list of unique research domains
const uniqueResearchDomains = computed(() => {
  const domainSet = new Set<string>()
  for (const member of members.value) {
    if (member.research_domain) {
      domainSet.add(member.research_domain)
    }
  }
  return Array.from(domainSet).sort()
})

// Filtered members based on search + filters
const filteredMembers = computed(() => {
  return members.value.filter((member) => {
    const fullName = `${member.first_name} ${member.last_name}`
    const matchesSearch =
      !searchQuery.value ||
      fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (member.research_domain &&
        member.research_domain.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
      (member.role &&
        member.role.toLowerCase().includes(searchQuery.value.toLowerCase()))

    const matchesDomain =
      !selectedDomain.value || member.research_domain === selectedDomain.value

    const matchesStatus =
      !selectedStatus.value || member.status === selectedStatus.value

    return matchesSearch && matchesDomain && matchesStatus
  })
})

const phdStudents = computed(() =>
  filteredMembers.value.filter(
    (member) => member.role?.toLowerCase() === 'phd'
  )
)

const mStudents = computed(() =>
  filteredMembers.value.filter(
    (member) => member.role?.toLowerCase() === 'msc'
  )
)

const professors = computed(() =>
  filteredMembers.value.filter(
    (member) => member.role?.toLowerCase() === 'pro'
  )
)

// Modal methods
const openModal = (member: Member) => {
  selectedMember.value = member
}
const closeModal = () => {
  selectedMember.value = null
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
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

    <!-- Member sections -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-12">

      <!-- PHD STUDENT Section -->
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
        <p v-else class="text-gray-500">No PHD students found.</p>
      </section>

      <!-- M STUDENT Section -->
      <section>
        <h2 class="text-2xl font-bold mb-4">{{ t.person.sections.msc }}</h2>
        <div v-if="mStudents.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PersonCard
            v-for="member in mStudents"
            :key="member.id"
            :member="member"
            @open-modal="openModal"
          />
        </div>
        <p v-else class="text-gray-500">No M students found.</p>
      </section>

      <!-- PROFESSOR Section -->
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
        <p v-else class="text-gray-500">No professors found.</p>
      </section>

    </div>

    <PersonModal
      :member="selectedMember"
      :is-open="selectedMember !== null"
      @close="closeModal"
    />
  </div>
</template>
