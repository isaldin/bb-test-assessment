import { computed, ref } from 'vue'
import { ServiceLocator } from '@/services/service-locator.ts'
import type { Board } from '@/entities/board.ts'

export const useBoard = () => {
  const isLoading = ref(false)

  const boardService = ServiceLocator.getBoardService()

  const boards = computed(() => boardService.getAll().value as Board[])

  const fetchBoards = () => {
    return boardService.fetchBoards()
  }

  const initializeBoards = async () => {
    isLoading.value = true
    try {
      const boards = await fetchBoards()
      boardService.saveBoards(boards)

      // artificial delay to simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Error initializing boards:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    initializeBoards,
    boards,
  }
}
