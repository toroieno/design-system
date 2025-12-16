<template>
  <div :class="wrapperClasses">
    <label v-if="label" :for="inputId" class="pk-input__label">
      {{ label }}
      <span v-if="required" class="pk-input__required">*</span>
    </label>
    
    <div class="pk-input__container">
      <span v-if="$slots.prepend" class="pk-input__prepend">
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
      
      <span v-if="clearable && inputValue" class="pk-input__clear" @click="handleClear">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </span>
      
      <span v-if="$slots.append" class="pk-input__append">
        <slot name="append" />
      </span>
    </div>
    
    <div v-if="hint || errorMessage" class="pk-input__messages">
      <span v-if="errorMessage" class="pk-input__error">{{ errorMessage }}</span>
      <span v-else-if="hint" class="pk-input__hint">{{ hint }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue'

export interface PkInputProps {
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
  color?: 'primary' | 'secondary' | 'accent'
  autocomplete?: string
}

const props = withDefaults(defineProps<PkInputProps>(), {
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
  'pk-input',
  `pk-input--${props.size}`,
  `pk-input--${props.variant}`,
  `pk-input--${props.color}`,
  {
    'pk-input--focused': isFocused.value,
    'pk-input--error': hasError.value,
    'pk-input--disabled': props.disabled,
    'pk-input--readonly': props.readonly,
    'pk-input--has-value': hasValue.value,
  },
])

const inputClasses = computed(() => ['pk-input__field'])

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
.pk-input {
  display: flex;
  flex-direction: column;
  gap: var(--pk-space-1);
  width: 100%;
  
  // Label
  &__label {
    font-size: var(--pk-text-sm);
    font-weight: var(--pk-font-medium);
    color: var(--pk-neutral-700);
    margin-bottom: var(--pk-space-1);
  }
  
  &__required {
    color: var(--pk-error-500);
    margin-left: 2px;
  }
  
  // Container
  &__container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    transition: all var(--pk-duration-200) var(--pk-ease-out);
  }
  
  // Field
  &__field {
    flex: 1;
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-family: var(--pk-font-family);
    font-size: var(--pk-text-base);
    color: var(--pk-neutral-900);
    
    &::placeholder {
      color: var(--pk-neutral-400);
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
    color: var(--pk-neutral-500);
    
    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  
  &__prepend {
    margin-right: var(--pk-space-2);
  }
  
  &__append {
    margin-left: var(--pk-space-2);
  }
  
  // Clear button
  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    margin-left: var(--pk-space-2);
    color: var(--pk-neutral-400);
    cursor: pointer;
    border-radius: var(--pk-radius-full);
    transition: all var(--pk-duration-150) var(--pk-ease-out);
    
    &:hover {
      color: var(--pk-neutral-600);
      background: var(--pk-neutral-100);
    }
    
    svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
  
  // Messages
  &__messages {
    min-height: 1.25rem;
    font-size: var(--pk-text-xs);
  }
  
  &__hint {
    color: var(--pk-neutral-500);
  }
  
  &__error {
    color: var(--pk-error-500);
  }
  
  // ================================
  // SIZES
  // ================================
  &--sm {
    .pk-input__container {
      height: var(--pk-input-height-sm);
      padding: 0 var(--pk-space-3);
    }
    
    .pk-input__field {
      font-size: var(--pk-text-sm);
    }
  }
  
  &--md {
    .pk-input__container {
      height: var(--pk-input-height-md);
      padding: 0 var(--pk-space-4);
    }
  }
  
  &--lg {
    .pk-input__container {
      height: var(--pk-input-height-lg);
      padding: 0 var(--pk-space-5);
    }
    
    .pk-input__field {
      font-size: var(--pk-text-lg);
    }
  }
  
  // ================================
  // VARIANT: Outlined
  // ================================
  &--outlined {
    .pk-input__container {
      border: var(--pk-border-width-2) solid var(--pk-neutral-300);
      border-radius: var(--pk-radius-lg);
      background: var(--pk-neutral-0);
    }
    
    &.pk-input--focused .pk-input__container {
      border-color: var(--pk-primary-500);
      box-shadow: 0 0 0 3px var(--pk-primary-100);
    }
    
    &.pk-input--error .pk-input__container {
      border-color: var(--pk-error-500);
      
      &:focus-within {
        box-shadow: 0 0 0 3px var(--pk-error-100);
      }
    }
    
    // Color variants
    &.pk-input--secondary.pk-input--focused .pk-input__container {
      border-color: var(--pk-secondary-500);
      box-shadow: 0 0 0 3px var(--pk-secondary-100);
    }
    
    &.pk-input--accent.pk-input--focused .pk-input__container {
      border-color: var(--pk-accent-500);
      box-shadow: 0 0 0 3px var(--pk-accent-100);
    }
  }
  
  // ================================
  // VARIANT: Filled
  // ================================
  &--filled {
    .pk-input__container {
      border: none;
      border-radius: var(--pk-radius-lg) var(--pk-radius-lg) 0 0;
      background: var(--pk-neutral-100);
      border-bottom: 2px solid var(--pk-neutral-400);
    }
    
    &.pk-input--focused .pk-input__container {
      background: var(--pk-neutral-50);
      border-bottom-color: var(--pk-primary-500);
    }
    
    &.pk-input--error .pk-input__container {
      border-bottom-color: var(--pk-error-500);
    }
    
    &.pk-input--secondary.pk-input--focused .pk-input__container {
      border-bottom-color: var(--pk-secondary-500);
    }
    
    &.pk-input--accent.pk-input--focused .pk-input__container {
      border-bottom-color: var(--pk-accent-500);
    }
  }
  
  // ================================
  // VARIANT: Underlined
  // ================================
  &--underlined {
    .pk-input__container {
      border: none;
      border-radius: 0;
      background: transparent;
      border-bottom: 2px solid var(--pk-neutral-300);
      padding-left: 0;
      padding-right: 0;
    }
    
    &.pk-input--focused .pk-input__container {
      border-bottom-color: var(--pk-primary-500);
    }
    
    &.pk-input--error .pk-input__container {
      border-bottom-color: var(--pk-error-500);
    }
    
    &.pk-input--secondary.pk-input--focused .pk-input__container {
      border-bottom-color: var(--pk-secondary-500);
    }
    
    &.pk-input--accent.pk-input--focused .pk-input__container {
      border-bottom-color: var(--pk-accent-500);
    }
  }
  
  // ================================
  // STATES
  // ================================
  &--disabled {
    opacity: 0.5;
    pointer-events: none;
    
    .pk-input__container {
      background: var(--pk-neutral-100);
    }
  }
  
  &--readonly {
    .pk-input__container {
      background: var(--pk-neutral-50);
    }
    
    .pk-input__field {
      cursor: default;
    }
  }
}
</style>



