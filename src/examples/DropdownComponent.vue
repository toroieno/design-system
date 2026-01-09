<script setup lang="ts">
import { ref, h } from 'vue'
import { AeDropdown, AeButton, type DropdownItem } from "@/components"

// Icons
const EditIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('path', { d: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' }),
  h('path', { d: 'M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' })
])

const CopyIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('rect', { x: '9', y: '9', width: '13', height: '13', rx: '2', ry: '2' }),
  h('path', { d: 'M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1' })
])

const ArchiveIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('polyline', { points: '21 8 21 21 3 21 3 8' }),
  h('rect', { x: '1', y: '3', width: '22', height: '5' }),
  h('line', { x1: '10', y1: '12', x2: '14', y2: '12' })
])

const TrashIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('polyline', { points: '3 6 5 6 21 6' }),
  h('path', { d: 'M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2' })
])

const DownloadIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('path', { d: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4' }),
  h('polyline', { points: '7 10 12 15 17 10' }),
  h('line', { x1: '12', y1: '15', x2: '12', y2: '3' })
])

const ShareIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('circle', { cx: '18', cy: '5', r: '3' }),
  h('circle', { cx: '6', cy: '12', r: '3' }),
  h('circle', { cx: '18', cy: '19', r: '3' }),
  h('line', { x1: '8.59', y1: '13.51', x2: '15.42', y2: '17.49' }),
  h('line', { x1: '15.41', y1: '6.51', x2: '8.59', y2: '10.49' })
])

const MoreIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('circle', { cx: '12', cy: '12', r: '1' }),
  h('circle', { cx: '19', cy: '12', r: '1' }),
  h('circle', { cx: '5', cy: '12', r: '1' })
])

// Selected item tracking
const selectedItem = ref<string>('')

// Basic items
const basicItems: DropdownItem[] = [
  { key: 'edit', label: 'Edit', icon: EditIcon },
  { key: 'copy', label: 'Duplicate', icon: CopyIcon },
  { key: 'archive', label: 'Archive', icon: ArchiveIcon },
  { divider: true },
  { key: 'delete', label: 'Delete', icon: TrashIcon, danger: true }
]

// Items with shortcuts
const shortcutItems: DropdownItem[] = [
  { key: 'edit', label: 'Edit', icon: EditIcon, shortcut: '⌘E' },
  { key: 'copy', label: 'Duplicate', icon: CopyIcon, shortcut: '⌘D' },
  { key: 'download', label: 'Download', icon: DownloadIcon, shortcut: '⌘S' },
  { divider: true },
  { key: 'delete', label: 'Delete', icon: TrashIcon, shortcut: '⌘⌫', danger: true }
]

// Grouped items
const groupedItems: DropdownItem[] = [
  { group: true, label: 'Actions' },
  { key: 'edit', label: 'Edit' },
  { key: 'copy', label: 'Duplicate' },
  { divider: true },
  { group: true, label: 'Share' },
  { key: 'share', label: 'Share Link', icon: ShareIcon },
  { key: 'download', label: 'Download', icon: DownloadIcon },
  { divider: true },
  { key: 'delete', label: 'Delete', danger: true }
]

// Items with disabled
const disabledItems: DropdownItem[] = [
  { key: 'edit', label: 'Edit', icon: EditIcon },
  { key: 'copy', label: 'Duplicate', icon: CopyIcon, disabled: true },
  { key: 'archive', label: 'Archive', icon: ArchiveIcon },
  { divider: true },
  { key: 'delete', label: 'Delete', icon: TrashIcon, disabled: true }
]

