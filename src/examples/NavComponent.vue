<script setup lang="ts">
import { ref, h } from 'vue'
import { AeNav, AeButton, AeAvatar, AeBadge } from "@/components"
import type { NavItem } from "@/components"

// Active navigation state
const activeKey = ref('home')

// Basic navigation items
const basicItems: NavItem[] = [
  { key: 'home', label: 'Home', href: '#' },
  { key: 'about', label: 'About', href: '#' },
  { key: 'services', label: 'Services', href: '#' },
  { key: 'contact', label: 'Contact', href: '#' }
]

// Navigation with dropdowns
const dropdownItems: NavItem[] = [
  { key: 'home', label: 'Home', href: '#' },
  { 
    key: 'products', 
    label: 'Products',
    children: [
      { key: 'software', label: 'Software', href: '#' },
      { key: 'hardware', label: 'Hardware', href: '#' },
      { key: 'services', label: 'Services', href: '#' }
    ]
  },
  { 
    key: 'resources', 
    label: 'Resources',
    children: [
      { key: 'docs', label: 'Documentation', description: 'Learn how to use our products', href: '#' },
      { key: 'api', label: 'API Reference', description: 'Detailed API documentation', href: '#' },
      { key: 'guides', label: 'Guides', description: 'Step-by-step tutorials', href: '#' }
    ]
  },
  { key: 'pricing', label: 'Pricing', href: '#' }
]

// Navigation with icons
const HomeIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('path', { d: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' }),
  h('polyline', { points: '9 22 9 12 15 12 15 22' })
])

const UsersIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('path', { d: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' }),
  h('circle', { cx: '9', cy: '7', r: '4' }),
  h('path', { d: 'M23 21v-2a4 4 0 00-3-3.87' }),
  h('path', { d: 'M16 3.13a4 4 0 010 7.75' })
])

const SettingsIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('circle', { cx: '12', cy: '12', r: '3' }),
  h('path', { d: 'M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z' })
])

const iconItems: NavItem[] = [
  { key: 'home', label: 'Home', href: '#', icon: HomeIcon },
  { key: 'team', label: 'Team', href: '#', icon: UsersIcon },
  { key: 'settings', label: 'Settings', href: '#', icon: SettingsIcon }
]

// Navigation with badges
const badgeItems: NavItem[] = [
  { key: 'home', label: 'Home', href: '#' },
  { key: 'inbox', label: 'Inbox', href: '#', badge: 5 },
  { key: 'notifications', label: 'Notifications', href: '#', badge: '99+' },
  { key: 'settings', label: 'Settings', href: '#' }
]

