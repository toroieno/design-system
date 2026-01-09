<template>
  <div 
    class="ae-dropdown" 
    :class="dropdownClasses"
    ref="dropdownRef"
    @keydown="handleKeydown"
  >
    <!-- Trigger -->
    <div 
      class="ae-dropdown__trigger"
      ref="triggerRef"
      @click="handleTriggerClick"
      @mouseenter="handleTriggerMouseEnter"
      @mouseleave="handleTriggerMouseLeave"
    >
      <slot name="trigger">
        <button type="button" class="ae-dropdown__default-trigger">
          {{ triggerText }}
          <svg class="ae-dropdown__trigger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </slot>
    </div>

    <!-- Menu -->
    <Teleport to="body" :disabled="!teleport">
      <Transition name="ae-dropdown">
        <div 
          v-if="isOpen"
          class="ae-dropdown__menu"
          :class="menuClasses"
          :style="menuStyles"
          ref="menuRef"
          role="menu"
          @mouseenter="handleMenuMouseEnter"
          @mouseleave="handleMenuMouseLeave"
        >
          <slot>
            <template v-for="(item, index) in items" :key="item.key || index">
              <!-- Divider -->
              <div v-if="item.divider" class="ae-dropdown__divider" />
              
              <!-- Group Label -->
              <div v-else-if="item.group" class="ae-dropdown__group-label ae-typo-note">
                {{ item.label }}
              </div>
              
              <!-- Menu Item -->
              <button
                v-else
                type="button"
                class="ae-dropdown__item"
                :class="{
                  'ae-dropdown__item--disabled': item.disabled,
                  'ae-dropdown__item--danger': item.danger,
                  'ae-dropdown__item--active': highlightedIndex === index
                }"
                :disabled="item.disabled"
                role="menuitem"
                @click="handleItemClick(item)"
                @mouseenter="highlightedIndex = index"
              >
                <span v-if="item.icon" class="ae-dropdown__item-icon">
                  <component :is="item.icon" />
                </span>
                <span class="ae-dropdown__item-label ae-typo-single-line-body-small">
                  {{ item.label }}
                </span>
                <span v-if="item.shortcut" class="ae-dropdown__item-shortcut ae-typo-note">
                  {{ item.shortcut }}
                </span>
              </button>
            </template>
          </slot>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

export interface DropdownItem {
  key?: string
  label?: string
  icon?: any
  shortcut?: string
  disabled?: boolean
  danger?: boolean
  divider?: boolean
  group?: boolean
  onClick?: () => void
  href?: string
}

export interface AeDropdownProps {
  /** Menu items */
  items?: DropdownItem[]
  /** Trigger text for default trigger */
  triggerText?: string
  /** Menu placement */
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
  /** Trigger mode */
  trigger?: 'click' | 'hover'
  /** Whether menu is open (v-model) */
  open?: boolean
  /** Close on item click */
  closeOnSelect?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Menu width */
  width?: number | string
  /** Min width */
  minWidth?: number | string
  /** Use teleport */
  teleport?: boolean
  /** Hover delay in ms */
  hoverDelay?: number
  maxHeight?: number | string
}

