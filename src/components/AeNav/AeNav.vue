<template>
  <header class="ae-nav" :class="navClasses">
    <div class="ae-nav__container" :style="containerStyles">
      <!-- Brand/Logo -->
      <div class="ae-nav__brand">
        <slot name="brand">
          <a v-if="logo || title" :href="logoHref" class="ae-nav__logo-link">
            <img v-if="logo" :src="logo" :alt="logoAlt" class="ae-nav__logo" />
            <span v-if="title" class="ae-nav__title ae-typo-single-line-body-base-strong">
              {{ title }}
            </span>
          </a>
        </slot>
      </div>

      <!-- Mobile Toggle -->
      <button
        v-if="!hideToggle"
        type="button"
        class="ae-nav__toggle"
        :class="{ 'ae-nav__toggle--active': mobileOpen }"
        @click="toggleMobile"
        aria-label="Toggle navigation"
      >
        <span class="ae-nav__toggle-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <!-- Navigation Content -->
      <div class="ae-nav__content" :class="{ 'ae-nav__content--open': mobileOpen }">
        <!-- Main Navigation -->
        <nav class="ae-nav__menu">
          <slot>
            <ul class="ae-nav__list">
              <li 
                v-for="item in items" 
                :key="item.key || item.label"
                class="ae-nav__item"
                :class="{
                  'ae-nav__item--active': isItemActive(item),
                  'ae-nav__item--has-children': item.children?.length,
                  'ae-nav__item--open': openDropdown === (item.key || item.label)
                }"
                @mouseenter="handleMouseEnter(item)"
                @mouseleave="handleMouseLeave"
              >
                <component
                  :is="item.href && !item.children?.length ? 'a' : 'button'"
                  :href="item.href && !item.children?.length ? item.href : undefined"
                  type="button"
                  class="ae-nav__link"
                  :class="{ 'ae-nav__link--active': isItemActive(item) }"
                  @click="handleItemClick(item, $event)"
                >
                  <span v-if="item.icon" class="ae-nav__icon">
                    <component :is="item.icon" />
                  </span>
                  <span class="ae-nav__label">{{ item.label }}</span>
                  <span v-if="item.badge" class="ae-nav__badge">{{ item.badge }}</span>
                  <span v-if="item.children?.length" class="ae-nav__arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </component>

                <!-- Dropdown -->
                <Transition name="ae-nav-dropdown">
                  <div 
                    v-if="item.children?.length && openDropdown === (item.key || item.label)"
                    class="ae-nav__dropdown"
                  >
                    <ul class="ae-nav__dropdown-list">
                      <li 
                        v-for="child in item.children" 
                        :key="child.key || child.label"
                        class="ae-nav__dropdown-item"
                      >
                        <component
                          :is="child.href ? 'a' : 'button'"
                          :href="child.href"
                          type="button"
                          class="ae-nav__dropdown-link"
                          :class="{ 'ae-nav__dropdown-link--active': isItemActive(child) }"
                          @click="handleChildClick(child, $event)"
                        >
                          <span v-if="child.icon" class="ae-nav__dropdown-icon">
                            <component :is="child.icon" />
                          </span>
                          <span class="ae-nav__dropdown-label">{{ child.label }}</span>
                          <span v-if="child.description" class="ae-nav__dropdown-desc">
                            {{ child.description }}
                          </span>
                        </component>
                      </li>
                    </ul>
                  </div>
                </Transition>
              </li>
            </ul>
          </slot>
        </nav>

        <!-- Actions Slot -->
        <div v-if="$slots.actions" class="ae-nav__actions">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface NavItem {
  key?: string
  label: string
  href?: string
  icon?: any
  badge?: string | number
  description?: string
  children?: NavItem[]
  disabled?: boolean
  meta?: Record<string, any>
}

export interface AeNavProps {
  /** Navigation items */
  items?: NavItem[]
  /** Currently active item key */
  activeKey?: string
  /** Logo image source */
  logo?: string
  /** Logo alt text */
  logoAlt?: string
  /** Brand title */
  title?: string
  /** Logo link href */
  logoHref?: string
  /** Visual variant */
  variant?: 'default' | 'bordered' | 'elevated'
  /** Fixed to top */
  fixed?: boolean
  /** Sticky positioning */
  sticky?: boolean
  /** Max width of content */
  maxWidth?: number | string
  /** Full width (no max-width constraint) */
  fluid?: boolean
  /** Center navigation items */
  centered?: boolean
  /** Hide mobile toggle button */
  hideToggle?: boolean
}

const props = withDefaults(defineProps<AeNavProps>(), {
  items: () => [],
  activeKey: '',
  logoAlt: 'Logo',
  logoHref: '/',
  variant: 'default',
  fixed: false,
  sticky: false,
  maxWidth: 1280,
  fluid: false,
  centered: false,
  hideToggle: false
})

