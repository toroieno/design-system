<template>
  <div class="ae-empty" :class="emptyClasses">
    <!-- Icon/Image -->
    <div v-if="$slots.icon || icon || !hideIcon" class="ae-empty__icon">
      <slot name="icon">
        <component v-if="icon" :is="icon" />
<!--        <img v-else :src="defaultImg" alt="" />-->
        <component :is="GridSvg" class="ae-empty__grid"/>
        <component :is="noResultSvg" class="ae-empty__grid"/>
<!--        <div :style="{background: `url('@/assets/svg/grid.svg')`}"></div>-->
      </slot>
    </div>

    <!-- Title -->
    <h3 v-if="title || $slots.title" class="ae-empty__title ae-typo-single-line-body-base">
      <slot name="title">{{ title }}</slot>
    </h3>

    <!-- Description -->
    <p v-if="description || $slots.description" class="ae-empty__description ae-typo-single-line-body-small-strong">
      <slot name="description">{{ description }}</slot>
    </p>

    <!-- Actions -->
    <div class="ae-empty__actions">
      <slot name="default">
        <AeButton @click="backToHome">Back to home</AeButton>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, h} from 'vue'
import {AeButton} from "@/components"
import NoDataImg from '@/assets/svg/no-result.svg'

export interface AeEmptyProps {
  /** Title text */
  title?: string
  /** Description text */
  description?: string
  /** Custom icon component */
  icon?: any
  /** Hide the default icon */
  hideIcon?: boolean
  state?: 'result' | 'data' | 'connect'
}

