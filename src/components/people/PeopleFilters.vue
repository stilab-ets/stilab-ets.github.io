<script setup lang="ts">
import { researchDomains } from '@/data/mockResearchers'
import { useLanguage } from '@/composables/useLanguage'
import Card from '@/ui/Card.vue'

interface Props {
  searchQuery: string
  selectedDomain: string
  selectedStatus: string
  resultsCount: number
}

interface Emits {
  (e: 'update:searchQuery', value: string): void
  (e: 'update:selectedDomain', value: string): void
  (e: 'update:selectedStatus', value: string): void
}

defineProps<Props>()
defineEmits<Emits>()

const { t } = useLanguage()

const getResultsText = (count: number) => {
  if (count === 0) return `0 ${t.value.person.results.member} ${t.value.person.results.found}`
  if (count === 1) return `1 ${t.value.person.results.member} ${t.value.person.results.found}`
  return `${count} ${t.value.person.results.members} ${t.value.person.results.noResults}`
}
</script>

<template>
  <Card>
    <div class="flex flex-col md:flex-row gap-4 items-end">
      <!-- Search Bar -->
      <div class="flex-1">
        <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t.person.search.label }}
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            id="search" 
            :value="searchQuery"
            :placeholder="t.person.search.placeholder"
            @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
            type="text" 
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#08a4d4] focus:border-[#08a4d4]" 
          />
        </div>
      </div>

      <!-- Domain Filter -->
      <div class="w-full md:w-64">
        <label for="domain-filter" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t.person.search.domainLabel }}
        </label>
        <select 
          id="domain-filter" 
          :value="selectedDomain"
          @change="$emit('update:selectedDomain', ($event.target as HTMLSelectElement).value)"
          class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4] hover:cursor-pointer"
        >
          <option value="">{{ t.person.search.allDomains }}</option>
          <option v-for="domain in researchDomains" :key="domain" :value="domain" class="flex hover:cursor-pointer">
            {{ domain }}
          </option>
        </select>
      </div>

      <!-- Status Filter -->
      <div class="w-full md:w-48">
        <label for="status-filter" class="block text-sm font-medium text-gray-700 mb-2">
          {{ t.person.search.statusLabel }}
        </label>
        <select 
          id="status-filter" 
          :value="selectedStatus"
          @change="$emit('update:selectedStatus', ($event.target as HTMLSelectElement).value)"
          class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4] hover:cursor-pointer"
        >
          <option class="flex hover:cursor-pointer" value="">{{ t.person.search.allStatuses }}</option>
          <option class="flex hover:cursor-pointer" value="active">{{ t.person.search.active }}</option>
          <option class="flex hover:cursor-pointer" value="alumni">{{ t.person.search.alumni }}</option>
          <option class="flex hover:cursor-pointer" value="visitor">{{ t.person.search.visitors }}</option>
        </select>
      </div>
    </div>

    <!-- Results Counter -->
    <div class="mt-4">
      <p class="text-sm text-gray-600">
        {{ getResultsText(resultsCount) }}
      </p>
    </div>
  </Card>
</template>