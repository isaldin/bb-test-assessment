<template>
  <div v-if="column" class="column-view">
    <column-title-view
      :title="column.name"
      @update:title="handleUpdateTitle"
      @delete:column="handleDeleteColumn"
      @disable:column="handleDisableColumn"
    />
  </div>
</template>

<script lang="ts" setup>
import { useColumn } from '@/compositions/column'
import ColumnTitleView from '@/views/column/ColumnTitleView.vue'

const emit = defineEmits<{
  (e: '@delete:column', columnId: string): void
}>()

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

const handleDeleteColumn = () => {
  emit('@delete:column', columnId)
}

const handleDisableColumn = () => {
  console.log('Disable column:', columnId)
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
}
</style>
