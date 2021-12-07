import { RowHeight } from "./height"
import { Project } from "./project"
import {
  ColorType,
  GroupContentKindType,
  GroupDisplayType,
  SourceKindType,
} from "./types"

test("height - max", () => {
  const h1 = new RowHeight(1, 0)
  const h2 = new RowHeight(1, 1)

  const r1 = h1.max(h2)
  expect(r1.clip).toBe(1)
  expect(r1.groupHeader).toBe(1)

  const r2 = h2.max(h1)
  expect(r2.clip).toBe(1)
  expect(r2.groupHeader).toBe(1)
})

test("height - max with null", () => {
  const h1 = new RowHeight(1, 0)
  const n = RowHeight.null()

  const r1 = h1.max(n)
  expect(r1.clip).toBe(1)
  expect(r1.groupHeader).toBe(0)

  const r2 = n.max(h1)
  expect(r2.clip).toBe(1)
  expect(r2.groupHeader).toBe(0)
})

test("height - add with null", () => {
  const h1 = new RowHeight(1, 0)
  const n = RowHeight.null()

  const r1 = h1.add(n)
  expect(r1.clip).toBe(1)
  expect(r1.groupHeader).toBe(0)

  const r2 = n.add(h1)
  expect(r2.clip).toBe(1)
  expect(r2.groupHeader).toBe(0)
})

test("height - add", () => {
  const h1 = new RowHeight(1, 0)
  const h2 = new RowHeight(3, 2)

  const r1 = h1.add(h2)
  expect(r1.clip).toBe(4)
  expect(r1.groupHeader).toBe(2)
  expect(h1.clip).toBe(4)
  expect(h1.groupHeader).toBe(2)
  expect(h2.clip).toBe(3)
  expect(h2.groupHeader).toBe(2)

  const r2 = h2.add(h1)
  expect(r2.clip).toBe(7)
  expect(r2.groupHeader).toBe(4)
  expect(h1.clip).toBe(4)
  expect(h1.groupHeader).toBe(2)
  expect(h2.clip).toBe(7)
  expect(h2.groupHeader).toBe(4)
})

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
  const h = project.groups["0"].expandedHeight()
  expect(h.clip).toBe(1)
  expect(h.groupHeader).toBe(1)
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
  const h2 = project.groups["2"].expandedHeight()
  expect(h2.clip).toBe(2)
  expect(h2.groupHeader).toBe(1)

  const h1 = project.groups["1"].expandedHeight()
  expect(h1.clip).toBe(2 + 1 + 2 + 1) // 2 groups and 2 clips : 6
  expect(h1.groupHeader).toBe(2 + 1) // 2 groups and the root one

  const h0 = project.groups["0"].expandedHeight()
  expect(h0.clip).toBe(1 + 6 + 6 + 1) // 2 groups and 2 clips
  expect(h0.groupHeader).toBe(2 * 3 + 1) // 2 groups with 3 headers and the root one

  const h = project.content.height()
  expect(h.clip).toBe(1 + 6 + 6 + 1) // 2 groups and 2 clips
  expect(h0.groupHeader).toBe(2 * 3 + 1) // 2 groups with 3 headers and the root one
})
