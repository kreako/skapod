import { isObjectInView } from "./view"

test("isObjectInView - fully in view", () => {
  expect(isObjectInView(20, 100, 20, 80)).toBeTruthy()
})

test("isObjectInView - align with start", () => {
  expect(isObjectInView(20, 100, 20, 81)).toBeTruthy()
})

test("isObjectInView - align with end", () => {
  expect(isObjectInView(20, 100, 19, 81)).toBeTruthy()
})

test("isObjectInView - not fully in view", () => {
  expect(isObjectInView(20, 100, 25, 70)).toBeTruthy()
})

test("isObjectInView - at the start of the view", () => {
  expect(isObjectInView(20, 100, 15, 6)).toBeTruthy()
})

test("isObjectInView - not at the start of the view", () => {
  expect(isObjectInView(20, 100, 15, 5)).toBeFalsy()
})

test("isObjectInView - at the end of the view", () => {
  expect(isObjectInView(20, 100, 99, 6)).toBeTruthy()
})

test("isObjectInView - not at the end of the view", () => {
  expect(isObjectInView(20, 100, 100, 5)).toBeFalsy()
})

test("isObjectInView - not at all in view", () => {
  expect(isObjectInView(20, 100, 200, 5)).toBeFalsy()
})

test("isObjectInView - larger than view", () => {
  expect(isObjectInView(20, 100, 0, 200)).toBeTruthy()
})
