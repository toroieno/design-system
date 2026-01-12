<template>
  <div 
    class="ae-slider" 
    :class="sliderClasses"
    ref="sliderRef"
  >
    <div class="ae-slider__wrapper">
      <!-- Track -->
      <div 
        class="ae-slider__track"
        @click="handleTrackClick"
      >
        <!-- Progress/Range Fill -->
        <div 
          class="ae-slider__range"
          :style="rangeStyle"
        />
        
        <!-- Marks -->
        <div v-if="marks && Object.keys(marks).length > 0" class="ae-slider__marks">
          <div
            v-for="(label, value) in marks"
            :key="value"
            class="ae-slider__mark"
            :style="getMarkStyle(Number(value))"
          >
            <span class="ae-slider__mark-dot" />
            <span v-if="label" class="ae-slider__mark-label ae-typo-note">{{ label }}</span>
          </div>
        </div>
      </div>

      <!-- Handles -->
      <div
        v-if="range"
        :class="['ae-slider__handle', { 'ae-slider__handle--active': isDraggingStart }]"
        :style="{ insetInlineStart: startHandlePosition }"
        @mousedown="startDrag($event, 'start')"
        @touchstart="startDrag($event, 'start')"
        tabindex="0"
        role="slider"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="internalValue[0]"
        :aria-disabled="disabled"
        @keydown="handleKeyDown($event, 'start')"
      >
        <component
          :is="PointIcon"
          :style="{
            position: 'absolute',
            top: '50%',
            insetInlineStart: '50%',
            transform: 'translate(-50%, -50%)',
          }"
        />
        <div v-if="showTooltip" class="ae-slider__tooltip ae-typo-note">
          {{ formatTooltip(internalValue[0]) }}
        </div>
      </div>

      <div
        class="ae-slider__handle"
        :style="{ insetInlineStart: range ? endHandlePosition : startHandlePosition }"
        :class="{ 'ae-slider__handle--active': range ? isDraggingEnd : isDragging }"
        @mousedown="startDrag($event, range ? 'end' : 'single')"
        @touchstart="startDrag($event, range ? 'end' : 'single')"
        tabindex="0"
        role="slider"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="range ? internalValue[1] : internalValue"
        :aria-disabled="disabled"
        @keydown="handleKeyDown($event, range ? 'end' : 'single')"
      >
        <component
          :is="PointIcon"
          :style="{
            position: 'absolute',
            top: '50%',
            insetInlineStart: '50%',
            transform: 'translate(-50%, -50%)',
          }"
        />
        <div v-if="showTooltip" class="ae-slider__tooltip ae-typo-note">
          {{ formatTooltip(range ? internalValue[1] : internalValue) }}
        </div>
      </div>
    </div>

    <!-- Labels -->
    <div v-if="showLabels" class="ae-slider__labels">
      <span class="ae-slider__label ae-typo-note">{{ formatLabel(min) }}</span>
      <span class="ae-slider__label ae-typo-note">{{ formatLabel(max) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted, h } from 'vue'

export interface AeSliderProps {
  /** Current value or range */
  modelValue?: number | [number, number]
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Enable range mode */
  range?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Show tooltip on handle */
  showTooltip?: boolean
  /** Show min/max labels */
  showLabels?: boolean
  /** Marks on the slider */
  marks?: Record<number, string>
  /** Format tooltip value */
  formatTooltip?: (value: number) => string
  /** Format label value */
  formatLabel?: (value: number) => string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<AeSliderProps>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1,
  range: false,
  disabled: false,
  showTooltip: true,
  showLabels: false,
  marks: undefined,
  formatTooltip: (value: number) => String(value),
  formatLabel: (value: number) => String(value),
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: number | [number, number]]
  'change': [value: number | [number, number]]
}>()

const PointIcon = h('svg', {xmlns:"http://www.w3.org/2000/svg", width: 17, height: 22, viewBox: '0 0 17 22', fill: 'none'}, [
  h('path', {d: "M8.03686 2L1.00464 11L8.03686 20L15.0691 11L8.03686 2Z", fill: "#E6E6E6", stoke: 'white', strokeOpacity: '0.4'})
])

const sliderRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const isDraggingStart = ref(false)
const isDraggingEnd = ref(false)
const activeHandle = ref<'start' | 'end' | 'single' | null>(null)

// Internal value
const internalValue = ref<number | [number, number]>(
  props.range ? [props.min, props.max] : props.min
)

// Update internal value when modelValue changes
watch(() => props.modelValue, (newValue) => {
  if (props.range) {
    if (Array.isArray(newValue)) {
      internalValue.value = [...newValue]
    }
  } else {
    internalValue.value = typeof newValue === 'number' ? newValue : props.min
  }
}, { immediate: true })

