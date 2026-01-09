<template>
  <span class="ae-badge" :class="badgeClasses">
    <!-- Icon (before) -->
    <span v-if="$slots.icon || icon" class="ae-badge__icon">
      <slot name="icon">
        <component v-if="icon" :is="icon" />
      </slot>
    </span>
    
    <!-- Content -->
    <span v-if="!dot" class="ae-badge__content">
      <slot>{{ content }}</slot>
    </span>
    
    <!-- Remove button -->
    <button 
      v-if="removable" 
      type="button" 
      class="ae-badge__remove"
      @click.stop="$emit('remove')"
      aria-label="Remove"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface AeBadgeProps {
  /** Badge content (alternative to slot) */
  content?: string | number
  /** Color variant */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  /** Visual variant */
  variant?: 'filled' | 'outlined' | 'soft'
  /** Badge size */
  size?: 'sm' | 'md' | 'lg'
  /** Fully rounded (pill style) */
  rounded?: boolean
  /** Dot indicator mode */
  dot?: boolean
  /** Show remove button */
  removable?: boolean
  /** Icon component */
  icon?: any
}

const props = withDefaults(defineProps<AeBadgeProps>(), {
  color: 'primary',
  variant: 'filled',
  size: 'md',
  rounded: false,
  dot: false,
  removable: false
})

defineEmits<{
  'remove': []
}>()

const badgeClasses = computed(() => [
  `ae-badge--${props.color}`,
  `ae-badge--${props.variant}`,
  `ae-badge--${props.size}`,
  {
    'ae-badge--rounded': props.rounded,
    'ae-badge--dot': props.dot,
    'ae-badge--removable': props.removable
  }
])
</script>

<style lang="scss" scoped>
.ae-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sds-size-space-4);
  font-weight: 500;
  white-space: nowrap;
  border-radius: var(--sds-size-radius-50);
  transition: all var(--ae-duration-100) var(--ae-ease-out);
  vertical-align: middle;

  // ================================
  // SIZES
  // ================================
  &--sm {
    font-size: 0.625rem;
    padding: var(--sds-size-space-2) var(--sds-size-space-6);
    min-height: 18px;
    line-height: 1;
    
    .ae-badge__icon svg {
      width: 10px;
      height: 10px;
    }
    
    .ae-badge__remove svg {
      width: 10px;
      height: 10px;
    }
  }

  &--md {
    font-size: 0.75rem;
    padding: var(--sds-size-space-2) var(--sds-size-space-8);
    min-height: 22px;
    line-height: 1.2;
    
    .ae-badge__icon svg {
      width: 12px;
      height: 12px;
    }
    
    .ae-badge__remove svg {
      width: 12px;
      height: 12px;
    }
  }

  &--lg {
    font-size: 0.875rem;
    padding: var(--sds-size-space-4) var(--sds-size-space-12);
    min-height: 28px;
    line-height: 1.2;
    
    .ae-badge__icon svg {
      width: 14px;
      height: 14px;
    }
    
    .ae-badge__remove svg {
      width: 14px;
      height: 14px;
    }
  }

  // ================================
  // ROUNDED (Pill)
  // ================================
  &--rounded {
    border-radius: var(--sds-size-radius-full);
  }

  // ================================
  // DOT INDICATOR
  // ================================
  &--dot {
    width: 8px;
    height: 8px;
    min-height: 0;
    padding: 0;
    border-radius: var(--sds-size-radius-full);

    &.ae-badge--md {
      width: 10px;
      height: 10px;
    }

    &.ae-badge--lg {
      width: 12px;
      height: 12px;
    }
  }

  // ================================
  // ICON
  // ================================
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  // ================================
  // CONTENT
  // ================================
  &__content {
    display: inline-flex;
    align-items: center;
  }

  // ================================
  // REMOVE BUTTON
  // ================================
  &__remove {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin-left: var(--sds-size-space-2);
    border: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
    opacity: 0.7;
    border-radius: var(--sds-size-radius-full);
    transition: opacity var(--ae-duration-100) var(--ae-ease-out);
    flex-shrink: 0;

    &:hover {
      opacity: 1;
    }
  }

  // ================================
  // VARIANT: Filled
  // ================================
  &--filled {
    &.ae-badge--primary {
      background: var(--sds-color-background-brand-default);
      color: var(--sds-color-text-brand-on-brand);
    }

    &.ae-badge--secondary {
      background: var(--sds-color-background-default-secondary);
      color: var(--sds-color-text-primary-default);
    }

    &.ae-badge--success {
      background: var(--sds-color-background-positive-default);
      color: white;
    }

    &.ae-badge--warning {
      background: var(--sds-color-background-warning-default);
      color: var(--sds-color-text-primary-default);
    }

    &.ae-badge--danger {
      background: var(--sds-color-background-negative-default);
      color: white;
    }

    &.ae-badge--info {
      background: var(--sds-color-background-brand-secondary);
      color: var(--sds-color-text-brand-secondary);
    }

    &.ae-badge--neutral {
      background: var(--sds-color-background-default-tertiary);
      color: var(--sds-color-text-primary-secondary);
    }
  }

  // ================================
  // VARIANT: Outlined
  // ================================
  &--outlined {
    background: transparent;
    border: 1px solid;

    &.ae-badge--primary {
      border-color: var(--sds-color-border-brand-default);
      color: var(--sds-color-text-brand-secondary);
    }

    &.ae-badge--secondary {
      border-color: var(--sds-color-border-default-secondary);
      color: var(--sds-color-text-primary-secondary);
    }

    &.ae-badge--success {
      border-color: var(--sds-color-border-positive-default);
      color: var(--sds-color-text-positive-primary);
    }

    &.ae-badge--warning {
      border-color: var(--sds-color-border-warning-default);
      color: var(--sds-color-text-warning-primary);
    }

    &.ae-badge--danger {
      border-color: var(--sds-color-border-negative-default);
      color: var(--sds-color-text-negative-primary);
    }

    &.ae-badge--info {
      border-color: var(--sds-color-border-brand-default);
      color: var(--sds-color-text-brand-secondary);
    }

    &.ae-badge--neutral {
      border-color: var(--sds-color-border-default-primary);
      color: var(--sds-color-text-primary-tertiary);
    }
  }

  // ================================
  // VARIANT: Soft
  // ================================
  &--soft {
    &.ae-badge--primary {
      background: var(--sds-color-background-brand-secondary);
      color: var(--sds-color-text-brand-secondary);
    }

    &.ae-badge--secondary {
      background: var(--sds-color-background-default-primary-hover);
      color: var(--sds-color-text-primary-secondary);
    }

    &.ae-badge--success {
      background: var(--sds-color-background-positive-secondary);
      color: var(--sds-color-text-positive-primary);
    }

    &.ae-badge--warning {
      background: var(--sds-color-background-warning-secondary);
      color: var(--sds-color-text-warning-primary);
    }

    &.ae-badge--danger {
      background: var(--sds-color-background-negative-secondary);
      color: var(--sds-color-text-negative-primary);
    }

    &.ae-badge--info {
      background: var(--sds-color-background-brand-secondary);
      color: var(--sds-color-text-brand-secondary);
    }

    &.ae-badge--neutral {
      background: var(--sds-color-background-surface-tertiary);
      color: var(--sds-color-text-primary-tertiary);
    }
  }
}
</style>