const emit = defineEmits<{
  'item-click': [item: NavItem]
  'toggle': [open: boolean]
}>()

const mobileOpen = ref(false)
const openDropdown = ref<string | null>(null)
let closeTimeout: ReturnType<typeof setTimeout> | null = null

const navClasses = computed(() => [
  `ae-nav--${props.variant}`,
  {
    'ae-nav--fixed': props.fixed,
    'ae-nav--sticky': props.sticky,
    'ae-nav--centered': props.centered,
    'ae-nav--mobile-open': mobileOpen.value
  }
])

const containerStyles = computed(() => {
  if (props.fluid) return {}
  const maxWidth = typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth
  return { maxWidth }
})

const isItemActive = (item: NavItem): boolean => {
  const key = item.key || item.label
  if (key === props.activeKey) return true
  if (item.children?.some(child => (child.key || child.label) === props.activeKey)) return true
  return false
}

const toggleMobile = () => {
  mobileOpen.value = !mobileOpen.value
  emit('toggle', mobileOpen.value)
}

const handleMouseEnter = (item: NavItem) => {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
    closeTimeout = null
  }
  if (item.children?.length && window.innerWidth >= 768) {
    openDropdown.value = item.key || item.label
  }
}

const handleMouseLeave = () => {
  if (window.innerWidth >= 768) {
    closeTimeout = setTimeout(() => {
      openDropdown.value = null
    }, 150)
  }
}

const handleItemClick = (item: NavItem, event: Event) => {
  const key = item.key || item.label

  if (item.children?.length) {
    event.preventDefault()
    // Toggle on mobile
    if (window.innerWidth < 768) {
      openDropdown.value = openDropdown.value === key ? null : key
    }
  } else {
    emit('item-click', item)
    mobileOpen.value = false
    openDropdown.value = null
  }
}

const handleChildClick = (item: NavItem, event: Event) => {
  emit('item-click', item)
  mobileOpen.value = false
  openDropdown.value = null
}

// Close dropdown on click outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.ae-nav__item')) {
    openDropdown.value = null
  }
}

// Close on escape
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    openDropdown.value = null
    mobileOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
  if (closeTimeout) clearTimeout(closeTimeout)
})
</script>

