import type { Card } from '@/entities/card.ts'
import type { Column } from '@/entities/column.ts'
import type { CardStore } from '@/stores/card/types.ts'
import { useCardStore } from '@/stores/card'
import { randomInteger } from '@/utils/randomInteger.ts'

export class CardService {
  private readonly store: CardStore

  constructor() {
    this.store = useCardStore()
  }

  public fetchCards(columnId: string): Promise<Card[]> {
    return this.store.fetchCards(columnId)
  }

  public getCardsForColumn(columnId: string, sortOrder: Column['sortOrder']) {
    const cards = this.store.getCardsByColumnId(columnId)

    if (sortOrder === 'asc') {
      return [...cards].sort((a, b) => a.title.localeCompare(b.title))
    }

    if (sortOrder === 'desc') {
      return [...cards].sort((a, b) => b.title.localeCompare(a.title))
    }

    if (sortOrder === 'shuffle') {
      const seeded = [...cards]
      for (let i = seeded.length - 1; i > 0; i--) {
        const j = randomInteger(0, i)
        ;[seeded[i], seeded[j]] = [seeded[j], seeded[i]]
      }
      return seeded
    }
  }

  public saveCards(cards: Card[]) {
    this.store.saveCards(cards)
  }

  public addCard(columnId: string, title: string) {
    this.store.addCard(this.createCard(columnId, title))
  }

  public updateCard(card: Card) {
    this.store.updateCard(card)
  }

  public clearCards(columnId: string) {
    this.store.deleteCardsForColumn(columnId)
  }

  public deleteCard(cardId: string) {
    this.store.deleteCard(cardId)
  }

  private createCard(columnId: string, title: string): Card {
    return {
      id: crypto.randomUUID(),
      title,
      columnId,
    }
  }
}
