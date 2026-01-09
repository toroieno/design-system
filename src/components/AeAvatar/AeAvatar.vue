<template>
  <div class="ae-avatar">
    <div :class="avatarClasses" :style="avatarStyle">
      <img
        v-if="src && !imageError"
        :src="src"
        :alt="alt"
        class="ae-avatar__image"
        @error="handleImageError"
      />
      <span v-else-if="initials" class="ae-avatar__initials ae-typo-single-line-body-base">
        {{ computedInitials }}
      </span>
      <span v-else class="ae-avatar__fallback">
        <slot name="fallback">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </slot>
      </span>
    </div>

    <span v-if="status" :class="['ae-avatar__status', `ae-avatar__status--${status}`]" />

    <span v-if="badge || $slots.badge" class="ae-avatar__badge ae-typo-note">
      <slot name="badge">{{ badge }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

export interface AeAvatarProps {
  src?: string
  alt?: string
  initials?: string
  size?: 'sm' | 'md' | 'lg' | number
  shape?: 'circle' | 'square' | 'rounded'
  status?: 'online' | 'offline' | 'busy' | 'away'
  badge?: string | number
  color?: string
  bgColor?: string
}

const props = withDefaults(defineProps<AeAvatarProps>(), {
  alt: 'Avatar',
  size: 'md',
  shape: 'circle'
})

const SIZE_CONTAINER = {
  'sm': '24px',
  'md': '32px',
  'lg': '40px'
}

const imageError = ref(false)

const avatarClasses = computed(() => [
  'ae-avatar-container',
  `ae-avatar--${props.size}`,
  `ae-avatar--${props.shape}`,
  {
    'ae-avatar--has-status': !!props.status,
    'ae-avatar--has-badge': !!props.badge
  }
])

const avatarStyle = computed(() => {
  const styles: Record<string, string> = {}
  if (props.color) {
    styles.color = props.color
  }
  if (props.bgColor) {
    styles.backgroundColor = props.bgColor
  }
  const size = typeof props.size === 'number' ? `${props.size}px` : SIZE_CONTAINER[props.size]
  styles.width = size
  styles.height = size
  return styles
})

const computedInitials = computed(() => {
  if (!props.initials) return ''
  
  // If initials provided directly, use first 2 characters
  const words = props.initials.trim().split(/\s+/)
  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase()
  }
  return props.initials.slice(0, 2).toUpperCase()
})

const handleImageError = () => {
  imageError.value = true
}
</script>

<style lang="scss" scoped>
.ae-avatar {
  position: relative;
  display: inline-flex;

  &-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    background: var(--sds-color-background-brand-secondary);
    color: var(--sds-color-text-primary-default);
    user-select: none;
  }

  // Image
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  // Initials
  &__initials {
    text-transform: uppercase;
    line-height: 1;
    color: var(--sds-color-text-brand-on-brand);
  }
  
  // Fallback icon
  &__fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 60%;
    color: var(--sds-color-text-tertiary-default);
    
    svg {
      width: 100%;
      height: 100%;
    }
  }
  
  // Status indicator
  &__status {
    position: absolute;
    bottom: -4px;
    inset-inline-end: -4px;
    //border: 1px solid var(--sds-color-background-surface-tertiary);
    border-radius: var(--sds-size-radius-full);
    
    &--online {
      background: var(--sds-color-background-brand-default);
    }
    
    &--offline {
      background: var(--sds-color-background-disabled-default);
    }
    
    &--busy {
      background: var(--sds-color-background-danger-default);
    }
    
    &--away {
      background: var(--sds-color-background-warning-default);
    }
  }
  
  // Badge
  &__badge {
    z-index: 99;
    position: absolute;
    top: -4px;
    inset-inline-end: -4px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 1.25rem;
    height: 1.25rem;
    padding: 0 var(--sds-size-space-4);
    border-radius: var(--sds-size-radius-full);
    background: var(--sds-color-background-brand-default);
    color: var(--sds-color-text-brand-primary);
  }
  
  // ================================
  // SIZES
  // ================================
  &--sm {
    .ae-avatar__initials {
      font-size: 0.625rem;
    }
    
    +.ae-avatar__status {
      width: 0.5rem;
      height: 0.5rem;
      bottom: 0;
      right: 0;
    }
    
    +.ae-avatar__badge {
      min-width: 1rem;
      height: 1rem;
    }
  }
  
  &--md {
    .ae-avatar__initials {
      font-size: 0.875rem;
    }
    
    +.ae-avatar__status {
      width: 0.625rem;
      height: 0.625rem;
      bottom: 1px;
      right: 1px;
    }
  }
  
  &--lg {
    .ae-avatar__initials {
      font-size: 1rem;
    }
    
    +.ae-avatar__status {
      width: 0.75rem;
      height: 0.75rem;
      bottom: 1px;
      right: 1px;
    }
  }
  // ================================
  // SHAPES
  // ================================
  &--circle {
    border-radius: var(--sds-size-radius-full);
  }

  &--square {
    border-radius: 0;
  }

  &--rounded {
    border-radius: var(--sds-size-radius-100);
  }
}
</style>
