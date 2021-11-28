import { isClipInView, timeEndView } from "./view"

test("timeEndView - produce end seconds", () => {
  expect(timeEndView(20, 100, 800)).toBe(28)
})

test("isClipInView - fully in view", () => {
  expect(isClipInView(20, 100, 20, 80)).toBeTruthy()
})

test("isClipInView - align with start", () => {
  expect(isClipInView(20, 100, 20, 81)).toBeTruthy()
})

test("isClipInView - align with end", () => {
  expect(isClipInView(20, 100, 19, 81)).toBeTruthy()
})

test("isClipInView - not fully in view", () => {
  expect(isClipInView(20, 100, 25, 70)).toBeTruthy()
})

test("isClipInView - at the start of the view", () => {
  expect(isClipInView(20, 100, 15, 6)).toBeTruthy()
})

test("isClipInView - not at the start of the view", () => {
  expect(isClipInView(20, 100, 15, 5)).toBeFalsy()
})

test("isClipInView - at the end of the view", () => {
  expect(isClipInView(20, 100, 99, 6)).toBeTruthy()
})

test("isClipInView - not at the end of the view", () => {
  expect(isClipInView(20, 100, 100, 5)).toBeFalsy()
})

test("isClipInView - not at all in view", () => {
  expect(isClipInView(20, 100, 200, 5)).toBeFalsy()
})

test("isClipInView - larger than view", () => {
  expect(isClipInView(20, 100, 0, 200)).toBeTruthy()
})
