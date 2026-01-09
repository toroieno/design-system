<template>
  <aside 
    class="ae-sidebar" 
    :class="sidebarClasses"
    :style="sidebarStyles"
  >
    <!-- Header -->
    <div v-if="$slots.header || logo" class="ae-sidebar__header">
      <slot name="header">
        <div class="ae-sidebar__logo">
          <img v-if="logo" :src="logo" :alt="logoAlt" class="ae-sidebar__logo-img" />
          <span v-if="title && !isCollapsed" class="ae-sidebar__title ae-typo-single-line-body-base-strong">
            {{ title }}
          </span>
        </div>
      </slot>
      
      <!-- Collapse Toggle (internal) -->
      <button
        v-if="collapsible && !hideCollapseButton"
        type="button"
        class="ae-sidebar__collapse-btn"
        @click="toggleCollapse"
        :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path v-if="isCollapsed" d="M9 18l6-6-6-6" />
          <path v-else d="M15 18l-6-6 6-6" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="ae-sidebar__nav">
      <slot>
        <ul class="ae-sidebar__menu">
          <li 
            v-for="item in items" 
            :key="item.key || item.label"
            class="ae-sidebar__item"
            :class="{
              'ae-sidebar__item--active': isItemActive(item),
              'ae-sidebar__item--expanded': expandedItems.includes(item.key || item.label),
              'ae-sidebar__item--has-children': item.children?.length
            }"
          >
            <component
              :is="item.href ? 'a' : 'button'"
              :href="item.href"
              type="button"
              class="ae-sidebar__link"
              :class="{ 'ae-sidebar__link--active': isItemActive(item) }"
              @click="handleItemClick(item, $event)"
            >
              <span v-if="item.icon" class="ae-sidebar__icon">
                <component :is="item.icon" />
              </span>
              <span v-if="!isCollapsed" class="ae-sidebar__label ae-text-single-line-body-small">
                {{ item.label }}
              </span>
              <span 
                v-if="item.badge && !isCollapsed" 
                class="ae-sidebar__badge ae-typo-note"
              >
                {{ item.badge }}
              </span>
              <span 
                v-if="item.children?.length && !isCollapsed" 
                class="ae-sidebar__arrow"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </component>

            <!-- Sub Menu -->
            <Transition name="ae-sidebar-submenu">
              <ul 
                v-if="item.children?.length && !isCollapsed && expandedItems.includes(item.key || item.label)"
                class="ae-sidebar__submenu"
              >
                <li 
                  v-for="child in item.children" 
                  :key="child.key || child.label"
                  class="ae-sidebar__subitem"
                >
                  <component
                    :is="child.href ? 'a' : 'button'"
                    :href="child.href"
                    type="button"
                    class="ae-sidebar__sublink"
                    :class="{ 'ae-sidebar__sublink--active': isItemActive(child) }"
                    @click="handleItemClick(child, $event)"
                  >
                    <span class="ae-sidebar__sublabel ae-text-single-line-body-small">
                      {{ child.label }}
                    </span>
                    <span v-if="child.badge" class="ae-sidebar__badge ae-typo-note">
                      {{ child.badge }}
                    </span>
                  </component>
                </li>
              </ul>
            </Transition>
          </li>
        </ul>
      </slot>
    </nav>

    <!-- Footer -->
    <div v-if="$slots.footer" class="ae-sidebar__footer">
      <slot name="footer" />
    </div>
  </aside>

  <!-- Overlay for mobile -->
  <Transition name="ae-sidebar-overlay">
    <div 
      v-if="overlay && isOpen" 
      class="ae-sidebar__overlay"
      @click="closeSidebar"
    />
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

export interface SidebarItem {
  key?: string
  label: string
  href?: string
  icon?: any
  badge?: string | number
  children?: SidebarItem[]
  disabled?: boolean
  meta?: Record<string, any>
}

export interface AeSidebarProps {
  items?: SidebarItem[]
  activeKey?: string
  logo?: string
  logoAlt?: string
  title?: string
  width?: number | string
  collapsedWidth?: number | string
  collapsible?: boolean
  collapsed?: boolean
  hideCollapseButton?: boolean
  overlay?: boolean
  open?: boolean
}

