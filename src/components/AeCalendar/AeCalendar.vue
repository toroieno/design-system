<template>
  <div class="ae-calendar" :class="calendarClasses">
    <div class="ae-calendar-body">
      <div class="ae-calendar-body__start">
        <!-- Header with Month/Year Dropdowns -->
        <div class="ae-calendar__header">
          <div class="ae-calendar__nav">
            <button
              type="button"
              class="ae-calendar__nav-btn"
              @click="prevMonth"
              aria-label="Previous month"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="var(--sds-color-icon-primary-default)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <div class="ae-calendar__date-selectors">
            <AeDropdown
              :items="monthOptions"
              :trigger-text="monthNames[currentMonth]"
              trigger="click"
              placement="bottom-start"
              :max-height="300"
            >
              <template #trigger>
                <button type="button" class="ae-calendar__selector-btn ae-typo-note">
                  {{ monthNames[currentMonth].slice(0, 3) }}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </template>
            </AeDropdown>

            <AeDropdown
              :items="yearOptions"
              :trigger-text="currentYear.toString()"
              trigger="click"
              placement="bottom-start"
              :max-height="300"
            >
              <template #trigger>
                <button type="button" class="ae-calendar__selector-btn ae-typo-note">
                  {{ currentYear }}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </template>
            </AeDropdown>
          </div>

          <div class="ae-calendar__nav">
            <button
              type="button"
              class="ae-calendar__nav-btn"
              @click="nextMonth"
              aria-label="Next month"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="var(--sds-color-icon-primary-default)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Calendar Grid -->
        <div class="ae-calendar__calendar">
          <!-- Weekday Headers -->
          <div class="ae-calendar__weekdays">
            <span
              v-for="day in weekdayNames"
              :key="day"
              class="ae-calendar__weekday ae-typo-note"
            >
              {{ day }}
            </span>
          </div>

          <!-- Days Grid -->
          <div class="ae-calendar__days">
            <button
              v-for="day in calendarDays"
              :key="day.key"
              type="button"
              class="ae-calendar__day ae-typo-note"
              :class="{
            'ae-calendar__day--other-month': !day.currentMonth,
            'ae-calendar__day--today': day.isToday,
            'ae-calendar__day--selected': day.isSelected,
            'ae-calendar__day--disabled': day.isDisabled,
            'ae-calendar__day--range-start': day.isRangeStart,
            'ae-calendar__day--range-end': day.isRangeEnd,
            'ae-calendar__day--in-range': day.isInRange,
            'ae-calendar__day--in-hover-range': day.isInHoverRange
          }"
              :disabled="day.isDisabled"
              @click="selectDate(day.date)"
              @mouseenter="handleDayHover(day.date)"
              @mouseleave="handleDayHover(null)"
            >
              {{ day.day }}
            </button>
          </div>
        </div>
      </div>
      <!-- Quick Date Selection -->
      <div v-if="showQuickSelect" class="ae-calendar__quick-select">
        <div class="ae-calendar__quick-select-buttons">
          <button
            v-for="preset in quickSelectPresets"
            :key="preset.key"
            type="button"
            class="ae-calendar__quick-btn ae-typo-single-line-body-small-strong"
            @click="applyQuickSelect(preset)"
          >
            {{ preset.label }}
          </button>
        </div>
      </div>
    </div>
    <div class="ae-calendar-footer">
      <!-- Time Picker (if enabled) -->
      <div v-if="showTimePicker" class="ae-calendar__time-picker">
        <div class="ae-calendar__time-label ae-typo-note">Time</div>
        <div class="ae-calendar__time-inputs">
          <div class="ae-calendar__time-group">
            <label class="ae-calendar__time-label-small">Hour</label>
            <input
              v-model.number="selectedHour"
              type="number"
              min="0"
              max="23"
              class="ae-calendar__time-input"
              @change="updateTime"
            />
          </div>
          <span class="ae-calendar__time-separator">:</span>
          <div class="ae-calendar__time-group">
            <label class="ae-calendar__time-label-small">Minute</label>
            <input
              v-model.number="selectedMinute"
              type="number"
              min="0"
              max="59"
              class="ae-calendar__time-input"
              @change="updateTime"
            />
          </div>
          <div v-if="use12HourFormat" class="ae-calendar__time-group">
            <label class="ae-calendar__time-label-small">Period</label>
            <AeDropdown
              :items="periodOptions"
              :trigger-text="selectedPeriod"
              trigger="click"
              placement="bottom-start"
            >
              <template #trigger>
                <button type="button" class="ae-calendar__period-btn">
                  {{ selectedPeriod }}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </template>
            </AeDropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { AeDropdown } from '@/components'

