import type { Column } from '@/entities/column.ts'
import { useColumnStore } from '@/stores/column'
import { getRandomUuid } from '@/utils/getRandomUuid.ts'

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
    const existingColumn = this.store.getColumnById(column.id)
    if (existingColumn) {
      this.store.updateColumn(column)
    } else {
      this.store.addColumn(column)
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

    this.store.addColumn(this.createColumn(generateName(), boardId))
  }

  public shuffleColumns(boardId: string) {
    this.store.shuffleColumns(boardId)
  }

  public deleteColumn(columnId: string) {
    this.store.deleteColumn(columnId)
  }

  public shuffleCards(columnId: string) {
    this.store.shuffleCards(columnId)
  }

  public disableColumn(columnId: string) {
    this.store.disableColumn(columnId)
  }

  public enableColumn(columnId: string) {
    this.store.enableColumn(columnId)
  }

  private createColumn(name: string, boardId: string): Column {
    return {
      id: getRandomUuid(),
      name,
      boardId,
      shuffleKey: 0,
      sortOrder: 'asc',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
  }
}
