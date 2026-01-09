<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { 
  AeInput, AeButton, AeBadge, AeTextarea, AeSelect, AeCheckbox, AeRadio, 
  AeSwitch, AeField, AeDatepicker, AeCard, AeDialog, AeDrawer, AeDropdown,
  AeTooltip, AeToastProvider, toast, AeProgressBar, AeAvatar, AeAvatarGroup,
  AeTable, AeEmpty, AeTabs, AeNav, AeSidebar, AePagination
} from "@/components"
import BreadcrumbComponent from "@/examples/BreadcrumbComponent.vue";

const route = useRoute()

// Demo state for interactive components
const demoSelect = ref('')
const demoCheckbox1 = ref(false)
const demoCheckbox2 = ref(true)
const demoRadio = ref('free')
const demoSwitch1 = ref(true)
const demoSwitch2 = ref(false)
const demoDate = ref<Date | null>(null)
const demoDialog = ref(false)
const demoDrawer = ref(false)
const demoTab = ref('tab1')
const demoPage = ref(1)

// Component list with metadata
const components = [
  { key: 'button', name: 'Button', description: 'Interactive button element', category: 'Actions' },
  { key: 'input', name: 'Input', description: 'Text input field', category: 'Forms' },
  { key: 'textarea', name: 'Textarea', description: 'Multi-line text input', category: 'Forms' },
  { key: 'select', name: 'Select', description: 'Dropdown selection', category: 'Forms' },
  { key: 'checkbox', name: 'Checkbox', description: 'Checkbox input', category: 'Forms' },
  { key: 'radio', name: 'Radio', description: 'Radio button input', category: 'Forms' },
  { key: 'switch', name: 'Switch', description: 'Toggle switch', category: 'Forms' },
  { key: 'field', name: 'Field', description: 'Form field wrapper', category: 'Forms' },
  { key: 'datepicker', name: 'Datepicker', description: 'Date picker input', category: 'Forms' },
  { key: 'card', name: 'Card', description: 'Content container', category: 'Layout' },
  { key: 'dialog', name: 'Dialog', description: 'Modal dialog', category: 'Overlay' },
  { key: 'drawer', name: 'Drawer', description: 'Slide-out panel', category: 'Overlay' },
  { key: 'dropdown', name: 'Dropdown', description: 'Dropdown menu', category: 'Overlay' },
  { key: 'tooltip', name: 'Tooltip', description: 'Tooltip popup', category: 'Overlay' },
  { key: 'toast', name: 'Toast', description: 'Toast notifications', category: 'Feedback' },
  { key: 'progressbar', name: 'ProgressBar', description: 'Progress indicator', category: 'Feedback' },
  { key: 'badge', name: 'Badge', description: 'Status badge', category: 'Data Display' },
  { key: 'avatar', name: 'Avatar', description: 'User avatar', category: 'Data Display' },
  { key: 'table', name: 'Table', description: 'Data table', category: 'Data Display' },
  { key: 'empty', name: 'Empty', description: 'Empty state', category: 'Data Display' },
  { key: 'tabs', name: 'Tabs', description: 'Tab navigation', category: 'Navigation' },
  { key: 'nav', name: 'Nav', description: 'Navigation bar', category: 'Navigation' },
  { key: 'sidebar', name: 'Sidebar', description: 'Side navigation', category: 'Navigation' },
  { key: 'breadcrumb', name: 'Breadcrumb', description: 'Breadcrumb navigation', category: 'Navigation' },
  { key: 'pagination', name: 'Pagination', description: 'Page navigation', category: 'Navigation' },
]

