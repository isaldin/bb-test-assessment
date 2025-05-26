<template>
  <button class="button-with-icon">
    <div class="button-with-icon__icon">
      <slot name="icon" />
    </div>
    <span class="button-with-icon__text">
      <slot />
    </span>
  </button>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.button-with-icon {
  align-items: center;
  display: flex;
  font-size: 13px;
  font-weight: 600;
  padding: 4px 8px 4px;
  border: none;
  outline: 2px solid rgba(0, 0, 0, 0.05);
  outline-offset: -2px;
  border-radius: 12px;
  height: 24px;
  background-color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  &__icon {
    align-items: center;
    display: flex;
  }

  &__text {
    margin-left: 4px;
  }
}
</style>
