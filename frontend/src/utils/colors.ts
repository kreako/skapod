import { ColorType } from "../api"

export const colorToBgClassName = (color: ColorType): string => {
  switch (color) {
    case "blue":
      return "bg-blue-200"
    case "gray":
      return "bg-blueGray-200"
    case "green":
      return "bg-green-200"
    case "yellow":
      return "bg-yellow-200"
    case "orange":
      return "bg-orange-200"
  }
}
