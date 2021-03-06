import { ColorType } from "../api/types"
import { colorToBgClassName } from "../utils/colors"
import { ClipGroupHeader } from "./ClipGroupHeader"
import WaveCanvas from "./WaveCanvas"

export type ClipProps = {
  id: string
  name: string
  top: number
  left: number
  width: number
  height: number
  color: ColorType
  muted: boolean
  displayHeader: boolean
  onMutedClick: () => void
  onMenuClick: () => void
}

export default function Clip(props: ClipProps) {
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

  const borderClassName = props.width < 3 ? "border-l" : "border "
  return (
    <div
      className={`${bg} ${mutedClassName} ${borderClassName} border-sky-800 absolute rounded-md z-10 shadow-md overflow-hidden`}
      style={style}
    >
      {displayHeader && (
        <ClipGroupHeader
          onMutedClick={props.onMutedClick}
          onMenuClick={props.onMenuClick}
          name={props.name}
          width={props.width}
          muted={props.muted}
        />
      )}
      <div className="absolute inset-0 z-0">
        <WaveCanvas
          width={props.width - 2}
          height={props.height}
          color={props.color}
        />
      </div>
    </div>
  )
}
