import { useEffect, useRef } from "react"
import colors from "tailwindcss/colors"
import { useStore } from "../store"
import { resizeWithPixelRatio } from "../utils/canvas"
import { keyboard } from "../utils/keyboard"
import { useWheelEventListener } from "../utils/mouse"
import TimeScale from "../components/TimeScale"
import { formatTime } from "../utils/time"
import { useQuery } from "react-query"
import { fetchProject } from "../api"

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
  const {
    pxPerSeconds,
    horizontalZoomIn,
    horizontalZoomOut,
    start,
    horizontalScrollRight,
    horizontalScrollLeft,
  } = useStore((state) => ({
    pxPerSeconds: state.pxPerSeconds,
    horizontalZoomIn: state.horizontalZoomIn,
    horizontalZoomOut: state.horizontalZoomOut,
    start: state.start,
    horizontalScrollRight: state.horizontalScrollRight,
    horizontalScrollLeft: state.horizontalScrollLeft,
  }))

  useWheelEventListener((event: WheelEvent) => {
    event.preventDefault() // works because event is registered as passive = false
    if (keyboard.ctrl) {
      // zoom
      if (event.deltaY > 0) {
        horizontalZoomOut()
      } else {
        horizontalZoomIn()
      }
    } else {
      // scroll
      if (event.deltaY > 0) {
        horizontalScrollRight()
      } else {
        horizontalScrollLeft()
      }
    }
  })

  const project = useQuery("project", fetchProject, { staleTime: Infinity })

  return (
    <div className="flex h-screen">
      <div className="flex-grow flex flex-col">
        <div className="bg-blue-200 h-16">
          Toolbar : {pxPerSeconds}
          {project.isSuccess && <span> {project.data.maxTime} </span>}
          <div>
            <span>{formatTime(start, { displaySubSecond: true })}</span>
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
