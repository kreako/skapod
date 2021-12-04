import { renderHook, act } from "@testing-library/react-hooks"
import { useStore } from "./store"

test("clipHeight - zoom in/out", () => {
  const { result } = renderHook(() =>
    useStore((state) => ({
      clipHeight: state.clipHeight,
      verticalZoomIn: state.verticalZoomIn,
      verticalZoomOut: state.verticalZoomOut,
    }))
  )
  expect(result.current.clipHeight).toBe(100)
  act(() => {
    result.current.verticalZoomIn()
  })
  expect(result.current.clipHeight).toBe(125)
  act(() => {
    result.current.verticalZoomOut()
  })
  expect(result.current.clipHeight).toBe(100)
})

test("viewEnd - produce end seconds", () => {
  const { result } = renderHook(() =>
    useStore((state) => ({
      start: state.start,
      horizontalScrollRight: state.horizontalScrollRight,
      horizontalScrollLeft: state.horizontalScrollLeft,
      viewEnd: state.viewEnd,
      pxPerSeconds: state.pxPerSeconds,
      horizontalZoomIn: state.horizontalZoomIn,
      horizontalZoomOut: state.horizontalZoomOut,
    }))
  )
  expect(result.current.start).toBe(0)
  expect(result.current.pxPerSeconds).toBe(5)
  expect(result.current.viewEnd(800)).toBe(160)

  act(() => {
    result.current.horizontalScrollRight()
  })

  expect(result.current.start).toBe(20)
  expect(result.current.viewEnd(800)).toBe(180)
})
