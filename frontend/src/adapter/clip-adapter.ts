import { ClipInstanceType } from "../api/clip-instance"
import { ClipProps } from "../components/Clip"
import { CLIP_BOTTOM_MARGIN_PX } from "./ui"

export type clipAdapterParams = {
  clipInstance: ClipInstanceType
  parentTop: number
  parentInstanceStart: number
  viewStart: number
  pxPerSeconds: number
  clipHeight: number
}

export function clipAdapter({
  clipInstance,
  parentTop,
  parentInstanceStart,
  viewStart,
  pxPerSeconds,
  clipHeight,
}: clipAdapterParams): ClipProps {
  const onMutedClick = () => {
    console.log("onMutedClick")
  }

  const onMenuClick = () => {
    console.log("onMenuClick")
  }

  const clip = clipInstance.clip()

  const absoluteStart = parentInstanceStart + clipInstance.start
  const left = (absoluteStart - viewStart) * pxPerSeconds

  const width = clip.length * pxPerSeconds

  const top =
    parentTop + (clipHeight + CLIP_BOTTOM_MARGIN_PX) * clipInstance.row

  return {
    id: clipInstance.id,
    name: clip.name,
    top: top,
    left,
    width,
    height: clipHeight,
    color: clipInstance.color,
    muted: clipInstance.muted,
    onMutedClick,
    onMenuClick,
  }
}
