<template>
  <div class="ae-loading">
<!--    variant: linear-->
    <div class="ae-loading__dots">
      <div v-for="dot in dots" :key="dot" :class="['ae-loading__dot', {
        'active': activeDots >= dot
      }]" :style="styleDot"></div>
    </div>
<!--    variant: circle-->
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from 'vue'

export interface AeLoadingProps {
  size?: number
  dots?: number
  time?: number
  variant?: 'linear' | 'circle'
}

const props = withDefaults(defineProps<AeLoadingProps>(), {
  size: 8,
  dots: 5,
  time: 300,
  variant: 'linear'
})

const styleDot = computed(() => {
  return {
    width: `${props.size}px`,
    height: `${props.size}px`,
  }
})

const activeDots = ref(0)
const timerActive = ref()

onMounted(() => {
  timerActive.value = setInterval(() => {
    if (activeDots.value < props.dots) activeDots.value++
    else activeDots.value = 0
  }, props.time)
})
onUnmounted(() => {
  clearInterval(timerActive.value)
})

</script>

<style scoped lang="scss">
.ae-loading {
  &__dots {
    display: flex;
    gap: var(--sds-size-space-6);
  }

  &__dot {
    background: var(--sds-color-icon-neutral-secondary);

    &.active {
      background: var(--sds-color-icon-brand-green);
    }
  }
}
</style>