<script setup lang="ts">
import { computed } from 'vue';
import { Loader2 } from 'lucide-vue-next';

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg';
    overlay?: boolean;
    message?: string;
  }>(),
  {
    size: 'md',
    overlay: false,
  }
);

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-4 w-4';
    case 'lg':
      return 'h-8 w-8';
    default:
      return 'h-6 w-6';
  }
});

const textSizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-xs';
    case 'lg':
      return 'text-lg';
    default:
      return 'text-sm';
  }
});
</script>

<template>
  <div
    :class="[
      'flex items-center justify-center',
      overlay ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50' : '',
      overlay ? 'flex-col space-y-2' : 'space-x-2',
    ]"
  >
    <Loader2 :class="['animate-spin text-[#08a4d4]', sizeClasses]" />

    <span
      v-if="message"
      :class="['text-gray-600 font-medium', textSizeClasses]"
    >
      {{ message }}
    </span>
  </div>
</template>
