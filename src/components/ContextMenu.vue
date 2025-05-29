<template>
  <Teleport to="body">
    <div v-if="show" ref="menuRef" class="context-menu" :style="{ top: `${y}px`, left: `${x}px` }">
      <slot />
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
defineProps<{
  show: boolean
  x: number
  y: number
  menuRef: HTMLElement | null
}>()
</script>

<style lang="scss">
.context-menu {
  position: fixed;
  background: white;
  border: 1px solid #ccc;
  z-index: 9999;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  ul {
    padding: 8px;
    margin: 0;
    list-style: none;
    cursor: pointer;

    &:hover {
      background-color: whitesmoke;
    }
  }
}
</style>
