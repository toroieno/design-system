<template>
  <div :class="wrapperClasses" ref="selectRef">
    <label v-if="label" :for="selectId" class="pk-select__label">
      {{ label }}
      <span v-if="required" class="pk-select__required">*</span>
    </label>
    
    <div 
      class="pk-select__container" 
      @click="toggleDropdown"
      @keydown.enter.prevent="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
      @keydown.escape="closeDropdown"
      @keydown.down.prevent="navigateOptions(1)"
      @keydown.up.prevent="navigateOptions(-1)"
      :tabindex="disabled ? -1 : 0"
    >
      <span v-if="$slots.prepend" class="pk-select__prepend">
        <slot name="prepend" />
      </span>
      
      <span :class="['pk-select__value', { 'pk-select__placeholder': !hasSelection }]">
        {{ displayValue }}
      </span>
      
      <span v-if="clearable && hasSelection" class="pk-select__clear" @click.stop="handleClear">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </span>
      
      <span class="pk-select__arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </div>
    
    <Teleport to="body">
      <Transition name="pk-select-dropdown">
        <div 
          v-if="isOpen" 
          ref="dropdownRef"
          class="pk-select__dropdown"
          :style="dropdownStyles"
        >
          <div 
            v-for="(option, index) in normalizedOptions" 
            :key="option.value"
            :class="[
              'pk-select__option',
              { 
                'pk-select__option--selected': isSelected(option),
                'pk-select__option--highlighted': highlightedIndex === index,
                'pk-select__option--disabled': option.disabled
              }
            ]"
            @click="selectOption(option)"
            @mouseenter="highlightedIndex = index"
          >
            <span class="pk-select__option-text">{{ option.label }}</span>
            <svg v-if="isSelected(option)" class="pk-select__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M5 12l5 5L20 7" />
            </svg>
          </div>
          
          <div v-if="normalizedOptions.length === 0" class="pk-select__empty">
            {{ emptyText }}
          </div>
        </div>
      </Transition>
    </Teleport>
    
    <div v-if="hint || errorMessage" class="pk-select__messages">
      <span v-if="errorMessage" class="pk-select__error">{{ errorMessage }}</span>
      <span v-else-if="hint" class="pk-select__hint">{{ hint }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted, nextTick, useId } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface PkSelectProps {
  modelValue?: string | number | null
  options: SelectOption[] | string[] | number[]
  label?: string
  placeholder?: string
  hint?: string
  errorMessage?: string
  disabled?: boolean
  required?: boolean
  clearable?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'outlined' | 'filled' | 'underlined'
  color?: 'primary' | 'secondary' | 'accent'
  emptyText?: string
}

const props = withDefaults(defineProps<PkSelectProps>(), {
  modelValue: null,
  placeholder: 'Select an option',
  size: 'md',
  variant: 'outlined',
  color: 'primary',
  disabled: false,
  required: false,
  clearable: false,
  emptyText: 'No options available',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | null]
  'change': [value: string | number | null]
}>()

const selectId = useId()
const selectRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const highlightedIndex = ref(-1)

// Normalize options to always have { label, value } format
const normalizedOptions = computed<SelectOption[]>(() => {
  return props.options.map((opt) => {
    if (typeof opt === 'object') {
      return opt as SelectOption
    }
    return { label: String(opt), value: opt }
  })
})

const hasSelection = computed(() => props.modelValue !== null && props.modelValue !== undefined && props.modelValue !== '')

const selectedOption = computed(() => {
  if (!hasSelection.value) return null
  return normalizedOptions.value.find((opt) => opt.value === props.modelValue)
})

const displayValue = computed(() => {
  return selectedOption.value?.label || props.placeholder
})

const wrapperClasses = computed(() => [
  'pk-select',
  `pk-select--${props.size}`,
  `pk-select--${props.variant}`,
  `pk-select--${props.color}`,
  {
    'pk-select--open': isOpen.value,
    'pk-select--error': !!props.errorMessage,
    'pk-select--disabled': props.disabled,
    'pk-select--has-value': hasSelection.value,
  },
])

const dropdownStyles = ref<Record<string, string>>({})

const updateDropdownPosition = () => {
  if (!selectRef.value) return
  
  const rect = selectRef.value.querySelector('.pk-select__container')?.getBoundingClientRect()
  if (!rect) return
  
  const spaceBelow = window.innerHeight - rect.bottom
  const spaceAbove = rect.top
  const dropdownHeight = 250 // max height
  
  const showAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow
  
  dropdownStyles.value = {
    position: 'fixed',
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    ...(showAbove
      ? { bottom: `${window.innerHeight - rect.top + 4}px` }
      : { top: `${rect.bottom + 4}px` }),
  }
}

