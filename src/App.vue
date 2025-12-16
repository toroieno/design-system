<template>
  <div class="demo-app" :data-theme="isDark ? 'dark' : 'light'">
    <!-- Hero Header -->
    <header class="demo-header">
      <div class="demo-header__content">
        <div class="demo-header__brand">
          <div class="demo-header__logo">
            <svg viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="10" fill="url(#logo-gradient)"/>
              <path d="M12 20L18 14L24 20M18 14V28" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M28 12V28" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
              <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40">
                  <stop stop-color="var(--pk-primary-400)"/>
                  <stop offset="1" stop-color="var(--pk-accent-500)"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="demo-header__text">
            <h1>Pack Design System</h1>
            <p>Vue 3 Component Library</p>
          </div>
        </div>
        
        <div class="demo-header__actions">
          <AeButton variant="tonal" color="accent" @click="isDark = !isDark">
            <template #prepend>
              <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </template>
            {{ isDark ? 'Light Mode' : 'Dark Mode' }}
          </AeButton>
        </div>
      </div>
    </header>
    
    <main class="demo-main">
      <!-- Buttons Section -->
      <ButtonsComponent />

<!--      Progress section -->
      <ProgressBarComponent />
      
      <!-- Form Inputs Section -->
      <section class="demo-section">
        <h2 class="demo-section__title">Form Inputs</h2>
        <p class="demo-section__desc">Text inputs, textareas, and select dropdowns with validation states.</p>
        
        <div class="demo-grid demo-grid--forms">
          <!-- Inputs -->
          <PkCard variant="outlined">
            <template #header>
              <h3 class="demo-card-title">Text Input</h3>
            </template>
            <div class="demo-stack">
              <PkInput 
                v-model="inputValue" 
                label="Username" 
                placeholder="Enter your username"
                hint="This will be your display name"
              />
              <PkInput 
                v-model="emailValue" 
                type="email"
                label="Email" 
                placeholder="you@example.com"
                :error-message="emailError"
              />
              <PkInput 
                label="Password" 
                type="password"
                placeholder="Enter password"
                variant="filled"
              />
            </div>
          </PkCard>
          
          <!-- Textarea -->
          <PkCard variant="outlined">
            <template #header>
              <h3 class="demo-card-title">Textarea</h3>
            </template>
            <div class="demo-stack">
              <PkTextarea 
                v-model="textareaValue"
                label="Description"
                placeholder="Write something..."
                :max-length="200"
                show-count
              />
              <PkTextarea 
                label="With Error"
                placeholder="This field has an error"
                error-message="This field is required"
                variant="filled"
              />
            </div>
          </PkCard>
          
          <!-- Select -->
          <PkCard variant="outlined">
            <template #header>
              <h3 class="demo-card-title">Select</h3>
            </template>
            <div class="demo-stack">
              <PkSelect 
                v-model="selectValue"
                label="Country"
                :options="countryOptions"
                placeholder="Select a country"
                clearable
              />
              <PkSelect 
                label="Variant: Filled"
                :options="['Option 1', 'Option 2', 'Option 3']"
                variant="filled"
                placeholder="Choose..."
              />
            </div>
          </PkCard>
          
          <!-- Input Variants -->
          <PkCard variant="outlined">
            <template #header>
              <h3 class="demo-card-title">Input Variants</h3>
            </template>
            <div class="demo-stack">
              <PkInput 
                label="Outlined (Default)" 
                placeholder="Outlined variant"
                variant="outlined"
              />
              <PkInput 
                label="Filled" 
                placeholder="Filled variant"
                variant="filled"
              />
              <PkInput 
                label="Underlined" 
                placeholder="Underlined variant"
                variant="underlined"
              />
            </div>
          </PkCard>
        </div>
      </section>
      
      <!-- Selection Controls -->
      <section class="demo-section">
        <h2 class="demo-section__title">Selection Controls</h2>
        <p class="demo-section__desc">Checkboxes, radio buttons, and toggle switches.</p>
        
        <div class="demo-grid">
          <!-- Checkbox -->
          <PkCard variant="outlined">
            <template #header>
              <h3 class="demo-card-title">Checkbox</h3>
            </template>
            <div class="demo-stack">
              <PkCheckbox v-model="checkValue1" label="Default checkbox" />
              <PkCheckbox v-model="checkValue2" label="Secondary color" color="secondary" />
              <PkCheckbox v-model="checkValue3" label="Accent color" color="accent" />
              <PkCheckbox label="Disabled" disabled />
              <PkCheckbox label="Indeterminate" indeterminate />
            </div>
          </PkCard>
          
          <!-- Radio -->
          <PkCard variant="outlined">
            <template #header>
              <h3 class="demo-card-title">Radio</h3>
            </template>
            <div class="demo-stack">
              <PkRadio v-model="radioValue" value="option1" name="demo" label="Option 1" />
              <PkRadio v-model="radioValue" value="option2" name="demo" label="Option 2" color="secondary" />
              <PkRadio v-model="radioValue" value="option3" name="demo" label="Option 3" color="accent" />
              <PkRadio value="disabled" name="demo2" label="Disabled" disabled />
            </div>
          </PkCard>
          
          <!-- Switch -->
          <PkCard variant="outlined">
            <template #header>
              <h3 class="demo-card-title">Switch</h3>
            </template>
            <div class="demo-stack">
              <PkSwitch v-model="switchValue1" label="Notifications" />
              <PkSwitch v-model="switchValue2" label="Dark mode" color="accent" />
              <PkSwitch v-model="switchValue3" label="Auto-save" color="success" />
              <div class="demo-row demo-row--align-center">
                <span class="demo-label">Sizes:</span>
                <PkSwitch size="sm" />
                <PkSwitch size="md" />
                <PkSwitch size="lg" />
              </div>
            </div>
          </PkCard>
        </div>
      </section>
      
      <!-- Cards Section -->
      <section class="demo-section">
        <h2 class="demo-section__title">Cards</h2>
        <p class="demo-section__desc">Content containers with various elevation and style options.</p>
        
        <div class="demo-grid demo-grid--cards">
          <PkCard variant="elevated" title="Elevated Card" subtitle="With shadow elevation">
            <p>This card has a subtle shadow that creates depth and visual hierarchy.</p>
            <template #actions>
              <AeButton variant="text" size="sm">Cancel</AeButton>
              <AeButton size="sm">Confirm</AeButton>
            </template>
          </PkCard>
          
          <PkCard variant="outlined" title="Outlined Card" subtitle="With border">
            <p>A clean card with a simple border, perfect for lists and grids.</p>
            <template #actions>
              <AeButton variant="text" size="sm">Learn More</AeButton>
            </template>
          </PkCard>
          
          <PkCard variant="tonal" color="primary" title="Tonal Card" subtitle="Colored background">
            <p>Uses a subtle tinted background to convey information or status.</p>
          </PkCard>
          
          <PkCard variant="elevated" hover>
            <template #media>
              <div class="demo-card-media">
                <svg viewBox="0 0 400 200" fill="none">
                  <rect width="400" height="200" fill="url(#card-gradient)"/>
                  <circle cx="80" cy="50" r="30" fill="rgba(255,255,255,0.2)"/>
                  <circle cx="350" cy="150" r="50" fill="rgba(255,255,255,0.1)"/>
                  <defs>
                    <linearGradient id="card-gradient" x1="0" y1="0" x2="400" y2="200">
                      <stop stop-color="var(--pk-primary-400)"/>
                      <stop offset="0.5" stop-color="var(--pk-accent-500)"/>
                      <stop offset="1" stop-color="var(--pk-secondary-400)"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </template>
            <template #header>
              <h3 class="demo-card-title">Media Card</h3>
              <p class="demo-card-subtitle">With image/media slot</p>
            </template>
            <p>Cards can include media content like images, videos, or custom graphics.</p>
          </PkCard>
        </div>
      </section>
      
      <!-- Badges Section -->
      <section class="demo-section">
        <h2 class="demo-section__title">Badges</h2>
        <p class="demo-section__desc">Small status indicators and labels.</p>
        
        <PkCard variant="outlined">
          <div class="demo-stack">
            <div class="demo-row">
              <span class="demo-label">Filled:</span>
              <PkBadge color="primary">Primary</PkBadge>
              <PkBadge color="secondary">Secondary</PkBadge>
              <PkBadge color="accent">Accent</PkBadge>
              <PkBadge color="success">Success</PkBadge>
              <PkBadge color="warning">Warning</PkBadge>
              <PkBadge color="error">Error</PkBadge>
              <PkBadge color="info">Info</PkBadge>
            </div>
            
            <div class="demo-row">
              <span class="demo-label">Tonal:</span>
              <PkBadge variant="tonal" color="primary">Primary</PkBadge>
              <PkBadge variant="tonal" color="secondary">Secondary</PkBadge>
              <PkBadge variant="tonal" color="accent">Accent</PkBadge>
              <PkBadge variant="tonal" color="success">Success</PkBadge>
              <PkBadge variant="tonal" color="error">Error</PkBadge>
            </div>
            
            <div class="demo-row">
              <span class="demo-label">Outlined:</span>
              <PkBadge variant="outlined" color="primary">Primary</PkBadge>
              <PkBadge variant="outlined" color="secondary">Secondary</PkBadge>
              <PkBadge variant="outlined" color="accent">Accent</PkBadge>
            </div>
            
            <div class="demo-row demo-row--align-center">
              <span class="demo-label">Sizes:</span>
              <PkBadge size="sm">Small</PkBadge>
              <PkBadge size="md">Medium</PkBadge>
              <PkBadge size="lg">Large</PkBadge>
              <PkBadge rounded>Rounded</PkBadge>
            </div>
            
            <div class="demo-row demo-row--align-center">
              <span class="demo-label">Status Dots:</span>
              <span class="demo-status">
                <PkBadge dot color="success" />
                Online
              </span>
              <span class="demo-status">
                <PkBadge dot color="warning" />
                Away
              </span>
              <span class="demo-status">
                <PkBadge dot color="error" />
                Offline
              </span>
            </div>
          </div>
        </PkCard>
      </section>
      
      <!-- Alerts Section -->
      <section class="demo-section">
        <h2 class="demo-section__title">Alerts</h2>
        <p class="demo-section__desc">Contextual feedback messages for user actions.</p>
        
        <div class="demo-stack demo-stack--lg">
          <PkAlert type="info" title="Information" variant="tonal">
            This is an informational message. It provides helpful context to the user.
          </PkAlert>
          
          <PkAlert type="success" title="Success!" variant="tonal" closable>
            Your changes have been saved successfully.
          </PkAlert>
          
          <PkAlert type="warning" title="Warning" variant="tonal">
            Please review your input before proceeding.
          </PkAlert>
          
          <PkAlert type="error" title="Error" variant="tonal" closable>
            Something went wrong. Please try again later.
          </PkAlert>
          
          <div class="demo-row demo-row--stretch">
            <PkAlert type="info" variant="filled">Filled info alert</PkAlert>
            <PkAlert type="success" variant="outlined">Outlined success</PkAlert>
          </div>
        </div>
      </section>
      
      <!-- Color Palette -->
      <section class="demo-section">
        <h2 class="demo-section__title">Color Palette</h2>
        <p class="demo-section__desc">Customizable CSS variables for theming.</p>
        
        <div class="demo-colors">
          <div class="demo-color-group">
            <h4>Primary</h4>
            <div class="demo-color-swatches">
              <div class="demo-swatch" style="background: var(--pk-primary-100)"><span>100</span></div>
              <div class="demo-swatch" style="background: var(--pk-primary-300)"><span>300</span></div>
              <div class="demo-swatch" style="background: var(--pk-primary-500); color: white"><span>500</span></div>
              <div class="demo-swatch" style="background: var(--pk-primary-700); color: white"><span>700</span></div>
              <div class="demo-swatch" style="background: var(--pk-primary-900); color: white"><span>900</span></div>
            </div>
          </div>
          
          <div class="demo-color-group">
            <h4>Secondary</h4>
            <div class="demo-color-swatches">
              <div class="demo-swatch" style="background: var(--pk-secondary-100)"><span>100</span></div>
              <div class="demo-swatch" style="background: var(--pk-secondary-300)"><span>300</span></div>
              <div class="demo-swatch" style="background: var(--pk-secondary-500); color: white"><span>500</span></div>
              <div class="demo-swatch" style="background: var(--pk-secondary-700); color: white"><span>700</span></div>
              <div class="demo-swatch" style="background: var(--pk-secondary-900); color: white"><span>900</span></div>
            </div>
          </div>
          
          <div class="demo-color-group">
            <h4>Accent</h4>
            <div class="demo-color-swatches">
              <div class="demo-swatch" style="background: var(--pk-accent-100)"><span>100</span></div>
              <div class="demo-swatch" style="background: var(--pk-accent-300)"><span>300</span></div>
              <div class="demo-swatch" style="background: var(--pk-accent-500); color: white"><span>500</span></div>
              <div class="demo-swatch" style="background: var(--pk-accent-700); color: white"><span>700</span></div>
              <div class="demo-swatch" style="background: var(--pk-accent-900); color: white"><span>900</span></div>
            </div>
          </div>
          
          <div class="demo-color-group">
            <h4>Semantic</h4>
            <div class="demo-color-swatches">
              <div class="demo-swatch" style="background: var(--pk-success-500); color: white"><span>Success</span></div>
              <div class="demo-swatch" style="background: var(--pk-warning-500)"><span>Warning</span></div>
              <div class="demo-swatch" style="background: var(--pk-error-500); color: white"><span>Error</span></div>
              <div class="demo-swatch" style="background: var(--pk-info-500); color: white"><span>Info</span></div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <!-- Footer -->
    <footer class="demo-footer">
      <p>Pack Design System &bull; Built with Vue 3 + TypeScript</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ButtonsComponent from "@/examples/ButtonsComponent.vue";
