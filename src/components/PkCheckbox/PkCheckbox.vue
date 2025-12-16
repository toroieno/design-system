<template>
  <label :class="checkboxClasses">
    <input
      type="checkbox"
      class="pk-checkbox__input"
      :checked="isChecked"
      :disabled="disabled"
      :indeterminate="indeterminate"
      @change="handleChange"
    />
    <span class="pk-checkbox__box">
      <svg v-if="isChecked && !indeterminate" class="pk-checkbox__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M5 12l5 5L20 7" />
      </svg>
      <svg v-if="indeterminate" class="pk-checkbox__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M5 12h14" />
      </svg>
    </span>
    <span v-if="label || $slots.default" class="pk-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface PkCheckboxProps {
  modelValue?: boolean | any[]
  value?: any
  label?: string
  disabled?: boolean
  indeterminate?: boolean
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<PkCheckboxProps>(), {
  modelValue: false,
  disabled: false,
  indeterminate: false,
  color: 'primary',
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean | any[]]
  'change': [value: boolean | any[]]
}>()

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(props.value)
  }
  return props.modelValue
})

const checkboxClasses = computed(() => [
  'pk-checkbox',
  `pk-checkbox--${props.size}`,
  `pk-checkbox--${props.color}`,
  {
    'pk-checkbox--checked': isChecked.value,
    'pk-checkbox--disabled': props.disabled,
    'pk-checkbox--indeterminate': props.indeterminate,
  },
])

const handleChange = (event: Event) => {
  if (props.disabled) return
  
  const target = event.target as HTMLInputElement
  let newValue: boolean | any[]
  
  if (Array.isArray(props.modelValue)) {
    newValue = [...props.modelValue]
    if (target.checked) {
      newValue.push(props.value)
    } else {
      const index = newValue.indexOf(props.value)
      if (index > -1) newValue.splice(index, 1)
    }
  } else {
    newValue = target.checked
  }
  
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style lang="scss" scoped>
.pk-checkbox {
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
  
  &__box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: var(--pk-border-width-2) solid var(--pk-neutral-400);
    border-radius: var(--pk-radius-sm);
    background: var(--pk-neutral-0);
    transition: all var(--pk-duration-150) var(--pk-ease-out);
  }
  
  &__check {
    color: white;
    opacity: 0;
    transform: scale(0.5);
    transition: all var(--pk-duration-150) var(--pk-ease-bounce);
  }
  
  &__label {
    font-size: var(--pk-text-base);
    color: var(--pk-neutral-800);
  }
  
  // Sizes
  &--sm {
    .pk-checkbox__box {
      width: 1rem;
      height: 1rem;
    }
    
    .pk-checkbox__check {
      width: 0.625rem;
      height: 0.625rem;
    }
    
    .pk-checkbox__label {
      font-size: var(--pk-text-sm);
    }
  }
  
  &--md {
    .pk-checkbox__box {
      width: 1.25rem;
      height: 1.25rem;
    }
    
    .pk-checkbox__check {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
  
  &--lg {
    .pk-checkbox__box {
      width: 1.5rem;
      height: 1.5rem;
    }
    
    .pk-checkbox__check {
      width: 1rem;
      height: 1rem;
    }
    
    .pk-checkbox__label {
      font-size: var(--pk-text-lg);
    }
  }
  
  // Hover
  &:hover:not(&--disabled) {
    .pk-checkbox__box {
      border-color: var(--pk-neutral-500);
    }
  }
  
  // Colors when checked
  @mixin checkbox-color($color-500, $color-600) {
    &.pk-checkbox--checked,
    &.pk-checkbox--indeterminate {
      .pk-checkbox__box {
        background: $color-500;
        border-color: $color-500;
      }
      
      .pk-checkbox__check {
        opacity: 1;
        transform: scale(1);
      }
      
      &:hover:not(.pk-checkbox--disabled) .pk-checkbox__box {
        background: $color-600;
        border-color: $color-600;
      }
    }
  }
  
  &--primary { @include checkbox-color(var(--pk-primary-500), var(--pk-primary-600)); }
  &--secondary { @include checkbox-color(var(--pk-secondary-500), var(--pk-secondary-600)); }
  &--accent { @include checkbox-color(var(--pk-accent-500), var(--pk-accent-600)); }
  &--success { @include checkbox-color(var(--pk-success-500), var(--pk-success-600)); }
  &--warning { @include checkbox-color(var(--pk-warning-500), var(--pk-warning-600)); }
  &--error { @include checkbox-color(var(--pk-error-500), var(--pk-error-600)); }
  
  // Disabled
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  // Focus
  &:focus-within .pk-checkbox__box {
    box-shadow: 0 0 0 3px var(--pk-primary-100);
  }
}
</style>



