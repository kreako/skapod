import { ClipInstance, ClipInstanceType } from "./clip-instance"
import { GroupType } from "./group"
import { GroupInstance, GroupInstanceType } from "./group-instance"
import { ProjectType } from "./project"
import {
  GroupContentKindType,
  RawClipInstanceType,
  RawGroupContentType,
  RawGroupInstanceType,
} from "./types"
import { isObjectInView } from "./view"

export interface GroupContentType {
  kind: GroupContentKindType
  data: GroupInstanceType | ClipInstanceType
  asClip: () => ClipInstanceType
  asGroup: () => GroupInstanceType
  isInView: (viewStart: number, viewEnd: number) => boolean
}

export class GroupContent implements GroupContentType {
  kind: GroupContentKindType
  data: GroupInstanceType | ClipInstanceType
  project: ProjectType
  // a null group means that I'm in root group content
  group: GroupType

  constructor(
    project: ProjectType,
    group: GroupType,
    raw: RawGroupContentType
  ) {
    this.project = project
    this.group = group
    this.kind = raw.kind
    if (raw.kind === GroupContentKindType.Clip) {
      this.data = new ClipInstance(project, raw.data as RawClipInstanceType)
    } else {
      this.data = new GroupInstance(project, raw.data as RawGroupInstanceType)
    }
  }

  asClip = (): ClipInstanceType => {
    if (this.kind === GroupContentKindType.Clip) {
      return this.data as ClipInstanceType
    }
    throw new Error("This content is not a clip !")
  }

  asGroup = (): GroupInstanceType => {
    if (this.kind === GroupContentKindType.Group) {
      return this.data as GroupInstanceType
    }
    throw new Error("this content is not a group !")
  }

  isInView = (viewStart: number, viewEnd: number): boolean => {
    let rootStart = null
    if (this.group == null) {
      rootStart = 0
    } else {
      rootStart = this.group.start
    }
    let start = null
    let length = null
    if (this.kind === GroupContentKindType.Clip) {
      const clipInstance = this.asClip()
      start = rootStart + clipInstance.start
      length = clipInstance.clip().length
    } else {
      const groupInstance = this.asGroup()
      start = rootStart + groupInstance.start
      length = groupInstance.group().length()
    }
    return isObjectInView(viewStart, viewEnd, start, length)
  }
}
