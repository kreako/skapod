import { GroupInstanceType } from "../api/group-instance"
import { GroupProps } from "../components/Group"
import { CLIP_BOTTOM_MARGIN_PX } from "./ui"

export type GroupAdapterParams = {
  groupInstance: GroupInstanceType
  parentTop: number
  parentInstanceStart: number
  viewStart: number
  pxPerSeconds: number
  clipHeight: number
}

export function groupAdapter({
  groupInstance,
  parentTop,
  parentInstanceStart,
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

  const absoluteStart = parentInstanceStart + groupInstance.start
  const left = (absoluteStart - viewStart) * pxPerSeconds

  const width = group.length() * pxPerSeconds

  const top = parentTop + clipHeight * groupInstance.row

  const height = groupInstance.height() * clipHeight

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
    children: [],
    onMutedClick,
    onMenuClick,
  }
}
