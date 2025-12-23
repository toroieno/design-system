<script setup lang="ts">
import { ref } from 'vue'
import { AeDatepicker } from "@/components"

// Basic date
const basicDate = ref<Date | null>(null)

// Preset date
const presetDate = ref<Date | null>(new Date())

// Date restrictions
const restrictedDate = ref<Date | null>(null)
const minDate = new Date()
minDate.setDate(minDate.getDate() - 7) // 7 days ago
const maxDate = new Date()
maxDate.setDate(maxDate.getDate() + 30) // 30 days from now

// Disabled specific dates
const disabledDatesValue = ref<Date | null>(null)
const today = new Date()
const disabledDates = [
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
  new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10)
]

// Different formats
const euDate = ref<Date | null>(null)
const isoDate = ref<Date | null>(null)

// Sizes
const smallDate = ref<Date | null>(null)
const mediumDate = ref<Date | null>(null)
const largeDate = ref<Date | null>(null)

// Sunday start
const sundayStartDate = ref<Date | null>(null)

// Change event
const eventDate = ref<Date | null>(null)
const lastChange = ref<string>('')

const handleChange = (date: Date | null) => {
  lastChange.value = date ? date.toLocaleDateString() : 'cleared'
}
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Datepicker</h2>
    <p class="demo-section__desc">Date selection with calendar dropdown, month/year navigation, and date restrictions.</p>

    <div class="demo-grid demo-grid--forms">
      <!-- Basic Datepicker -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Basic</h3>
        </template>
        <div class="demo-stack">
          <AeDatepicker v-model="basicDate" placeholder="Select a date" />
          <p class="demo-info">
            Selected: {{ basicDate ? basicDate.toLocaleDateString() : 'None' }}
          </p>
        </div>
      </AeCard>

      <!-- Preset Date -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Preset Date</h3>
        </template>
        <div class="demo-stack">
          <AeDatepicker v-model="presetDate" />
          <p class="demo-info">Initialized with today's date</p>
        </div>
      </AeCard>

      <!-- Date Formats -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Date Formats</h3>
        </template>
        <div class="demo-stack">
          <div class="demo-row">
            <span class="demo-label">US:</span>
            <AeDatepicker v-model="basicDate" format="MM/DD/YYYY" />
          </div>
          <div class="demo-row">
            <span class="demo-label">EU:</span>
            <AeDatepicker v-model="euDate" format="DD/MM/YYYY" />
          </div>
          <div class="demo-row">
            <span class="demo-label">ISO:</span>
            <AeDatepicker v-model="isoDate" format="YYYY-MM-DD" />
          </div>
        </div>
      </AeCard>

      <!-- Min/Max Date -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Min/Max Date</h3>
        </template>
        <div class="demo-stack">
          <AeDatepicker 
            v-model="restrictedDate" 
            :min-date="minDate"
            :max-date="maxDate"
          />
          <p class="demo-info">
            Range: {{ minDate.toLocaleDateString() }} - {{ maxDate.toLocaleDateString() }}
          </p>
        </div>
      </AeCard>

      <!-- Disabled Dates -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Disabled Dates</h3>
        </template>
        <div class="demo-stack">
          <AeDatepicker 
            v-model="disabledDatesValue" 
            :disabled-dates="disabledDates"
          />
          <p class="demo-info">Some specific dates are disabled</p>
        </div>
      </AeCard>

      <!-- Sizes -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Sizes</h3>
        </template>
        <div class="demo-stack demo-stack--lg">
          <div class="demo-row">
            <span class="demo-label">Small:</span>
            <AeDatepicker v-model="smallDate" size="sm" />
          </div>
          <div class="demo-row">
            <span class="demo-label">Medium:</span>
            <AeDatepicker v-model="mediumDate" size="md" />
          </div>
          <div class="demo-row">
            <span class="demo-label">Large:</span>
            <AeDatepicker v-model="largeDate" size="lg" />
          </div>
        </div>
      </AeCard>

      <!-- First Day of Week -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Week Starts on Sunday</h3>
        </template>
        <div class="demo-stack">
          <AeDatepicker 
            v-model="sundayStartDate" 
            :first-day-of-week="0"
          />
          <p class="demo-info">Calendar starts on Sunday instead of Monday</p>
        </div>
      </AeCard>

      <!-- Not Clearable -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Not Clearable</h3>
        </template>
        <div class="demo-stack">
          <AeDatepicker 
            v-model="presetDate" 
            :clearable="false"
          />
          <p class="demo-info">Clear button is hidden</p>
        </div>
      </AeCard>

      <!-- Disabled -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Disabled</h3>
        </template>
        <div class="demo-stack">
          <AeDatepicker 
            :model-value="new Date()" 
            disabled
          />
          <p class="demo-info">Datepicker is disabled</p>
        </div>
      </AeCard>

      <!-- Change Event -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Change Event</h3>
        </template>
        <div class="demo-stack">
          <AeDatepicker 
            v-model="eventDate" 
            @change="handleChange"
          />
          <p class="demo-info">
            <template v-if="lastChange">
              Last change: {{ lastChange }}
            </template>
            <template v-else>
              Select or clear a date to see the event
            </template>
          </p>
        </div>
      </AeCard>
    </div>
  </section>
</template>

<style scoped>
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-16);
}

.demo-stack--lg {
  gap: var(--sds-size-space-20);
}

.demo-row {
  display: flex;
  align-items: center;
  gap: var(--sds-size-space-16);
}

.demo-label {
  min-width: 70px;
  color: var(--sds-color-text-default-tertiary);
  font-size: 0.875rem;
}

.demo-info {
  color: var(--sds-color-text-tertiary-default);
  font-size: 0.875rem;
  margin: 0;
}
</style>