import ProgressBarComponent from "@/examples/ProgressBarComponent.vue";
// Components are registered globally via app.use(PackDesignSystem)
// No need to import individually when using license

// Theme
const isDark = ref(true)

// Form values
const inputValue = ref('')
const emailValue = ref('')
const textareaValue = ref('')
const selectValue = ref<string | null>(null)

// Validation
const emailError = computed(() => {
  if (emailValue.value && !emailValue.value.includes('@')) {
    return 'Please enter a valid email address'
  }
  return ''
})

// Select options
const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Australia', value: 'au' },
]

// Checkbox values
const checkValue1 = ref(true)
const checkValue2 = ref(false)
const checkValue3 = ref(true)

// Radio value
const radioValue = ref('option1')

// Switch values
const switchValue1 = ref(true)
const switchValue2 = ref(false)
const switchValue3 = ref(true)
</script>

<style lang="scss">
// Demo App Styles
.demo-app {
  min-height: 100vh;
  background: var(--pk-neutral-50);
  transition: background var(--pk-duration-300) var(--pk-ease-out);
}

// Header
.demo-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(135deg, var(--pk-primary-600), var(--pk-accent-600));
  padding: var(--pk-space-4) var(--pk-space-6);
  box-shadow: var(--pk-shadow-lg);
  
  &__content {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--pk-space-4);
  }
  
  &__brand {
    display: flex;
    align-items: center;
    gap: var(--pk-space-4);
  }
  
  &__logo {
    width: 48px;
    height: 48px;
    
    svg {
      width: 100%;
      height: 100%;
    }
  }
  
  &__text {
    h1 {
      font-size: var(--pk-text-xl);
      font-weight: var(--pk-font-bold);
      color: white;
      margin: 0;
    }
    
    p {
      font-size: var(--pk-text-sm);
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
    }
  }
}

