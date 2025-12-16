<template>
  <label :class="checkboxClasses">
    <input
      type="checkbox"
      class="ae-checkbox__input"
      :checked="isChecked"
      :disabled="disabled"
      :indeterminate="indeterminate"
      @change="handleChange"
    />
    <span class="ae-checkbox__box">
      <svg v-if="isChecked && !indeterminate" class="ae-checkbox__check" xmlns="http://www.w3.org/2000/svg" width="13" height="9" viewBox="0 0 13 9" fill="none">
        <path d="M11.4667 0.800003L4.13334 8.13334L0.800003 4.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg v-if="indeterminate" class="ae-checkbox__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <path d="M5 12h14" />
      </svg>
    </span>
    <span v-if="label || $slots.default" class="ae-checkbox__label ae-text-body-base">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface AeCheckboxProps {
  modelValue?: boolean | any[]
  value?: any
  label?: string
  disabled?: boolean
  indeterminate?: boolean
  color?: 'primary'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<AeCheckboxProps>(), {
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
  'ae-checkbox',
  `ae-checkbox--${props.size}`,
  `ae-checkbox--${props.color}`,
  {
    'ae-checkbox--checked': isChecked.value,
    'ae-checkbox--disabled': props.disabled,
    'ae-checkbox--indeterminate': props.indeterminate,
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
.ae-checkbox {
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
  
  &__box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--sds-size-radius-50);
    border: var(--sds-size-stroke-border) solid var(--sds-color-border-default-teriary);
    background: var(--sds-color-background-opacity-200);
    transition: all var(--ae-duration-150) var(--ae-ease-out);
  }
  
  &__check {
    color: var(--sds-color-icon-brand-default);
    opacity: 0;
    transform: scale(0.5);
    transition: all var(--ae-duration-150) var(--ae-ease-bounce);
  }
  
  &__label {
    color: var(--sds-color-text-default-primary);
  }
  
  // Sizes
  &--sm {
    .ae-checkbox__box {
      width: 1rem;
      height: 1rem;
    }
    
    .ae-checkbox__check {
      width: 0.625rem;
      height: 0.625rem;
    }
  }
  
  &--md {
    .ae-checkbox__box {
      width: 1.25rem;
      height: 1.25rem;
    }
    
    .ae-checkbox__check {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
  
  &--lg {
    .ae-checkbox__box {
      width: 1.5rem;
      height: 1.5rem;
    }
    
    .ae-checkbox__check {
      width: 1rem;
      height: 1rem;
    }
  }
  
  // Hover
  &:hover:not(&--disabled) {
    .ae-checkbox__box {
      border-color: var(--sds-color-border-default-teriary);
    }
  }
  
  // Colors when checked
  @mixin checkbox-color($color-500, $color-600) {
    &.ae-checkbox--checked,
    &.ae-checkbox--indeterminate {
      .ae-checkbox__box {
        background: $color-500;
        border-color: $color-500;
      }
      
      .ae-checkbox__check {
        opacity: 1;
        transform: scale(1);
      }
      
      &:hover:not(.ae-checkbox--disabled) .ae-checkbox__box {
        background: $color-600;
        border-color: $color-600;
      }
    }
  }
  
  &--primary { @include checkbox-color(var(--sds-color-background-brand-default), 'transparent'); }
  
  // Disabled
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  // Focus
  &:focus-within .ae-checkbox__box {
    box-shadow: 0 0 0 3px var(--ae-primary-100);
  }
}
</style>



