<template>
  <div :class="wrapperClasses">
    <label v-if="label" :for="textareaId" class="pk-textarea__label">
      {{ label }}
      <span v-if="required" class="pk-textarea__required">*</span>
    </label>
    
    <div class="pk-textarea__container">
      <textarea
        :id="textareaId"
        ref="textareaRef"
        v-model="inputValue"
        class="pk-textarea__field"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :rows="rows"
        :maxlength="maxLength"
        @focus="isFocused = true"
        @blur="handleBlur"
        @input="handleInput"
      />
    </div>
    
    <div class="pk-textarea__footer">
      <span v-if="errorMessage" class="pk-textarea__error">{{ errorMessage }}</span>
      <span v-else-if="hint" class="pk-textarea__hint">{{ hint }}</span>
      <span v-else />
      
      <span v-if="showCount && maxLength" class="pk-textarea__count">
        {{ inputValue?.toString().length || 0 }} / {{ maxLength }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue'

export interface PkTextareaProps {
  modelValue?: string
  label?: string
  placeholder?: string
  hint?: string
  errorMessage?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  rows?: number
  maxLength?: number
  showCount?: boolean
  variant?: 'outlined' | 'filled'
  color?: 'primary' | 'secondary' | 'accent'
}

const props = withDefaults(defineProps<PkTextareaProps>(), {
  modelValue: '',
  rows: 4,
  variant: 'outlined',
  color: 'primary',
  disabled: false,
  readonly: false,
  required: false,
  showCount: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'input': [event: Event]
  'blur': [event: FocusEvent]
}>()

const textareaId = useId()
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const isFocused = ref(false)

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const hasError = computed(() => !!props.errorMessage)

const wrapperClasses = computed(() => [
  'pk-textarea',
  `pk-textarea--${props.variant}`,
  `pk-textarea--${props.color}`,
  {
    'pk-textarea--focused': isFocused.value,
    'pk-textarea--error': hasError.value,
    'pk-textarea--disabled': props.disabled,
    'pk-textarea--readonly': props.readonly,
  },
])

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleInput = (event: Event) => {
  emit('input', event)
}

defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
})
</script>

<style lang="scss" scoped>
.pk-textarea {
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
    width: 100%;
    transition: all var(--pk-duration-200) var(--pk-ease-out);
  }
  
  // Field
  &__field {
    flex: 1;
    width: 100%;
    min-height: 5rem;
    padding: var(--pk-space-3) var(--pk-space-4);
    border: none;
    outline: none;
    background: transparent;
    font-family: var(--pk-font-family);
    font-size: var(--pk-text-base);
    color: var(--pk-neutral-900);
    line-height: var(--pk-leading-relaxed);
    resize: vertical;
    
    &::placeholder {
      color: var(--pk-neutral-400);
    }
  }
  
  // Footer
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 1.25rem;
    font-size: var(--pk-text-xs);
  }
  
  &__hint {
    color: var(--pk-neutral-500);
  }
  
  &__error {
    color: var(--pk-error-500);
  }
  
  &__count {
    color: var(--pk-neutral-500);
  }
  
  // ================================
  // VARIANT: Outlined
  // ================================
  &--outlined {
    .pk-textarea__container {
      border: var(--pk-border-width-2) solid var(--pk-neutral-300);
      border-radius: var(--pk-radius-lg);
      background: var(--pk-neutral-0);
    }
    
    &.pk-textarea--focused .pk-textarea__container {
      border-color: var(--pk-primary-500);
      box-shadow: 0 0 0 3px var(--pk-primary-100);
    }
    
    &.pk-textarea--error .pk-textarea__container {
      border-color: var(--pk-error-500);
      
      &:focus-within {
        box-shadow: 0 0 0 3px var(--pk-error-100);
      }
    }
    
    &.pk-textarea--secondary.pk-textarea--focused .pk-textarea__container {
      border-color: var(--pk-secondary-500);
      box-shadow: 0 0 0 3px var(--pk-secondary-100);
    }
    
    &.pk-textarea--accent.pk-textarea--focused .pk-textarea__container {
      border-color: var(--pk-accent-500);
      box-shadow: 0 0 0 3px var(--pk-accent-100);
    }
  }
  
  // ================================
  // VARIANT: Filled
  // ================================
  &--filled {
    .pk-textarea__container {
      border: none;
      border-radius: var(--pk-radius-lg) var(--pk-radius-lg) 0 0;
      background: var(--pk-neutral-100);
      border-bottom: 2px solid var(--pk-neutral-400);
    }
    
    &.pk-textarea--focused .pk-textarea__container {
      background: var(--pk-neutral-50);
      border-bottom-color: var(--pk-primary-500);
    }
    
    &.pk-textarea--error .pk-textarea__container {
      border-bottom-color: var(--pk-error-500);
    }
  }
  
  // ================================
  // STATES
  // ================================
  &--disabled {
    opacity: 0.5;
    pointer-events: none;
    
    .pk-textarea__container {
      background: var(--pk-neutral-100);
    }
  }
  
  &--readonly {
    .pk-textarea__container {
      background: var(--pk-neutral-50);
    }
    
    .pk-textarea__field {
      cursor: default;
    }
  }
}
</style>



