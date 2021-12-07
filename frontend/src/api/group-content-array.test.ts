import { Project } from "./project"
import {
  ColorType,
  GroupContentKindType,
  GroupDisplayType,
  SourceKindType,
} from "./types"

test("group-content-array - maxRow of a group", () => {
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
          groupInstance("1", 3, false),
          groupInstance("1", 4, false),
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
      "3": {
        id: "3",
        name: "",
        content: [],
      },
    },
    content: [groupInstance("0", 0, true)],
  })
  expect(project.groups["2"].content.maxRow()).toBe(1)
  expect(project.groups["1"].content.maxRow()).toBe(3)
  expect(project.groups["0"].content.maxRow()).toBe(4)
  expect(project.groups["3"].content.maxRow()).toBe(0)
})