const props = withDefaults(defineProps<AeSidebarProps>(), {
  items: () => [],
  activeKey: '',
  logoAlt: 'Logo',
  width: 260,
  collapsedWidth: 64,
  collapsible: true,
  collapsed: false,
  hideCollapseButton: false,
  overlay: false,
  open: true
})

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
  'update:open': [value: boolean]
  'item-click': [item: SidebarItem]
  'collapse': [collapsed: boolean]
}>()

const internalCollapsed = ref(props.collapsed)
const expandedItems = ref<string[]>([])

const isCollapsed = computed(() => props.collapsed ?? internalCollapsed.value)
const isOpen = computed(() => props.open)

const sidebarClasses = computed(() => [
  {
    'ae-sidebar--collapsed': isCollapsed.value,
    'ae-sidebar--overlay': props.overlay,
    'ae-sidebar--open': props.overlay && isOpen.value,
    'ae-sidebar--closed': props.overlay && !isOpen.value
  }
])

const sidebarStyles = computed(() => {
  const width = isCollapsed.value 
    ? (typeof props.collapsedWidth === 'number' ? `${props.collapsedWidth}px` : props.collapsedWidth)
    : (typeof props.width === 'number' ? `${props.width}px` : props.width)
  
  return { width }
})

const isItemActive = (item: SidebarItem): boolean => {
  const key = item.key || item.label
  if (key === props.activeKey) return true
  if (item.children?.some(child => (child.key || child.label) === props.activeKey)) return true
  return false
}

const toggleCollapse = () => {
  const newValue = !isCollapsed.value
  internalCollapsed.value = newValue
  emit('update:collapsed', newValue)
  emit('collapse', newValue)
}

const closeSidebar = () => {
  emit('update:open', false)
}

const handleItemClick = (item: SidebarItem, event: Event) => {
  const key = item.key || item.label
  
  if (item.children?.length) {
    event.preventDefault()
    const index = expandedItems.value.indexOf(key)
    if (index > -1) {
      expandedItems.value.splice(index, 1)
    } else {
      expandedItems.value.push(key)
    }
  } else {
    emit('item-click', item)
    if (props.overlay) {
      closeSidebar()
    }
  }
}

// Sync with prop
watch(() => props.collapsed, (val) => {
  internalCollapsed.value = val
})

// Auto-expand active parent
watch(() => props.activeKey, (activeKey) => {
  if (!activeKey) return
  props.items?.forEach(item => {
    const key = item.key || item.label
    if (item.children?.some(child => (child.key || child.label) === activeKey)) {
      if (!expandedItems.value.includes(key)) {
        expandedItems.value.push(key)
      }
    }
  })
}, { immediate: true })
</script>

