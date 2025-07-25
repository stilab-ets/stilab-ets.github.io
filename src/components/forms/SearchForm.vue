<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

// Use defineModel instead of emit for two-way binding
const searchQuery = defineModel<string>('searchQuery', { default: '' })
const filters = defineModel<Record<string, any>>('filters', { default: () => ({}) })

// Component props
interface Props {
  placeholder?: string
  showFilters?: boolean
  availableFilters?: Array<{
    key: string
    label: string
    type: 'select' | 'checkbox' | 'date'
    options?: Array<{ value: string; label: string }>
  }>
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
  showFilters: true,
  availableFilters: () => []
})

// Hooks
const { t } = useLanguage()

// Computed properties
const hasActiveFilters = computed(() => {
  return Object.values(filters.value).some(value => 
    value !== null && value !== undefined && value !== ''
  )
})

// Methods
const clearSearch = () => {
  searchQuery.value = ''
}

const clearFilters = () => {
  filters.value = {}
}

const clearAll = () => {
  clearSearch()
  clearFilters()
}

const updateFilter = (key: string, value: any) => {
  filters.value = {
    ...filters.value,
    [key]: value
  }
}

const removeFilter = (key: string) => {
  const newFilters = { ...filters.value }
  delete newFilters[key]
  filters.value = newFilters
}
</script>

<template>
  <Card class="mb-6">
    <div class="p-6">
      <!-- Search Input -->
      <div class="flex gap-4 mb-4">
        <div class="flex-1 relative">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="placeholder"
            class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
          <!-- Search Icon -->
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <!-- Clear Search Button -->
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <svg class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Clear All Button -->
        <Button
          v-if="searchQuery || hasActiveFilters"
          variant="outline"
          @click="clearAll"
        >
          {{ t.common.clearAll }}
        </Button>
      </div>

      <!-- Filters Section -->
      <div v-if="showFilters && availableFilters.length > 0" class="space-y-4">
        <h3 class="text-sm font-medium text-gray-700">{{ t.common.filters }}</h3>
        
        <!-- Filter Controls -->
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            v-for="filter in availableFilters"
            :key="filter.key"
            class="space-y-1"
          >
            <label :for="filter.key" class="block text-xs font-medium text-gray-600">
              {{ filter.label }}
            </label>
            
            <!-- Select Filter -->
            <select
              v-if="filter.type === 'select'"
              :id="filter.key"
              :value="filters[filter.key] || ''"
              @change="updateFilter(filter.key, ($event.target as HTMLSelectElement).value)"
              class="w-full text-sm border border-gray-300 rounded px-3 py-1 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">{{ t.common.all }}</option>
              <option
                v-for="option in filter.options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
            
            <!-- Checkbox Filter -->
            <div v-else-if="filter.type === 'checkbox'" class="flex items-center">
              <input
                :id="filter.key"
                type="checkbox"
                :checked="filters[filter.key] || false"
                @change="updateFilter(filter.key, ($event.target as HTMLInputElement).checked)"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              >
            </div>
            
            <!-- Date Filter -->
            <input
              v-else-if="filter.type === 'date'"
              :id="filter.key"
              type="date"
              :value="filters[filter.key] || ''"
              @input="updateFilter(filter.key, ($event.target as HTMLInputElement).value)"
              class="w-full text-sm border border-gray-300 rounded px-3 py-1 focus:ring-1 focus:ring-blue-500"
            >
          </div>
        </div>

        <!-- Active Filters Display -->
        <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
          <span class="text-xs text-gray-500">{{ t.common.activeFilters }}:</span>
          <button
            v-for="[key, value] in Object.entries(filters)"
            :key="key"
            v-if="value && value !== ''"
            @click="removeFilter(key)"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 hover:bg-blue-200"
          >
            {{ availableFilters.find(f => f.key === key)?.label }}: {{ value }}
            <svg class="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Card>
</template>