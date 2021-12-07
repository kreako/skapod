import { GroupContentArray, GroupContentArrayType } from "./group-content-array"
import { RowHeight } from "./height"
import { ProjectType } from "./project"
import { RawGroupType } from "./types"

export interface GroupType {
  id: string
  name: string
  content: GroupContentArrayType
  length: () => number
  expandedHeight: () => RowHeight
}

export class Group implements GroupType {
  id: string
  name: string
  content: GroupContentArrayType

  project: ProjectType

  constructor(project: ProjectType, raw: RawGroupType) {
    this.project = project
    this.id = raw.id
    this.name = raw.name
    this.content = new GroupContentArray(project, raw.content)
  }

  length = (): number => this.content.length()

  expandedHeight = (): RowHeight => {
    // all of my content
    const h = this.content.height()
    // and my header
    h.groupHeader += 1
    return h
  }
}
