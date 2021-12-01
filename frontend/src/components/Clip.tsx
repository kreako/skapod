import { ColorType } from "../types"
import { colorToBgClassName } from "../utils/colors"
import { ClipGroupHeader } from "./ClipGroupHeader"
import WaveCanvas from "./WaveCanvas"

export type ClipProps = {
  name: string
  top: number
  left: number
  width: number
  height: number
  color: ColorType
  muted: boolean
}

export default function Clip(props: ClipProps) {
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
        <WaveCanvas
          width={props.width}
          height={props.height}
          color={props.color}
        />
      </div>
    </div>
  )
}
