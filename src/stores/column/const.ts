import type { Column } from '@/entities/column.ts'

export const getColumns = (boardId: string): Column[] => [
  {
    id: crypto.randomUUID(),
    name: 'TODO',
    boardId,
    shuffleKey: 0,
    sortOrder: 'asc',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    name: 'In progress',
    boardId,
    shuffleKey: 0,
    sortOrder: 'asc',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    name: 'Done',
    boardId,
    shuffleKey: 0,
    sortOrder: 'asc',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
]
