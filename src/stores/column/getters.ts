import type { ColumnGetters } from '@/stores/column/types.ts'

export const getters: ColumnGetters = {
  getColumnsByBoardId: (state) => (boardId: string) => {
    return state.items.filter((column) => column.boardId === boardId)
  },
  getColumnById: (state) => (columnId: string) => {
    return state.items.find((column) => column.id === columnId)
  },
}
