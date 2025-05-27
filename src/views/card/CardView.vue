<template>
  <card-view-layout :with-border="editMode">
    <card-title :editable="editMode" :model-value="title" @update:model-value="handleUpdateTitle" />

    <card-description
      :model-value="description"
      :editable="editMode"
      @update:model-value="handleUpdateDescription"
    />

    <div v-if="editMode" class="card-view__actions">
      <button-with-icon @click="handleSaveChanges">
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

defineProps<{
  title: string
  description?: string
  editMode?: boolean
}>()

const emit = defineEmits<{
  (e: 'cancel:editing'): void
}>()

const handleUpdateTitle = (newTitle: string) => {
  console.log('Updated title:', newTitle)
}

const handleUpdateDescription = (newDescription: string) => {
  console.log('Updated description:', newDescription)
}

const handleSaveChanges = () => {
  console.log('Changes saved')
}

const handleCancelChanges = () => {
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
