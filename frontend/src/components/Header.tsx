import { trackForMutations } from "@reduxjs/toolkit/dist/immutableStateInvariantMiddleware"
import { useQuery } from "react-query"
import { fetchProject, ProjectType } from "../api"
import { HEADER_WIDTH_CLASSNAME } from "../utils/ui"
import TrackHeader from "./TrackHeader"

export default function Header() {
  const project = useQuery("project", fetchProject, { staleTime: Infinity })
  return (
    <div className={`bg-sky-300 ${HEADER_WIDTH_CLASSNAME} pt-12`}>
      {project.isSuccess &&
        project.data.tracks.map((t) => <TrackHeader key={t.id} track={t} />)}
    </div>
  )
}
