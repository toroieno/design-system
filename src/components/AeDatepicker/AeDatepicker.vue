<template>
  <div class="ae-datepicker" :class="datepickerClasses" ref="datepickerRef">
    <!-- Input Trigger -->
    <div 
      class="ae-datepicker__trigger"
      @click="toggleCalendar"
    >
      <AeInput
        :model-value="modelValue"
        type="text"
        class="ae-datepicker__input ae-typo-body-base"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
      >
        <template #append>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10.6667 1.33333V3.99999M5.33333 1.33333V3.99999M2 6.66666H14M3.33333 2.66666H12.6667C13.403 2.66666 14 3.26362 14 3.99999V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V3.99999C2 3.26362 2.59695 2.66666 3.33333 2.66666Z" stroke="var(--sds-color-icon-primary-default)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
      </AeInput>
    </div>

    <!-- Calendar Dropdown -->
    <Teleport to="body">
      <Transition name="ae-datepicker-dropdown">
        <div
          v-if="isOpen"
          class="ae-datepicker__dropdown"
          :style="dropdownStyles"
          ref="dropdownRef"
        >
          <!-- Header -->
          <div class="ae-datepicker__header">
            <button
              type="button"
              class="ae-datepicker__nav-btn"
              @click="prevMonth"
              aria-label="Previous month"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            <div class="ae-datepicker__title">
              <button
                type="button"
                class="ae-datepicker__month-btn ae-typo-single-line-body-base-strong"
                @click="showMonthPicker = !showMonthPicker"
              >
                {{ monthNames[currentMonth] }} {{ currentYear }}
              </button>
            </div>
            
            <button
              type="button"
              class="ae-datepicker__nav-btn"
              @click="nextMonth"
              aria-label="Next month"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <!-- Month/Year Picker -->
          <div v-if="showMonthPicker" class="ae-datepicker__picker">
            <div class="ae-datepicker__months">
              <button
                v-for="(month, index) in monthNames"
                :key="month"
                type="button"
                class="ae-datepicker__month-item"
                :class="{ 'ae-datepicker__month-item--active': index === currentMonth }"
                @click="selectMonth(index)"
              >
                {{ month.slice(0, 3) }}
              </button>
            </div>
            <div class="ae-datepicker__years">
              <button
                type="button"
                class="ae-datepicker__year-nav"
                @click="currentYear -= 10"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <div class="ae-datepicker__year-list">
                <button
                  v-for="year in yearRange"
                  :key="year"
                  type="button"
                  class="ae-datepicker__year-item"
                  :class="{ 'ae-datepicker__year-item--active': year === currentYear }"
                  @click="selectYear(year)"
                >
                  {{ year }}
                </button>
              </div>
              <button
                type="button"
                class="ae-datepicker__year-nav"
                @click="currentYear += 10"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Calendar Grid -->
          <div v-else class="ae-datepicker__calendar">
            <!-- Weekday Headers -->
            <div class="ae-datepicker__weekdays">
              <span 
                v-for="day in weekdayNames" 
                :key="day" 
                class="ae-datepicker__weekday ae-typo-note"
              >
                {{ day }}
              </span>
            </div>

            <!-- Days Grid -->
            <div class="ae-datepicker__days">
              <button
                v-for="day in calendarDays"
                :key="day.key"
                type="button"
                class="ae-datepicker__day"
                :class="{
                  'ae-datepicker__day--other-month': !day.currentMonth,
                  'ae-datepicker__day--today': day.isToday,
                  'ae-datepicker__day--selected': day.isSelected,
                  'ae-datepicker__day--disabled': day.isDisabled
                }"
                :disabled="day.isDisabled"
                @click="selectDate(day.date)"
              >
                {{ day.day }}
              </button>
            </div>
          </div>

          <!-- Footer -->
          <div class="ae-datepicker__footer">
            <button
              type="button"
              class="ae-datepicker__today-btn ae-typo-body-small"
              @click="goToToday"
            >
              Today
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import {AeInput} from "@/components";

export interface AeDatepickerProps {
  modelValue?: Date | null
  placeholder?: string
  format?: string
  disabled?: boolean
  clearable?: boolean
  minDate?: Date | null
  maxDate?: Date | null
  disabledDates?: Date[]
  size?: 'sm' | 'md' | 'lg'
  firstDayOfWeek?: 0 | 1 // 0 = Sunday, 1 = Monday
}

