<template>
  <nav class="ae-breadcrumb" :class="breadcrumbClasses" aria-label="Breadcrumb">
    <ol class="ae-breadcrumb__list">
      <li 
        v-for="(item, index) in items" 
        :key="index" 
        class="ae-breadcrumb__item"
      >
        <!-- Separator (not on first item) -->
        <span v-if="index > 0" class="ae-breadcrumb__separator" aria-hidden="true">
          <slot name="separator">
            <svg v-if="separator === 'chevron'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5.25 10.5L8.75 7L5.25 3.5" stroke="#71717A" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else-if="separator === 'slash'" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12.8333 1.16667L1.16666 12.8333" stroke="#71717A" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span v-else>{{ separator }}</span>
          </slot>
        </span>

        <!-- Breadcrumb Link/Text -->
        <AeDropdown class="ae-breadcrumb__link" v-if="Array.isArray(item)" :items="item" trigger="hover">
          <template #trigger>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8.00002 8.66666C8.36821 8.66666 8.66669 8.36818 8.66669 7.99999C8.66669 7.63181 8.36821 7.33333 8.00002 7.33333C7.63183 7.33333 7.33335 7.63181 7.33335 7.99999C7.33335 8.36818 7.63183 8.66666 8.00002 8.66666Z"
                stroke="#71717A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path
                d="M12.6667 8.66666C13.0349 8.66666 13.3334 8.36818 13.3334 7.99999C13.3334 7.63181 13.0349 7.33333 12.6667 7.33333C12.2985 7.33333 12 7.63181 12 7.99999C12 8.36818 12.2985 8.66666 12.6667 8.66666Z"
                stroke="#71717A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path
                d="M3.33335 8.66666C3.70154 8.66666 4.00002 8.36818 4.00002 7.99999C4.00002 7.63181 3.70154 7.33333 3.33335 7.33333C2.96516 7.33333 2.66669 7.63181 2.66669 7.99999C2.66669 8.36818 2.96516 8.66666 3.33335 8.66666Z"
                stroke="#71717A" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </template>
        </AeDropdown>

        <component
          v-else
          :is="isLastItem(index) || !item.href ? 'span' : 'a'"
          :href="!isLastItem(index) && item.href ? item.href : undefined"
          :class="[
            'ae-breadcrumb__link',
            'ae-typo-single-line-body-small-strong',
            {
              'ae-breadcrumb__link--active': isLastItem(index),
              'ae-breadcrumb__link--disabled': item.disabled
            }
          ]"
          :aria-current="isLastItem(index) ? 'page' : undefined"
          @click="handleClick(item, index, $event)"
        >
          <!-- Icon -->
          <span v-if="item.icon" class="ae-breadcrumb__icon">
            <slot :name="`icon-${index}`" :item="item">
              <component :is="item.icon"></component>
            </slot>
          </span>
          
          <!-- Label -->
          <span class="ae-breadcrumb__label">
            <slot :name="`item-${index}`" :item="item" :index="index">
              {{ item.label }}
            </slot>
          </span>
        </component>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {AeDropdown} from "@/components";

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: any
  disabled?: boolean
  meta?: Record<string, any>
}

export interface AeBreadcrumbProps {
  items: (BreadcrumbItem | BreadcrumbItem[])[]
  separator?: 'chevron' | 'slash' | string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<AeBreadcrumbProps>(), {
  separator: 'slash',
  size: 'md'
})

const emit = defineEmits<{
  'item-click': [item: BreadcrumbItem, index: number]
}>()

const breadcrumbClasses = computed(() => [
  `ae-breadcrumb--${props.size}`
])

const isLastItem = (index: number) => index === props.items.length - 1

const handleClick = (item: BreadcrumbItem, index: number, event: MouseEvent) => {
  if (item.disabled || isLastItem(index)) {
    event.preventDefault()
    return
  }
  emit('item-click', item, index)
}
</script>

<style lang="scss" scoped>
.ae-breadcrumb {
  display: inline-flex;

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
    gap: var(--sds-size-space-8);
  }

  &__item {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-8);
  }

  &__separator {
    display: flex;
    align-items: center;
    color: var(--sds-color-text-primary-tertiary);
    user-select: none;

    svg {
      width: 1em;
      height: 1em;
    }
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: var(--sds-size-space-4);
    color: var(--sds-color-text-neutral-default);
    text-decoration: none;
    transition: color var(--ae-duration-100) var(--ae-ease-out);
    cursor: pointer;
    border-bottom: 1px solid transparent;

    &:hover:not(&--active):not(&--disabled) {
      color: var(--sds-color-text-primary-default);
      border-bottom-color: var(--sds-color-border-brand-default);
    }

    &--active {
      color: var(--sds-color-text-primary-default);
      cursor: default;
    }

    &--disabled {
      color: var(--sds-color-text-default-disabled);
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  &__icon {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    svg {
      width: 1em;
      height: 1em;
    }
  }

  &__label {
    white-space: nowrap;
  }

  // ================================
  // SIZES
  // ================================
  &--sm {
    .ae-breadcrumb__list {
      gap: var(--sds-size-space-6);
    }

    .ae-breadcrumb__item {
      gap: var(--sds-size-space-6);
    }

    .ae-breadcrumb__link {
      font-size: 0.75rem;
    }

    .ae-breadcrumb__separator svg {
      width: 0.875em;
      height: 0.875em;
    }
  }

  &--md {
    .ae-breadcrumb__link {
      font-size: 0.875rem;
    }
  }

  &--lg {
    .ae-breadcrumb__list {
      gap: var(--sds-size-space-10);
    }

    .ae-breadcrumb__item {
      gap: var(--sds-size-space-10);
    }

    .ae-breadcrumb__link {
      font-size: 1rem;
    }

    .ae-breadcrumb__separator svg {
      width: 1.125em;
      height: 1.125em;
    }
  }
}
</style>
