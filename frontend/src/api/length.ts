import { GroupContentType } from "./group-content"
import { GroupContentKindType } from "./types"

export function contentLength(content: GroupContentType[]) {
  let l = 0
  for (const c of content) {
    if (c.kind === GroupContentKindType.Clip) {
      const clipInstance = c.asClipInstance()
      l = Math.max(l, clipInstance.start + clipInstance.clip().length)
    } else {
      const groupInstance = c.asGroupInstance()
      l = Math.max(l, groupInstance.start + groupInstance.group().length())
    }
  }
  return l
}
