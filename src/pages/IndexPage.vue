<template>
  <div v-if="isLoading">loading...</div>
  <board-view v-else-if="defaultBoard" :board-id="defaultBoard.id" />
</template>

<script lang="ts" setup>
import BoardView from '@/views/board/BoardView.vue'
import { useBoard } from '@/compositions/board'
import { computed } from 'vue'

const { isLoading, initializeBoards, boards } = useBoard()

const defaultBoard = computed(() => {
  const allBoards = boards.value
  return allBoards[0]
})

initializeBoards()
</script>

<style lang="scss" scoped></style>
