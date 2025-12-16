<template>
  <label :class="radioClasses">
    <input
      type="radio"
      class="pk-radio__input"
      :checked="isChecked"
      :name="name"
      :value="value"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="pk-radio__circle">
      <span class="pk-radio__dot" />
    </span>
    <span v-if="label || $slots.default" class="pk-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface PkRadioProps {
  modelValue?: any
  value?: any
  name?: string
  label?: string
  disabled?: boolean
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<PkRadioProps>(), {
  disabled: false,
  color: 'primary',
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  'change': [value: any]
}>()

const isChecked = computed(() => props.modelValue === props.value)

const radioClasses = computed(() => [
  'pk-radio',
  `pk-radio--${props.size}`,
  `pk-radio--${props.color}`,
  {
    'pk-radio--checked': isChecked.value,
    'pk-radio--disabled': props.disabled,
  },
])

const handleChange = () => {
  if (props.disabled) return
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>

<style lang="scss" scoped>
.pk-radio {
  display: inline-flex;
  align-items: center;
  gap: var(--pk-space-2);
  cursor: pointer;
  user-select: none;
  
  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }
  
  &__circle {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: var(--pk-border-width-2) solid var(--pk-neutral-400);
    border-radius: var(--pk-radius-full);
    background: var(--pk-neutral-0);
    transition: all var(--pk-duration-150) var(--pk-ease-out);
  }
  
  &__dot {
    border-radius: var(--pk-radius-full);
    background: currentColor;
    transform: scale(0);
    transition: transform var(--pk-duration-150) var(--pk-ease-bounce);
  }
  
  &__label {
    font-size: var(--pk-text-base);
    color: var(--pk-neutral-800);
  }
  
  // Sizes
  &--sm {
    .pk-radio__circle {
      width: 1rem;
      height: 1rem;
    }
    
    .pk-radio__dot {
      width: 0.375rem;
      height: 0.375rem;
    }
    
    .pk-radio__label {
      font-size: var(--pk-text-sm);
    }
  }
  
  &--md {
    .pk-radio__circle {
      width: 1.25rem;
      height: 1.25rem;
    }
    
    .pk-radio__dot {
      width: 0.5rem;
      height: 0.5rem;
    }
  }
  
  &--lg {
    .pk-radio__circle {
      width: 1.5rem;
      height: 1.5rem;
    }
    
    .pk-radio__dot {
      width: 0.625rem;
      height: 0.625rem;
    }
    
    .pk-radio__label {
      font-size: var(--pk-text-lg);
    }
  }
  
  // Hover
  &:hover:not(&--disabled) {
    .pk-radio__circle {
      border-color: var(--pk-neutral-500);
    }
  }
  
  // Colors when checked
  @mixin radio-color($color-500, $color-600) {
    &.pk-radio--checked {
      .pk-radio__circle {
        border-color: $color-500;
        color: $color-500;
      }
      
      .pk-radio__dot {
        transform: scale(1);
      }
      
      &:hover:not(.pk-radio--disabled) .pk-radio__circle {
        border-color: $color-600;
        color: $color-600;
      }
    }
  }
  
  &--primary { @include radio-color(var(--pk-primary-500), var(--pk-primary-600)); }
  &--secondary { @include radio-color(var(--pk-secondary-500), var(--pk-secondary-600)); }
  &--accent { @include radio-color(var(--pk-accent-500), var(--pk-accent-600)); }
  &--success { @include radio-color(var(--pk-success-500), var(--pk-success-600)); }
  &--warning { @include radio-color(var(--pk-warning-500), var(--pk-warning-600)); }
  &--error { @include radio-color(var(--pk-error-500), var(--pk-error-600)); }
  
  // Disabled
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  // Focus
  &:focus-within .pk-radio__circle {
    box-shadow: 0 0 0 3px var(--pk-primary-100);
  }
}
</style>