export interface QuickSelectPreset {
  key: string
  label: string
  getDate: () => Date
  getDateRange?: () => DateRangeValue
}

export type DateRangeValue = { start: Date | null; end: Date | null }

export interface AeCalendarProps {
  /** Selected date (for single mode) or date range (for range mode) */
  modelValue?: Date | DateRangeValue | null
  /** Selection mode: single date or date range */
  mode?: 'single' | 'range'
  /** Show quick date selection */
  showQuickSelect?: boolean
  /** Show time picker */
  showTimePicker?: boolean
  /** Use 12-hour format for time */
  use12HourFormat?: boolean
  /** Minimum selectable date */
  minDate?: Date | null
  /** Maximum selectable date */
  maxDate?: Date | null
  /** Disabled dates */
  disabledDates?: Date[]
  /** First day of week (0 = Sunday, 1 = Monday) */
  firstDayOfWeek?: 0 | 1
  /** Custom quick select presets */
  quickSelectPresets?: QuickSelectPreset[]
}

const props = withDefaults(defineProps<AeCalendarProps>(), {
  modelValue: null,
  mode: 'single',
  showQuickSelect: true,
  showTimePicker: false,
  use12HourFormat: false,
  minDate: null,
  maxDate: null,
  disabledDates: () => [],
  firstDayOfWeek: 1,
  quickSelectPresets: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: Date | DateRangeValue | null]
  'change': [value: Date | DateRangeValue | null]
}>()

const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const selectedHour = ref(0)
const selectedMinute = ref(0)
const selectedPeriod = ref<'AM' | 'PM'>('AM')
const hoverDate = ref<Date | null>(null)
const rangeStart = ref<Date | null>(null)

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

const calendarClasses = computed(() => [
  {
    'ae-calendar--with-time': props.showTimePicker,
    'ae-calendar--range': props.mode === 'range'
  }
])

// Month options for dropdown
const monthOptions = computed(() => {
  return monthNames.map((month, index) => ({
    key: index.toString(),
    label: month,
    onClick: () => {
      currentMonth.value = index
    }
  }))
})

// Year options for dropdown
const yearOptions = computed(() => {
  const current = new Date().getFullYear()
  const startYear = current - 50
  const endYear = current + 50
  const years: { key: string; label: string; onClick: () => void }[] = []
  
  for (let year = startYear; year <= endYear; year++) {
    years.push({
      key: year.toString(),
      label: year.toString(),
      onClick: () => {
        currentYear.value = year
      }
    })
  }
  
  return years
})

// Default quick select presets
const defaultQuickSelectPresets: QuickSelectPreset[] = [
  {
    key: 'today',
    label: 'Today',
    getDate: () => {
      const date = new Date()
      date.setHours(0, 0, 0, 0)
      return date
    },
    getDateRange: () => {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return { start: today, end: today }
    }
  },
  {
    key: 'yesterday',
    label: 'Yesterday',
    getDate: () => {
      const date = new Date()
      date.setDate(date.getDate() - 1)
      date.setHours(0, 0, 0, 0)
      return date
    },
    getDateRange: () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      yesterday.setHours(0, 0, 0, 0)
      return { start: yesterday, end: yesterday }
    }
  },
  {
    key: 'last7days',
    label: 'Last 7 days',
    getDate: () => {
      const date = new Date()
      date.setDate(date.getDate() - 7)
      date.setHours(0, 0, 0, 0)
      return date
    },
    getDateRange: () => {
      const end = new Date()
      end.setHours(0, 0, 0, 0)
      const start = new Date()
      start.setDate(start.getDate() - 6)
      start.setHours(0, 0, 0, 0)
      return { start, end }
    }
  },
  {
    key: 'last30days',
    label: 'Last 30 days',
    getDate: () => {
      const date = new Date()
      date.setDate(date.getDate() - 30)
      date.setHours(0, 0, 0, 0)
      return date
    },
    getDateRange: () => {
      const end = new Date()
      end.setHours(0, 0, 0, 0)
      const start = new Date()
      start.setDate(start.getDate() - 29)
      start.setHours(0, 0, 0, 0)
      return { start, end }
    }
  },
  {
    key: 'thisMonth',
    label: 'This month',
    getDate: () => {
      const date = new Date()
      date.setDate(1)
      date.setHours(0, 0, 0, 0)
      return date
    },
    getDateRange: () => {
      const start = new Date()
      start.setDate(1)
      start.setHours(0, 0, 0, 0)
      const end = new Date()
      end.setHours(0, 0, 0, 0)
      return { start, end }
    }
  },
  {
    key: 'lastMonth',
    label: 'Last month',
    getDate: () => {
      const date = new Date()
      date.setMonth(date.getMonth() - 1)
      date.setDate(1)
      date.setHours(0, 0, 0, 0)
      return date
    },
    getDateRange: () => {
      const start = new Date()
      start.setMonth(start.getMonth() - 1)
      start.setDate(1)
      start.setHours(0, 0, 0, 0)
      const end = new Date(start.getFullYear(), start.getMonth() + 1, 0)
      end.setHours(0, 0, 0, 0)
      return { start, end }
    }
  }
]

