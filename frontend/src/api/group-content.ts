import { ClipInstance, ClipInstanceType } from "./clip-instance"
import { GroupInstance, GroupInstanceType } from "./group-instance"
import { ProjectType } from "./project"
import {
  GroupContentKindType,
  RawClipInstanceType,
  RawGroupContentType,
  RawGroupInstanceType,
} from "./types"

export interface GroupContentType {
  kind: GroupContentKindType
  data: GroupInstanceType | ClipInstanceType
  asClip: () => ClipInstanceType
  asGroup: () => GroupInstanceType
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
}