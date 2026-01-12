<template>
  <div class="slider-examples">
    <h1 class="ae-typo-heading-100">Slider Component</h1>
    <p class="ae-typo-body-base description">
      A slider component for selecting single values or ranges with keyboard support.
    </p>

    <!-- Single Value -->
    <section class="example-section">
      <h2 class="ae-typo-heading-200">Single Value</h2>
      <p class="ae-typo-body-small section-description">
        Select a single value from a range.
      </p>

      <div class="example-grid">
        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Basic Slider</h3>
          <AeSlider v-model="singleValue" />
          <div class="selected-value">
            <strong>Value:</strong> {{ singleValue }}
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">With Labels</h3>
          <AeSlider 
            v-model="valueWithLabels" 
            :show-labels="true"
          />
          <div class="selected-value">
            <strong>Value:</strong> {{ valueWithLabels }}
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Custom Range (0-200)</h3>
          <AeSlider 
            v-model="customRange" 
            :min="0"
            :max="200"
            :step="5"
            :show-labels="true"
          />
          <div class="selected-value">
            <strong>Value:</strong> {{ customRange }}
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">With Step (10)</h3>
          <AeSlider 
            v-model="stepValue" 
            :step="10"
            :show-labels="true"
          />
          <div class="selected-value">
            <strong>Value:</strong> {{ stepValue }}
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Disabled</h3>
          <AeSlider 
            v-model="disabledValue" 
            :disabled="true"
          />
          <div class="selected-value">
            <strong>Value:</strong> {{ disabledValue }}
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Without Tooltip</h3>
          <AeSlider 
            v-model="noTooltipValue" 
            :show-tooltip="false"
          />
          <div class="selected-value">
            <strong>Value:</strong> {{ noTooltipValue }}
          </div>
        </div>
      </div>
    </section>

    <!-- Range Selection -->
    <section class="example-section">
      <h2 class="ae-typo-heading-200">Range Selection</h2>
      <p class="ae-typo-body-small section-description">
        Select a range of values with two handles.
      </p>

      <div class="example-grid">
        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Basic Range</h3>
          <AeSlider 
            v-model="rangeValue" 
            :range="true"
          />
          <div class="selected-value">
            <strong>Range:</strong> {{ rangeValue[0] }} - {{ rangeValue[1] }}
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Range with Labels</h3>
          <AeSlider 
            v-model="rangeLabelValue" 
            :range="true"
            :show-labels="true"
          />
          <div class="selected-value">
            <strong>Range:</strong> {{ rangeLabelValue[0] }} - {{ rangeLabelValue[1] }}
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Price Range ($0-$1000)</h3>
          <AeSlider 
            v-model="priceRange" 
            :range="true"
            :min="0"
            :max="1000"
            :step="10"
            :show-labels="true"
            :format-tooltip="formatPrice"
            :format-label="formatPrice"
          />
          <div class="selected-value">
            <strong>Range:</strong> {{ formatPrice(priceRange[0]) }} - {{ formatPrice(priceRange[1]) }}
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Range Disabled</h3>
          <AeSlider 
            v-model="rangeDisabled" 
            :range="true"
            :disabled="true"
          />
          <div class="selected-value">
            <strong>Range:</strong> {{ rangeDisabled[0] }} - {{ rangeDisabled[1] }}
          </div>
        </div>
      </div>
    </section>

    <!-- Sizes -->
    <section class="example-section">
      <h2 class="ae-typo-heading-200">Sizes</h2>
      <p class="ae-typo-body-small section-description">
        Different slider sizes.
      </p>

      <div class="example-grid">
        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Small</h3>
          <AeSlider 
            v-model="sizeSmall" 
            size="sm"
          />
          <div class="selected-value">
            <strong>Value:</strong> {{ sizeSmall }}
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Medium (Default)</h3>
          <AeSlider 
            v-model="sizeMedium" 
            size="md"
          />
          <div class="selected-value">
            <strong>Value:</strong> {{ sizeMedium }}
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Large</h3>
          <AeSlider 
            v-model="sizeLarge" 
            size="lg"
          />
          <div class="selected-value">
            <strong>Value:</strong> {{ sizeLarge }}
          </div>
        </div>
      </div>
    </section>

    <!-- With Marks -->
    <section class="example-section">
      <h2 class="ae-typo-heading-200">With Marks</h2>
      <p class="ae-typo-body-small section-description">
        Display marks at specific positions.
      </p>

      <div class="example-grid">
        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Volume Control</h3>
          <AeSlider 
            v-model="volumeValue" 
            :marks="volumeMarks"
            :step="25"
          />
          <div class="selected-value">
            <strong>Volume:</strong> {{ volumeValue }}%
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Temperature Scale</h3>
          <AeSlider 
            v-model="tempValue" 
            :min="-20"
            :max="40"
            :marks="tempMarks"
            :show-labels="true"
            :format-tooltip="formatTemp"
            :format-label="formatTemp"
          />
          <div class="selected-value">
            <strong>Temperature:</strong> {{ formatTemp(tempValue) }}
          </div>
        </div>

        <div class="example-card">
          <h3 class="ae-typo-single-line-body-base-strong">Ratings (1-5)</h3>
          <AeSlider 
            v-model="ratingValue" 
            :min="1"
            :max="5"
            :step="1"
            :marks="ratingMarks"
          />
          <div class="selected-value">
            <strong>Rating:</strong> {{ ratingValue }} ⭐
          </div>
        </div>
      </div>
    </section>

    <!-- Code Examples -->
    <section class="example-section">
      <h2 class="ae-typo-heading-200">Code Examples</h2>
      
      <div class="code-example">
        <h3 class="ae-typo-single-line-body-base-strong">Basic Usage</h3>
        <pre class="code-block ae-typo-code"><code>&lt;template&gt;
  &lt;AeSlider v-model="value" /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { AeSlider } from '@/components'