const quickSelectPresets = computed(() => {
  return props.quickSelectPresets || defaultQuickSelectPresets
})

// Period options for 12-hour format
const periodOptions = computed(() => [
  {
    key: 'AM',
    label: 'AM',
    onClick: () => {
      selectedPeriod.value = 'AM'
      updateTime()
    }
  },
  {
    key: 'PM',
    label: 'PM',
    onClick: () => {
      selectedPeriod.value = 'PM'
      updateTime()
    }
  }
])

interface CalendarDay {
  key: string
  day: number
  date: Date
  currentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isDisabled: boolean
  isRangeStart: boolean
  isRangeEnd: boolean
  isInRange: boolean
  isInHoverRange: boolean
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
  
  const dayObj: CalendarDay = {
    key: dateOnly.toISOString(),
    day: date.getDate(),
    date: dateOnly,
    currentMonth,
    isToday: dateOnly.getTime() === today.getTime(),
    isSelected: false,
    isDisabled: isDateDisabled(dateOnly),
    isRangeStart: false,
    isRangeEnd: false,
    isInRange: false,
    isInHoverRange: false
  }

  if (props.mode === 'single') {
    dayObj.isSelected = props.modelValue instanceof Date ? isSameDay(dateOnly, props.modelValue) : false
  } else if (props.mode === 'range') {
    const range = props.modelValue as DateRangeValue | null
    if (range?.start) {
      dayObj.isRangeStart = isSameDay(dateOnly, range.start)
      dayObj.isSelected = dayObj.isRangeStart
    }
    if (range?.end) {
      dayObj.isRangeEnd = isSameDay(dateOnly, range.end)
      dayObj.isSelected = dayObj.isSelected || dayObj.isRangeEnd
    }
    if (range?.start && range?.end) {
      const time = dateOnly.getTime()
      dayObj.isInRange = time > range.start.getTime() && time < range.end.getTime()
    }
    
    // Hover range preview
    if (rangeStart.value && hoverDate.value && !range?.end) {
      const start = rangeStart.value.getTime()
      const hover = hoverDate.value.getTime()
      const time = dateOnly.getTime()
      if (start < hover) {
        dayObj.isInHoverRange = time > start && time < hover
      } else {
        dayObj.isInHoverRange = time < start && time > hover
      }
    }
  }
  
