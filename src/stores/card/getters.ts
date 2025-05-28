import type { CardGetters } from '@/stores/card/types.ts'

export const getters: CardGetters = {
  getCardsByColumnId: (state) => (columnId: string) => {
    return state.items.filter((card) => card.columnId === columnId)
  },
  getCardById: (state) => (cardId: string) => {
    return state.items.find((card) => card.id === cardId)
  },
}