// Code examples for each component
const codeExamples: Record<string, { template: string; script?: string }> = {
  button: {
    template: `<template>
  <div class="demo-row">
    <AeButton>Default</AeButton>
    <AeButton variant="outlined">Outlined</AeButton>
    <AeButton variant="ghost">Ghost</AeButton>
    <AeButton color="danger">Danger</AeButton>
    <AeButton disabled>Disabled</AeButton>
  </div>
</template>`,
    script: `<script setup>
import { AeButton } from '@ae-package/design-system'
<\/script>`
  },
  input: {
    template: `<template>
  <div class="demo-stack">
    <AeInput placeholder="Enter text..." />
    <AeInput label="Email" type="email" placeholder="your@email.com" />
    <AeInput label="Password" type="password" />
    <AeInput label="Disabled" disabled value="Cannot edit" />
    <AeInput label="With Error" error="This field is required" />
  </div>
</template>`,
    script: `<script setup>
import { AeInput } from '@ae-package/design-system'
<\/script>`
  },
  textarea: {
    template: `<template>
  <div class="demo-stack">
    <AeTextarea placeholder="Enter your message..." />
    <AeTextarea label="Description" :rows="4" />
    <AeTextarea label="With Counter" :maxlength="200" show-count />
  </div>
</template>`,
    script: `<script setup>
import { AeTextarea } from '@ae-package/design-system'
<\/script>`
  },
  select: {
    template: `<template>
  <AeSelect
    v-model="selected"
    label="Choose option"
    :options="[
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' }
    ]"
    placeholder="Select..."
  />
</template>`,
    script: `<script setup>
import { ref } from 'vue'
import { AeSelect } from '@ae-package/design-system'

const selected = ref('')
<\/script>`
  },
  checkbox: {
    template: `<template>
  <div class="demo-stack">
    <AeCheckbox v-model="checked">Accept terms</AeCheckbox>
    <AeCheckbox v-model="marketing">Receive updates</AeCheckbox>
    <AeCheckbox disabled>Disabled option</AeCheckbox>
  </div>
</template>`,
    script: `<script setup>
import { ref } from 'vue'
import { AeCheckbox } from '@ae-package/design-system'

const checked = ref(false)
const marketing = ref(true)
<\/script>`
  },
  radio: {
    template: `<template>
  <div class="demo-stack">
    <AeRadio v-model="plan" value="free">Free Plan</AeRadio>
    <AeRadio v-model="plan" value="pro">Pro Plan</AeRadio>
    <AeRadio v-model="plan" value="enterprise">Enterprise</AeRadio>
  </div>
</template>`,
    script: `<script setup>
import { ref } from 'vue'
import { AeRadio } from '@ae-package/design-system'

const plan = ref('free')
<\/script>`
  },
  switch: {
    template: `<template>
  <div class="demo-stack">
    <AeSwitch v-model="enabled">Enable notifications</AeSwitch>
    <AeSwitch v-model="darkMode">Dark mode</AeSwitch>
    <AeSwitch disabled>Disabled</AeSwitch>
  </div>
</template>`,
    script: `<script setup>
import { ref } from 'vue'
import { AeSwitch } from '@ae-package/design-system'

const enabled = ref(true)
const darkMode = ref(false)
<\/script>`
  },
  field: {
    template: `<template>
  <AeField label="Username" required hint="Choose a unique username">
    <AeInput placeholder="Enter username" />
  </AeField>
  
  <AeField label="Bio" optional>
    <AeTextarea placeholder="Tell us about yourself" />
  </AeField>
  
  <AeField label="Email" error="Invalid email address">
    <AeInput type="email" />
  </AeField>
</template>`,
    script: `<script setup>
import { AeField, AeInput, AeTextarea } from '@ae-package/design-system'
<\/script>`
  },
  datepicker: {
    template: `<template>
  <div class="demo-stack">
    <AeDatepicker v-model="date" label="Select date" />
    <AeDatepicker v-model="date" label="With placeholder" placeholder="Pick a date" />
  </div>
</template>`,
    script: `<script setup>
import { ref } from 'vue'
import { AeDatepicker } from '@ae-package/design-system'

const date = ref(null)
<\/script>`
  },
  card: {
    template: `<template>
  <AeCard>
    <template #header>
      <h3>Card Title</h3>
    </template>
    <p>Card content goes here. You can put any content inside.</p>
    <template #footer>
      <AeButton variant="ghost">Cancel</AeButton>
      <AeButton>Submit</AeButton>
    </template>
  </AeCard>
</template>`,
    script: `<script setup>
import { AeCard, AeButton } from '@ae-package/design-system'
<\/script>`
  },
  dialog: {
    template: `<template>
  <AeButton @click="open = true">Open Dialog</AeButton>
  
  <AeDialog v-model="open" title="Confirm Action">
    <p>Are you sure you want to proceed?</p>
    <template #footer>
      <AeButton variant="ghost" @click="open = false">Cancel</AeButton>
      <AeButton @click="open = false">Confirm</AeButton>
    </template>
  </AeDialog>
</template>`,
    script: `<script setup>
import { ref } from 'vue'
import { AeDialog, AeButton } from '@ae-package/design-system'

const open = ref(false)
<\/script>`
  },
  drawer: {
    template: `<template>
  <AeButton @click="open = true">Open Drawer</AeButton>
  
  <AeDrawer v-model="open" title="Drawer Title" placement="right">
    <p>Drawer content goes here.</p>
    <template #footer>
      <AeButton @click="open = false">Close</AeButton>
    </template>
  </AeDrawer>
</template>`,
    script: `<script setup>
import { ref } from 'vue'
import { AeDrawer, AeButton } from '@ae-package/design-system'

const open = ref(false)
<\/script>`
  },
  dropdown: {
    template: `<template>
  <AeDropdown
    :items="[
      { label: 'Edit', onClick: () => {} },
      { label: 'Duplicate', onClick: () => {} },
      { type: 'divider' },
      { label: 'Delete', danger: true, onClick: () => {} }
    ]"
  >
    <AeButton>Actions</AeButton>
  </AeDropdown>
</template>`,
    script: `<script setup>
import { AeDropdown, AeButton } from '@ae-package/design-system'
<\/script>`
  },
  tooltip: {
    template: `<template>
  <div class="demo-row">
    <AeTooltip content="This is a tooltip">
      <AeButton>Hover me</AeButton>
    </AeTooltip>
    
    <AeTooltip content="Top tooltip" placement="top">
      <AeButton variant="outlined">Top</AeButton>
    </AeTooltip>
    
    <AeTooltip content="Bottom tooltip" placement="bottom">
      <AeButton variant="outlined">Bottom</AeButton>
    </AeTooltip>
  </div>
</template>`,
    script: `<script setup>
import { AeTooltip, AeButton } from '@ae-package/design-system'
<\/script>`
  },
  toast: {
    template: `<template>
  <div class="demo-row">
    <AeButton @click="toast.success('Success!')">Success</AeButton>
    <AeButton @click="toast.error('Error!')">Error</AeButton>
    <AeButton @click="toast.warning('Warning!')">Warning</AeButton>
    <AeButton @click="toast.info('Info!')">Info</AeButton>
  </div>
  
  <AeToastProvider />
</template>`,
    script: `<script setup>
import { AeButton, AeToastProvider, toast } from '@ae-package/design-system'
<\/script>`
  },
  progressbar: {
    template: `<template>
  <div class="demo-stack">
    <AeProgressBar :value="30" />
    <AeProgressBar :value="60" color="success" />
    <AeProgressBar :value="80" color="warning" show-label />
    <AeProgressBar indeterminate />
  </div>
</template>`,
    script: `<script setup>
import { AeProgressBar } from '@ae-package/design-system'
<\/script>`
  },
  badge: {
    template: `<template>
  <div class="demo-row">
    <AeBadge>Default</AeBadge>
    <AeBadge color="success">Success</AeBadge>
    <AeBadge color="warning" variant="soft">Warning</AeBadge>
    <AeBadge color="danger" variant="outlined">Danger</AeBadge>
    <AeBadge dot color="success" />
  </div>
</template>`,
    script: `<script setup>
import { AeBadge } from '@ae-package/design-system'
<\/script>`
  },
  avatar: {
    template: `<template>
  <div class="demo-row">
    <AeAvatar name="John Doe" />
    <AeAvatar name="Jane Smith" src="https://i.pravatar.cc/150" />
    <AeAvatar name="Bob" size="lg" />
    <AeAvatarGroup :max="3">
      <AeAvatar name="User 1" />
      <AeAvatar name="User 2" />
      <AeAvatar name="User 3" />
      <AeAvatar name="User 4" />
    </AeAvatarGroup>
  </div>
</template>`,
    script: `<script setup>
import { AeAvatar, AeAvatarGroup } from '@ae-package/design-system'
<\/script>`
  },
  table: {
    template: `<template>
  <AeTable
    :columns="[
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' }
    ]"
    :data="[
      { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
    ]"
  />
</template>`,
    script: `<script setup>
import { AeTable } from '@ae-package/design-system'
<\/script>`
  },
  empty: {
    template: `<template>
  <AeEmpty
    title="No results found"
    description="Try adjusting your search or filters."
  >
    <AeButton>Clear Filters</AeButton>
  </AeEmpty>
</template>`,
    script: `<script setup>
import { AeEmpty, AeButton } from '@ae-package/design-system'
<\/script>`
  },
  tabs: {
    template: `<template>
  <AeTabs
    v-model="activeTab"
    :tabs="[
      { key: 'tab1', label: 'Overview' },
      { key: 'tab2', label: 'Settings' },
      { key: 'tab3', label: 'Analytics' }
    ]"
  />
</template>`,
    script: `<script setup>
import { ref } from 'vue'
import { AeTabs } from '@ae-package/design-system'

const activeTab = ref('tab1')
<\/script>`
  },
  nav: {
    template: `<template>
  <AeNav
    :items="[
      { key: 'home', label: 'Home', href: '#' },
      { key: 'about', label: 'About', href: '#' },
      { key: 'products', label: 'Products', children: [
        { label: 'Software', href: '#' },
        { label: 'Hardware', href: '#' }
      ]}
    ]"
    title="Brand"
    active-key="home"
  />
</template>`,
    script: `<script setup>
import { AeNav } from '@ae-package/design-system'
<\/script>`
  },
  sidebar: {
    template: `<template>
  <AeSidebar
    :items="[
      { key: 'dashboard', label: 'Dashboard' },
      { key: 'users', label: 'Users' },
      { key: 'settings', label: 'Settings', children: [
        { key: 'general', label: 'General' },
        { key: 'security', label: 'Security' }
      ]}
    ]"
    title="Admin"
    active-key="dashboard"
  />
</template>`,
    script: `<script setup>
import { AeSidebar } from '@ae-package/design-system'
<\/script>`
  },
  breadcrumb: {
    template: `<template>
  <AeBreadcrumb
    :items="[
      { label: 'Home', href: '#' },
      { label: 'Products', href: '#' },
      { label: 'Category', href: '#' },
      { label: 'Current Page' }
    ]"
  />
</template>`,
    script: `<script setup>
import { AeBreadcrumb } from '@ae-package/design-system'
<\/script>`
  },
  pagination: {
    template: `<template>
  <AePagination
    v-model="page"
    :total="100"
    :per-page="10"
  />
</template>`,
    script: `<script setup>
import { ref } from 'vue'
import { AePagination } from '@ae-package/design-system'

const page = ref(1)
<\/script>`
  }
}

