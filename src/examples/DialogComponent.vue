<script setup lang="ts">
import { ref } from 'vue'
import { AeDialog, AeButton, AeInput } from "@/components"

// Dialog states
const basicDialog = ref(false)
const sizeSmDialog = ref(false)
const sizeLgDialog = ref(false)
const sizeXlDialog = ref(false)
const fullDialog = ref(false)
const noHeaderDialog = ref(false)
const persistentDialog = ref(false)
const formDialog = ref(false)

// Form data
const formData = ref({
  name: '',
  email: ''
})

const handleFormSubmit = () => {
  console.log('Form submitted:', formData.value)
  formDialog.value = false
}
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Dialog</h2>
    <p class="demo-section__desc">Modal dialogs for alerts, confirmations, and forms.</p>

    <div class="demo-grid demo-grid--forms">
      <!-- Basic Dialog -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Basic</h3>
        </template>
        <div class="demo-stack">
          <AeButton @click="basicDialog = true">Open Dialog</AeButton>
          
          <AeDialog v-model="basicDialog" title="Basic Dialog">
            <p>This is a basic dialog with a title and content.</p>
            <p>Click the X button, press Escape, or click outside to close.</p>
            
            <template #footer>
              <AeButton variant="outlined" @click="basicDialog = false">Cancel</AeButton>
              <AeButton @click="basicDialog = false">Confirm</AeButton>
            </template>
          </AeDialog>
        </div>
      </PkCard>

      <!-- Sizes -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Sizes</h3>
        </template>
        <div class="demo-row">
          <AeButton size="sm" @click="sizeSmDialog = true">Small</AeButton>
          <AeButton size="sm" @click="sizeLgDialog = true">Large</AeButton>
          <AeButton size="sm" @click="sizeXlDialog = true">X-Large</AeButton>
          <AeButton size="sm" @click="fullDialog = true">Full</AeButton>
          
          <AeDialog v-model="sizeSmDialog" title="Small Dialog" size="sm">
            <p>This is a small dialog (400px max width).</p>
            <template #footer>
              <AeButton @click="sizeSmDialog = false">Close</AeButton>
            </template>
          </AeDialog>
          
          <AeDialog v-model="sizeLgDialog" title="Large Dialog" size="lg">
            <p>This is a large dialog (700px max width).</p>
            <p>Suitable for displaying more content or complex forms.</p>
            <template #footer>
              <AeButton @click="sizeLgDialog = false">Close</AeButton>
            </template>
          </AeDialog>
          
          <AeDialog v-model="sizeXlDialog" title="Extra Large Dialog" size="xl">
            <p>This is an extra large dialog (900px max width).</p>
            <p>Great for data tables or detailed information.</p>
            <template #footer>
              <AeButton @click="sizeXlDialog = false">Close</AeButton>
            </template>
          </AeDialog>
          
          <AeDialog v-model="fullDialog" title="Full Screen Dialog" size="full">
            <p>This dialog takes up the full screen.</p>
            <p>Useful for immersive experiences or complex workflows.</p>
            <template #footer>
              <AeButton @click="fullDialog = false">Close</AeButton>
            </template>
          </AeDialog>
        </div>
      </PkCard>

      <!-- No Header -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">No Header</h3>
        </template>
        <div class="demo-stack">
          <AeButton @click="noHeaderDialog = true">Open Dialog</AeButton>
          
          <AeDialog v-model="noHeaderDialog" hide-header>
            <div class="demo-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="demo-icon">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 class="ae-text-single-line-body-base-strong">Success!</h3>
              <p>Your action has been completed successfully.</p>
              <AeButton @click="noHeaderDialog = false">Continue</AeButton>
            </div>
          </AeDialog>
        </div>
      </PkCard>

      <!-- Persistent -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Persistent</h3>
        </template>
        <div class="demo-stack">
          <AeButton @click="persistentDialog = true">Open Persistent</AeButton>
          
          <AeDialog 
            v-model="persistentDialog" 
            title="Confirm Action" 
            persistent
            :closable="false"
          >
            <p>Are you sure you want to proceed? This action cannot be undone.</p>
            <p class="demo-muted">This dialog can only be closed by clicking one of the buttons below.</p>
            
            <template #footer>
              <AeButton variant="outlined" @click="persistentDialog = false">Cancel</AeButton>
              <AeButton color="danger" @click="persistentDialog = false">Delete</AeButton>
            </template>
          </AeDialog>
        </div>
      </PkCard>

      <!-- Form Dialog -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Form Dialog</h3>
        </template>
        <div class="demo-stack">
          <AeButton @click="formDialog = true">Open Form</AeButton>
          
          <AeDialog v-model="formDialog" title="Create Account" size="sm">
            <form @submit.prevent="handleFormSubmit" class="demo-form">
              <AeInput 
                v-model="formData.name" 
                label="Full Name" 
                placeholder="Enter your name"
                required
              />
              <AeInput 
                v-model="formData.email" 
                label="Email" 
                type="email"
                placeholder="you@example.com"
                required
              />
            </form>
            
            <template #footer>
              <AeButton variant="outlined" @click="formDialog = false">Cancel</AeButton>
              <AeButton @click="handleFormSubmit">Create</AeButton>
            </template>
          </AeDialog>
        </div>
      </PkCard>
    </div>
  </section>
</template>

<style scoped>
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sds-size-space-12);
}

.demo-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: var(--sds-size-space-12);
  padding: var(--sds-size-space-16);
}

.demo-icon {
  color: var(--sds-color-text-brand-secondary);
}

.demo-muted {
  color: var(--sds-color-text-tertiary-default);
  font-size: 0.875rem;
}

.demo-form {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-16);
}
</style>
