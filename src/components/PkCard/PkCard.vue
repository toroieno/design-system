<template>
  <component :is="tag" :class="cardClasses">
    <div v-if="$slots.header || title" class="pk-card__header">
      <slot name="header">
        <h3 v-if="title" class="pk-card__title">{{ title }}</h3>
        <p v-if="subtitle" class="pk-card__subtitle">{{ subtitle }}</p>
      </slot>
    </div>
    
    <div v-if="$slots.media" class="pk-card__media">
      <slot name="media" />
    </div>
    
    <div v-if="$slots.default" class="pk-card__content">
      <slot />
    </div>
    
    <div v-if="$slots.actions" class="pk-card__actions">
      <slot name="actions" />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface PkCardProps {
  tag?: string
  title?: string
  subtitle?: string
  variant?: 'elevated' | 'outlined' | 'flat' | 'tonal'
  color?: 'default' | 'primary' | 'secondary' | 'accent'
  hover?: boolean
  clickable?: boolean
}

const props = withDefaults(defineProps<PkCardProps>(), {
  tag: 'div',
  variant: 'elevated',
  color: 'default',
  hover: false,
  clickable: false,
})

const cardClasses = computed(() => [
  'pk-card',
  `pk-card--${props.variant}`,
  `pk-card--${props.color}`,
  {
    'pk-card--hover': props.hover,
    'pk-card--clickable': props.clickable,
  },
])
</script>

<style lang="scss" scoped>
.pk-card {
  display: flex;
  flex-direction: column;
  border-radius: var(--pk-radius-xl);
  overflow: hidden;
  transition: all var(--pk-duration-200) var(--pk-ease-out);
  
  // Header
  &__header {
    padding: var(--pk-space-5) var(--pk-space-5) var(--pk-space-3);
  }
  
  &__title {
    font-size: var(--pk-text-xl);
    font-weight: var(--pk-font-semibold);
    color: var(--pk-neutral-900);
    line-height: var(--pk-leading-tight);
  }
  
  &__subtitle {
    font-size: var(--pk-text-sm);
    color: var(--pk-neutral-500);
    margin-top: var(--pk-space-1);
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
    padding: var(--pk-space-5);
    flex: 1;
    
    &:first-child {
      padding-top: var(--pk-space-5);
    }
  }
  
  &__header + &__content {
    padding-top: 0;
  }
  
  // Actions
  &__actions {
    display: flex;
    align-items: center;
    gap: var(--pk-space-2);
    padding: var(--pk-space-3) var(--pk-space-5) var(--pk-space-5);
  }
  
  // ================================
  // VARIANTS
  // ================================
  &--elevated {
    background: var(--pk-neutral-0);
    box-shadow: var(--pk-shadow-md);
    
    &.pk-card--hover:hover,
    &.pk-card--clickable:hover {
      box-shadow: var(--pk-shadow-xl);
      transform: translateY(-2px);
    }
  }
  
  &--outlined {
    background: var(--pk-neutral-0);
    border: var(--pk-border-width-2) solid var(--pk-neutral-200);
    
    &.pk-card--hover:hover,
    &.pk-card--clickable:hover {
      border-color: var(--pk-neutral-300);
      box-shadow: var(--pk-shadow-sm);
    }
  }
  
  &--flat {
    background: var(--pk-neutral-0);
  }
  
  &--tonal {
    background: var(--pk-neutral-50);
  }
  
  // ================================
  // COLORS
  // ================================
  &--primary {
    &.pk-card--tonal {
      background: var(--pk-primary-50);
      
      .pk-card__title { color: var(--pk-primary-900); }
      .pk-card__subtitle { color: var(--pk-primary-600); }
    }
    
    &.pk-card--outlined {
      border-color: var(--pk-primary-200);
    }
  }
  
  &--secondary {
    &.pk-card--tonal {
      background: var(--pk-secondary-50);
      
      .pk-card__title { color: var(--pk-secondary-900); }
      .pk-card__subtitle { color: var(--pk-secondary-600); }
    }
    
    &.pk-card--outlined {
      border-color: var(--pk-secondary-200);
    }
  }
  
  &--accent {
    &.pk-card--tonal {
      background: var(--pk-accent-50);
      
      .pk-card__title { color: var(--pk-accent-900); }
      .pk-card__subtitle { color: var(--pk-accent-600); }
    }
    
    &.pk-card--outlined {
      border-color: var(--pk-accent-200);
    }
  }
  
  // Clickable
  &--clickable {
    cursor: pointer;
  }
}
</style>



