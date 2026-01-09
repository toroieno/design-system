<template>
  <label :class="switchClasses">
    <input
      type="checkbox"
      class="ae-switch__input"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="ae-switch__track">
      <span class="ae-switch__thumb">
        <svg v-if="!modelValue" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M0.530377 0.530334L7.1555 7.15546M7.15546 0.530411L0.530334 7.15554" stroke="var(--sds-color-border-brand-default)" stroke-width="1.5"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
          <path d="M8.24319 0.799988L3.12599 5.91719L0.799988 3.59119" stroke="var(--sds-color-icon-brand-default)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
    </span>
    <span v-if="label || $slots.default" class="ae-switch__label ae-typo-body-small">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface AeSwitchProps {
  modelValue?: boolean
  label?: string
  disabled?: boolean
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<AeSwitchProps>(), {
  modelValue: false,
  disabled: false,
  color: 'primary',
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'change': [value: boolean]
}>()

const switchClasses = computed(() => [
  'ae-switch',
  `ae-switch--${props.size}`,
  `ae-switch--${props.color}`,
  {
    'ae-switch--checked': props.modelValue,
    'ae-switch--disabled': props.disabled,
  },
])

const handleChange = (event: Event) => {
  if (props.disabled) return
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', target.checked)
}
</script>

<style lang="scss" scoped>
.ae-switch {
  display: inline-flex;
  align-items: center;
  gap: var(--sds-size-space-8);
  cursor: pointer;
  user-select: none;
  
  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }
  
  &__track {
    position: relative;
    display: flex;
    align-items: center;
    background: var(--sds-color-background-surface-default);
    border-radius: var(--sds-size-radius-full);
    border: 1px solid var(--sds-color-border-default-primary);
    transition: background var(--ae-duration-200) var(--ae-ease-out);
  }
  
  &__thumb {
    position: absolute;
    background: var(--sds-color-icon-neutral-tertiary);
    border-radius: var(--sds-size-radius-full);
    transition: transform var(--ae-duration-200) var(--ae-ease-out);
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  
  &__label {
    color: var(--sds-color-text-primary-default);
  }
  
  // Sizes
  &--sm {
    .ae-switch__track {
      width: 2rem;
      height: 1.125rem;
      padding: 2px;
    }
    
    .ae-switch__thumb {
      width: 0.875rem;
      height: 0.875rem;
      left: 2px;
    }
    
    &.ae-switch--checked .ae-switch__thumb {
      transform: translateX(0.875rem);
    }
    
    .ae-switch__label {
      font-size: var(--ae-text-sm);
    }
  }
  
  &--md {
    .ae-switch__track {
      width: 2.75rem;
      height: 1.5rem;
      padding: 3px;
    }
    
    .ae-switch__thumb {
      width: 1.125rem;
      height: 1.125rem;
      left: 3px;
    }
    
    &.ae-switch--checked .ae-switch__thumb {
      transform: translateX(1.25rem);
    }
  }
  
  &--lg {
    .ae-switch__track {
      width: 3.5rem;
      height: 2rem;
      padding: 4px;
    }
    
    .ae-switch__thumb {
      width: 1.5rem;
      height: 1.5rem;
      left: 4px;
    }
    
    &.ae-switch--checked .ae-switch__thumb {
      transform: translateX(1.5rem);
    }
  }
  
  // Colors when checked
  @mixin switch-color($color-500, $color-600) {
    &.ae-switch--checked {
      .ae-switch__thumb {
        background: $color-500;
      }
      
      &:hover:not(.ae-switch--disabled) .ae-switch__thumb {
        background: $color-600;
      }
    }
  }
  
  &--primary { @include switch-color(var(--sds-color-border-brand-green), var(--sds-color-border-brand-green)); }
  
  // Disabled
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>