const handleItemClick = (item: NavItem) => {
  activeKey.value = item.key || item.label
  console.log('Nav item clicked:', item)
}
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Navigation</h2>
    <p class="demo-section__desc">Horizontal navigation bar for top-level site navigation.</p>

    <div class="demo-stack">
      <!-- Basic Navigation -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Basic Navigation</h3>
        </template>
        <div class="nav-demo">
          <AeNav 
            :items="basicItems" 
            :active-key="activeKey"
            title="Brand"
            fluid
            @item-click="handleItemClick"
          />
        </div>
      </AeCard>

      <!-- With Logo -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With Logo</h3>
        </template>
        <div class="nav-demo">
          <AeNav 
            :items="basicItems"
            :active-key="activeKey"
            logo="https://via.placeholder.com/32"
            title="Acme Inc"
            fluid
            @item-click="handleItemClick"
          />
        </div>
      </AeCard>

      <!-- With Dropdowns -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With Dropdowns</h3>
        </template>
        <div class="nav-demo nav-demo--tall">
          <AeNav 
            :items="dropdownItems"
            active-key="home"
            title="Products Co"
            fluid
            @item-click="handleItemClick"
          />
        </div>
        <p class="demo-info">Hover over "Products" or "Resources" to see dropdown menus.</p>
      </AeCard>

      <!-- With Icons -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With Icons</h3>
        </template>
        <div class="nav-demo">
          <AeNav 
            :items="iconItems"
            active-key="home"
            title="Admin"
            fluid
            @item-click="handleItemClick"
          />
        </div>
      </AeCard>

      <!-- With Badges -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With Badges</h3>
        </template>
        <div class="nav-demo">
          <AeNav 
            :items="badgeItems"
            active-key="home"
            title="Dashboard"
            fluid
            @item-click="handleItemClick"
          />
        </div>
      </AeCard>

      <!-- With Actions -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With Actions</h3>
        </template>
        <div class="nav-demo">
          <AeNav 
            :items="basicItems"
            :active-key="activeKey"
            title="MyApp"
            fluid
            @item-click="handleItemClick"
          >
            <template #actions>
              <AeButton variant="ghost" size="sm">Sign In</AeButton>
              <AeButton size="sm">Get Started</AeButton>
            </template>
          </AeNav>
        </div>
      </AeCard>

      <!-- With User Menu -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With User Menu</h3>
        </template>
        <div class="nav-demo">
          <AeNav 
            :items="basicItems"
            :active-key="activeKey"
            title="Platform"
            fluid
            @item-click="handleItemClick"
          >
            <template #actions>
              <AeBadge color="success" variant="soft" rounded size="sm">Pro</AeBadge>
              <AeAvatar 
                name="John Doe" 
                size="sm"
                src="https://i.pravatar.cc/150?img=3"
              />
            </template>
          </AeNav>
        </div>
      </AeCard>

      <!-- Variants -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Variants</h3>
        </template>
        <div class="demo-stack">
          <div class="nav-demo">
            <AeNav 
              :items="basicItems"
              active-key="home"
              title="Default"
              variant="default"
              fluid
            />
          </div>
          <div class="nav-demo">
            <AeNav 
              :items="basicItems"
              active-key="home"
              title="Bordered"
              variant="bordered"
              fluid
            />
          </div>
          <div class="nav-demo">
            <AeNav 
              :items="basicItems"
              active-key="home"
              title="Elevated"
              variant="elevated"
              fluid
            />
          </div>
        </div>
      </AeCard>

      <!-- Centered Navigation -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Centered Navigation</h3>
        </template>
        <div class="nav-demo">
          <AeNav 
            :items="basicItems"
            :active-key="activeKey"
            title="Centered"
            centered
            fluid
            @item-click="handleItemClick"
          >
            <template #actions>
              <AeButton size="sm">Sign Up</AeButton>
            </template>
          </AeNav>
        </div>
      </AeCard>

      <!-- Custom Brand -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Custom Brand Slot</h3>
        </template>
        <div class="nav-demo">
          <AeNav 
            :items="basicItems"
            :active-key="activeKey"
            fluid
            @item-click="handleItemClick"
          >
            <template #brand>
              <a href="#" class="custom-brand">
                <div class="custom-brand__icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                </div>
                <div class="custom-brand__text">
                  <span class="custom-brand__name">LayerStack</span>
                  <span class="custom-brand__tag">Beta</span>
                </div>
              </a>
            </template>
          </AeNav>
        </div>
      </AeCard>

      <!-- Max Width -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Max Width (960px)</h3>
        </template>
        <div class="nav-demo nav-demo--full">
          <AeNav 
            :items="basicItems"
            :active-key="activeKey"
            title="Contained"
            :max-width="960"
            @item-click="handleItemClick"
          />
        </div>
        <p class="demo-info">Navigation content is constrained to 960px max-width.</p>
      </AeCard>

      <!-- Sticky Note -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Fixed / Sticky</h3>
        </template>
        <div class="demo-info-box">
          <p>Use <code>fixed</code> prop to fix the navigation to the top of the viewport.</p>
          <p>Use <code>sticky</code> prop for sticky positioning that stays at top when scrolling.</p>
          <p class="demo-note">Not demonstrated here to avoid affecting the page layout.</p>
        </div>
      </AeCard>
    </div>
  </section>
</template>

<style scoped>
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-24);
}

.demo-info {
  color: var(--sds-color-text-default-tertiary);
  font-size: 0.875rem;
  margin: var(--sds-size-space-12) 0 0 0;
}

.demo-note {
  font-style: italic;
  margin-top: var(--sds-size-space-8);
}

.nav-demo {
  border: 1px solid var(--sds-color-border-default-secondary);
  border-radius: var(--sds-size-radius-100);
  overflow: hidden;
  position: relative;
}

.nav-demo--tall {
  min-height: 200px;
}

.nav-demo--full {
  background: var(--sds-color-background-surface-secondary);
}

.demo-info-box {
  padding: var(--sds-size-space-16);
  background: var(--sds-color-background-surface-secondary);
  border-radius: var(--sds-size-radius-100);
}

.demo-info-box p {
  margin: 0 0 var(--sds-size-space-8) 0;
  color: var(--sds-color-text-default-secondary);
  font-size: 0.875rem;
}

.demo-info-box p:last-child {
  margin-bottom: 0;
}

.demo-info-box code {
  padding: 2px 6px;
  background: var(--sds-color-background-surface-tertiary);
  border-radius: var(--sds-size-radius-50);
  font-size: 0.8125rem;
}

/* Custom Brand Styles */
.custom-brand {
  display: flex;
  align-items: center;
  gap: var(--sds-size-space-10);
  text-decoration: none;
  color: inherit;
}

.custom-brand__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--sds-color-background-brand-default), var(--sds-color-background-positive-default));
  border-radius: var(--sds-size-radius-100);
  color: white;
}

.custom-brand__icon svg {
  width: 20px;
  height: 20px;
}

.custom-brand__text {
  display: flex;
  align-items: center;
  gap: var(--sds-size-space-8);
}

.custom-brand__name {
  font-weight: 600;
  color: var(--sds-color-text-default-primary);
}

.custom-brand__tag {
  padding: 2px 6px;
  background: var(--sds-color-background-warning-secondary);
  color: var(--sds-color-text-warning-primary);
  font-size: 0.625rem;
  font-weight: 600;
  border-radius: var(--sds-size-radius-full);
  text-transform: uppercase;
}
</style>
