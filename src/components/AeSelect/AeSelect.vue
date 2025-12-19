<template>
  <div :class="wrapperClasses" ref="selectRef">
    <label v-if="label" :for="selectId" class="ae-select__label ae-typo-single-line-body-small-strong">
      {{ label }}
      <span v-if="required" class="ae-select__required">*</span>
    </label>

    <div
      class="ae-select__container"
      @click="toggleDropdown"
      @keydown.enter.prevent="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
      @keydown.escape="closeDropdown"
      @keydown.down.prevent="navigateOptions(1)"
      @keydown.up.prevent="navigateOptions(-1)"
      :tabindex="disabled ? -1 : 0"
    >
      <span v-if="$slots.prepend" class="ae-select__prepend">
        <slot name="prepend"/>
      </span>
      
      <div :class="['ae-select__value ae-typo-body-base', { 'ae-select__placeholder': !hasSelection }]">
        <div class="ae-select__value-items" v-if="props.multiple && hasSelection">
          <div v-for="(item, index) in selectedOption" :key="index" class="ae-select__value-item ae-typo-single-line-body-small-strong">
            <span>{{item.label}}</span>
            <svg v-if="clearable" @click="handleClear(item.label)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div v-else v-html="displayValue"></div>
      </div>

      <span v-if="clearable && hasSelection" class="ae-select__clear" @click.stop="handleClear">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                stroke-linejoin="round"/>
        </svg>
      </span>

      <span class="ae-select__arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </span>
    </div>

    <Teleport to="body">
      <Transition name="ae-select-dropdown">
        <div
          v-if="isOpen"
          ref="dropdownRef"
          class="ae-select__dropdown"
          :style="dropdownStyles"
        >
          <div
            v-for="(option, index) in normalizedOptions"
            :key="option.value"
            :class="[
              'ae-select__option',
              {
                'ae-select__option--selected': isSelected(option),
                'ae-select__option--disabled': option.disabled
              }
            ]"
            @click="selectOption(option)"
            @mouseenter="highlightedIndex = index"
          >
            <AeRadio v-if="!props.multiple" :model-value="modelValue" :value="option.value" :label="option.label"
                     style="pointer-events: none"/>
            <AeCheckbox v-else :model-value="isSelected(option)" :value="option.value" :label="option.label"
                        style="pointer-events: none"/>
          </div>

          <div v-if="normalizedOptions.length === 0" class="ae-select__empty ae-typo-single-line-body-small-strong">
            {{ emptyText }}
          </div>
        </div>
      </Transition>
    </Teleport>

    <div v-if="hint || errorMessage" class="ae-select__messages ae-typo-note">
      <span v-if="errorMessage" class="ae-select__error">{{ errorMessage }}</span>
      <span v-else-if="hint" class="ae-select__hint">{{ hint }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, watch, onMounted, onUnmounted, nextTick, useId} from 'vue'
import {AeCheckbox, AeRadio} from "@/components";

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

type ModelValueType = string | number | null

export interface AeSelectProps {
  modelValue?: ModelValueType | ModelValueType[]
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
  color?: 'primary'
  emptyText?: string
  multiple?: boolean
}

const props = withDefaults(defineProps<AeSelectProps>(), {
  modelValue: null,
  placeholder: 'Select an option',
  size: 'md',
  variant: 'outlined',
  color: 'primary',
  disabled: false,
  required: false,
  clearable: false,
  emptyText: 'No options available',
  multiple: false
})

const emit = defineEmits<{
  'update:modelValue': [value: ModelValueType | ModelValueType[]]
  'change': [value: ModelValueType | ModelValueType[]]
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
    return {label: String(opt), value: opt}
  })
})

const hasSelection = computed(() => props.modelValue !== null && props.modelValue !== undefined && props.modelValue !== '' && !(Array.isArray(props.modelValue) && props.modelValue.length === 0))

const selectedOption = computed(() => {
  if (!hasSelection.value) return null
  return normalizedOptions.value.filter((opt) => props.multiple ? props.modelValue?.includes(opt.value) : opt.value === props.modelValue)
})

const displayValue = computed(() => {
  let htmlValue: string | undefined = ``
  if (props.multiple) {
    htmlValue = selectedOption.value?.map(item => item.label).join(', ')
  } else {
    htmlValue = selectedOption.value?.[0]?.label
  }
  return htmlValue || props.placeholder
})

const wrapperClasses = computed(() => [
  'ae-select',
  `ae-select--${props.size}`,
  `ae-select--${props.variant}`,
  `ae-select--${props.color}`,
  {
    'ae-select--open': isOpen.value,
    'ae-select--error': !!props.errorMessage,
    'ae-select--disabled': props.disabled,
    'ae-select--has-value': hasSelection.value,
  },
])

const dropdownStyles = ref<Record<string, string>>({})

const updateDropdownPosition = () => {
  if (!selectRef.value) return

  const rect = selectRef.value.querySelector('.ae-select__container')?.getBoundingClientRect()
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
      ? {bottom: `${window.innerHeight - rect.top + 4}px`}
      : {top: `${rect.bottom + 4}px`}),
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

  let newOptionValue: ModelValueType | ModelValueType[] = option.value
  if (props.multiple) {
    newOptionValue = Array.isArray(props.modelValue)
      ? props.modelValue.includes(option.value)
        ? props.modelValue.filter((value) => value !== option.value)
        : [...props.modelValue, option.value]
      : props.modelValue === option.value ? null : [props.modelValue, option.value]
  }
  emit('update:modelValue', newOptionValue)
  emit('change', newOptionValue)
  if (!props.multiple) closeDropdown()
}

