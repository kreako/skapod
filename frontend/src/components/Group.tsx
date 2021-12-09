import Draggable from "react-draggable"
import { ColorType, GroupContentKindType, GroupDisplayType } from "../api/types"
import { colorToBgClassName } from "../utils/colors"
import Clip, { ClipProps } from "./Clip"
import { ClipGroupHeader } from "./ClipGroupHeader"
import WaveCanvas from "./WaveCanvas"

export type GroupChildProps = {
  id: string
  kind: GroupContentKindType
  props: GroupProps | ClipProps
}

function GroupChild({ kind, props }: GroupChildProps) {
  if (kind === GroupContentKindType.Group) {
    const p = props as GroupProps
    return <Group {...p} />
  } else {
    const p = props as ClipProps
    return <Clip {...p} />
  }
}

export type GroupProps = {
  id: string
  name: string
  top: number
  left: number
  width: number
  height: number
  color: ColorType
  muted: boolean
  display: GroupDisplayType
  children: GroupChildProps[]
  displayHeader: boolean
  onMutedClick: () => void
  onMenuClick: () => void
}

export default function Group(props: GroupProps) {
  // header is 24px - 1.5rem - h-6 so a 60px margin seems ok
  let displayHeader = props.height > 60
  if (!props.displayHeader) {
    displayHeader = false
  }
  const bg = colorToBgClassName(props.color)
  const mutedClassName = props.muted ? "opacity-25" : ""
  const style = {
    top: `${props.top}px`,
    left: `${props.left}px`,
    width: `${props.width}px`,
    height: `${props.height}px`,
  }
  // Unique header id for drag handle
  // necessary because .header is also a selector for all the .header in this dom hierarchy
  // including .header of children, so make it "unique" to each group/clip
  const dragHandleClassName = `header-group-${props.id}`
  const dragHandleSelector = `.${dragHandleClassName}`
  return (
    <Draggable handle={dragHandleSelector}>
      <div
        className={`${bg} ${mutedClassName} absolute border border-sky-800 rounded-md z-10 shadow-md overflow-hidden`}
        style={style}
      >
        {displayHeader && (
          <ClipGroupHeader
            handleClassName={dragHandleClassName}
            onMutedClick={props.onMutedClick}
            onMenuClick={props.onMenuClick}
            name={props.name}
            width={props.width}
            muted={props.muted}
          />
        )}
        <div className="absolute inset-0 z-0">
          {props.display === GroupDisplayType.Collapsed ? (
            <WaveCanvas
              width={props.width}
              height={props.height}
              color={props.color}
            />
          ) : (
            props.children.map((child) => (
              <GroupChild key={child.id} {...child} />
            ))
          )}
        </div>
      </div>
    </Draggable>
  )
}
