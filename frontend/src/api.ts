import axios from "axios"

type DataType = {}

type SourceType = {
  id: string
  kind: "record" | "sample"
  length: number
  data: DataType
}

type ClipType = {
  id: string
  source: string
  start: number
  length: number
}

type TrackContentType = {
  clip: string
  start: number
}

type TrackType = {
  id: string
  title: string
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