// State
const searchQuery = ref('')
const copiedCode = ref(false)
const sidebarOpen = ref(true)

// Active component from route
const activeComponent = computed(() => {
  return (route.params.component as string) || 'button'
})

// Filtered components based on search
const filteredComponents = computed(() => {
  if (!searchQuery.value) return components
  const query = searchQuery.value.toLowerCase()
  return components.filter(c => 
    c.name.toLowerCase().includes(query) ||
    c.description.toLowerCase().includes(query) ||
    c.category.toLowerCase().includes(query)
  )
})

// Group components by category
const groupedComponents = computed(() => {
  const groups: Record<string, typeof components> = {}
  filteredComponents.value.forEach(c => {
    if (!groups[c.category]) groups[c.category] = []
    groups[c.category].push(c)
  })
  return groups
})

// Current component
const currentComponent = computed(() => 
  components.find(c => c.key === activeComponent.value)
)

// Current code example
const currentCode = computed(() => 
  codeExamples[activeComponent.value] || { template: '<!-- No example available -->' }
)

// Full code
const fullCode = computed(() => {
  const { template, script } = currentCode.value
  return script ? `${script}\n\n${template}` : template
})

// Copy code to clipboard
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(fullCode.value)
    copiedCode.value = true
    setTimeout(() => {
      copiedCode.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Close sidebar on mobile after navigation
const handleNavClick = () => {
  if (window.innerWidth < 768) {
    sidebarOpen.value = false
  }
}

// Toggle sidebar
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

// Handle resize
const handleResize = () => {
  if (window.innerWidth >= 768) {
    sidebarOpen.value = true
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="docs-page">
    <!-- Header -->
    <header class="docs-header">
      <div class="docs-header__left">
        <button class="docs-header__toggle" @click="toggleSidebar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <div class="docs-header__brand">
          <span class="docs-header__logo">AE</span>
          <span class="docs-header__title">Design System</span>
        </div>
      </div>
      
      <div class="docs-header__search">
        <AeInput
          v-model="searchQuery"
          placeholder="Search components..."
          size="sm"
        >
          <template #prepend>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </template>
        </AeInput>
      </div>
      
      <div class="docs-header__actions">
        <AeBadge variant="soft" color="primary" rounded>v1.0.0</AeBadge>
      </div>
    </header>

    <div class="docs-body">
      <!-- Sidebar -->
      <aside class="docs-sidebar" :class="{ 'docs-sidebar--open': sidebarOpen }">
        <nav class="docs-nav">
          <div v-for="(items, category) in groupedComponents" :key="category" class="docs-nav__group">
            <h4 class="docs-nav__category">{{ category }}</h4>
            <ul class="docs-nav__list">
              <li v-for="item in items" :key="item.key">
                <router-link
                  :to="`/docs/${item.key}`"
                  class="docs-nav__link"
                  :class="{ 'docs-nav__link--active': activeComponent === item.key }"
                  @click="handleNavClick"
                >
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="docs-content">
        <div class="docs-content__header">
          <h1 class="docs-content__title">{{ currentComponent?.name }}</h1>
          <p class="docs-content__desc">{{ currentComponent?.description }}</p>
          <AeBadge variant="outlined" color="neutral" size="sm">{{ currentComponent?.category }}</AeBadge>
        </div>

        <!-- Live Preview -->
        <div class="docs-preview">
          <div class="docs-preview__header">
            <span class="docs-preview__label">Preview</span>
          </div>
          <div class="docs-preview__content">
            <!-- Button Preview -->
            <div v-if="activeComponent === 'button'" class="demo-row">
              <AeButton class="new new-2">Default</AeButton>
              <AeButton variant="outlined">
                <template #prepend>
                  123
                </template>
                Outlined
                <template #append>
                  456
                </template>
              </AeButton>
              <AeButton variant="text">Text</AeButton>
              <AeButton color="danger">Danger</AeButton>
              <AeButton disabled>Disabled</AeButton>
            </div>

            <!-- Input Preview -->
            <div v-else-if="activeComponent === 'input'" class="demo-stack">
              <AeInput placeholder="Enter text..." />
              <AeInput label="Email" type="email" placeholder="your@email.com" />
              <AeInput label="Password" type="password" />
              <AeInput label="Disabled" disabled value="Cannot edit" />
              <AeInput label="With Error" error="This field is required" />
            </div>

            <!-- Textarea Preview -->
            <div v-else-if="activeComponent === 'textarea'" class="demo-stack">
              <AeTextarea placeholder="Enter your message..." />
              <AeTextarea label="Description" :rows="4" />
            </div>

            <!-- Select Preview -->
            <div v-else-if="activeComponent === 'select'" class="demo-stack" style="max-width: 300px;">
              <AeSelect
                v-model="demoSelect"
                label="Choose option"
                :options="[
                  { label: 'Option 1', value: '1' },
                  { label: 'Option 2', value: '2' },
                  { label: 'Option 3', value: '3' }
                ]"
                placeholder="Select..."
              />
            </div>

            <!-- Checkbox Preview -->
            <div v-else-if="activeComponent === 'checkbox'" class="demo-stack">
              <AeCheckbox v-model="demoCheckbox1">Accept terms</AeCheckbox>
              <AeCheckbox v-model="demoCheckbox2">Receive updates</AeCheckbox>
              <AeCheckbox disabled>Disabled option</AeCheckbox>
            </div>

            <!-- Radio Preview -->
            <div v-else-if="activeComponent === 'radio'" class="demo-stack">
              <AeRadio v-model="demoRadio" value="free">Free Plan</AeRadio>
              <AeRadio v-model="demoRadio" value="pro">Pro Plan</AeRadio>
              <AeRadio v-model="demoRadio" value="enterprise">Enterprise</AeRadio>
            </div>

            <!-- Switch Preview -->
            <div v-else-if="activeComponent === 'switch'" class="demo-stack">
              <AeSwitch v-model="demoSwitch1">Enable notifications</AeSwitch>
              <AeSwitch v-model="demoSwitch2">Dark mode</AeSwitch>
              <AeSwitch disabled>Disabled</AeSwitch>
            </div>

            <!-- Field Preview -->
            <div v-else-if="activeComponent === 'field'" class="demo-stack" style="max-width: 400px;">
              <AeField label="Username" required hint="Choose a unique username">
                <AeInput placeholder="Enter username" />
              </AeField>
              <AeField label="Email" error="Invalid email address">
                <AeInput type="email" />
              </AeField>
            </div>

            <!-- Datepicker Preview -->
            <div v-else-if="activeComponent === 'datepicker'" class="demo-stack" style="max-width: 300px;">
              <AeDatepicker v-model="demoDate" label="Select date" placeholder="Pick a date" />
            </div>

            <!-- Card Preview -->
            <div v-else-if="activeComponent === 'card'" style="max-width: 400px;">
              <AeCard>
                <template #header>
                  <h3 style="margin: 0; font-size: 1rem;">Card Title</h3>
                </template>
                <p style="margin: 0;">Card content goes here. You can put any content inside.</p>
                <template #footer>
                  <div class="demo-row">
                    <AeButton variant="text" size="sm">Cancel</AeButton>
                    <AeButton size="sm">Submit</AeButton>
                  </div>
                </template>
              </AeCard>
            </div>

            <!-- Dialog Preview -->
            <div v-else-if="activeComponent === 'dialog'">
              <AeButton @click="demoDialog = true">Open Dialog</AeButton>
              <AeDialog v-model="demoDialog" title="Confirm Action">
                <p>Are you sure you want to proceed?</p>
                <template #footer>
                  <AeButton variant="text" @click="demoDialog = false">Cancel</AeButton>
                  <AeButton @click="demoDialog = false">Confirm</AeButton>
                </template>
              </AeDialog>
            </div>

            <!-- Drawer Preview -->
            <div v-else-if="activeComponent === 'drawer'">
              <AeButton @click="demoDrawer = true">Open Drawer</AeButton>
              <AeDrawer v-model="demoDrawer" title="Drawer Title" placement="right">
                <p>Drawer content goes here.</p>
                <template #footer>
                  <AeButton @click="demoDrawer = false">Close</AeButton>
                </template>
              </AeDrawer>
            </div>

            <!-- Dropdown Preview -->
            <div v-else-if="activeComponent === 'dropdown'">
              <AeDropdown
                :items="[
                  { label: 'Edit', onClick: () => {} },
                  { label: 'Duplicate', onClick: () => {} },
                  { divider: true },
                  { label: 'Delete', danger: true, onClick: () => {} }
                ]"
              >
<!--                <AeButton>Actions</AeButton>-->
              </AeDropdown>
            </div>

            <!-- Tooltip Preview -->
            <div v-else-if="activeComponent === 'tooltip'" class="demo-row">
              <AeTooltip content="This is a tooltip">
                <AeButton>Hover me</AeButton>
              </AeTooltip>
              <AeTooltip content="Top tooltip" placement="top">
                <AeButton variant="outlined">Top</AeButton>
              </AeTooltip>
              <AeTooltip content="Bottom tooltip" placement="bottom">
                <AeButton variant="outlined">Bottom</AeButton>
              </AeTooltip>
            </div>

            <!-- Toast Preview -->
            <div v-else-if="activeComponent === 'toast'" class="demo-row">
              <AeButton @click="toast.success('Success message!')">Success</AeButton>
              <AeButton @click="toast.error('Error message!')">Error</AeButton>
              <AeButton @click="toast.warning('Warning message!')">Warning</AeButton>
              <AeButton @click="toast.info('Info message!')">Info</AeButton>
            </div>

            <!-- ProgressBar Preview -->
            <div v-else-if="activeComponent === 'progressbar'" class="demo-stack">
              <AeProgressBar :value="30" />
              <AeProgressBar :value="60" color="success" />
              <AeProgressBar :value="80" color="warning" show-label />
            </div>

            <!-- Badge Preview -->
            <div v-else-if="activeComponent === 'badge'" class="demo-row">
              <AeBadge>Default</AeBadge>
              <AeBadge color="success">Success</AeBadge>
              <AeBadge color="warning" variant="soft">Warning</AeBadge>
              <AeBadge color="danger" variant="outlined">Danger</AeBadge>
              <AeBadge dot color="success" />
            </div>

            <!-- Avatar Preview -->
            <div v-else-if="activeComponent === 'avatar'" class="demo-row">
              <AeAvatar name="John Doe" />
              <AeAvatar name="Jane Smith" src="https://i.pravatar.cc/150?img=5" />
              <AeAvatar name="Bob" size="lg" />
              <AeAvatarGroup :max="3">
                <AeAvatar name="User 1" />
                <AeAvatar name="User 2" />
                <AeAvatar name="User 3" />
                <AeAvatar name="User 4" />
              </AeAvatarGroup>
            </div>

            <!-- Table Preview -->
            <div v-else-if="activeComponent === 'table'">
              <AeTable
                :columns="[
                  { key: 'name', label: 'Name', sortable: true },
                  { key: 'email', label: 'Email' },
                  { key: 'role', label: 'Role' }
                ]"
                :data="[
                  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
                  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
                ]"
              />
            </div>

            <!-- Empty Preview -->
            <div v-else-if="activeComponent === 'empty'">
              <AeEmpty
                title="No results found"
                description="Try adjusting your search or filters."
              >
                <AeButton>Clear Filters</AeButton>
              </AeEmpty>
            </div>

            <!-- Tabs Preview -->
            <div v-else-if="activeComponent === 'tabs'">
              <AeTabs
                v-model="demoTab"
                :tabs="[
                  { value: 'tab1', label: 'Overview' },
                  { value: 'tab2', label: 'Settings' },
                  { value: 'tab3', label: 'Analytics' }
                ]"
              />
            </div>

            <!-- Nav Preview -->
            <div v-else-if="activeComponent === 'nav'" class="demo-nav-wrapper">
              <AeNav
                :items="[
                  { key: 'home', label: 'Home', href: '#' },
                  { key: 'about', label: 'About', href: '#' },
                  { key: 'contact', label: 'Contact', href: '#' }
                ]"
                title="Brand"
                active-key="home"
                fluid
                hide-toggle
              />
            </div>

            <!-- Sidebar Preview -->
            <div v-else-if="activeComponent === 'sidebar'" class="demo-sidebar-wrapper">
              <AeSidebar
                :items="[
                  { key: 'dashboard', label: 'Dashboard' },
                  { key: 'users', label: 'Users' },
                  { key: 'settings', label: 'Settings' }
                ]"
                title="Admin"
                active-key="dashboard"
                :collapsible="false"
                :width="200"
              />
            </div>

            <!-- Breadcrumb Preview -->
            <BreadcrumbComponent v-else-if="activeComponent === 'breadcrumb'" />

            <!-- Pagination Preview -->
            <div v-else-if="activeComponent === 'pagination'">
              <AePagination
                v-model="demoPage"
                :total-pages="10"
              />
            </div>

            <!-- Fallback -->
            <div v-else class="demo-placeholder">
              <p>Preview not available</p>
            </div>
          </div>
        </div>

        <!-- Code Example -->
        <div class="docs-code">
          <div class="docs-code__header">
            <span class="docs-code__label">Code</span>
            <AeButton 
              size="sm" 
              variant="text"
              @click="copyCode"
            >
              <template v-if="copiedCode">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </template>
              <template v-else>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                Copy Code
              </template>
            </AeButton>
          </div>
          <div class="docs-code__content">
            <pre><code>{{ fullCode }}</code></pre>
          </div>
        </div>

        <!-- Installation Note -->
        <div class="docs-install">
          <h3>Installation</h3>
          <div class="docs-code docs-code--small">
            <div class="docs-code__header">
              <span class="docs-code__label">npm</span>
            </div>
            <div class="docs-code__content">
              <pre><code>npm install @ae-package/design-system</code></pre>
            </div>
          </div>
        </div>

        <!-- Import -->
        <div class="docs-install">
          <h3>Import</h3>
          <div class="docs-code docs-code--small">
            <div class="docs-code__content">
              <pre><code>import { Ae{{ currentComponent?.name }} } from '@ae-package/design-system'</code></pre>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- Mobile Overlay -->
    <div 
      v-if="sidebarOpen" 
      class="docs-overlay"
      @click="sidebarOpen = false"
    />

    <!-- Toast Provider -->
    <AeToastProvider />
  </div>
