type Element = HTMLDivElement

export const setCursorToTheEnd = (el?: Element) => {
  if (!el) {
    return
  }

  el.focus()

  const range = document.createRange()
  range.selectNodeContents(el)
  range.collapse(false)

  const sel = window.getSelection()
  sel?.removeAllRanges()
  sel?.addRange(range)
}