// Main
.demo-main {
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--pk-space-8) var(--pk-space-6);
}

// Section
.demo-section {
  margin-bottom: var(--pk-space-12);
  
  &__title {
    font-size: var(--pk-text-2xl);
    font-weight: var(--pk-font-bold);
    color: var(--pk-neutral-900);
    margin-bottom: var(--pk-space-2);
  }
  
  &__desc {
    font-size: var(--pk-text-base);
    color: var(--pk-neutral-500);
    margin-bottom: var(--pk-space-6);
  }
}

// Grids
.demo-grid {
  display: grid;
  gap: var(--pk-space-6);
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  
  &--buttons {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  
  &--forms {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
  
  &--cards {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

// Layout helpers
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--pk-space-3);
  
  &--align-center {
    align-items: center;
  }
  
  &--stretch {
    > * {
      flex: 1;
      min-width: 200px;
    }
  }
}

.demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--pk-space-4);
  
  &--lg {
    gap: var(--pk-space-4);
  }
}

// Card helpers
.demo-card-title {
  font-size: var(--pk-text-lg);
  font-weight: var(--pk-font-semibold);
  color: var(--pk-neutral-800);
}

.demo-card-subtitle {
  font-size: var(--pk-text-sm);
  color: var(--pk-neutral-500);
  margin-top: var(--pk-space-1);
}

