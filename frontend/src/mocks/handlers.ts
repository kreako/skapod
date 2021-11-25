import { DefaultRequestBody, rest } from "msw"
import { ProjectType } from "../api"

export const handlers = [
  rest.get<DefaultRequestBody, ProjectType>("/project", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        tracksNb: 3,
        clipsNb: 5,
        maxTime: 32 * 60 + 27,
        sources: [
          { id: "0", kind: "record", length: 3 * 60 + 12, data: {} },
          { id: "1", kind: "sample", length: 7 * 60 + 23, data: {} },
          { id: "2", kind: "record", length: 23 * 60 + 13, data: {} },
        ],
        clips: [
          { id: "0", source: "0", start: 12, length: 29 },
          { id: "1", source: "0", start: 22, length: 2 * 60 + 3 },
          { id: "2", source: "1", start: 2 * 60 + 23, length: 29 },
          { id: "3", source: "1", start: 12, length: 5 },
          { id: "4", source: "2", start: 2, length: 23 * 60 + 11 },
        ],
        tracks: [
          {
            id: "0",
            title: "Voice 1",
            content: [
              { clip: "0", start: 0 },
              { clip: "0", start: 19 },
              { clip: "1", start: 42 },
              { clip: "0", start: 42 + 2 * 60 + 3 - 5 + 29 - 1 },
            ],
          },
          {
            id: "1",
            title: "Music",
            content: [
              { clip: "2", start: 42 + (2 * 60 + 3) - 5 },
              { clip: "3", start: 42 + 2 * 60 + 3 - 5 + 29 - 1 + 29 - 1 },
            ],
          },
          {
            id: "0",
            title:
              "Voice 2 with a very long title because I like to write a lot",
            content: [
              { clip: "4", start: 42 + 2 * 60 + 3 - 5 + 29 - 1 + 29 - 1 + 5 },
            ],
          },
        ],
      })
    )
  }),
]
