<script setup lang="ts">
import { AeAvatar } from "@/components"
import {AeAvatarGroup} from "@/components/AeAvatar";
</script>

<template>
  <section class="demo-section">
    <h2 class="demo-section__title">Avatar</h2>
    <p class="demo-section__desc">User avatars with images, initials, status indicators, and badges.</p>

    <div class="demo-grid demo-grid--forms">
      <!-- Basic Avatars -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Basic</h3>
        </template>
        <div class="demo-row">
          <AeAvatar src="https://i.pravatar.cc/150?img=1" alt="User 1" />
          <AeAvatar src="https://i.pravatar.cc/150?img=2" alt="User 2" />
          <AeAvatar initials="John Doe" />
          <AeAvatar initials="AB" />
          <AeAvatar />
        </div>
      </AeCard>

      <!-- Sizes -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Sizes</h3>
        </template>
        <div class="demo-row demo-row--align-end">
          <div class="demo-item">
            <AeAvatar initials="SM" size="sm" />
            <span class="demo-label">sm</span>
          </div>
          <div class="demo-item">
            <AeAvatar initials="MD" size="md" />
            <span class="demo-label">md</span>
          </div>
          <div class="demo-item">
            <AeAvatar initials="LG" size="lg" />
            <span class="demo-label">lg</span>
          </div>
        </div>
      </AeCard>

      <!-- Shapes -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Shapes</h3>
        </template>
        <div class="demo-row">
          <div class="demo-item">
            <AeAvatar src="https://i.pravatar.cc/150?img=3" shape="circle" size="lg" />
            <span class="demo-label">circle</span>
          </div>
          <div class="demo-item">
            <AeAvatar src="https://i.pravatar.cc/150?img=4" shape="rounded" size="lg" />
            <span class="demo-label">rounded</span>
          </div>
          <div class="demo-item">
            <AeAvatar src="https://i.pravatar.cc/150?img=5" shape="square" size="lg" />
            <span class="demo-label">square</span>
          </div>
        </div>
      </AeCard>

      <!-- Status Indicators -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Status</h3>
        </template>
        <div class="demo-row">
          <div class="demo-item">
            <AeAvatar src="https://i.pravatar.cc/150?img=6" status="online" size="lg" />
            <span class="demo-label">online</span>
          </div>
          <div class="demo-item">
            <AeAvatar src="https://i.pravatar.cc/150?img=7" status="offline" size="lg" shape="rounded"/>
            <span class="demo-label">offline</span>
          </div>
          <div class="demo-item">
            <AeAvatar src="https://i.pravatar.cc/150?img=8" status="busy" size="lg" shape="square"/>
            <span class="demo-label">busy</span>
          </div>
          <div class="demo-item">
            <AeAvatar src="https://i.pravatar.cc/150?img=9" status="away" size="lg" />
            <span class="demo-label">away</span>
          </div>
        </div>
      </AeCard>

      <!-- With Badges -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Badges</h3>
        </template>
        <div class="demo-row">
          <AeAvatar src="https://i.pravatar.cc/150?img=10" badge="3" size="lg" />
          <AeAvatar initials="JD" badge="99+" size="lg" />
          <AeAvatar src="https://i.pravatar.cc/150?img=11" badge="5"/>
        </div>
      </AeCard>

      <!-- Initials from Name -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Initials</h3>
        </template>
        <div class="demo-row">
          <div class="demo-item">
            <AeAvatar initials="John Doe" size="lg" />
            <span class="demo-label">John Doe</span>
          </div>
          <div class="demo-item">
            <AeAvatar initials="Alice" size="lg" />
            <span class="demo-label">Alice</span>
          </div>
          <div class="demo-item">
            <AeAvatar initials="Bob Smith Jr" size="lg" />
            <span class="demo-label">Bob Smith Jr</span>
          </div>
        </div>
      </AeCard>

      <!-- Avatar Group -->
      <AeCard variant="outlined">
        <template #header>
          <h3 class="demo-card-title">Avatar Group</h3>
        </template>
        <div class="demo-stack">
          <AeAvatarGroup>
            <AeAvatar src="https://i.pravatar.cc/150?img=12" />
            <AeAvatar src="https://i.pravatar.cc/150?img=13" />
            <AeAvatar src="https://i.pravatar.cc/150?img=14" />
            <AeAvatar src="https://i.pravatar.cc/150?img=15" />
            <AeAvatar initials="+5" />
          </AeAvatarGroup>
          <div class="avatar-group avatar-group--lg">
            <AeAvatar src="https://i.pravatar.cc/150?img=16" size="lg" status="online" />
            <AeAvatar src="https://i.pravatar.cc/150?img=17" size="lg" status="online" />
            <AeAvatar src="https://i.pravatar.cc/150?img=18" size="lg" status="away" />
          </div>
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

.demo-row--align-end {
  align-items: flex-end;
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sds-size-space-8);
}

.demo-label {
  font-size: 0.75rem;
  color: var(--sds-color-text-tertiary-default);
}

.avatar-group--lg {
  > * {
    margin-left: -0.75rem;
    
    &:first-child {
      margin-left: 0;
    }
  }
}
</style>
