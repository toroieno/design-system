<template>
  <div class="ae-table-wrapper" :class="wrapperClasses">
    <!-- Loading Overlay -->
    <div v-if="loading" class="ae-table__loading">
      <div class="ae-table__spinner" />
    </div>

    <table class="ae-table">
      <!-- Header -->
      <thead v-if="!hideHeader" class="ae-table__head">
        <tr>
          <th v-if="selectable" class="ae-table__cell ae-table__cell--checkbox">
            <AeCheckbox
              :model-value="isAllSelected"
              :indeterminate="isIndeterminate"
              @update:model-value="toggleSelectAll"
            />
          </th>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="[
              'ae-table__cell',
              'ae-table__cell--header',
              'ae-text-single-line-body-small-strong',
              {
                'ae-table__cell--sortable': column.sortable,
                'ae-table__cell--sorted': sortKey === column.key
              }
            ]"
            :style="{ width: column.width, textAlign: column.align }"
            @click="column.sortable && handleSort(column.key)"
          >
            <span class="ae-table__header-content">
              {{ column.label }}
              <span v-if="column.sortable" class="ae-table__sort-icon">
                <svg v-if="sortKey !== column.key" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
                </svg>
                <svg v-else-if="sortOrder === 'asc'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 14l5-5 5 5" />
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 10l5 5 5-5" />
                </svg>
              </span>
            </span>
          </th>
        </tr>
      </thead>

      <!-- Body -->
      <tbody class="ae-table__body">
        <template v-if="data.length > 0">
          <tr
            v-for="(row, rowIndex) in data"
            :key="rowKey ? row[rowKey] : rowIndex"
            :class="[
              'ae-table__row',
              {
                'ae-table__row--selected': isRowSelected(row),
                'ae-table__row--clickable': rowClickable
              }
            ]"
            @click="handleRowClick(row, rowIndex)"
          >
            <td v-if="selectable" class="ae-table__cell ae-table__cell--checkbox">
              <AeCheckbox
                :model-value="isRowSelected(row)"
                @update:model-value="toggleRowSelect(row)"
                @click.stop
              />
            </td>
            <td
              v-for="column in columns"
              :key="column.key"
              class="ae-table__cell ae-text-body-base"
              :style="{ textAlign: column.align }"
            >
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]" :index="rowIndex">
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
        </template>

        <!-- Empty State -->
        <tr v-else class="ae-table__row ae-table__row--empty">
          <td :colspan="totalColumns" class="ae-table__cell ae-table__cell--empty">
            <slot name="empty">
              <div class="ae-table__empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <span class="ae-text-single-line-body-small-strong">{{ emptyText }}</span>
              </div>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Footer -->
    <div v-if="showFooter" class="ae-table__footer">
      <slot name="footer">
        <!-- Per Page Selector -->
        <div class="ae-table__footer-left">
          <span class="ae-table__footer-label ae-text-body-small">Rows per page:</span>
          <select 
            class="ae-table__per-page" 
            :value="perPage"
            @change="handlePerPageChange"
          >
            <option v-for="option in perPageOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <!-- Info & Pagination -->
        <div class="ae-table__footer-right">
          <!-- Range Info -->
          <span class="ae-table__footer-info ae-text-body-small">
            {{ rangeStart }}-{{ rangeEnd }} of {{ total }}
          </span>

          <!-- Navigation Buttons -->
          <div class="ae-table__footer-nav">
            <button
              class="ae-table__nav-btn"
              :disabled="isFirstPage"
              @click="goToPage(1)"
              aria-label="First page"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
              </svg>
            </button>
            <button
              class="ae-table__nav-btn"
              :disabled="isFirstPage"
              @click="goToPage(currentPage - 1)"
              aria-label="Previous page"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              class="ae-table__nav-btn"
              :disabled="isLastPage"
              @click="goToPage(currentPage + 1)"
              aria-label="Next page"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <button
              class="ae-table__nav-btn"
              :disabled="isLastPage"
              @click="goToPage(totalPages)"
              aria-label="Last page"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
              </svg>
            </button>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { AeCheckbox } from '@/components'

export interface TableColumn {
  key: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
}

export interface AeTableProps {
  columns: TableColumn[]
  data: Record<string, any>[]
  rowKey?: string
  selectable?: boolean
  selectedRows?: Record<string, any>[]
  striped?: boolean
  bordered?: boolean
  hoverable?: boolean
  stickyHeader?: boolean
  hideHeader?: boolean
  loading?: boolean
  emptyText?: string
  size?: 'sm' | 'md' | 'lg'
  rowClickable?: boolean
  // Footer / Pagination props
  showFooter?: boolean
  total?: number
  currentPage?: number
  perPage?: number
  perPageOptions?: number[]
}

