<template>
  <div class="ae-field" :class="fieldClasses">
    <!-- Label Row -->
    <div v-if="label || $slots.label || showOptional" class="ae-field__header">
      <label 
        v-if="label || $slots.label" 
        :for="htmlFor" 
        class="ae-field__label"
        :class="labelClass"
      >
        <slot name="label">
          <span class="ae-typo-single-line-body-small-strong">{{ label }}</span>
        </slot>
        <span v-if="required" class="ae-field__required" aria-hidden="true">*</span>
      </label>
      <span v-if="showOptional && !required" class="ae-field__optional ae-typo-note">
        {{ optionalText }}
      </span>
    </div>

    <!-- Description (before input) -->
    <p v-if="description && descriptionPosition === 'top'" class="ae-field__description ae-typo-body-small">
      {{ description }}
    </p>

    <!-- Input Slot -->
    <div class="ae-field__control">
      <slot />
    </div>

    <!-- Description (after input) -->
    <p v-if="description && descriptionPosition === 'bottom'" class="ae-field__description ae-typo-body-small">
      {{ description }}
    </p>

    <!-- Messages -->
    <div v-if="showMessages" class="ae-field__messages">
      <!-- Error Message -->
      <div v-if="error" class="ae-field__error ae-typo-note" role="alert">
        <span v-if="showErrorIcon" class="ae-field__message-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </span>
        <span>{{ error }}</span>
      </div>

      <!-- Success Message -->
      <div v-else-if="success" class="ae-field__success ae-typo-note">
        <span v-if="showSuccessIcon" class="ae-field__message-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </span>
        <span>{{ success }}</span>
      </div>

      <!-- Hint Message -->
      <div v-else-if="hint" class="ae-field__hint ae-typo-note">
        <span>{{ hint }}</span>
      </div>

      <!-- Counter -->
      <div v-if="showCounter" class="ae-field__counter ae-typo-note">
        <span>{{ currentLength }} / {{ maxLength }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'

export interface AeFieldProps {
  /** Label text for the field */
  label?: string
  /** Additional CSS class for the label */
  labelClass?: string
  /** HTML for attribute to associate label with input */
  htmlFor?: string
  /** Description text */
  description?: string
  /** Position of description text */
  descriptionPosition?: 'top' | 'bottom'
  /** Hint text shown below the input */
  hint?: string
  /** Error message */
  error?: string
  /** Success message */
  success?: string
  /** Whether the field is required */
  required?: boolean
  /** Whether to show "Optional" text */
  showOptional?: boolean
  /** Text for optional indicator */
  optionalText?: string
  /** Whether to show error icon */
  showErrorIcon?: boolean
  /** Whether to show success icon */
  showSuccessIcon?: boolean
  /** Whether the field is disabled */
  disabled?: boolean
  /** Current character count for counter */
  currentLength?: number
  /** Maximum character count for counter */
  maxLength?: number
  /** Size of the field */
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<AeFieldProps>(), {
  descriptionPosition: 'bottom',
  showOptional: false,
  optionalText: 'Optional',
  showErrorIcon: false,
  showSuccessIcon: false,
  disabled: false,
  required: false,
  size: 'md'
})

const generatedId = useId()
const fieldId = computed(() => props.htmlFor || generatedId)

const fieldClasses = computed(() => [
  `ae-field--${props.size}`,
  {
    'ae-field--error': !!props.error,
    'ae-field--success': !!props.success,
    'ae-field--disabled': props.disabled,
    'ae-field--required': props.required
  }
])

const showMessages = computed(() => {
  return props.error || props.success || props.hint || showCounter.value
})

const showCounter = computed(() => {
  return props.maxLength !== undefined && props.currentLength !== undefined
})

// Expose the generated ID for parent components
defineExpose({
  fieldId
})
</script>

<style lang="scss" scoped>
.ae-field {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-8);
  width: 100%;

  // Header (label + optional)
  &__header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--sds-size-space-8);
  }

  &__label {
    display: inline-flex;
    align-items: baseline;
    gap: var(--sds-size-space-4);
    color: var(--sds-color-text-primary-default);
    cursor: pointer;
  }

  &__required {
    color: var(--sds-color-text-negative-primary);
    font-weight: 500;
  }

  &__optional {
    color: var(--sds-color-text-primary-tertiary);
  }

  // Description
  &__description {
    margin: 0;
    color: var(--sds-color-text-primary-secondary);
  }

  // Control slot
  &__control {
    display: flex;
    flex-direction: column;
  }

  // Messages area
  &__messages {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--sds-size-space-12);
    min-height: 1.25rem;
  }

  &__error,
  &__success,
  &__hint {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-4);
    flex: 1;
  }

  &__error {
    color: var(--sds-color-text-negative-primary);
  }

  &__success {
    color: var(--sds-color-text-positive-primary);
  }

  &__hint {
    color: var(--sds-color-text-primary-tertiary);
  }

  &__message-icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  &__counter {
    color: var(--sds-color-text-primary-tertiary);
    flex-shrink: 0;
    margin-left: auto;
  }

  // ================================
  // SIZES
  // ================================
  &--sm {
    gap: var(--sds-size-space-4);

    .ae-field__label {
      font-size: 0.75rem;
    }
  }

  &--lg {
    gap: var(--sds-size-space-12);

    .ae-field__label {
      font-size: 1rem;
    }
  }

  // ================================
  // STATES
  // ================================
  &--disabled {
    opacity: 0.5;
    pointer-events: none;

    .ae-field__label {
      cursor: default;
    }
  }

  &--error {
    .ae-field__label {
      color: var(--sds-color-text-primary-default);
    }
  }

  &--success {
    .ae-field__label {
      color: var(--sds-color-text-primary-default);
    }
  }
}
</style>
