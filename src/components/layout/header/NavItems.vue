<script setup lang="ts">
interface NavItem {
  id: string
  label: string
  icon: string
}

const props = defineProps<{
  items: NavItem[]
  currentPage: string
  isMobile?: boolean
}>()

const emit = defineEmits<(e: 'navigate', page: string) => void>()

// Don't destructure props - use props.currentPage directly for reactivity
const handleClick = (id: string) => {
  emit('navigate', id)
}
</script>

<template>
  <div :class="[
    props.isMobile ? 'px-4 py-4 space-y-2 max-h-[70vh] overflow-y-auto' : 'hidden xl:flex flex-grow max-w-full overflow-x-auto scrollbar-hide space-x-4'
  ]">
    <button v-for="item in props.items" :key="item.id" @click="handleClick(item.id)" :class="[
      props.isMobile
        ? 'block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer'
        : 'flex-shrink-0 px-3 py-2 2xl:px-4 2xl:py-3 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer',
      props.currentPage === item.id
        ? 'bg-[#08a4d4] text-white'
        : 'text-gray-700 hover:bg-gray-100 hover:text-[#08a4d4]'
    ]">
      <span>{{ item.label }}</span>
    </button>
  </div>
</template>