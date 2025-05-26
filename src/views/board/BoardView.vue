<template>
  <div class="board-view">
    <div class="board-view__columns">columns here</div>
    <div class="board-view__actions">
      <board-actions-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import BoardActionsView from '@/views/board/BoardActionsView.vue'
</script>

<style lang="scss" scoped>
.board-view {
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  min-width: 100%;
  min-height: 100vh;
  padding: 24px;

  &__columns {
    flex: 1;
  }

  &__actions {
    padding-top: 24px;
    align-self: center;
  }
}
</style>
