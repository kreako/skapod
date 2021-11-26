import { useMutation, useQuery, useQueryClient } from "react-query"
import {
  fetchProject,
  MutDisplayType,
  ProjectType,
  setTrackDiplay,
  TrackDisplayType,
} from "../api"
import { HEADER_WIDTH_CLASSNAME } from "../utils/ui"
import TrackHeader from "./TrackHeader"
import produce from "immer"

export default function Header() {
  const queryClient = useQueryClient()

  const project = useQuery("project", fetchProject, { staleTime: Infinity })

  const displayMutation = useMutation(setTrackDiplay, {
    onMutate: async ({ display, trackId }: MutDisplayType) => {
      await queryClient.cancelQueries("project")
      const previousProject = queryClient.getQueryData<ProjectType>("project")
      if (previousProject) {
        const idx = previousProject.tracks.findIndex((t) => t.id === trackId)
        if (idx !== -1) {
          queryClient.setQueryData<ProjectType>(
            "project",
            produce(previousProject, (draft) => {
              draft.tracks[idx].display = display
            })
          )
        }
      }
      return { previousProject }
    },
    onError: (err, variables, context) => {
      if (context?.previousProject) {
        queryClient.setQueryData<ProjectType>(
          "project",
          context.previousProject
        )
      }
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries("project")
    },
  })

  const getTrackHandlers = (trackId) => ({
    clickDisplay: (display: TrackDisplayType) => {
      displayMutation.mutate({ trackId, display })
    },
    clickMenu: () => {
      console.log("clickMenu")
    },
    clickMute: () => {
      console.log("clickMute")
    },
    clickSolo: () => {
      console.log("clickSolo")
    },
    clickVolume: () => {
      console.log("clickVolume")
    },
    clickPanLR: () => {
      console.log("clickPanLR")
    },
    clickTitle: () => {
      console.log("clickTitle")
    },
  })

  return (
    <div className={`bg-sky-300 ${HEADER_WIDTH_CLASSNAME} pt-12`}>
      {project.isSuccess &&
        project.data.tracks.map((t) => (
          <TrackHeader key={t.id} track={t} handlers={getTrackHandlers(t.id)} />
        ))}
    </div>
  )
}