const value = ref(50)
&lt;/script&gt;</code></pre>
      </div>

      <div class="code-example">
        <h3 class="ae-typo-single-line-body-base-strong">Range Selection</h3>
        <pre class="code-block ae-typo-code"><code>&lt;template&gt;
  &lt;AeSlider 
    v-model="range" 
    :range="true"
    :show-labels="true"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { AeSlider } from '@/components'

const range = ref([20, 80])
&lt;/script&gt;</code></pre>
      </div>

      <div class="code-example">
        <h3 class="ae-typo-single-line-body-base-strong">Custom Format</h3>
        <pre class="code-block ae-typo-code"><code>&lt;template&gt;
  &lt;AeSlider 
    v-model="price" 
    :min="0"
    :max="1000"
    :step="10"
    :format-tooltip="formatPrice"
    :format-label="formatPrice"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { AeSlider } from '@/components'

const price = ref(500)

const formatPrice = (value: number) => {
  return `$${value}`
}
&lt;/script&gt;</code></pre>
      </div>

      <div class="code-example">
        <h3 class="ae-typo-single-line-body-base-strong">With Marks</h3>
        <pre class="code-block ae-typo-code"><code>&lt;template&gt;
  &lt;AeSlider 
    v-model="volume" 
    :marks="volumeMarks"
    :step="25"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import { AeSlider } from '@/components'

const volume = ref(50)

const volumeMarks = {
  0: '🔇',
  25: '🔉',
  50: '🔊',
  75: '',
  100: '🔊'
}
&lt;/script&gt;</code></pre>
      </div>
    </section>

    <!-- Props Documentation -->
    <section class="example-section">
      <h2 class="ae-typo-heading-200">Props</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>modelValue</code></td>
              <td><code>number | [number, number]</code></td>
              <td><code>0</code></td>
              <td>Current value or range</td>
            </tr>
            <tr>
              <td><code>min</code></td>
              <td><code>number</code></td>
              <td><code>0</code></td>
              <td>Minimum value</td>
            </tr>
            <tr>
              <td><code>max</code></td>
              <td><code>number</code></td>
              <td><code>100</code></td>
              <td>Maximum value</td>
            </tr>
            <tr>
              <td><code>step</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>Step increment</td>
            </tr>
            <tr>
              <td><code>range</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Enable range mode</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Disabled state</td>
            </tr>
            <tr>
              <td><code>showTooltip</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Show tooltip on handle</td>
            </tr>
            <tr>
              <td><code>showLabels</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Show min/max labels</td>
            </tr>
            <tr>
              <td><code>marks</code></td>
              <td><code>Record&lt;number, string&gt;</code></td>
              <td><code>undefined</code></td>
              <td>Marks on the slider</td>
            </tr>
            <tr>
              <td><code>formatTooltip</code></td>
              <td><code>(value: number) => string</code></td>
              <td><code>(v) => String(v)</code></td>
              <td>Format tooltip value</td>
            </tr>
            <tr>
              <td><code>formatLabel</code></td>
              <td><code>(value: number) => string</code></td>
              <td><code>(v) => String(v)</code></td>
              <td>Format label value</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>Size variant</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Events Documentation -->
    <section class="example-section">
      <h2 class="ae-typo-heading-200">Events</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Payload</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>update:modelValue</code></td>
              <td><code>number | [number, number]</code></td>
              <td>Emitted when value changes (during drag)</td>
            </tr>
            <tr>
              <td><code>change</code></td>
              <td><code>number | [number, number]</code></td>
              <td>Emitted when drag ends or keyboard interaction completes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Keyboard Support -->
    <section class="example-section">
      <h2 class="ae-typo-heading-200">Keyboard Support</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Arrow Right / Up</code></td>
              <td>Increase by step</td>
            </tr>
            <tr>
              <td><code>Arrow Left / Down</code></td>
              <td>Decrease by step</td>
            </tr>
            <tr>
              <td><code>Page Up</code></td>
              <td>Increase by 10 × step</td>
            </tr>
            <tr>
              <td><code>Page Down</code></td>
              <td>Decrease by 10 × step</td>
            </tr>
            <tr>
              <td><code>Home</code></td>
              <td>Set to minimum</td>
            </tr>
            <tr>
              <td><code>End</code></td>
              <td>Set to maximum</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AeSlider } from '@/components'

