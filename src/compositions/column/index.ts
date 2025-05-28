import { ref } from 'vue'
import { ServiceLocator } from '@/services/service-locator.ts'
import type { Column } from '@/entities/column.ts'

export const useColumn = () => {
  const isLoading = ref(false)

  const columnService = ServiceLocator.getColumnService()

  const initializeColumns = async (boardId: string) => {
    isLoading.value = true
    try {
      const columns = await columnService.fetchColumns(boardId)
      columnService.saveColumns(columns)
    } catch (error) {
      console.error('Error fetching columns:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const getColumnsForBoard = (boardId: string) => {
    return columnService.getColumnsForBoard(boardId)
  }

  const getColumnById = (columnId: string) => {
    return columnService.getColumnById(columnId)
  }

  const updateColumn = (column: Column) => {
    columnService.saveColumn(column)
  }

  const addNewColumn = (boardId: string) => {
    columnService.addNewColumn(boardId)
  }

  const shuffleColumns = (boardId: string) => {
    columnService.shuffleColumns(boardId)
  }

  const deleteColumn = (columnId: string) => {
    columnService.deleteColumn(columnId)
  }

  const shuffleCards = (columnId: string) => {
    columnService.shuffleCards(columnId)
  }

  const disableColumn = (columnId: string) => {
    columnService.disableColumn(columnId)
  }

  const enableColumn = (columnId: string) => {
    columnService.enableColumn(columnId)
  }

  return {
    isLoading,
    initializeColumns,
    getColumnsForBoard,
    getColumnById,
    updateColumn,
    addNewColumn,
    shuffleColumns,
    deleteColumn,
    shuffleCards,
    disableColumn,
    enableColumn,
  }
}
