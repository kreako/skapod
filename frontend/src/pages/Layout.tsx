import { useEffect, useRef } from "react"
import colors from "tailwindcss/colors"
import { useStore } from "../store"
import { resizeWithPixelRatio } from "../utils/canvas"
import { keyboard } from "../utils/keyboard"
import { useWheelEventListener } from "../utils/mouse"
import TimeScale from "../components/TimeScale"

function Waves() {
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

    ctx.fillStyle = colors.sky[50]
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [canvasRef])
  return (
    <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" />
  )
}

export default function Layout() {
  const { horizontalZoomIn, horizontalZoomOut, pxPerSeconds } = useStore(
    (state) => ({
      horizontalZoomIn: state.horizontalZoomIn,
      horizontalZoomOut: state.horizontalZoomOut,
      pxPerSeconds: state.pxPerSeconds,
    })
  )

  useWheelEventListener((event: WheelEvent) => {
    event.preventDefault() // works because event is registered as passive = false
    if (keyboard.ctrl) {
      if (event.deltaY > 0) {
        horizontalZoomOut()
      } else {
        horizontalZoomIn()
      }
    }
  })
  return (
    <div className="flex h-screen">
      <div className="flex-grow flex flex-col">
        <div className="bg-blue-200 h-16">
          Toolbar : {pxPerSeconds}
          <div>
            <span>09:59:59</span>
          </div>
        </div>
        <div className="flex w-screen flex-grow">
          <div className="bg-orange-200 w-16">Header</div>
          <div className="flex-grow relative">
            <Waves />
            <TimeScale />
          </div>
        </div>
      </div>
    </div>
  )
}
