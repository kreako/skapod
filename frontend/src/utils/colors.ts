import colors from "tailwindcss/colors"
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

export const colorToValue = (color: ColorType): string => {
  switch (color) {
    case "blue":
      return colors.blue[500]
    case "gray":
      return colors.blueGray[500]
    case "green":
      return colors.green[500]
    case "yellow":
      return colors.yellow[500]
    case "orange":
      return colors.orange[500]
  }
}
