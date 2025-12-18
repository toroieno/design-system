<template>
  <div
    ref="wrapperRef"
    class="ae-tooltip-wrapper"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
    @click="handleClick"
  >
    <slot />
    
    <Teleport to="body">
      <Transition name="ae-tooltip">
        <div 
          v-if="isVisible"
          ref="tooltipRef"
          :class="tooltipClasses"
          :style="isPositioned ? tooltipStyles : initialStyles"
          role="tooltip"
        >
          <div class="ae-tooltip__content ae-text-note">
            <slot name="content">{{ content }}</slot>
          </div>
          <div v-if="arrow" class="ae-tooltip__arrow" :style="arrowStyles" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'

export interface AeTooltipProps {
  content?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  trigger?: 'hover' | 'click' | 'focus'
  delay?: number
  hideDelay?: number
  disabled?: boolean
  arrow?: boolean
  maxWidth?: number | string
}

const props = withDefaults(defineProps<AeTooltipProps>(), {
  content: '',
  position: 'top',
  trigger: 'hover',
  delay: 0,
  hideDelay: 0,
  disabled: false,
  arrow: true,
  maxWidth: 250
})

const isVisible = ref(false)
const isPositioned = ref(false)
const wrapperRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)
const tooltipStyles = ref<Record<string, string>>({})
const arrowStyles = ref<Record<string, string>>({})

// Initial off-screen position while calculating (includes maxWidth for proper measurement)
const initialStyles = computed(() => ({
  position: 'fixed',
  top: '-9999px',
  left: '-9999px',
  visibility: 'hidden',
  maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth
} as Record<string, string>))

let showTimeout: ReturnType<typeof setTimeout> | null = null
let hideTimeout: ReturnType<typeof setTimeout> | null = null

const tooltipClasses = computed(() => [
  'ae-tooltip',
  `ae-tooltip--${props.position}`
])

const show = () => {
  if (props.disabled) return
  
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  
  if (props.delay > 0) {
    showTimeout = setTimeout(() => {
      isVisible.value = true
    }, props.delay)
  } else {
    isVisible.value = true
  }
}

const hide = () => {
  if (showTimeout) {
    clearTimeout(showTimeout)
    showTimeout = null
  }
  
  if (props.hideDelay > 0) {
    hideTimeout = setTimeout(() => {
      isVisible.value = false
    }, props.hideDelay)
  } else {
    isVisible.value = false
  }
}

const handleMouseEnter = () => {
  if (props.trigger === 'hover') {
    show()
  }
}

const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    hide()
  }
}

const handleFocusIn = () => {
  if (props.trigger === 'focus') {
    show()
  }
}

const handleFocusOut = () => {
  if (props.trigger === 'focus') {
    hide()
  }
}

const handleClick = () => {
  if (props.trigger === 'click') {
    if (isVisible.value) {
      hide()
    } else {
      show()
    }
  }
}

const updatePosition = () => {
  if (!isVisible.value) return

  nextTick(() => {
    requestAnimationFrame(() => {
      const wrapper = wrapperRef.value
      const tooltip = tooltipRef.value

      if (!wrapper || !tooltip) return

      const wrapperRect = wrapper.getBoundingClientRect()
      const tooltipRect = tooltip.getBoundingClientRect()
      const gap = 8

      let top = 0
      let left = 0
      let arrowTop = ''
      let arrowLeft = ''

      switch (props.position) {
        case 'top':
          top = wrapperRect.top - tooltipRect.height - gap
          left = wrapperRect.left + (wrapperRect.width - tooltipRect.width) / 2
          arrowLeft = '50%'
          break

        case 'bottom':
          top = wrapperRect.bottom + gap
          left = wrapperRect.left + (wrapperRect.width - tooltipRect.width) / 2
          arrowLeft = '50%'
          break

        case 'left':
          top = wrapperRect.top + (wrapperRect.height - tooltipRect.height) / 2
          left = wrapperRect.left - tooltipRect.width - gap
          arrowTop = '50%'
          break

        case 'right':
          top = wrapperRect.top + (wrapperRect.height - tooltipRect.height) / 2
          left = wrapperRect.right + gap
          arrowTop = '50%'
          break
      }

      const padding = 8
      left = Math.max(padding, Math.min(left, window.innerWidth - tooltipRect.width - padding))
      top = Math.max(padding, Math.min(top, window.innerHeight - tooltipRect.height - padding))

      tooltipStyles.value = {
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        maxWidth: typeof props.maxWidth === 'number'
          ? `${props.maxWidth}px`
          : props.maxWidth
      }

      arrowStyles.value = {
        ...(arrowTop && { top: arrowTop }),
        ...(arrowLeft && { left: arrowLeft })
      }

      // Mark as positioned after calculation
      isPositioned.value = true
    })
  })
}