const props = withDefaults(defineProps<AeTableProps>(), {
  selectable: false,
  selectedRows: () => [],
  striped: false,
  bordered: false,
  hoverable: true,
  stickyHeader: false,
  hideHeader: false,
  loading: false,
  emptyText: 'No data available',
  size: 'md',
  rowClickable: false,
  // Footer defaults
  showFooter: false,
  total: 0,
  currentPage: 1,
  perPage: 10,
  perPageOptions: () => [5, 10, 25, 50, 100]
})

const emit = defineEmits<{
  'update:selectedRows': [rows: Record<string, any>[]]
  'update:currentPage': [page: number]
  'update:perPage': [perPage: number]
  'sort': [key: string, order: 'asc' | 'desc']
  'row-click': [row: Record<string, any>, index: number]
  'page-change': [page: number]
  'per-page-change': [perPage: number]
}>()

const sortKey = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc'>('asc')

const wrapperClasses = computed(() => [
  `ae-table--${props.size}`,
  {
    'ae-table--striped': props.striped,
    'ae-table--bordered': props.bordered,
    'ae-table--hoverable': props.hoverable,
    'ae-table--sticky-header': props.stickyHeader,
    'ae-table--loading': props.loading
  }
])

const totalColumns = computed(() => {
  return props.columns.length + (props.selectable ? 1 : 0)
})

// Selection
const isAllSelected = computed(() => {
  if (props.data.length === 0) return false
  return props.selectedRows.length === props.data.length
})

const isIndeterminate = computed(() => {
  return props.selectedRows.length > 0 && props.selectedRows.length < props.data.length
})

const isRowSelected = (row: Record<string, any>) => {
  if (!props.rowKey) {
    return props.selectedRows.includes(row)
  }
  return props.selectedRows.some(r => r[props.rowKey!] === row[props.rowKey!])
}

const toggleSelectAll = (checked: boolean | any[]) => {
  const isChecked = typeof checked === 'boolean' ? checked : checked.length > 0
  if (isChecked) {
    emit('update:selectedRows', [...props.data])
  } else {
    emit('update:selectedRows', [])
  }
}

const toggleRowSelect = (row: Record<string, any>) => {
  const isSelected = isRowSelected(row)
  let newSelection: Record<string, any>[]

  if (isSelected) {
    if (props.rowKey) {
      newSelection = props.selectedRows.filter(r => r[props.rowKey!] !== row[props.rowKey!])
    } else {
      newSelection = props.selectedRows.filter(r => r !== row)
    }
  } else {
    newSelection = [...props.selectedRows, row]
  }

  emit('update:selectedRows', newSelection)
}

// Sorting
const handleSort = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
  emit('sort', key, sortOrder.value)
}

const handleRowClick = (row: Record<string, any>, index: number) => {
  if (props.rowClickable) {
    emit('row-click', row, index)
  }
}

// Pagination
const totalPages = computed(() => {
  if (props.total <= 0 || props.perPage <= 0) return 1
  return Math.ceil(props.total / props.perPage)
})

const isFirstPage = computed(() => props.currentPage <= 1)
const isLastPage = computed(() => props.currentPage >= totalPages.value)

const rangeStart = computed(() => {
  if (props.total === 0) return 0
  return (props.currentPage - 1) * props.perPage + 1
})

const rangeEnd = computed(() => {
  const end = props.currentPage * props.perPage
  return Math.min(end, props.total)
})

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value || page === props.currentPage) return
  emit('update:currentPage', page)
  emit('page-change', page)
}

const handlePerPageChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const newPerPage = Number(target.value)
  emit('update:perPage', newPerPage)
  emit('per-page-change', newPerPage)
  // Reset to first page when changing per page
  emit('update:currentPage', 1)
  emit('page-change', 1)
}
</script>

<style lang="scss" scoped>
.ae-table-wrapper {
  position: relative;
  width: 100%;
  overflow-x: auto;
}