const toggleDropdown = () => {
  if (props.disabled) return
  
  if (isOpen.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

const openDropdown = () => {
  isOpen.value = true
  highlightedIndex.value = normalizedOptions.value.findIndex((opt) => opt.value === props.modelValue)
  nextTick(updateDropdownPosition)
}

const closeDropdown = () => {
  isOpen.value = false
  highlightedIndex.value = -1
}

const selectOption = (option: SelectOption) => {
  if (option.disabled) return
  
  emit('update:modelValue', option.value)
  emit('change', option.value)
  closeDropdown()
}

const handleClear = () => {
  emit('update:modelValue', null)
  emit('change', null)
}

const isSelected = (option: SelectOption) => option.value === props.modelValue

const navigateOptions = (direction: number) => {
  if (!isOpen.value) {
    openDropdown()
    return
  }
  
  const enabledOptions = normalizedOptions.value.filter((opt) => !opt.disabled)
  if (enabledOptions.length === 0) return
  
  let newIndex = highlightedIndex.value + direction
  
  // Wrap around
  if (newIndex < 0) newIndex = normalizedOptions.value.length - 1
  if (newIndex >= normalizedOptions.value.length) newIndex = 0
  
  // Skip disabled options
  while (normalizedOptions.value[newIndex]?.disabled) {
    newIndex += direction
    if (newIndex < 0) newIndex = normalizedOptions.value.length - 1
    if (newIndex >= normalizedOptions.value.length) newIndex = 0
  }
  
  highlightedIndex.value = newIndex
  
  // Select on enter
  if (highlightedIndex.value >= 0) {
    selectOption(normalizedOptions.value[highlightedIndex.value])
  }
}

// Click outside handler
const handleClickOutside = (event: MouseEvent) => {
  if (
    selectRef.value &&
    !selectRef.value.contains(event.target as Node) &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target as Node)
  ) {
    closeDropdown()
  }
}

// Scroll and resize handlers
const handleScrollResize = () => {
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScrollResize, true)
  window.addEventListener('resize', handleScrollResize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScrollResize, true)
  window.removeEventListener('resize', handleScrollResize)
})

watch(isOpen, (open) => {
  if (open) {
    nextTick(updateDropdownPosition)
  }
})
</script>

