import type { Column } from '@/entities/column.ts'
import { computed, type Ref, ref } from 'vue'
import { randomInteger } from '@/utils/randomInteger.ts'

export class ColumnService {
  private columns = ref(new Map<string, Ref<Column>[]>()) // реактивный Map

  public fetchColumns(boardId: string): Promise<Column[]> {
    const result: Column[] = [
      {
        id: '1',
        name: 'TODO',
        boardId,
        order: 0,
        sortOrder: 'asc',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: '2',
        name: 'In progress',
        boardId,
        order: 1,
        sortOrder: 'asc',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: '3',
        name: 'Done',
        boardId,
        order: 2,
        sortOrder: 'asc',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ]

    const wrapped = result.map((col) => ref(col))
    this.columns.value.set(boardId, wrapped)

    return Promise.resolve(result)
  }

  public saveColumns(boardId: string, columns: Column[]) {
    const wrapped = columns.map((col) => ref(col))
    this.columns.value.set(boardId, wrapped)
  }

  public getColumnsForBoard(boardId: string) {
    return computed(() => {
      const colRefs = this.columns.value.get(boardId) || []
      return colRefs.map((colRef) => colRef.value)
    })
  }

  public getColumnById(boardId: string, columnId: string) {
    return computed(() => {
      const colRefs = this.columns.value.get(boardId)
      return colRefs?.find((col) => col.value.id === columnId)?.value
    })
  }

  public saveColumn(column: Column) {
    const boardId = column.boardId
    const colRefs = this.columns.value.get(boardId) || []
    const existingIndex = colRefs.findIndex((col) => col.value.id === column.id)

    if (existingIndex !== -1) {
      colRefs[existingIndex].value = column
    } else {
      colRefs.push(ref(column))
    }

    this.columns.value.set(boardId, colRefs)
  }

  public addNewColumn = (boardId: string) => {
    const generateName = () => {
      const getNameForOrderNumber = (orderNumber: number) => `Column ${orderNumber}`

      const columns = this.getColumnsForBoard(boardId).value

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

    const colRefs = this.columns.value.get(boardId) || []
    this.columns.value.set(boardId, [...colRefs, ref(column)])
  }

  public shuffleColumns(boardId: string) {
    const colRefs = this.columns.value.get(boardId)
    if (!colRefs) return

    for (let i = colRefs.length - 1; i > 0; i--) {
      const j = randomInteger(0, colRefs.length - 1)
      ;[colRefs[i], colRefs[j]] = [colRefs[j], colRefs[i]]
    }

    this.columns.value.set(boardId, colRefs)
  }
}
