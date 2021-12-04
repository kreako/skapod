export type RawProjectType = {
  id: string
  sources: RawSourceIndexType
  clips: RawClipIndexType
  groups: RawGroupIndexType
  content: RawGroupContentType[]
}

export type RawSourceIndexType = {
  [id: string]: RawSourceType
}

export type RawClipIndexType = {
  [id: string]: RawClipType
}

export type RawGroupIndexType = {
  [id: string]: RawGroupType
}

// Source : a sound
export type RawSourceType = {
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
export type RawClipType = {
  id: string
  name: string
  source: string
  // start position in seconds relative to source
  start: number
  // length in seconds from start point
  length: number
}

// Group : group contains clips and (sub-)groups
export type RawGroupType = {
  id: string
  name: string
  content: RawGroupContentType[]
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
export type RawClipInstanceType = {
  id: string
  clip: string
  // start position in seconds relative to the parent group
  start: number
  // vertical position from 0 to ... : 0 is on top and n is lower
  row: number
  muted: boolean
  color: ColorType
}

// Instance of a group in a group
export type RawGroupInstanceType = {
  id: string
  group: string
  // start position in seconds relative to the parent group
  start: number
  // vertical position from 0 to ... : 0 is on top and n is lower
  row: number
  muted: boolean
  color: ColorType
}

export enum ColorType {
  Blue = "blue",
  Green = "green",
  Gray = "gray",
  Yellow = "yellow",
  Orange = "orange",
}

export type RawGroupContentType = {
  kind: GroupContentKindType
  data: RawGroupInstanceType | RawClipInstanceType
}
