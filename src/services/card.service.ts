import { computed, type ComputedRef, type Ref, ref } from 'vue'
import type { Card } from '@/entities/card.ts'
import type { Column } from '@/entities/column.ts'

export class CardService {
  private cards = ref(new Map<string, Ref<Card>[]>())

  public fetchCards(columnId: string): Promise<Card[]> {
    return Promise.resolve([
      { id: crypto.randomUUID(), columnId, title: 'Sample Card' },
      { id: crypto.randomUUID(), columnId, title: 'Some another Sample Card' },
      { id: crypto.randomUUID(), columnId, title: 'Yet another Sample Card' },
    ] satisfies Card[])
  }

  public getCardsForColumn(columnId: string, sortOrder: Column['sortOrder']): ComputedRef<Card[]> {
    return computed(() => {
      const cardRefs = this.cards.value.get(columnId) || []

      if (sortOrder !== 'shuffle') {
        return cardRefs
          .map((cardRef) => cardRef.value)
          .sort((a, b) => {
            const sortValue = a.title.localeCompare(b.title)
            return sortOrder === 'asc' ? sortValue : -sortValue
          })
      }

      // if we need to shuffle multiple times, we should use an order prop for sorting
      return cardRefs.map((cardRef) => cardRef.value).sort(() => Math.random() - 0.5)
    })
  }

  public saveCards(columnId: string, cards: Card[]) {
    const wrapped = cards.map((card) => ref(card))
    this.cards.value.set(columnId, wrapped)
  }

  public addCard(columnId: string, title: string) {
    const card: Card = {
      id: crypto.randomUUID(),
      title,
      columnId,
    }
    const columnCards = this.cards.value.get(columnId) || []
    this.cards.value.set(columnId, [...columnCards, ref(card)])
  }

  public updateCard(card: Card) {
    const columnCards = this.cards.value.get(card.columnId)
    if (!columnCards) return

    const index = columnCards.findIndex((c) => c.value.id === card.id)
    if (index !== -1) {
      columnCards[index].value = card
    }
  }

  public clearCards(columnId: string) {
    this.cards.value.delete(columnId)
  }
}
