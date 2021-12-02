export type ProjectType = {
  id: string
  sources: SourceType[]
  clips: ClipType[]
  content: GroupContentType[]
}

// Source : a sound
export type SourceType = {
  id: string
  name: string
  kind: SourceKindType
  length: number
  url: string
  // pre-computed peaks profile
  peaks: {}
}

export enum SourceKindType {
  Record = "record",
  Sample = "sample",
}

// Clip : a piece of a sound
export enum ColorType {
  Blue = "blue",
  Green = "green",
  Gray = "gray",
  Yellow = "yellow",
  Orange = "orange",
}

export type ClipType = {
  id: string
  name: string
  source: string
  start: number
  length: number
  color: ColorType
  muted: boolean
}

// Group : group contains clips and (sub-)groups
export type GroupType = {
  id: string
  name: string
  start: number
  content: GroupContentType[]
  color: ColorType
  display: GroupDisplayType
  muted: boolean
}

export enum GroupDisplayType {
  Expanded = "expanded",
  Collapsed = "collapsed",
}

export enum GroupContentKindType {
  Group = "group",
  Clip = "clip",
}

// Instance of a clip in a group
export type ClipInGroupType = {
  id: string
  clip: string
  start: number
  // vertical position from 0 to ... : 0 is on top and n is lower
  row: number
}

// Instance of a group in a group
export type GroupInGroupType = {
  id: string
  group: string
  start: number
  // vertical position from 0 to ... : 0 is on top and n is lower
  row: number
}

export type GroupContentType = {
  kind: GroupContentKindType
  data: GroupInGroupType | ClipInGroupType
}
