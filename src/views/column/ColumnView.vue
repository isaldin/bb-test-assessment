<template>
  <div v-if="column" class="column-view">
    <column-title-view
      :title="column.name"
      @update:title="handleUpdateTitle"
      @delete:column="handleDeleteColumn"
      @disable:column="handleDisableColumn"
    />

    <div class="column-view__cards">
      <card-view
        title="Increase the price of the monthly subscription by 100% for users with an ios & macos Increase the price of the monthly subscription by 100% for users with an ios & macos"
        description="After a month when users notice the problem, then return everything to the way it was before to get a pay raise After a month when users notice the problem, then return everything to the way it was before to get a pay raise"
        :edit-mode="currentlyEditingCardId === 'card-1'"
        @dblclick="(e) => handleCardDblClick('card-1')(e)"
        @cancel:editing="startEditingCard(null)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useColumn } from '@/compositions/column'
import ColumnTitleView from '@/views/column/ColumnTitleView.vue'
import CardView from '@/views/card/CardView.vue'
import { useCard } from '@/compositions/card'

const emit = defineEmits<{
  (e: '@delete:column', columnId: string): void
}>()

const { boardId, columnId } = defineProps<{ boardId: string; columnId: string }>()

const { getColumnById, updateColumn } = useColumn()
const { currentlyEditingCardId, startEditingCard } = useCard()

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

const handleCardDblClick =
  (cardId: string) =>
  (_): void => {
    if (currentlyEditingCardId.value === 'card-1') {
      return
    }

    startEditingCard(cardId)
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

  &__cards {
    margin-top: 16px;
  }
}
</style>
