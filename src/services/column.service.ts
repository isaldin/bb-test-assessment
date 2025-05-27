import type { Column } from '@/entities/column.ts'
import { useColumnStore } from '@/stores/column'

type ColumnStore = ReturnType<typeof useColumnStore>

export class ColumnService {
  private readonly store: ColumnStore

  constructor() {
    this.store = useColumnStore()
  }
  public fetchColumns(boardId: string): Promise<Column[]> {
    return this.store.fetchColumns(boardId)
  }

  public saveColumns(columns: Column[]) {
    this.store.setColumns(columns)
  }

  public getColumnsForBoard(boardId: string) {
    return this.store.getColumnsByBoardId(boardId)
  }

  public getColumnById(columnId: string) {
    return this.store.getColumnById(columnId)
  }

  public saveColumn(column: Column) {
    const columnIdx = this.store.items.findIndex((item) => item.id === column.id)
    if (columnIdx === -1) {
      this.store.items[columnIdx] = { ...this.store.items[columnIdx], ...column }
    }
  }

  public addNewColumn = (boardId: string) => {
    const generateName = () => {
      const getNameForOrderNumber = (orderNumber: number) => `Column ${orderNumber}`

      const columns = this.getColumnsForBoard(boardId)

      let orderNumber = columns.length
      while (columns.find((column) => column.name === getNameForOrderNumber(orderNumber))) {
        orderNumber++
      }

      return getNameForOrderNumber(orderNumber)
    }

    const column: Column = {
      id: crypto.randomUUID(),
      name: generateName(),
      boardId,
      order: 0,
      sortOrder: 'asc',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    this.store.addColumn(column)
  }

  public shuffleColumns(boardId: string) {
    this.store.shuffleColumns(boardId)
  }

  public deleteColumn(columnId: string) {
    this.store.deleteColumn(columnId)
  }
}