</template>

<style lang="scss" scoped>
.docs-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--sds-color-background-surface-default);
}

// ================================
// HEADER
// ================================
.docs-header {
  display: flex;
  align-items: center;
  gap: var(--sds-size-space-16);
  padding: var(--sds-size-space-12) var(--sds-size-space-24);
  background: var(--sds-color-background-surface-default);
  border-bottom: 1px solid var(--sds-color-border-default-secondary);
  position: sticky;
  top: 0;
  z-index: 100;

  &__left {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-12);
  }

  &__toggle {
    display: none;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--sds-color-text-default-secondary);
    cursor: pointer;
    border-radius: var(--sds-size-radius-100);

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
    }

    svg {
      width: 20px;
      height: 20px;
    }

    @media (max-width: 767px) {
      display: flex;
    }
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-10);
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: var(--sds-color-background-brand-default);
    color: white;
    font-weight: 700;
    font-size: 0.875rem;
    border-radius: var(--sds-size-radius-100);
  }

  &__title {
    font-weight: 600;
    color: var(--sds-color-text-default-primary);

    @media (max-width: 600px) {
      display: none;
    }
  }

  &__search {
    flex: 1;
    max-width: 400px;
  }

  &__actions {
    margin-left: auto;
  }
}

// ================================
// BODY
// ================================
.docs-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

