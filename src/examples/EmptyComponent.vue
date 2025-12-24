<script setup lang="ts">
import { h } from 'vue'
import { AeEmpty, AeButton, AeCard } from "@/components"

// Custom icons
const SearchIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
  h('circle', { cx: '11', cy: '11', r: '8' }),
  h('path', { d: 'M21 21l-4.35-4.35' })
])

const InboxIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
  h('polyline', { points: '22 12 16 12 14 15 10 15 8 12 2 12' }),
  h('path', { d: 'M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z' })
])

const FileIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
  h('path', { d: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' }),
  h('polyline', { points: '14 2 14 8 20 8' }),
  h('line', { x1: '12', y1: '18', x2: '12', y2: '12' }),
  h('line', { x1: '9', y1: '15', x2: '15', y2: '15' })
])

const CartIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
  h('circle', { cx: '9', cy: '21', r: '1' }),
  h('circle', { cx: '20', cy: '21', r: '1' }),
  h('path', { d: 'M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6' })
])

const UsersIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
  h('path', { d: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' }),
  h('circle', { cx: '9', cy: '7', r: '4' }),
  h('path', { d: 'M23 21v-2a4 4 0 00-3-3.87' }),
  h('path', { d: 'M16 3.13a4 4 0 010 7.75' })
])

const ImageIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [
  h('rect', { x: '3', y: '3', width: '18', height: '18', rx: '2', ry: '2' }),
  h('circle', { cx: '8.5', cy: '8.5', r: '1.5' }),
  h('polyline', { points: '21 15 16 10 5 21' })
])
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Empty State</h2>
    <p class="demo-section__desc">Placeholder component for empty data states, no results, or initial states.</p>

    <div class="demo-grid">
      <!-- Basic -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Basic</h3>
        </template>
        <AeEmpty />
      </AeCard>

      <!-- With Description -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With Description</h3>
        </template>
        <AeEmpty 
          title="No items found"
          description="Try adjusting your search or filter to find what you're looking for."
        />
      </AeCard>

      <!-- With Action -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With Action</h3>
        </template>
        <AeEmpty 
          title="No projects yet"
          description="Get started by creating your first project."
        >
          <AeButton>Create Project</AeButton>
        </AeEmpty>
      </AeCard>

      <!-- Multiple Actions -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Multiple Actions</h3>
        </template>
        <AeEmpty 
          title="No data available"
          description="Import your data or create new entries manually."
        >
          <AeButton variant="outlined">Import Data</AeButton>
          <AeButton>Add Entry</AeButton>
        </AeEmpty>
      </AeCard>

      <!-- Custom Icon -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Custom Icon</h3>
        </template>
        <AeEmpty 
          title="No search results"
          description="We couldn't find anything matching your search."
          :icon="SearchIcon"
        >
          <AeButton variant="ghost" size="sm">Clear Search</AeButton>
        </AeEmpty>
      </AeCard>

      <!-- Inbox Empty -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Empty Inbox</h3>
        </template>
        <AeEmpty 
          title="Your inbox is empty"
          description="You're all caught up! Check back later for new messages."
          :icon="InboxIcon"
        />
      </AeCard>

      <!-- No Files -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">No Files</h3>
        </template>
        <AeEmpty 
          title="No files uploaded"
          description="Drag and drop files here or click to upload."
          :icon="FileIcon"
        >
          <AeButton>Upload Files</AeButton>
        </AeEmpty>
      </AeCard>

      <!-- Empty Cart -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Empty Cart</h3>
        </template>
        <AeEmpty 
          title="Your cart is empty"
          description="Looks like you haven't added anything to your cart yet."
          :icon="CartIcon"
        >
          <AeButton>Start Shopping</AeButton>
        </AeEmpty>
      </AeCard>

      <!-- No Team Members -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">No Team Members</h3>
        </template>
        <AeEmpty 
          title="No team members"
          description="Invite people to collaborate on this project."
          :icon="UsersIcon"
        >
          <AeButton>Invite Members</AeButton>
        </AeEmpty>
      </AeCard>

      <!-- No Images -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">No Images</h3>
        </template>
        <AeEmpty 
          title="No images"
          description="Upload images to your gallery."
          :icon="ImageIcon"
        >
          <AeButton variant="outlined">Browse Files</AeButton>
        </AeEmpty>
      </AeCard>

      <!-- Sizes -->
      <AeCard variant="outlined" class="full-width">
        <template #header>
          <h3 class="demo-card-title">Sizes</h3>
        </template>
        <div class="size-demo">
          <div class="size-demo__item">
            <span class="size-label">Small</span>
            <AeEmpty 
              size="sm"
              title="No data"
              description="Nothing to display"
            />
          </div>
          <div class="size-demo__item">
            <span class="size-label">Medium (default)</span>
            <AeEmpty 
              size="md"
              title="No data"
              description="Nothing to display"
            />
          </div>
          <div class="size-demo__item">
            <span class="size-label">Large</span>
            <AeEmpty 
              size="lg"
              title="No data"
              description="Nothing to display here at the moment"
            />
          </div>
        </div>
      </AeCard>

      <!-- Hide Icon -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Without Icon</h3>
        </template>
        <AeEmpty 
          title="Nothing here"
          description="This empty state has no icon."
          hide-icon
        >
          <AeButton size="sm">Take Action</AeButton>
        </AeEmpty>
      </AeCard>

      <!-- Custom Slot Content -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Custom Slots</h3>
        </template>
        <AeEmpty>
          <template #icon>
            <div class="custom-icon">
              <span>🎉</span>
            </div>
          </template>
          <template #title>
            <span class="custom-title">All done!</span>
          </template>
          <template #description>
            <span>You've completed all your tasks. <a href="#">View history</a></span>
          </template>
        </AeEmpty>
      </AeCard>
    </div>
  </section>
</template>

<style scoped>
.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--sds-size-space-24);
}

.full-width {
  grid-column: 1 / -1;
}

.size-demo {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sds-size-space-16);
}

@media (max-width: 900px) {
  .size-demo {
    grid-template-columns: 1fr;
  }
}

.size-demo__item {
  border: 1px dashed var(--sds-color-border-default-secondary);
  border-radius: var(--sds-size-radius-100);
  display: flex;
  flex-direction: column;
}

.size-label {
  display: block;
  padding: var(--sds-size-space-8) var(--sds-size-space-12);
  background: var(--sds-color-background-surface-secondary);
  color: var(--sds-color-text-default-tertiary);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px dashed var(--sds-color-border-default-secondary);
}

.custom-icon {
  font-size: 48px;
  line-height: 1;
}

.custom-title {
  background: linear-gradient(135deg, var(--sds-color-text-brand-secondary), var(--sds-color-text-positive-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.custom-title + span a {
  color: var(--sds-color-text-brand-secondary);
}
</style>
