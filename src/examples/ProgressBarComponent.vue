<script setup lang="ts">
import {AeProgressBar} from "@/components";
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Progress Bar linear</h2>

    <div class="demo-grid">
      <AeProgressBar :value="10"/>
    </div>
  </section>
</template>
