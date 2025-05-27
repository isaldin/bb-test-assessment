import { ref } from 'vue'
import { ServiceLocator } from '@/services/service-locator.ts'

const currentlyEditingCardId = ref<string | null>(null)

export const useCard = () => {
  const isLoading = ref(false)

  const newCardShownForColumnId = ref<string | null>(null)

  const cardService = ServiceLocator.getCardService()

  const initializeCards = async (columnId: string) => {
    isLoading.value = true
    try {
      const cards = await cardService.fetchCards(columnId)
      cardService.saveCards(columnId, cards)
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const startEditingCard = (cardId: string | null) => {
    if (cardId === null) {
      currentlyEditingCardId.value = null
      return
    }

    if (currentlyEditingCardId.value === cardId) {
      currentlyEditingCardId.value = null
    } else {
      currentlyEditingCardId.value = cardId
    }
  }

  const showNewCardForColumn = (columnId: string) => {
    newCardShownForColumnId.value = columnId
  }

  const hideNewCardForColumn = () => {
    newCardShownForColumnId.value = null
  }

  const createNewCard = (columnId: string, title: string) => {
    cardService.addCard(columnId, title)
  }

  const getCardsForColumn = (columnId: string) => {
    return cardService.getCardsForColumn(columnId)
  }

  return {
    initializeCards,
    getCardsForColumn,
    currentlyEditingCardId,
    startEditingCard,
    newCardShownForColumnId,
    showNewCardForColumn,
    hideNewCardForColumn,
    createNewCard,
  }
}
