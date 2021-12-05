import { useStore } from "../store"

const CURSOR_WIDTH_PX = 13

export default function Cursor() {
  const { pxPerSeconds, viewStart, cursor } = useStore((state) => ({
    pxPerSeconds: state.pxPerSeconds,
    viewStart: state.viewStart,
    cursor: state.cursor,
  }))
  const position = (cursor - viewStart) * pxPerSeconds
  const topStyle = {
    left: `${position - CURSOR_WIDTH_PX / 2}px`,
    width: `${CURSOR_WIDTH_PX}px`,
  }
  const markerStyle = {
    left: `${position}px`,
  }
  return (
    <>
      <div
        className="w-px bg-sky-600 absolute inset-y-0 z-50"
        style={markerStyle}
      />
      <div
        className="bg-sky-200 absolute inset-y-0 opacity-50 z-50"
        style={topStyle}
      />
    </>
  )
}
