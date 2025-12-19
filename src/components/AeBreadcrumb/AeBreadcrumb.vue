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
            <svg v-if="separator === 'chevron'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span v-else-if="separator === 'slash'">/</span>
            <span v-else-if="separator === 'arrow'">→</span>
            <span v-else>{{ separator }}</span>
          </slot>
        </span>

        <!-- Breadcrumb Link/Text -->
        <component
          :is="isLastItem(index) || !item.href ? 'span' : 'a'"
          :href="!isLastItem(index) && item.href ? item.href : undefined"
          :class="[
            'ae-breadcrumb__link',
            'ae-text-single-line-body-small',
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
              <component :is="item.icon" />
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
import { computed } from 'vue'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: any
  disabled?: boolean
  meta?: Record<string, any>
}

export interface AeBreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: 'chevron' | 'slash' | 'arrow' | string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<AeBreadcrumbProps>(), {
  separator: 'chevron',
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
    color: var(--sds-color-text-default-tertiary);
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
    color: var(--sds-color-text-default-secondary);
    text-decoration: none;
    transition: color var(--ae-duration-100) var(--ae-ease-out);
    cursor: pointer;

    &:hover:not(&--active):not(&--disabled) {
      color: var(--sds-color-text-brand-secondary);
    }

    &--active {
      color: var(--sds-color-text-default-primary);
      font-weight: 500;
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
