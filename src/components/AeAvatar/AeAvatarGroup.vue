<template>
  <div class="avatar-group">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.avatar-group {
  display: flex;

  > * {
    margin-left: -0.5rem;
    //border: 2px solid var(--sds-color-background-surface-tertiary);

    &:first-child {
      margin-left: 0;
    }
  }
}
</style>