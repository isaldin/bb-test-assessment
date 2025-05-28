export interface Column {
  id: string
  name: string
  boardId: string
  order: number
  disabled?: boolean
  sortOrder: 'asc' | 'desc' | 'shuffle'
  createdAt: number
  updatedAt: number
  deletedAt?: number | null
}
