<template>
  <button-with-icon class="new-card-button">
    <span class="new-card-button__title">New card</span>
    <template #icon>
      <icon-plus />
    </template>
  </button-with-icon>
</template>
<script setup lang="ts">
import ButtonWithIcon from '@/components/ButtonWithIcon.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
</script>

<style lang="scss" scoped>
.new-card-button {
  height: 32px;
  outline: none;
  border-radius: 8px;
  background: #ced9e3;
  justify-content: center;

  &:hover {
    background-color: #d0cee3;
  }

  &__title {
    margin-left: 4px;
  }
}
</style>
