<template>
  <div class="column-title">
    <editable-text @save="emit('update:modelValue', $event)">
      <template #default="slotProps">
        <div class="column-title__display" @click="slotProps.switchToEdit">{{ modelValue }}</div>
        <span class="column-title__cards-count">{{ cardsCount }}</span>
      </template>

      <template #editable="slotProps">
        <div
          ref="divContentRef"
          contenteditable
          class="column-title__edit"
          @keydown="handleCommit($event, slotProps.commit, slotProps.cancel)"
          @blur="slotProps.cancel"
        >
          {{ modelValue }}
        </div>
      </template>
    </editable-text>
  </div>
</template>

<script setup lang="ts">
import EditableText from '@/components/EditableText.vue'
import { ref, watch } from 'vue'
import { setCursorToTheEnd } from '@/utils/setCursorToTheEnd.ts'

defineProps<{
  modelValue: string
  cardsCount: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const divContentRef = ref<HTMLDivElement>()

const handleCommit = (
  event: KeyboardEvent,
  commitFn: (value: string) => void,
  cancelFn: () => void,
) => {
  if (event.key === 'Escape') {
    cancelFn()
    return
  }

  if (event.key !== 'Enter') {
    return
  }

  if (divContentRef.value?.textContent) {
    commitFn(divContentRef.value.textContent)
  }
}

watch(divContentRef, setCursorToTheEnd)
</script>

<style lang="scss" scoped>
.column-title {
  font-size: 13px;
  color: var(--color-gray);
  font-weight: 600;
  text-transform: uppercase;

  &__display {
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__cards-count {
    margin-left: 8px;
    color: var(--color-dark-gray);
    font-size: 13px;
  }

  &__edit {
    width: 100%;
  }
}
</style>
