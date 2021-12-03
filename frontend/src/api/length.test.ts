import { contentLength } from "./length"
import { Project } from "./project"
import {
  ColorType,
  GroupContentKindType,
  GroupDisplayType,
  SourceKindType,
} from "./types"

test("group - length of an empty group is 0", () => {
  expect(contentLength([])).toBe(0)
})

test("group - length of a simple group", () => {
  const rgroup = {
    id: "0",
    name: "",
    start: 0,
    content: [],
    color: ColorType.Blue,
    display: GroupDisplayType.Expanded,
    muted: false,
  }
  const project = new Project({
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
      "0": { id: "0", name: "", source: "0", start: 11.7, length: 23.88 },
    },
    groups: {},
    content: [
      {
        kind: GroupContentKindType.Clip,
        data: {
          id: "0",
          clip: "0",
          start: 13.4,
          row: 0,
          muted: false,
          color: ColorType.Blue,
        },
      },
    ],
  })
  expect(project.length()).toBe(13.4 + 23.88)
})
