import { GroupInstanceType } from "../api/group-instance"
import { ColorType, GroupContentKindType, GroupDisplayType } from "../api/types"
import { GroupChildProps, GroupProps } from "../components/Group"

export type GroupAdapterParams = {
  groupInstance: GroupInstanceType
  parentTop: number
  viewStart: number
  pxPerSeconds: number
  clipHeight: number
}

function produceChildrenProps(
  rootInstance: GroupInstanceType,
  display: GroupDisplayType,
  color: ColorType,
  pxPerSeconds: number,
  clipHeight: number
): GroupChildProps[] {
  const children = []
  const root = rootInstance.group()

  for (const content of root.content.content) {
    if (content.kind === GroupContentKindType.Clip) {
      const clipInstance = content.asClipInstance()
      const clip = clipInstance.clip()
      let top = null
      if (
        display === GroupDisplayType.Collapsed ||
        rootInstance.display === GroupDisplayType.Collapsed
      ) {
        top = 0
      } else {
        top = clipHeight * clipInstance.row
      }
      const width = Math.floor(clip.length * pxPerSeconds)
      const left = clipInstance.start * pxPerSeconds

      children.push({
        id: content.id(),
        kind: GroupContentKindType.Clip,
        props: {
          id: clipInstance.id,
          name: clip.name,
          top,
          left,
          width,
          height: clipHeight,
          color: color,
          muted: clipInstance.muted,
          displayHeader: false, // always off inside a group
        },
      })
    } else {
      const groupInstance = content.asGroupInstance()
      const group = groupInstance.group()
      let top = null
      let height = null
      if (
        display === GroupDisplayType.Collapsed ||
        rootInstance.display === GroupDisplayType.Collapsed
      ) {
        top = 0
        height = clipHeight
      } else {
        top = clipHeight * groupInstance.row
        height = group.expandedHeight() * clipHeight
      }
      const width = Math.floor(group.length() * pxPerSeconds)
      const left = groupInstance.start * pxPerSeconds
      children.push({
        id: content.id(),
        kind: GroupContentKindType.Group,
        props: {
          id: groupInstance.id,
          name: group.name,
          top,
          left,
          width,
          height,
          color: color,
          muted: groupInstance.muted,
          display: groupInstance.display, // always off inside a group
          displayHeader: false, // always off inside a group
          children: produceChildrenProps(
            groupInstance,
            display,
            color,
            pxPerSeconds,
            clipHeight
          ),
        },
      })
    }
  }

  return children
}

export function groupAdapter({
  groupInstance,
  parentTop,
  viewStart,
  pxPerSeconds,
  clipHeight,
}: GroupAdapterParams): GroupProps {
  const onMutedClick = () => {
    console.log("onMutedClick")
  }

  const onMenuClick = () => {
    console.log("onMenuClick")
  }

  const group = groupInstance.group()

  const left = (groupInstance.start - viewStart) * pxPerSeconds
  const width = group.length() * pxPerSeconds
  const top = parentTop + clipHeight * groupInstance.row
  const height = groupInstance.height() * clipHeight

  const children = produceChildrenProps(
    groupInstance,
    groupInstance.display,
    groupInstance.color,
    pxPerSeconds,
    clipHeight
  )

  return {
    id: groupInstance.id,
    name: group.name,
    top: top,
    left,
    width,
    height,
    color: groupInstance.color,
    muted: groupInstance.muted,
    display: groupInstance.display,
    displayHeader: true,
    children,
    onMutedClick,
    onMenuClick,
  }
}
