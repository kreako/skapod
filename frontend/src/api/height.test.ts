import { Project } from "./project"
import {
  ColorType,
  GroupContentKindType,
  GroupDisplayType,
  SourceKindType,
} from "./types"

test("height - a single clip", () => {
  const clipInstance = (row) => ({
    kind: GroupContentKindType.Clip,
    data: {
      id: "0",
      clip: "0",
      start: 13.4,
      row: row,
      muted: false,
      color: ColorType.Blue,
    },
  })

  const groupInstance = (row, expanded) => ({
    kind: GroupContentKindType.Group,
    data: {
      id: "0",
      group: "0",
      start: 13.4,
      row: row,
      muted: false,
      color: ColorType.Blue,
      display: expanded
        ? GroupDisplayType.Expanded
        : GroupDisplayType.Collapsed,
    },
  })
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
    groups: {
      "0": { id: "0", name: "", content: [clipInstance(0)] },
    },
    content: [groupInstance(0, true)],
  })
  expect(project.groups["0"].expandedHeight()).toBe(1)
})

test("height - a complex group", () => {
  const clipInstance = (row) => ({
    kind: GroupContentKindType.Clip,
    data: {
      id: "0",
      clip: "0",
      start: 13.4,
      row: row,
      muted: false,
      color: ColorType.Blue,
    },
  })

  const groupInstance = (groupId, row, expanded) => ({
    kind: GroupContentKindType.Group,
    data: {
      id: "0",
      group: groupId,
      start: 13.4,
      row: row,
      muted: false,
      color: ColorType.Blue,
      display: expanded
        ? GroupDisplayType.Expanded
        : GroupDisplayType.Collapsed,
    },
  })
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
    groups: {
      "0": {
        id: "0",
        name: "",
        content: [
          clipInstance(0),
          groupInstance("1", 1, true),
          groupInstance("1", 2, true),
          groupInstance("1", 1, true),
          groupInstance("1", 1, false),
          groupInstance("1", 3, false),
        ],
      },
      "1": {
        id: "1",
        name: "",
        content: [
          clipInstance(0),
          clipInstance(1),
          clipInstance(0),
          groupInstance("2", 2, true),
          groupInstance("2", 0, true),
          groupInstance("2", 3, false),
        ],
      },
      "2": {
        id: "2",
        name: "",
        content: [clipInstance(0), clipInstance(1), clipInstance(0)],
      },
    },
    content: [groupInstance("0", 0, true)],
  })
  expect(project.groups["2"].expandedHeight()).toBe(2)

  expect(project.groups["1"].expandedHeight()).toBe(2 + 1 + 2 + 1) // 2 groups and 2 clips : 6

  expect(project.groups["0"].expandedHeight()).toBe(1 + 6 + 6 + 1) // 2 groups and 2 clips

  expect(project.content.height()).toBe(1 + 6 + 6 + 1) // 2 groups and 2 clips
})
