<script setup lang="ts">
import { useFooterData } from '@/hooks/layout/useFooterData'

const { contactDetails, formatContactContent, t } = useFooterData()
</script>

<template>
  <div>
    <h3 class="text-lg font-semibold mb-6">{{ t.footer.contact.title }}</h3>
    <address class="not-italic">
      <ul class="space-y-3 text-gray-300">
        <li v-for="detail in contactDetails" :key="detail.id" class="flex items-start space-x-2">
          <span class="text-base mt-0.5" :aria-hidden="true">{{ detail.icon }}</span>
          <div class="flex-1">
            <span 
              v-if="detail.type === 'address'"
              v-html="formatContactContent(detail.content, detail.type)"
              :aria-label="detail.ariaLabel"
              class="leading-relaxed"
            ></span>
            <span 
              v-else
              :aria-label="detail.ariaLabel"
            >
              {{ detail.content }}
            </span>
          </div>
        </li>
      </ul>
    </address>
  </div>
</template>