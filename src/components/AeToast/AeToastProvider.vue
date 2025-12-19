<template>
  <Teleport to="body">
    <TransitionGroup 
      name="ae-toast" 
      tag="div" 
      class="ae-toast-container"
      :class="containerClasses"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="ae-toast"
        :class="toastClasses(toast)"
        role="alert"
        aria-live="polite"
      >
        <!-- Icon -->
        <span class="ae-toast__icon">
          <svg v-if="toast.variant === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <svg v-else-if="toast.variant === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <svg v-else-if="toast.variant === 'warning'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </span>

        <!-- Content -->
        <div class="ae-toast__content">
          <p v-if="toast.title" class="ae-toast__title ae-typo-single-line-body-small-strong">
            {{ toast.title }}
          </p>
          <p v-if="toast.message" class="ae-toast__message ae-typo-body-small">
            {{ toast.message }}
          </p>
        </div>

        <!-- Close Button -->
        <button
          v-if="toast.closable !== false"
          type="button"
          class="ae-toast__close"
          @click="removeToast(toast.id)"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <!-- Progress bar -->
        <div 
          v-if="toast.duration && toast.duration > 0" 
          class="ae-toast__progress"
          :style="{ animationDuration: `${toast.duration}ms` }"
        />
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToast, type ToastOptions } from './useToast'
import type { Toast, ToastPosition } from './AeToast.vue'

export interface AeToastProviderProps {
  position?: ToastPosition
}

const props = withDefaults(defineProps<AeToastProviderProps>(), {
  position: 'top-right'
})

const { toasts, removeToast } = useToast()

const containerClasses = computed(() => [
  `ae-toast-container--${props.position}`
])

const toastClasses = (toast: Toast) => [
  `ae-toast--${toast.variant || 'info'}`
]
</script>

<style lang="scss" scoped>
.ae-toast-container {
  position: fixed;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-12);
  padding: var(--sds-size-space-16);
  pointer-events: none;
  max-height: 100vh;
  overflow: hidden;

  &--top-right {
    top: 0;
    right: 0;
    align-items: flex-end;
  }

  &--top-left {
    top: 0;
    left: 0;
    align-items: flex-start;
  }

  &--top-center {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  }

  &--bottom-right {
    bottom: 0;
    right: 0;
    align-items: flex-end;
    flex-direction: column-reverse;
  }

  &--bottom-left {
    bottom: 0;
    left: 0;
    align-items: flex-start;
    flex-direction: column-reverse;
  }

  &--bottom-center {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
    flex-direction: column-reverse;
  }
}

.ae-toast {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--sds-size-space-12);
  min-width: 300px;
  max-width: 420px;
  padding: var(--sds-size-space-12) var(--sds-size-space-16);
  background: var(--sds-color-background-surface-default);
  border: 1px solid var(--sds-color-border-default-secondary);
  border-radius: var(--sds-size-radius-100);
  box-shadow: var(--sds-shadow-overlay);
  pointer-events: auto;
  overflow: hidden;

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-top: 2px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__title {
    margin: 0;
    color: var(--sds-color-text-default-primary);
  }

  &__message {
    margin: var(--sds-size-space-4) 0 0 0;
    color: var(--sds-color-text-default-secondary);
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    padding: 0;
    margin-top: 2px;
    border: none;
    background: transparent;
    color: var(--sds-color-text-default-tertiary);
    cursor: pointer;
    border-radius: var(--sds-size-radius-50);
    transition: all var(--ae-duration-100) var(--ae-ease-out);

    svg {
      width: 14px;
      height: 14px;
    }

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
      color: var(--sds-color-text-default-primary);
    }
  }

  &__progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: currentColor;
    opacity: 0.3;
    animation: ae-toast-progress linear forwards;
  }

  // ================================
  // VARIANTS
  // ================================
  &--success {
    border-color: var(--sds-color-border-positive-default);

    .ae-toast__icon {
      color: var(--sds-color-text-positive-primary);
    }

    .ae-toast__progress {
      background: var(--sds-color-background-positive-default);
    }
  }

  &--error {
    border-color: var(--sds-color-border-negative-default);

    .ae-toast__icon {
      color: var(--sds-color-text-negative-primary);
    }

    .ae-toast__progress {
      background: var(--sds-color-background-negative-default);
    }
  }

  &--warning {
    border-color: var(--sds-color-border-warning-default);

    .ae-toast__icon {
      color: var(--sds-color-text-warning-primary);
    }

    .ae-toast__progress {
      background: var(--sds-color-background-warning-default);
    }
  }

  &--info {
    border-color: var(--sds-color-border-brand-green);

    .ae-toast__icon {
      color: var(--sds-color-text-brand-secondary);
    }

    .ae-toast__progress {
      background: var(--sds-color-background-brand-default);
    }
  }
}

// Animations
@keyframes ae-toast-progress {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

// Transition
.ae-toast-enter-active {
  transition: all var(--ae-duration-200) var(--ae-ease-out);
}

.ae-toast-leave-active {
  transition: all var(--ae-duration-150) var(--ae-ease-in);
}

.ae-toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.ae-toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.ae-toast-container--top-left,
.ae-toast-container--bottom-left {
  .ae-toast-enter-from,
  .ae-toast-leave-to {
    transform: translateX(-100%);
  }
}

.ae-toast-container--top-center,
.ae-toast-container--bottom-center {
  .ae-toast-enter-from {
    transform: translateY(-20px);
  }
  .ae-toast-leave-to {
    transform: translateY(-20px);
  }
}

.ae-toast-move {
  transition: transform var(--ae-duration-200) var(--ae-ease-out);
}
</style>
