<template>
  <div class="card-view" :class="{ 'card-view__with-border': withBorder }">
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  withBorder?: boolean
}>()
</script>

<style lang="scss" scoped>
.card-view {
  padding: 16px;
  background: #ffffff;
  border-radius: 8px;
  cursor: pointer;

  &__with-border {
    outline: 2px solid #007aff;
  }
}
</style>
