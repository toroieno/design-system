<script setup lang="ts">
import {AeEmpty, AeCard, AeButton} from "@/components"
</script>

<template>
  <section class="demo-stack">
    <div class="demo-grid">
      <!-- Basic -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Basic</h3>
        </template>
        <AeEmpty>
        </AeEmpty>
      </AeCard>

      <!-- With Description -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">No data</h3>
        </template>
        <AeEmpty state="data">
          <AeButton>
            <template #prepend>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7.99992 3.33333V12.6667M3.33325 7.99999H12.6666" stroke="#08070B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
            Add New
          </AeButton>
        </AeEmpty>
      </AeCard>

      <!-- With Action -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">No connection</h3>
        </template>
        <AeEmpty state="connect" />
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
.custom-title + span a {
  color: var(--sds-color-text-brand-secondary);
}
</style>
