<script setup lang="ts">
import { ref, h } from 'vue'
import { AeSidebar, AeButton, AeAvatar, type SidebarItem } from "@/components"

// Collapsed state
const collapsed = ref(false)
const activeKey = ref('dashboard')
const mobileOpen = ref(false)

// Icon components (simple SVG icons)
const DashboardIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('rect', { x: '3', y: '3', width: '7', height: '9', rx: '1' }),
  h('rect', { x: '14', y: '3', width: '7', height: '5', rx: '1' }),
  h('rect', { x: '14', y: '12', width: '7', height: '9', rx: '1' }),
  h('rect', { x: '3', y: '16', width: '7', height: '5', rx: '1' })
])

const UsersIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('path', { d: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' }),
  h('circle', { cx: '9', cy: '7', r: '4' }),
  h('path', { d: 'M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' })
])

const FolderIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('path', { d: 'M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z' })
])

const SettingsIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('circle', { cx: '12', cy: '12', r: '3' }),
  h('path', { d: 'M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z' })
])

const ChartIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('line', { x1: '18', y1: '20', x2: '18', y2: '10' }),
  h('line', { x1: '12', y1: '20', x2: '12', y2: '4' }),
  h('line', { x1: '6', y1: '20', x2: '6', y2: '14' })
])

const HelpIcon = h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [
  h('circle', { cx: '12', cy: '12', r: '10' }),
  h('path', { d: 'M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3' }),
  h('line', { x1: '12', y1: '17', x2: '12.01', y2: '17' })
])

// Basic navigation items
const basicItems: SidebarItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { key: 'users', label: 'Users', icon: UsersIcon, badge: '12' },
  { key: 'projects', label: 'Projects', icon: FolderIcon },
  { key: 'analytics', label: 'Analytics', icon: ChartIcon },
  { key: 'settings', label: 'Settings', icon: SettingsIcon }
]

// Items with nested children
const nestedItems: SidebarItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { 
    key: 'users', 
    label: 'Users', 
    icon: UsersIcon,
    badge: '12',
    children: [
      { key: 'all-users', label: 'All Users' },
      { key: 'add-user', label: 'Add User' },
      { key: 'user-roles', label: 'User Roles' }
    ]
  },
  { 
    key: 'projects', 
    label: 'Projects', 
    icon: FolderIcon,
    children: [
      { key: 'active', label: 'Active Projects', badge: '5' },
      { key: 'archived', label: 'Archived' }
    ]
  },
  { key: 'analytics', label: 'Analytics', icon: ChartIcon },
  { key: 'settings', label: 'Settings', icon: SettingsIcon },
  { key: 'help', label: 'Help & Support', icon: HelpIcon }
]

const handleItemClick = (item: SidebarItem) => {
  activeKey.value = item.key || item.label
}

const toggleMobile = () => {
  mobileOpen.value = !mobileOpen.value
}
</script>

