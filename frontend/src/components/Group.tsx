import { classProperty } from "@babel/types"
import { ColorType, GroupContentKindType, GroupDisplayType } from "../types"
import { colorToBgClassName } from "../utils/colors"
import Clip, { ClipProps } from "./Clip"
import { ClipGroupHeader } from "./ClipGroupHeader"
import WaveCanvas from "./WaveCanvas"

type GroupChildProps = {
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

type GroupProps = {
  name: string
  top: number
  left: number
  width: number
  height: number
  color: ColorType
  muted: boolean
  display: GroupDisplayType
  children: GroupChildProps[]
}

export default function Group(props: GroupProps) {
  // header is 24px - 1.5rem - h-6 so a 60px margin seems ok
  const displayHeader = props.height > 60
  const bg = colorToBgClassName(props.color)
  const mutedClassName = props.muted ? "opacity-25" : ""
  const style = {
    top: `${props.top}px`,
    left: `${props.left}px`,
    width: `${props.width}px`,
    height: `${props.height}px`,
  }
  return (
    <div
      className={`${bg} ${mutedClassName} absolute border border-sky-800 rounded-md z-10`}
      style={style}
    >
      {displayHeader && (
        <ClipGroupHeader
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
          props.children.map((child) => <GroupChild {...child} />)
        )}
      </div>
    </div>
  )
}