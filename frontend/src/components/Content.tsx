import React from "react"
import { useElementSize } from "usehooks-ts"
import { clipAdapter } from "../adapter/clip-adapter"
import { TIMESCALE_HEIGHT_PX } from "../adapter/ui"
import { GroupContentType } from "../api/group-content"
import { ProjectType } from "../api/project"
import { GroupContentKindType } from "../api/types"
import { useStore } from "../store"
import Clip from "./Clip"
import Group from "./Group"

type GroupChildProps = {
  content: GroupContentType
  viewStart: number
  pxPerSeconds: number
  clipHeight: number
}

function ContentChild({
  content,
  viewStart,
  pxPerSeconds,
  clipHeight,
}: GroupChildProps) {
  if (content.kind === GroupContentKindType.Group) {
    const group = content.asGroupInstance()
    return <Group />
  } else {
    const clipInstance = content.asClipInstance()
    const props = clipAdapter({
      clipInstance,
      parentTop: TIMESCALE_HEIGHT_PX,
      parentInstanceStart: 0,
      viewStart,
      pxPerSeconds,
      clipHeight,
    })
    return <Clip {...props} />
  }
}

type ContentProps = {
  project: ProjectType
}

export default function Content({ project }: ContentProps) {
  const [rootRef, { width, height }] = useElementSize()
  const { pxPerSeconds, viewStart, viewEnd, clipHeight } = useStore(
    (state) => ({
      pxPerSeconds: state.pxPerSeconds,
      clipHeight: state.clipHeight,
      viewStart: state.viewStart,
      viewEnd: state.viewEnd(width),
    })
  )
  const objectsInView = project.content.filter((c) =>
    c.isInView(0, viewStart, viewEnd)
  )
  return (
    <div ref={rootRef} className="absolute inset-0">
      {/* in sync with timescale height : 1.5 rem + 0.5 rem = 2 rem = 32 px = mt-8 */}
      <div className="mt-8">
        {objectsInView.map((o) => (
          <ContentChild
            key={o.id()}
            content={o}
            viewStart={viewStart}
            pxPerSeconds={pxPerSeconds}
            clipHeight={clipHeight}
          />
        ))}
      </div>
    </div>
  )
}
