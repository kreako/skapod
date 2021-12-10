import { Project } from "../api/project"
import {
  ColorType,
  GroupContentKindType,
  GroupDisplayType,
  SourceKindType,
} from "../api/types"
import { ProjectLayout } from "./project-layout"

const defaultDataClipInstance = {
  id: "0",
  clip: "0",
  start: 0,
  row: 0,
  muted: false,
  color: ColorType.Blue,
}

const clipInstance = (id: string, clipId: string, row: number) => ({
  kind: GroupContentKindType.Clip,
  data: {
    id: id,
    clip: clipId,
    start: 13.4,
    row: row,
    muted: false,
    color: ColorType.Blue,
  },
})

const groupInstance = (
  id: string,
  groupId: string,
  row: number,
  expanded: boolean
) => ({
  kind: GroupContentKindType.Group,
  data: {
    id: id,
    group: groupId,
    start: 13.4,
    row: row,
    muted: false,
    color: ColorType.Blue,
    display: expanded ? GroupDisplayType.Expanded : GroupDisplayType.Collapsed,
  },
})

const project = () =>
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
      "0": { id: "0", name: "", source: "0", start: 11.7, length: 23.8 },
      "1": { id: "1", name: "", source: "0", start: 31.7, length: 13 },
      "2": { id: "2", name: "", source: "0", start: 41.8, length: 7 },
    },
    groups: {
      "0": {
        id: "0",
        name: "",
        content: [
          {
            kind: GroupContentKindType.Clip,
            data: {
              id: "g0-0",
              clip: "1",
              start: 0,
              row: 0,
              muted: false,
              color: ColorType.Blue,
            },
          },
          {
            kind: GroupContentKindType.Clip,
            data: {
              id: "g0-1",
              clip: "2",
              start: 12,
              row: 1,
              muted: false,
              color: ColorType.Blue,
            },
          },
        ],
      },
    },
    content: [
      {
        kind: GroupContentKindType.Clip,
        data: {
          id: "root-0",
          clip: "0",
          start: 3.4,
          row: 0,
          muted: false,
          color: ColorType.Blue,
        },
      },
      {
        kind: GroupContentKindType.Group,
        data: {
          id: "root-1",
          group: "0",
          start: 1.2,
          row: 1,
          muted: false,
          color: ColorType.Blue,
          display: GroupDisplayType.Expanded,
        },
      },
    ],
  })

test("Layout", () => {
  const p = project()
  const projectLayout = new ProjectLayout(p, 10)
  const context = {
    viewStart: 5,
    viewEnd: 25,
    pxPerSeconds: 10,
    clipHeight: 100,
    clipMargin: 2,
  }
  // clip instance "root-0" is on row 0 and from 3.4s to 27.2s
  let layout = projectLayout.localLayoutStyle("root-0", context)
  expect(layout.top).toBe(10)
  expect(layout.left).toBe((3.4 - 5) * 10)
  expect(layout.width).toBe(23.8 * 10)
  expect(layout.height).toBe(100)

  // group instance "root-1" is on row 1 and from 1.2s to 20.2s
  layout = projectLayout.localLayoutStyle("root-1", context)
  expect(layout.top).toBe(110)
  expect(layout.left).toBe((1.2 - 5) * 10)
  expect(layout.width).toBe(19 * 10)
  expect(layout.height).toBe(200)

  // clip instance "g0-0" is on row 0 and from 0s to 13s
  layout = projectLayout.localLayoutStyle("g0-0", context)
  expect(layout.top).toBe(0)
  expect(layout.left).toBe(0 * 10)
  expect(layout.width).toBe(13 * 10)
  expect(layout.height).toBe(100)

  // clip instance "g0-1" is on row 1 and from 12s to 19s
  layout = projectLayout.localLayoutStyle("g0-1", context)
  expect(layout.top).toBe(100)
  expect(layout.left).toBe(12 * 10)
  expect(layout.width).toBe(7 * 10)
  expect(layout.height).toBe(100)
})
