import { Project } from "./project"
import {
  ColorType,
  GroupContentKindType,
  GroupDisplayType,
  SourceKindType,
} from "./types"

const projectWith1Clip = (start, length) =>
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

// With a rootStart = 0
test("group-content isInView clip - fully in view", () => {
  expect(projectWith1Clip(20, 80).content[0].isInView(0, 20, 100)).toBeTruthy()
})

test("group-content isInView clip - align with start", () => {
  expect(projectWith1Clip(20, 81).content[0].isInView(0, 20, 100)).toBeTruthy()
})

test("group-content isInView clip - align with end", () => {
  expect(projectWith1Clip(19, 81).content[0].isInView(0, 20, 100)).toBeTruthy()
})

test("group-content isInView clip - not fully in view", () => {
  expect(projectWith1Clip(25, 70).content[0].isInView(0, 20, 100)).toBeTruthy()
})

test("group-content isInView clip - at the start of the view", () => {
  expect(projectWith1Clip(15, 6).content[0].isInView(0, 20, 100)).toBeTruthy()
})

test("group-content isInView clip - not at the start of the view", () => {
  expect(projectWith1Clip(15, 5).content[0].isInView(0, 20, 100)).toBeFalsy()
})

test("group-content isInView clip - at the end of the view", () => {
  expect(projectWith1Clip(99, 6).content[0].isInView(0, 20, 100)).toBeTruthy()
})

test("group-content isInView clip - not at the end of the view", () => {
  expect(projectWith1Clip(100, 5).content[0].isInView(0, 20, 100)).toBeFalsy()
})

test("group-content isInView clip - not at all in view", () => {
  expect(projectWith1Clip(200, 5).content[0].isInView(0, 20, 100)).toBeFalsy()
})

test("group-content isInView clip - larger than view", () => {
  expect(projectWith1Clip(0, 200).content[0].isInView(0, 20, 100)).toBeTruthy()
})

// With a parentInstanceStart = 5 - not really representative because I'm at the root of the project here
// But this seems ok because the GroupContent do not know its parent (root or GroupInstance)
test("group-content isInView clip - parentInstanceStart=5 - fully in view", () => {
  expect(
    projectWith1Clip(20 - 5, 80).content[0].isInView(5, 20, 100)
  ).toBeTruthy()
})

test("group-content isInView clip - parentInstanceStart=5 - align with start", () => {
  expect(
    projectWith1Clip(20 - 5, 81).content[0].isInView(5, 20, 100)
  ).toBeTruthy()
})

test("group-content isInView clip - parentInstanceStart=5 - align with end", () => {
  expect(
    projectWith1Clip(19 - 5, 81).content[0].isInView(5, 20, 100)
  ).toBeTruthy()
})

test("group-content isInView clip - parentInstanceStart=5 - not fully in view", () => {
  expect(
    projectWith1Clip(25 - 5, 70).content[0].isInView(5, 20, 100)
  ).toBeTruthy()
})

test("group-content isInView clip - parentInstanceStart=5 - at the start of the view", () => {
  expect(
    projectWith1Clip(15 - 5, 6).content[0].isInView(5, 20, 100)
  ).toBeTruthy()
})

test("group-content isInView clip - parentInstanceStart=5 - not at the start of the view", () => {
  expect(
    projectWith1Clip(15 - 5, 5).content[0].isInView(5, 20, 100)
  ).toBeFalsy()
})

test("group-content isInView clip - parentInstanceStart=5 - at the end of the view", () => {
  expect(
    projectWith1Clip(99 - 5, 6).content[0].isInView(5, 20, 100)
  ).toBeTruthy()
})

test("group-content isInView clip - parentInstanceStart=5 - not at the end of the view", () => {
  expect(
    projectWith1Clip(100 - 5, 5).content[0].isInView(5, 20, 100)
  ).toBeFalsy()
})

test("group-content isInView clip - parentInstanceStart=5 - not at all in view", () => {
  expect(
    projectWith1Clip(200 - 5, 5).content[0].isInView(5, 20, 100)
  ).toBeFalsy()
})

test("group-content isInView clip - parentInstanceStart=5 - larger than view", () => {
  expect(projectWith1Clip(0, 200).content[0].isInView(5, 20, 100)).toBeTruthy()
})

