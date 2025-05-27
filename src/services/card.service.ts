import { computed, type ComputedRef, type Ref, ref } from 'vue'
import type { Card } from '@/entities/card.ts'

export class CardService {
  private cards = ref(new Map<string, Ref<Card>[]>())

  public fetchCards(_columnId: string): Promise<Card[]> {
    return Promise.resolve([])
  }

  public getCardsForColumn(columnId: string): ComputedRef<Card[]> {
    return computed(() => {
      const cardRefs = this.cards.value.get(columnId) || []
      return cardRefs.map((cardRef) => cardRef.value)
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
}
