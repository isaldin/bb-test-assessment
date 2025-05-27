<template>
  <div class="board-actions-view">
    <div class="board-actions-view__buttons">
      <button-with-icon @click="$emit('new-column')">
        New column
        <template #icon>
          <icon-plus />
        </template>
      </button-with-icon>

      <button-with-icon>
        Shuffle columns
        <template #icon>
          <icon-shuffle />
        </template>
      </button-with-icon>

      <button-with-icon>
        Shuffle cards
        <template #icon>
          <icon-shuffle />
        </template>
      </button-with-icon>

      <button-with-icon>
        Disable editing
        <template #icon>
          <icon-pause />
        </template>
      </button-with-icon>
    </div>

    <div class="board-actions-view__description">Board actions</div>
  </div>
</template>

<script setup lang="ts">
import ButtonWithIcon from '@/components/ButtonWithIcon.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconShuffle from '@/components/icons/IconShuffle.vue'
import IconPause from '@/components/icons/IconPause.vue'

defineEmits<{
  (e: 'new-column'): void
}>()
</script>

<style lang="scss" scoped>
.board-actions-view {
  &__buttons {
    display: flex;
    gap: 8px;
  }

  &__description {
    margin-top: 12px;
    font-size: 14px;
    font-weight: 600;
    justify-self: center;
    background: -webkit-linear-gradient(rgb(0, 0, 0), rgba(0, 0, 0, 0.4));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0.3;
  }
}
</style>
