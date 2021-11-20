export const formatTime = (seconds: number): string => {
  // TODO display milliseconds

  const minutes = Math.floor(seconds / 60)
  const seconds_rem = seconds - minutes * 60
  const seconds_rem_s = seconds_rem.toString().padStart(2, "0")

  const hours = Math.floor(minutes / 60)
  if (hours > 0) {
    const hours_s = hours.toString()
    const minutes_rem = minutes - hours * 60
    const minutes_rem_s = minutes_rem.toString().padStart(2, "0")
    return `${hours_s}:${minutes_rem_s}:${seconds_rem_s}`
  } else {
    const minutes_s = minutes.toString().padStart(2, "0")
    return `${minutes_s}:${seconds_rem_s}`
  }
}
