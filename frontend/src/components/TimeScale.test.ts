import { MAX_ZOOM_IN, MIN_ZOOM_OUT, ZOOM_SCALE_IN } from "../store"
import {
  MARKER_MINIMUM_SPACING,
  produceMarkers,
  secondsPerMarker,
} from "./TimeScale"

test("secondsPerMarker - markers spacing not too close", () => {
  // so secondsPerMarker * pxPerSeconds > MARKER_MINIMUM_SPACING for every value of pxPerSeconds
  for (
    let pxPerSeconds = MIN_ZOOM_OUT;
    pxPerSeconds < MAX_ZOOM_IN;
    pxPerSeconds = pxPerSeconds * ZOOM_SCALE_IN
  ) {
    expect(secondsPerMarker(pxPerSeconds)).toBeGreaterThanOrEqual(
      MARKER_MINIMUM_SPACING / pxPerSeconds
    )
  }
})

test("secondsPerMarker - markers spacing not too far", () => {
  // so secondsPerMarker * pxPerSeconds < 2.5 * MARKER_MINIMUM_SPACING for every value of pxPerSeconds
  for (
    let pxPerSeconds = MIN_ZOOM_OUT;
    pxPerSeconds < MAX_ZOOM_IN;
    pxPerSeconds = pxPerSeconds * ZOOM_SCALE_IN
  ) {
    expect(secondsPerMarker(pxPerSeconds)).toBeLessThanOrEqual(
      (2.5 * MARKER_MINIMUM_SPACING) / pxPerSeconds
    )
  }
})

test("produceMarkers", () => {
  expect(produceMarkers(20, 5, 500)).toEqual([
    { x: 0, time: "00:00" },
    { x: 100, time: "00:20" },
    { x: 200, time: "00:40" },
    { x: 300, time: "01:00" },
    { x: 400, time: "01:20" },
  ])
})
