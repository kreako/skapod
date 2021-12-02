import React from "react"
import { useElementSize } from "usehooks-ts"
import { ClipType, GroupContentKindType, ProjectType } from "../types"
import { useStore } from "../store"
import { fromArrayToIdObjects } from "../utils/objects"
import { isObjectInView, timeEndView } from "../utils/view"
import Clip from "./Clip"
import Group from "./Group"

type ContentProps = {
  project: ProjectType
}

export default function Content({ project }: ContentProps) {
  const [rootRef, { width, height }] = useElementSize()
  const { pxPerSeconds, start, clipHeight } = useStore((state) => ({
    pxPerSeconds: state.pxPerSeconds,
    clipHeight: state.clipHeight,
    start: state.start,
  }))
  const end = timeEndView(start, pxPerSeconds, width)
  const objectsInView = project.content.filter((c) => {
    const objectLength =
      c.kind === GroupContentKindType.Clip
        ? project.clips[c.data.id].length
        : project.groups[c.data.id]
    const objectStart = c.data.start
    const objectLength = object.length
    return isObjectInView(start, end, c.data.start, c.data.id)
  })
  return (
    <div ref={rootRef} className="absolute inset-0">
      {/* in sync with pt-12 in Header component */}
      <div className="mt-12">
        {project.tracks.map((t) => (
          <React.Fragment key={t.id}>
            <Track
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
