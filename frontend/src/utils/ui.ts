export const HEADER_WIDTH_CLASSNAME = "w-20"
export const HEADER_WIDTH_PX = remToPx(5)

export const TRACK_HEIGHT_FULL_CLASSNAME = "h-48"
export const TRACK_HEIGHT_FULL_REM = 12
export const TRACK_HEIGHT_MINI_CLASSNAME = "h-10"
export const TRACK_HEIGHT_MINI_REM = 2.5

export const TIMESCALE_HEIGHT_REM = 3 // mt-12 or pt-12

export const TRACK_SEPARATOR_HEIGHT_CLASSNAME = "my-2 h-1"
export const TRACK_SEPARATOR_HEIGHT_REM = 0.25 + 0.5 + 0.5

export const CLIP_HEADER_HEIGHT_REM = 2

export const TOOLBAR_HEIGHT_CLASSNAME = "h-16"

export function remToPx(rem: number): number {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}
