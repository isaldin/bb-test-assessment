import type { ColumnActions, ColumnStore, ColumnGetters, ColumnState } from './types.ts'
import { getColumns } from '@/stores/column/const.ts'
import type { Column } from '@/entities/column.ts'
import { randomInteger } from '@/utils/randomInteger.ts'

export const actions: ColumnActions = {
  async fetchColumns(boardId: string) {
    return Promise.resolve(getColumns(boardId))
  },
  setColumns(this: ColumnState, columns: Column[]) {
    this.items = columns
  },
  shuffleColumns(this: ColumnStore, boardId: string) {
    const columns = this.getColumnsByBoardId(boardId)
    if (columns.length === 0) {
      return
    }

    for (let i = columns.length - 1; i > 0; i--) {
      const j = randomInteger(0, columns.length - 1)
      ;[columns[i], columns[j]] = [columns[j], columns[i]]
    }

    this.items = columns
  },
  deleteColumn(this: ColumnStore, columnId: string) {
    this.items = this.items.filter((column) => column.id !== columnId)
  },
  addColumn(this: ColumnStore, column: Column) {
    this.items.push(column)
  },
  shuffleCards(this: ColumnStore, columnId: string) {
    const column = this.getColumnById(columnId)
    if (!column) {
      return
    }

    column.sortOrder = 'shuffle'
  },
}
