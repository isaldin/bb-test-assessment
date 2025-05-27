import { defineStore } from 'pinia'
import { state } from './state.ts'
import { getters } from './getters.ts'
import { actions } from './actions.ts'
import type { ColumnActions, ColumnGetters, ColumnState } from '@/stores/column/types.ts'

export const useColumnStore = defineStore<'columns', ColumnState, ColumnGetters, ColumnActions>(
  'columns',
  {
    state,
    getters,
    actions,
  },
)