const props = withDefaults(defineProps<AeDatepickerProps>(), {
  modelValue: null,
  placeholder: 'Select date',
  format: 'MM/DD/YYYY',
  disabled: false,
  clearable: true,
  minDate: null,
  maxDate: null,
  disabledDates: () => [],
  size: 'md',
  firstDayOfWeek: 1
})

const emit = defineEmits<{
  'update:modelValue': [value: Date | null]
  'change': [value: Date | null]
}>()

const datepickerRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const showMonthPicker = ref(false)
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const dropdownStyles = ref<Record<string, string>>({})

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const weekdayNames = computed(() => {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  if (props.firstDayOfWeek === 1) {
    return [...days.slice(1), days[0]]
  }
  return days
})

const datepickerClasses = computed(() => [
  `ae-datepicker--${props.size}`,
  {
    'ae-datepicker--disabled': props.disabled,
    'ae-datepicker--open': isOpen.value
  }
])

const displayValue = computed(() => {
  if (!props.modelValue) return ''
  return formatDate(props.modelValue, props.format)
})

const yearRange = computed(() => {
  const start = Math.floor(currentYear.value / 10) * 10
  return Array.from({ length: 10 }, (_, i) => start + i)
})

interface CalendarDay {
  key: string
  day: number
  date: Date
  currentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isDisabled: boolean
}

const calendarDays = computed<CalendarDay[]>(() => {
  const days: CalendarDay[] = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Get the day of the week for the first day
  let startDay = firstDay.getDay()
  if (props.firstDayOfWeek === 1) {
    startDay = startDay === 0 ? 6 : startDay - 1
  }

  // Previous month days
  const prevMonthLastDay = new Date(currentYear.value, currentMonth.value, 0).getDate()
  for (let i = startDay - 1; i >= 0; i--) {
    const date = new Date(currentYear.value, currentMonth.value - 1, prevMonthLastDay - i)
    days.push(createDayObject(date, false, today))
  }

  // Current month days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(currentYear.value, currentMonth.value, i)
    days.push(createDayObject(date, true, today))
  }

  // Next month days
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    const date = new Date(currentYear.value, currentMonth.value + 1, i)
    days.push(createDayObject(date, false, today))
  }

  return days
})

const createDayObject = (date: Date, currentMonth: boolean, today: Date): CalendarDay => {
  const dateOnly = new Date(date)
  dateOnly.setHours(0, 0, 0, 0)
  
  return {
    key: dateOnly.toISOString(),
    day: date.getDate(),
    date: dateOnly,
    currentMonth,
    isToday: dateOnly.getTime() === today.getTime(),
    isSelected: props.modelValue ? isSameDay(dateOnly, props.modelValue) : false,
    isDisabled: isDateDisabled(dateOnly)
  }
}

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

const isDateDisabled = (date: Date): boolean => {
  if (props.minDate && date < props.minDate) return true
  if (props.maxDate && date > props.maxDate) return true
  return props.disabledDates.some(d => isSameDay(d, date))
}

const formatDate = (date: Date, format: string): string => {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()
  
  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year)
}

const updateDropdownPosition = () => {
  if (!datepickerRef.value) return
  
  const rect = datepickerRef.value.getBoundingClientRect()
  const dropdownHeight = 340
  const spaceBelow = window.innerHeight - rect.bottom
  const showAbove = spaceBelow < dropdownHeight && rect.top > dropdownHeight

  dropdownStyles.value = {
    position: 'fixed',
    left: `${rect.left}px`,
    top: showAbove ? `${rect.top - dropdownHeight - 4}px` : `${rect.bottom + 4}px`,
    minWidth: `${Math.max(rect.width, 280)}px`,
    zIndex: '9999'
  }
}

const toggleCalendar = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  showMonthPicker.value = false
  
  if (isOpen.value) {
    if (props.modelValue) {
      currentMonth.value = props.modelValue.getMonth()
      currentYear.value = props.modelValue.getFullYear()
    }
    nextTick(updateDropdownPosition)
  }
}

