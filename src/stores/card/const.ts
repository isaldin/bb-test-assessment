import { getRandomUuid } from '@/utils/getRandomUuid.ts'
import type { Card } from '@/entities/card.ts'

const cardsMap: Record<string, Card[]> = {}

export const getCards = (columnId: string) => {
  if (!cardsMap[columnId]) {
    cardsMap[columnId] = [
      { id: getRandomUuid(), title: 'Sample Card' },
      { id: getRandomUuid(), title: 'Some another Sample Card' },
      { id: getRandomUuid(), title: 'Yet another Sample Card' },
    ].map((card) => ({ ...card, columnId }))
  }
  return cardsMap[columnId]
}
