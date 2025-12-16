<script setup lang="ts">
import { ref, computed } from 'vue'
import { AeInput } from "@/components";

// Form values
const inputValue = ref('')
const emailValue = ref('')
const textareaValue = ref('')
const selectValue = ref<string | null>(null)

// Validation
const emailError = computed(() => {
  if (emailValue.value && !emailValue.value.includes('@')) {
    return 'Please enter a valid email address'
  }
  return ''
})

// Select options
const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Australia', value: 'au' },
]
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Form Inputs</h2>
    <p class="demo-section__desc">Text inputs, textareas, and select dropdowns with validation states.</p>

    <div class="demo-grid demo-grid--forms">
      <!-- Inputs -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Text Input</h3>
        </template>
        <div class="demo-stack">
          <AeInput
            v-model="inputValue"
            label="Username"
            placeholder="Enter your username"
            hint="This will be your display name"
            size="lg"
          />
          <AeInput
            v-model="emailValue"
            type="email"
            label="Email"
            placeholder="you@example.com"
            :error-message="emailError"
          />
          <AeInput
            label="Password"
            type="password"
            placeholder="Enter password"
            variant="filled"
          />
        </div>
      </PkCard>

      <!-- Textarea -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Textarea</h3>
        </template>
        <div class="demo-stack">
<!--          <PkTextarea-->
<!--            v-model="textareaValue"-->
<!--            label="Description"-->
<!--            placeholder="Write something..."-->
<!--            :max-length="200"-->
<!--            show-count-->
<!--          />-->
<!--          <PkTextarea-->
<!--            label="With Error"-->
<!--            placeholder="This field has an error"-->
<!--            error-message="This field is required"-->
<!--            variant="filled"-->
<!--          />-->
        </div>
      </PkCard>

      <!-- Select -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Select</h3>
        </template>
        <div class="demo-stack">
          <PkSelect
            v-model="selectValue"
            label="Country"
            :options="countryOptions"
            placeholder="Select a country"
            clearable
          />
          <PkSelect
            label="Variant: Filled"
            :options="['Option 1', 'Option 2', 'Option 3']"
            variant="filled"
            placeholder="Choose..."
          />
        </div>
      </PkCard>

      <!-- Input Variants -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Input Variants</h3>
        </template>
        <div class="demo-stack">
          <AeInput
            label="Outlined (Default)"
            placeholder="Outlined variant"
            variant="outlined"
          />
          <AeInput
            label="Filled"
            placeholder="Filled variant"
            variant="filled"
          />
          <AeInput
            label="Underlined"
            placeholder="Underlined variant"
            variant="underlined"
          />
        </div>
      </PkCard>
    </div>
  </section>
</template>