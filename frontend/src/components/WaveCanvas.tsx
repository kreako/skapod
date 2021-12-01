import { useEffect, useRef } from "react"
import { ColorType } from "../types"
import { resizeWithPixelRatio } from "../utils/canvas"
import { colorToValue } from "../utils/colors"

type WaveCanvasProps = {
  top: number
  left: number
  width: number
  height: number
  color: ColorType
}

export default function WaveCanvas({
  top,
  left,
  width,
  height,
  color,
}: WaveCanvasProps) {
  let canvasRef = useRef<HTMLCanvasElement>()
  const c = colorToValue(color, 500)
  const style = {
    top: `${top}px`,
    left: `${left}px`,
    width: `${width}px`,
    height: `${height}px`,
  }

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
