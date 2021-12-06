import { GroupContentArray, GroupContentArrayType } from "./group-content-array"
import { ProjectType } from "./project"
import { RawGroupType } from "./types"

export interface GroupType {
  id: string
  name: string
  content: GroupContentArrayType
  length: () => number
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
}
