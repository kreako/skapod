import { GroupContent, GroupContentType } from "./group-content"
import { GroupInstanceType } from "./group-instance"
import { contentLength } from "./length"
import { ProjectType } from "./project"
import {
  ColorType,
  GroupContentKindType,
  GroupDisplayType,
  RawGroupType,
} from "./types"

export interface GroupType {
  id: string
  name: string
  content: GroupContentType[]
  length: () => number
}

export class Group implements GroupType {
  id: string
  name: string
  content: GroupContentType[]

  project: ProjectType

  constructor(project: ProjectType, raw: RawGroupType) {
    this.project = project
    this.id = raw.id
    this.name = raw.name
    this.content = raw.content.map((c) => new GroupContent(project, c))
  }

  length = (): number => contentLength(this.content)
}
