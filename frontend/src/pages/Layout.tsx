import { useEffect, useRef } from "react"
import colors from "tailwindcss/colors"
import { useWindowSize, useEventListener } from "usehooks-ts"
import { useStore } from "../store"
import { resizeWithPixelRatio } from "../utils/canvas"
import { keyboard } from "../utils/keyboard"
import { useWheelEventListener } from "../utils/mouse"
import { formatTime } from "../utils/time"

function TimeScale() {
  const pxPerSeconds = useStore((state) => state.pxPerSeconds)
  const windowSize = useWindowSize()

  // For now 1 marker every 20 seconds
  const markerWidth = 20 * pxPerSeconds
  const markerNb = Math.floor(windowSize.width / markerWidth)
  const markers = []
  for (let idx = 0; idx < markerNb; idx++) {
    markers.push({ x: idx * markerWidth, time: formatTime(idx * 20) })
  }

  return (
    <div className="bg-transparent absolute inset-0 z-10  overflow-hidden">
      {/* Labels */}
      <div>
        {markers.map((m) => (
          <div
            key={m.time}
            className="absolute top-0"
            style={{ left: `${m.x}px` }}
          >
            <div className="relative" style={{ left: "-50%" }}>
              {m.time}
            </div>
          </div>
        ))}
      </div>
      <div>
        {markers.map((m) => (
          <div
            key={m.time}
            className="w-px h-2 bg-sky-700 absolute top-6 bottom-0"
            style={{ left: `${m.x}px` }}
          ></div>
        ))}
      </div>
    </div>
  )
}

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
  const { horizontalZoomIn, horizontalZoomOut } = useStore((state) => ({
    horizontalZoomIn: state.horizontalZoomIn,
    horizontalZoomOut: state.horizontalZoomOut,
  }))

  useWheelEventListener((event: WheelEvent) => {
    event.preventDefault()
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
        <div className="bg-blue-200 h-16"> Toolbar </div>
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
