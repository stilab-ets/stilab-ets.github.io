<script setup lang="ts">
import Card from './Card.vue'

interface FilterOption {
  value: string
  label: string
}

interface Props {
  searchQuery?: string
  searchLabel?: string
  searchPlaceholder?: string
  filters?: {
    id: string
    label: string
    value: string
    options: FilterOption[]
  }[]
  resultsCount?: number
  resultsText?: string
}

interface Emits {
  (e: 'update:searchQuery', value: string): void
  (e: 'updateFilter', filterId: string, value: string): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <Card>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Search Input -->
      <div v-if="searchLabel" :class="filters && filters.length > 2 ? 'lg:col-span-2' : 'md:col-span-2'">
        <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
          {{ searchLabel }}
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
            :placeholder="searchPlaceholder"
            @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
            type="text" 
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#08a4d4] focus:border-[#08a4d4]" 
          />
        </div>
      </div>

      <!-- Dynamic Filters -->
      <div v-for="filter in filters" :key="filter.id" class="w-full">
        <label :for="`${filter.id}-filter`" class="block text-sm font-medium text-gray-700 mb-2">
          {{ filter.label }}
        </label>
        <select 
          :id="`${filter.id}-filter`"
          :value="filter.value"
          @change="$emit('updateFilter', filter.id, ($event.target as HTMLSelectElement).value)"
          class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4] hover:cursor-pointer"
        >
          <option v-for="option in filter.options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>

    <!-- Results Counter -->
    <div v-if="resultsText" class="mt-4">
      <p class="text-sm text-gray-600">
        {{ resultsText }}
      </p>
    </div>
  </Card>
</template>