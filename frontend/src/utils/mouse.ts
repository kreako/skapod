import { useEffect, useRef } from "react"

export function useWheelEventListener(handler: (event: WheelEvent) => void) {
  // Create a ref that stores handler
  const savedHandler = useRef<(event: WheelEvent) => void>()

  useEffect(() => {
    // Update saved handler if necessary
    if (savedHandler.current !== handler) {
      savedHandler.current = handler
    }

    // Create event listener that calls handler function stored in ref
    const eventListener = (event: WheelEvent) => {
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!savedHandler?.current) {
        savedHandler.current(event)
      }
    }

    window.addEventListener("wheel", eventListener, { passive: false }) // register as passive for preventDefault in handler

    // Remove event listener on cleanup - not really needed here but... :)
    return () => {
      window.removeEventListener("wheel", eventListener)
    }
  }, [handler])
}
