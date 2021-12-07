import { GroupContent, GroupContentType } from "./group-content"
import { ProjectType } from "./project"
import { GroupContentKindType, RawGroupContentType } from "./types"
import { contentLength } from "./length"
import { RowHeight } from "./height"

export interface GroupContentArrayType {
  content: GroupContentType[]
  length: () => number
  inView: (
    parentInstanceStart: number,
    viewStart: number,
    viewEnd: number
  ) => GroupContentType[]
  maxRow: () => number
  rowHeight: (row: number) => RowHeight
  height: () => RowHeight
}

export class GroupContentArray implements GroupContentArrayType {
  content: GroupContentType[]
  project: ProjectType

  constructor(project: ProjectType, raw: RawGroupContentType[]) {
    this.project = project
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

  rowHeight = (row: number): RowHeight => {
    let height = RowHeight.null()
    for (const c of this.content) {
      if (c.data.row === row) {
        if (c.kind === GroupContentKindType.Clip) {
          height = height.max(RowHeight.clipHeight())
        } else {
          const groupInstance = c.asGroupInstance()
          height = height.max(groupInstance.height())
        }
      }
    }
    return height
  }

  height = (): RowHeight => {
    let height = RowHeight.null()
    const maxRow = this.maxRow()
    for (let row = 0; row <= maxRow; row++) {
      height = height.add(this.rowHeight(row))
    }
    return height
  }
}
