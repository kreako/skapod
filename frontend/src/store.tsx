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
    set((state) => ({ pxPerSeconds: state.pxPerSeconds * SCALE_IN })),
  horizontalZoomOut: () =>
    set((state) => ({ pxPerSeconds: state.pxPerSeconds * SCALE_OUT })),
}))
