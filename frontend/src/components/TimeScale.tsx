import { useWindowSize } from "usehooks-ts"
import { useStore } from "../store"
import { formatTime } from "../utils/time"

export default function TimeScale() {
  const pxPerSeconds = useStore((state) => state.pxPerSeconds)
  // Approximation for element size but usable on 1st render
  const windowSize = useWindowSize()

  // Stupid default
  let secondsPerMarker = 1
  // the biggest label I will have is something like 09:59:59
  // it is around 64px wide so the spacing between 2 markers should not
  // be less than 64 + 20 = 84px
  const markerMinimumSpacing = 84
  if (pxPerSeconds > markerMinimumSpacing) {
    // subSeconds
    const subSecondsScale = [1, 0.5, 0.2, 0.1]
    let idx = 0
    while (subSecondsScale[idx] * pxPerSeconds > markerMinimumSpacing) {
      idx += 1
    }
    secondsPerMarker = subSecondsScale[idx - 1]
  } else if (60 * pxPerSeconds > markerMinimumSpacing) {
    // seconds to minutes
    const secondsScale = [60, 30, 20, 10, 5, 2, 1]
    let idx = 0
    while (secondsScale[idx] * pxPerSeconds > markerMinimumSpacing) {
      idx += 1
    }
    secondsPerMarker = secondsScale[idx - 1]
  } else {
    // minutes to hours
    const minutesScale = [
      5 * 60 * 60,
      2 * 60 * 60,
      1 * 60 * 60,
      30 * 60,
      20 * 60,
      10 * 60,
      5 * 60,
      2 * 60,
      1 * 60,
    ]
    let idx = 0
    while (minutesScale[idx] * pxPerSeconds > markerMinimumSpacing) {
      idx += 1
    }
    secondsPerMarker = minutesScale[idx - 1]
  }
  let displaySubSecond = secondsPerMarker < 1
  const markerWidth = secondsPerMarker * pxPerSeconds
  const markerNb = Math.floor(windowSize.width / markerWidth)
  const markers = []
  for (let idx = 0; idx < markerNb; idx++) {
    markers.push({
      x: idx * markerWidth,
      time: formatTime(idx * secondsPerMarker, { displaySubSecond }),
    })
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
      {/* Ticks */}
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
