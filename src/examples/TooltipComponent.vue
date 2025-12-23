<script setup lang="ts">
import { AeTooltip, AeButton } from "@/components"
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Tooltip</h2>
    <p class="demo-section__desc">Informative tooltips for additional context on hover, click, or focus.</p>

    <div class="demo-grid demo-grid--forms">
      <!-- Basic Tooltip -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Basic</h3>
        </template>
        <div class="demo-row">
          <AeTooltip content="This is a basic tooltip">
            <AeButton>Hover me</AeButton>
          </AeTooltip>
        </div>
      </AeCard>

      <!-- Positions -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Positions</h3>
        </template>
        <div class="demo-row demo-row--center">
          <AeTooltip content="Top tooltip" position="top">
            <AeButton variant="outlined" size="sm">Top</AeButton>
          </AeTooltip>
          <AeTooltip content="Bottom tooltip" position="bottom">
            <AeButton variant="outlined" size="sm">Bottom</AeButton>
          </AeTooltip>
          <AeTooltip content="Left tooltip" position="left">
            <AeButton variant="outlined" size="sm">Left</AeButton>
          </AeTooltip>
          <AeTooltip content="Right tooltip" position="right">
            <AeButton variant="outlined" size="sm">Right</AeButton>
          </AeTooltip>
        </div>
      </AeCard>

      <!-- Triggers -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Triggers</h3>
        </template>
        <div class="demo-row">
          <AeTooltip content="Hover to show" trigger="hover">
            <AeButton variant="outlined" size="sm">Hover</AeButton>
          </AeTooltip>
          <AeTooltip content="Click to toggle" trigger="click">
            <AeButton variant="outlined" size="sm">Click</AeButton>
          </AeTooltip>
          <AeTooltip content="Focus to show" trigger="focus">
            <AeButton variant="outlined" size="sm">Focus</AeButton>
          </AeTooltip>
        </div>
      </AeCard>

      <!-- With Delay -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">With Delay</h3>
        </template>
        <div class="demo-row">
          <AeTooltip content="Shows after 500ms" :delay="500">
            <AeButton variant="outlined" size="sm">500ms delay</AeButton>
          </AeTooltip>
          <AeTooltip content="Shows after 1s" :delay="1000">
            <AeButton variant="outlined" size="sm">1s delay</AeButton>
          </AeTooltip>
          <AeTooltip content="Hides after 500ms" :hide-delay="500">
            <AeButton variant="outlined" size="sm">Hide delay</AeButton>
          </AeTooltip>
        </div>
      </AeCard>

      <!-- No Arrow -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Without Arrow</h3>
        </template>
        <div class="demo-row">
          <AeTooltip content="No arrow tooltip" :arrow="false">
            <AeButton variant="outlined" size="sm">No Arrow</AeButton>
          </AeTooltip>
          <AeTooltip content="With arrow tooltip" :arrow="true">
            <AeButton variant="outlined" size="sm">With Arrow</AeButton>
          </AeTooltip>
        </div>
      </AeCard>

      <!-- Custom Content -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Custom Content</h3>
        </template>
        <div class="demo-row">
          <AeTooltip :max-width="300">
            <AeButton variant="outlined" size="sm">Rich Content</AeButton>
            <template #content>
              <div class="tooltip-custom">
                <strong>Custom Tooltip</strong>
                <p>This tooltip has rich HTML content with multiple elements.</p>
              </div>
            </template>
          </AeTooltip>
          <AeTooltip :max-width="200">
            <AeButton variant="outlined" size="sm">With Icon</AeButton>
            <template #content>
              <div class="tooltip-with-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4M12 8h.01"/>
                </svg>
                <span>Helpful information</span>
              </div>
            </template>
          </AeTooltip>
        </div>
      </AeCard>

      <!-- Long Content -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Long Content</h3>
        </template>
        <div class="demo-row">
          <AeTooltip 
            content="This is a longer tooltip message that demonstrates how the tooltip handles multiple lines of text when the content exceeds the maximum width."
            :max-width="250"
          >
            <AeButton variant="outlined" size="sm">Long Text</AeButton>
          </AeTooltip>
          <AeTooltip 
            content="Short tooltip with custom width"
            :max-width="150"
          >
            <AeButton variant="outlined" size="sm">Custom Width</AeButton>
          </AeTooltip>
        </div>
      </AeCard>

      <!-- On Other Elements -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">On Various Elements</h3>
        </template>
        <div class="demo-row">
          <AeTooltip content="Tooltip on text">
            <span class="demo-link">Hover this text</span>
          </AeTooltip>
          <AeTooltip content="Tooltip on icon" position="bottom">
            <span class="demo-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
              </svg>
            </span>
          </AeTooltip>
          <AeTooltip content="Disabled state" disabled>
            <AeButton variant="outlined" size="sm">Disabled Tooltip</AeButton>
          </AeTooltip>
        </div>
      </AeCard>
    </div>
  </section>
</template>

<style scoped>
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sds-size-space-16);
  align-items: center;
}

.demo-row--center {
  justify-content: center;
}

.tooltip-custom {
  display: flex;
  flex-direction: column;
  gap: var(--sds-size-space-4);
  
  strong {
    color: var(--sds-color-text-brand-secondary);
  }
  
  p {
    margin: 0;
    opacity: 0.9;
  }
}

.tooltip-with-icon {
  display: flex;
  align-items: center;
  gap: var(--sds-size-space-8);
  
  svg {
    flex-shrink: 0;
    color: var(--sds-color-text-brand-secondary);
  }
}

.demo-link {
  color: var(--sds-color-text-brand-secondary);
  text-decoration: underline;
  cursor: pointer;
}

.demo-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--sds-size-space-8);
  border-radius: var(--sds-size-radius-50);
  background: var(--sds-color-background-surface-default);
  color: var(--sds-color-text-tertiary-default);
  cursor: help;
  
  &:hover {
    color: var(--sds-color-text-default-primary);
  }
}
</style>