const closeCalendar = () => {
  isOpen.value = false
  showMonthPicker.value = false
}

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const selectMonth = (month: number) => {
  currentMonth.value = month
  showMonthPicker.value = false
}

const selectYear = (year: number) => {
  currentYear.value = year
  showMonthPicker.value = false
}

const selectDate = (date: Date) => {
  emit('update:modelValue', date)
  emit('change', date)
  closeCalendar()
}

const clearDate = () => {
  emit('update:modelValue', null)
  emit('change', null)
}

const goToToday = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  currentMonth.value = today.getMonth()
  currentYear.value = today.getFullYear()
  selectDate(today)
}

const handleClickOutside = (event: MouseEvent) => {
  if (
    datepickerRef.value &&
    !datepickerRef.value.contains(event.target as Node) &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target as Node)
  ) {
    closeCalendar()
  }
}

const handleScroll = () => {
  if (isOpen.value) {
    updateDropdownPosition()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll, true)
  window.addEventListener('resize', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll, true)
  window.removeEventListener('resize', handleScroll)
})

// Sync calendar view with modelValue
watch(() => props.modelValue, (newVal) => {
  if (newVal && isOpen.value) {
    currentMonth.value = newVal.getMonth()
    currentYear.value = newVal.getFullYear()
  }
})
</script>

