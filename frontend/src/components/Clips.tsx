import React from "react"
import { useElementSize } from "usehooks-ts"
import { ClipType, ProjectType, TrackType } from "../api"
import {
  TRACK_HEIGHT_FULL_CLASSNAME,
  TRACK_HEIGHT_MINI_CLASSNAME,
} from "../utils/ui"

type TrackProps = {
  track: TrackType
  clips: ClipType[]
}

export function Track({ track, clips }: TrackProps) {
  let heightTrack = TRACK_HEIGHT_FULL_CLASSNAME
  if (track.display === "mini") {
    heightTrack = TRACK_HEIGHT_MINI_CLASSNAME
  }
  return <div className={`${heightTrack}`}></div>
}

type ClipsProps = {
  project: ProjectType
}

export default function Clips({ project }: ClipsProps) {
  const [rootRef, { width, height }] = useElementSize()
  return (
    <div ref={rootRef} className="absolute inset-0">
      {/* in sync with pt-12 in Header component */}
      <div className="mt-12">
        {project.tracks.map((t) => (
          <React.Fragment key={t.id}>
            <Track track={t} clips={project.clips} />
            <div className="my-2 h-1 bg-sky-400"></div>
          </React.Fragment>
        ))}
        {width} * {height}
      </div>
    </div>
  )
}
