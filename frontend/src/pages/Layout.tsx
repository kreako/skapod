import { useEffect, useRef } from "react"
import colors from "tailwindcss/colors"
import { useStore } from "../store"
import { resizeWithPixelRatio } from "../utils/canvas"

export default function Layout() {
  let canvasRef = useRef<HTMLCanvasElement>()

  const pxPerSeconds = useStore((state) => state.pxPerSeconds)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    // canvas/context accessors
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set width/height taking pixel ratio in account
    resizeWithPixelRatio(canvas, ctx)

    console.log("size", canvas.width, canvas.height)

    // Now for the drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = colors.sky[700]
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [canvasRef])

  return (
    <div className="flex h-screen">
      <div className="flex-grow flex flex-col">
        <div className="bg-blue-200 h-16"> Toolbar </div>
        <div className="flex w-screen flex-grow">
          <div className="bg-orange-200 w-16">Header</div>
          <div className="bg-pink-200 flex-grow relative">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 z-0 h-full w-full"
            />
            <div className="bg-transparent absolute inset-0 z-10">
              Main canvas
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
