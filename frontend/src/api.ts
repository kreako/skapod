import axios from "axios"
import { QueryFunctionContext } from "react-query"
import { ProjectType } from "./types"

export const projectKeys = {
  all: [{ scope: "projects" }] as const,
  single: (id: number) => [{ ...projectKeys.all[0], id }] as const,
}

export const fetchProject = async ({
  queryKey: [{ id }],
}: QueryFunctionContext<
  ReturnType<typeof projectKeys.single>
>): Promise<ProjectType> => {
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
