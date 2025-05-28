<template>
  <div class="column-title-view">
    <column-title
      class="column-title-view__text"
      :model-value="title"
      @update:model-value="$emit('update:title', $event)"
    />

    <div class="column-title-view__actions">
      <button-with-icon
        v-if="disabled"
        class="column-title-view__actions__unlock"
        @click="$emit('enable:column')"
      >
        Unlock column
        <template #icon>
          <icon-play />
        </template>
      </button-with-icon>
      <button-with-icon v-else @click="$emit('disable:column')">
        Disable editing
        <template #icon>
          <icon-pause />
        </template>
      </button-with-icon>

      <button-with-icon @click="$emit('delete:column')">
        Delete column
        <template #icon>
          <icon-minus />
        </template>
      </button-with-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import ColumnTitle from '@/components/column/ColumnTitle.vue'
import IconMinus from '@/components/icons/IconMinus.vue'
import IconPause from '@/components/icons/IconPause.vue'
import ButtonWithIcon from '@/components/ButtonWithIcon.vue'
import IconPlay from '@/components/icons/IconPlay.vue'

defineProps<{
  title: string
  disabled: boolean
}>()

defineEmits<{
  (e: 'update:title', title: string): void
  (e: 'delete:column'): void
  (e: 'disable:column'): void
  (e: 'enable:column'): void
}>()
</script>

<style lang="scss" scoped>
.column-title-view {
  display: flex;
  justify-content: space-between;

  &__text {
    display: flex;
    flex: 1;
    align-items: center;
    margin-right: 4px;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;

    &__unlock {
      z-index: 2;
    }
  }
}
</style>
