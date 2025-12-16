<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface PkBadgeProps {
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral'
  variant?: 'filled' | 'outlined' | 'tonal'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  dot?: boolean
}

const props = withDefaults(defineProps<PkBadgeProps>(), {
  color: 'primary',
  variant: 'filled',
  size: 'md',
  rounded: false,
  dot: false,
})

const badgeClasses = computed(() => [
  'pk-badge',
  `pk-badge--${props.color}`,
  `pk-badge--${props.variant}`,
  `pk-badge--${props.size}`,
  {
    'pk-badge--rounded': props.rounded,
    'pk-badge--dot': props.dot,
  },
])
</script>

<style lang="scss" scoped>
.pk-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--pk-font-family);
  font-weight: var(--pk-font-semibold);
  white-space: nowrap;
  border-radius: var(--pk-radius-md);
  transition: all var(--pk-duration-150) var(--pk-ease-out);
  
  // Sizes
  &--sm {
    font-size: var(--pk-text-xs);
    padding: 0.125rem 0.5rem;
    min-height: 1.25rem;
  }
  
  &--md {
    font-size: var(--pk-text-xs);
    padding: 0.25rem 0.625rem;
    min-height: 1.5rem;
  }
  
  &--lg {
    font-size: var(--pk-text-sm);
    padding: 0.375rem 0.75rem;
    min-height: 1.75rem;
  }
  
  // Rounded
  &--rounded {
    border-radius: var(--pk-radius-full);
  }
  
  // Dot (for status indicators)
  &--dot {
    width: 0.5rem;
    height: 0.5rem;
    min-height: 0;
    padding: 0;
    border-radius: var(--pk-radius-full);
    
    &.pk-badge--md {
      width: 0.625rem;
      height: 0.625rem;
    }
    
    &.pk-badge--lg {
      width: 0.75rem;
      height: 0.75rem;
    }
  }
  
  // ================================
  // VARIANT: Filled
  // ================================
  &--filled {
    color: white;
    
    &.pk-badge--primary { background: var(--pk-primary-500); }
    &.pk-badge--secondary { background: var(--pk-secondary-500); }
    &.pk-badge--accent { background: var(--pk-accent-500); }
    &.pk-badge--success { background: var(--pk-success-500); }
    &.pk-badge--warning { background: var(--pk-warning-500); color: var(--pk-neutral-900); }
    &.pk-badge--error { background: var(--pk-error-500); }
    &.pk-badge--info { background: var(--pk-info-500); }
    &.pk-badge--neutral { background: var(--pk-neutral-500); }
  }
  
  // ================================
  // VARIANT: Outlined
  // ================================
  &--outlined {
    background: transparent;
    border: var(--pk-border-width) solid;
    
    &.pk-badge--primary { 
      border-color: var(--pk-primary-500); 
      color: var(--pk-primary-600); 
    }
    &.pk-badge--secondary { 
      border-color: var(--pk-secondary-500); 
      color: var(--pk-secondary-600); 
    }
    &.pk-badge--accent { 
      border-color: var(--pk-accent-500); 
      color: var(--pk-accent-600); 
    }
    &.pk-badge--success { 
      border-color: var(--pk-success-500); 
      color: var(--pk-success-600); 
    }
    &.pk-badge--warning { 
      border-color: var(--pk-warning-500); 
      color: var(--pk-warning-700); 
    }
    &.pk-badge--error { 
      border-color: var(--pk-error-500); 
      color: var(--pk-error-600); 
    }
    &.pk-badge--info { 
      border-color: var(--pk-info-500); 
      color: var(--pk-info-600); 
    }
    &.pk-badge--neutral { 
      border-color: var(--pk-neutral-400); 
      color: var(--pk-neutral-600); 
    }
  }
  
  // ================================
  // VARIANT: Tonal
  // ================================
  &--tonal {
    &.pk-badge--primary { 
      background: var(--pk-primary-100); 
      color: var(--pk-primary-700); 
    }
    &.pk-badge--secondary { 
      background: var(--pk-secondary-100); 
      color: var(--pk-secondary-700); 
    }
    &.pk-badge--accent { 
      background: var(--pk-accent-100); 
      color: var(--pk-accent-700); 
    }
    &.pk-badge--success { 
      background: var(--pk-success-100); 
      color: var(--pk-success-700); 
    }
    &.pk-badge--warning { 
      background: var(--pk-warning-100); 
      color: var(--pk-warning-800); 
    }
    &.pk-badge--error { 
      background: var(--pk-error-100); 
      color: var(--pk-error-700); 
    }
    &.pk-badge--info { 
      background: var(--pk-info-100); 
      color: var(--pk-info-700); 
    }
    &.pk-badge--neutral { 
      background: var(--pk-neutral-100); 
      color: var(--pk-neutral-700); 
    }
  }
}
</style>



