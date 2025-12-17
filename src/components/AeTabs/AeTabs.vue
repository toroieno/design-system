<template>
  <div :class="tabsClasses">
    <div class="ae-tabs__header" role="tablist" ref="headerRef">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.value"
        :class="[
          'ae-tabs__tab',
          'ae-text-body-base',
          {
            'ae-tabs__tab--active': modelValue === tab.value,
            'ae-tabs__tab--disabled': tab.disabled
          }
        ]"
        :disabled="tab.disabled"
        :aria-selected="modelValue === tab.value"
        :tabindex="modelValue === tab.value ? 0 : -1"
        role="tab"
        @click="selectTab(tab)"
        @keydown.left.prevent="navigateTabs(-1)"
        @keydown.right.prevent="navigateTabs(1)"
      >
        <span v-if="tab.icon" class="ae-tabs__icon">
          <component :is="tab.icon" />
        </span>
        <span class="ae-tabs__label">{{ tab.label }}</span>
        <span v-if="tab.badge" class="ae-tabs__badge ae-text-note">{{ tab.badge }}</span>
      </button>
      <div
        class="ae-tabs__indicator"
        :style="indicatorStyle"
      />
    </div>
    
    <div v-if="$slots.default" class="ae-tabs__content" role="tabpanel">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick, type Component } from 'vue'

export interface TabItem {
  label: string
  value: string | number
  icon?: Component
  badge?: string | number
  disabled?: boolean
}

export interface AeTabsProps {
  modelValue: string | number
  tabs: TabItem[]
  variant?: 'underline' | 'enclosed'
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary'
  fullWidth?: boolean
  centered?: boolean
}

const props = withDefaults(defineProps<AeTabsProps>(), {
  variant: 'underline',
  size: 'md',
  color: 'primary',
  fullWidth: false,
  centered: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'change': [value: string | number]
}>()

const indicatorStyle = ref<Record<string, string>>({})
const headerRef = ref<HTMLElement | null>(null)

const tabsClasses = computed(() => [
  'ae-tabs',
  `ae-tabs--${props.variant}`,
  `ae-tabs--${props.size}`,
  `ae-tabs--${props.color}`,
  {
    'ae-tabs--full-width': props.fullWidth,
    'ae-tabs--centered': props.centered
  }
])

const selectTab = (tab: TabItem) => {
  if (tab.disabled) return
  
  emit('update:modelValue', tab.value)
  emit('change', tab.value)
}

const navigateTabs = (direction: number) => {
  const enabledTabs = props.tabs.filter(tab => !tab.disabled)
  if (enabledTabs.length === 0) return
  
  const currentIndex = enabledTabs.findIndex(tab => tab.value === props.modelValue)
  let newIndex = currentIndex + direction
  
  // Wrap around
  if (newIndex < 0) newIndex = enabledTabs.length - 1
  if (newIndex >= enabledTabs.length) newIndex = 0
  
  selectTab(enabledTabs[newIndex])
}

const updateIndicator = () => {
  nextTick(() => {
    const headerEl = headerRef.value as HTMLElement
    const activeTab = headerEl?.querySelector('.ae-tabs__tab--active') as HTMLElement
    
    if (activeTab && headerEl) {
      const headerRect = headerEl.getBoundingClientRect()
      const tabRect = activeTab.getBoundingClientRect()
      
      indicatorStyle.value = {
        width: `${tabRect.width}px`,
        transform: `translateX(${tabRect.left - headerRect.left}px)`
      }
    }
  })
}

onMounted(() => {
  updateIndicator()
})

watch(() => props.modelValue, () => {
  updateIndicator()
})

watch(() => props.tabs, () => {
  updateIndicator()
}, { deep: true })
</script>

<style lang="scss" scoped>
.ae-tabs {
  display: flex;
  flex-direction: column;
  width: 100%;
  
  // Header
  &__header {
    position: relative;
    display: flex;
    gap: var(--sds-size-space-4);
  }
  
  // Tab button
  &__tab {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--sds-size-space-8);
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all var(--ae-duration-200) var(--ae-ease-out);
    white-space: nowrap;
    color: var(--sds-color-text-default-tertiary);

    &--active,
    &:hover:not(&--disabled) {
      color: var(--sds-color-text-default-primary);
    }
    
    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    &:focus-visible {
      outline: 2px solid var(--sds-color-border-brand-green);
      outline-offset: 2px;
    }
  }
  
  // Icon
  &__icon {
    display: flex;
    align-items: center;
    
    svg {
      width: 1.25em;
      height: 1.25em;
    }
  }
  
  // Badge
  &__badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 var(--sds-size-space-6);
    min-width: 1.25rem;
    height: 1.25rem;
    border-radius: var(--sds-size-radius-full);
    background: var(--sds-color-background-brand-default);
    color: var(--sds-color-text-brand-primary);
  }
  
  // Indicator (underline/enclosed)
  &__indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: var(--sds-color-background-brand-default);
    transition: all var(--ae-duration-200) var(--ae-ease-out);
  }
  
  // Content
  &__content {
    padding-top: var(--sds-size-space-16);
  }
  
  // ================================
  // SIZES
  // ================================
  &--sm {
    .ae-tabs__tab {
      padding: var(--sds-size-space-2) var(--sds-size-space-8);
    }
  }
  
  &--md {
    .ae-tabs__tab {
      padding: var(--sds-size-space-4) var(--sds-size-space-12);
    }
  }
  
  &--lg {
    .ae-tabs__tab {
      padding: var(--sds-size-space-6) var(--sds-size-space-16);
    }
  }
  
  // ================================
  // VARIANT: Underline
  // ================================
  &--underline {
    .ae-tabs__header {
      border-bottom: var(--sds-size-stroke-border) solid var(--sds-color-border-default-secondary);
    }
    
    .ae-tabs__tab {
      margin-bottom: -1px;
      
      &--active {
        background: var(--sds-color-background-surface-tertiary);
        border-radius: var(--sds-size-radius-100) var(--sds-size-radius-100) 0 0;
        color: var(--sds-color-text-default-primary);
      }
    }
  }
  
  // ================================
  // VARIANT: Enclosed
  // ================================
  &--enclosed {
    .ae-tabs__header {
      background: var(--sds-color-background-surface-default);
      border-radius: var(--sds-size-radius-50);
      padding: var(--sds-size-space-4);
      gap: var(--sds-size-space-4);
    }
    
    .ae-tabs__tab {
      border-radius: var(--sds-size-radius-50);
      
      &:hover:not(&--disabled):not(&--active) {
        background: var(--sds-color-background-default-primary-hover);
      }
      
      &--active {
        background: var(--sds-color-background-brand-default);
        color: var(--sds-color-text-brand-primary);
      }
    }
    
    .ae-tabs__indicator {
      display: none;
    }
  }
  
  // ================================
  // MODIFIERS
  // ================================
  &--full-width {
    .ae-tabs__header {
      width: 100%;
    }
    
    .ae-tabs__tab {
      flex: 1;
    }
  }
  
  &--centered {
    .ae-tabs__header {
      justify-content: center;
    }
  }
}
</style>
