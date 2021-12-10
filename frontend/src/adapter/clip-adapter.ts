import { ClipInstanceType } from "../api/clip-instance"
import { ClipProps } from "../components/Clip"
import { LayoutContext, ProjectLayout } from "../layout/project-layout"

export type clipAdapterParams = {
  clipInstance: ClipInstanceType
  context: LayoutContext
  layout: ProjectLayout
  displayHeader: boolean
}

export function clipAdapter({
  clipInstance,
  context,
  layout,
  displayHeader,
}: clipAdapterParams): ClipProps {
  const onMutedClick = () => {
    console.log("onMutedClick")
  }

  const onMenuClick = () => {
    console.log("onMenuClick")
  }

  const layoutInfo = layout.localLayoutStyle(clipInstance.id, context)

  return {
    id: clipInstance.id,
    name: clipInstance.clip().name,
    top: layoutInfo.top,
    left: layoutInfo.left,
    width: layoutInfo.width,
    height: layoutInfo.height,
    color: clipInstance.color,
    muted: clipInstance.muted,
    displayHeader: displayHeader,
    onMutedClick,
    onMenuClick,
  }
}
