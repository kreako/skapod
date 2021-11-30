import create from "zustand"

type State = {
  pxPerSeconds: number
  horizontalZoomIn: () => void
  horizontalZoomOut: () => void
  start: number
  horizontalScrollRight: () => void
  horizontalScrollLeft: () => void
  cursor: number
  setCursor: (number) => void
}

export const ZOOM_SCALE_IN = Math.exp(0.2)
export const ZOOM_SCALE_OUT = Math.exp(-0.2)

export const MAX_ZOOM_IN = 2000
export const MIN_ZOOM_OUT = 0.01

export const useStore = create<State>((set) => ({
  pxPerSeconds: 5,
  horizontalZoomIn: () =>
    set((state) => {
      if (state.pxPerSeconds < MAX_ZOOM_IN) {
        // limit zoom in at 2000 px per seconds seems reasonable 1 full seconds on a large screen
        return { pxPerSeconds: state.pxPerSeconds * ZOOM_SCALE_IN }
      }
    }),
  horizontalZoomOut: () =>
    set((state) => {
      if (state.pxPerSeconds > MIN_ZOOM_OUT) {
        // limit zoom out at 0.01 px per seconds
        // a 2000px wide screen displays around 55 hours
        // seems scrolling is reasonable after 55 hours of content
        return { pxPerSeconds: state.pxPerSeconds * ZOOM_SCALE_OUT }
      }
    }),
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
  cursor: 0,
  setCursor: (c) =>
    set((state) => {
      return { cursor: c }
    }),
}))
