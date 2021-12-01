import { FaEllipsisV, FaVolumeMute } from "react-icons/fa"
import { ColorType } from "../types"
import { colorToBgClassName } from "../utils/colors"
import WaveCanvas from "./WaveCanvas"

type ClipHeaderProps = {
  name: string
  width: number
  muted: boolean
}

export function ClipHeader({ name, width, muted }: ClipHeaderProps) {
  const displayHeaderContent = width >= 25
  const displayMutedIcon = muted && width >= 50
  if (displayHeaderContent) {
    return (
      <div className="flex items-center px-1 h-6 border-b border-sky-800">
        {displayMutedIcon && (
          <div className="flex-grow-0 mr-2">
            <FaVolumeMute className="h-4 w-4" />
          </div>
        )}
        <div className="line-clamp-1">{name}</div>
        <div className="flex-grow"></div>
        <div className="flex-grow-0">
          <FaEllipsisV className="h-4 w-4" />
        </div>
      </div>
    )
  } else {
    return <div className="h-6 border-b border-sky-800" />
  }
}

type ClipProps = {
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
        <ClipHeader name={props.name} width={props.width} muted={props.muted} />
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
