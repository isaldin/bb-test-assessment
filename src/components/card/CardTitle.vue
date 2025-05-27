<template>
  <div class="card-title">
    <editable-text :editable="editable" @save="emit('update:modelValue', $event)">
      <template #default="slotProps">
        <div class="card-title__display" @click="slotProps.switchToEdit">
          {{ modelValue }}
        </div>
      </template>

      <template #editable="slotProps">
        <div
          ref="divContentRef"
          contenteditable
          class="card-title__edit"
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
  editable?: boolean
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

  const textContent = divContentRef.value?.textContent
  if (textContent) {
    commitFn(textContent)
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
.card-title {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: var(--color-black);

  &__display {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__edit {
    width: 100%;
    overflow-y: auto;
    height: 40px;
  }
}
</style>
