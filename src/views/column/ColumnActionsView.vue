<template>
  <div class="column-actions-view">
    <sort-cards-button :sort-order="sortOrder" @click="handleSortCardsBtnClick" />

    <button-with-icon @click="emit('clear:cards')">
      Clear all
      <template #icon>
        <IconClear />
      </template>
    </button-with-icon>
  </div>
</template>
<script setup lang="ts">
import SortCardsButton from '@/components/column/SortCardsButton.vue'
import type { Column } from '@/entities/column.ts'
import ButtonWithIcon from '@/components/ButtonWithIcon.vue'
import IconClear from '@/components/icons/IconClear.vue'

const { sortOrder } = defineProps<{
  sortOrder: Column['sortOrder']
}>()

const emit = defineEmits<{
  (e: 'sort:cards', sortOrder: Column['sortOrder']): void
  (e: 'clear:cards'): void
}>()

const handleSortCardsBtnClick = () => {
  const newSortOrder: Column['sortOrder'] = sortOrder === 'asc' ? 'desc' : 'asc'
  emit('sort:cards', newSortOrder)
}
</script>

<style lang="scss" scoped>
.column-actions-view {
  display: flex;
  justify-content: center;
  gap: 4px;
}
</style>
