<template>
  <div class="column-actions-view">
    <sort-cards-button :sort-order="sortOrder" @click="handleSortCardsBtnClick" />
  </div>
</template>
<script setup lang="ts">
import SortCardsButton from '@/components/column/SortCardsButton.vue'
import type { Column } from '@/entities/column.ts'

const { sortOrder } = defineProps<{
  sortOrder: Column['sortOrder']
}>()

const emit = defineEmits<{
  (e: 'sort:cards', sortOrder: Column['sortOrder']): void
}>()

const handleSortCardsBtnClick = () => {
  const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
  emit('sort:cards', newSortOrder)
}
</script>