  return dayObj
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

const applyQuickSelect = (preset: QuickSelectPreset) => {
  if (props.mode === 'range' && preset.getDateRange) {
    const range = preset.getDateRange()
    emit('update:modelValue', range)
    emit('change', range)
    rangeStart.value = null
  } else {
    const date = preset.getDate()
    selectDate(date)
  }
}

const selectDate = (date: Date) => {
  if (props.mode === 'range') {
    selectRangeDate(date)
  } else {
    selectSingleDate(date)
  }
}

const selectSingleDate = (date: Date) => {
  const newDate = new Date(date)
  
  // Preserve time if time picker is enabled and we have a previous selection
  if (props.showTimePicker && props.modelValue instanceof Date) {
    newDate.setHours(props.modelValue.getHours())
    newDate.setMinutes(props.modelValue.getMinutes())
  } else if (props.showTimePicker) {
    // Set to current time or default
    newDate.setHours(selectedHour.value)
    newDate.setMinutes(selectedMinute.value)
  } else {
    // Just date, no time
    newDate.setHours(0, 0, 0, 0)
  }
  
  emit('update:modelValue', newDate)
  emit('change', newDate)
}

const selectRangeDate = (date: Date) => {
  const newDate = new Date(date)
  newDate.setHours(0, 0, 0, 0)
  
  const currentRange = props.modelValue as DateRangeValue | null
  
  // If no start date or both dates are selected, start new range
  if (!rangeStart.value || (currentRange?.start && currentRange?.end)) {
    rangeStart.value = newDate
    emit('update:modelValue', { start: newDate, end: null })
    emit('change', { start: newDate, end: null })
  } else {
    // Set end date
    const start = rangeStart.value
    const end = newDate
    
    // Ensure start is before end
    if (start.getTime() <= end.getTime()) {
      emit('update:modelValue', { start, end })
      emit('change', { start, end })
    } else {
      emit('update:modelValue', { start: end, end: start })
      emit('change', { start: end, end: start })
    }
    
    rangeStart.value = null
  }
}

const handleDayHover = (date: Date | null) => {
  if (props.mode === 'range' && rangeStart.value) {
    hoverDate.value = date
  }
}

const updateTime = () => {
  if (!props.modelValue) return
  
  const newDate = new Date(props.modelValue)
  let hour = selectedHour.value
  
  if (props.use12HourFormat) {
    if (selectedPeriod.value === 'PM' && hour !== 12) {
      hour += 12
    } else if (selectedPeriod.value === 'AM' && hour === 12) {
      hour = 0
    }
  }
  
  newDate.setHours(hour)
  newDate.setMinutes(selectedMinute.value)
  newDate.setSeconds(0)
  newDate.setMilliseconds(0)
  
  emit('update:modelValue', newDate)
  emit('change', newDate)
}

// Sync calendar view with modelValue
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    if (props.mode === 'single' && newVal instanceof Date) {
      currentMonth.value = newVal.getMonth()
      currentYear.value = newVal.getFullYear()
      
      if (props.showTimePicker) {
        let hour = newVal.getHours()
        if (props.use12HourFormat) {
          if (hour === 0) {
            selectedPeriod.value = 'AM'
            selectedHour.value = 12
          } else if (hour === 12) {
            selectedPeriod.value = 'PM'
            selectedHour.value = 12
          } else if (hour > 12) {
            selectedPeriod.value = 'PM'
            selectedHour.value = hour - 12
          } else {
            selectedPeriod.value = 'AM'
            selectedHour.value = hour
          }
        } else {
          selectedHour.value = hour
        }
        selectedMinute.value = newVal.getMinutes()
      }
    } else if (props.mode === 'range') {
      const range = newVal as DateRangeValue
      if (range.start) {
        currentMonth.value = range.start.getMonth()
        currentYear.value = range.start.getFullYear()
        rangeStart.value = range.end ? null : range.start
      }
    }
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
.ae-calendar {
  display: flex;
  flex-direction: column;
  border-radius: var(--sds-size-radius-50);
  border: 1px solid var(--sds-color-border-default-secondary);
  background: var(--sds-color-background-surface-tertiary);
  overflow: hidden;
  width: fit-content;

  // Body
  &-body {
    display: flex;
    &__start {
      display: flex;
      flex-direction: column;
      padding: var(--sds-size-space-16);
      gap: 12px;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 24px;
  }

  &__nav {
    display: flex;
    align-items: center;
  }

  &__nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
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

  &__date-selectors {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-8);
  }

  &__selector-btn {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-4);
    padding: var(--sds-size-space-4) var(--sds-size-space-8);
    border-radius: var(--sds-size-radius-100);
    border: var(--sds-size-stroke-border) solid var(--sds-color-border-default-primary);
    background: var(--sds-color-background-opacity-100);
    color: var(--sds-color-text-primary-default);
    cursor: pointer;
    transition: background var(--ae-duration-100) var(--ae-ease-out);
    text-transform: uppercase;

    svg {
      width: 14px;
      height: 14px;
      transition: transform var(--ae-duration-100) var(--ae-ease-out);
    }
  }

  // Quick Select
  &__quick-select {
    padding: var(--sds-size-space-16) var(--sds-size-space-12);
    border-inline-start: 1px solid var(--sds-color-border-default-primary);
    display: flex;
    align-items: flex-end;
  }

  &__quick-select-buttons {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: var(--sds-size-space-4);
  }

  &__quick-btn {
    width: 114px;
    padding: var(--sds-size-space-6) var(--sds-size-space-8);
    background: transparent;
    color: var(--sds-color-text-primary-default);
    cursor: pointer;
    border-radius: var(--sds-size-radius-50);
    transition: all var(--ae-duration-100) var(--ae-ease-out);
    text-align: start;

    &:hover {
      background: var(--sds-color-background-opacity-100);
    }
  }

  // Calendar
  &__calendar {
  }

