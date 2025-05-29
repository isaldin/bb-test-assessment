<template>
  <card-view-layout :with-border="editMode">
    <card-title
      :model-value="props.title"
      :editable="editMode"
      :prevent-blur="preventBlur"
      @change="handleSaveChanges"
      @dblclick="$emit('start:editing')"
      @update:model-value="handleChangeTitle"
      @cancel:editing="handleCancelChanges"
    />

    <card-description
      :model-value="props.description || ''"
      :editable="editMode"
      :prevent-blur="preventBlur"
      @change="handleSaveChanges"
      @dblclick="$emit('start:editing')"
      @update:model-value="handleChangeDescription"
      @cancel:editing="handleCancelChanges"
    />

    <div v-if="editMode" class="card-view__actions">
      <button-with-icon ref="save-button" :disabled="savingDisabled" @click="handleSaveChanges">
        Save changes
        <template #icon>
          <icon-flash />
        </template>
      </button-with-icon>

      <button-with-icon ref="cancel-button" @click="handleCancelChanges">
        Cancel
        <template #icon>
          <icon-minus />
        </template>
      </button-with-icon>
    </div>
  </card-view-layout>
</template>

<script lang="ts" setup>
import CardTitle from '@/components/card/CardTitle.vue'
import ButtonWithIcon from '@/components/ButtonWithIcon.vue'
import IconFlash from '@/components/icons/IconFlash.vue'
import IconMinus from '@/components/icons/IconMinus.vue'
import CardDescription from '@/components/card/CardDescription.vue'
import CardViewLayout from '@/views/card/CardViewLayout.vue'
import { computed, ref, useTemplateRef } from 'vue'

const props = defineProps<{
  title: string
  description?: string
  editMode?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:card', card: { title: string; description?: string }): void
  (e: 'start:editing'): void
  (e: 'cancel:editing'): void
}>()

const saveBtnRef = useTemplateRef('save-button')
const cancelBtnRef = useTemplateRef('cancel-button')

const title = ref(props.title)
const description = ref(props.description || '')

const savingDisabled = computed(() => {
  return title.value === props.title && description.value === (props.description || '')
})

const handleChangeTitle = (value: string) => {
  title.value = value
}

const handleChangeDescription = (value: string) => {
  description.value = value
}

const handleSaveChanges = () => {
  emit('update:card', { title: title.value, description: description.value || undefined })
}

const handleCancelChanges = () => {
  title.value = props.title
  description.value = props.description || ''
  emit('cancel:editing')
}

const preventBlur = (e: FocusEvent) => {
  return e.relatedTarget === saveBtnRef.value?.$el || e.relatedTarget === cancelBtnRef.value?.$el
}
</script>

<style lang="scss" scoped>
.card-view {
  &__title {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: var(--color-black);
  }

  &__description {
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
    color: var(--color-gray);
    margin-top: 12px;
  }

  &__title,
  &__description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__actions {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }
}
</style>
