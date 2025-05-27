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
        v-for="card in cards"
        :key="card.id"
        :title="card.title"
        :description="card.description"
        :edit-mode="currentlyEditingCardId === card.id"
        @dblclick="(e: MouseEvent) => handleCardDblClick(card.id)(e)"
        @cancel:editing="startEditingCard(null)"
        @update:card="(input: UpdateCardPayload) => handleUpdateCard(card.id, input)"
      />

      <new-card-view
        v-if="newCardShown"
        @cancel="hideNewCardForColumn()"
        @update:model="handleCreateNewCard"
      />

      <new-card-button v-if="!newCardShown" @click="showNewCardForColumn(columnId)" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useColumn } from '@/compositions/column'
import ColumnTitleView from '@/views/column/ColumnTitleView.vue'
import CardView from '@/views/card/CardView.vue'
import { useCard } from '@/compositions/card'
import NewCardButton from '@/components/column/NewCardButton.vue'
import NewCardView from '@/views/card/NewCardView.vue'
import { computed } from 'vue'
import type { Card } from '@/entities/card.ts'

type UpdateCardPayload = Pick<Card, 'title' | 'description'>

const emit = defineEmits<{
  (e: '@delete:column', columnId: string): void
}>()

const { boardId, columnId } = defineProps<{ boardId: string; columnId: string }>()

const { getColumnById, updateColumn } = useColumn()
const {
  initializeCards,
  getCardsForColumn,
  currentlyEditingCardId,
  startEditingCard,
  showNewCardForColumn,
  newCardShownForColumnId,
  hideNewCardForColumn,
  createNewCard,
  updateCard,
} = useCard()

const column = getColumnById(boardId, columnId)

const newCardShown = computed(() => newCardShownForColumnId.value === columnId)

initializeCards(columnId)

const cards = getCardsForColumn(columnId)

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
  (e: MouseEvent): void => {
    e.stopPropagation()

    if (currentlyEditingCardId.value === 'card-1') {
      return
    }

    startEditingCard(cardId)
  }

const handleCreateNewCard = (title: string) => {
  createNewCard(columnId, title)
}

const handleUpdateCard = (cardId: string, input: UpdateCardPayload) => {
  const card: Card = { id: cardId, columnId, ...input }
  updateCard(card)
  currentlyEditingCardId.value = null
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
    gap: 8px;
    display: flex;
    flex-direction: column;
  }
}
</style>
