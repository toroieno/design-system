<template>
  <div class="calendar-examples">
    <h1 class="ae-typo-heading-100">Calendar Component</h1>
    <p class="ae-typo-body-base description">
      A flexible calendar component with single and range date selection modes.
    </p>

    <!-- Single Date Selection -->
    <section class="example-section">
      <h2 class="ae-typo-heading-200">Single Date Selection</h2>
      <p class="ae-typo-body-small section-description">
        Select a single date from the calendar.
      </p>

      <div class="example-grid">
        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Basic Single Date</h3>
          <AeCalendar
            v-model="singleDate"
            mode="single"
            @change="onSingleDateChange"
          />
          <div v-if="singleDate" class="selected-value">
            <strong>Selected:</strong> {{ formatDate(singleDate) }}
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">With Time Picker</h3>
          <AeCalendar
            v-model="dateWithTime"
            mode="single"
            :show-time-picker="true"
            @change="onDateWithTimeChange"
          />
          <div v-if="dateWithTime" class="selected-value">
            <strong>Selected:</strong> {{ formatDateTime(dateWithTime) }}
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">12-Hour Time Format</h3>
          <AeCalendar
            v-model="dateWith12Hour"
            mode="single"
            :show-time-picker="true"
            :use12-hour-format="true"
          />
          <div v-if="dateWith12Hour" class="selected-value">
            <strong>Selected:</strong> {{ formatDateTime12(dateWith12Hour) }}
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Without Quick Select</h3>
          <AeCalendar
            v-model="dateNoQuickSelect"
            mode="single"
            :show-quick-select="false"
          />
          <div v-if="dateNoQuickSelect" class="selected-value">
            <strong>Selected:</strong> {{ formatDate(dateNoQuickSelect) }}
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">With Min/Max Dates</h3>
          <AeCalendar
            v-model="dateWithLimits"
            mode="single"
            :min-date="minDate"
            :max-date="maxDate"
          />
          <div class="selected-value">
            <div><strong>Min:</strong> {{ formatDate(minDate) }}</div>
            <div><strong>Max:</strong> {{ formatDate(maxDate) }}</div>
            <div v-if="dateWithLimits"><strong>Selected:</strong> {{ formatDate(dateWithLimits) }}</div>
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Week Starts on Sunday</h3>
          <AeCalendar
            v-model="dateSundayStart"
            mode="single"
            :first-day-of-week="0"
          />
          <div v-if="dateSundayStart" class="selected-value">
            <strong>Selected:</strong> {{ formatDate(dateSundayStart) }}
          </div>
        </div>
      </div>
    </section>

    <!-- Range Date Selection -->
    <section class="example-section">
      <h2 class="ae-typo-heading-200">Date Range Selection</h2>
      <p class="ae-typo-body-small section-description">
        Select a range of dates from the calendar.
      </p>

      <div class="example-grid">
        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Basic Date Range</h3>
          <AeCalendar
            v-model="dateRange"
            mode="range"
            @change="onDateRangeChange"
          />
          <div v-if="dateRange?.start" class="selected-value">
            <div><strong>Start:</strong> {{ formatDate(dateRange.start) }}</div>
            <div v-if="dateRange.end"><strong>End:</strong> {{ formatDate(dateRange.end) }}</div>
            <div v-else class="hint">Select an end date</div>
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Range with Quick Select</h3>
          <AeCalendar
            v-model="dateRangeQuick"
            mode="range"
          />
          <div v-if="dateRangeQuick?.start" class="selected-value">
            <div><strong>Start:</strong> {{ formatDate(dateRangeQuick.start) }}</div>
            <div v-if="dateRangeQuick.end"><strong>End:</strong> {{ formatDate(dateRangeQuick.end) }}</div>
            <div v-if="dateRangeQuick.start && dateRangeQuick.end">
              <strong>Days:</strong> {{ calculateDaysBetween(dateRangeQuick.start, dateRangeQuick.end) }}
            </div>
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Range Without Quick Select</h3>
          <AeCalendar
            v-model="dateRangeNoQuick"
            mode="range"
            :show-quick-select="false"
          />
          <div v-if="dateRangeNoQuick?.start" class="selected-value">
            <div><strong>Start:</strong> {{ formatDate(dateRangeNoQuick.start) }}</div>
            <div v-if="dateRangeNoQuick.end"><strong>End:</strong> {{ formatDate(dateRangeNoQuick.end) }}</div>
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Custom Quick Presets</h3>
          <AeCalendar
            v-model="dateRangeCustom"
            mode="range"
            :quick-select-presets="customPresets"
          />
          <div v-if="dateRangeCustom?.start" class="selected-value">
            <div><strong>Start:</strong> {{ formatDate(dateRangeCustom.start) }}</div>
            <div v-if="dateRangeCustom.end"><strong>End:</strong> {{ formatDate(dateRangeCustom.end) }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Code Examples -->
    <section class="example-section">
      <h2 class="ae-typo-heading-200">Code Examples</h2>
      
      <div class="code-example">
        <h3 class="ae-typo-single-line-body-base-strong">Single Date Selection</h3>
        <pre class="code-block ae-typo-code"><code>&lt;template&gt;
  &lt;AeCalendar
    v-model="selectedDate"
    mode="single"
    @change="onDateChange"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { AeCalendar } from '@/components'

const selectedDate = ref&lt;Date | null&gt;(null)

const onDateChange = (date: Date | null) => {
  console.log('Selected date:', date)
}
&lt;/script&gt;</code></pre>
      </div>

      <div class="code-example">
        <h3 class="ae-typo-single-line-body-base-strong">Date Range Selection</h3>
        <pre class="code-block ae-typo-code"><code>&lt;template&gt;
  &lt;AeCalendar
    v-model="dateRange"
    mode="range"
    @change="onRangeChange"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { AeCalendar, type DateRangeValue } from '@/components'

const dateRange = ref&lt;DateRangeValue&gt;({ start: null, end: null })

const onRangeChange = (range: DateRangeValue) => {
  console.log('Start:', range.start)
  console.log('End:', range.end)
}
&lt;/script&gt;</code></pre>
      </div>

      <div class="code-example">
        <h3 class="ae-typo-single-line-body-base-strong">With Time Picker</h3>
        <pre class="code-block ae-typo-code"><code>&lt;template&gt;
  &lt;AeCalendar
    v-model="dateTime"
    mode="single"
    :show-time-picker="true"
    :use12-hour-format="true"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { AeCalendar } from '@/components'

const dateTime = ref&lt;Date | null&gt;(new Date())
&lt;/script&gt;</code></pre>
      </div>

      <div class="code-example">
        <h3 class="ae-typo-single-line-body-base-strong">Custom Quick Presets</h3>
        <pre class="code-block ae-typo-code"><code>&lt;template&gt;
  &lt;AeCalendar
    v-model="dateRange"
    mode="range"
    :quick-select-presets="customPresets"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { AeCalendar, type DateRangeValue, type QuickSelectPreset } from '@/components'

const dateRange = ref&lt;DateRangeValue&gt;({ start: null, end: null })

const customPresets: QuickSelectPreset[] = [
  {
    key: 'next7days',
    label: 'Next 7 days',
    getDate: () => new Date(),
    getDateRange: () => {
      const start = new Date()
      const end = new Date()
      end.setDate(end.getDate() + 6)
      return { start, end }
    }
  },
  {
    key: 'thisWeek',
    label: 'This week',
    getDate: () => new Date(),
    getDateRange: () => {
      const now = new Date()
      const dayOfWeek = now.getDay()
      const start = new Date(now)
      start.setDate(now.getDate() - dayOfWeek)
      const end = new Date(now)
      end.setDate(now.getDate() + (6 - dayOfWeek))
      return { start, end }
    }
  }
]
&lt;/script&gt;</code></pre>
      </div>
    </section>

    <!-- Props Documentation -->
    <section class="example-section">
      <h2 class="ae-typo-heading-200">Props</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>modelValue</code></td>
              <td><code>Date | DateRangeValue | null</code></td>
              <td><code>null</code></td>
              <td>Selected date(s). For single mode: Date. For range mode: DateRangeValue</td>
            </tr>
            <tr>
              <td><code>mode</code></td>
              <td><code>'single' | 'range'</code></td>
              <td><code>'single'</code></td>
              <td>Selection mode</td>
            </tr>
            <tr>
              <td><code>showQuickSelect</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Show quick date selection buttons</td>
            </tr>
            <tr>
              <td><code>showTimePicker</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Show time picker (single mode only)</td>
            </tr>
            <tr>
              <td><code>use12HourFormat</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Use 12-hour time format</td>
            </tr>
            <tr>
              <td><code>minDate</code></td>
              <td><code>Date | null</code></td>
              <td><code>null</code></td>
              <td>Minimum selectable date</td>
            </tr>
            <tr>
              <td><code>maxDate</code></td>
              <td><code>Date | null</code></td>
              <td><code>null</code></td>
              <td>Maximum selectable date</td>
            </tr>
            <tr>
              <td><code>disabledDates</code></td>
              <td><code>Date[]</code></td>
              <td><code>[]</code></td>
              <td>Array of disabled dates</td>
            </tr>
            <tr>
              <td><code>firstDayOfWeek</code></td>
              <td><code>0 | 1</code></td>
              <td><code>1</code></td>
              <td>First day of week (0 = Sunday, 1 = Monday)</td>
            </tr>
            <tr>
              <td><code>quickSelectPresets</code></td>
              <td><code>QuickSelectPreset[]</code></td>
              <td><code>undefined</code></td>
              <td>Custom quick select presets</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Events Documentation -->
    <section class="example-section">
      <h2 class="ae-typo-heading-200">Events</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Payload</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>update:modelValue</code></td>
              <td><code>Date | DateRangeValue | null</code></td>
              <td>Emitted when the selected date(s) change</td>
            </tr>
            <tr>
              <td><code>change</code></td>
              <td><code>Date | DateRangeValue | null</code></td>
              <td>Emitted when the selected date(s) change</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AeCalendar, type DateRangeValue, type QuickSelectPreset } from '@/components'

