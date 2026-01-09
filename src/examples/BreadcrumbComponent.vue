<script setup lang="ts">
import {AeBreadcrumb} from "@/components"
import IconHome from '@/components/icons/IconHome.vue'
</script>

<template>
  <div class="demo-stack">
    <AeBreadcrumb
      :items="[
        { label: 'Home', href: '#' },
        [{ label: 'Button', href: '/docs/button' }, { label: 'Dropdown', href: '/docs/dropdown' }],
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
