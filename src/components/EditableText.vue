<template>
  <slot :switch-to-edit="switchToEditMode" v-if="!isEditMode" />
  <slot v-else name="editable" :commit="handleCommit" :cancel="handleCancel" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const emits = defineEmits<{
  (e: 'save', value: string): void
}>()

const isEditMode = ref(false)

const switchToEditMode = () => {
  isEditMode.value = true
}

const handleCommit = (value: string) => {
  emits('save', value)
  isEditMode.value = false
}

const handleCancel = () => {
  isEditMode.value = false
}
</script>

<style lang="scss" scoped></style>