// Single date examples
const singleDate = ref<Date | null>(null)
const dateWithTime = ref<Date | null>(new Date())
const dateWith12Hour = ref<Date | null>(new Date())
const dateNoQuickSelect = ref<Date | null>(null)
const dateWithLimits = ref<Date | null>(null)
const dateSundayStart = ref<Date | null>(null)

// Date range examples
const dateRange = ref<DateRangeValue>({ start: null, end: null })
const dateRangeQuick = ref<DateRangeValue>({ start: null, end: null })
const dateRangeNoQuick = ref<DateRangeValue>({ start: null, end: null })
const dateRangeCustom = ref<DateRangeValue>({ start: null, end: null })

// Min/Max dates
const minDate = new Date()
minDate.setDate(minDate.getDate() - 7)
const maxDate = new Date()
maxDate.setDate(maxDate.getDate() + 14)

// Custom presets
const customPresets: QuickSelectPreset[] = [
  {
    key: 'next7days',
    label: 'Next 7 days',
    getDate: () => new Date(),
    getDateRange: () => {
      const start = new Date()
      start.setHours(0, 0, 0, 0)
      const end = new Date()
      end.setDate(end.getDate() + 6)
      end.setHours(0, 0, 0, 0)
      return { start, end }
    }
  },
  {
    key: 'thisWeek',
    label: 'This week',
    getDate: () => new Date(),
    getDateRange: () => {
      const now = new Date()
      const dayOfWeek = now.getDay()
      const start = new Date(now)
      start.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
      start.setHours(0, 0, 0, 0)
      const end = new Date(start)
      end.setDate(start.getDate() + 6)
      end.setHours(0, 0, 0, 0)
      return { start, end }
    }
  },
  {
    key: 'nextMonth',
    label: 'Next month',
    getDate: () => new Date(),
    getDateRange: () => {
      const start = new Date()
      start.setMonth(start.getMonth() + 1)
      start.setDate(1)
      start.setHours(0, 0, 0, 0)
      const end = new Date(start.getFullYear(), start.getMonth() + 1, 0)
      end.setHours(0, 0, 0, 0)
      return { start, end }
    }
  },
  {
    key: 'thisQuarter',
    label: 'This quarter',
    getDate: () => new Date(),
    getDateRange: () => {
      const now = new Date()
      const quarter = Math.floor(now.getMonth() / 3)
      const start = new Date(now.getFullYear(), quarter * 3, 1)
      start.setHours(0, 0, 0, 0)
      const end = new Date(now.getFullYear(), quarter * 3 + 3, 0)
      end.setHours(0, 0, 0, 0)
      return { start, end }
    }
  }
]

