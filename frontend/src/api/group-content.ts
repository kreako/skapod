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
  isInView: (rootStart: number, viewStart: number, viewEnd: number) => boolean
  id: () => string
}

export class GroupContent implements GroupContentType {
  kind: GroupContentKindType
  data: GroupInstanceType | ClipInstanceType
  project: ProjectType

  constructor(project: ProjectType, raw: RawGroupContentType) {
    this.project = project
    this.kind = raw.kind
    if (raw.kind === GroupContentKindType.Clip) {
      this.data = new ClipInstance(project, raw.data as RawClipInstanceType)
    } else {
      this.data = new GroupInstance(project, raw.data as RawGroupInstanceType)
    }
  }

  id = (): string => this.data.id

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

  // parentInstanceStart (in seconds) is the start of the group containing this content
  // 0 for root, groupInstance.start for others
  // viewStart (in seconds) is the start time of the viewport
  // viewEnd (in seconds) is the end time of the viewport
  isInView = (
    parentInstanceStart: number,
    viewStart: number,
    viewEnd: number
  ): boolean => {
    let start = null
    let length = null
    if (this.kind === GroupContentKindType.Clip) {
      const clipInstance = this.asClip()
      start = parentInstanceStart + clipInstance.start
      length = clipInstance.clip().length
    } else {
      const groupInstance = this.asGroup()
      start = parentInstanceStart + groupInstance.start
      length = groupInstance.group().length()
    }
    return isObjectInView(viewStart, viewEnd, start, length)
  }
}
