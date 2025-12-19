<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    :type="type"
    @click="handleClick"
  >
    <span v-if="loading" class="ae-btn__loader">
      <svg class="ae-btn__spinner" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      </svg>
    </span>
    <span v-if="$slots.prepend && !loading" class="ae-btn__prepend">
      <slot name="prepend" />
    </span>
    <span class="ae-btn__content">
      <slot />
    </span>
    <span v-if="$slots.append" class="ae-btn__append">
      <slot name="append" />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface AeButtonProps {
  variant?: 'filled' | 'outlined' | 'text'
  color?: 'primary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  rounded?: boolean
  icon?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<AeButtonProps>(), {
  variant: 'filled',
  color: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
  rounded: false,
  icon: false,
  type: 'button',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => [
  'ae-btn ae-typo-single-line-body-base',
  `ae-btn--${props.variant}`,
  `ae-btn--${props.color}`,
  `ae-btn--${props.size}`,
  {
    'ae-btn--disabled': props.disabled,
    'ae-btn--loading': props.loading,
    'ae-btn--block': props.block,
    'ae-btn--rounded': props.rounded,
    'ae-btn--icon': props.icon,
  },
])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
.ae-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sds-size-space-8);
  text-transform: none;
  border-radius: var(--sds-size-radius-50);
  cursor: pointer;
  transition: all var(--ae-duration-200) var(--ae-ease-out);
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  
  // Ripple effect container
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: currentColor;
    opacity: 0;
    transition: opacity var(--ae-duration-150) var(--ae-ease-out);
  }
  
  &:hover::before {
    opacity: 0.08;
  }
  
  &:active::before {
    opacity: 0.12;
  }
  
  // Sizes
  &--sm {
    padding: var(--sds-size-space-8);
  }
  
  &--md {
    padding: var(--sds-size-space-12);
  }
  
  &--lg {
    padding: var(--sds-size-space-16);
  }
  
  // Block
  &--block {
    width: 100%;
  }
  
  // Rounded
  &--rounded {
    border-radius: var(--sds-size-radius-full);
  }
  
  // Disabled
  &--disabled,
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  // Loading
  &--loading {
    cursor: wait;
    
    .ae-btn__content {
      opacity: 0.7;
    }
  }
  
  // Elements
  &__loader {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &__spinner {
    width: 1.25em;
    height: 1.25em;
    animation: ae-spin 1s linear infinite;
    
    circle {
      stroke-dasharray: 50;
      stroke-dashoffset: 20;
    }
  }
  
  &__prepend,
  &__append {
    display: flex;
    align-items: center;
    
    svg {
      width: 1.25em;
      height: 1.25em;
    }
  }
  
  &__content {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--ae-space-2);
  }
  
  // ================================
  // VARIANT: Filled
  // ================================
  &--filled {
    border: none;
    color: var(--sds-color-text-brand-primary);
    
    &.ae-btn--primary {
      background: var(--sds-color-background-brand-default);
      
      &:hover {
        background: var(--sds-color-background-brand-hover);
        transform: translateY(-1px);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
    
    &.ae-btn--danger {
      background: var(--sds-color-background-danger-default);
      color: var(--sds-color-text-danger-on-danger);
      border: var(--sds-size-stroke-border) solid;
      border-color: var(--sds-color-border-danger-secondary);

      &:hover {
        border-color: var(--sds-color-border-danger-default);
        background: var(--sds-color-background-danger-hover);
        transform: translateY(-1px);
      }
    }
  }
  
  // ================================
  // VARIANT: Outlined
  // ================================
  &--outlined {
    background: transparent;
    border: var(--sds-size-stroke-border) solid;
    
    &.ae-btn--primary {
      border-color: var(--sds-color-border-default-teriary);
      color: var(--sds-color-text-default-primary);
      
      &:hover {
        background: var(--sds-color-background-brand-secondary-hover);
        border-color: var(--sds-color-border-brand-green);
        color: var(--sds-color-text-brand-primary);
      }
    }
    
    &.ae-btn--danger {
      border-color: var(--sds-color-border-danger-secondary);
      color: var(--sds-color-text-danger-tertiary);
      
      &:hover {
        background: var(--sds-color-background-danger-tertiary-hover);
        border-color: var(--sds-color-border-danger-default);
        color: var(--sds-color-text-danger-default);
      }
    }
  }
  
  // ================================
  // VARIANT: Text
  // ================================
  &--text {
    background: transparent;
    border: none;
    
    &.ae-btn--primary {
      color: var(--sds-color-text-brand-secondary);
      
      &:hover {
        background: var(--ae-primary-50);
      }
    }
    
    &.ae-btn--danger {
      color: var(--sds-color-text-danger-tertiary);
      
      &:hover {
        background: var(--ae-secondary-50);
        color: var(--sds-color-text-danger-default);
      }
    }
  }

  // ================================
  // VARIANT: Icon
  // ================================
  &--icon {
    color: var(--sds-color-icon-primary-default);
    //padding: var(--sds-size-space-12);
    border-radius: var(--sds-size-radius-50);
    border: var(--sds-size-stroke-border) solid;

    &.ae-btn--filled {
      background: var(--sds-color-background-button-hover);
      border-color: var(--sds-color-border-default-primary);

      &:hover {
        background: var(--sds-color-background-default-secondary-hover);
        border-color: var(--sds-color-border-default-primary);
      }
    }

    &.ae-btn--outlined {
      background-color: var(--sds-color-background-surface-default);
      border-color: var(--sds-color-border-default-secondary);

      &:hover {
        background-color: var(--sds-color-background-surface-default);
        border-color: var(--sds-color-border-brand-green);
        color: var(--sds-color-icon-primary-default);
      }
    }

    &.ae-btn--text {
      border: none;
      background-color: transparent;
      color: var(--sds-color-icon-primary-default);

      &:hover {
        background-color: var(--sds-color-background-default-primary-hover);
      }
    }
  }
}

@keyframes ae-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>



