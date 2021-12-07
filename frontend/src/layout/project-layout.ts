import { ProjectType } from "../api/project"

export type LayoutContext = {
  viewStart: number
  viewEnd: number
  pxPerSeconds: number
  clipHeight: number
  clipMargin: number
}

export interface ProjectLayoutType {
  layoutInfo: (id: string, context: LayoutContext) => LayoutInfoType
}

export type LayoutInfoType = {
  top: number
  left: number
  width: number
  height: number
}

export class ProjectLayout implements ProjectLayoutType {
  project: ProjectType

  constructor(project: ProjectType) {
    this.project = project
  }

  layoutInfo = (id: string, context: LayoutContext): LayoutInfoType => {
    return { top: 0, left: 0, width: 100, height: 200 }
  }
}
