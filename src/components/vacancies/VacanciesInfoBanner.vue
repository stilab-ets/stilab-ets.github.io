<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage';

const { t } = useLanguage();
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            {{ t.vacancies.infoBox.whyJoinUs }}
          </h3>
          <ul class="text-sm text-gray-700 space-y-1">
            <li v-for="benefit in t.vacancies.infoBox.benefits" :key="benefit">
              • {{ benefit }}
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-3">
            {{ t.vacancies.infoBox.hrContact }}
          </h3>
          <div class="text-sm text-gray-700">
            <p>📧 {{ t.vacancies.infoBox.email }}</p>
            <p>📞 {{ t.vacancies.infoBox.phone }}</p>
            <p>📍 {{ t.vacancies.infoBox.address }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