<style lang="scss" scoped>
.pk-select {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--pk-space-1);
  width: 100%;
  
  // Label
  &__label {
    font-size: var(--pk-text-sm);
    font-weight: var(--pk-font-medium);
    color: var(--pk-neutral-700);
    margin-bottom: var(--pk-space-1);
  }
  
  &__required {
    color: var(--pk-error-500);
    margin-left: 2px;
  }
  
  // Container
  &__container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
    transition: all var(--pk-duration-200) var(--pk-ease-out);
    
    &:focus {
      outline: none;
    }
  }
  
  // Value
  &__value {
    flex: 1;
    font-family: var(--pk-font-family);
    font-size: var(--pk-text-base);
    color: var(--pk-neutral-900);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  &__placeholder {
    color: var(--pk-neutral-400);
  }
  
  // Prepend
  &__prepend {
    display: flex;
    align-items: center;
    color: var(--pk-neutral-500);
    margin-right: var(--pk-space-2);
    
    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  
  // Clear button
  &__clear {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.25rem;
    height: 1.25rem;
    margin-left: var(--pk-space-2);
    color: var(--pk-neutral-400);
    cursor: pointer;
    border-radius: var(--pk-radius-full);
    transition: all var(--pk-duration-150) var(--pk-ease-out);
    
    &:hover {
      color: var(--pk-neutral-600);
      background: var(--pk-neutral-100);
    }
    
    svg {
      width: 0.875rem;
      height: 0.875rem;
    }
  }
  
  // Arrow
  &__arrow {
    display: flex;
    align-items: center;
    margin-left: var(--pk-space-2);
    color: var(--pk-neutral-500);
    transition: transform var(--pk-duration-200) var(--pk-ease-out);
    
    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
  
  &--open &__arrow {
    transform: rotate(180deg);
  }
  
  // Messages
  &__messages {
    min-height: 1.25rem;
    font-size: var(--pk-text-xs);
  }
  
  &__hint {
    color: var(--pk-neutral-500);
  }
  
  &__error {
    color: var(--pk-error-500);
  }
  
  // ================================
  // SIZES
  // ================================
  &--sm {
    .pk-select__container {
      height: var(--pk-input-height-sm);
      padding: 0 var(--pk-space-3);
    }
    
    .pk-select__value {
      font-size: var(--pk-text-sm);
    }
  }
  
  &--md {
    .pk-select__container {
      height: var(--pk-input-height-md);
      padding: 0 var(--pk-space-4);
    }
  }
  
  &--lg {
    .pk-select__container {
      height: var(--pk-input-height-lg);
      padding: 0 var(--pk-space-5);
    }
    
    .pk-select__value {
      font-size: var(--pk-text-lg);
    }
  }
  
  // ================================
  // VARIANT: Outlined
  // ================================
  &--outlined {
    .pk-select__container {
      border: var(--pk-border-width-2) solid var(--pk-neutral-300);
      border-radius: var(--pk-radius-lg);
      background: var(--pk-neutral-0);
    }
    
    &.pk-select--open .pk-select__container,
    .pk-select__container:focus {
      border-color: var(--pk-primary-500);
      box-shadow: 0 0 0 3px var(--pk-primary-100);
    }
    
    &.pk-select--error .pk-select__container {
      border-color: var(--pk-error-500);
    }
    
    &.pk-select--secondary {
      &.pk-select--open .pk-select__container,
      .pk-select__container:focus {
        border-color: var(--pk-secondary-500);
        box-shadow: 0 0 0 3px var(--pk-secondary-100);
      }
    }
    
    &.pk-select--accent {
      &.pk-select--open .pk-select__container,
      .pk-select__container:focus {
        border-color: var(--pk-accent-500);
        box-shadow: 0 0 0 3px var(--pk-accent-100);
      }
    }
  }
  
  // ================================
  // VARIANT: Filled
  // ================================
  &--filled {
    .pk-select__container {
      border: none;
      border-radius: var(--pk-radius-lg) var(--pk-radius-lg) 0 0;
      background: var(--pk-neutral-100);
      border-bottom: 2px solid var(--pk-neutral-400);
    }
    
    &.pk-select--open .pk-select__container {
      background: var(--pk-neutral-50);
      border-bottom-color: var(--pk-primary-500);
    }
    
    &.pk-select--error .pk-select__container {
      border-bottom-color: var(--pk-error-500);
    }
  }
  
  // ================================
  // VARIANT: Underlined
  // ================================
  &--underlined {
    .pk-select__container {
      border: none;
      border-radius: 0;
      background: transparent;
      border-bottom: 2px solid var(--pk-neutral-300);
      padding-left: 0;
      padding-right: 0;
    }
    
    &.pk-select--open .pk-select__container {
      border-bottom-color: var(--pk-primary-500);
    }
    
    &.pk-select--error .pk-select__container {
      border-bottom-color: var(--pk-error-500);
    }
  }
  
  // ================================
  // STATES
  // ================================
  &--disabled {
    opacity: 0.5;
    pointer-events: none;
    
    .pk-select__container {
      background: var(--pk-neutral-100);
      cursor: not-allowed;
    }
  }
}

// ================================
// DROPDOWN (Teleported)
// ================================
.pk-select__dropdown {
  z-index: var(--pk-z-dropdown);
  max-height: 250px;
  overflow-y: auto;
  background: var(--pk-neutral-0);
  border: var(--pk-border-width) solid var(--pk-neutral-200);
  border-radius: var(--pk-radius-lg);
  box-shadow: var(--pk-shadow-lg);
  padding: var(--pk-space-1);
}

.pk-select__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--pk-space-2) var(--pk-space-3);
  border-radius: var(--pk-radius-md);
  cursor: pointer;
  transition: background var(--pk-duration-100) var(--pk-ease-out);
  
  &:hover,
  &--highlighted {
    background: var(--pk-neutral-100);
  }
  
  &--selected {
    background: var(--pk-primary-50);
    color: var(--pk-primary-700);
    
    &:hover,
    &.pk-select__option--highlighted {
      background: var(--pk-primary-100);
    }
  }
  
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      background: transparent;
    }
  }
}

.pk-select__option-text {
  font-size: var(--pk-text-sm);
}

.pk-select__check {
  width: 1rem;
  height: 1rem;
  color: var(--pk-primary-600);
}

.pk-select__empty {
  padding: var(--pk-space-4);
  text-align: center;
  color: var(--pk-neutral-500);
  font-size: var(--pk-text-sm);
}

// Dropdown transition
.pk-select-dropdown-enter-active,
.pk-select-dropdown-leave-active {
  transition: all var(--pk-duration-200) var(--pk-ease-out);
}

.pk-select-dropdown-enter-from,
.pk-select-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>



