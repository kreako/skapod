import create from "zustand"

type BearState = {
  pxPerSeconds: number
  horizontalZoomIn: () => void
  horizontalZoomOut: () => void
}

const SCALE_IN = Math.exp(0.2)
const SCALE_OUT = Math.exp(-0.2)

export const useStore = create<BearState>((set) => ({
  pxPerSeconds: 5,
  horizontalZoomIn: () =>
    set((state) => {
      if (state.pxPerSeconds < 2000) {
        // limit zoom in at 2000 px per seconds seems reasonable 1 full seconds on a large screen
        return { pxPerSeconds: state.pxPerSeconds * SCALE_IN }
      }
    }),
  horizontalZoomOut: () =>
    set((state) => {
      if (state.pxPerSeconds > 0.01) {
        // limit zoom out at 0.01 px per seconds
        // a 2000px wide screen displays around 55 hours
        // seems scrolling is reasonable after 55 hours of content
        return { pxPerSeconds: state.pxPerSeconds * SCALE_OUT }
      }
    }),
}))