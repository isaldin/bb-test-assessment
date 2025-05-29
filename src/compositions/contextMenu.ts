import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useContextMenu() {
  const contextMenuShown = ref(false)
  const x = ref(0)
  const y = ref(0)
  const menuRef = ref<HTMLElement | null>(null)
  const cardIdRef = ref<string | null>(null)

  const openContextMenu = (e: MouseEvent, cardId: string) => {
    cardIdRef.value = cardId
    e.preventDefault()
    x.value = e.clientX
    y.value = e.clientY
    contextMenuShown.value = true
  }

  const closeContextMenu = () => {
    contextMenuShown.value = false
  }

  const handleOutsideClick = (e: MouseEvent) => {
    if (!menuRef.value?.contains(e.target as Node)) {
      closeContextMenu()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleOutsideClick)
    window.addEventListener('scroll', closeContextMenu)
    window.addEventListener('resize', closeContextMenu)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleOutsideClick)
    window.removeEventListener('scroll', closeContextMenu)
    window.removeEventListener('resize', closeContextMenu)
  })

  return {
    contextMenuShown,
    x,
    y,
    menuRef,
    openContextMenu,
    closeContextMenu,
    cardIdRef,
  }
}
