<script setup lang="ts">
import { ref, computed } from 'vue'
import { AeTable, AeButton } from "@/components"
import type { TableColumn } from "@/components"

// Sample data
const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role', align: 'center' },
  { key: 'status', label: 'Status', width: '120px', align: 'center' }
]

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Viewer', status: 'Pending' }
]

// Selection state
const selectedRows = ref<typeof users>([])

// Sort state
const sortedData = ref([...users])

const handleSort = (key: string, order: 'asc' | 'desc') => {
  sortedData.value = [...users].sort((a, b) => {
    const aVal = a[key as keyof typeof a]
    const bVal = b[key as keyof typeof b]
    if (order === 'asc') {
      return aVal > bVal ? 1 : -1
    }
    return aVal < bVal ? 1 : -1
  })
}

// Row click
const clickedRow = ref<string | null>(null)

const handleRowClick = (row: Record<string, any>) => {
  clickedRow.value = row.name
}

// Loading state
const isLoading = ref(false)

const simulateLoading = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

// Pagination state
const allUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Viewer', status: 'Pending' },
  { id: 6, name: 'David Lee', email: 'david@example.com', role: 'User', status: 'Active' },
  { id: 7, name: 'Emma Davis', email: 'emma@example.com', role: 'Admin', status: 'Active' },
  { id: 8, name: 'Frank Miller', email: 'frank@example.com', role: 'Editor', status: 'Inactive' },
  { id: 9, name: 'Grace Kim', email: 'grace@example.com', role: 'User', status: 'Active' },
  { id: 10, name: 'Henry Wang', email: 'henry@example.com', role: 'Viewer', status: 'Pending' },
  { id: 11, name: 'Ivy Chen', email: 'ivy@example.com', role: 'User', status: 'Active' },
  { id: 12, name: 'Jack Taylor', email: 'jack@example.com', role: 'Editor', status: 'Active' }
]

const currentPage = ref(1)
const perPage = ref(5)

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  const end = start + perPage.value
  return allUsers.slice(start, end)
})
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Table</h2>
    <p class="demo-section__desc">Display data in rows and columns with sorting, selection, and custom cells.</p>

    <div class="">
      <!-- Basic Table -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Basic</h3>
        </template>
        <AeTable :columns="columns" :data="users" />
      </AeCard>

      <!-- Striped & Bordered -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Striped & Bordered</h3>
        </template>
        <AeTable :columns="columns" :data="users" striped bordered />
      </AeCard>

      <!-- Selectable -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Selectable</h3>
        </template>
        <div class="demo-stack">
          <AeTable 
            :columns="columns" 
            :data="users" 
            selectable
            v-model:selected-rows="selectedRows"
            row-key="id"
          />
          <p class="demo-info">
            Selected: {{ selectedRows.length }} row(s)
            <template v-if="selectedRows.length">
              — {{ selectedRows.map(r => r.name).join(', ') }}
            </template>
          </p>
        </div>
      </AeCard>

      <!-- Sortable -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Sortable</h3>
        </template>
        <AeTable 
          :columns="columns" 
          :data="sortedData" 
          @sort="handleSort"
        />
      </AeCard>

      <!-- Custom Cells -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Custom Cells</h3>
        </template>
        <AeTable :columns="columns" :data="users">
          <template #cell-status="{ value }">
            <span :class="['status-badge', `status-badge--${value.toLowerCase()}`]">
              {{ value }}
            </span>
          </template>
          <template #cell-role="{ value }">
            <span class="role-tag">{{ value }}</span>
          </template>
        </AeTable>
      </AeCard>

      <!-- Row Click -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Row Clickable</h3>
        </template>
        <div class="demo-stack">
          <AeTable 
            :columns="columns" 
            :data="users" 
            row-clickable
            @row-click="handleRowClick"
          />
          <p class="demo-info">
            <template v-if="clickedRow">
              Clicked: {{ clickedRow }}
            </template>
            <template v-else>
              Click a row to see the event
            </template>
          </p>
        </div>
      </AeCard>

      <!-- Sizes -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Sizes</h3>
        </template>
        <div class="demo-stack demo-stack--lg">
          <div>
            <p class="demo-label">Small:</p>
            <AeTable :columns="columns" :data="users.slice(0, 2)" size="sm" />
          </div>
          <div>
            <p class="demo-label">Medium (default):</p>
            <AeTable :columns="columns" :data="users.slice(0, 2)" size="md" />
          </div>
          <div>
            <p class="demo-label">Large:</p>
            <AeTable :columns="columns" :data="users.slice(0, 2)" size="lg" />
          </div>
        </div>
      </AeCard>

      <!-- Loading State -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Loading</h3>
        </template>
        <div class="demo-stack">
          <AeButton size="sm" @click="simulateLoading">Load Data</AeButton>
          <AeTable :columns="columns" :data="users" :loading="isLoading" />
        </div>
      </AeCard>

      <!-- Empty State -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Empty State</h3>
        </template>
        <AeTable :columns="columns" :data="[]" empty-text="No users found" />
      </AeCard>

      <!-- Custom Empty Slot -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Custom Empty</h3>
        </template>
        <AeTable :columns="columns" :data="[]">
          <template #empty>
            <div class="custom-empty">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
              <p>No users in the system</p>
              <AeButton size="sm">Add User</AeButton>
            </div>
          </template>
        </AeTable>
      </AeCard>

      <!-- With Footer Pagination -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With Footer (Pagination)</h3>
        </template>
        <div class="demo-stack">
          <AeTable 
            :columns="columns" 
            :data="paginatedUsers"
            show-footer
            :total="allUsers.length"
            v-model:current-page="currentPage"
            v-model:per-page="perPage"
            :per-page-options="[5, 10, 25]"
          />
          <p class="demo-info">
            Page {{ currentPage }}, showing {{ perPage }} per page, total {{ allUsers.length }} items
          </p>
        </div>
      </AeCard>
    </div>
  </section>
</template>

<style scoped>
.demo-stack {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-16);
}

.demo-stack--lg {
  gap: var(--sds-size-space-24);
}

.demo-info {
  color: var(--sds-color-text-tertiary-default);
  font-size: 0.875rem;
  margin: 0;
}

.demo-label {
  color: var(--sds-color-text-default-tertiary);
  font-size: 0.875rem;
  margin: 0 0 var(--sds-size-space-8) 0;
}

.status-badge {
  display: inline-flex;
  padding: var(--sds-size-space-4) var(--sds-size-space-8);
  border-radius: var(--sds-size-radius-full);
  font-size: 0.75rem;
  font-weight: 500;

  &--active {
    background: var(--sds-color-background-positive-secondary);
    color: var(--sds-color-text-positive-primary);
  }

  &--inactive {
    background: var(--sds-color-background-default-secondary);
    color: var(--sds-color-text-default-tertiary);
  }

  &--pending {
    background: var(--sds-color-background-warning-secondary);
    color: var(--sds-color-text-warning-primary);
  }
}

.role-tag {
  display: inline-flex;
  padding: var(--sds-size-space-2) var(--sds-size-space-8);
  background: var(--sds-color-background-brand-secondary);
  color: var(--sds-color-text-brand-secondary);
  border-radius: var(--sds-size-radius-50);
  font-size: 0.75rem;
}

.custom-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sds-size-space-12);
  padding: var(--sds-size-space-24);
  color: var(--sds-color-text-tertiary-default);

  svg {
    opacity: 0.5;
  }

  p {
    margin: 0;
  }
}
</style>
