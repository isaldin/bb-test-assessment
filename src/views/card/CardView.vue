<template>
  <card-view-layout :with-border="editMode">
    <card-title
      :model-value="title"
      :editable="editMode"
      @commit:changes="handleCommitTitleChanges"
      @update:model-value="handleChangeTitle"
    />

    <card-description
      :model-value="description"
      :editable="editMode"
      @commit:changes="handleCommitDescriptionChanges"
      @update:model-value="handleChangeDescription"
    />

    <div v-if="editMode" class="card-view__actions">
      <button-with-icon :disabled="savingDisabled" @click="handleSaveChanges">
        Save changes
        <template #icon>
          <icon-flash />
        </template>
      </button-with-icon>

      <button-with-icon @click="handleCancelChanges">
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
import { computed, ref } from 'vue'

const props = defineProps<{
  title: string
  description?: string
  editMode?: boolean
}>()

const emit = defineEmits<{
  (e: 'cancel:editing'): void
}>()

const title = ref(props.title)
const description = ref(props.description)

const titleChanged = ref(false)
const descriptionChanged = ref(false)

const savingDisabled = computed(() => {
  if (!descriptionChanged.value) {
    return !titleChanged.value
  }

  return !titleChanged.value && !descriptionChanged.value
})

const handleChangeTitle = (newTitle: string) => {
  titleChanged.value = newTitle !== props.title
}

const handleCommitTitleChanges = (value: string) => {
  title.value = value
}

const handleChangeDescription = (newDescription: string) => {
  descriptionChanged.value = newDescription !== (props.description || '')
}

const handleCommitDescriptionChanges = (value: string) => {
  description.value = value
}

const handleSaveChanges = () => {
  console.log('Changes saved')
}

const handleCancelChanges = () => {
  title.value = props.title
  description.value = props.description
  emit('cancel:editing')
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
