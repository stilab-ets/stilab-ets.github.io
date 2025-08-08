<script setup lang="ts">
import Card from '@/components/ui/Card.vue';

interface StatCard {
  title: string;
  value: number | string;
  icon: string;
  color: string;
}

interface Props {
  stats: StatCard[];
}

defineProps<Props>();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <Card v-for="stat in stats" :key="stat.title" class="p-6">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <div :class="['p-3 rounded-md', stat.color]">
            <component :is="stat.icon" class="h-6 w-6 text-white" />
          </div>
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">
              {{ stat.title }}
            </dt>
            <dd class="flex items-baseline">
              <div class="text-2xl font-semibold text-gray-900">
                {{ stat.value }}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </Card>
  </div>
</template>