// Computed classes
const sliderClasses = computed(() => [
  `ae-slider--${props.size}`,
  {
    'ae-slider--disabled': props.disabled,
    'ae-slider--dragging': isDragging.value || isDraggingStart.value || isDraggingEnd.value
  }
])

// Calculate handle positions
const startHandlePosition = computed(() => {
  if (props.range && Array.isArray(internalValue.value)) {
    return `${getPercentage(internalValue.value[0])}%`
  }
  return `${getPercentage(internalValue.value as number)}%`
})

const endHandlePosition = computed(() => {
  if (props.range && Array.isArray(internalValue.value)) {
    return `${getPercentage(internalValue.value[1])}%`
  }
  return '0%'
})

// Calculate range fill style
const rangeStyle = computed(() => {
  if (props.range && Array.isArray(internalValue.value)) {
    const start = getPercentage(internalValue.value[0])
    const end = getPercentage(internalValue.value[1])
    return {
      insetInlineStart: `${start}%`,
      width: `${end - start}%`
    }
  }
  return {
    insetInlineStart: '0%',
    width: `${getPercentage(internalValue.value as number)}%`
  }
})

// Get percentage from value
const getPercentage = (value: number): number => {
  return ((value - props.min) / (props.max - props.min)) * 100
}

// Get value from percentage
const getValueFromPercentage = (percentage: number): number => {
  let value = props.min + (percentage / 100) * (props.max - props.min)
  
  // Round to step
  if (props.step) {
    value = Math.round(value / props.step) * props.step
  }
  
  // Clamp to min/max
  return Math.max(props.min, Math.min(props.max, value))
}

// Get percentage from mouse/touch position
const getPercentageFromEvent = (event: MouseEvent | TouchEvent): number => {
  if (!sliderRef.value) return 0
  
  const rect = sliderRef.value.getBoundingClientRect()
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const percentage = ((clientX - rect.left) / rect.width) * 100
  
  return Math.max(0, Math.min(100, percentage))
}

// Handle track click
const handleTrackClick = (event: MouseEvent) => {
  if (props.disabled) return
  
  const percentage = getPercentageFromEvent(event)
  const value = getValueFromPercentage(percentage)
  
  if (props.range && Array.isArray(internalValue.value)) {
    const [start, end] = internalValue.value
    const distToStart = Math.abs(value - start)
    const distToEnd = Math.abs(value - end)
    
    // Update the closest handle
    if (distToStart < distToEnd) {
      updateValue([value, end])
    } else {
      updateValue([start, value])
    }
  } else {
    updateValue(value)
  }
}

// Start dragging
const startDrag = (event: MouseEvent | TouchEvent, handle: 'start' | 'end' | 'single') => {
  if (props.disabled) return
  
  event.preventDefault()
  activeHandle.value = handle
  
  if (handle === 'start') {
    isDraggingStart.value = true
  } else if (handle === 'end') {
    isDraggingEnd.value = true
  } else {
    isDragging.value = true
  }
  
  document.addEventListener('mousemove', handleDrag)
  document.addEventListener('mouseup', stopDrag)
  document.addEventListener('touchmove', handleDrag)
  document.addEventListener('touchend', stopDrag)
}

// Handle dragging
const handleDrag = (event: MouseEvent | TouchEvent) => {
  if (!activeHandle.value) return
  
  const percentage = getPercentageFromEvent(event)
  const value = getValueFromPercentage(percentage)
  
  if (props.range && Array.isArray(internalValue.value)) {
    const [start, end] = internalValue.value
    
    if (activeHandle.value === 'start') {
      // Don't allow start to go past end
      updateValue([Math.min(value, end), end])
    } else if (activeHandle.value === 'end') {
      // Don't allow end to go before start
      updateValue([start, Math.max(value, start)])
    }
  } else {
    updateValue(value)
  }
}

// Stop dragging
const stopDrag = () => {
  isDragging.value = false
  isDraggingStart.value = false
  isDraggingEnd.value = false
  activeHandle.value = null
  
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', handleDrag)
  document.removeEventListener('touchend', stopDrag)
  
  // Emit change event when dragging stops
  emit('change', internalValue.value)
}