<style lang="scss" scoped>
.ae-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--sds-color-background-surface-default);
  border-right: 1px solid var(--sds-color-border-default-secondary);
  transition: width var(--ae-duration-200) var(--ae-ease-out);
  overflow: hidden;

  // Header
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--sds-size-space-16);
    border-bottom: 1px solid var(--sds-color-border-default-secondary);
    min-height: 64px;
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-12);
    overflow: hidden;
  }

  &__logo-img {
    width: 32px;
    height: 32px;
    object-fit: contain;
    flex-shrink: 0;
  }

  &__title {
    color: var(--sds-color-text-primary-default);
    white-space: nowrap;
  }

  &__collapse-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--sds-color-text-primary-tertiary);
    cursor: pointer;
    border-radius: var(--sds-size-radius-50);
    transition: all var(--ae-duration-100) var(--ae-ease-out);
    flex-shrink: 0;

    svg {
      width: 16px;
      height: 16px;
    }

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
      color: var(--sds-color-text-primary-default);
    }
  }

  // Navigation
  &__nav {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: var(--sds-size-space-8);
  }

  &__menu {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--sds-size-space-4);
  }

  &__item {
    position: relative;
  }

  &__link {
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--sds-size-space-12);
    padding: var(--sds-size-space-10) var(--sds-size-space-12);
    border: none;
    background: transparent;
    color: var(--sds-color-text-primary-secondary);
    text-decoration: none;
    cursor: pointer;
    border-radius: var(--sds-size-radius-100);
    transition: all var(--ae-duration-100) var(--ae-ease-out);
    text-align: left;

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
      color: var(--sds-color-text-primary-default);
    }

    &--active {
      background: var(--sds-color-background-brand-secondary);
      color: var(--sds-color-text-brand-secondary);

      &:hover {
        background: var(--sds-color-background-brand-secondary-hover);
      }
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__label {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__badge {
    padding: var(--sds-size-space-2) var(--sds-size-space-8);
    background: var(--sds-color-background-brand-default);
    color: var(--sds-color-text-brand-primary);
    border-radius: var(--sds-size-radius-full);
    flex-shrink: 0;
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

  &__item--expanded &__arrow {
    transform: rotate(180deg);
  }

  // Submenu
  &__submenu {
    list-style: none;
    margin: 0;
    padding: var(--sds-size-space-4) 0 var(--sds-size-space-4) var(--sds-size-space-32);
    display: flex;
    flex-direction: column;
    gap: var(--sds-size-space-2);
  }

  &__sublink {
    display: flex;
    align-items: center;
    width: 100%;
    gap: var(--sds-size-space-8);
    padding: var(--sds-size-space-8) var(--sds-size-space-12);
    border: none;
    background: transparent;
    color: var(--sds-color-text-primary-tertiary);
    text-decoration: none;
    cursor: pointer;
    border-radius: var(--sds-size-radius-100);
    transition: all var(--ae-duration-100) var(--ae-ease-out);
    text-align: left;

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
      color: var(--sds-color-text-primary-default);
    }

    &--active {
      color: var(--sds-color-text-brand-secondary);
      background: var(--sds-color-background-brand-secondary);
    }
  }

  &__sublabel {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // Footer
  &__footer {
    padding: var(--sds-size-space-16);
    border-top: 1px solid var(--sds-color-border-default-secondary);
  }

  // ================================
  // COLLAPSED STATE
  // ================================
  &--collapsed {
    .ae-sidebar__header {
      justify-content: center;
      padding: var(--sds-size-space-16) var(--sds-size-space-8);
    }

    .ae-sidebar__logo {
      justify-content: center;
    }

    .ae-sidebar__collapse-btn {
      display: none;
    }

    .ae-sidebar__link {
      justify-content: center;
      padding: var(--sds-size-space-12);
    }

    .ae-sidebar__nav {
      padding: var(--sds-size-space-8) var(--sds-size-space-4);
    }

    .ae-sidebar__footer {
      padding: var(--sds-size-space-12) var(--sds-size-space-8);
    }
  }

  // ================================
  // OVERLAY MODE (Mobile)
  // ================================
  &--overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 100vh;
    transform: translateX(-100%);
    transition: transform var(--ae-duration-200) var(--ae-ease-out);

    &.ae-sidebar--open {
      transform: translateX(0);
    }
  }

  &__overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
}

// Submenu transition
.ae-sidebar-submenu-enter-active,
.ae-sidebar-submenu-leave-active {
  transition: all var(--ae-duration-150) var(--ae-ease-out);
  overflow: hidden;
}

.ae-sidebar-submenu-enter-from,
.ae-sidebar-submenu-leave-to {
  opacity: 0;
  max-height: 0;
}

.ae-sidebar-submenu-enter-to,
.ae-sidebar-submenu-leave-from {
  opacity: 1;
  max-height: 500px;
}

// Overlay transition
.ae-sidebar-overlay-enter-active,
.ae-sidebar-overlay-leave-active {
  transition: opacity var(--ae-duration-200) var(--ae-ease-out);
}

.ae-sidebar-overlay-enter-from,
.ae-sidebar-overlay-leave-to {
  opacity: 0;
}
</style>
