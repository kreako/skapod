import { DotsVerticalIcon } from "@heroicons/react/solid"
import { useEffect, useRef } from "react"
import colors from "tailwindcss/colors"
import { TrackDisplayType } from "../api"
import { resizeWithPixelRatio } from "../utils/canvas"
import {
  TRACK_HEIGHT_FULL_CLASSNAME,
  TRACK_HEIGHT_MINI_CLASSNAME,
} from "../utils/ui"

export function ClipCanvas() {
  let canvasRef = useRef<HTMLCanvasElement>()

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    // canvas/context accessors
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set width/height taking pixel ratio in account
    resizeWithPixelRatio(canvas, ctx)

    // Now for the drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = colors.sky[200]
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [canvasRef])
  return (
    <canvas ref={canvasRef} className="absolute top-8 bottom-0 inset-x-0 z-0" />
  )
}

export function ClipMini() {
  return (
    <div className={`absolute top-0 left-0 ${TRACK_HEIGHT_MINI_CLASSNAME}`} />
  )
}

export function ClipFull({ length }: ClipProps) {
  return (
    <div
      className={`absolute top-0 left-0 ${TRACK_HEIGHT_FULL_CLASSNAME} border border-sky-800 rounded-md z-10`}
      style={{ width: `${length}px` }}
    >
      <div className="absolute top-0 inset-x-0 flex flex-col">
        <div className="flex items-center px-1 mt-1 border-b border-sky-800">
          <div>Clip name</div>
          <div className="flex-grow"></div>
          <div className="flex-grow-0">
            <DotsVerticalIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
      <ClipCanvas />
    </div>
  )
}

type ClipProps = {
  display: TrackDisplayType
  length: number
}

export default function Clip(props: ClipProps) {
  if (props.display === "mini") {
    return <ClipMini />
  } else {
    return <ClipFull {...props} />
  }
}
