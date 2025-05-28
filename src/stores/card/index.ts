import { defineStore } from 'pinia'
import type { CardActions, CardGetters, CardState } from '@/stores/card/types.ts'
import { state } from '@/stores/card/state.ts'
import { getters } from '@/stores/card/getters.ts'
import { actions } from '@/stores/card/actions.ts'

export const useCardStore = defineStore<'cards', CardState, CardGetters, CardActions>('cards', {
  state,
  getters,
  actions,
})
