<template>
  <div :class="progressClasses">
    <div class="ae-progress__track">
      <div 
        class="ae-progress__bar"
        :style="barStyle"
        role="progressbar"
        :aria-valuenow="indeterminate ? undefined : value"
        :aria-valuemin="0"
        :aria-valuemax="max"
      >
        <span v-if="showLabel && !indeterminate" class="ae-progress__label">
          {{ labelText }}
        </span>
      </div>
    </div>
    <span v-if="showLabel && labelPosition === 'outside'" class="ae-progress__label-outside">
      {{ labelText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface AeProgressBarProps {
  /** Current progress value (0-100 by default) */
  value?: number
  /** Maximum value */
  max?: number
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Color variant */
  color?: 'primary' | 'success' | 'warning' | 'danger'
  /** Show animated stripes */
  striped?: boolean
  /** Animate the stripes */
  animated?: boolean
  /** Indeterminate loading state */
  indeterminate?: boolean
  /** Show progress label */
  showLabel?: boolean
  /** Label position */
  labelPosition?: 'inside' | 'outside'
  /** Custom label format function */
  formatLabel?: (value: number, max: number) => string
  /** Rounded corners */
  rounded?: boolean
}

const props = withDefaults(defineProps<AeProgressBarProps>(), {
  value: 0,
  max: 100,
  size: 'md',
  color: 'primary',
  striped: false,
  animated: false,
  indeterminate: false,
  showLabel: false,
  labelPosition: 'inside',
  rounded: false,
})

const progressClasses = computed(() => [
  'ae-progress',
  `ae-progress--${props.size}`,
  `ae-progress--${props.color}`,
  {
    'ae-progress--striped': props.striped,
    'ae-progress--animated': props.animated || props.indeterminate,
    'ae-progress--indeterminate': props.indeterminate,
    'ae-progress--rounded': props.rounded,
    'ae-progress--label-outside': props.labelPosition === 'outside',
  },
])

const percentage = computed(() => {
  const clampedValue = Math.min(Math.max(props.value, 0), props.max)
  return (clampedValue / props.max) * 100
})

const barStyle = computed(() => {
  if (props.indeterminate) {
    return {}
  }
  return {
    width: `${percentage.value}%`,
  }
})

const labelText = computed(() => {
  if (props.formatLabel) {
    return props.formatLabel(props.value, props.max)
  }
  return `${Math.round(percentage.value)}%`
})
</script>

<style lang="scss" scoped>
.ae-progress {
  display: flex;
  align-items: center;
  gap: var(--sds-size-space-8);
  width: 100%;

  &__track {
    flex: 1;
    overflow: hidden;
    background: var(--sds-color-border-default-primary);
    border: var(--sds-size-stroke-border) solid var(--sds-color-border-default-primary);
  }

  &__bar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    transition: width var(--pk-duration-300) var(--pk-ease-out);
    position: relative;
  }

  &__label {
    font-size: var(--pk-text-xs);
    font-weight: var(--pk-font-medium);
    color: var(--sds-color-text-brand-primary);
    white-space: nowrap;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }

  &__label-outside {
    font-size: var(--pk-text-sm);
    font-weight: var(--pk-font-medium);
    color: var(--sds-color-text-default-primary);
    min-width: 3em;
    text-align: right;
  }

  // ================================
  // SIZES
  // ================================
  &--sm {
    .ae-progress__track {
      height: 6px;
    }
    .ae-progress__label {
      font-size: 8px;
    }
  }

  &--md {
    .ae-progress__track {
      height: 12px;
    }
  }

  &--lg {
    .ae-progress__track {
      height: 20px;
    }
    .ae-progress__label {
      font-size: var(--pk-text-sm);
    }
  }

  // ================================
  // ROUNDED
  // ================================
  &--rounded {
    .ae-progress__track {
      border-radius: var(--sds-size-radius-full);
    }
    .ae-progress__bar {
      border-radius: var(--sds-size-radius-full);
    }
  }

  // ================================
  // COLORS
  // ================================
  &--primary {
    .ae-progress__bar {
      background: linear-gradient(
        90deg,
        var(--sds-color-background-brand-default) 0%,
        var(--sds-color-brand-mint-green) 100%
      );
    }
  }

  &--success {
    .ae-progress__bar {
      background: linear-gradient(
        90deg,
        var(--sds-color-green-500) 0%,
        var(--sds-color-green-400) 100%
      );
    }
    .ae-progress__label {
      color: var(--sds-color-text-positive-on-positive);
    }
  }

  &--warning {
    .ae-progress__bar {
      background: linear-gradient(
        90deg,
        var(--sds-color-yellow-500) 0%,
        var(--sds-color-yellow-400) 100%
      );
    }
    .ae-progress__label {
      color: var(--sds-color-text-warning-on-warning);
    }
  }

  &--danger {
    .ae-progress__bar {
      background: linear-gradient(
        90deg,
        var(--sds-color-red-600) 0%,
        var(--sds-color-red-400) 100%
      );
    }
    .ae-progress__label {
      color: var(--sds-color-text-danger-on-danger);
    }
  }

  // ================================
  // STRIPED
  // ================================
  &--striped {
    .ae-progress__bar {
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      background-size: 1rem 1rem;
    }

    &.ae-progress--primary .ae-progress__bar {
      background-color: var(--sds-color-background-brand-default);
    }
    &.ae-progress--success .ae-progress__bar {
      background-color: var(--sds-color-green-500);
    }
    &.ae-progress--warning .ae-progress__bar {
      background-color: var(--sds-color-yellow-500);
    }
    &.ae-progress--danger .ae-progress__bar {
      background-color: var(--sds-color-red-600);
    }
  }

  // ================================
  // ANIMATED
  // ================================
  &--animated {
    .ae-progress__bar {
      animation: ae-progress-stripes 1s linear infinite;
    }
  }

  // ================================
  // INDETERMINATE
  // ================================
  &--indeterminate {
    .ae-progress__bar {
      width: 40% !important;
      animation: ae-progress-indeterminate 2.2s ease-in-out infinite;
    }
  }
}

@keyframes ae-progress-stripes {
  from {
    background-position: 1rem 0;
  }
  to {
    background-position: 0 0;
  }
}

@keyframes ae-progress-indeterminate {
  0% {
    left: -90%;
    right: 100%;
  }

  60% {
    left: -90%;
    right: 100%;
  }
  100% {
    left: 100%;
    right: -35%;
  }
}
</style>