// ================================
// SIDEBAR
// ================================
.docs-sidebar {
  width: 260px;
  background: var(--sds-color-background-surface-secondary);
  border-right: 1px solid var(--sds-color-border-default-secondary);
  overflow-y: auto;
  flex-shrink: 0;

  @media (max-width: 767px) {
    position: fixed;
    top: 61px;
    left: 0;
    bottom: 0;
    z-index: 99;
    transform: translateX(-100%);
    transition: transform 0.2s ease;

    &--open {
      transform: translateX(0);
    }
  }
}

.docs-nav {
  padding: var(--sds-size-space-16);

  &__group {
    margin-bottom: var(--sds-size-space-20);
  }

  &__category {
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--sds-color-text-default-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 var(--sds-size-space-8) 0;
    padding: 0 var(--sds-size-space-8);
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  &__link {
    display: block;
    width: 100%;
    padding: var(--sds-size-space-8) var(--sds-size-space-12);
    border: none;
    background: transparent;
    color: var(--sds-color-text-default-secondary);
    font-size: 0.875rem;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    border-radius: var(--sds-size-radius-100);
    transition: all 0.1s ease;

    &:hover {
      background: var(--sds-color-background-default-primary-hover);
      color: var(--sds-color-text-default-primary);
    }

    &--active {
      background: var(--sds-color-background-brand-secondary);
      color: var(--sds-color-text-brand-secondary);
      font-weight: 500;
    }
  }
}

// ================================
// CONTENT
// ================================
.docs-content {
  flex: 1;
  overflow-y: auto;
  padding: var(--sds-size-space-32);

  @media (max-width: 767px) {
    padding: var(--sds-size-space-20);
  }

  &__header {
    margin-bottom: var(--sds-size-space-32);
  }

  &__title {
    margin: 0 0 var(--sds-size-space-8) 0;
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--sds-color-text-default-primary);
  }

  &__desc {
    margin: 0 0 var(--sds-size-space-12) 0;
    color: var(--sds-color-text-default-secondary);
  }
}

