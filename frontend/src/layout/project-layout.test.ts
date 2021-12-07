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
    },
    groups: {
      "0": {
        id: "0",
        name: "",
        content: [],
      },
      "1": {
        id: "1",
        name: "",
        content: [],
      },
      "2": {
        id: "2",
        name: "",
        content: [],
      },
    },
    content: [
      {
        kind: GroupContentKindType.Clip,
        data: {
          id: "0",
          clip: "0",
          start: 3.4,
          row: 0,
          muted: false,
          color: ColorType.Blue,
        },
      },
    ],
  })

test("Layout", () => {
  const p = project()
  const projectLayout = new ProjectLayout(p)
  const context = {
    viewStart: 5,
    viewEnd: 25,
    pxPerSeconds: 10,
    clipHeight: 100,
    clipMargin: 2,
  }
  // clip instance "0" is on row 0 and from 3.4s to 27.2s
  const layout = projectLayout.layoutInfo("0", context)
  expect(layout.top).toBe(0)
  expect(layout.left).toBe((3.4 - 5) * 10)
  expect(layout.width).toBe(23.8 * 10)
  expect(layout.height).toBe(100)
})
