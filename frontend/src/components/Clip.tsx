import { useEffect, useRef } from "react"
import { FaEllipsisV } from "react-icons/fa"
import { ColorType, TrackDisplayType } from "../api"
import { resizeWithPixelRatio } from "../utils/canvas"
import { colorToBgClassName, colorToValue } from "../utils/colors"
import {
  CLIP_HEADER_HEIGHT_REM,
  remToPx,
  TRACK_HEIGHT_FULL_CLASSNAME,
  TRACK_HEIGHT_FULL_REM,
  TRACK_HEIGHT_MINI_CLASSNAME,
  TRACK_HEIGHT_MINI_REM,
} from "../utils/ui"

export function ClipCanvas({ display, color, left, length }: ClipProps) {
  let canvasRef = useRef<HTMLCanvasElement>()
  const c = colorToValue(color)
  const height =
    display === "full"
      ? remToPx(TRACK_HEIGHT_FULL_REM - CLIP_HEADER_HEIGHT_REM)
      : remToPx(TRACK_HEIGHT_MINI_REM)
  const width = length - 2 // do not overlap the right border

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    // canvas/context accessors
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set width/height taking pixel ratio in account
    resizeWithPixelRatio(canvas, ctx, width, height)

    // Now for the drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = c
    ctx.fillRect(
      0,
      canvas.height / 2 - 0.1 * canvas.height,
      canvas.width,
      0.2 * canvas.height
    )
  }, [canvasRef, color, left, length])
  return <canvas ref={canvasRef} className="w-full h-full" />
}

export function ClipMini(props: ClipProps) {
  const bg = colorToBgClassName(props.color)
  const style = {
    width: `${props.length}px`,
    left: `${props.left}px`,
  }
  return (
    <div
      className={`${bg} absolute top-0 ${TRACK_HEIGHT_MINI_CLASSNAME} border border-sky-800 rounded-md z-10`}
      style={style}
    >
      <ClipCanvas {...props} />
    </div>
  )
}

export function ClipFull(props: ClipProps) {
  const bg = colorToBgClassName(props.color)
  const style = {
    width: `${props.length}px`,
    left: `${props.left}px`,
  }
  const displayHeaderContent = props.length >= 25 ? true : false
  return (
    <div
      className={`${bg} absolute top-0 ${TRACK_HEIGHT_FULL_CLASSNAME} border border-sky-800 rounded-md z-10`}
      style={style}
    >
      <div className="absolute top-0 inset-x-0 flex flex-col">
        {displayHeaderContent ? (
          <div className="flex items-center px-1 h-6 border-b border-sky-800">
            <div className="line-clamp-1">{props.id}</div>
            <div className="flex-grow"></div>
            <div className="flex-grow-0">
              <FaEllipsisV className="h-4 w-4" />
            </div>
          </div>
        ) : (
          <div className="h-6 border-b border-sky-800" />
        )}
      </div>
      <div className="absolute inset-x-0 top-8 bottom-0 z-0">
        <ClipCanvas {...props} />
      </div>
    </div>
  )
}

type ClipProps = {
  id: string
  display: TrackDisplayType
  left: number
  length: number
  color: ColorType
}

export default function Clip(props: ClipProps) {
  if (props.display === "mini") {
    return <ClipMini {...props} />
  } else {
    return <ClipFull {...props} />
  }
}
