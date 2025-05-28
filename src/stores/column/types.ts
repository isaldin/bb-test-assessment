import type { Column } from '@/entities/column.ts'
import type { Store } from 'pinia'

export type ColumnState = {
  items: Column[]
}

export type ColumnGetters = {
  getColumnsByBoardId: (state: ColumnState) => (boardId: string) => Column[]
  getColumnById: (state: ColumnState) => (columnId: string) => Column | undefined
}

export type ColumnActions = {
  fetchColumns: (boardId: string) => Promise<Column[]>
  setColumns: (columns: Column[]) => void
  shuffleColumns: (boardId: string) => void
  deleteColumn: (columnId: string) => void
  addColumn: (column: Column) => void
  shuffleCards: (columnId: string) => void
}

export type ColumnStore = Store<'columns', ColumnState, ColumnGetters, ColumnActions>
