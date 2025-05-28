<template>
  <div class="board-view">
    <div class="board-view__columns">
      <column-view
        v-for="column in columns"
        :key="column.id"
        :board-id="column.boardId"
        :column-id="column.id"
        @@delete:column="handleDeleteColumn"
      />
    </div>
    <div class="board-view__actions">
      <board-actions-view
        @new-column="handleNewColumnClick"
        @shuffle-columns="handleShuffleColumnsClick"
        @shuffle-cards="handleShuffleCardsClick"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import BoardActionsView from '@/views/board/BoardActionsView.vue'
import { useColumn } from '@/compositions/column'
import ColumnView from '@/views/column/ColumnView.vue'
import { computed } from 'vue'

const { boardId } = defineProps<{ boardId: string }>()

const {
  getColumnsForBoard,
  initializeColumns,
  addNewColumn,
  shuffleColumns,
  deleteColumn,
  shuffleCards,
} = useColumn()

initializeColumns(boardId)

const columns = computed(() => getColumnsForBoard(boardId))

const handleNewColumnClick = () => {
  addNewColumn(boardId)
}

const handleShuffleColumnsClick = () => {
  shuffleColumns(boardId)
}

const handleDeleteColumn = (columnId: string) => {
  deleteColumn(columnId)
}

const handleShuffleCardsClick = () => {
  columns.value.forEach((column) => shuffleCards(column.id))
}
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
    display: flex;
    flex: 1;
    gap: 24px;
    overflow-y: auto;
  }

  &__actions {
    padding-top: 24px;
    align-self: center;
  }
}
</style>
