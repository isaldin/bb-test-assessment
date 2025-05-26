import { ref } from 'vue'
import { ServiceLocator } from '@/services/service-locator.ts'

export const useColumn = () => {
  const isLoading = ref(false)

  const columnService = ServiceLocator.getColumnService()

  const initializeColumns = async (boardId: string) => {
    isLoading.value = true
    try {
      const columns = await columnService.fetchColumns(boardId)
      columnService.saveColumns(boardId, columns)
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

  const getColumnById = (boardId: string, columnId: string) => {
    return columnService.getColumnById(boardId, columnId)
  }

  return {
    isLoading,
    initializeColumns,
    getColumnsForBoard,
    getColumnById,
  }
}