<style lang="scss" scoped>
.ae-datepicker {
  position: relative;
  display: inline-flex;
  width: 100%;

  &__trigger {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
  }

  &__input {
    width: 100%;
    padding: var(--sds-size-space-10) var(--sds-size-space-12);
    border-radius: var(--sds-size-radius-50);
    background: var(--sds-color-background-default-primary);
    color: var(--sds-color-text-primary-default);
    cursor: pointer;
    outline: none;
    transition: border-color var(--ae-duration-100) var(--ae-ease-out);

    &::placeholder {
      color: var(--sds-color-text-primary-tertiary);
    }

    &:hover:not(:disabled) {
      border-color: var(--sds-color-border-default-teriary);
    }

    &:focus {
      border-color: var(--sds-color-border-brand-green);
    }

    &:disabled {
      background: var(--sds-color-background-default-secondary);
      cursor: not-allowed;
    }
  }

  &__icon {
    position: absolute;
    right: var(--sds-size-space-12);
    display: flex;
    align-items: center;
    color: var(--sds-color-text-primary-tertiary);
    pointer-events: none;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  &__clear {
    position: absolute;
    right: var(--sds-size-space-36);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--sds-size-space-4);
    border: none;
    background: transparent;
    color: var(--sds-color-text-primary-tertiary);
    cursor: pointer;
    border-radius: var(--sds-size-radius-50);
    transition: all var(--ae-duration-100) var(--ae-ease-out);

    svg {
      width: 1rem;
      height: 1rem;
    }

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
      color: var(--sds-color-text-primary-default);
    }
  }

  // Dropdown
  &__dropdown {
    background: var(--sds-color-background-surface-default);
    border: 1px solid var(--sds-color-border-default-secondary);
    border-radius: var(--sds-size-radius-100);
    box-shadow: var(--sds-shadow-overlay);
    overflow: hidden;
  }

  // Header
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--sds-size-space-12);
    border-bottom: 1px solid var(--sds-color-border-default-secondary);
  }

  &__nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--sds-color-text-primary-secondary);
    cursor: pointer;
    border-radius: var(--sds-size-radius-50);
    transition: all var(--ae-duration-100) var(--ae-ease-out);

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
      color: var(--sds-color-text-primary-default);
    }
  }

  &__title {
    flex: 1;
    text-align: center;
  }

  &__month-btn {
    padding: var(--sds-size-space-4) var(--sds-size-space-8);
    border: none;
    background: transparent;
    color: var(--sds-color-text-primary-default);
    cursor: pointer;
    border-radius: var(--sds-size-radius-50);
    transition: background var(--ae-duration-100) var(--ae-ease-out);

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
    }
  }

  // Month/Year Picker
  &__picker {
    padding: var(--sds-size-space-12);
  }

  &__months {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--sds-size-space-4);
    margin-bottom: var(--sds-size-space-12);
  }

  &__month-item {
    padding: var(--sds-size-space-8);
    border: none;
    background: transparent;
    color: var(--sds-color-text-primary-secondary);
    cursor: pointer;
    border-radius: var(--sds-size-radius-50);
    font-size: 0.875rem;
    transition: all var(--ae-duration-100) var(--ae-ease-out);

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
      color: var(--sds-color-text-primary-default);
    }

    &--active {
      background: var(--sds-color-background-brand-default);
      color: var(--sds-color-text-brand-primary);
    }
  }

  &__years {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-8);
  }

  &__year-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--sds-color-text-primary-tertiary);
    cursor: pointer;
    border-radius: var(--sds-size-radius-50);

    svg {
      width: 1rem;
      height: 1rem;
    }

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
      color: var(--sds-color-text-primary-default);
    }
  }

  &__year-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--sds-size-space-4);
    flex: 1;
  }

  &__year-item {
    padding: var(--sds-size-space-4) var(--sds-size-space-8);
    border: none;
    background: transparent;
    color: var(--sds-color-text-primary-secondary);
    cursor: pointer;
    border-radius: var(--sds-size-radius-50);
    font-size: 0.75rem;
    transition: all var(--ae-duration-100) var(--ae-ease-out);

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
      color: var(--sds-color-text-primary-default);
    }

    &--active {
      background: var(--sds-color-background-brand-default);
      color: var(--sds-color-text-brand-primary);
    }
  }

  // Calendar
  &__calendar {
    padding: var(--sds-size-space-12);
  }

  &__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: var(--sds-size-space-8);
  }

  &__weekday {
    text-align: center;
    color: var(--sds-color-text-primary-tertiary);
    padding: var(--sds-size-space-4);
  }

  &__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: var(--sds-size-space-2);
  }

  &__day {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--sds-color-text-primary-default);
    cursor: pointer;
    border-radius: var(--sds-size-radius-50);
    font-size: 0.875rem;
    transition: all var(--ae-duration-100) var(--ae-ease-out);

    &:hover:not(:disabled):not(&--selected) {
      background: var(--sds-color-background-default-primary-hover);
    }

    &--other-month {
      color: var(--sds-color-text-primary-tertiary);
    }

    &--today {
      border: 1px solid var(--sds-color-border-brand-green);
    }

    &--selected {
      background: var(--sds-color-background-brand-default);
      color: var(--sds-color-text-brand-primary);
    }

    &--disabled {
      color: var(--sds-color-text-default-disabled);
      cursor: not-allowed;
    }
  }

  // Footer
  &__footer {
    display: flex;
    justify-content: center;
    padding: var(--sds-size-space-8) var(--sds-size-space-12);
    border-top: 1px solid var(--sds-color-border-default-secondary);
  }

  &__today-btn {
    padding: var(--sds-size-space-4) var(--sds-size-space-12);
    border: none;
    background: transparent;
    color: var(--sds-color-text-brand-secondary);
    cursor: pointer;
    border-radius: var(--sds-size-radius-50);
    transition: background var(--ae-duration-100) var(--ae-ease-out);

    &:hover {
      background: var(--sds-color-background-brand-secondary-hover);
    }
  }

  // ================================
  // SIZES
  // ================================
  &--sm {
    .ae-datepicker__input {
      padding: var(--sds-size-space-6) var(--sds-size-space-10);
    }

    .ae-datepicker__icon svg {
      width: 1rem;
      height: 1rem;
    }
  }

  &--lg {
    .ae-datepicker__input {
      padding: var(--sds-size-space-12) var(--sds-size-space-16);
      font-size: 1rem;
    }

    .ae-datepicker__icon svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  // ================================
  // STATES
  // ================================
  &--disabled {
    .ae-datepicker__trigger {
      cursor: not-allowed;
    }

    .ae-datepicker__icon {
      color: var(--sds-color-text-default-disabled);
    }
  }

  &--open {
    .ae-datepicker__input {
      border-color: var(--sds-color-border-brand-green);
    }
  }
}

// Transition
.ae-datepicker-dropdown-enter-active,
.ae-datepicker-dropdown-leave-active {
  transition: all var(--ae-duration-150) var(--ae-ease-out);
}

.ae-datepicker-dropdown-enter-from,
.ae-datepicker-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