// ================================
// PREVIEW
// ================================
.docs-preview {
  background: var(--sds-color-background-surface-default);
  border: 1px solid var(--sds-color-border-default-secondary);
  border-radius: var(--sds-size-radius-200);
  overflow: hidden;
  margin-bottom: var(--sds-size-space-16);

  &__header {
    display: flex;
    align-items: center;
    padding: var(--sds-size-space-8) var(--sds-size-space-16);
    background: var(--sds-color-background-surface-secondary);
    border-bottom: 1px solid var(--sds-color-border-default-secondary);
  }

  &__label {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--sds-color-text-default-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__content {
    padding: var(--sds-size-space-24);
    min-height: 120px;
    display: flex;
    align-items: flex-start;
  }
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sds-size-space-8);
  align-items: center;
}

.demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-12);
  width: 100%;
}

.demo-nav-wrapper {
  width: 100%;
  border: 1px solid var(--sds-color-border-default-secondary);
  border-radius: var(--sds-size-radius-100);
  overflow: hidden;
}

.demo-sidebar-wrapper {
  height: 200px;
  border: 1px solid var(--sds-color-border-default-secondary);
  border-radius: var(--sds-size-radius-100);
  overflow: hidden;
}

.demo-placeholder {
  color: var(--sds-color-text-default-tertiary);
  font-style: italic;
}

