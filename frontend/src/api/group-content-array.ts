import { GroupContent, GroupContentType } from "./group-content"
import { ProjectType } from "./project"
import { GroupContentKindType, RawGroupContentType } from "./types"
import { contentLength } from "./length"

export interface GroupContentArrayType {
  content: GroupContentType[]
  length: () => number
  inView: (
    parentInstanceStart: number,
    viewStart: number,
    viewEnd: number
  ) => GroupContentType[]
  maxRow: () => number
  rowHeight: (row: number) => number
  height: () => number
}

export class GroupContentArray implements GroupContentArrayType {
  content: GroupContentType[]
  project: ProjectType

  constructor(project: ProjectType, raw: RawGroupContentType[]) {
    this.project = project
    // Sort by row ascending order
    raw.sort((a, b) => a.data.row - b.data.row)
    this.content = raw.map((c) => new GroupContent(project, c))
  }

  length = (): number => contentLength(this.content)

  inView = (
    parentInstanceStart: number,
    viewStart: number,
    viewEnd: number
  ): GroupContentType[] =>
    this.content.filter((c) =>
      c.isInView(parentInstanceStart, viewStart, viewEnd)
    )

  maxRow = (): number => Math.max(0, ...this.content.map((c) => c.data.row))

  rowHeight = (row: number): number => {
    let height = 0
    for (const c of this.content) {
      if (c.data.row === row) {
        if (c.kind === GroupContentKindType.Clip) {
          height = Math.max(height, 1)
        } else {
          const groupInstance = c.asGroupInstance()
          height = Math.max(height, groupInstance.height())
        }
      }
    }
    return height
  }

  height = (): number => {
    let height = 0
    const maxRow = this.maxRow()
    for (let row = 0; row <= maxRow; row++) {
      height += this.rowHeight(row)
    }
    return height
  }
}
