<script setup lang="ts">
import { AeBreadcrumb } from "@/components"
import type { BreadcrumbItem } from "@/components"

// Basic breadcrumb items
const basicItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Smartphones' }
]

// Short breadcrumb
const shortItems: BreadcrumbItem[] = [
  { label: 'Dashboard', href: '/' },
  { label: 'Settings' }
]

// With disabled item
const disabledItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Archived', href: '/archived', disabled: true },
  { label: 'Old Projects' }
]

// Handle click
const handleItemClick = (item: BreadcrumbItem, index: number) => {
  console.log('Clicked:', item.label, 'at index:', index)
}
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Breadcrumb</h2>
    <p class="demo-section__desc">Navigation breadcrumbs to show the current page location within a hierarchy.</p>

    <div class="demo-grid demo-grid--forms">
      <!-- Basic Breadcrumb -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Basic</h3>
        </template>
        <div class="demo-stack">
          <AeBreadcrumb :items="basicItems" />
        </div>
      </PkCard>

      <!-- Short Breadcrumb -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Short Path</h3>
        </template>
        <div class="demo-stack">
          <AeBreadcrumb :items="shortItems" />
        </div>
      </PkCard>

      <!-- Separators -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Separators</h3>
        </template>
        <div class="demo-stack demo-stack--lg">
          <div class="demo-row">
            <span class="demo-label">Chevron:</span>
            <AeBreadcrumb :items="shortItems" separator="chevron" />
          </div>
          <div class="demo-row">
            <span class="demo-label">Slash:</span>
            <AeBreadcrumb :items="shortItems" separator="slash" />
          </div>
          <div class="demo-row">
            <span class="demo-label">Arrow:</span>
            <AeBreadcrumb :items="shortItems" separator="arrow" />
          </div>
          <div class="demo-row">
            <span class="demo-label">Custom:</span>
            <AeBreadcrumb :items="shortItems" separator="•" />
          </div>
        </div>
      </PkCard>

      <!-- Sizes -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Sizes</h3>
        </template>
        <div class="demo-stack demo-stack--lg">
          <div class="demo-row">
            <span class="demo-label">Small:</span>
            <AeBreadcrumb :items="shortItems" size="sm" />
          </div>
          <div class="demo-row">
            <span class="demo-label">Medium:</span>
            <AeBreadcrumb :items="shortItems" size="md" />
          </div>
          <div class="demo-row">
            <span class="demo-label">Large:</span>
            <AeBreadcrumb :items="shortItems" size="lg" />
          </div>
        </div>
      </PkCard>

      <!-- With Icons -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With Icons</h3>
        </template>
        <div class="demo-stack">
          <AeBreadcrumb :items="basicItems">
            <template #icon-0>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </template>
          </AeBreadcrumb>
        </div>
      </PkCard>

      <!-- Disabled Item -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Disabled Item</h3>
        </template>
        <div class="demo-stack">
          <AeBreadcrumb :items="disabledItems" />
          <p class="demo-info">"Archived" item is disabled and not clickable</p>
        </div>
      </PkCard>

      <!-- Click Event -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Click Event</h3>
        </template>
        <div class="demo-stack">
          <AeBreadcrumb 
            :items="basicItems" 
            @item-click="handleItemClick"
          />
          <p class="demo-info">Click any item (except the last) to trigger the event (check console)</p>
        </div>
      </PkCard>

      <!-- Custom Separator Slot -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Custom Separator Slot</h3>
        </template>
        <div class="demo-stack">
          <AeBreadcrumb :items="shortItems">
            <template #separator>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="4" />
              </svg>
            </template>
          </AeBreadcrumb>
        </div>
      </PkCard>

      <!-- Long Path -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Long Path</h3>
        </template>
        <div class="demo-stack">
          <AeBreadcrumb 
            :items="[
              { label: 'Home', href: '/' },
              { label: 'Documents', href: '/docs' },
              { label: 'Projects', href: '/docs/projects' },
              { label: '2024', href: '/docs/projects/2024' },
              { label: 'Q4', href: '/docs/projects/2024/q4' },
              { label: 'Reports' }
            ]" 
          />
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
