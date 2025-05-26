<template>
  <div v-if="column" class="column-view">
    <div class="column-view__title">
      <column-title
        class="column-view__title__text"
        :model-value="column.name"
        @update:model-value="handleUpdateTitle"
      />

      <div class="column-view__title__actions">
        <button-with-icon>
          Disable editing
          <template #icon>
            <icon-pause />
          </template>
        </button-with-icon>

        <button-with-icon>
          Delete column
          <template #icon>
            <icon-minus />
          </template>
        </button-with-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useColumn } from '@/compositions/column'
import ColumnTitle from '@/components/column/ColumnTitle.vue'
import ButtonWithIcon from '@/components/ButtonWithIcon.vue'
import IconPause from '@/components/icons/IconPause.vue'
import IconMinus from '@/components/icons/IconMinus.vue'

const { boardId, columnId } = defineProps<{ boardId: string; columnId: string }>()

const { getColumnById, updateColumn } = useColumn()

const column = getColumnById(boardId, columnId)

const handleUpdateTitle = (title: string) => {
  if (!column.value) {
    return
  }

  column.value.name = title
  updateColumn(column.value)
}
</script>

<style lang="scss" scoped>
.column-view {
  background: #eceff2;
  border-radius: 12px;
  width: 448px;
  min-height: 902px;
  flex-shrink: 0;
  padding: 16px 16px 20px;

  &__title {
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
    }
  }
}
</style>
