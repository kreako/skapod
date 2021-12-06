import { GroupContent, GroupContentType } from "./group-content"
import { ProjectType } from "./project"
import { RawGroupContentType } from "./types"
import { contentLength } from "./length"

export interface GroupContentArrayType {
  content: GroupContentType[]
  length: () => number
  inView: (
    parentInstanceStart: number,
    viewStart: number,
    viewEnd: number
  ) => GroupContentType[]
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
}
