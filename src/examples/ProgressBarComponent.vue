<script setup lang="ts">
import {AeProgressBar} from "@/components";
</script>

<template>
  <section class="demo-stack">
    <AeProgressBar :value="30" size="sm"/>
    <div style="width: 200px;">
      <AeProgressBar :value="60" color="success" indeterminate/>
    </div>
    <AeProgressBar :value="80" color="warning" show-label/>
  </section>
</template>