  &__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  &__weekday {
    --size-weekday: 35px;
    text-align: center;
    color: var(--sds-color-text-primary-default);
    text-transform: uppercase;
    height: var(--size-weekday);
    line-height: var(--size-weekday);
  }

  &__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  &__day {
    --size-day: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--size-day);
    height: var(--size-day);
    padding: 0;
    background: transparent;
    color: var(--sds-color-text-primary-default);
    cursor: pointer;
    border-radius: var(--sds-size-radius-50);
    transition: all var(--ae-duration-100) var(--ae-ease-out);
    border: 1px solid var(--sds-color-border-default-primary);

    + .ae-calendar__day:not(:nth-child(7n+1)) {
      border-inline-start: none;
    }
    &:nth-child(n + 8) {
      border-top: none;
    }

    &:hover:not(:disabled):not(&--selected) {
      background: var(--sds-color-background-default-primary-hover);
    }

    &--other-month {
      color: var(--sds-color-text-neutral-default);
    }

    &--today {
      border: 1px solid var(--sds-color-border-brand-green) !important;
    }

    &--selected {
      background: var(--sds-color-background-brand-default);
      color: var(--sds-color-text-brand-primary);
    }

    &--disabled {
      color: var(--sds-color-text-default-disabled);
      cursor: not-allowed;
    }

    &--range-start,
    &--range-end {
      background: var(--sds-color-background-brand-default);
      color: var(--sds-color-text-brand-primary);
      position: relative;
      z-index: 2;
    }

    &--in-range {
      background: var(--sds-color-background-brand-secondary);
      color: var(--sds-color-text-primary-default);
      border-radius: 0;
    }

    &--in-hover-range {
      background: var(--sds-color-background-default-secondary);
    }

    &--range-start:not(&--range-end) {
      border-radius: var(--sds-size-radius-50) 0 0 var(--sds-size-radius-50);
    }

    &--range-end:not(&--range-start) {
      border-radius: 0 var(--sds-size-radius-50) var(--sds-size-radius-50) 0;
    }
  }

  // Range mode specific styles
  &--range {
    .ae-calendar__day {
      border-radius: 0;
      
      &:hover:not(:disabled):not(.ae-calendar__day--selected):not(.ae-calendar__day--range-start):not(.ae-calendar__day--range-end) {
        background: var(--sds-color-background-default-primary-hover);
        border-radius: var(--sds-size-radius-50);
      }
      
      &--range-start,
      &--range-end {
        border-radius: var(--sds-size-radius-50);
      }
    }
  }

  // Time Picker
  &__time-picker {
    padding: var(--sds-size-space-12);
    border-top: 1px solid var(--sds-color-border-default-secondary);
    background: var(--sds-color-background-default-secondary);
  }

  &__time-label {
    margin-bottom: var(--sds-size-space-8);
    color: var(--sds-color-text-primary-tertiary);
  }

  &__time-inputs {
    display: flex;
    align-items: flex-end;
    gap: var(--sds-size-space-8);
  }

  &__time-group {
    display: flex;
    flex-direction: column;
    gap: var(--sds-size-space-4);
  }

  &__time-label-small {
    font-size: 0.75rem;
    color: var(--sds-color-text-primary-tertiary);
  }

  &__time-input {
    width: 60px;
    padding: var(--sds-size-space-6) var(--sds-size-space-8);
    border: 1px solid var(--sds-color-border-default-secondary);
    background: var(--sds-color-background-surface-default);
    color: var(--sds-color-text-primary-default);
    border-radius: var(--sds-size-radius-50);
    font-size: 0.875rem;
    text-align: center;
    transition: border-color var(--ae-duration-100) var(--ae-ease-out);

    &:focus {
      outline: none;
      border-color: var(--sds-color-border-brand-green);
    }
  }

  &__time-separator {
    font-size: 1.25rem;
    color: var(--sds-color-text-primary-secondary);
    margin-bottom: var(--sds-size-space-4);
  }

  &__period-btn {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-4);
    padding: var(--sds-size-space-6) var(--sds-size-space-8);
    border: 1px solid var(--sds-color-border-default-secondary);
    background: var(--sds-color-background-surface-default);
    color: var(--sds-color-text-primary-default);
    cursor: pointer;
    border-radius: var(--sds-size-radius-50);
    font-size: 0.875rem;
    transition: all var(--ae-duration-100) var(--ae-ease-out);

    svg {
      width: 12px;
      height: 12px;
    }

    &:hover {
      border-color: var(--sds-color-border-default-teriary);
      background: var(--sds-color-background-default-primary-hover);
    }
  }
}
</style>