// Handle selection
const handleSelect = (item: DropdownItem) => {
  selectedItem.value = item.key || item.label || ''
}
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Dropdown</h2>
    <p class="demo-section__desc">Dropdown menu component for displaying a list of actions or options.</p>

    <div class="demo-grid demo-grid--dropdown">
      <!-- Basic Dropdown -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Basic Dropdown</h3>
        </template>
        <div class="demo-stack">
          <AeDropdown 
            :items="basicItems" 
            trigger-text="Actions"
            @select="handleSelect"
          />
          <p v-if="selectedItem" class="demo-info">Selected: {{ selectedItem }}</p>
        </div>
      </AeCard>

      <!-- With Shortcuts -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With Shortcuts</h3>
        </template>
        <div class="demo-stack">
          <AeDropdown 
            :items="shortcutItems" 
            trigger-text="File"
          />
        </div>
      </AeCard>

      <!-- Grouped Items -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Grouped Items</h3>
        </template>
        <div class="demo-stack">
          <AeDropdown 
            :items="groupedItems" 
            trigger-text="Options"
            :width="200"
          />
        </div>
      </AeCard>

      <!-- Disabled Items -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Disabled Items</h3>
        </template>
        <div class="demo-stack">
          <AeDropdown 
            :items="disabledItems" 
            trigger-text="Actions"
          />
        </div>
      </AeCard>

      <!-- Placements -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Placements</h3>
        </template>
        <div class="demo-row demo-row--spread">
          <AeDropdown 
            :items="basicItems" 
            trigger-text="Bottom Start"
            placement="bottom-start"
          />
          <AeDropdown 
            :items="basicItems" 
            trigger-text="Bottom End"
            placement="bottom-end"
          />
        </div>
      </AeCard>

      <!-- Custom Trigger -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Custom Trigger</h3>
        </template>
        <div class="demo-row">
          <AeDropdown :items="basicItems" placement="bottom-end">
            <template #trigger>
              <AeButton variant="ghost" size="sm">
                <component :is="MoreIcon" />
              </AeButton>
            </template>
          </AeDropdown>

          <AeDropdown :items="basicItems">
            <template #trigger>
              <AeButton variant="outlined" size="sm">
                More Actions
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </AeButton>
            </template>
          </AeDropdown>
        </div>
      </AeCard>

      <!-- Hover Trigger -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Hover Trigger</h3>
        </template>
        <div class="demo-stack">
          <AeDropdown 
            :items="basicItems" 
            trigger-text="Hover Me"
            trigger="hover"
          />
          <p class="demo-info">Menu opens on hover instead of click</p>
        </div>
      </AeCard>

      <!-- Disabled Dropdown -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Disabled</h3>
        </template>
        <div class="demo-stack">
          <AeDropdown 
            :items="basicItems" 
            trigger-text="Disabled"
            disabled
          />
        </div>
      </AeCard>

      <!-- Custom Width -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Custom Width</h3>
        </template>
        <div class="demo-row">
          <AeDropdown 
            :items="basicItems" 
            trigger-text="Wide Menu"
            :width="280"
          />
          <AeDropdown 
            :items="basicItems" 
            trigger-text="Narrow"
            :min-width="120"
          />
        </div>
      </AeCard>

      <!-- With onClick Handler -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Item onClick</h3>
        </template>
        <div class="demo-stack">
          <AeDropdown 
            :items="[
              { key: 'alert', label: 'Show Alert', onClick: () => alert('Clicked!') },
              { key: 'log', label: 'Console Log', onClick: () => console.log('Item clicked') },
              { divider: true },
              { key: 'reload', label: 'Reload Page', onClick: () => location.reload() }
            ]" 
            trigger-text="Click Actions"
          />
          <p class="demo-info">Each item can have its own onClick handler</p>
        </div>
      </AeCard>
    </div>
  </section>
</template>

<style scoped>
.demo-grid--dropdown {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--sds-size-space-24);
}

.demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-12);
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sds-size-space-12);
  align-items: center;
}

.demo-row--spread {
  justify-content: space-between;
}

.demo-info {
  color: var(--sds-color-text-primary-tertiary);
  font-size: 0.875rem;
  margin: 0;
}
</style>
