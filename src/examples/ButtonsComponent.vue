<script setup lang="ts">
import {AeButton} from "@/components";
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Buttons</h2>
    <p class="demo-section__desc">Versatile buttons with multiple variants, colors, and sizes.</p>

    <div class="demo-grid">
      <!-- Variants -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Variants</h3>
        </template>
        <div class="demo-row">
          <AeButton variant="filled" @click="() => { console.log(1) }">Filled</AeButton>
          <AeButton variant="outlined">Outlined</AeButton>
          <AeButton variant="text">Text</AeButton>
          <AeButton variant="text" color="danger">Text</AeButton>
          <AeButton icon variant="filled">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </AeButton>
          <AeButton icon variant="outlined">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </AeButton>
          <AeButton icon variant="text">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </AeButton>
        </div>
      </AeCard>

      <!-- Colors -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Colors</h3>
        </template>
        <div class="demo-row">
          <AeButton color="primary">Primary</AeButton>
          <AeButton color="danger">danger</AeButton>
          <AeButton variant="outlined" color="danger">danger</AeButton>
        </div>
      </AeCard>

      <!-- Sizes -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Sizes</h3>
        </template>
        <div class="demo-row demo-row--align-center">
          <AeButton size="sm">Small</AeButton>
          <AeButton size="md">Medium</AeButton>
          <AeButton size="lg">Large</AeButton>
        </div>
      </AeCard>

      <!-- States -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">States</h3>
        </template>
        <div class="demo-row">
          <AeButton>Default</AeButton>
          <AeButton loading>Loading</AeButton>
          <AeButton disabled>Disabled</AeButton>
          <AeButton rounded>Rounded</AeButton>
        </div>
      </AeCard>
    </div>
  </section>
</template>