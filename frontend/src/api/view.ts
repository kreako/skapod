export function timeEndView(
  startSec: number,
  pxPerSeconds: number,
  viewWidth: number
): number {
  return startSec + viewWidth / pxPerSeconds
}

export function isObjectInView(
  viewStart: number,
  viewEnd: number,
  objectStart: number,
  objectLength: number
): boolean {
  const objectEnd = objectStart + objectLength
  return (
    (viewStart < objectStart && objectStart < viewEnd) ||
    (viewStart < objectEnd && objectEnd < viewEnd) ||
    (objectStart < viewStart && viewEnd < objectEnd) ||
    viewStart === objectStart ||
    viewEnd === objectEnd
  )
}
