<template>
  <card-view-layout with-border>
    <div
      ref="divContentRef"
      contenteditable
      class="new-card-view__title"
      @keydown="handleKeyPress"
      @blur="handleBlur"
    />
  </card-view-layout>
</template>
<script setup lang="ts">
import CardViewLayout from '@/views/card/CardViewLayout.vue'
import { ref, watch } from 'vue'
import { setCursorToTheEnd } from '@/utils/setCursorToTheEnd.ts'

const emit = defineEmits<{
  (e: 'update:model', value: string): void
  (e: 'cancel'): void
}>()

const divContentRef = ref<HTMLDivElement>()

const cancelEditing = () => {
  if (divContentRef.value) {
    divContentRef.value!.contentEditable = 'false'
  }
}

const handleBlur = () => {
  emit('cancel')
  cancelEditing()
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    const textContent = divContentRef.value!.textContent || ''

    if (!textContent) {
      event.preventDefault()
      return
    }

    emit('update:model', textContent)
    cancelEditing()
  } else if (event.key === 'Escape') {
    emit('cancel')
    cancelEditing()
  }
}

watch(divContentRef, (el) => {
  setCursorToTheEnd(el)

  if (el) {
    el.scrollTop = el.scrollHeight
  }
})
</script>

<style lang="scss" scoped>
.new-card-view {
  &__title {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: var(--color-black);
    overflow-y: auto;
    height: 40px;
    padding-left: 2px;
  }
}
</style>
