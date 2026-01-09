<script setup lang="ts">
import { ref } from 'vue'
import { AePagination } from "@/components"

// Page states
const basicPage = ref(1)
const noFirstLastPage = ref(5)
const moreSiblingsPage = ref(10)
const smallPage = ref(1)
const mediumPage = ref(1)
const largePage = ref(1)
const disabledPage = ref(3)

// Event tracking
const lastChangeEvent = ref<number | null>(null)

const handlePageChange = (page: number) => {
  lastChangeEvent.value = page
}
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Pagination</h2>
    <p class="demo-section__desc">Navigate through pages of content with intuitive pagination controls.</p>

    <div class="demo-grid demo-grid--forms">
      <!-- Basic Pagination -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Basic</h3>
        </template>
        <div class="demo-stack">
          <AePagination v-model="basicPage" :total-pages="10" />
          <p class="demo-info">Current page: {{ basicPage }}</p>
        </div>
      </AeCard>

      <!-- Without First/Last Buttons -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Without First/Last</h3>
        </template>
        <div class="demo-stack">
          <AePagination 
            v-model="noFirstLastPage" 
            :total-pages="20" 
            :show-first-last="false" 
          />
          <p class="demo-info">Current page: {{ noFirstLastPage }}</p>
        </div>
      </AeCard>

      <!-- More Siblings -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">More Siblings</h3>
        </template>
        <div class="demo-stack">
          <AePagination 
            v-model="moreSiblingsPage" 
            :total-pages="50" 
            :sibling-count="2" 
          />
          <p class="demo-info">Shows 2 pages on each side of current page</p>
        </div>
      </AeCard>

      <!-- Sizes -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Sizes</h3>
        </template>
        <div class="demo-stack demo-stack--lg">
          <div class="demo-size-row">
            <span class="demo-label">Small:</span>
            <AePagination v-model="smallPage" :total-pages="5" size="sm" />
          </div>
          <div class="demo-size-row">
            <span class="demo-label">Medium:</span>
            <AePagination v-model="mediumPage" :total-pages="5" size="md" />
          </div>
          <div class="demo-size-row">
            <span class="demo-label">Large:</span>
            <AePagination v-model="largePage" :total-pages="5" size="lg" />
          </div>
        </div>
      </AeCard>

      <!-- Disabled State -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Disabled</h3>
        </template>
        <div class="demo-stack">
          <AePagination 
            v-model="disabledPage" 
            :total-pages="10" 
            disabled 
          />
          <p class="demo-info">All controls are disabled</p>
        </div>
      </AeCard>

      <!-- Change Event -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Change Event</h3>
        </template>
        <div class="demo-stack">
          <AePagination 
            :model-value="1" 
            :total-pages="10" 
            @change="handlePageChange" 
          />
          <p class="demo-info">
            <template v-if="lastChangeEvent">
              Page changed to: {{ lastChangeEvent }}
            </template>
            <template v-else>
              Click a page to see the event
            </template>
          </p>
        </div>
      </AeCard>

      <!-- Few Pages -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Few Pages</h3>
        </template>
        <div class="demo-stack">
          <div class="demo-size-row">
            <span class="demo-label">3 pages:</span>
            <AePagination :model-value="1" :total-pages="3" />
          </div>
          <div class="demo-size-row">
            <span class="demo-label">1 page:</span>
            <AePagination :model-value="1" :total-pages="1" />
          </div>
        </div>
      </AeCard>

      <!-- Many Pages -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Many Pages</h3>
        </template>
        <div class="demo-stack">
          <AePagination :model-value="50" :total-pages="100" />
          <p class="demo-info">Ellipsis appears when there are many pages</p>
        </div>
      </AeCard>
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
  gap: var(--sds-size-space-24);
}

.demo-info {
  color: var(--sds-color-text-tertiary-default);
  font-size: 0.875rem;
  margin: 0;
}

.demo-size-row {
  display: flex;
  align-items: center;
  gap: var(--sds-size-space-16);
}

.demo-label {
  min-width: 70px;
  color: var(--sds-color-text-primary-tertiary);
  font-size: 0.875rem;
}
</style>
