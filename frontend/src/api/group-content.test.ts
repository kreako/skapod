import { Project } from "./project"
import { ColorType, GroupContentKindType, SourceKindType } from "./types"

const project = (start, length) =>
  new Project({
    id: "0",
    sources: {
      "0": {
        id: "0",
        name: "",
        kind: SourceKindType.Record,
        length: 139,
        url: "",
        peaks: {},
      },
    },
    clips: {
      "0": { id: "0", name: "", source: "0", start: 11.7, length: length },
    },
    groups: {},
    content: [
      {
        kind: GroupContentKindType.Clip,
        data: {
          id: "0",
          clip: "0",
          start: start,
          row: 0,
          muted: false,
          color: ColorType.Blue,
        },
      },
    ],
  })

test("group-content isInView - fully in view", () => {
  expect(project(20, 80).content[0].isInView(20, 100)).toBeTruthy()
})

test("group-content isInView - align with start", () => {
  expect(project(20, 81).content[0].isInView(20, 100)).toBeTruthy()
})

test("group-content isInView - align with end", () => {
  expect(project(19, 81).content[0].isInView(20, 100)).toBeTruthy()
})

test("group-content isInView - not fully in view", () => {
  expect(project(25, 70).content[0].isInView(20, 100)).toBeTruthy()
})

test("group-content isInView - at the start of the view", () => {
  expect(project(15, 6).content[0].isInView(20, 100)).toBeTruthy()
})

test("group-content isInView - not at the start of the view", () => {
  expect(project(15, 5).content[0].isInView(20, 100)).toBeFalsy()
})

test("group-content isInView - at the end of the view", () => {
  expect(project(99, 6).content[0].isInView(20, 100)).toBeTruthy()
})

test("group-content isInView - not at the end of the view", () => {
  expect(project(100, 5).content[0].isInView(20, 100)).toBeFalsy()
})

test("group-content isInView - not at all in view", () => {
  expect(project(200, 5).content[0].isInView(20, 100)).toBeFalsy()
})

test("group-content isInView - larger than view", () => {
  expect(project(0, 200).content[0].isInView(20, 100)).toBeTruthy()
})
