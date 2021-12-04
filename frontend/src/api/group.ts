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
  color: ColorType
  display: GroupDisplayType
  muted: boolean
  length: () => number
}

export class Group implements GroupType {
  id: string
  name: string
  content: GroupContentType[]
  color: ColorType
  display: GroupDisplayType
  muted: boolean

  project: ProjectType

  constructor(project: ProjectType, raw: RawGroupType) {
    this.project = project
    this.id = raw.id
    this.name = raw.name
    this.content = raw.content.map((c) => new GroupContent(project, c))
    this.color = raw.color
    this.display = raw.display
    this.muted = raw.muted
  }

  length = (): number => contentLength(this.content)
}
