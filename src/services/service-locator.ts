import { BoardService } from '@/services/board.service.ts'
import { ColumnService } from '@/services/column.service.ts'

/** I know it's not a good pattern, but for this task is suitable */
export class ServiceLocator {
  private static boardService: BoardService
  private static columnService: ColumnService

  static getBoardService() {
    if (!this.boardService) {
      this.boardService = new BoardService()
    }

    return this.boardService
  }

  static getColumnService() {
    if (!this.columnService) {
      this.columnService = new ColumnService()
    }

    return this.columnService
  }
}