// Event handlers
const onSingleDateChange = (date: Date | null) => {
  console.log('Single date changed:', date)
}

const onDateWithTimeChange = (date: Date | null) => {
  console.log('Date with time changed:', date)
}

const onDateRangeChange = (range: DateRangeValue | null) => {
  console.log('Date range changed:', range)
}

// Utility functions
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date)
}

const formatDateTime12 = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date)
}

const calculateDaysBetween = (start: Date, end: Date): number => {
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
}
</script>

<style scoped lang="scss">
.calendar-examples {
  padding: var(--sds-size-space-24);
  max-width: 1400px;
  margin: 0 auto;

  h1 {
    margin-bottom: var(--sds-size-space-12);
    color: var(--sds-color-text-primary-default);
  }

  .description {
    margin-bottom: var(--sds-size-space-32);
    color: var(--sds-color-text-primary-secondary);
  }
}

.example-section {
  margin-bottom: var(--sds-size-space-48);

  h2 {
    margin-bottom: var(--sds-size-space-8);
    color: var(--sds-color-text-primary-default);
  }

  .section-description {
    margin-bottom: var(--sds-size-space-24);
    color: var(--sds-color-text-primary-secondary);
  }
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--sds-size-space-24);
}

.example-card {
  padding: var(--sds-size-space-16);
  background: var(--sds-color-background-surface-default);
  border: 1px solid var(--sds-color-border-default-secondary);
  border-radius: var(--sds-size-radius-100);

  h3 {
    margin-bottom: var(--sds-size-space-16);
    color: var(--sds-color-text-primary-default);
  }

  .selected-value {
    margin-top: var(--sds-size-space-16);
    padding: var(--sds-size-space-12);
    background: var(--sds-color-background-default-secondary);
    border-radius: var(--sds-size-radius-50);
    font-size: 0.875rem;
    color: var(--sds-color-text-primary-secondary);

    div {
      margin-bottom: var(--sds-size-space-4);

      &:last-child {
        margin-bottom: 0;
      }
    }

    strong {
      color: var(--sds-color-text-primary-default);
    }

    .hint {
      color: var(--sds-color-text-primary-tertiary);
      font-style: italic;
    }
  }
}

