export interface Column {
  id: string
  name: string
  boardId: string
  disabled?: boolean
  sortOrder: 'asc' | 'desc' | 'shuffle'
  shuffleKey: number
  createdAt: number
  updatedAt: number
  deletedAt?: number | null
}
