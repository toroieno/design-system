<script setup lang="ts">
import { ref } from 'vue'

// Checkbox values
const checkValue1 = ref(true)
const checkValue2 = ref(false)
const checkValue3 = ref(true)

// Radio value
const radioValue = ref('option1')

// Switch values
const switchValue1 = ref(true)
const switchValue2 = ref(false)
const switchValue3 = ref(true)
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Selection Controls</h2>
    <p class="demo-section__desc">Checkboxes, radio buttons, and toggle switches.</p>

    <div class="demo-grid">
      <!-- Checkbox -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Checkbox</h3>
        </template>
        <div class="demo-stack">
          <AeCheckbox v-model="checkValue1" label="Default checkbox" />
          <AeCheckbox v-model="checkValue1" label="Default checkbox" size="sm"/>
          <AeCheckbox v-model="checkValue1" label="Default checkbox" size="lg" disabled/>
          <AeCheckbox label="Disabled" disabled />
          <AeCheckbox label="Indeterminate" indeterminate />
        </div>
      </PkCard>

      <!-- Radio -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Radio</h3>
        </template>
        <div class="demo-stack">
          <PkRadio v-model="radioValue" value="option1" name="demo" label="Option 1" />
          <PkRadio v-model="radioValue" value="option2" name="demo" label="Option 2" color="secondary" />
          <PkRadio v-model="radioValue" value="option3" name="demo" label="Option 3" color="accent" />
          <PkRadio value="disabled" name="demo2" label="Disabled" disabled />
        </div>
      </PkCard>

      <!-- Switch -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Switch</h3>
        </template>
        <div class="demo-stack">
          <PkSwitch v-model="switchValue1" label="Notifications" />
          <PkSwitch v-model="switchValue2" label="Dark mode" color="accent" />
          <PkSwitch v-model="switchValue3" label="Auto-save" color="success" />
          <div class="demo-row demo-row--align-center">
            <span class="demo-label">Sizes:</span>
            <PkSwitch size="sm" />
            <PkSwitch size="md" />
            <PkSwitch size="lg" />
          </div>
        </div>
      </PkCard>
    </div>
  </section>
</template>