const props = withDefaults(defineProps<AeDropdownProps>(), {
  items: () => [],
  triggerText: 'Options',
  placement: 'bottom-start',
  trigger: 'click',
  open: false,
  closeOnSelect: true,
  disabled: false,
  minWidth: 160,
  teleport: true,
  hoverDelay: 150
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  'select': [item: DropdownItem]
}>()

const dropdownRef = ref<HTMLElement | null>(null)
const triggerRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const isOpen = ref(props.open)
const highlightedIndex = ref(-1)
const menuPosition = ref({ top: 0, left: 0 })
let hoverTimeout: ReturnType<typeof setTimeout> | null = null

const dropdownClasses = computed(() => [
  {
    'ae-dropdown--open': isOpen.value,
    'ae-dropdown--disabled': props.disabled
  }
])

const menuClasses = computed(() => [
  `ae-dropdown__menu--${props.placement}`
])

const menuStyles = computed(() => {
  const styles: Record<string, string> = {}
  
  if (props.teleport) {
    styles.position = 'fixed'
    styles.top = `${menuPosition.value.top}px`
    styles.left = `${menuPosition.value.left}px`
  }
  
  if (props.width) {
    styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  
  if (props.minWidth) {
    styles.minWidth = typeof props.minWidth === 'number' ? `${props.minWidth}px` : props.minWidth
  }

  if (props.maxHeight) {
    styles.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
    styles.overflowY = 'auto'
  }
  
  return styles
})

const calculateInitialPosition = () => {
  if (!triggerRef.value || !props.teleport) return { top: 0, left: 0 }
  
  const triggerEl = triggerRef.value
  const rect = triggerEl.getBoundingClientRect()
  
  let top = 0
  let left = 0
  
  if (props.placement.startsWith('bottom')) {
    top = rect.bottom + 4
  } else {
    top = rect.top - 4
  }
  
  if (props.placement.endsWith('start')) {
    left = rect.left
  } else {
    left = rect.right
  }
  
  return { top, left }
}

const updatePosition = () => {
  if (!triggerRef.value || !props.teleport) return
  
  const triggerEl = triggerRef.value
  const rect = triggerEl.getBoundingClientRect()
  
  let top = 0
  let left = 0
  
  if (props.placement.startsWith('bottom')) {
    top = rect.bottom + 4
  } else {
    top = rect.top - 4
  }
  
  if (props.placement.endsWith('start')) {
    left = rect.left
  } else {
    left = rect.right
  }
  
  // Set initial position immediately to prevent transition from (0,0)
  menuPosition.value = { top, left }
  
  // Adjust after menu renders
  nextTick(() => {
    if (!menuRef.value) return
    const menuRect = menuRef.value.getBoundingClientRect()
    
    // Adjust for top placements
    if (props.placement.startsWith('top')) {
      top = rect.top - menuRect.height - 4
    }
    
    // Adjust for end placements
    if (props.placement.endsWith('end')) {
      left = rect.right - menuRect.width
    }
    
    // Keep within viewport
    if (left + menuRect.width > window.innerWidth) {
      left = window.innerWidth - menuRect.width - 8
    }
    if (left < 8) left = 8
    
    if (top + menuRect.height > window.innerHeight) {
      top = rect.top - menuRect.height - 4
    }
    if (top < 8) top = 8
    
    menuPosition.value = { top, left }
  })
}

const open = () => {
  if (props.disabled) return
  
  // Calculate initial position BEFORE opening to prevent transition from (0,0)
  if (props.teleport) {
    menuPosition.value = calculateInitialPosition()
  }
  
  isOpen.value = true
  highlightedIndex.value = -1
  emit('update:open', true)
  nextTick(updatePosition)
}

const close = () => {
  isOpen.value = false
  highlightedIndex.value = -1
  emit('update:open', false)
}

const toggle = () => {
  if (isOpen.value) {
    close()
  } else {
    open()
  }
}

const handleTriggerClick = () => {
  if (props.trigger === 'click') {
    toggle()
  }
}

const handleTriggerMouseEnter = () => {
  if (props.trigger === 'hover') {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    hoverTimeout = setTimeout(open, props.hoverDelay)
  }
}

const handleTriggerMouseLeave = () => {
  if (props.trigger === 'hover') {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    hoverTimeout = setTimeout(close, props.hoverDelay)
  }
}

const handleMenuMouseEnter = () => {
  if (props.trigger === 'hover' && hoverTimeout) {
    clearTimeout(hoverTimeout)
  }
}

const handleMenuMouseLeave = () => {
  if (props.trigger === 'hover') {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    hoverTimeout = setTimeout(close, props.hoverDelay)
  }
}

const handleItemClick = (item: DropdownItem) => {
  if (item.disabled) return
  
  emit('select', item)
  item.onClick?.()
  if (item?.href) {
    window.location.href = item.href
    return
  }
  
  if (props.closeOnSelect) {
    close()
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!isOpen.value) {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault()
      open()
    }
    return
  }
  
  switch (event.key) {
    case 'Escape':
      event.preventDefault()
      close()
      break
    case 'ArrowDown':
      event.preventDefault()
      navigateItems(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      navigateItems(-1)
      break
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (highlightedIndex.value >= 0) {
        const item = props.items[highlightedIndex.value]
        if (item && !item.divider && !item.group) {
          handleItemClick(item)
        }
      }
      break
    case 'Tab':
      close()
      break
  }
}

const navigateItems = (direction: number) => {
  const items = props.items
  let newIndex = highlightedIndex.value
  
  do {
    newIndex += direction
    if (newIndex < 0) newIndex = items.length - 1
    if (newIndex >= items.length) newIndex = 0
  } while (
    items[newIndex] && 
    (items[newIndex].divider || items[newIndex].group || items[newIndex].disabled) &&
    newIndex !== highlightedIndex.value
  )
  
  highlightedIndex.value = newIndex
}

const handleClickOutside = (event: MouseEvent) => {
  if (!isOpen.value) return
  
  const target = event.target as Node
  if (
    dropdownRef.value?.contains(target) ||
    menuRef.value?.contains(target)
  ) {
    return
  }
  
  close()
}

// Sync with prop
watch(() => props.open, (val) => {
  if (val) {
    // Calculate initial position BEFORE opening to prevent transition from (0,0)
    if (props.teleport) {
      menuPosition.value = calculateInitialPosition()
    }
  }
  isOpen.value = val
  if (val) nextTick(updatePosition)
})

// Update position on scroll/resize
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', updatePosition, true)
  window.addEventListener('resize', updatePosition)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
  if (hoverTimeout) clearTimeout(hoverTimeout)
})

