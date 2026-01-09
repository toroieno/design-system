<template>
  <div class="demo-app" :data-theme="isDark ? 'dark' : 'light'">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Components are registered globally via app.use(PackDesignSystem)
// No need to import individually when using license

// Theme
const isDark = ref(true)

</script>



