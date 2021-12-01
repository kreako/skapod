import { useEffect, useRef } from "react"
import { ColorType } from "../types"
import { resizeWithPixelRatio } from "../utils/canvas"
import { colorToValue } from "../utils/colors"

type WaveCanvasProps = {
  width: number
  height: number
  color: ColorType
}

export default function WaveCanvas({ width, height, color }: WaveCanvasProps) {
  let canvasRef = useRef<HTMLCanvasElement>()
  const c = colorToValue(color, 500)

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
  }, [canvasRef, color, width, height])
  return <canvas ref={canvasRef} className="w-full h-full" />
}
