import { useWindowSize } from "usehooks-ts"
import { useStore } from "../store"
import { formatTime } from "../utils/time"

// the biggest label I will have is something like 09:59:59
// it is around 64px wide so the spacing between 2 markers should not
// be less than 64 + 20 = 84px
export const MARKER_MINIMUM_SPACING = 84

export const secondsPerMarker = (pxPerSeconds: number): number => {
  if (pxPerSeconds > MARKER_MINIMUM_SPACING) {
    // subSeconds
    const subSecondsScale = [1, 0.5, 0.2, 0.1]
    let idx = 0
    while (subSecondsScale[idx] * pxPerSeconds > MARKER_MINIMUM_SPACING) {
      idx += 1
    }
    return subSecondsScale[idx - 1]
  } else if (60 * pxPerSeconds > MARKER_MINIMUM_SPACING) {
    // seconds to minutes
    const secondsScale = [60, 30, 20, 10, 5, 2, 1]
    let idx = 0
    while (secondsScale[idx] * pxPerSeconds > MARKER_MINIMUM_SPACING) {
      idx += 1
    }
    return secondsScale[idx - 1]
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
    while (minutesScale[idx] * pxPerSeconds > MARKER_MINIMUM_SPACING) {
      idx += 1
    }
    return minutesScale[idx - 1]
  }
}

export default function TimeScale() {
  const pxPerSeconds = useStore((state) => state.pxPerSeconds)
  // Approximation for element size but usable on 1st render
  const windowSize = useWindowSize()

  // Stupid default
  const secPerMarker = secondsPerMarker(pxPerSeconds)

  let displaySubSecond = secPerMarker < 1
  const markerWidth = secPerMarker * pxPerSeconds
  const markerNb = Math.floor(windowSize.width / markerWidth)
  const markers = []
  for (let idx = 0; idx < markerNb; idx++) {
    markers.push({
      x: idx * markerWidth,
      time: formatTime(idx * secPerMarker, { displaySubSecond }),
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
