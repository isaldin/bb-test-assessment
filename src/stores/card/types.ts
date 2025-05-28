import type { Card } from '@/entities/card.ts'
import type { Store } from 'pinia'

export type CardState = {
  items: Card[]
}

export type CardGetters = {
  getCardsByColumnId: (state: CardState) => (columnId: string) => Card[]
  getCardById: (state: CardState) => (cardId: string) => Card | undefined
}

export type CardActions = {
  fetchCards: (columnId: string) => Promise<Card[]>
  saveCards: (cards: Card[]) => void
  addCard: (card: Card) => void
  updateCard: (card: Partial<Card>) => void
  deleteCardsForColumn: (columnId: string) => void
  deleteCard: (cardId: string) => void
}

export type CardStore = Store<'cards', CardState, CardGetters, CardActions>