const GridSvg = h(
  'svg',
  {
    width: 283,
    height: 185,
    viewBox: '0 0 283 185',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  },
  [
    h(
      'g',
      {
        opacity: '0.5',
        'clip-path': 'url(#clip0)',
      },
      [
        h(
          'mask',
          {
            id: 'mask0',
            maskUnits: 'userSpaceOnUse',
            x: 0,
            y: 0,
            width: 285,
            height: 190,
            style: 'mask-type:alpha',
          },
          [
            h('rect', {
              width: 283,
              height: 184,
              transform: 'translate(1.34619)',
              fill: 'url(#paint0_radial)',
            }),
          ]
        ),

        h(
          'g',
          {mask: 'url(#mask0)'},
          [
            // vertical lines
            ...[
              6.3457, 19.8936, 33.4414, 46.9893, 60.5369, 74.0847,
              87.6326, 101.18, 114.728, 128.276, 141.824, 155.372,
              168.919, 182.467, 196.015, 209.563, 223.111, 236.659,
              250.207, 263.754, 277.302,
            ].map(x =>
              h('line', {
                x1: x,
                x2: x,
                y2: 198,
                stroke: 'white',
                'stroke-opacity': '0.4',
                'stroke-width': '0.5',
              })
            ),

            // horizontal lines
            ...[
              13.2978, 26.8456, 40.3935, 53.9413, 67.4891, 81.037,
              94.5848, 108.133, 121.68, 135.228, 148.776, 162.324,
            ].map(y =>
              h('line', {
                x1: -21,
                x2: 304,
                y1: y,
                y2: y,
                stroke: 'white',
                'stroke-opacity': '0.4',
                'stroke-width': '0.5',
              })
            ),
          ]
        ),
      ]
    ),

    // defs
    h('defs', [
      h(
        'radialGradient',
        {
          id: 'paint0_radial',
          cx: 0,
          cy: 0,
          r: 1,
          gradientUnits: 'userSpaceOnUse',
          gradientTransform:
            'translate(141.5 92) rotate(-90) scale(89.5 137.655)',
        },
        [
          h('stop'),
          h('stop', {offset: 1, 'stop-opacity': 0}),
        ]
      ),

      h('clipPath', {id: 'clip0'}, [
        h('rect', {
          width: 543,
          height: 185,
          fill: 'white',
          transform: 'translate(-131)',
        }),
      ]),
    ]),
  ]
)
const noResultSvg = h(
  'svg',
  {
    width: 195,
    height: 116,
    viewBox: '0 0 195 116',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  },
  [
    // path line
    h('path', {
      d: 'M163.512 42.2023H137.281C135.87 42.2023 134.518 41.6389 133.524 40.6371L99.3876 6.21354C97.3567 4.16558 94.0596 4.12175 91.975 6.115L55.7676 40.7357C54.7831 41.677 53.4736 42.2023 52.1115 42.2023H27.2861',
      stroke: 'white',
      'stroke-opacity': '0.2',
    }),

    // main card
    h(
      'g',
      { filter: 'url(#filter0)' },
      [
        h('rect', {
          x: 54.3992,
          y: 1.20233,
          width: 81.3387,
          height: 82,
          rx: 13.2258,
          fill: '#2B2B2B',
          'shape-rendering': 'crispEdges',
        }),
        h('rect', {
          x: 54.8992,
          y: 1.70233,
          width: 80.3387,
          height: 81,
          rx: 12.7258,
          stroke: 'white',
          'stroke-opacity': '0.2',
          'shape-rendering': 'crispEdges',
        }),
        h('path', {
          d: 'M104.568 50.8895L113.419 59.7491M109.341 39.3593C109.341 48.3681 102.038 55.6711 93.0294 55.6711C84.0206 55.6711 76.7175 48.3681 76.7175 39.3593C76.7175 30.3505 84.0206 23.0475 93.0294 23.0475C102.038 23.0475 109.341 30.3505 109.341 39.3593Z',
          stroke: 'white',
          'stroke-opacity': '0.4',
          'stroke-width': 1.5,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
        h('path', {
          d: 'M93.0295 29.1644C98.66 29.1644 103.224 33.7288 103.224 39.3593',
          stroke: 'white',
          'stroke-opacity': '0.4',
          'stroke-width': 1.5,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
        }),
      ]
    ),

    // defs
    h('defs', [
      h(
        'filter',
        {
          id: 'filter0',
          x: 49.5898,
          y: -0.480953,
          width: 95.7668,
          height: 116.147,
          filterUnits: 'userSpaceOnUse',
          'color-interpolation-filters': 'sRGB',
        },
        [
          h('feFlood', { 'flood-opacity': 0 }),
          h('feBlend', { in: 'SourceGraphic' }),
        ]
      ),
    ]),
  ]
)

const stateDefaultValue = {
  'result': {
    title: 'No Results Found',
    description: 'Try adjusting your search terms',
    img: NoDataImg,
  },
  'data': {
    title: 'Empty Data',
    description: 'Please upload or add new file to get started',
    img: NoDataImg,
  },
  'connect': {
    title: 'Oops! Somethings Went Wrong',
    description: 'Please check your internet connection and try again',
    img: NoDataImg,
  },
}

const props = withDefaults(defineProps<AeEmptyProps>(), {
  hideIcon: false,
  state: 'result'
})

const emptyClasses = computed(() => [])

const title = computed(() => props.title ?? stateDefaultValue[props.state].title)
const description = computed(() => props.description ?? stateDefaultValue[props.state].description)
const defaultImg = computed(() => stateDefaultValue[props.state].img)

const backToHome = () => {
  window.location.href = '/'
}
</script>

<style lang="scss" scoped>
.ae-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--sds-size-space-32);

  &__background {
    width: 200px;
    height: 200px;
  }
  &__title {
    color: var(--sds-color-text-primary-secondary);
  }
  &__description {
    color: var(--sds-color-text-primary-tertiary);
  }

  // ================================
  // ICON
  // ================================
  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sds-color-icon-primary-default);
    position: relative;

    svg {
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &__grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  // ================================
  // TITLE
  // ================================
  &__title {
    margin: 0;
    font-weight: 600;
    color: var(--sds-color-text-primary-secondary);
  }

  // ================================
  // DESCRIPTION
  // ================================
  &__description {
    margin: var(--sds-size-space-8) 0 0 0;
    color: var(--sds-color-text-primary-tertiary);
    max-width: 320px;
  }

  // ================================
  // ACTIONS
  // ================================
  &__actions {
    margin-top: var(--sds-size-space-24);
  }
}
</style>
