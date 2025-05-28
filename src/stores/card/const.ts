import { getRandomUuid } from '@/utils/getRandomUuid.ts'

export const getCards = (columnId: string) => [
  { id: getRandomUuid(), columnId, title: 'Sample Card' },
  { id: getRandomUuid(), columnId, title: 'Some another Sample Card' },
  { id: getRandomUuid(), columnId, title: 'Yet another Sample Card' },
]