<style lang="scss" scoped>
.ae-nav {
  width: 100%;
  background: var(--sds-color-background-surface-default);
  z-index: 100;

  // ================================
  // VARIANTS
  // ================================
  &--default {
    border-bottom: 1px solid var(--sds-color-border-default-secondary);
  }

  &--bordered {
    border-bottom: 1px solid var(--sds-color-border-default-primary);
  }

  &--elevated {
    box-shadow: var(--sds-effect-shadow-300);
  }

  // ================================
  // POSITIONING
  // ================================
  &--fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  &--sticky {
    position: sticky;
    top: 0;
  }

  // ================================
  // CONTAINER
  // ================================
  &__container {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-16);
    width: 100%;
    margin: 0 auto;
    padding: 0 var(--sds-size-space-24);
    min-height: 64px;
  }

  // ================================
  // BRAND
  // ================================
  &__brand {
    flex-shrink: 0;
  }

  &__logo-link {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-12);
    text-decoration: none;
    color: inherit;
  }

  &__logo {
    height: 32px;
    width: auto;
    object-fit: contain;
  }

  &__title {
    color: var(--sds-color-text-primary-default);
    white-space: nowrap;
  }

  // ================================
  // MOBILE TOGGLE
  // ================================
  &__toggle {
    display: none;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: var(--sds-size-radius-100);
    margin-left: auto;
    transition: background var(--ae-duration-100) var(--ae-ease-out);

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
    }

    @media (max-width: 767px) {
      display: flex;
    }
  }

  &__toggle-icon {
    position: relative;
    width: 20px;
    height: 14px;

    span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--sds-color-text-primary-default);
      border-radius: 1px;
      transition: all var(--ae-duration-200) var(--ae-ease-out);

      &:nth-child(1) { top: 0; }
      &:nth-child(2) { top: 50%; transform: translateY(-50%); }
      &:nth-child(3) { bottom: 0; }
    }
  }

  &__toggle--active &__toggle-icon {
    span:nth-child(1) {
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }
    span:nth-child(2) {
      opacity: 0;
    }
    span:nth-child(3) {
      bottom: 50%;
      transform: translateY(50%) rotate(-45deg);
    }
  }

  // ================================
  // CONTENT
  // ================================
  &__content {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-16);
    flex: 1;

    @media (max-width: 767px) {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      flex-direction: column;
      align-items: stretch;
      background: var(--sds-color-background-surface-default);
      border-bottom: 1px solid var(--sds-color-border-default-secondary);
      padding: var(--sds-size-space-16);
      gap: var(--sds-size-space-8);
      display: none;
      box-shadow: var(--sds-effect-shadow-300);

      &--open {
        display: flex;
      }
    }
  }

  // ================================
  // MENU
  // ================================
  &__menu {
    flex: 1;
  }

  &--centered &__menu {
    display: flex;
    justify-content: center;
  }

  &__list {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-4);
    list-style: none;
    margin: 0;
    padding: 0;

    @media (max-width: 767px) {
      flex-direction: column;
      align-items: stretch;
      gap: var(--sds-size-space-2);
    }
  }

  &__item {
    position: relative;

    @media (max-width: 767px) {
      width: 100%;
    }
  }

  &__link {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-8);
    padding: var(--sds-size-space-8) var(--sds-size-space-12);
    border: none;
    background: transparent;
    color: var(--sds-color-text-primary-secondary);
    text-decoration: none;
    cursor: pointer;
    border-radius: var(--sds-size-radius-100);
    font-size: 0.875rem;
    font-weight: 500;
    white-space: nowrap;
    transition: all var(--ae-duration-100) var(--ae-ease-out);

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
      color: var(--sds-color-text-primary-default);
    }

    &--active {
      color: var(--sds-color-text-brand-secondary);
      background: var(--sds-color-background-brand-secondary);

      &:hover {
        background: var(--sds-color-background-brand-secondary-hover);
      }
    }

    @media (max-width: 767px) {
      width: 100%;
      padding: var(--sds-size-space-12) var(--sds-size-space-16);
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__label {
    flex: 1;

    @media (min-width: 768px) {
      flex: none;
    }
  }

  &__badge {
    padding: var(--sds-size-space-2) var(--sds-size-space-6);
    background: var(--sds-color-background-negative-default);
    color: white;
    font-size: 0.625rem;
    font-weight: 600;
    border-radius: var(--sds-size-radius-full);
    line-height: 1;
  }

  &__arrow {
    display: flex;
    align-items: center;
    transition: transform var(--ae-duration-150) var(--ae-ease-out);

    svg {
      width: 16px;
      height: 16px;
    }
  }

  &__item--open &__arrow {
    transform: rotate(180deg);
  }

  // ================================
  // DROPDOWN
  // ================================
  &__dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    padding-top: var(--sds-size-space-8);
    z-index: 10;

    @media (max-width: 767px) {
      position: static;
      padding-top: 0;
      padding-left: var(--sds-size-space-16);
    }
  }

  &__dropdown-list {
    list-style: none;
    margin: 0;
    padding: var(--sds-size-space-8);
    background: var(--sds-color-background-surface-default);
    border: 1px solid var(--sds-color-border-default-secondary);
    border-radius: var(--sds-size-radius-200);
    box-shadow: var(--sds-effect-shadow-400);
    display: flex;
    flex-direction: column;
    gap: var(--sds-size-space-2);

    @media (max-width: 767px) {
      background: transparent;
      border: none;
      box-shadow: none;
      padding: var(--sds-size-space-8) 0;
    }
  }

  &__dropdown-link {
    display: flex;
    flex-direction: column;
    gap: var(--sds-size-space-2);
    width: 100%;
    padding: var(--sds-size-space-10) var(--sds-size-space-12);
    border: none;
    background: transparent;
    color: var(--sds-color-text-primary-secondary);
    text-decoration: none;
    cursor: pointer;
    border-radius: var(--sds-size-radius-100);
    text-align: left;
    transition: all var(--ae-duration-100) var(--ae-ease-out);

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
      color: var(--sds-color-text-primary-default);
    }

    &--active {
      color: var(--sds-color-text-brand-secondary);
      background: var(--sds-color-background-brand-secondary);
    }
  }

  &__dropdown-icon {
    display: flex;
    width: 18px;
    height: 18px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__dropdown-label {
    font-size: 0.875rem;
    font-weight: 500;
  }

  &__dropdown-desc {
    font-size: 0.75rem;
    color: var(--sds-color-text-primary-tertiary);
  }

  // ================================
  // ACTIONS
  // ================================
  &__actions {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-8);
    margin-left: auto;

    @media (max-width: 767px) {
      width: 100%;
      margin-left: 0;
      padding-top: var(--sds-size-space-8);
      border-top: 1px solid var(--sds-color-border-default-secondary);
    }
  }
}

// ================================
// DROPDOWN TRANSITION
// ================================
.ae-nav-dropdown-enter-active,
.ae-nav-dropdown-leave-active {
  transition: all var(--ae-duration-150) var(--ae-ease-out);
}

.ae-nav-dropdown-enter-from,
.ae-nav-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);

  @media (max-width: 767px) {
    transform: none;
  }
}
</style>
