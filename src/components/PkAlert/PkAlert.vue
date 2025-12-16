<template>
  <Transition name="pk-alert">
    <div v-if="isVisible" :class="alertClasses" role="alert">
      <div class="pk-alert__icon">
        <slot name="icon">
          <svg v-if="type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="M22 4L12 14.01l-3-3" />
          </svg>
          <svg v-else-if="type === 'warning'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <svg v-else-if="type === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </slot>
      </div>
      
      <div class="pk-alert__content">
        <div v-if="title" class="pk-alert__title">{{ title }}</div>
        <div v-if="$slots.default || text" class="pk-alert__text">
          <slot>{{ text }}</slot>
        </div>
      </div>
      
      <button v-if="closable" class="pk-alert__close" @click="handleClose" aria-label="Close alert">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

export interface PkAlertProps {
  type?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  text?: string
  variant?: 'filled' | 'outlined' | 'tonal'
  closable?: boolean
  modelValue?: boolean
}

const props = withDefaults(defineProps<PkAlertProps>(), {
  type: 'info',
  variant: 'tonal',
  closable: false,
  modelValue: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

const isVisible = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  isVisible.value = val
})

const alertClasses = computed(() => [
  'pk-alert',
  `pk-alert--${props.type}`,
  `pk-alert--${props.variant}`,
])

const handleClose = () => {
  isVisible.value = false
  emit('update:modelValue', false)
  emit('close')
}
</script>

<style lang="scss" scoped>
.pk-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--pk-space-3);
  padding: var(--pk-space-4);
  border-radius: var(--pk-radius-lg);
  
  // Icon
  &__icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  
  // Content
  &__content {
    flex: 1;
    min-width: 0;
  }
  
  &__title {
    font-weight: var(--pk-font-semibold);
    font-size: var(--pk-text-sm);
    line-height: var(--pk-leading-snug);
  }
  
  &__text {
    font-size: var(--pk-text-sm);
    line-height: var(--pk-leading-relaxed);
    margin-top: var(--pk-space-1);
    opacity: 0.9;
  }
  
  &__title + &__text {
    margin-top: var(--pk-space-1);
  }
  
  // Close button
  &__close {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    margin: -0.25rem;
    border-radius: var(--pk-radius-md);
    opacity: 0.7;
    transition: all var(--pk-duration-150) var(--pk-ease-out);
    
    &:hover {
      opacity: 1;
      background: rgba(0, 0, 0, 0.1);
    }
    
    svg {
      width: 1rem;
      height: 1rem;
    }
  }
  
  // ================================
  // VARIANT: Tonal
  // ================================
  &--tonal {
    &.pk-alert--info {
      background: var(--pk-info-50);
      color: var(--pk-info-800);
      
      .pk-alert__icon { color: var(--pk-info-600); }
    }
    
    &.pk-alert--success {
      background: var(--pk-success-50);
      color: var(--pk-success-800);
      
      .pk-alert__icon { color: var(--pk-success-600); }
    }
    
    &.pk-alert--warning {
      background: var(--pk-warning-50);
      color: var(--pk-warning-900);
      
      .pk-alert__icon { color: var(--pk-warning-600); }
    }
    
    &.pk-alert--error {
      background: var(--pk-error-50);
      color: var(--pk-error-800);
      
      .pk-alert__icon { color: var(--pk-error-600); }
    }
  }
  
  // ================================
  // VARIANT: Filled
  // ================================
  &--filled {
    color: white;
    
    &.pk-alert--info {
      background: var(--pk-info-500);
    }
    
    &.pk-alert--success {
      background: var(--pk-success-500);
    }
    
    &.pk-alert--warning {
      background: var(--pk-warning-500);
      color: var(--pk-neutral-900);
    }
    
    &.pk-alert--error {
      background: var(--pk-error-500);
    }
  }
  
  // ================================
  // VARIANT: Outlined
  // ================================
  &--outlined {
    background: var(--pk-neutral-0);
    border: var(--pk-border-width-2) solid;
    
    &.pk-alert--info {
      border-color: var(--pk-info-300);
      color: var(--pk-info-800);
      
      .pk-alert__icon { color: var(--pk-info-600); }
    }
    
    &.pk-alert--success {
      border-color: var(--pk-success-300);
      color: var(--pk-success-800);
      
      .pk-alert__icon { color: var(--pk-success-600); }
    }
    
    &.pk-alert--warning {
      border-color: var(--pk-warning-300);
      color: var(--pk-warning-900);
      
      .pk-alert__icon { color: var(--pk-warning-600); }
    }
    
    &.pk-alert--error {
      border-color: var(--pk-error-300);
      color: var(--pk-error-800);
      
      .pk-alert__icon { color: var(--pk-error-600); }
    }
  }
}

// Alert transition
.pk-alert-enter-active,
.pk-alert-leave-active {
  transition: all var(--pk-duration-300) var(--pk-ease-out);
}

.pk-alert-enter-from,
.pk-alert-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>



