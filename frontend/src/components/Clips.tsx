import React from "react"
import { useElementSize } from "usehooks-ts"
import { ClipType, ProjectType, TrackType } from "../api"
import { useStore } from "../store"
import { fromArrayToIdObjects } from "../utils/objects"
import {
  remToPx,
  TIMESCALE_HEIGHT_REM,
  TRACK_HEIGHT_FULL_CLASSNAME,
  TRACK_HEIGHT_FULL_REM,
  TRACK_HEIGHT_MINI_CLASSNAME,
  TRACK_HEIGHT_MINI_REM,
  TRACK_SEPARATOR_HEIGHT_CLASSNAME,
  TRACK_SEPARATOR_HEIGHT_REM,
} from "../utils/ui"
import { isClipInView, timeEndView } from "../utils/view"
import Clip from "./Clip"

type ClipsIndexType = {
  [id: string]: ClipType
}

type TrackProps = {
  index: number
  track: TrackType
  clips: ClipsIndexType
  start: number
  end: number
  pxPerSeconds: number
}

export function Track({
  index,
  track,
  clips,
  start,
  end,
  pxPerSeconds,
}: TrackProps) {
  let heightTrack = TRACK_HEIGHT_FULL_CLASSNAME
  let heightTrackRem = TRACK_HEIGHT_FULL_REM
  if (track.display === "mini") {
    heightTrack = TRACK_HEIGHT_MINI_CLASSNAME
    heightTrackRem = TRACK_HEIGHT_MINI_REM
  }
  const clipsInView = track.content
    .filter((c) => {
      const clipId = c.clip
      const clip = clips[clipId]
      return isClipInView(start, end, c.start, clip.length)
    })
    .map((c) => {
      const clipId = c.clip
      const clipStartInTrack = c.start
      const clip = clips[clipId]
      return {
        id: c.id,
        clipStartInTrack: clipStartInTrack,
        topPx: remToPx(
          index * (heightTrackRem + TRACK_SEPARATOR_HEIGHT_REM) +
            TIMESCALE_HEIGHT_REM
        ),
        leftPx: (clipStartInTrack - start) * pxPerSeconds,
        length: clip.length,
        lengthPx: clip.length * pxPerSeconds,
        color: clip.color,
      }
    })
  return (
    <div className={`${heightTrack}`}>
      {clipsInView.map((clip) => (
        <Clip
          key={clip.id}
          id={clip.id}
          display={track.display}
          top={clip.topPx}
          left={clip.leftPx}
          length={clip.lengthPx}
          color={clip.color}
        />
      ))}
    </div>
  )
}

type ClipsProps = {
  project: ProjectType
}

export default function Clips({ project }: ClipsProps) {
  const [rootRef, { width, height }] = useElementSize()
  const { pxPerSeconds, start } = useStore((state) => ({
    pxPerSeconds: state.pxPerSeconds,
    start: state.start,
  }))
  const end = timeEndView(start, pxPerSeconds, width)
  const clipsIndex = fromArrayToIdObjects(project.clips)
  return (
    <div ref={rootRef} className="absolute inset-0">
      {/* in sync with pt-12 in Header component */}
      <div className="mt-12">
        {project.tracks.map((t, index) => (
          <React.Fragment key={t.id}>
            <Track
              index={index}
              track={t}
              clips={clipsIndex}
              start={start}
              end={end}
              pxPerSeconds={pxPerSeconds}
            />
            <div
              className={`${TRACK_SEPARATOR_HEIGHT_CLASSNAME} bg-sky-400`}
            ></div>
          </React.Fragment>
        ))}
        {width} * {height}
      </div>
    </div>
  )
}
