<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage';

const sortBy = defineModel<string>('sortBy');

const { t } = useLanguage();

const updateSort = (value: string) => {
  sortBy.value = value;
};
</script>

<template>
  <div
    class="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
  >
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
        <option value="title-asc">{{ t.publications.sorting.titleAsc }}</option>
      </select>
    </div>
  </div>
</template>
