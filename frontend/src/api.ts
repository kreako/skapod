import axios from "axios"
import { ProjectType } from "./types"

export const fetchProject = async (id: string): Promise<ProjectType> => {
  const res = await axios.get(`/project/${id}`)
  return res.data
}

/*export type MutDisplayType = {
  display: TrackDisplayType
  trackId: string
}

export const setTrackDiplay = async ({
  trackId,
  display,
}: MutDisplayType): Promise<void> => {
  await axios.patch(`/project/track/${trackId}/display`, { display })
}*/
