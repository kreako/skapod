import { ProjectType } from "./project"
import { SourceKindType, RawSourceType } from "./types"

export interface SourceType {
  id: string
  name: string
  kind: SourceKindType
  length: number
  url: string
  // pre-computed peaks profile
  peaks: {}
}

export class Source implements SourceType {
  id: string
  name: string
  kind: SourceKindType
  length: number
  url: string
  peaks: {}

  project: ProjectType
  constructor(project: ProjectType, raw: RawSourceType) {
    this.project = project
    this.id = raw.id
    this.name = raw.name
    this.kind = raw.kind
    this.length = raw.length
    this.url = raw.url
    this.peaks = raw.peaks
  }
}
