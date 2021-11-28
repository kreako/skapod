import { DefaultRequestBody, rest } from "msw"
import {
  ColorType,
  ProjectType,
  SourceKindType,
  TrackDisplayType,
} from "../api"

const defaultProject = {
  tracksNb: 3,
  clipsNb: 5,
  maxTime: 32 * 60 + 27,
  sources: [
    {
      id: "0",
      kind: "record" as SourceKindType,
      length: 3 * 60 + 12,
      data: {},
    },
    {
      id: "1",
      kind: "sample" as SourceKindType,
      length: 7 * 60 + 23,
      data: {},
    },
    {
      id: "2",
      kind: "record" as SourceKindType,
      length: 23 * 60 + 13,
      data: {},
    },
  ],
  clips: [
    {
      id: "0",
      source: "0",
      start: 12,
      length: 29,
      color: "gray" as ColorType,
    },
    {
      id: "1",
      source: "0",
      start: 22,
      length: 2 * 60 + 3,
      color: "yellow" as ColorType,
    },
    {
      id: "2",
      source: "1",
      start: 2 * 60 + 23,
      length: 29,
      color: "orange" as ColorType,
    },
    {
      id: "3",
      source: "1",
      start: 12,
      length: 5,
      color: "green" as ColorType,
    },
    {
      id: "4",
      source: "2",
      start: 2,
      length: 23 * 60 + 11,
      color: "blue" as ColorType,
    },
  ],
  tracks: [
    {
      id: "0",
      title: "Voice 1",
      volume: 70,
      panLR: 0,
      display: "full" as TrackDisplayType,
      content: [
        { id: "0-0-0", clip: "0", start: 0 },
        { id: "0-0-19", clip: "0", start: 19 },
        { id: "0-1-42", clip: "1", start: 42 },
        { id: "0-0-188", clip: "0", start: 42 + 2 * 60 + 3 - 5 + 29 - 1 },
      ],
    },
    {
      id: "1",
      title: "Music",
      volume: 30,
      panLR: 0,
      display: "full" as TrackDisplayType,
      content: [
        { id: "1-2-160", clip: "2", start: 42 + (2 * 60 + 3) - 5 },
        {
          id: "1-3-216",
          clip: "3",
          start: 42 + 2 * 60 + 3 - 5 + 29 - 1 + 29 - 1,
        },
      ],
    },
    {
      id: "2",
      title: "Voice 2 with a very long title because I like to write a lot",
      volume: 55,
      panLR: 0,
      display: "full" as TrackDisplayType,
      content: [
        {
          id: "2-4-221",
          clip: "4",
          start: 42 + 2 * 60 + 3 - 5 + 29 - 1 + 29 - 1 + 5,
        },
      ],
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

type PatchDisplayType = {
  display: TrackDisplayType
}

export const handlers = [
  rest.get<DefaultRequestBody, ProjectType>("/project", (req, res, ctx) => {
    const project = getProject()
    return res(ctx.status(200), ctx.json(project))
  }),
  rest.patch<PatchDisplayType>(
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
  ),
]
