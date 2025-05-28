<template>
  <div v-if="column" class="column-view">
    <div class="column-view__disabled-overlay" v-if="column.disabled"></div>

    <column-title-view
      :disabled="!!column.disabled"
      :title="column.name"
      :cards-count="cardCount"
      @update:title="handleUpdateTitle"
      @delete:column="handleDeleteColumn"
      @disable:column="handleDisableColumn"
      @enable:column="handleEnableColumn"
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

    <div class="column-view__actions">
      <column-actions-view
        :sort-order="column.sortOrder"
        @sort:cards="handleSortCards"
        @clear:cards="handleClearCards"
      />
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
import ColumnActionsView from '@/views/column/ColumnActionsView.vue'
import type { Column } from '@/entities/column.ts'

type UpdateCardPayload = Pick<Card, 'title' | 'description'>

const emit = defineEmits<{
  (e: '@delete:column', columnId: string): void
}>()

const { columnId } = defineProps<{ columnId: string }>()

const { getColumnById, updateColumn, disableColumn, enableColumn } = useColumn()
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
  clearCards,
} = useCard()

const column = computed(() => getColumnById(columnId))

const newCardShown = computed(() => newCardShownForColumnId.value === columnId)

initializeCards(columnId)

const sortOrder = computed(() => column.value?.sortOrder || 'asc')
const cards = computed(() => {
  const shuffleKey = column.value?.shuffleKey
  return getCardsForColumn(columnId, sortOrder.value, shuffleKey).value ?? []
})

const cardCount = computed(() => cards.value.length)

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
  disableColumn(columnId)
}

const handleEnableColumn = () => {
  enableColumn(columnId)
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

const handleSortCards = (sortOrder: Column['sortOrder']) => {
  if (!column.value) {
    return
  }

  column.value.sortOrder = sortOrder
  updateColumn(column.value)
}

const handleClearCards = () => {
  clearCards(columnId)
}
</script>

<style lang="scss" scoped>
.column-view {
  display: flex;
  flex-direction: column;
  position: relative;
  background: #eceff2;
  border-radius: 12px;
  width: 448px;
  min-height: 902px;
  flex-shrink: 0;
  padding: 16px 16px 20px;

  &__disabled-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 12px;
    z-index: 1;
  }

  &__cards {
    margin-top: 16px;
    gap: 8px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
