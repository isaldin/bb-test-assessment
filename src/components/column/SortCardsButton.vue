<template>
  <div class="sort-cards-button">
    <button-with-icon v-if="sortOrder === 'asc'">
      <span>Sort</span>
      <span class="sort-cards-button__order-label">Descending</span>
      <template #icon>
        <IconSortDesc />
      </template>
    </button-with-icon>
    <button-with-icon v-else>
      <span>Sort</span>
      <span class="sort-cards-button__order-label">Ascending</span>
      <template #icon>
        <IconSortAsc />
      </template>
    </button-with-icon>
  </div>
</template>
<script setup lang="ts">
import ButtonWithIcon from '@/components/ButtonWithIcon.vue'
import IconSortDesc from '@/components/icons/IconSortDesc.vue'
import IconSortAsc from '@/components/icons/IconSortAsc.vue'
import type { Column } from '@/entities/column.ts'

defineProps<{
  sortOrder: Column['sortOrder']
}>()
</script>

<style lang="scss" scoped>
.sort-cards-button {
  &__order-label {
    color: var(--color-gray);
    margin-left: 4px;
  }
}
</style>
