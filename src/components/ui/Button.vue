<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  fullWidth: false,
  type: 'button'
})

const emit = defineEmits<(e: 'click') => void>()

const handleClick = () => {
  if (!props.disabled && !props.loading) {
    emit('click')
  }
}

const getVariantClasses = () => {
  const variants = {
    primary: 'bg-[#08a4d4] text-white hover:bg-blue-600 focus:ring-[#08a4d4]',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border-2 border-[#08a4d4] text-[#08a4d4] hover:bg-[#08a4d4] hover:text-white focus:ring-[#08a4d4]',
    ghost: 'text-[#08a4d4] hover:bg-blue-50 focus:ring-[#08a4d4]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  }
  return variants[props.variant]
}

const getSizeClasses = () => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  return sizes[props.size]
}

const getWidthClass = () => {
  return props.fullWidth ? 'w-full' : ''
}

const getDisabledClasses = () => {
  return (props.disabled || props.loading) ? 'opacity-50 cursor-not-allowed' : ''
}
</script>

<template>
  <button :type="type" :disabled="disabled || loading" :class="[
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
    getVariantClasses(),
    getSizeClasses(),
    getWidthClass(),
    getDisabledClasses()
  ]" @click="handleClick">
    <!-- Loading spinner -->
    <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
      </path>
    </svg>

    <slot />
  </button>
</template>