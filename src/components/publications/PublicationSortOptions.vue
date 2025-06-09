<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

interface Props {
  sortBy: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:sortBy': [value: string]
}>()

const { t } = useLanguage()

const updateSort = (value: string) => {
  emit('update:sortBy', value)
}
</script>

<template>
  <div class="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
    <div class="flex items-center">
      <label for="sort" class="text-sm font-medium text-gray-700 mr-3">
        {{ t.publications.filters.sortBy }}:
      </label>
      <select 
        id="sort" 
        :value="sortBy"
        @change="updateSort(($event.target as HTMLSelectElement).value)"
        class="px-3 py-1 border border-gray-300 bg-white rounded-md text-sm focus:outline-none focus:ring-[#08a4d4] focus:border-[#08a4d4] hover:cursor-pointer"
      >
        <option value="year-desc">{{ t.publications.sorting.yearDesc }}</option>
        <option value="year-asc">{{ t.publications.sorting.yearAsc }}</option>
        <option value="citations-desc">{{ t.publications.sorting.citationsDesc }}</option>
        <option value="title-asc">{{ t.publications.sorting.titleAsc }}</option>
      </select>
    </div>
  </div>
</template>