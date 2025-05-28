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
    const columns = [...this.getColumnsByBoardId(boardId)]
    if (columns.length === 0) {
      return
    }

    for (let i = columns.length - 1; i > 0; i--) {
      const j = randomInteger(0, i)
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
  updateColumn(this: ColumnStore, column: Partial<Column>) {
    const index = this.items.findIndex((col) => col.id === column.id)

    if (index === -1) {
      return
    }

    Object.assign(this.items[index], column)
  },
  shuffleCards(this: ColumnStore, columnId: string) {
    const column = this.getColumnById(columnId)
    if (!column) {
      return
    }

    this.updateColumn({
      id: columnId,
      sortOrder: 'shuffle',
      shuffleKey: column.shuffleKey + 1,
    })
  },
  disableColumn(this: ColumnStore, columnId: string) {
    const column = this.getColumnById(columnId)
    if (!column) {
      return
    }

    column.disabled = true
  },
  enableColumn(this: ColumnStore, columnId: string) {
    const column = this.getColumnById(columnId)
    if (!column) {
      return
    }

    column.disabled = false
  },
}
