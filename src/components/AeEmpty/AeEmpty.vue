<template>
  <div class="ae-empty" :class="emptyClasses">
    <!-- Icon/Image -->
    <div v-if="$slots.icon || icon || !hideIcon" class="ae-empty__icon">
      <slot name="icon">
        <component v-if="icon" :is="icon" />
        <img v-else :src="defaultImg" alt="" />
      </slot>
    </div>

    <!-- Title -->
    <h3 v-if="title || $slots.title" class="ae-empty__title ae-typo-single-line-body-base">
      <slot name="title">{{ title }}</slot>
    </h3>

    <!-- Description -->
    <p v-if="description || $slots.description" class="ae-empty__description ae-typo-single-line-body-small-strong">
      <slot name="description">{{ description }}</slot>
    </p>

    <!-- Actions -->
    <div class="ae-empty__actions">
      <slot name="default">
        <AeButton @click="backToHome">Back to home</AeButton>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {AeButton} from "@/components";
import NoDataImg from '@/assets/svg/no-result.svg'

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
  state?: 'result' | 'data' | 'connect'
}

const stateDefaultValue = {
  'result': {
    title: 'No Results Found',
    description: 'Try adjusting your search terms',
    img: NoDataImg,
  },
  'data': {
    title: 'Empty Data',
    description: 'Please upload or add new file to get started',
    img: NoDataImg,
  },
  'connect': {
    title: 'Oops! Somethings Went Wrong',
    description: 'Please check your internet connection and try again',
    img: NoDataImg,
  },
}

const props = withDefaults(defineProps<AeEmptyProps>(), {
  size: 'md',
  hideIcon: false,
  state: 'result'
})

const emptyClasses = computed(() => [
  `ae-empty--${props.size}`
])

const title = computed(() => props.title ?? stateDefaultValue[props.state].title)
const description = computed(() => props.description ?? stateDefaultValue[props.state].description)
const defaultImg = computed(() => stateDefaultValue[props.state].img)

const backToHome = () => {
  window.location.href = '/'
}
</script>

<style lang="scss" scoped>
.ae-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--sds-size-space-32);

  &__background {
    width: 200px;
    height: 200px;
  }
  &__title {
    color: var(--sds-color-text-primary-secondary);
  }
  &__description {
    color: var(--sds-color-text-primary-tertiary);
  }

  // ================================
  // SIZES
  // ================================
  &--sm {
    padding: var(--sds-size-space-24);

    .ae-empty__icon:not(:has(img)) {
      width: 48px;
      height: 48px;
      margin-bottom: var(--sds-size-space-12);
    }
  }

  &--md {
    .ae-empty__icon:not(:has(img)) {
      width: 64px;
      height: 64px;
      margin-bottom: var(--sds-size-space-16);
    }
  }

  &--lg {
    padding: var(--sds-size-space-48);

    .ae-empty__icon:not(:has(img)) {
      width: 80px;
      height: 80px;
      margin-bottom: var(--sds-size-space-20);
    }
  }

  // ================================
  // ICON
  // ================================
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sds-color-icon-primary-default);

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
    margin-top: var(--sds-size-space-24);
  }
}
</style>
