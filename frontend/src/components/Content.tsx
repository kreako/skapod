import { useElementSize } from "usehooks-ts"
import { clipAdapter } from "../adapter/clip-adapter"
import { groupAdapter } from "../adapter/group-adapter"
import { TIMESCALE_HEIGHT_PX } from "../adapter/ui"
import { GroupContentType } from "../api/group-content"
import { ProjectType } from "../api/project"
import { GroupContentKindType } from "../api/types"
import { LayoutContext, ProjectLayout } from "../layout/project-layout"
import { useStore } from "../store"
import Clip from "./Clip"
import Group from "./Group"

type GroupChildProps = {
  content: GroupContentType
  context: LayoutContext
  layout: ProjectLayout
}

function ContentChild({ content, context, layout }: GroupChildProps) {
  if (content.kind === GroupContentKindType.Group) {
    const groupInstance = content.asGroupInstance()
    const props = groupAdapter({
      groupInstance,
      context,
      layout,
    })
    return <Group {...props} />
  } else {
    const clipInstance = content.asClipInstance()
    const props = clipAdapter({
      clipInstance,
      context,
      layout,
      displayHeader: true,
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
  const context = {
    viewStart,
    pxPerSeconds,
    clipHeight,
  }
  const objectsInView = project.content.inView(0, viewStart, viewEnd)
  const projectLayout = new ProjectLayout(project, TIMESCALE_HEIGHT_PX)
  return (
    <div ref={rootRef} className="absolute inset-0">
      {/* in sync with timescale height : 1.5 rem + 0.5 rem = 2 rem = 32 px = mt-8 */}
      <div className="mt-8">
        {objectsInView.map((o) => (
          <ContentChild
            key={o.id()}
            content={o}
            context={context}
            layout={projectLayout}
          />
        ))}
      </div>
    </div>
  )
}