<template>
  <section class="demo-stack">
    <div class="demo-grid demo-grid--sidebar">
      <!-- Basic Sidebar -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Basic Sidebar</h3>
        </template>
        <div class="sidebar-demo">
          <AeSidebar
            :items="basicItems"
            :active-key="activeKey"
            :collapsible="false"
            @item-click="handleItemClick"
          />
          <div class="sidebar-demo__content">
            <p>Active: <strong>{{ activeKey }}</strong></p>
          </div>
        </div>
      </AeCard>

      <!-- Collapsible Sidebar -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Collapsible</h3>
        </template>
        <div class="sidebar-demo">
          <AeSidebar
            :items="basicItems"
            :active-key="activeKey"
            v-model:collapsed="collapsed"
            title="My App"
            @item-click="handleItemClick"
          />
          <div class="sidebar-demo__content">
            <p>Collapsed: <strong>{{ collapsed }}</strong></p>
            <AeButton size="sm" variant="outlined" @click="collapsed = !collapsed">
              Toggle Collapse
            </AeButton>
          </div>
        </div>
      </AeCard>

      <!-- Nested Menu -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Nested Menu</h3>
        </template>
        <div class="sidebar-demo sidebar-demo--tall">
          <AeSidebar
            :items="nestedItems"
            :active-key="activeKey"
            title="Admin"
            :collapsible="false"
            @item-click="handleItemClick"
          />
          <div class="sidebar-demo__content">
            <p>Active: <strong>{{ activeKey }}</strong></p>
            <p class="demo-info">Click items with arrows to expand</p>
          </div>
        </div>
      </AeCard>

      <!-- With Header & Footer Slots -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Custom Header & Footer</h3>
        </template>
        <div class="sidebar-demo sidebar-demo--tall">
          <AeSidebar
            :items="basicItems"
            :active-key="activeKey"
            :collapsible="false"
            @item-click="handleItemClick"
          >
            <template #header>
              <div class="custom-header">
                <div class="custom-header__logo">
                  <svg xmlns="http://www.w3.org/2000/svg" width="33" height="22" viewBox="0 0 33 22" fill="none">
                    <path d="M22.7891 7.72852L23.1025 8.25391H23.1074V8.25293L28.7061 6.64648L32.3525 9.39844L29.959 8.75781L25.2109 11.7314L25.2129 11.7344L31.3672 21.9414H25.3115L25.1826 16.8008L23.4307 21.9414L20.4258 18.3184C21.8986 16.3758 23.9042 13.5932 25.0586 11.8291C25.0598 11.8273 25.0603 11.825 25.0615 11.8232L25.0527 11.8291L23.2773 12.9424V12.9365L25.1533 11.6719H25.1523L23.2764 12.9365L18.5801 16.1025L14.6934 18.7227L9.92676 21.9414H0L4.74219 13.9033H16.7188L14.2256 10.8994L14.2559 10.8945L13.8076 10.3535L19.1123 9.25098L12.335 8.5791L8.17578 3.57031L17.8936 6.12207L5.29883 0H18.127L22.7891 7.72852Z" fill="white"/>
                  </svg>
                </div>
                <span class="custom-header__title ae-typo-single-line-body-base-strong">Workspace</span>
              </div>
            </template>
            <template #footer>
              <div class="custom-footer">
                <AeAvatar initials="JD" size="sm" />
                <div class="custom-footer__info">
                  <span class="ae-typo-single-line-body-small-strong">John Doe</span>
                  <span class="ae-typo-note">Admin</span>
                </div>
              </div>
            </template>
          </AeSidebar>
          <div class="sidebar-demo__content">
            <p>Custom slots for header and footer</p>
          </div>
        </div>
      </AeCard>

      <!-- Mobile Overlay -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Mobile Overlay</h3>
        </template>
        <div class="sidebar-demo sidebar-demo--mobile">
          <AeButton size="sm" @click="toggleMobile">
            {{ mobileOpen ? 'Close' : 'Open' }} Menu
          </AeButton>
          <p class="demo-info">Opens as overlay with backdrop</p>
          
          <AeSidebar
            :items="nestedItems"
            :active-key="activeKey"
            v-model:open="mobileOpen"
            title="Mobile Menu"
            overlay
            @item-click="handleItemClick"
          />
        </div>
      </AeCard>

      <!-- Custom Width -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Custom Width</h3>
        </template>
        <div class="sidebar-demo">
          <AeSidebar
            :items="basicItems"
            :active-key="activeKey"
            title="Narrow"
            :width="200"
            :collapsed-width="48"
            @item-click="handleItemClick"
          />
          <div class="sidebar-demo__content">
            <p>Width: 200px</p>
            <p>Collapsed: 48px</p>
          </div>
        </div>
      </AeCard>
    </div>
  </section>
</template>

<style scoped>
.demo-stack {
  overflow: auto;
  height: 1000px !important;
}

.demo-grid--sidebar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--sds-size-space-24);
}

.sidebar-demo {
  display: flex;
  height: 320px;
  border: 1px solid var(--sds-color-border-default-secondary);
  border-radius: var(--sds-size-radius-100);
  overflow: hidden;
  background: var(--sds-color-background-surface-tertiary);
}

.sidebar-demo--tall {
  height: 400px;
}

.sidebar-demo--mobile {
  flex-direction: column;
  align-items: flex-start;
  gap: var(--sds-size-space-12);
  padding: var(--sds-size-space-16);
  height: auto;
}

.sidebar-demo__content {
  flex: 1;
  padding: var(--sds-size-space-16);
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-12);
  color: var(--sds-color-text-primary-default);
}

.demo-info {
  color: var(--sds-color-text-primary-tertiary);
  font-size: 0.875rem;
  margin: 0;
}

.custom-header {
  display: flex;
  align-items: center;
  gap: var(--sds-size-space-12);
  color: var(--sds-color-text-brand-secondary);
}

.custom-header__logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-header__title {
  color: var(--sds-color-text-primary-default);
}

.custom-footer {
  display: flex;
  align-items: center;
  gap: var(--sds-size-space-12);
}

.custom-footer__info {
  display: flex;
  flex-direction: column;
  color: var(--sds-color-text-primary-default);
}

.custom-footer__info .ae-typo-note {
  color: var(--sds-color-text-primary-tertiary);
}
</style>