const handleClear = (item?: string) => {
  let newOptionValue: ModelValueType | ModelValueType[] = null

  if (item) {
    newOptionValue = props.modelValue?.filter(value => value !== item)
  }

  emit('update:modelValue', newOptionValue)
  emit('change', newOptionValue)
}

const isSelected = (option: SelectOption) => {
  return props.multiple ? props.modelValue?.includes(option.value) : option.value === props.modelValue
}

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
.ae-select {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-8);
  width: 100%;

  // Label
  &__label {
    color: var(--sds-color-text-default-primary);
  }

  &__required {
    color: var(--sds-color-border-danger-default);
    margin-inline-start: 2px;
  }

  // Container
  &__container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
    transition: all var(--ae-duration-200) var(--ae-ease-out);

    &:focus {
      outline: none;
    }
  }

  // Value
  &__value {
    flex: 1;
    color: var(--sds-color-text-default-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .ae-select__value-item {
      display: flex;
      padding: var(--sds-size-space-6);
      justify-content: center;
      align-items: center;
      gap: var(--sds-size-space-4);
      border-radius: var(--sds-size-radius-100);
      background: var(--sds-color-background-surface-default);
      width: fit-content;
      min-width: fit-content;
      color: var(--sds-color-text-default-primary);
      &s{
        display: flex;
        gap: var(--sds-size-space-4);
        overflow-x: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }

  &__placeholder {
    color: var(--sds-color-text-tertiary-default);
  }

  // Prepend
  &__prepend {
    display: flex;
    align-items: center;
    color: var(--ae-neutral-500);
    margin-right: var(--ae-space-2);

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
    margin-left: var(--ae-space-2);
    color: #FFFFFF;
    cursor: pointer;
    border-radius: var(--ae-radius-full);
    transition: all var(--ae-duration-150) var(--ae-ease-out);

    &:hover {
      color: var(--ae-neutral-600);
      background: var(--ae-neutral-100);
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
    margin-inline-start: var(--ae-space-2);
    color: #FFFFFF;
    transition: transform var(--ae-duration-200) var(--ae-ease-out);

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
  }

  &__hint {
    color: var(--sds-color-text-tertiary-default);
  }

  &__error {
    color: var(--sds-color-text-danger-default);
  }

  // ================================
  // SIZES
  // ================================
  &--sm {
    .ae-select__container {
      padding: var(--sds-size-space-8);
    }
  }

  &--md {
    .ae-select__container {
      padding: var(--sds-size-space-12);
    }
  }

  &--lg {
    .ae-select__container {
      padding: var(--sds-size-space-16);
    }
  }

  // ================================
  // VARIANT: Outlined
  // ================================
  &--outlined {
    .ae-select__container {
      border-radius: var(--sds-size-radius-50);
      border: var(--sds-size-stroke-border) solid var(--sds-color-border-default-primary);
      background: var(--sds-color-background-opacity-100);
    }

    &.ae-select--open .ae-select__container,
    .ae-select__container:focus {
      border-color: var(--sds-color-border-default-teriary);
    }

    &.ae-select--error .ae-select__container {
      border-color: var(--sds-color-border-danger-default);
    }
  }

  // ================================
  // VARIANT: Filled
  // ================================
  &--filled {
    .ae-select__container {
      border: var(--sds-size-stroke-border) solid transparent;
      border-radius: var(--sds-size-radius-50) var(--sds-size-radius-50) 0 0;
      background: var(--sds-color-background-disabled-default);
    }

    &.ae-select--open .ae-select__container {
      background: var(--sds-color-background-disabled-default);
    }

    &.ae-select--error .ae-select__container {
      border-color: var(--sds-color-border-danger-default);
    }
  }

  // ================================
  // VARIANT: Underlined
  // ================================
  &--underlined {
    .ae-select__container {
      border: none;
      background: transparent;
      border-bottom: var(--sds-size-stroke-border) solid var(--sds-color-border-default-primary);
      padding-left: 0;
      padding-right: 0;
    }

    &.ae-select--open .ae-select__container {
      border-bottom-color: var(--sds-color-border-default-teriary);
    }

    &.ae-select--error .ae-select__container {
      border-bottom-color: var(--sds-color-border-danger-default);
    }
  }

  // ================================
  // STATES
  // ================================
  &--disabled {
    opacity: 0.5;
    pointer-events: none;

    .ae-select__container {
      background: var(--ae-neutral-100);
      cursor: not-allowed;
    }
  }
}

// ================================
// DROPDOWN (Teleported)
// ================================
.ae-select__dropdown {
  z-index: var(--ae-z-dropdown);
  max-height: 250px;
  overflow-y: auto;
  background: var(--sds-color-background-surface-tertiary);
  border: 1px solid var(--sds-color-border-default-secondary);
  padding: var(--sds-size-space-12) var(--sds-size-space-16);
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-12);
}

.ae-select__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--sds-size-radius-50);
  cursor: pointer;
  transition: background var(--ae-duration-100) var(--ae-ease-out);

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background: transparent;
    }
  }
}

.ae-select__empty {
  padding: var(--sds-size-space-4);
  text-align: center;
  color: var(--sds-color-text-default-primary);
}

// Dropdown transition
.ae-select-dropdown-enter-active,
.ae-select-dropdown-leave-active {
  transition: all var(--ae-duration-200) var(--ae-ease-out);
}

.ae-select-dropdown-enter-from,
.ae-select-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>



