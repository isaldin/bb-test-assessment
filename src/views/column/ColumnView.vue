<template>
  <div v-if="column" class="column-view">
    <div class="column-view__title">
      {{ column.name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useColumn } from '@/compositions/column'

const { boardId, columnId } = defineProps<{ boardId: string; columnId: string }>()

const { getColumnById } = useColumn()

const column = getColumnById(boardId, columnId)
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
