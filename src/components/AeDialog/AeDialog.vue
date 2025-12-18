<template>
  <Teleport to="body">
    <Transition name="ae-dialog">
      <div 
        v-if="modelValue" 
        class="ae-dialog-overlay"
        @click.self="handleOverlayClick"
      >
        <div 
          :class="dialogClasses" 
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
        >
          <!-- Header -->
          <div v-if="!hideHeader" class="ae-dialog__header">
            <slot name="header">
              <h2 :id="titleId" class="ae-dialog__title ae-text-single-line-body-base-strong">
                {{ title }}
              </h2>
            </slot>
            <button 
              v-if="closable"
              class="ae-dialog__close" 
              @click="handleClose"
              aria-label="Close dialog"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="ae-dialog__body">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="ae-dialog__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted, useId } from 'vue'

export interface AeDialogProps {
  modelValue: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
  closeOnOverlay?: boolean
  closeOnEscape?: boolean
  hideHeader?: boolean
  persistent?: boolean
}

const props = withDefaults(defineProps<AeDialogProps>(), {
  title: '',
  size: 'md',
  closable: true,
  closeOnOverlay: true,
  closeOnEscape: true,
  hideHeader: false,
  persistent: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
  'open': []
}>()

const titleId = useId()

const dialogClasses = computed(() => [
  'ae-dialog',
  `ae-dialog--${props.size}`
])

const handleClose = () => {
  if (props.persistent) return
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay && !props.persistent) {
    handleClose()
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape && props.modelValue) {
    handleClose()
  }
}

// Lock body scroll when dialog is open
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    emit('open')
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>

<style lang="scss" scoped>
.ae-dialog-overlay {
  position: fixed;
  inset: 0;
  z-index: var(--ae-z-modal, 1000);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--sds-size-space-16);
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.ae-dialog {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - var(--sds-size-space-32));
  background: var(--sds-color-background-surface-tertiary);
  border: 1px solid var(--sds-color-border-default-secondary);
  border-radius: var(--sds-size-radius-100);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  // Header
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sds-size-space-16);
    padding: var(--sds-size-space-16) var(--sds-size-space-20);
    border-bottom: 1px solid var(--sds-color-border-default-secondary);
  }

  &__title {
    margin: 0;
    color: var(--sds-color-text-default-primary);
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: var(--sds-size-radius-50);
    color: var(--sds-color-text-tertiary-default);
    cursor: pointer;
    transition: all var(--ae-duration-150) var(--ae-ease-out);

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
      color: var(--sds-color-text-default-primary);
    }

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  // Body
  &__body {
    flex: 1;
    padding: var(--sds-size-space-20);
    overflow-y: auto;
    color: var(--sds-color-text-default-primary);
  }

  // Footer
  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--sds-size-space-12);
    padding: var(--sds-size-space-16) var(--sds-size-space-20);
    border-top: 1px solid var(--sds-color-border-default-secondary);
  }

  // ================================
  // SIZES
  // ================================
  &--sm {
    width: 100%;
    max-width: 400px;
  }

  &--md {
    width: 100%;
    max-width: 500px;
  }

  &--lg {
    width: 100%;
    max-width: 700px;
  }

  &--xl {
    width: 100%;
    max-width: 900px;
  }

  &--full {
    width: calc(100vw - var(--sds-size-space-32));
    max-width: none;
    height: calc(100vh - var(--sds-size-space-32));
  }
}

// ================================
// TRANSITIONS
// ================================
.ae-dialog-enter-active,
.ae-dialog-leave-active {
  transition: all var(--ae-duration-200) var(--ae-ease-out);

  .ae-dialog {
    transition: all var(--ae-duration-200) var(--ae-ease-out);
  }
}

.ae-dialog-enter-from,
.ae-dialog-leave-to {
  opacity: 0;

  .ae-dialog {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
}
</style>

