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
