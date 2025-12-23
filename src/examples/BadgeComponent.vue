<script setup lang="ts">
import { ref } from 'vue'
import { AeBadge, AeButton } from "@/components"

// Tags for removable example
const tags = ref(['Vue', 'TypeScript', 'SCSS', 'Vite'])

const removeTag = (tag: string) => {
  tags.value = tags.value.filter(t => t !== tag)
}

const resetTags = () => {
  tags.value = ['Vue', 'TypeScript', 'SCSS', 'Vite']
}
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Badge</h2>
    <p class="demo-section__desc">Small status indicators for labeling, categorization, and counts.</p>

    <div class="demo-grid">
      <!-- Colors -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Colors</h3>
        </template>
        <div class="demo-row">
          <AeBadge color="primary">Primary</AeBadge>
          <AeBadge color="secondary">Secondary</AeBadge>
          <AeBadge color="success">Success</AeBadge>
          <AeBadge color="warning">Warning</AeBadge>
          <AeBadge color="danger">Danger</AeBadge>
          <AeBadge color="info">Info</AeBadge>
          <AeBadge color="neutral">Neutral</AeBadge>
        </div>
      </PkCard>

      <!-- Variants: Filled -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Filled Variant</h3>
        </template>
        <div class="demo-row">
          <AeBadge variant="filled" color="primary">Primary</AeBadge>
          <AeBadge variant="filled" color="success">Success</AeBadge>
          <AeBadge variant="filled" color="warning">Warning</AeBadge>
          <AeBadge variant="filled" color="danger">Danger</AeBadge>
        </div>
      </PkCard>

      <!-- Variants: Outlined -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Outlined Variant</h3>
        </template>
        <div class="demo-row">
          <AeBadge variant="outlined" color="primary">Primary</AeBadge>
          <AeBadge variant="outlined" color="success">Success</AeBadge>
          <AeBadge variant="outlined" color="warning">Warning</AeBadge>
          <AeBadge variant="outlined" color="danger">Danger</AeBadge>
        </div>
      </PkCard>

      <!-- Variants: Soft -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Soft Variant</h3>
        </template>
        <div class="demo-row">
          <AeBadge variant="soft" color="primary">Primary</AeBadge>
          <AeBadge variant="soft" color="success">Success</AeBadge>
          <AeBadge variant="soft" color="warning">Warning</AeBadge>
          <AeBadge variant="soft" color="danger">Danger</AeBadge>
        </div>
      </PkCard>

      <!-- Sizes -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Sizes</h3>
        </template>
        <div class="demo-row demo-row--center">
          <AeBadge size="sm">Small</AeBadge>
          <AeBadge size="md">Medium</AeBadge>
          <AeBadge size="lg">Large</AeBadge>
        </div>
      </PkCard>

      <!-- Rounded (Pill) -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Rounded (Pill)</h3>
        </template>
        <div class="demo-row">
          <AeBadge rounded color="primary">New</AeBadge>
          <AeBadge rounded color="success">Active</AeBadge>
          <AeBadge rounded color="warning">Pending</AeBadge>
          <AeBadge rounded color="danger">Expired</AeBadge>
          <AeBadge rounded variant="soft" color="info">Beta</AeBadge>
        </div>
      </PkCard>

      <!-- Dot Indicators -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Dot Indicators</h3>
        </template>
        <div class="demo-stack">
          <div class="demo-row demo-row--center">
            <AeBadge dot color="success" size="sm" />
            <AeBadge dot color="success" size="md" />
            <AeBadge dot color="success" size="lg" />
          </div>
          <div class="status-list">
            <div class="status-item">
              <AeBadge dot color="success" />
              <span>Online</span>
            </div>
            <div class="status-item">
              <AeBadge dot color="warning" />
              <span>Away</span>
            </div>
            <div class="status-item">
              <AeBadge dot color="danger" />
              <span>Offline</span>
            </div>
            <div class="status-item">
              <AeBadge dot color="neutral" />
              <span>Unknown</span>
            </div>
          </div>
        </div>
      </PkCard>

      <!-- With Icon -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With Icon</h3>
        </template>
        <div class="demo-row">
          <AeBadge color="success" variant="soft">
            <template #icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </template>
            Verified
          </AeBadge>
          <AeBadge color="warning" variant="soft">
            <template #icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </template>
            Warning
          </AeBadge>
          <AeBadge color="primary" variant="filled">
            <template #icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </template>
            Featured
          </AeBadge>
          <AeBadge color="info" variant="outlined">
            <template #icon>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </template>
            Info
          </AeBadge>
        </div>
      </PkCard>

      <!-- Removable Tags -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Removable Tags</h3>
        </template>
        <div class="demo-stack">
          <div class="demo-row">
            <AeBadge 
              v-for="tag in tags" 
              :key="tag" 
              removable 
              variant="soft" 
              color="primary"
              rounded
              @remove="removeTag(tag)"
            >
              {{ tag }}
            </AeBadge>
            <AeButton v-if="tags.length === 0" size="sm" variant="ghost" @click="resetTags">
              Reset Tags
            </AeButton>
          </div>
          <p v-if="tags.length === 0" class="demo-info">All tags removed. Click "Reset Tags" to restore.</p>
        </div>
      </PkCard>

      <!-- Counts & Notifications -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Counts & Notifications</h3>
        </template>
        <div class="demo-row">
          <AeBadge color="danger" rounded size="sm">3</AeBadge>
          <AeBadge color="danger" rounded size="sm">99+</AeBadge>
          <AeBadge color="primary" rounded>12</AeBadge>
          <AeBadge color="success" variant="soft" rounded>New</AeBadge>
        </div>
        <div class="demo-row" style="margin-top: 16px;">
          <div class="notification-item">
            <span>Messages</span>
            <AeBadge color="danger" rounded size="sm">5</AeBadge>
          </div>
          <div class="notification-item">
            <span>Updates</span>
            <AeBadge color="primary" variant="soft" rounded size="sm">12</AeBadge>
          </div>
          <div class="notification-item">
            <span>Tasks</span>
            <AeBadge color="warning" variant="soft" rounded size="sm">3</AeBadge>
          </div>
        </div>
      </PkCard>

      <!-- Use Cases -->
      <PkCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Use Cases</h3>
        </template>
        <div class="demo-stack">
          <!-- Status labels -->
          <div class="use-case">
            <span class="use-case__label">Status:</span>
            <AeBadge color="success" variant="soft" rounded>Active</AeBadge>
            <AeBadge color="warning" variant="soft" rounded>Pending</AeBadge>
            <AeBadge color="danger" variant="soft" rounded>Inactive</AeBadge>
          </div>
          
          <!-- Category tags -->
          <div class="use-case">
            <span class="use-case__label">Categories:</span>
            <AeBadge variant="outlined" color="neutral">Design</AeBadge>
            <AeBadge variant="outlined" color="neutral">Development</AeBadge>
            <AeBadge variant="outlined" color="neutral">Marketing</AeBadge>
          </div>
          
          <!-- Priority levels -->
          <div class="use-case">
            <span class="use-case__label">Priority:</span>
            <AeBadge color="danger">High</AeBadge>
            <AeBadge color="warning">Medium</AeBadge>
            <AeBadge color="info" variant="soft">Low</AeBadge>
          </div>
          
          <!-- Version tags -->
          <div class="use-case">
            <span class="use-case__label">Version:</span>
            <AeBadge variant="soft" color="primary">v2.0.0</AeBadge>
            <AeBadge variant="soft" color="success">Stable</AeBadge>
            <AeBadge variant="soft" color="warning">Beta</AeBadge>
          </div>
        </div>
      </PkCard>

      <!-- All Combinations -->
      <PkCard variant="outlined" class="full-width">
        <template #header>
          <h3 class="demo-card-title">All Variant + Color Combinations</h3>
        </template>
        <div class="combinations-grid">
          <div class="combinations-row">
            <span class="combinations-label">Filled</span>
            <AeBadge variant="filled" color="primary">Primary</AeBadge>
            <AeBadge variant="filled" color="secondary">Secondary</AeBadge>
            <AeBadge variant="filled" color="success">Success</AeBadge>
            <AeBadge variant="filled" color="warning">Warning</AeBadge>
            <AeBadge variant="filled" color="danger">Danger</AeBadge>
            <AeBadge variant="filled" color="info">Info</AeBadge>
            <AeBadge variant="filled" color="neutral">Neutral</AeBadge>
          </div>
          <div class="combinations-row">
            <span class="combinations-label">Outlined</span>
            <AeBadge variant="outlined" color="primary">Primary</AeBadge>
            <AeBadge variant="outlined" color="secondary">Secondary</AeBadge>
            <AeBadge variant="outlined" color="success">Success</AeBadge>
            <AeBadge variant="outlined" color="warning">Warning</AeBadge>
            <AeBadge variant="outlined" color="danger">Danger</AeBadge>
            <AeBadge variant="outlined" color="info">Info</AeBadge>
            <AeBadge variant="outlined" color="neutral">Neutral</AeBadge>
          </div>
          <div class="combinations-row">
            <span class="combinations-label">Soft</span>
            <AeBadge variant="soft" color="primary">Primary</AeBadge>
            <AeBadge variant="soft" color="secondary">Secondary</AeBadge>
            <AeBadge variant="soft" color="success">Success</AeBadge>
            <AeBadge variant="soft" color="warning">Warning</AeBadge>
            <AeBadge variant="soft" color="danger">Danger</AeBadge>
            <AeBadge variant="soft" color="info">Info</AeBadge>
            <AeBadge variant="soft" color="neutral">Neutral</AeBadge>
          </div>
        </div>
      </PkCard>
    </div>
  </section>
