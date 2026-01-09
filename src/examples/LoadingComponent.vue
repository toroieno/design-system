<template>
  <section class="demo-stack">
    <AeLoading />
    <AeLoading :size="10" :dots="2" :time="100"/>
  </section>
</template>

<script setup lang="ts">
import {AeLoading} from "@/components";
</script>