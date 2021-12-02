import { DefaultRequestBody, rest } from "msw"
import {
  ColorType,
  GroupContentKindType,
  ProjectType,
  SourceKindType,
} from "../types"

const l = (minutes: number, seconds: number) => minutes * 60 + seconds

const sources = [
  {
    id: "0",
    name: "sample 0",
    kind: SourceKindType.Sample,
    length: l(3, 22),
    url: "",
    peaks: {},
  },
  {
    id: "1",
    name: "sample 1",
    kind: SourceKindType.Sample,
    length: l(1, 19),
    url: "",
    peaks: {},
  },
  {
    id: "2",
    name: "record 0",
    kind: SourceKindType.Record,
    length: l(2, 7),
    url: "",
    peaks: {},
  },
  {
    id: "3",
    name: "record 1",
    kind: SourceKindType.Record,
    length: l(1, 2),
    url: "",
    peaks: {},
  },
  {
    id: "4",
    name: "record 2",
    kind: SourceKindType.Record,
    length: l(0, 18),
    url: "",
    peaks: {},
  },
]

const clips = [
  {
    id: "0",
    name: "crash",
    source: "0",
    start: 11.2,
    length: 0.09,
  },
  {
    id: "1",
    name: "kick",
    source: "0",
    start: 7.1,
    length: 0.1,
  },
  {
    id: "2",
    name: "break 1",
    source: "0",
    start: 28.74,
    length: 6.13,
  },
  {
    id: "3",
    name: "break 2",
    source: "1",
    start: 38.03,
    length: 26.58,
  },
  {
    id: "4",
    name: "interview 1",
    source: "2",
    start: 0,
    length: l(2, 7),
  },
  {
    id: "5",
    name: "interview 2",
    source: "3",
    start: 3,
    length: 59,
  },
  {
    id: "6",
    name: "interview 3",
    source: "4",
    start: 1,
    length: 5,
  },
  {
    id: "7",
    name: "interview 4",
    source: "4",
    start: 8,
    length: 12,
  },
]

const defaultProject = {
  id: "0",
  sources,
  clips,
  content: [
    {
      kind: GroupContentKindType.Clip,
      data: {
        id: "0",
        clip: "6",
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
        clip: "5",
        start: 4,
        row: 1,
        muted: false,
        color: ColorType.Blue,
      },
    },
    {
      kind: GroupContentKindType.Clip,
      data: {
        id: "0",
        clip: "5",
        start: 59 + 4 - 2,
        row: 0,
        muted: false,
        color: ColorType.Blue,
      },
    },
  ],
}

const getProject = (): ProjectType => {
  if (!("project" in sessionStorage)) {
    setProject(defaultProject)
  }
  return JSON.parse(sessionStorage.getItem("project"))
}

const setProject = (project: ProjectType): void => {
  sessionStorage.setItem("project", JSON.stringify(project))
}

export const handlers = [
  rest.get<DefaultRequestBody, ProjectType>("/project/:id", (req, res, ctx) => {
    const project = getProject()
    return res(ctx.status(200), ctx.json(project))
  }),
  /*rest.patch<PatchDisplayType>(
    "/project/track/:trackId/display",
    (req, res, ctx) => {
      const project = getProject()
      const { trackId } = req.params
      const display = req.body.display
      for (const track of project.tracks) {
        if (track.id === trackId) {
          track.display = display
        }
      }
      setProject(project)
      return res(ctx.status(200), ctx.json({}))
    }
  ),*/
]
