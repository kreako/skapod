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

test("produceMarkers with a start 0", () => {
  expect(produceMarkers(0, 20, 5, 500)).toEqual([
    { x: 0, time: "00:00", key: "0-00:00" },
    { x: 100, time: "00:20", key: "100-00:20" },
    { x: 200, time: "00:40", key: "200-00:40" },
    { x: 300, time: "01:00", key: "300-01:00" },
    { x: 400, time: "01:20", key: "400-01:20" },
  ])
})

test("produceMarkers with a non-0 start", () => {
  expect(produceMarkers(11, 20, 5, 500)).toEqual([
    { x: 45, time: "00:20", key: "45-00:20" }, // (20 - 11) * 5 = 45
    { x: 145, time: "00:40", key: "145-00:40" },
    { x: 245, time: "01:00", key: "245-01:00" },
    { x: 345, time: "01:20", key: "345-01:20" },
    { x: 445, time: "01:40", key: "445-01:40" },
  ])
})

test("produceMarkers with a more complex non-0 start", () => {
  expect(produceMarkers(42.4, 180, 0.5, 500)).toEqual([
    { x: 68.8, time: "03:00", key: "68.8-03:00" }, // (180 - 42.4) * 0.5 = 68.8
    { x: 158.8, time: "06:00", key: "158.8-06:00" }, // 180 * 0.5 = 90
    { x: 248.8, time: "09:00", key: "248.8-09:00" },
    { x: 338.8, time: "12:00", key: "338.8-12:00" },
    { x: 428.8, time: "15:00", key: "428.8-15:00" },
  ])
})