</template>

<style scoped>
.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--sds-size-space-24);
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sds-size-space-8);
}

.demo-row--center {
  align-items: center;
}

.demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-12);
}

.demo-info {
  color: var(--sds-color-text-default-tertiary);
  font-size: 0.875rem;
  margin: 0;
}

.status-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sds-size-space-16);
}

.status-item {
  display: flex;
  align-items: center;
  gap: var(--sds-size-space-8);
  color: var(--sds-color-text-default-secondary);
  font-size: 0.875rem;
}

.notification-item {
  display: flex;
  align-items: center;
  gap: var(--sds-size-space-8);
  padding: var(--sds-size-space-8) var(--sds-size-space-12);
  background: var(--sds-color-background-surface-secondary);
  border-radius: var(--sds-size-radius-100);
  font-size: 0.875rem;
  color: var(--sds-color-text-default-secondary);
}

.use-case {
  display: flex;
  align-items: center;
  gap: var(--sds-size-space-8);
  flex-wrap: wrap;
}

.use-case__label {
  font-size: 0.875rem;
  color: var(--sds-color-text-default-tertiary);
  min-width: 80px;
}

.full-width {
  grid-column: 1 / -1;
}

.combinations-grid {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-16);
}

.combinations-row {
  display: flex;
  align-items: center;
  gap: var(--sds-size-space-8);
  flex-wrap: wrap;
}

.combinations-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--sds-color-text-default-tertiary);
  min-width: 70px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
