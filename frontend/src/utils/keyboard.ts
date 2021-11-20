import { useEventListener } from "usehooks-ts"

export const keyboard = {
  ctrl: false,
}

window.addEventListener("keydown", (event: KeyboardEvent) => {
  keyboard.ctrl = event.key === "Control"
})

window.addEventListener("keyup", (event: KeyboardEvent) => {
  keyboard.ctrl = false
})
