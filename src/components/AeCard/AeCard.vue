<template>
  <component :is="tag" :class="cardClasses">
    <div v-if="$slots.header || title" class="ae-card__header">
      <slot name="header">
        <h3 v-if="title" class="ae-card__title ae-typo-subheading">{{ title }}</h3>
        <p v-if="subtitle" class="ae-card__subtitle ae-typo-body-base">{{ subtitle }}</p>
      </slot>
    </div>
    
    <div v-if="$slots.media" class="ae-card__media">
      <slot name="media" />
    </div>
    
    <div v-if="$slots.default" class="ae-card__content">
      <slot />
    </div>
    
    <div v-if="$slots.actions" class="ae-card__actions">
      <slot name="actions" />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface AeCardProps {
  tag?: string
  title?: string
  subtitle?: string
  variant?: 'elevated' | 'outlined' | 'flat' | 'tonal'
  color?: 'default' | 'primary' | 'secondary' | 'accent'
  hover?: boolean
  clickable?: boolean
}

const props = withDefaults(defineProps<AeCardProps>(), {
  tag: 'div',
  variant: 'elevated',
  color: 'default',
  hover: false,
  clickable: false,
})

const cardClasses = computed(() => [
  'ae-card',
  `ae-card--${props.variant}`,
  `ae-card--${props.color}`,
  {
    'ae-card--hover': props.hover,
    'ae-card--clickable': props.clickable,
  },
])
</script>

<style lang="scss" scoped>
.ae-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--sds-size-radius-50);
  overflow: hidden;
  transition: all var(--ae-duration-200) var(--ae-ease-out);
  background: var(--sds-color-background-opacity-100);
  
  // Header
  &__header {
    padding: var(--sds-size-space-4) var(--sds-size-space-8);
  }

  &__title {
    color: var(--sds-color-text-default-primary);
  }

  &__subtitle {
    color: var(--sds-color-text-default-primary);
  }
  
  // Media
  &__media {
    position: relative;
    
    img, video {
      width: 100%;
      height: auto;
      display: block;
    }
  }
  
  // Content
  &__content {
    padding: var(--sds-size-space-8);
    flex: 1;
    
    &:first-child {
      padding-top: var(--sds-size-space-4);
    }
  }
  
  &__header + &__content {
    padding-top: 0;
  }
  
  // Actions
  &__actions {
    display: flex;
    align-items: center;
    gap: var(--ae-space-2);
    padding: var(--ae-space-3) var(--ae-space-5) var(--ae-space-5);
  }
  
  // ================================
  // VARIANTS
  // ================================
  &--elevated {
    box-shadow: var(--ae-shadow-md);
    
    &.ae-card--hover:hover,
    &.ae-card--clickable:hover {
      box-shadow: var(--ae-shadow-xl);
      transform: translateY(-2px);
    }
  }
  
  &--outlined {
    border: var(--ae-border-width-2) solid var(--ae-neutral-200);
    
    &.ae-card--hover:hover,
    &.ae-card--clickable:hover {
      border-color: var(--ae-neutral-300);
      box-shadow: var(--ae-shadow-sm);
    }
  }
  
  &--flat {
    //background: var(--ae-neutral-0);
  }
  
  &--tonal {
    //background: var(--ae-neutral-50);
  }
  
  // ================================
  // COLORS
  // ================================
  &--primary {
    &.ae-card--tonal {
      //background: var(--ae-primary-50);
      
      //.ae-card__title { color: var(--sds-color-text-default-primary); }
      //.ae-card__subtitle { color: var(--sds-color-text-default-primary); }
    }
    
    &.ae-card--outlined {
      border-color: var(--ae-primary-200);
    }
  }
  
  &--secondary {
    &.ae-card--tonal {
      //background: var(--ae-secondary-50);
      
      //.ae-card__title { color: var(--ae-secondary-900); }
      //.ae-card__subtitle { color: var(--ae-secondary-600); }
    }
    
    &.ae-card--outlined {
      border-color: var(--ae-secondary-200);
    }
  }
  
  &--accent {
    &.ae-card--tonal {
      //background: var(--ae-accent-50);
      
      //.ae-card__title { color: var(--ae-accent-900); }
      //.ae-card__subtitle { color: var(--ae-accent-600); }
    }
    
    &.ae-card--outlined {
      border-color: var(--ae-accent-200);
    }
  }
  
  // Clickable
  &--clickable {
    cursor: pointer;
  }
}
</style>



