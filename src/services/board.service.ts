import type { Board } from '@/entities/board.ts'
import { ref, type Ref } from 'vue'

export class BoardService {
  private boards: Ref<Board[]> = ref([])

  public fetchBoards(): Promise<Board[]> {
    return Promise.resolve([
      {
        id: 'default-board',
        name: 'Default Board',
      },
    ] satisfies Board[])
  }

  public saveBoards(boards: Board[]) {
    this.boards.value = boards
  }

  public getAll(): Ref<Board[]> {
    return this.boards
  }
}
