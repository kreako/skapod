import { GroupInstanceType } from "../api/group-instance"
import { ColorType, GroupContentKindType, GroupDisplayType } from "../api/types"
import { GroupChildProps, GroupProps } from "../components/Group"
import { LayoutContext, ProjectLayout } from "../layout/project-layout"

export type GroupAdapterParams = {
  groupInstance: GroupInstanceType
  context: LayoutContext
  layout: ProjectLayout
}

function produceChildrenProps(
  rootInstance: GroupInstanceType,
  display: GroupDisplayType,
  color: ColorType,
  context: LayoutContext,
  layout: ProjectLayout
): GroupChildProps[] {
  const children = []
  const root = rootInstance.group()

  for (const content of root.content.content) {
    if (content.kind === GroupContentKindType.Clip) {
      const clipInstance = content.asClipInstance()
      const layoutInfo = layout.localLayoutStyle(clipInstance.id, context)
      children.push({
        id: content.id(),
        kind: GroupContentKindType.Clip,
        props: {
          id: clipInstance.id,
          name: clipInstance.clip().name,
          top: layoutInfo.top,
          left: layoutInfo.left,
          width: layoutInfo.width,
          height: layoutInfo.height,
          color: color,
          muted: clipInstance.muted,
          displayHeader: false, // always off inside a group
        },
      })
    } else {
      const groupInstance = content.asGroupInstance()
      const layoutInfo = layout.localLayoutStyle(groupInstance.id, context)
      children.push({
        id: content.id(),
        kind: GroupContentKindType.Group,
        props: {
          id: groupInstance.id,
          name: groupInstance.group().name,
          top: layoutInfo.top,
          left: layoutInfo.left,
          width: layoutInfo.width,
          height: layoutInfo.height,
          color: color,
          muted: groupInstance.muted,
          display: groupInstance.display, // always off inside a group
          displayHeader: false, // always off inside a group
          children: produceChildrenProps(
            groupInstance,
            display,
            color,
            context,
            layout
          ),
        },
      })
    }
  }

  return children
}

export function groupAdapter({
  groupInstance,
  context,
  layout,
}: GroupAdapterParams): GroupProps {
  const onMutedClick = () => {
    console.log("onMutedClick")
  }

  const onMenuClick = () => {
    console.log("onMenuClick")
  }

  const group = groupInstance.group()

  const layoutInfo = layout.localLayoutStyle(groupInstance.id, context)

  const children = produceChildrenProps(
    groupInstance,
    groupInstance.display,
    groupInstance.color,
    context,
    layout
  )

  return {
    id: groupInstance.id,
    name: group.name,
    top: layoutInfo.top,
    left: layoutInfo.left,
    width: layoutInfo.width,
    height: layoutInfo.height,
    color: groupInstance.color,
    muted: groupInstance.muted,
    display: groupInstance.display,
    displayHeader: true,
    children,
    onMutedClick,
    onMenuClick,
  }
}
