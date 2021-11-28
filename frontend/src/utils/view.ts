import { ClipType } from "../api"

export function timeEndView(
  startSec: number,
  pxPerSeconds: number,
  viewWidth: number
): number {
  return startSec + viewWidth / pxPerSeconds
}

export function isClipInView(
  viewStart: number,
  viewEnd: number,
  clipStartInTrack: number,
  clipLength: number
): boolean {
  const clipEndInTrack = clipStartInTrack + clipLength
  return (
    (viewStart < clipStartInTrack && clipStartInTrack < viewEnd) ||
    (viewStart < clipEndInTrack && clipEndInTrack < viewEnd) ||
    (clipStartInTrack < viewStart && viewEnd < clipEndInTrack) ||
    viewStart === clipStartInTrack ||
    viewEnd === clipEndInTrack
  )
}
