<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
  highlightWord?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          <span
            v-if="highlightWord"
            v-html="
              title.replace(
                highlightWord,
                `<span class='text-[#08a4d4]'>${highlightWord}</span>`
              )
            "
          ></span>
          <span v-else>{{ title }}</span>
        </h1>
        <p v-if="subtitle" class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          {{ subtitle }}
        </p>
      </div>
    </div>
  </div>
</template>
