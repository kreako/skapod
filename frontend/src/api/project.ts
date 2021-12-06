import { Clip, ClipType } from "./clip"
import { Group, GroupType } from "./group"
import { GroupContentType } from "./group-content"
import { GroupContentArray, GroupContentArrayType } from "./group-content-array"
import { Source, SourceType } from "./source"
import { RawProjectType } from "./types"

export interface ProjectType {
  id: string
  sources: SourceIndexType
  clips: ClipIndexType
  groups: GroupIndexType
  content: GroupContentArrayType
  length: () => number
}

export type SourceIndexType = {
  [id: string]: SourceType
}

export type ClipIndexType = {
  [id: string]: ClipType
}

export type GroupIndexType = {
  [id: string]: GroupType
}

export class Project implements ProjectType {
  id: string
  sources: SourceIndexType
  clips: ClipIndexType
  groups: GroupIndexType
  content: GroupContentArrayType
  constructor(raw: RawProjectType) {
    this.id = raw.id

    this.sources = {}
    for (const id in raw.sources) {
      this.sources[id] = new Source(this, raw.sources[id])
    }

    this.clips = {}
    for (const id in raw.clips) {
      this.clips[id] = new Clip(this, raw.clips[id])
    }

    this.groups = {}
    for (const id in raw.groups) {
      this.groups[id] = new Group(this, raw.groups[id])
    }

    this.content = new GroupContentArray(this, raw.content)
  }

  length = (): number => this.content.length()
}
