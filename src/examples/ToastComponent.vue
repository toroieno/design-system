<script setup lang="ts">
import { AeToastProvider, useToast, AeButton } from "@/components"

const { success, error, warning, info, addToast, clearAll } = useToast()

// Basic toasts
const showSuccess = () => {
  success('Success!', 'Your changes have been saved successfully.')
}

const showError = () => {
  error('Error', 'Something went wrong. Please try again.')
}

const showWarning = () => {
  warning('Warning', 'Your session will expire in 5 minutes.')
}

const showInfo = () => {
  info('Information', 'A new version is available for download.')
}

// Title only
const showTitleOnly = () => {
  success('File uploaded successfully!')
}

// Custom duration
const showLongDuration = () => {
  info('Long Toast', 'This toast will stay for 10 seconds.', { duration: 10000 })
}

const showNoDismiss = () => {
  warning('Persistent', 'This toast will not auto-dismiss.', { duration: 0 })
}

// Not closable
const showNotClosable = () => {
  info('Processing', 'Please wait while we process your request...', { closable: false, duration: 3000 })
}

// Multiple toasts
const showMultiple = () => {
  success('Step 1', 'First task completed')
  setTimeout(() => info('Step 2', 'Processing second task...'), 300)
  setTimeout(() => success('Step 3', 'All tasks completed!'), 600)
}

// Custom toast
const showCustom = () => {
  addToast({
    variant: 'success',
    title: 'Custom Toast',
    message: 'This toast was created with addToast()',
    duration: 4000,
    closable: true
  })
}
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Toast</h2>
    <p class="demo-section__desc">Toast notifications for displaying brief messages to users.</p>

    <!-- Toast Provider (required once in app) -->
    <AeToastProvider position="top-right" />

    <div class="demo-grid demo-grid--forms">
      <!-- Variants -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Variants</h3>
        </template>
        <div class="demo-row">
          <AeButton size="sm" color="success" @click="showSuccess">Success</AeButton>
          <AeButton size="sm" color="danger" @click="showError">Error</AeButton>
          <AeButton size="sm" color="warning" @click="showWarning">Warning</AeButton>
          <AeButton size="sm" variant="outlined" @click="showInfo">Info</AeButton>
        </div>
      </PkCard>

      <!-- Title Only -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Title Only</h3>
        </template>
        <div class="demo-stack">
          <AeButton size="sm" @click="showTitleOnly">Show Toast</AeButton>
          <p class="demo-info">Toast with only a title, no message</p>
        </div>
      </PkCard>

      <!-- Duration -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Duration</h3>
        </template>
        <div class="demo-row">
          <AeButton size="sm" variant="outlined" @click="showLongDuration">10s Duration</AeButton>
          <AeButton size="sm" variant="outlined" @click="showNoDismiss">No Auto-Dismiss</AeButton>
        </div>
      </PkCard>

      <!-- Not Closable -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Not Closable</h3>
        </template>
        <div class="demo-stack">
          <AeButton size="sm" variant="outlined" @click="showNotClosable">Show Toast</AeButton>
          <p class="demo-info">Toast without close button (auto-dismisses after 3s)</p>
        </div>
      </PkCard>

      <!-- Multiple Toasts -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Multiple Toasts</h3>
        </template>
        <div class="demo-row">
          <AeButton size="sm" variant="outlined" @click="showMultiple">Show 3 Toasts</AeButton>
          <AeButton size="sm" variant="ghost" @click="clearAll">Clear All</AeButton>
        </div>
      </PkCard>

      <!-- Custom Toast -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Custom Toast</h3>
        </template>
        <div class="demo-stack">
          <AeButton size="sm" variant="outlined" @click="showCustom">addToast()</AeButton>
          <p class="demo-info">Using addToast() for full control</p>
        </div>
      </PkCard>

      <!-- Usage Code -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Usage</h3>
        </template>
        <div class="demo-stack">
          <pre class="demo-code">// In App.vue (once)
&lt;AeToastProvider position="top-right" /&gt;

// In any component
import { useToast } from '@/components'

const { success, error, warning, info } = useToast()

success('Title', 'Message')
error('Title', 'Message', { duration: 10000 })</pre>
        </div>
      </PkCard>
    </div>
  </section>
</template>

<style scoped>
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-16);
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sds-size-space-12);
}

.demo-info {
  color: var(--sds-color-text-tertiary-default);
  font-size: 0.875rem;
  margin: 0;
}

.demo-code {
  padding: var(--sds-size-space-12);
  background: var(--sds-color-background-surface-default);
  border: 1px solid var(--sds-color-border-default-secondary);
  border-radius: var(--sds-size-radius-100);
  font-family: monospace;
  font-size: 0.75rem;
  line-height: 1.6;
  overflow-x: auto;
  margin: 0;
  white-space: pre-wrap;
}
</style>
