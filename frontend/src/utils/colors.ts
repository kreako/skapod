import colors from "tailwindcss/colors"
import { ColorType } from "../types"

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

export const colorToValue = (color: ColorType, level: number): string => {
  switch (color) {
    case "blue":
      return colors.blue[level]
    case "gray":
      return colors.blueGray[level]
    case "green":
      return colors.green[level]
    case "yellow":
      return colors.yellow[level]
    case "orange":
      return colors.orange[level]
  }
}
