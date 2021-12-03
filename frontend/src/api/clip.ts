import { ProjectType } from "./project"
import { RawClipType } from "./types"

export interface ClipType {
  id: string
  name: string
  sourceId: string
  start: number
  length: number
}

export class Clip implements ClipType {
  id: string
  name: string
  sourceId: string
  start: number
  length: number

  project: ProjectType
  constructor(project: ProjectType, raw: RawClipType) {
    this.project = project
    this.id = raw.id
    this.name = raw.name
    this.sourceId = raw.source
    this.start = raw.start
    this.length = raw.length
  }
}
