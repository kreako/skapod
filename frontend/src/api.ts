import axios from "axios"

type DataType = {}

export type SourceKindType = "record" | "sample"

type SourceType = {
  id: string
  kind: SourceKindType
  length: number
  data: DataType
}

export type ColorType = "blue" | "green" | "gray" | "yellow" | "orange"

export type ClipType = {
  id: string
  source: string
  start: number
  length: number
  color: ColorType
}

type TrackContentType = {
  clip: string
  start: number
}

export type TrackDisplayType = "full" | "mini"

export type TrackType = {
  id: string
  title: string
  volume: number
  panLR: number
  display: TrackDisplayType
  content: TrackContentType[]
}

export type ProjectType = {
  tracksNb: number
  clipsNb: number
  maxTime: number
  sources: SourceType[]
  clips: ClipType[]
  tracks: TrackType[]
}

export const fetchProject = async (): Promise<ProjectType> => {
  const res = await axios.get("/project")
  return res.data
}

export type MutDisplayType = {
  display: TrackDisplayType
  trackId: string
}

export const setTrackDiplay = async ({
  trackId,
  display,
}: MutDisplayType): Promise<void> => {
  await axios.patch(`/project/track/${trackId}/display`, { display })
}