// ================================
// CODE BLOCK
// ================================
.docs-code {
  background: var(--sds-color-background-surface-tertiary);
  border: 1px solid var(--sds-color-border-default-secondary);
  border-radius: var(--sds-size-radius-200);
  overflow: hidden;
  margin-bottom: var(--sds-size-space-24);

  &--small {
    margin-bottom: var(--sds-size-space-16);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--sds-size-space-8) var(--sds-size-space-16);
    background: var(--sds-color-background-surface-secondary);
    border-bottom: 1px solid var(--sds-color-border-default-secondary);
  }

  &__label {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--sds-color-text-default-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__content {
    padding: var(--sds-size-space-16);
    overflow-x: auto;

    pre {
      margin: 0;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
      font-size: 0.8125rem;
      line-height: 1.6;
    }

    code {
      color: var(--sds-color-text-default-secondary);
    }
  }
}

// ================================
// INSTALL SECTION
// ================================
.docs-install {
  margin-bottom: var(--sds-size-space-24);

  h3 {
    margin: 0 0 var(--sds-size-space-12) 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--sds-color-text-default-primary);
  }
}

// ================================
// OVERLAY
// ================================
.docs-overlay {
  display: none;

  @media (max-width: 767px) {
    display: block;
    position: fixed;
    inset: 61px 0 0 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 98;
  }
}
</style>

