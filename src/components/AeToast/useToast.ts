import { ref, type Ref } from 'vue'
import type { Toast, ToastVariant } from './AeToast.vue'

export interface ToastOptions {
  variant?: ToastVariant
  title?: string
  message?: string
  duration?: number
  closable?: boolean
}

interface ToastInstance {
  toasts: Ref<Toast[]>
  addToast: (options: ToastOptions) => string
  removeToast: (id: string) => void
  clearAll: () => void
  success: (title: string, message?: string, options?: Omit<ToastOptions, 'variant' | 'title' | 'message'>) => string
  error: (title: string, message?: string, options?: Omit<ToastOptions, 'variant' | 'title' | 'message'>) => string
  warning: (title: string, message?: string, options?: Omit<ToastOptions, 'variant' | 'title' | 'message'>) => string
  info: (title: string, message?: string, options?: Omit<ToastOptions, 'variant' | 'title' | 'message'>) => string
}

// Global state
const toasts = ref<Toast[]>([])
const timers = new Map<string, ReturnType<typeof setTimeout>>()

const generateId = () => Math.random().toString(36).substring(2, 9)

const addToast = (options: ToastOptions): string => {
  const id = generateId()
  const toast: Toast = {
    id,
    variant: options.variant || 'info',
    title: options.title,
    message: options.message,
    duration: options.duration ?? 5000,
    closable: options.closable ?? true
  }

  // Limit to 5 toasts
  if (toasts.value.length >= 5) {
    const oldest = toasts.value[0]
    removeToast(oldest.id)
  }

  toasts.value.push(toast)

  // Auto dismiss
  if (toast.duration && toast.duration > 0) {
    const timer = setTimeout(() => {
      removeToast(id)
    }, toast.duration)
    timers.set(id, timer)
  }

  return id
}

const removeToast = (id: string): void => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
    const timer = timers.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.delete(id)
    }
  }
}

const clearAll = (): void => {
  toasts.value = []
  timers.forEach(timer => clearTimeout(timer))
  timers.clear()
}

// Convenience methods
const success = (
  title: string, 
  message?: string, 
  options?: Omit<ToastOptions, 'variant' | 'title' | 'message'>
): string => {
  return addToast({ ...options, variant: 'success', title, message })
}

const error = (
  title: string, 
  message?: string, 
  options?: Omit<ToastOptions, 'variant' | 'title' | 'message'>
): string => {
  return addToast({ ...options, variant: 'error', title, message })
}

const warning = (
  title: string, 
  message?: string, 
  options?: Omit<ToastOptions, 'variant' | 'title' | 'message'>
): string => {
  return addToast({ ...options, variant: 'warning', title, message })
}

const info = (
  title: string, 
  message?: string, 
  options?: Omit<ToastOptions, 'variant' | 'title' | 'message'>
): string => {
  return addToast({ ...options, variant: 'info', title, message })
}

export function useToast(): ToastInstance {
  return {
    toasts,
    addToast,
    removeToast,
    clearAll,
    success,
    error,
    warning,
    info
  }
}

// Export singleton for global usage
export const toast = {
  success,
  error,
  warning,
  info,
  add: addToast,
  remove: removeToast,
  clear: clearAll
}