.ae-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  // Header
  &__head {
    background: var(--sds-color-background-surface-default);
  }

  &__cell {
    padding: var(--sds-size-space-12) var(--sds-size-space-16);
    text-align: left;
    color: var(--sds-color-text-default-primary);
    border-bottom: 1px solid var(--sds-color-border-default-secondary);

    &--header {
      color: var(--sds-color-text-default-tertiary);
      white-space: nowrap;
    }

    &--sortable {
      cursor: pointer;
      user-select: none;

      &:hover {
        color: var(--sds-color-text-default-primary);
      }
    }

    &--sorted {
      color: var(--sds-color-text-brand-secondary);
    }

    &--checkbox {
      width: 48px;
      padding: var(--sds-size-space-8) var(--sds-size-space-12);
    }

    &--empty {
      padding: var(--sds-size-space-32);
    }
  }

  &__header-content {
    display: inline-flex;
    align-items: center;
    gap: var(--sds-size-space-4);
  }

  &__sort-icon {
    display: flex;
    align-items: center;

    svg {
      width: 1rem;
      height: 1rem;
      opacity: 0.5;
    }
  }

  &__cell--sorted &__sort-icon svg {
    opacity: 1;
    color: var(--sds-color-text-brand-secondary);
  }

  // Body
  &__row {
    transition: background var(--ae-duration-100) var(--ae-ease-out);

    &--clickable {
      cursor: pointer;
    }

    &--selected {
      background: var(--sds-color-background-brand-secondary-hover);
    }

    &--empty {
      &:hover {
        background: transparent;
      }
    }
  }

  // Empty State
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--sds-size-space-12);
    color: var(--sds-color-text-tertiary-default);

    svg {
      width: 3rem;
      height: 3rem;
    }
  }

  // Loading
  &__loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
  }

  &__spinner {
    width: 2rem;
    height: 2rem;
    border: 3px solid var(--sds-color-border-default-secondary);
    border-top-color: var(--sds-color-border-brand-green);
    border-radius: 50%;
    animation: ae-table-spin 0.8s linear infinite;
  }

  // Footer
  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--sds-size-space-12) var(--sds-size-space-16);
    border-top: 1px solid var(--sds-color-border-default-secondary);
    background: var(--sds-color-background-surface-default);
    gap: var(--sds-size-space-16);
  }

  &__footer-left {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-8);
  }

  &__footer-right {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-16);
  }

  &__footer-label {
    color: var(--sds-color-text-default-tertiary);
  }

  &__footer-info {
    color: var(--sds-color-text-default-secondary);
  }

  &__per-page {
    padding: var(--sds-size-space-4) var(--sds-size-space-8);
    border: 1px solid var(--sds-color-border-default-secondary);
    border-radius: var(--sds-size-radius-50);
    background: var(--sds-color-background-default-primary);
    color: var(--sds-color-text-default-primary);
    font-size: 0.875rem;
    cursor: pointer;
    outline: none;
    transition: border-color var(--ae-duration-100) var(--ae-ease-out);

    &:hover {
      border-color: var(--sds-color-border-default-teriary);
    }

    &:focus {
      border-color: var(--sds-color-border-brand-green);
    }
  }

  &__footer-nav {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-4);
  }

  &__nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 1px solid var(--sds-color-border-default-secondary);
    border-radius: var(--sds-size-radius-50);
    background: transparent;
    color: var(--sds-color-text-default-primary);
    cursor: pointer;
    transition: all var(--ae-duration-100) var(--ae-ease-out);

    svg {
      width: 1rem;
      height: 1rem;
    }

    &:hover:not(:disabled) {
      background: var(--sds-color-background-default-primary-hover);
      border-color: var(--sds-color-border-default-teriary);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
}

// ================================
// MODIFIERS
// ================================
.ae-table--striped {
  .ae-table__body .ae-table__row:nth-child(even) {
    background: var(--sds-color-background-surface-default);
  }
}

.ae-table--bordered {
  .ae-table {
    border: 1px solid var(--sds-color-border-default-secondary);
    border-radius: var(--sds-size-radius-100);
  }

  .ae-table__cell {
    border: 1px solid var(--sds-color-border-default-secondary);
  }
}

.ae-table--hoverable {
  .ae-table__body .ae-table__row:not(.ae-table__row--empty):hover {
    background: var(--sds-color-background-default-primary-hover);
  }
}

.ae-table--sticky-header {
  .ae-table__head {
    position: sticky;
    top: 0;
    z-index: 5;
  }
}

.ae-table--loading {
  min-height: 200px;
}

// ================================
// SIZES
// ================================
.ae-table--sm {
  .ae-table__cell {
    padding: var(--sds-size-space-8) var(--sds-size-space-12);
  }

  .ae-table__cell--checkbox {
    padding: var(--sds-size-space-6) var(--sds-size-space-8);
  }
}

.ae-table--md {
  .ae-table__cell {
    padding: var(--sds-size-space-12) var(--sds-size-space-16);
  }
}

.ae-table--lg {
  .ae-table__cell {
    padding: var(--sds-size-space-16) var(--sds-size-space-20);
  }
}

@keyframes ae-table-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
