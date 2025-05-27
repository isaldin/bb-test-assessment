<template>
  <div class="card-description">
    <editable-text :editable="editable" @save="emit('update:modelValue', $event)">
      <template #default="slotProps">
        <div class="card-description__display" @click="slotProps.switchToEdit">
          {{ modelValue }}
        </div>
      </template>

      <template #editable="slotProps">
        <div
          ref="divContentRef"
          contenteditable
          class="card-description__edit"
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

  if (divContentRef.value?.textContent) {
    commitFn(divContentRef.value.textContent)
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
  }

  &__edit {
    width: 100%;
    overflow-y: auto;
    height: 32px;
  }
}
</style>
