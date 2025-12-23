<template>
  <Teleport to="body">
    <Transition name="ae-drawer-overlay">
      <div 
        v-if="modelValue" 
        class="ae-drawer-overlay"
        @click.self="handleOverlayClick"
      />
    </Transition>
    
    <Transition :name="`ae-drawer-${placement}`">
      <div
        v-if="modelValue"
        class="ae-drawer"
        :class="drawerClasses"
        :style="drawerStyles"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        ref="drawerRef"
        @keydown.esc="handleEscape"
      >
        <!-- Header -->
        <div v-if="!hideHeader" class="ae-drawer__header">
          <slot name="header">
            <h2 :id="titleId" class="ae-drawer__title ae-typo-single-line-body-base-strong">
              {{ title }}
            </h2>
          </slot>
          <button
            v-if="showClose"
            type="button"
            class="ae-drawer__close"
            @click="close"
            aria-label="Close drawer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="ae-drawer__body">
          <slot />
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" class="ae-drawer__footer">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted, useId, nextTick } from 'vue'

export interface AeDrawerProps {
  /** Whether drawer is visible (v-model) */
  modelValue?: boolean
  /** Drawer title */
  title?: string
  /** Placement of the drawer */
  placement?: 'left' | 'right' | 'top' | 'bottom'
  /** Size of the drawer */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Custom width (for left/right) or height (for top/bottom) */
  width?: number | string
  /** Hide the header */
  hideHeader?: boolean
  /** Show close button */
  showClose?: boolean
  /** Close when clicking overlay */
  closeOnOverlay?: boolean
  /** Close when pressing escape */
  closeOnEscape?: boolean
  /** Lock body scroll when open */
  lockScroll?: boolean
}

const props = withDefaults(defineProps<AeDrawerProps>(), {
  modelValue: false,
  title: '',
  placement: 'right',
  size: 'md',
  hideHeader: false,
  showClose: true,
  closeOnOverlay: true,
  closeOnEscape: true,
  lockScroll: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
  'open': []
}>()

const drawerRef = ref<HTMLElement | null>(null)
const titleId = useId()

const isHorizontal = computed(() => props.placement === 'left' || props.placement === 'right')

const drawerClasses = computed(() => [
  `ae-drawer--${props.placement}`,
  `ae-drawer--${props.size}`
])

const drawerStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.width) {
    const value = typeof props.width === 'number' ? `${props.width}px` : props.width
    if (isHorizontal.value) {
      styles.width = value
    } else {
      styles.height = value
    }
  }
  
  return styles
})

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    close()
  }
}

const handleEscape = () => {
  if (props.closeOnEscape) {
    close()
  }
}

// Lock body scroll
watch(() => props.modelValue, (isOpen) => {
  if (props.lockScroll) {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
  
  if (isOpen) {
    emit('open')
    nextTick(() => {
      drawerRef.value?.focus()
    })
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (props.lockScroll) {
    document.body.style.overflow = ''
  }
})

defineExpose({
  close
})
</script>

<style lang="scss" scoped>
.ae-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.ae-drawer {
  position: fixed;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  background: var(--sds-color-background-surface-default);
  box-shadow: var(--sds-shadow-overlay);
  outline: none;

  // Placements
  &--left {
    top: 0;
    left: 0;
    height: 100vh;
    border-right: 1px solid var(--sds-color-border-default-secondary);
  }

  &--right {
    top: 0;
    right: 0;
    height: 100vh;
    border-left: 1px solid var(--sds-color-border-default-secondary);
  }

  &--top {
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    border-bottom: 1px solid var(--sds-color-border-default-secondary);
  }

  &--bottom {
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    border-top: 1px solid var(--sds-color-border-default-secondary);
  }

  // Horizontal sizes (left/right)
  &--left, &--right {
    &.ae-drawer--sm { width: 280px; }
    &.ae-drawer--md { width: 400px; }
    &.ae-drawer--lg { width: 560px; }
    &.ae-drawer--xl { width: 720px; }
    &.ae-drawer--full { width: 100%; }
  }

  // Vertical sizes (top/bottom)
  &--top, &--bottom {
    &.ae-drawer--sm { height: 200px; }
    &.ae-drawer--md { height: 320px; }
    &.ae-drawer--lg { height: 480px; }
    &.ae-drawer--xl { height: 640px; }
    &.ae-drawer--full { height: 100%; }
  }

  // Header
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sds-size-space-16);
    padding: var(--sds-size-space-16) var(--sds-size-space-24);
    border-bottom: 1px solid var(--sds-color-border-default-secondary);
    flex-shrink: 0;
  }

  &__title {
    margin: 0;
    color: var(--sds-color-text-default-primary);
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--sds-color-text-default-tertiary);
    cursor: pointer;
    border-radius: var(--sds-size-radius-50);
    transition: all var(--ae-duration-100) var(--ae-ease-out);
    flex-shrink: 0;

    svg {
      width: 20px;
      height: 20px;
    }

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
      color: var(--sds-color-text-default-primary);
    }
  }

  // Body
  &__body {
    flex: 1;
    padding: var(--sds-size-space-24);
    overflow-y: auto;
  }

  // Footer
  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--sds-size-space-12);
    padding: var(--sds-size-space-16) var(--sds-size-space-24);
    border-top: 1px solid var(--sds-color-border-default-secondary);
    flex-shrink: 0;
  }
}

// Overlay transition
.ae-drawer-overlay-enter-active,
.ae-drawer-overlay-leave-active {
  transition: opacity var(--ae-duration-200) var(--ae-ease-out);
}

.ae-drawer-overlay-enter-from,
.ae-drawer-overlay-leave-to {
  opacity: 0;
}

// Left drawer transition
.ae-drawer-left-enter-active,
.ae-drawer-left-leave-active {
  transition: transform var(--ae-duration-200) var(--ae-ease-out);
}

.ae-drawer-left-enter-from,
.ae-drawer-left-leave-to {
  transform: translateX(-100%);
}

// Right drawer transition
.ae-drawer-right-enter-active,
.ae-drawer-right-leave-active {
  transition: transform var(--ae-duration-200) var(--ae-ease-out);
}

.ae-drawer-right-enter-from,
.ae-drawer-right-leave-to {
  transform: translateX(100%);
}

// Top drawer transition
.ae-drawer-top-enter-active,
.ae-drawer-top-leave-active {
  transition: transform var(--ae-duration-200) var(--ae-ease-out);
}

.ae-drawer-top-enter-from,
.ae-drawer-top-leave-to {
  transform: translateY(-100%);
}

// Bottom drawer transition
.ae-drawer-bottom-enter-active,
.ae-drawer-bottom-leave-active {
  transition: transform var(--ae-duration-200) var(--ae-ease-out);
}

.ae-drawer-bottom-enter-from,
.ae-drawer-bottom-leave-to {
  transform: translateY(100%);
}
</style>