// Close on click outside for click trigger
const handleClickOutside = (event: MouseEvent) => {
  if (
    props.trigger === 'click' &&
    isVisible.value &&
    tooltipRef.value &&
    !tooltipRef.value.contains(event.target as Node)
  ) {
    hide()
  }
}

watch(isVisible, (visible) => {
  if (visible) {
    updatePosition()
  } else {
    // Reset positioned state when hiding
    isPositioned.value = false
  }
})

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', updatePosition, true)
  window.addEventListener('resize', updatePosition)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
  
  if (showTimeout) clearTimeout(showTimeout)
  if (hideTimeout) clearTimeout(hideTimeout)
})
</script>

<style lang="scss" scoped>
.ae-tooltip-wrapper {
  display: inline-flex;
}

.ae-tooltip {
  z-index: var(--ae-z-tooltip, 1100);
  padding: var(--sds-size-space-8) var(--sds-size-space-12);
  background: var(--sds-color-background-surface-tertiary);
  border: 1px solid var(--sds-color-border-default-secondary);
  border-radius: var(--sds-size-radius-50);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  &__content {
    color: var(--sds-color-text-default-primary);
    word-wrap: break-word;
  }
  
  &__arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background: var(--sds-color-background-surface-tertiary);
    border: 1px solid var(--sds-color-border-default-secondary);
    transform: rotate(45deg);
  }
  
  // Position: Top
  &--top {
    .ae-tooltip__arrow {
      bottom: -5px;
      transform: translateX(-50%) rotate(45deg);
      border-top: none;
      border-left: none;
    }
  }
  
  // Position: Bottom
  &--bottom {
    .ae-tooltip__arrow {
      top: -5px;
      transform: translateX(-50%) rotate(45deg);
      border-bottom: none;
      border-right: none;
    }
  }
  
  // Position: Left
  &--left {
    .ae-tooltip__arrow {
      right: -5px;
      transform: translateY(-50%) rotate(45deg);
      border-bottom: none;
      border-left: none;
    }
  }
  
  // Position: Right
  &--right {
    .ae-tooltip__arrow {
      left: -5px;
      transform: translateY(-50%) rotate(45deg);
      border-top: none;
      border-right: none;
    }
  }
}

// ================================
// TRANSITIONS
// ================================
.ae-tooltip-enter-active,
.ae-tooltip-leave-active {
  transition: opacity var(--ae-duration-150) var(--ae-ease-out),
              transform var(--ae-duration-150) var(--ae-ease-out);
}

.ae-tooltip-enter-from,
.ae-tooltip-leave-to {
  opacity: 0;
}

.ae-tooltip--top.ae-tooltip-enter-from,
.ae-tooltip--top.ae-tooltip-leave-to {
  transform: translateY(4px);
}

.ae-tooltip--bottom.ae-tooltip-enter-from,
.ae-tooltip--bottom.ae-tooltip-leave-to {
  transform: translateY(-4px);
}

.ae-tooltip--left.ae-tooltip-enter-from,
.ae-tooltip--left.ae-tooltip-leave-to {
  transform: translateX(4px);
}

.ae-tooltip--right.ae-tooltip-enter-from,
.ae-tooltip--right.ae-tooltip-leave-to {
  transform: translateX(-4px);
}
</style>
