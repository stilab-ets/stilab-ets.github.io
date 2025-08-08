<script setup lang="ts">
interface Props {
  variant?: 'default' | 'hover' | 'bordered' | 'elevated';
  padding?: 'sm' | 'md' | 'lg';
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  clickable: false,
});

const emit = defineEmits<(e: 'click') => void>();

const handleClick = () => {
  if (props.clickable) {
    emit('click');
  }
};

const getVariantClasses = () => {
  const variants = {
    default: 'bg-white shadow-sm border border-gray-200',
    hover:
      'bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200',
    bordered: 'bg-white border-2 border-gray-300',
    elevated: 'bg-white shadow-lg border border-gray-100',
  };
  return variants[props.variant];
};

const getPaddingClasses = () => {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  return paddings[props.padding];
};

const getCursorClass = () => {
  return props.clickable ? 'cursor-pointer' : '';
};
</script>

<template>
  <div
    :class="[
      'rounded-lg',
      getVariantClasses(),
      getPaddingClasses(),
      getCursorClass(),
    ]"
    @click="handleClick"
  >
    <slot />
  </div>
</template>
