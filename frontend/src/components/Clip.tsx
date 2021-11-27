import { DotsVerticalIcon } from "@heroicons/react/solid"
import { useEffect, useRef } from "react"
import colors from "tailwindcss/colors"
import { ColorType, TrackDisplayType } from "../api"
import { resizeWithPixelRatio } from "../utils/canvas"
import { colorToBgClassName, colorToValue } from "../utils/colors"
import {
  TRACK_HEIGHT_FULL_CLASSNAME,
  TRACK_HEIGHT_MINI_CLASSNAME,
} from "../utils/ui"

export function ClipCanvas({ color }: ClipProps) {
  let canvasRef = useRef<HTMLCanvasElement>()
  const c = colorToValue(color)

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

    ctx.fillStyle = c
    ctx.fillRect(
      0,
      canvas.height / 2 - 0.1 * canvas.height,
      canvas.width,
      0.2 * canvas.height
    )

    console.log(canvas.width, canvas.height)
  }, [canvasRef])
  return <canvas ref={canvasRef} className="w-full h-full" />
}

export function ClipMini(props: ClipProps) {
  const bg = colorToBgClassName(props.color)
  return (
    <div
      className={`${bg} absolute top-0 left-0 ${TRACK_HEIGHT_MINI_CLASSNAME} border border-sky-800 rounded-md z-10`}
      style={{ width: `${props.length}px` }}
    >
      <ClipCanvas {...props} />
    </div>
  )
}

export function ClipFull(props: ClipProps) {
  const bg = colorToBgClassName(props.color)
  return (
    <div
      className={`${bg} absolute top-0 left-0 ${TRACK_HEIGHT_FULL_CLASSNAME} border border-sky-800 rounded-md z-10`}
      style={{ width: `${props.length}px` }}
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
      <div className="absolute inset-x-0 top-8 bottom-0 z-0">
        <ClipCanvas {...props} />
      </div>
    </div>
  )
}

type ClipProps = {
  display: TrackDisplayType
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
