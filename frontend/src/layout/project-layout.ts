import { ClipInstanceType } from "../api/clip-instance"
import { GroupType } from "../api/group"
import { GroupContent } from "../api/group-content"
import { GroupContentArrayType } from "../api/group-content-array"
import { GroupInstanceType } from "../api/group-instance"
import { ProjectType } from "../api/project"
import { GroupContentKindType, GroupDisplayType } from "../api/types"

export type LayoutContext = {
  // in seconds (unit)
  viewStart: number
  // in seconds (unit)
  viewEnd: number
  // in pixel/seconds (unit)
  pxPerSeconds: number
  // in pixel (unit)
  clipHeight: number
}

export interface ProjectLayoutType {
  localLayoutStyle: (id: string, context: LayoutContext) => LocalLayoutStyleType
}

export type LocalLayoutInfoType = {
  // id of the containing group or null for root
  parentId: string
  // in row (unit), relative to the group (or root) containing the instance
  top: number
  // in seconds (unit), relative to the group containing the instance
  left: number
  // in seconds (unit)
  width: number
  // in row (unit)
  height: number
}

export type LocalLayoutStyleType = {
  // in pixels (unit)
  top: number
  // in pixels (unit)
  left: number
  // in pixels (unit)
  width: number
  // in pixels (unit)
  height: number
}

export type LayoutInfoIndexType = {
  // clipInstance/groupInstance id -> LayoutInfoType
  [id: string]: LocalLayoutInfoType
}

function clipLayout(
  parentId: string,
  parentDisplay: GroupDisplayType,
  clipInstance: ClipInstanceType
): LocalLayoutInfoType {
  let top = clipInstance.row
  if (parentDisplay === GroupDisplayType.Collapsed) {
    top = 0
  }
  return {
    parentId,
    top,
    left: clipInstance.start,
    width: clipInstance.clip().length,
    height: 1,
  }
}

function groupLayout(
  parentId: string,
  parentDisplay: GroupDisplayType,
  groupInstance: GroupInstanceType
): LocalLayoutInfoType {
  let top = null
  let height = null
  if (
    parentDisplay === GroupDisplayType.Collapsed ||
    groupInstance.display === GroupDisplayType.Collapsed
  ) {
    top = 0
    height = 1
  } else {
    top = groupInstance.row
    height = groupInstance.group().expandedHeight()
  }
  return {
    parentId,
    top,
    left: groupInstance.start,
    width: groupInstance.group().length(),
    height,
  }
}

function buildLayoutInfoIndex(
  parentId: string,
  display: GroupDisplayType,
  content: GroupContentArrayType
): LayoutInfoIndexType {
  let index = {}

  for (const c of content.content) {
    if (c.kind === GroupContentKindType.Clip) {
      const clipInstance = c.asClipInstance()
      index[clipInstance.id] = clipLayout(parentId, display, clipInstance)
    } else {
      const groupInstance = c.asGroupInstance()
      index[groupInstance.id] = groupLayout(parentId, display, groupInstance)
      let localDisplay = display
      if (groupInstance.display === GroupDisplayType.Collapsed) {
        localDisplay = GroupDisplayType.Collapsed
      }
      const group = groupInstance.group()
      const groupIndex = buildLayoutInfoIndex(
        groupInstance.id,
        localDisplay,
        group.content
      )
      index = { ...index, ...groupIndex }
    }
  }
  return index
}

export class ProjectLayout implements ProjectLayoutType {
  project: ProjectType
  layout: LayoutInfoIndexType

  constructor(project: ProjectType) {
    this.project = project
    this.layout = buildLayoutInfoIndex(
      null,
      GroupDisplayType.Expanded,
      project.content
    )
  }

  localLayoutStyle = (
    id: string,
    context: LayoutContext
  ): LocalLayoutStyleType => {
    // cached info
    const info = this.layout[id]
    let left = 0
    if (info.parentId == null) {
      left = -context.viewStart * context.pxPerSeconds
    }
    return {
      top: info.top * context.clipHeight,
      left: left + info.left * context.pxPerSeconds,
      width: info.width * context.pxPerSeconds,
      height: info.height * context.clipHeight,
    }
  }
}