defineExpose({
  open,
  close,
  toggle
})
</script>

<style lang="scss" scoped>
.ae-dropdown {
  position: relative;
  display: inline-flex;

  &--disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  // Trigger
  &__trigger {
    display: inline-flex;
  }

  &__default-trigger {
    display: inline-flex;
    align-items: center;
    gap: var(--sds-size-space-8);
    padding: var(--sds-size-space-8) var(--sds-size-space-12);
    border: 1px solid var(--sds-color-border-default-primary);
    border-radius: var(--sds-size-radius-50);
    background: var(--sds-color-background-surface-default);
    color: var(--sds-color-text-primary-default);
    font-size: 0.875rem;
    cursor: pointer;
    transition: all var(--ae-duration-100) var(--ae-ease-out);

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
      border-color: var(--sds-color-border-default-secondary);
    }
  }

  &__trigger-icon {
    width: 16px;
    height: 16px;
    transition: transform var(--ae-duration-150) var(--ae-ease-out);
  }

  &--open &__trigger-icon {
    transform: rotate(180deg);
  }

  // Menu
  &__menu {
    position: absolute;
    z-index: 1000;
    min-width: 160px;
    padding: var(--sds-size-space-4);
    background: var(--sds-color-background-surface-default);
    border: 1px solid var(--sds-color-border-default-secondary);
    border-radius: var(--sds-size-radius-50);
    box-shadow: var(--sds-shadow-overlay);
    outline: none;

    &--bottom-start {
      top: 100%;
      left: 0;
      margin-top: 4px;
    }

    &--bottom-end {
      top: 100%;
      right: 0;
      margin-top: 4px;
    }

    &--top-start {
      bottom: 100%;
      left: 0;
      margin-bottom: 4px;
    }

    &--top-end {
      bottom: 100%;
      right: 0;
      margin-bottom: 4px;
    }
  }

  // Items
  &__item {
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--sds-size-space-8);
    padding: var(--sds-size-space-8) var(--sds-size-space-12);
    border: none;
    border-radius: var(--sds-size-radius-50);
    background: transparent;
    color: var(--sds-color-text-primary-default);
    text-align: left;
    cursor: pointer;
    transition: all var(--ae-duration-100) var(--ae-ease-out);

    &:hover,
    &--active {
      background: var(--sds-color-background-default-primary-hover);
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    &--danger {
      color: var(--sds-color-text-negative-primary);

      &:hover,
      &.ae-dropdown__item--active {
        background: var(--sds-color-background-negative-secondary);
      }
    }
  }

  &__item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__item-label {
    flex: 1;
  }

  &__item-shortcut {
    color: var(--sds-color-text-primary-tertiary);
    margin-left: auto;
  }

  // Divider
  &__divider {
    height: 1px;
    margin: var(--sds-size-space-4) 0;
    background: var(--sds-color-border-default-secondary);
  }

  // Group Label
  &__group-label {
    padding: var(--sds-size-space-8) var(--sds-size-space-12) var(--sds-size-space-4);
    color: var(--sds-color-text-primary-tertiary);
    font-weight: 500;
  }
}

// Transition
.ae-dropdown-enter-active,
.ae-dropdown-leave-active {
  transition: all var(--ae-duration-150) var(--ae-ease-out);
  transform-origin: top left;
}

.ae-dropdown-enter-from,
.ae-dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.ae-dropdown__menu--bottom-end,
.ae-dropdown__menu--top-end {
  transform-origin: top right;
}

.ae-dropdown__menu--top-start,
.ae-dropdown__menu--top-end {
  transform-origin: bottom left;
}

.ae-dropdown__menu--top-end {
  transform-origin: bottom right;
}
</style>
