<template>
  <div class="ae-empty" :class="emptyClasses">
    <!-- Icon/Image -->
    <div v-if="$slots.icon || icon || !hideIcon" class="ae-empty__icon">
      <slot name="icon">
        <component v-if="icon" :is="icon" />
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </slot>
    </div>

    <!-- Title -->
    <h3 v-if="title || $slots.title" class="ae-empty__title">
      <slot name="title">{{ title }}</slot>
    </h3>

    <!-- Description -->
    <p v-if="description || $slots.description" class="ae-empty__description">
      <slot name="description">{{ description }}</slot>
    </p>

    <!-- Actions -->
    <div v-if="$slots.default" class="ae-empty__actions">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface AeEmptyProps {
  /** Title text */
  title?: string
  /** Description text */
  description?: string
  /** Custom icon component */
  icon?: any
  /** Hide the default icon */
  hideIcon?: boolean
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<AeEmptyProps>(), {
  title: 'No data',
  size: 'md',
  hideIcon: false
})

const emptyClasses = computed(() => [
  `ae-empty--${props.size}`
])
</script>

<style lang="scss" scoped>
.ae-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--sds-size-space-32);

  // ================================
  // SIZES
  // ================================
  &--sm {
    padding: var(--sds-size-space-24);

    .ae-empty__icon {
      width: 48px;
      height: 48px;
      margin-bottom: var(--sds-size-space-12);
    }

    .ae-empty__title {
      font-size: 0.875rem;
    }

    .ae-empty__description {
      font-size: 0.75rem;
    }

    .ae-empty__actions {
      margin-top: var(--sds-size-space-12);
    }
  }

  &--md {
    .ae-empty__icon {
      width: 64px;
      height: 64px;
      margin-bottom: var(--sds-size-space-16);
    }

    .ae-empty__title {
      font-size: 1rem;
    }

    .ae-empty__description {
      font-size: 0.875rem;
    }

    .ae-empty__actions {
      margin-top: var(--sds-size-space-16);
    }
  }

  &--lg {
    padding: var(--sds-size-space-48);

    .ae-empty__icon {
      width: 80px;
      height: 80px;
      margin-bottom: var(--sds-size-space-20);
    }

    .ae-empty__title {
      font-size: 1.125rem;
    }

    .ae-empty__description {
      font-size: 0.875rem;
      max-width: 400px;
    }

    .ae-empty__actions {
      margin-top: var(--sds-size-space-24);
    }
  }

  // ================================
  // ICON
  // ================================
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sds-color-text-default-quaternary);

    svg {
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  // ================================
  // TITLE
  // ================================
  &__title {
    margin: 0;
    font-weight: 600;
    color: var(--sds-color-text-primary-secondary);
  }

  // ================================
  // DESCRIPTION
  // ================================
  &__description {
    margin: var(--sds-size-space-8) 0 0 0;
    color: var(--sds-color-text-primary-tertiary);
    max-width: 320px;
  }

  // ================================
  // ACTIONS
  // ================================
  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--sds-size-space-8);
  }
}
</style>
