<script setup lang="ts">
import { ref, computed } from 'vue'
import { AeField, AeInput, AeTextarea, AeSelect, AeCheckbox } from "@/components"

// Form values
const email = ref('')
const password = ref('')
const bio = ref('')
const username = ref('john_doe')
const country = ref('')
const agreed = ref(false)

// Computed for character counter
const bioLength = computed(() => bio.value.length)

// Country options
const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' }
]
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Field</h2>
    <p class="demo-section__desc">Form field wrapper component for consistent label, hint, error, and validation styling.</p>

    <div class="demo-grid demo-grid--forms">
      <!-- Basic Field -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Basic Field</h3>
        </template>
        <div class="demo-stack">
          <AeField label="Email Address" hint="We'll never share your email">
            <AeInput v-model="email" placeholder="Enter your email" />
          </AeField>
        </div>
      </PkCard>

      <!-- Required Field -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Required Field</h3>
        </template>
        <div class="demo-stack">
          <AeField label="Password" required hint="Must be at least 8 characters">
            <AeInput v-model="password" type="password" placeholder="Enter password" />
          </AeField>
        </div>
      </PkCard>

      <!-- Optional Field -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Optional Field</h3>
        </template>
        <div class="demo-stack">
          <AeField label="Phone Number" show-optional>
            <AeInput placeholder="(555) 123-4567" />
          </AeField>
        </div>
      </PkCard>

      <!-- Error State -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Error State</h3>
        </template>
        <div class="demo-stack">
          <AeField 
            label="Username" 
            error="Username is already taken" 
            show-error-icon
          >
            <AeInput v-model="username" />
          </AeField>
        </div>
      </PkCard>

      <!-- Success State -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Success State</h3>
        </template>
        <div class="demo-stack">
          <AeField 
            label="Email Verification" 
            success="Email is available!" 
            show-success-icon
          >
            <AeInput model-value="available@email.com" />
          </AeField>
        </div>
      </PkCard>

      <!-- With Description -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With Description</h3>
        </template>
        <div class="demo-stack">
          <AeField 
            label="API Key" 
            description="Your API key is used to authenticate requests. Keep it secure."
            description-position="top"
            hint="Click to reveal"
          >
            <AeInput type="password" model-value="sk_live_abc123xyz" />
          </AeField>
        </div>
      </PkCard>

      <!-- Character Counter -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Character Counter</h3>
        </template>
        <div class="demo-stack">
          <AeField 
            label="Bio" 
            :current-length="bioLength" 
            :max-length="200"
            hint="Tell us about yourself"
          >
            <AeTextarea 
              v-model="bio" 
              placeholder="Write a short bio..." 
              :rows="3"
            />
          </AeField>
        </div>
      </PkCard>

      <!-- With Select -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With Select</h3>
        </template>
        <div class="demo-stack">
          <AeField label="Country" required>
            <AeSelect 
              v-model="country" 
              :options="countryOptions" 
              placeholder="Select country"
            />
          </AeField>
        </div>
      </PkCard>

      <!-- With Checkbox -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With Checkbox</h3>
        </template>
        <div class="demo-stack">
          <AeField 
            :error="!agreed ? 'You must agree to continue' : undefined"
          >
            <AeCheckbox v-model="agreed" label="I agree to the Terms and Conditions" />
          </AeField>
        </div>
      </PkCard>

      <!-- Sizes -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Sizes</h3>
        </template>
        <div class="demo-stack">
          <AeField label="Small Field" size="sm" hint="Small hint text">
            <AeInput placeholder="Small input" size="sm" />
          </AeField>
          
          <AeField label="Medium Field" size="md" hint="Medium hint text">
            <AeInput placeholder="Medium input" />
          </AeField>
          
          <AeField label="Large Field" size="lg" hint="Large hint text">
            <AeInput placeholder="Large input" size="lg" />
          </AeField>
        </div>
      </PkCard>

      <!-- Disabled State -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Disabled State</h3>
        </template>
        <div class="demo-stack">
          <AeField label="Disabled Field" disabled hint="This field is disabled">
            <AeInput model-value="Cannot edit" disabled />
          </AeField>
        </div>
      </PkCard>

      <!-- Custom Label Slot -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Custom Label</h3>
        </template>
        <div class="demo-stack">
          <AeField required>
            <template #label>
              <span class="custom-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <span class="ae-typo-single-line-body-small-strong">Secure Password</span>
              </span>
            </template>
            <AeInput type="password" placeholder="Enter secure password" />
          </AeField>
        </div>
      </PkCard>
    </div>
  </section>
</template>

<style scoped>
.demo-grid--forms {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--sds-size-space-24);
}

.demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-16);
}

.custom-label {
  display: inline-flex;
  align-items: center;
  gap: var(--sds-size-space-8);
  color: var(--sds-color-text-default-primary);
}

.custom-label svg {
  color: var(--sds-color-text-brand-secondary);
}
</style>
