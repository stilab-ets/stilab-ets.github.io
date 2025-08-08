<script setup lang="ts">
interface Statistic {
  value: number | string;
  label: string;
}

interface Props {
  statistics: Statistic[];
  columns?: number;
  title?: string;
  backgroundClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  columns: 3,
  backgroundClass: 'bg-white',
});

const gridColsClass =
  {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
  }[props.columns] || 'grid-cols-1 md:grid-cols-3';
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div
      :class="[backgroundClass, 'rounded-lg p-8 mb-8']"
      v-if="backgroundClass !== 'bg-white'"
    >
      <h2
        v-if="title"
        class="text-2xl font-bold text-gray-900 mb-6 text-center"
      >
        {{ title }}
      </h2>
      <div :class="['grid gap-6', gridColsClass]">
        <div
          v-for="(stat, index) in statistics"
          :key="index"
          class="text-center"
        >
          <div :class="['text-3xl font-bold mb-2 text-[#08a4d4]']">
            {{ stat.value }}
          </div>
          <div class="text-sm text-gray-600">{{ stat.label }}</div>
        </div>
      </div>
    </div>
    <div v-else :class="['grid gap-6', gridColsClass]">
      <div
        v-for="(stat, index) in statistics"
        :key="index"
        class="bg-white rounded-xl p-6 text-center shadow-sm"
      >
        <div :class="['text-3xl font-bold mb-2 text-[#08a4d4]']">
          {{ stat.value }}
        </div>
        <div class="text-gray-600">{{ stat.label }}</div>
      </div>
    </div>
  </div>
</template>
