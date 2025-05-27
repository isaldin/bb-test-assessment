<template>
  <div class="card-description">
    <editable-text :editable="editable" @save="emit('update:modelValue', $event)">
      <template #default="slotProps">
        <div
          class="card-description__display"
          :class="{ 'card-description__display--bold': !modelValue }"
          @click="slotProps.switchToEdit"
        >
          {{ modelValue || 'Add description' }}
        </div>
      </template>

      <template #editable="slotProps">
        <div
          ref="divContentRef"
          contenteditable
          class="card-description__edit"
          @input="handleInput"
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
  modelValue: string | undefined
  editable?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'commit:changes', value: string): void
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
  if (textContent != null) {
    commitFn(textContent)
    emit('commit:changes', textContent)
  }
}

const handleInput = () => {
  if (divContentRef.value) {
    const text = divContentRef.value.textContent || ''
    emit('update:modelValue', text)
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
.card-description {
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  color: var(--color-gray);
  margin-top: 12px;

  &__display {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;

    &--bold {
      font-weight: 600;
    }
  }

  &__edit {
    width: 100%;
    overflow-y: auto;
    height: 32px;
  }
}
</style>
