<script setup lang="ts">
import { defineModel } from 'vue';

interface Tab {
  id: string;
  label: string;
  icon: string;
  count?: number;
}

interface Props {
  tabs: Tab[];
}

const props = defineProps<Props>();
const activeTab = defineModel<string>({ required: true });
</script>

<template>
  <div class="border-b border-gray-200 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="-mb-px flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="[
            'py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200',
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
          ]"
          @click="activeTab = tab.id"
        >
          <component :is="tab.icon" class="h-4 w-4" />
          <span>{{ tab.label }}</span>
          <span
            v-if="tab.count !== undefined"
            :class="[
              'ml-2 py-0.5 px-2 rounded-full text-xs',
              activeTab === tab.id
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-500',
            ]"
          >
            {{ tab.count }}
          </span>
        </button>
      </nav>
    </div>
  </div>
</template>
