<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { adminInvitationManagementTranslations } from '@/data/translations/adminInvitationManagement.translate'

type TabType = 'send' | 'stats' | 'history'

const props = defineProps<{
  activeTab: TabType
}>()

const emit = defineEmits<{
  'update:activeTab': [tab: TabType]
}>()

const { currentLanguage } = useLanguage()
const t = computed(() => adminInvitationManagementTranslations[currentLanguage.value].navigation)

// Tab configuration
const tabs = computed(() => [
  {
    id: 'send' as TabType,
    label: t.value.send,
    icon: 'mail'
  },
  {
    id: 'stats' as TabType,
    label: t.value.stats,
    icon: 'chart'
  },
  {
    id: 'history' as TabType,
    label: t.value.history,
    icon: 'history'
  }
])

// Handle tab change
const setActiveTab = (tab: TabType) => {
  emit('update:activeTab', tab)
}

// Get tab classes
const getTabClasses = (tab: TabType) => {
  const baseClasses = 'group inline-flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors'
  const activeClasses = 'border-blue-500 text-blue-600'
  const inactiveClasses = 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
  
  return `${baseClasses} ${props.activeTab === tab ? activeClasses : inactiveClasses}`
}

// Get icon SVG
const getIconSvg = (iconType: string) => {
  switch (iconType) {
    case 'mail':
      return {
        viewBox: '0 0 24 24',
        path: 'M3 8l7.89 4.26c.67.36 1.47.36 2.14 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
      }
    case 'chart':
      return {
        viewBox: '0 0 24 24',
        path: 'M9 17v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zM21 17V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v8a2 2 0 002 2h2a2 2 0 002-2zM15 17v-4a2 2 0 00-2-2h-2a2 2 0 00-2 2v4a2 2 0 002 2h2a2 2 0 002-2z'
      }
    case 'history':
      return {
        viewBox: '0 0 24 24',
        path: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
      }
    default:
      return {
        viewBox: '0 0 24 24',
        path: 'M9 5l7 7-7 7'
      }
  }
}
</script>

<template>
  <div class="border-b border-gray-200 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="-mb-px flex space-x-8" aria-label="Tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="setActiveTab(tab.id)"
          :class="getTabClasses(tab.id)"
          :aria-current="activeTab === tab.id ? 'page' : undefined"
        >
          <!-- Tab icon -->
          <svg
            class="-ml-0.5 mr-2 h-5 w-5"
            :class="{
              'text-blue-500': activeTab === tab.id,
              'text-gray-400 group-hover:text-gray-500': activeTab !== tab.id
            }"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            :viewBox="getIconSvg(tab.icon).viewBox"
          >
            <path :d="getIconSvg(tab.icon).path" />
          </svg>
          
          <!-- Tab label -->
          <span>{{ tab.label }}</span>
          
          <!-- Active indicator for mobile -->
          <span
            v-if="activeTab === tab.id"
            class="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full md:hidden"
          ></span>
        </button>
      </nav>
    </div>
  </div>
</template>