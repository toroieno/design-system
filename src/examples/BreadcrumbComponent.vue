<script setup lang="ts">
import {AeBreadcrumb} from "@/components"
import IconHome from '@/components/icons/IconHome.vue'
</script>

<template>
  <div class="demo-stack">
    <AeBreadcrumb
      :items="[
        { label: 'Home', href: '#' },
        [{ label: 'child-1', href: '#' }, { label: 'child-2', href: '#' }],
        { label: 'Products', href: '#' },
        { label: 'Category', href: '#' },
        { label: 'Current Page' }
      ]"
    />
    <AeBreadcrumb
      :items="[
        { label: 'Home', href: '#', icon: IconHome },
        { label: 'Products', href: '#' },
        { label: 'Category', href: '#' },
        { label: 'Current Page' }
      ]"
      separator="chevron"
    />
  </div>
</template>

<style scoped>
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-12);
  width: 100%;
  max-width: 400px;
}
</style>
