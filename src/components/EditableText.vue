<template>
  <slot
    v-if="editable && isEditMode"
    name="editable"
    :commit="handleCommit"
    :cancel="handleCancel"
  />
  <slot :switch-to-edit="switchToEditMode" v-else />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

withDefaults(
  defineProps<{
    editable?: boolean
  }>(),
  {
    editable: true,
  },
)

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