// Handle keyboard navigation
const handleKeyDown = (event: KeyboardEvent, handle: 'start' | 'end' | 'single') => {
  if (props.disabled) return
  
  let delta = 0
  
  switch (event.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      delta = props.step
      event.preventDefault()
      break
    case 'ArrowLeft':
    case 'ArrowDown':
      delta = -props.step
      event.preventDefault()
      break
    case 'PageUp':
      delta = props.step * 10
      event.preventDefault()
      break
    case 'PageDown':
      delta = -props.step * 10
      event.preventDefault()
      break
    case 'Home':
      if (props.range && Array.isArray(internalValue.value)) {
        if (handle === 'start') {
          updateValue([props.min, internalValue.value[1]])
        } else {
          updateValue([internalValue.value[0], props.min])
        }
      } else {
        updateValue(props.min)
      }
      event.preventDefault()
      return
    case 'End':
      if (props.range && Array.isArray(internalValue.value)) {
        if (handle === 'start') {
          updateValue([props.max, internalValue.value[1]])
        } else {
          updateValue([internalValue.value[0], props.max])
        }
      } else {
        updateValue(props.max)
      }
      event.preventDefault()
      return
  }
  
  if (delta !== 0) {
    if (props.range && Array.isArray(internalValue.value)) {
      const [start, end] = internalValue.value
      
      if (handle === 'start') {
        const newStart = Math.max(props.min, Math.min(end, start + delta))
        updateValue([newStart, end])
      } else if (handle === 'end') {
        const newEnd = Math.min(props.max, Math.max(start, end + delta))
        updateValue([start, newEnd])
      }
    } else {
      const current = internalValue.value as number
      const newValue = Math.max(props.min, Math.min(props.max, current + delta))
      updateValue(newValue)
    }
    
    emit('change', internalValue.value)
  }
}

// Update value
const updateValue = (value: number | [number, number]) => {
  internalValue.value = value
  emit('update:modelValue', value)
}

// Get mark style
const getMarkStyle = (value: number) => {
  return {
    insetInlineStart: `${getPercentage(value)}%`
  }
}

// Cleanup on unmount
onUnmounted(() => {
  document.removeEventListener('mousemove', handleDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchmove', handleDrag)
  document.removeEventListener('touchend', stopDrag)
})
</script>

<style lang="scss" scoped>
$width-track: 2px;
$height-track: 10px;

.ae-slider {
  position: relative;
  width: 100%;
  padding: var(--sds-size-space-8) 0;
  user-select: none;

  &__wrapper {
    position: relative;
    width: 100%;
  }

  &__track {
    position: relative;
    width: 100%;
    height: 2px;
    background: var(--sds-color-border-default-teriary);
    border-radius: var(--sds-size-radius-50);
    cursor: pointer;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      inset-inline-start: 0;
      transform: translateY(-50%);
      width: $width-track;
      height: $height-track;
      background: inherit;
    }
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      inset-inline-end: 0;
      transform: translateY(-50%);
      width: $width-track;
      height: $height-track;
      background: inherit;
    }
  }

  &__range {
    position: absolute;
    height: 100%;
    background: var(--sds-color-border-brand-default);
    border-radius: var(--sds-size-radius-50);
    transition: all 0.1s ease;
  }

  &__handle {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 18px;
    cursor: grab;
    transition: all 0.15s ease;
    z-index: 2;

    &-point {
      position: absolute;
      top: 50%;
      inset-inline-start: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover,
    &:focus {
      transform: translate(-50%, -50%) scale(1.15);
      outline: none;
    }

    &--active {
      cursor: grabbing;
      transform: translate(-50%, -50%) scale(1.2);
    }
  }

  &__tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    inset-inline-start: 50%;
    transform: translateX(-50%);
    padding: var(--sds-size-space-4) var(--sds-size-space-8);
    background: var(--sds-color-background-surface-tertiary);
    border: 1px solid var(--sds-color-border-default-secondary);
    border-radius: var(--sds-size-radius-50);
    white-space: nowrap;
    color: var(--sds-color-text-primary-default);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s ease;

    &::after {
      content: '';
      position: absolute;
      top: 100%;
      inset-inline-start: 50%;
      transform: translateX(-50%);
      border: 4px solid transparent;
      border-top-color: var(--sds-color-border-default-secondary);
    }
  }

  &__handle:hover &__tooltip,
  &__handle:focus &__tooltip,
  &__handle--active &__tooltip {
    opacity: 1;
  }

  &__marks {
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  &__mark {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &__mark-dot {
    display: block;
    width: $width-track;
    height: $height-track;
    background: var(--sds-color-border-default-teriary);
  }

  &__mark-label {
    position: absolute;
    top: calc(100% + 8px);
    inset-inline-start: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    color: var(--sds-color-text-primary-secondary);
  }

  &__labels {
    display: flex;
    justify-content: space-between;
    margin-top: var(--sds-size-space-8);
    color: var(--sds-color-text-primary-secondary);
  }

  // ================================
  // SIZES
  // ================================
  &--sm {
    .ae-slider__track {
      height: 3px;
    }

    .ae-slider__handle {
      width: 14px;
      height: 14px;
    }
  }

  &--lg {
    .ae-slider__track {
      height: 6px;
    }

    .ae-slider__handle {
      width: 20px;
      height: 20px;
    }
  }

  // ================================
  // STATES
  // ================================
  &--disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;

    .ae-slider__track,
    .ae-slider__handle {
      cursor: not-allowed;
    }
  }

  &--dragging {
    .ae-slider__handle {
      transition: none;
    }

    .ae-slider__range {
      transition: none;
    }
  }
}
</style>
