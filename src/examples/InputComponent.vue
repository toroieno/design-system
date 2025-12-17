<script setup lang="ts">
import { ref, computed } from 'vue'
import {AeInput, AeSelect, AeTextarea} from "@/components";

// Form values
const inputValue = ref('')
const emailValue = ref('')
const textareaValue = ref('')
const selectValue = ref<string | null>(null)
const selectValues = ref<string[]>([])

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
          <AeInput>
            <template #append>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
            <template #prepend>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
          </AeInput>
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
          <AeTextarea
            v-model="textareaValue"
            label="Description"
            placeholder="Write something..."
            :max-length="200"
            show-count
          />
          <AeTextarea
            v-model="textareaValue"
            label="With Error"
            placeholder="This field has an error"
            :error-message="!textareaValue ? 'This field is required' : ''"
            variant="filled"
          />
        </div>
      </PkCard>

      <!-- Select -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Select</h3>
        </template>
        <div class="demo-stack">
          <AeSelect
            v-model="selectValue"
            label="Country"
            :options="countryOptions"
            placeholder="Select a country"
            clearable
          />
          <AeSelect
            label="Variant: Filled"
            :options="['Option 1', 'Option 2', 'Option 3']"
            variant="filled"
            placeholder="Choose..."
            error-message="123"
          />
          <AeSelect
            size="sm"
            label="Variant: Filled"
            :options="[]"
            variant="underlined"
            placeholder="Choose..."
          />
          <AeSelect
            v-model="selectValues"
            size="lg"
            label="Variant: Filled"
            :options="['Option 1', 'Option 2', 'Option 3', 'Option 5', 'Option 7', 'Option 8']"
            variant="filled"
            placeholder="Choose..."
            multiple
            clearable
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