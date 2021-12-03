import { ClipType } from "./clip"
import { ProjectType } from "./project"
import { ColorType, RawClipInstanceType } from "./types"

export interface ClipInstanceType {
  id: string
  clipId: string
  // start position in seconds relative to the parent group
  start: number
  // vertical position from 0 to ... : 0 is on top and n is lower
  row: number
  muted: boolean
  color: ColorType
  clip: () => ClipType
}

export class ClipInstance implements ClipInstanceType {
  id: string
  clipId: string
  start: number
  row: number
  muted: boolean
  color: ColorType
  project: ProjectType

  constructor(project: ProjectType, raw: RawClipInstanceType) {
    this.project = project
    this.id = raw.id
    this.clipId = raw.clip
    this.start = raw.start
    this.row = raw.row
    this.muted = raw.muted
    this.color = raw.color
  }

  clip = (): ClipType => this.project.clips[this.clipId]
}
