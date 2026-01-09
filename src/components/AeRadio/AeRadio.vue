<template>
  <label :class="radioClasses">
    <input
      type="radio"
      class="ae-radio__input"
      :checked="isChecked"
      :name="name"
      :value="value"
      :disabled="disabled"
      @change="handleChange"
    />
    <span class="ae-radio__circle">
      <span class="ae-radio__dot" />
    </span>
    <span v-if="label || $slots.default" class="ae-radio__label ae-typo-single-line-body-small-strong">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface AeRadioProps {
  modelValue?: any
  value?: any
  name?: string
  label?: string
  disabled?: boolean
  color?: 'primary'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<AeRadioProps>(), {
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
  'ae-radio',
  `ae-radio--${props.size}`,
  `ae-radio--${props.color}`,
  {
    'ae-radio--checked': isChecked.value,
    'ae-radio--disabled': props.disabled,
  },
])

const handleChange = () => {
  if (props.disabled) return
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>

<style lang="scss" scoped>
.ae-radio {
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
  
  &__circle {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--sds-color-border-default-teriary);
    border-radius: var(--sds-size-radius-full);
    background: var(--sds-color-background-opacity-200);
    transition: all var(--ae-duration-150) var(--ae-ease-out);
  }
  
  &__dot {
    border-radius: var(--sds-size-radius-full);
    background: currentColor;
    transform: scale(0);
    transition: transform var(--ae-duration-150) var(--ae-ease-bounce);
  }
  
  &__label {
    color: var(--sds-color-text-primary-default);
  }
  
  // Sizes
  &--sm {
    .ae-radio__circle {
      width: 12px;
      height: 12px;
    }
    
    .ae-radio__dot {
      width: 6px;
      height: 6px;
    }
  }
  
  &--md {
    .ae-radio__circle {
      width: 16px;
      height: 16px;
    }
    
    .ae-radio__dot {
      width: 10px;
      height: 10px;
    }
  }
  
  &--lg {
    .ae-radio__circle {
      width: 20px;
      height: 20px;
    }
    
    .ae-radio__dot {
      width: 14px;
      height: 14px;
    }
  }
  
  // Hover
  &:hover:not(&--disabled) {
    .ae-radio__circle {
      border-color: var(--sds-color-text-primary-default);
    }
  }
  
  // Colors when checked
  @mixin radio-color($color-500, $color-600) {
    &.ae-radio--checked {
      .ae-radio__circle {
        border-color: $color-500;
        color: $color-500;
      }
      
      .ae-radio__dot {
        transform: scale(1);
      }
      
      &:hover:not(.ae-radio--disabled) .ae-radio__circle {
        border-color: $color-600;
        color: $color-600;
      }
    }
  }
  
  &--primary { @include radio-color(var(--sds-color-border-brand-green), var(--sds-color-border-brand-green)); }
  
  // Disabled
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>



