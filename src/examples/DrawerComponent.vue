<script setup lang="ts">
import { ref } from 'vue'
import { AeDrawer, AeButton, AeInput, AeField, AeTextarea } from "@/components"

// Drawer states
const basicDrawer = ref(false)
const leftDrawer = ref(false)
const topDrawer = ref(false)
const bottomDrawer = ref(false)
const sizeDrawer = ref(false)
const currentSize = ref<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md')
const formDrawer = ref(false)
const persistentDrawer = ref(false)
const customDrawer = ref(false)
const noHeaderDrawer = ref(false)

// Form data
const formData = ref({
  name: '',
  email: '',
  message: ''
})

const openSizeDrawer = (size: 'sm' | 'md' | 'lg' | 'xl' | 'full') => {
  currentSize.value = size
  sizeDrawer.value = true
}

const handleFormSubmit = () => {
  console.log('Form submitted:', formData.value)
  formDrawer.value = false
  // Reset form
  formData.value = { name: '', email: '', message: '' }
}
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Drawer</h2>
    <p class="demo-section__desc">Slide-out panel component for displaying content from the edge of the screen.</p>

    <div class="demo-grid demo-grid--drawer">
      <!-- Basic Drawer (Right) -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Basic (Right)</h3>
        </template>
        <div class="demo-stack">
          <AeButton @click="basicDrawer = true">Open Drawer</AeButton>
          <p class="demo-info">Default drawer slides in from the right</p>
        </div>
      </AeCard>

      <!-- Left Drawer -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Left Placement</h3>
        </template>
        <div class="demo-stack">
          <AeButton @click="leftDrawer = true">Open Left</AeButton>
        </div>
      </AeCard>

      <!-- Top Drawer -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Top Placement</h3>
        </template>
        <div class="demo-stack">
          <AeButton @click="topDrawer = true">Open Top</AeButton>
        </div>
      </AeCard>

      <!-- Bottom Drawer -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Bottom Placement</h3>
        </template>
        <div class="demo-stack">
          <AeButton @click="bottomDrawer = true">Open Bottom</AeButton>
        </div>
      </AeCard>

      <!-- Sizes -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Sizes</h3>
        </template>
        <div class="demo-row">
          <AeButton size="sm" variant="outlined" @click="openSizeDrawer('sm')">Small</AeButton>
          <AeButton size="sm" variant="outlined" @click="openSizeDrawer('md')">Medium</AeButton>
          <AeButton size="sm" variant="outlined" @click="openSizeDrawer('lg')">Large</AeButton>
          <AeButton size="sm" variant="outlined" @click="openSizeDrawer('xl')">XL</AeButton>
          <AeButton size="sm" variant="outlined" @click="openSizeDrawer('full')">Full</AeButton>
        </div>
      </AeCard>

      <!-- Form Drawer -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With Form</h3>
        </template>
        <div class="demo-stack">
          <AeButton @click="formDrawer = true">Contact Form</AeButton>
          <p class="demo-info">Drawer with form and footer actions</p>
        </div>
      </AeCard>

      <!-- Persistent Drawer -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Persistent</h3>
        </template>
        <div class="demo-stack">
          <AeButton @click="persistentDrawer = true">Open Persistent</AeButton>
          <p class="demo-info">Can't close by clicking overlay or pressing Escape</p>
        </div>
      </AeCard>

      <!-- Custom Header -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Custom Header</h3>
        </template>
        <div class="demo-stack">
          <AeButton @click="customDrawer = true">Custom Header</AeButton>
        </div>
      </AeCard>

      <!-- No Header -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">No Header</h3>
        </template>
        <div class="demo-stack">
          <AeButton @click="noHeaderDrawer = true">No Header</AeButton>
          <p class="demo-info">Content only, no header section</p>
        </div>
      </AeCard>
    </div>

    <!-- Basic Drawer -->
    <AeDrawer v-model="basicDrawer" title="Basic Drawer">
      <p>This is a basic drawer that slides in from the right side of the screen.</p>
      <p>You can put any content here. Click outside or press Escape to close.</p>
    </AeDrawer>

    <!-- Left Drawer -->
    <AeDrawer v-model="leftDrawer" title="Left Drawer" placement="left">
      <p>This drawer slides in from the left side.</p>
      <p>Commonly used for navigation menus or sidebars.</p>
    </AeDrawer>

    <!-- Top Drawer -->
    <AeDrawer v-model="topDrawer" title="Top Drawer" placement="top" size="sm">
      <p>This drawer drops down from the top of the screen.</p>
    </AeDrawer>

    <!-- Bottom Drawer -->
    <AeDrawer v-model="bottomDrawer" title="Bottom Drawer" placement="bottom" size="sm">
      <p>This drawer slides up from the bottom of the screen.</p>
      <p>Great for mobile-friendly actions or additional options.</p>
    </AeDrawer>

    <!-- Size Drawer -->
    <AeDrawer v-model="sizeDrawer" :title="`Size: ${currentSize}`" :size="currentSize">
      <p>Current size: <strong>{{ currentSize }}</strong></p>
      <p class="demo-info">
        Available sizes:
        <br>• sm: 280px
        <br>• md: 400px (default)
        <br>• lg: 560px
        <br>• xl: 720px
        <br>• full: 100%
      </p>
    </AeDrawer>

    <!-- Form Drawer -->
    <AeDrawer v-model="formDrawer" title="Contact Us" size="md">
      <div class="drawer-form">
        <AeField label="Name" required>
          <AeInput v-model="formData.name" placeholder="Your name" />
        </AeField>
        
        <AeField label="Email" required>
          <AeInput v-model="formData.email" type="email" placeholder="your@email.com" />
        </AeField>
        
        <AeField label="Message">
          <AeTextarea v-model="formData.message" placeholder="How can we help?" :rows="4" />
        </AeField>
      </div>

      <template #footer>
        <AeButton variant="ghost" @click="formDrawer = false">Cancel</AeButton>
        <AeButton @click="handleFormSubmit">Send Message</AeButton>
      </template>
    </AeDrawer>

    <!-- Persistent Drawer -->
    <AeDrawer 
      v-model="persistentDrawer" 
      title="Persistent Drawer"
      :close-on-overlay="false"
      :close-on-escape="false"
    >
      <p>This drawer won't close when clicking the overlay or pressing Escape.</p>
      <p>You must use the close button or the button below to close it.</p>
      
      <template #footer>
        <AeButton @click="persistentDrawer = false">Close Drawer</AeButton>
      </template>
    </AeDrawer>

    <!-- Custom Header Drawer -->
    <AeDrawer v-model="customDrawer">
      <template #header>
        <div class="custom-header">
          <div class="custom-header__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div class="custom-header__text">
            <h3 class="ae-typo-single-line-body-base-strong">Help Center</h3>
            <p class="ae-typo-note">Find answers to common questions</p>
          </div>
        </div>
      </template>
      
      <p>Custom header with icon and description.</p>
      <p>Use the header slot to customize the drawer header completely.</p>
    </AeDrawer>

    <!-- No Header Drawer -->
    <AeDrawer v-model="noHeaderDrawer" hide-header>
      <div class="no-header-content">
        <button class="close-btn" @click="noHeaderDrawer = false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h2 class="ae-typo-single-line-body-large-strong">No Header Mode</h2>
        <p>When you need full control over the drawer content, use <code>hide-header</code> prop.</p>
        <p>Don't forget to provide your own close button!</p>
      </div>
    </AeDrawer>
  </section>
