import { ref } from 'vue'

const currentlyEditingCardId = ref<string | null>(null)

export const useCard = () => {
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

  return {
    currentlyEditingCardId,
    startEditingCard,
  }
}