.demo-card-media {
  width: 100%;
  height: 160px;
  overflow: hidden;
  
  svg {
    width: 100%;
    height: 100%;
  }
}

// Labels
.demo-label {
  font-size: var(--pk-text-sm);
  font-weight: var(--pk-font-medium);
  color: var(--pk-neutral-600);
  min-width: 80px;
}

// Status indicator
.demo-status {
  display: inline-flex;
  align-items: center;
  gap: var(--pk-space-2);
  font-size: var(--pk-text-sm);
  color: var(--pk-neutral-700);
}

// Color palette
.demo-colors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--pk-space-6);
}

.demo-color-group {
  h4 {
    font-size: var(--pk-text-sm);
    font-weight: var(--pk-font-semibold);
    color: var(--pk-neutral-700);
    margin-bottom: var(--pk-space-3);
    text-transform: uppercase;
    letter-spacing: var(--pk-tracking-wider);
  }
}

.demo-color-swatches {
  display: flex;
  border-radius: var(--pk-radius-lg);
  overflow: hidden;
  box-shadow: var(--pk-shadow-sm);
}

.demo-swatch {
  flex: 1;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  span {
    font-size: var(--pk-text-xs);
    font-weight: var(--pk-font-medium);
  }
}

// Footer
.demo-footer {
  text-align: center;
  padding: var(--pk-space-8);
  border-top: 1px solid var(--pk-neutral-200);
  color: var(--pk-neutral-500);
  font-size: var(--pk-text-sm);
}

// Dark mode overrides for demo
[data-theme="dark"] {
  .demo-app {
    background: var(--pk-neutral-950);
  }
  
  .demo-section__title {
    color: var(--pk-neutral-100);
  }
  
  .demo-card-title {
    color: var(--pk-neutral-100);
  }
  
  .demo-label {
    color: var(--pk-neutral-400);
  }
  
  .demo-status {
    color: var(--pk-neutral-300);
  }
  
  .demo-color-group h4 {
    color: var(--pk-neutral-300);
  }
  
  .demo-footer {
    border-color: var(--pk-neutral-800);
  }
}
</style>



