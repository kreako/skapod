import { useStore } from "../store"
import { keyboard } from "../utils/keyboard"
import { useWheelEventListener } from "../utils/mouse"
import TimeScale from "../components/TimeScale"
import { formatTime } from "../utils/time"
import { useQuery } from "react-query"
import { fetchProject } from "../api"
import Header from "../components/Header"
import Clips from "../components/Clips"
import Toolbar from "../components/Toolbar"

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
        <Toolbar />
        <div className="flex w-screen flex-grow">
          <Header />
          <div className="flex-grow relative overflow-hidden">
            <TimeScale />
            {project.isSuccess && <Clips project={project.data} />}
          </div>
        </div>
      </div>
    </div>
  )
}
