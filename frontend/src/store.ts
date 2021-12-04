import create from "zustand"

type State = {
  pxPerSeconds: number
  horizontalZoomIn: () => void
  horizontalZoomOut: () => void
  clipHeight: number
  verticalZoomIn: () => void
  verticalZoomOut: () => void
  start: number
  horizontalScrollRight: () => void
  horizontalScrollLeft: () => void
  viewEnd: (width: number) => number
  cursor: number
  setCursor: (number) => void
}

export const HORIZONTAL_ZOOM_SCALE_IN = Math.exp(0.2)
export const HORIZONTAL_ZOOM_SCALE_OUT = Math.exp(-0.2)
export const MAX_HORIZONTAL_ZOOM_IN = 2000
export const MIN_HORIZONTAL_ZOOM_OUT = 0.01

export const MAX_VERTICAL_ZOOM_IN = 500
export const MAX_VERTICAL_ZOOM_OUT = 25

export const useStore = create<State>((set, get) => ({
  // Horizontal scale
  pxPerSeconds: 5,
  horizontalZoomIn: () =>
    set((state) => {
      if (state.pxPerSeconds < MAX_HORIZONTAL_ZOOM_IN) {
        // limit zoom in at 2000 px per seconds seems reasonable 1 full seconds on a large screen
        return { pxPerSeconds: state.pxPerSeconds * HORIZONTAL_ZOOM_SCALE_IN }
      }
    }),
  horizontalZoomOut: () =>
    set((state) => {
      if (state.pxPerSeconds > MIN_HORIZONTAL_ZOOM_OUT) {
        // limit zoom out at 0.01 px per seconds
        // a 2000px wide screen displays around 55 hours
        // seems scrolling is reasonable after 55 hours of content
        return { pxPerSeconds: state.pxPerSeconds * HORIZONTAL_ZOOM_SCALE_OUT }
      }
    }),
  // Vertical scale
  clipHeight: 100,
  verticalZoomIn: () =>
    set((state) => {
      if (state.clipHeight < MAX_VERTICAL_ZOOM_IN) {
        return { clipHeight: state.clipHeight + 25 }
      }
    }),
  verticalZoomOut: () =>
    set((state) => {
      if (state.clipHeight > MAX_VERTICAL_ZOOM_OUT) {
        return { clipHeight: state.clipHeight - 25 }
      }
    }),
  // View start
  start: 0,
  horizontalScrollRight: () =>
    set((state) => {
      // scroll ~100px
      return { start: state.start + 100 / state.pxPerSeconds }
    }),
  horizontalScrollLeft: () =>
    set((state) => {
      // scroll ~100px
      let start = state.start - 100 / state.pxPerSeconds
      if (start < 0) {
        // Don't scroll before 0
        start = 0
      }
      return { start: start }
    }),
  viewEnd: (viewWidth: number): number =>
    get().start + viewWidth / get().pxPerSeconds,
  // Cursor position
  cursor: 0,
  setCursor: (c) =>
    set((state) => {
      return { cursor: c }
    }),
}))
