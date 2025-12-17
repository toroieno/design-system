<script setup lang="ts">
import { ref } from 'vue'
import { AeTabs } from "@/components"

// Tab values
const activeTab1 = ref('overview')
const activeTab3 = ref('settings')
const activeTab4 = ref('home')
const activeTab5 = ref('all')

// Basic tabs
const basicTabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Features', value: 'features', disabled: true },
  { label: 'Pricing', value: 'pricing' },
  // { label: 'FAQ', value: 'faq' }
]

// Tabs with badges
const badgeTabs = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending', badge: 5 },
  { label: 'Approved', value: 'approved', badge: 12 },
  { label: 'Rejected', value: 'rejected', badge: 3 }
]

// Settings tabs
const settingsTabs = [
  { label: 'General', value: 'settings' },
  { label: 'Security', value: 'security' },
  { label: 'Notifications', value: 'notifications' },
  // { label: 'Billing', value: 'billing' }
]

// Navigation tabs
const navTabs = [
  { label: 'Home', value: 'home' },
  { label: 'Products', value: 'products' },
  { label: 'Services', value: 'services' },
  { label: 'About', value: 'about' },
  { label: 'Contact', value: 'contact' }
]
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Tabs</h2>
    <p class="demo-section__desc">Tab navigation components with multiple variants and sizes.</p>

    <div class="">
      <!-- Underline Variant -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Underline (Default)</h3>
        </template>
        <div class="demo-stack">
          <AeTabs
            v-model="activeTab1"
            :tabs="basicTabs"
            variant="underline"
            centered
          >
            <div class="tab-content">
              <p v-if="activeTab1 === 'overview'">Overview content goes here...</p>
              <p v-if="activeTab1 === 'features'">Features content goes here...</p>
              <p v-if="activeTab1 === 'pricing'">Pricing content goes here...</p>
              <p v-if="activeTab1 === 'faq'">FAQ content goes here...</p>
            </div>
          </AeTabs>
        </div>
      </PkCard>

      <!-- Enclosed Variant -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Enclosed</h3>
        </template>
        <div class="demo-stack">
          <AeTabs
            v-model="activeTab3"
            :tabs="settingsTabs"
            variant="enclosed"
          >
            <div class="tab-content">
              <p v-if="activeTab3 === 'settings'">General settings panel</p>
              <p v-if="activeTab3 === 'security'">Security settings panel</p>
              <p v-if="activeTab3 === 'notifications'">Notification preferences</p>
              <p v-if="activeTab3 === 'billing'">Billing information</p>
            </div>
          </AeTabs>
        </div>
      </PkCard>

      <!-- With Badges -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With Badges</h3>
        </template>
        <div class="demo-stack">
          <AeTabs
            v-model="activeTab5"
            :tabs="badgeTabs"
            variant="underline"
          >
            <div class="tab-content">
              <p>Showing {{ activeTab5 }} items</p>
            </div>
          </AeTabs>
        </div>
      </PkCard>

      <!-- Full Width -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Full Width</h3>
        </template>
        <div class="demo-stack">
          <AeTabs
            v-model="activeTab4"
            :tabs="navTabs"
            full-width
          />
        </div>
      </PkCard>

      <!-- Sizes -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Sizes</h3>
        </template>
        <div class="demo-stack">
          <div>
            <p class="demo-label">Small</p>
            <AeTabs
              v-model="activeTab1"
              :tabs="basicTabs"
              size="sm"
            />
          </div>
          <div>
            <p class="demo-label">Medium (Default)</p>
            <AeTabs
              v-model="activeTab1"
              :tabs="basicTabs"
              size="md"
            />
          </div>
          <div>
            <p class="demo-label">Large</p>
            <AeTabs
              v-model="activeTab1"
              :tabs="basicTabs"
              size="lg"
            />
          </div>
        </div>
      </PkCard>
    </div>
  </section>
</template>

<style scoped>
.tab-content {
  padding: var(--sds-size-space-16);
  background: var(--sds-color-background-surface-default);
  border-radius: var(--sds-size-radius-50);
  color: var(--sds-color-text-default-primary);
}

.demo-label {
  margin-bottom: var(--sds-size-space-8);
  color: var(--sds-color-text-tertiary-default);
  font-size: 0.875rem;
}
</style>