.code-example {
  margin-bottom: var(--sds-size-space-24);

  h3 {
    margin-bottom: var(--sds-size-space-12);
    color: var(--sds-color-text-primary-default);
  }

  .code-block {
    background: var(--sds-color-background-surface-default);
    border: 1px solid var(--sds-color-border-default-secondary);
    border-radius: var(--sds-size-radius-100);
    padding: var(--sds-size-space-16);
    overflow-x: auto;
    font-size: 0.875rem;
    line-height: 1.5;

    code {
      color: var(--sds-color-text-primary-default);
      font-family: 'Courier New', Courier, monospace;
    }
  }
}

.props-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    background: var(--sds-color-background-surface-default);
    border: 1px solid var(--sds-color-border-default-secondary);
    border-radius: var(--sds-size-radius-100);

    thead {
      background: var(--sds-color-background-default-secondary);

      th {
        padding: var(--sds-size-space-12);
        text-align: left;
        font-weight: 600;
        color: var(--sds-color-text-primary-default);
        border-bottom: 1px solid var(--sds-color-border-default-secondary);
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid var(--sds-color-border-default-secondary);

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          background: var(--sds-color-background-default-primary-hover);
        }
      }

      td {
        padding: var(--sds-size-space-12);
        color: var(--sds-color-text-primary-secondary);

        code {
          padding: var(--sds-size-space-2) var(--sds-size-space-6);
          background: var(--sds-color-background-default-secondary);
          border-radius: var(--sds-size-radius-25);
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.875rem;
          color: var(--sds-color-text-brand-secondary);
        }
      }
    }
  }
}
</style>