const complexProject = () =>
  new Project({
    id: "0",
    sources: {
      "0": {
        id: "0",
        name: "",
        kind: SourceKindType.Record,
        length: 1000,
        url: "",
        peaks: {},
      },
    },
    clips: {
      "0": { id: "0", name: "", source: "0", start: 10, length: 20 },
      "1": { id: "1", name: "", source: "0", start: 0, length: 30 },
    },
    groups: {
      "0": {
        id: "0",
        name: "",
        content: [
          {
            kind: GroupContentKindType.Clip,
            data: {
              id: "0",
              clip: "0",
              start: 0,
              row: 0,
              muted: false,
              color: ColorType.Blue,
            },
          },
          {
            kind: GroupContentKindType.Clip,
            data: {
              id: "0",
              clip: "1",
              start: 10,
              row: 0,
              muted: false,
              color: ColorType.Blue,
            },
          },
          {
            kind: GroupContentKindType.Clip,
            data: {
              id: "0",
              clip: "0",
              start: 20,
              row: 0,
              muted: false,
              color: ColorType.Blue,
            },
          },
        ],
      },
    },
    content: [
      {
        kind: GroupContentKindType.Group,
        data: {
          id: "0",
          group: "0",
          start: 10,
          row: 0,
          muted: false,
          color: ColorType.Blue,
          display: GroupDisplayType.Collapsed,
        },
      },
    ],
  })

test("group-content length - make sure group 0 metrics are as expected ", () => {
  expect(complexProject().groups["0"].length()).toBe(40)
})

// With a parentInstanceStart = 0
// group content[0] is from 10s to 50s
test("group-content isInView group - fully in view", () => {
  expect(complexProject().content[0].isInView(0, 10, 50)).toBeTruthy()
})

test("group-content isInView group - align with start", () => {
  expect(complexProject().content[0].isInView(0, 10, 49)).toBeTruthy()
})

test("group-content isInView group - align with end", () => {
  expect(complexProject().content[0].isInView(0, 20, 50)).toBeTruthy()
})

test("group-content isInView group - not fully in view", () => {
  expect(complexProject().content[0].isInView(0, 5, 55)).toBeTruthy()
})

test("group-content isInView group - at the start of the view", () => {
  expect(complexProject().content[0].isInView(0, 5, 15)).toBeTruthy()
})

test("group-content isInView group - not at the start of the view", () => {
  expect(complexProject().content[0].isInView(0, 50, 100)).toBeFalsy()
})

test("group-content isInView group - at the end of the view", () => {
  expect(complexProject().content[0].isInView(0, 49, 100)).toBeTruthy()
})

test("group-content isInView group - not at the end of the view", () => {
  expect(complexProject().content[0].isInView(0, 2, 10)).toBeFalsy()
})

test("group-content isInView group - not at all in view", () => {
  expect(complexProject().content[0].isInView(0, 60, 100)).toBeFalsy()
})

test("group-content isInView group - larger than view", () => {
  expect(complexProject().content[0].isInView(0, 20, 30)).toBeTruthy()
})

// With a parentInstanceStart = 5 - not really representative because I'm at the root of the project here
// But this seems ok because the GroupContent do not know its parent (root or GroupInstance)
// Everything looks like group content[0] is now from 15s to 55s
test("group-content isInView group - parentInstanceStart=5 - fully in view", () => {
  expect(complexProject().content[0].isInView(5, 15, 55)).toBeTruthy()
})

test("group-content isInView group - parentInstanceStart=5 - align with start", () => {
  expect(complexProject().content[0].isInView(5, 15, 54)).toBeTruthy()
})

test("group-content isInView group - parentInstanceStart=5 - align with end", () => {
  expect(complexProject().content[0].isInView(5, 25, 55)).toBeTruthy()
})

test("group-content isInView group - parentInstanceStart=5 - not fully in view", () => {
  expect(complexProject().content[0].isInView(5, 10, 60)).toBeTruthy()
})

test("group-content isInView group - parentInstanceStart=5 - at the start of the view", () => {
  expect(complexProject().content[0].isInView(5, 10, 20)).toBeTruthy()
})

test("group-content isInView group - parentInstanceStart=5 - not at the start of the view", () => {
  expect(complexProject().content[0].isInView(5, 55, 105)).toBeFalsy()
})

test("group-content isInView group - parentInstanceStart=5 - at the end of the view", () => {
  expect(complexProject().content[0].isInView(5, 54, 105)).toBeTruthy()
})

test("group-content isInView group - parentInstanceStart=5 - not at the end of the view", () => {
  expect(complexProject().content[0].isInView(5, 7, 15)).toBeFalsy()
})

test("group-content isInView group - parentInstanceStart=5 - not at all in view", () => {
  expect(complexProject().content[0].isInView(5, 65, 105)).toBeFalsy()
})

test("group-content isInView group - parentInstanceStart=5 - larger than view", () => {
  expect(complexProject().content[0].isInView(5, 25, 35)).toBeTruthy()
})
