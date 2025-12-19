<template>
  <div :class="wrapperClasses">
    <label v-if="label" :for="inputId" class="ae-input__label ae-typo-single-line-body-small-strong">
      {{ label }}
      <span v-if="required" class="ae-input__required">*</span>
    </label>
    
    <div class="ae-input__container">
      <span v-if="$slots.prepend" class="ae-input__prepend">
        <slot name="prepend" />
      </span>
      
      <input
        :id="inputId"
        ref="inputRef"
        v-model="inputValue"
        :class="inputClasses"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        @focus="isFocused = true"
        @blur="handleBlur"
        @input="handleInput"
      />
      
      <span v-if="clearable && inputValue" class="ae-input__clear" @click="handleClear">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </span>
      
      <span v-if="$slots.append" class="ae-input__append">
        <slot name="append" />
      </span>
    </div>

    <div v-if="hint || errorMessage" class="ae-input__messages ae-typo-note">
      <span v-if="errorMessage" class="ae-input__error">{{ errorMessage }}</span>
      <span v-else-if="hint" class="ae-input__hint">{{ hint }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue'

export interface AeInputProps {
  modelValue?: string | number
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'
  label?: string
  placeholder?: string
  hint?: string
  errorMessage?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  clearable?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outlined' | 'filled' | 'underlined'
  color?: 'primary'
  autocomplete?: string
}

const props = withDefaults(defineProps<AeInputProps>(), {
  modelValue: '',
  type: 'text',
  size: 'md',
  variant: 'outlined',
  color: 'primary',
  disabled: false,
  readonly: false,
  required: false,
  clearable: false,
  autocomplete: 'off',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'input': [event: Event]
  'blur': [event: FocusEvent]
  'clear': []
}>()

const inputId = useId()
const inputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const hasError = computed(() => !!props.errorMessage)
const hasValue = computed(() => !!inputValue.value || inputValue.value === 0)

const wrapperClasses = computed(() => [
  'ae-input',
  `ae-input--${props.size}`,
  `ae-input--${props.variant}`,
  `ae-input--${props.color}`,
  {
    'ae-input--focused': isFocused.value,
    'ae-input--error': hasError.value,
    'ae-input--disabled': props.disabled,
    'ae-input--readonly': props.readonly,
    'ae-input--has-value': hasValue.value,
  },
])

const inputClasses = computed(() => ['ae-input__field'])

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleInput = (event: Event) => {
  emit('input', event)
}

const handleClear = () => {
  inputValue.value = ''
  emit('clear')
  inputRef.value?.focus()
}

// Expose methods
defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  clear: handleClear,
})
</script>

<style lang="scss" scoped>
.ae-input {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-8);
  width: 100%;
  
  // Label
  &__label {
    color: var(--sds-color-text-default-primary);
  }
  
  &__required {
    color: var(--ae-error-500);
    margin-left: 2px;
  }
  
  // Container
  &__container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    transition: all var(--ae-duration-200) var(--ae-ease-out);
  }

  // Field
  &__field {
    flex: 1;
    width: 100%;
    border: none;
    outline: none;
    padding: var(--sds-size-space-12);
    font-size: var(--ae-text-base);
    color: var(--sds-color-text-default-primary);
    background: transparent;
    
    &::placeholder {
      color: var(--sds-color-text-tertiary-default);
    }

    &:focus {
      border-color: var(--sds-color-border-default-teriary);
    }
    
    &::-webkit-search-cancel-button {
      display: none;
    }
  }
  
  // Prepend / Append
  &__prepend,
  &__append {
    display: flex;
    align-items: center;
    color: var(--ae-neutral-500);
    
    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  
  &__prepend {
    margin-inline-start: var(--sds-size-space-12);
  }
  
  &__append {
    margin-inline-end: var(--sds-size-space-12);
  }
  
  // Clear button
  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    margin-left: var(--ae-space-2);
    color: var(--ae-neutral-400);
    cursor: pointer;
    border-radius: var(--ae-radius-full);
    transition: all var(--ae-duration-150) var(--ae-ease-out);
    
    &:hover {
      color: var(--ae-neutral-600);
      background: var(--ae-neutral-100);
    }
    
    svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
  
  // Messages
  &__messages {
    min-height: 1.25rem;
    color: var(--sds-color-text-tertiary-default);
  }
  
  &__hint {
    color: var(--sds-color-text-tertiary-default);
  }
  
  &__error {
    min-height: 1.25rem;
    color: var(--sds-color-text-danger-default);
  }
  
  // ================================
  // SIZES
  // ================================
  &--sm {
    .ae-input__container {
      height: var(--ae-input-height-sm);
      padding: 0 var(--ae-space-3);
    }
    
    .ae-input__field {
      font-size: var(--ae-text-sm);
    }
  }
  
  &--md {
    .ae-input__container {
      height: var(--ae-input-height-md);
      padding: 0 var(--ae-space-4);
    }
  }
  
  &--lg {
    .ae-input__container {
      height: var(--ae-input-height-lg);
      padding: 0 var(--ae-space-5);
    }
    
    .ae-input__field {
      font-size: var(--ae-text-lg);
    }
  }
  
  // ================================
  // VARIANT: Outlined
  // ================================
  &--outlined {
    .ae-input__container {
      border-radius: var(--sds-size-radius-50);
      border: var(--sds-size-stroke-border) solid var(--sds-color-border-default-primary);
      background: var(--sds-color-background-opacity-100);
    }
    
    &.ae-input--focused .ae-input__container {
      border-color: var(--sds-color-border-default-teriary);
    }
    
    &.ae-input--error .ae-input__container {
      border-color: var(--sds-color-border-danger-default);
      
      &:focus-within {
        box-shadow: 0 0 0 3px var(--ae-error-100);
      }
    }
  }
  
  // ================================
  // VARIANT: Filled
  // ================================
  &--filled {
    .ae-input__container {
      border: var(--sds-size-stroke-border) solid transparent;
      background: var(--sds-color-background-opacity-100);
    }
    
    &.ae-input--focused .ae-input__container {
      border-radius: var(--sds-size-radius-50);
      border-color: var(--sds-color-border-default-teriary);
    }
    
    &.ae-input--error .ae-input__container {
      border-color: var(--sds-color-border-danger-default);
    }
  }
  
  // ================================
  // VARIANT: Underlined
  // ================================
  &--underlined {
    .ae-input__container {
      border: none;
      border-radius: 0;
      background: transparent;
      border-bottom: var(--sds-size-stroke-border) solid var(--sds-color-background-opacity-100);
      padding-left: 0;
      padding-right: 0;
    }
    
    &.ae-input--focused .ae-input__container {
      border-bottom-color: var(--sds-color-border-default-teriary);
    }
    
    &.ae-input--error .ae-input__container {
      border-bottom-color: var(--sds-color-border-danger-default);
    }
  }
  
  // ================================
  // STATES
  // ================================
  &--disabled {
    opacity: 0.5;
    pointer-events: none;
    
    .ae-input__container {
      background: var(--ae-neutral-100);
    }
  }
  
  &--readonly {
    .ae-input__container {
      background: var(--ae-neutral-50);
    }
    
    .ae-input__field {
      cursor: default;
    }
  }
}
</style>



