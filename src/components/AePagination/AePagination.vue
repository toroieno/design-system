<template>
  <nav class="ae-pagination" :class="paginationClasses" role="navigation" aria-label="Pagination">
    <!-- First Button -->
    <button
      v-if="showFirstLast"
      class="ae-pagination__btn ae-pagination__btn--first"
      :disabled="isFirstPage || disabled"
      @click="goToPage(1)"
      aria-label="Go to first page"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
      </svg>
    </button>

    <!-- Previous Button -->
    <button
      class="ae-pagination__btn ae-pagination__btn--prev"
      :disabled="isFirstPage || disabled"
      @click="goToPage(modelValue - 1)"
      aria-label="Go to previous page"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>

    <!-- Page Numbers -->
    <div class="ae-pagination__pages">
      <template v-for="page in displayedPages" :key="page">
        <span v-if="page === 'ellipsis-start' || page === 'ellipsis-end'" class="ae-pagination__ellipsis">
          ...
        </span>
        <button
          v-else
          :class="[
            'ae-pagination__page',
            'ae-typo-single-line-body-small-strong',
            { 'ae-pagination__page--active': page === modelValue }
          ]"
          :disabled="disabled"
          :aria-current="page === modelValue ? 'page' : undefined"
          @click="goToPage(page as number)"
        >
          {{ page }}
        </button>
      </template>
    </div>

    <!-- Next Button -->
    <button
      class="ae-pagination__btn ae-pagination__btn--next"
      :disabled="isLastPage || disabled"
      @click="goToPage(modelValue + 1)"
      aria-label="Go to next page"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>

    <!-- Last Button -->
    <button
      v-if="showFirstLast"
      class="ae-pagination__btn ae-pagination__btn--last"
      :disabled="isLastPage || disabled"
      @click="goToPage(totalPages)"
      aria-label="Go to last page"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
      </svg>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface AePaginationProps {
  modelValue: number
  totalPages: number
  siblingCount?: number
  showFirstLast?: boolean
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<AePaginationProps>(), {
  siblingCount: 1,
  showFirstLast: true,
  size: 'md',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'change': [value: number]
}>()

const paginationClasses = computed(() => [
  `ae-pagination--${props.size}`,
  {
    'ae-pagination--disabled': props.disabled
  }
])

const isFirstPage = computed(() => props.modelValue === 1)
const isLastPage = computed(() => props.modelValue === props.totalPages)

const displayedPages = computed(() => {
  const total = props.totalPages
  const current = props.modelValue
  const siblings = props.siblingCount
  
  // If total pages is small, show all
  if (total <= 5 + siblings * 2) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  
  const pages: (number | string)[] = []
  
  // Always show first page
  pages.push(1)
  
  // Calculate range around current page
  const leftSibling = Math.max(current - siblings, 2)
  const rightSibling = Math.min(current + siblings, total - 1)
  
  // Add ellipsis after first page if needed
  if (leftSibling > 2) {
    pages.push('ellipsis-start')
  }
  
  // Add pages around current
  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== total) {
      pages.push(i)
    }
  }
  
  // Add ellipsis before last page if needed
  if (rightSibling < total - 1) {
    pages.push('ellipsis-end')
  }
  
  // Always show last page
  if (total > 1) {
    pages.push(total)
  }
  
  return pages
})

const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages || page === props.modelValue || props.disabled) {
    return
  }
  
  emit('update:modelValue', page)
  emit('change', page)
}
</script>

<style lang="scss" scoped>
.ae-pagination {
  display: inline-flex;
  align-items: center;
  gap: var(--sds-size-space-4);
  
  // Navigation buttons
  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: transparent;
    border: 1px solid var(--sds-color-border-default-secondary);
    border-radius: var(--sds-size-radius-50);
    color: var(--sds-color-text-primary-default);
    cursor: pointer;
    transition: all var(--ae-duration-150) var(--ae-ease-out);
    
    svg {
      width: 1em;
      height: 1em;
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
  
  // Page numbers container
  &__pages {
    display: flex;
    align-items: center;
    gap: var(--sds-size-space-4);
  }
  
  // Individual page button
  &__page {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--sds-size-radius-50);
    color: var(--sds-color-text-primary-tertiary);
    cursor: pointer;
    transition: all var(--ae-duration-150) var(--ae-ease-out);
    
    &:hover:not(:disabled):not(&--active) {
      background: var(--sds-color-background-default-primary-hover);
      color: var(--sds-color-text-primary-default);
    }
    
    &--active {
      background: var(--sds-color-background-brand-default);
      color: var(--sds-color-text-brand-primary);
      border-color: var(--sds-color-border-brand-green);
    }
    
    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
  
  // Ellipsis
  &__ellipsis {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sds-color-text-tertiary-default);
    user-select: none;
  }
  
  // ================================
  // SIZES
  // ================================
  &--sm {
    .ae-pagination__btn {
      width: 28px;
      height: 28px;
      font-size: 0.75rem;
    }
    
    .ae-pagination__page {
      min-width: 28px;
      height: 28px;
      padding: 0 var(--sds-size-space-6);
    }
    
    .ae-pagination__ellipsis {
      min-width: 28px;
      height: 28px;
    }
  }
  
  &--md {
    .ae-pagination__btn {
      width: 36px;
      height: 36px;
      font-size: 0.875rem;
    }
    
    .ae-pagination__page {
      min-width: 36px;
      height: 36px;
      padding: 0 var(--sds-size-space-8);
    }
    
    .ae-pagination__ellipsis {
      min-width: 36px;
      height: 36px;
    }
  }
  
  &--lg {
    .ae-pagination__btn {
      width: 44px;
      height: 44px;
      font-size: 1rem;
    }
    
    .ae-pagination__page {
      min-width: 44px;
      height: 44px;
      padding: 0 var(--sds-size-space-12);
    }
    
    .ae-pagination__ellipsis {
      min-width: 44px;
      height: 44px;
    }
  }
  
  // ================================
  // STATES
  // ================================
  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
