<template>
  <label :class="switchClasses">
    <input
      type="checkbox"
      class="pk-switch__input"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="pk-switch__track">
      <span class="pk-switch__thumb" />
    </span>
    <span v-if="label || $slots.default" class="pk-switch__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface PkSwitchProps {
  modelValue?: boolean
  label?: string
  disabled?: boolean
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<PkSwitchProps>(), {
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
  'pk-switch',
  `pk-switch--${props.size}`,
  `pk-switch--${props.color}`,
  {
    'pk-switch--checked': props.modelValue,
    'pk-switch--disabled': props.disabled,
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
.pk-switch {
  display: inline-flex;
  align-items: center;
  gap: var(--pk-space-3);
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
    background: var(--pk-neutral-300);
    border-radius: var(--pk-radius-full);
    transition: background var(--pk-duration-200) var(--pk-ease-out);
  }
  
  &__thumb {
    position: absolute;
    background: var(--pk-neutral-0);
    border-radius: var(--pk-radius-full);
    box-shadow: var(--pk-shadow-sm);
    transition: transform var(--pk-duration-200) var(--pk-ease-out);
  }
  
  &__label {
    font-size: var(--pk-text-base);
    color: var(--pk-neutral-800);
  }
  
  // Sizes
  &--sm {
    .pk-switch__track {
      width: 2rem;
      height: 1.125rem;
      padding: 2px;
    }
    
    .pk-switch__thumb {
      width: 0.875rem;
      height: 0.875rem;
      left: 2px;
    }
    
    &.pk-switch--checked .pk-switch__thumb {
      transform: translateX(0.875rem);
    }
    
    .pk-switch__label {
      font-size: var(--pk-text-sm);
    }
  }
  
  &--md {
    .pk-switch__track {
      width: 2.75rem;
      height: 1.5rem;
      padding: 3px;
    }
    
    .pk-switch__thumb {
      width: 1.125rem;
      height: 1.125rem;
      left: 3px;
    }
    
    &.pk-switch--checked .pk-switch__thumb {
      transform: translateX(1.25rem);
    }
  }
  
  &--lg {
    .pk-switch__track {
      width: 3.5rem;
      height: 2rem;
      padding: 4px;
    }
    
    .pk-switch__thumb {
      width: 1.5rem;
      height: 1.5rem;
      left: 4px;
    }
    
    &.pk-switch--checked .pk-switch__thumb {
      transform: translateX(1.5rem);
    }
    
    .pk-switch__label {
      font-size: var(--pk-text-lg);
    }
  }
  
  // Hover
  &:hover:not(&--disabled) {
    .pk-switch__track {
      background: var(--pk-neutral-400);
    }
  }
  
  // Colors when checked
  @mixin switch-color($color-500, $color-600) {
    &.pk-switch--checked {
      .pk-switch__track {
        background: $color-500;
      }
      
      &:hover:not(.pk-switch--disabled) .pk-switch__track {
        background: $color-600;
      }
    }
  }
  
  &--primary { @include switch-color(var(--pk-primary-500), var(--pk-primary-600)); }
  &--secondary { @include switch-color(var(--pk-secondary-500), var(--pk-secondary-600)); }
  &--accent { @include switch-color(var(--pk-accent-500), var(--pk-accent-600)); }
  &--success { @include switch-color(var(--pk-success-500), var(--pk-success-600)); }
  &--warning { @include switch-color(var(--pk-warning-500), var(--pk-warning-600)); }
  &--error { @include switch-color(var(--pk-error-500), var(--pk-error-600)); }
  
  // Disabled
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  // Focus
  &:focus-within .pk-switch__track {
    box-shadow: 0 0 0 3px var(--pk-primary-100);
  }
}
</style>



