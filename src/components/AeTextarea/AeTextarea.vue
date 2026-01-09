<template>
  <div :class="wrapperClasses">
    <label v-if="label" :for="textareaId" class="ae-textarea__label ae-typo-single-line-body-small-strong">
      {{ label }}
      <span v-if="required" class="ae-textarea__required">*</span>
    </label>
    
    <div class="ae-textarea__container">
      <textarea
        :id="textareaId"
        ref="textareaRef"
        v-model="inputValue"
        class="ae-textarea__field"
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
    
    <div class="ae-textarea__footer">
      <span v-if="errorMessage" class="ae-textarea__error ae-typo-note">{{ errorMessage }}</span>
      <span v-else-if="hint" class="ae-textarea__hint ae-typo-note">{{ hint }}</span>
      <span v-else />
      
      <span v-if="showCount && maxLength" class="ae-textarea__count ae-typo-note">
        {{ inputValue?.toString().length || 0 }} / {{ maxLength }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId } from 'vue'

export interface AeTextareaProps {
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
  color?: 'primary'
}

const props = withDefaults(defineProps<AeTextareaProps>(), {
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
  'ae-textarea',
  `ae-textarea--${props.variant}`,
  `ae-textarea--${props.color}`,
  {
    'ae-textarea--focused': isFocused.value,
    'ae-textarea--error': hasError.value,
    'ae-textarea--disabled': props.disabled,
    'ae-textarea--readonly': props.readonly,
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
.ae-textarea {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-8);
  width: 100%;
  
  // Label
  &__label {
    color: var(--sds-color-text-primary-default);
  }
  
  &__required {
    color: var(--sds-color-border-danger-default);
    margin-left: 2px;
  }
  
  // Container
  &__container {
    position: relative;
    display: flex;
    width: 100%;
    transition: all var(--ae-duration-200) var(--ae-ease-out);
  }
  
  // Field
  &__field {
    flex: 1;
    width: 100%;
    min-height: 5rem;
    padding: var(--sds-size-space-12);
    border: none;
    outline: none;
    background: transparent;
    color: var(--sds-color-text-primary-default);
    line-height: var(--ae-leading-relaxed);
    resize: vertical;
    
    &::placeholder {
      color: var(--sds-color-text-tertiary-default);
    }
  }
  
  // Footer
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 1.25rem;
    font-size: var(--ae-text-xs);
  }
  
  &__hint {
    color: var(--ae-neutral-500);
  }
  
  &__error {
    color: var(--sds-color-text-danger-default);
  }
  
  &__count {
    color: var(--sds-color-text-tertiary-default);
  }
  
  // ================================
  // VARIANT: Outlined
  // ================================
  &--outlined {
    .ae-textarea__container {
      border-radius: var(--sds-size-radius-50);
      border: var(--sds-size-stroke-border) solid var(--sds-color-border-default-primary);
      background: var(--sds-color-background-surface-tertiary);
    }
    
    &.ae-textarea--focused .ae-textarea__container {
      border-color: var(--sds-color-text-tertiary-default);
      background: var(--sds-color-background-surface-default);
    }
    
    &.ae-textarea--error .ae-textarea__container {
      border-color: var(--sds-color-border-danger-default);
    }
  }
  
  // ================================
  // VARIANT: Filled
  // ================================
  &--filled {
    .ae-textarea__container {
      border-radius: var(--sds-size-radius-50) var(--sds-size-radius-50) 0 0;
      background: var(--sds-color-background-disabled-default);
      border: var(--sds-size-stroke-border) solid transparent;
    }
    
    &.ae-textarea--focused .ae-textarea__container {
      background: var(--sds-color-background-disabled-default);
    }
    
    &.ae-textarea--error .ae-textarea__container {
      border-color: var(--sds-color-border-danger-default);
    }
  }
  
  // ================================
  // STATES
  // ================================
  &--disabled {
    opacity: 0.5;
    pointer-events: none;
    
    .ae-textarea__container {
      background: var(--ae-neutral-100);
    }
  }
  
  &--readonly {
    .ae-textarea__container {
      background: var(--ae-neutral-50);
    }
    
    .ae-textarea__field {
      cursor: default;
    }
  }
}
</style>