// Single values
const singleValue = ref(50)
const valueWithLabels = ref(30)
const customRange = ref(100)
const stepValue = ref(50)
const disabledValue = ref(40)
const noTooltipValue = ref(60)

// Range values
const rangeValue = ref([20, 80])
const rangeLabelValue = ref([25, 75])
const priceRange = ref([200, 800])
const rangeDisabled = ref([30, 70])

// Sizes
const sizeSmall = ref(45)
const sizeMedium = ref(55)
const sizeLarge = ref(65)

// With marks
const volumeValue = ref(50)
const tempValue = ref(20)
const ratingValue = ref(3)

// Marks definitions
const volumeMarks = {
  0: '🔇',
  25: '🔉',
  50: '🔊',
  75: '',
  100: '🔊'
}

const tempMarks = {
  '-20': 'Cold',
  0: 'Freezing',
  20: 'Room',
  40: 'Hot'
}

const ratingMarks = {
  1: '⭐',
  2: '⭐⭐',
  3: '⭐⭐⭐',
  4: '⭐⭐⭐⭐',
  5: '⭐⭐⭐⭐⭐'
}

// Format functions
const formatPrice = (value: number) => {
  return `$${value}`
}

const formatTemp = (value: number) => {
  return `${value}°C`
}
</script>

<style scoped lang="scss">
.slider-examples {
  padding: var(--sds-size-space-24);
  max-width: 1400px;
  margin: 0 auto;

  h1 {
    margin-bottom: var(--sds-size-space-12);
    color: var(--sds-color-text-primary-default);
  }

  .description {
    margin-bottom: var(--sds-size-space-32);
    color: var(--sds-color-text-primary-secondary);
  }
}

.example-section {
  margin-bottom: var(--sds-size-space-48);

  h2 {
    margin-bottom: var(--sds-size-space-8);
    color: var(--sds-color-text-primary-default);
  }

  .section-description {
    margin-bottom: var(--sds-size-space-24);
    color: var(--sds-color-text-primary-secondary);
  }
}

.example-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--sds-size-space-24);
}

.example-card {
  padding: var(--sds-size-space-16);
  background: var(--sds-color-background-surface-default);
  border: 1px solid var(--sds-color-border-default-secondary);
  border-radius: var(--sds-size-radius-100);

  h3 {
    margin-bottom: var(--sds-size-space-16);
    color: var(--sds-color-text-primary-default);
  }

  .selected-value {
    margin-top: var(--sds-size-space-16);
    padding: var(--sds-size-space-12);
    background: var(--sds-color-background-default-secondary);
    border-radius: var(--sds-size-radius-50);
    font-size: 0.875rem;
    color: var(--sds-color-text-primary-secondary);

    strong {
      color: var(--sds-color-text-primary-default);
    }
  }
}

.code-example {
  margin-bottom: var(--sds-size-space-24);

  h3 {
    margin-bottom: var(--sds-size-space-12);
    color: var(--sds-color-text-primary-default);
  }

  .code-block {
    background: var(--sds-color-background-surface-default);
    border: 1px solid var(--sds-color-border-default-secondary);
    border-radius: var(--sds-size-radius-100);
    padding: var(--sds-size-space-16);
    overflow-x: auto;
    font-size: 0.875rem;
    line-height: 1.5;

    code {
      color: var(--sds-color-text-primary-default);
      font-family: 'Courier New', Courier, monospace;
    }
  }
}

.props-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    background: var(--sds-color-background-surface-default);
    border: 1px solid var(--sds-color-border-default-secondary);
    border-radius: var(--sds-size-radius-100);

    thead {
      background: var(--sds-color-background-default-secondary);

      th {
        padding: var(--sds-size-space-12);
        text-align: left;
        font-weight: 600;
        color: var(--sds-color-text-primary-default);
        border-bottom: 1px solid var(--sds-color-border-default-secondary);
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid var(--sds-color-border-default-secondary);

        &:last-child {
          border-bottom: none;
        }

        &:hover {
          background: var(--sds-color-background-default-primary-hover);
        }
      }

      td {
        padding: var(--sds-size-space-12);
        color: var(--sds-color-text-primary-secondary);

        code {
          padding: var(--sds-size-space-2) var(--sds-size-space-6);
          background: var(--sds-color-background-default-secondary);
          border-radius: var(--sds-size-radius-25);
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.875rem;
          color: var(--sds-color-text-brand-secondary);
        }
      }
    }
  }
}
</style>
