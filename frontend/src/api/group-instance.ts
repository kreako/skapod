import { GroupType } from "./group"
import { ProjectType } from "./project"
import { ColorType, RawGroupInstanceType } from "./types"

export interface GroupInstanceType {
  id: string
  groupId: string
  // start position in seconds relative to the parent group
  start: number
  // vertical position from 0 to ... : 0 is on top and n is lower
  row: number
  muted: boolean
  color: ColorType
  length: () => number
  group: () => GroupType
}

export class GroupInstance implements GroupInstanceType {
  id: string
  groupId: string
  start: number
  row: number
  muted: boolean
  color: ColorType
  project: ProjectType

  constructor(project: ProjectType, raw: RawGroupInstanceType) {
    this.id = raw.id
    this.groupId = raw.group
    this.start = raw.start
    this.row = raw.row
    this.muted = raw.muted
    this.color = raw.color
  }

  length = (): number => this.group().length()

  group = (): GroupType => this.project.groups[this.groupId]
}