</template>

<style scoped>
.demo-grid--drawer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--sds-size-space-24);
}

.demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-12);
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sds-size-space-8);
}

.demo-info {
  color: var(--sds-color-text-default-tertiary);
  font-size: 0.875rem;
  margin: 0;
}

.drawer-form {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-16);
}

.custom-header {
  display: flex;
  align-items: flex-start;
  gap: var(--sds-size-space-12);
}

.custom-header__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--sds-color-background-brand-secondary);
  color: var(--sds-color-text-brand-secondary);
  border-radius: var(--sds-size-radius-100);
}

.custom-header__text h3 {
  margin: 0;
  color: var(--sds-color-text-default-primary);
}

.custom-header__text p {
  margin: var(--sds-size-space-4) 0 0 0;
  color: var(--sds-color-text-default-tertiary);
}

.no-header-content {
  position: relative;
  padding-top: var(--sds-size-space-24);
}

.no-header-content h2 {
  margin: 0 0 var(--sds-size-space-16) 0;
  color: var(--sds-color-text-default-primary);
}

.no-header-content p {
  color: var(--sds-color-text-default-secondary);
  margin: 0 0 var(--sds-size-space-12) 0;
}

.no-header-content code {
  padding: 2px 6px;
  background: var(--sds-color-background-surface-tertiary);
  border-radius: var(--sds-size-radius-50);
  font-size: 0.875rem;
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--sds-color-text-default-tertiary);
  cursor: pointer;
  border-radius: var(--sds-size-radius-50);
  transition: all 0.1s ease;
}

.close-btn:hover {
  background: var(--sds-color-background-default-primary-hover);
  color: var(--sds-color-text-default-primary);
}
</style>
