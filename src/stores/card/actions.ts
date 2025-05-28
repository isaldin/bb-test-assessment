import type { CardActions, CardStore } from '@/stores/card/types.ts'
import type { Card } from '@/entities/card.ts'
import { getCards } from '@/stores/card/const.ts'

export const actions: CardActions = {
  fetchCards(this: CardStore, columnId: string): Promise<Card[]> {
    return Promise.resolve(getCards(columnId))
  },
  saveCards(this: CardStore, cards: Card[]) {
    cards.forEach((card) => {
      if (this.getCardById(card.id)) {
        this.updateCard(card)
      } else {
        this.addCard(card)
      }
    })
  },
  addCard(this: CardStore, card: Card) {
    this.items.push(card)
  },
  updateCard(this: CardStore, card: Partial<Card>) {
    const index = this.items.findIndex((c) => c.id === card.id)
    if (index !== -1) {
      Object.assign(this.items[index], card)
    }
  },
  deleteCardsForColumn(this: CardStore, columnId: string) {
    this.items = this.items.filter((card) => card.columnId !== columnId)
  },
  deleteCard(this: CardStore, cardId: string) {
    this.items = this.items.filter((card) => card.id !== cardId)
  },
}
