import { useAudioController } from "../audio/useAudioController"
import { TOOLBAR_HEIGHT_CLASSNAME } from "../utils/ui"
import { FaPlay, FaStop, FaPause } from "react-icons/fa"
import { formatTime } from "../utils/time"

export default function Toolbar() {
  const { play, pause, stop, seconds } = useAudioController()

  const clickPlay = async () => {
    await play()
  }

  const clickPause = async () => {
    await pause()
  }

  const clickStop = async () => {
    await stop()
  }

  return (
    <div
      className={`flex flex-row items-center space-x-2 ${TOOLBAR_HEIGHT_CLASSNAME}`}
    >
      <button onClick={clickPlay}>
        <FaPlay className="w-6 h-6 text-gray-900" />
      </button>
      <button onClick={clickPause}>
        <FaPause className="w-6 h-6 text-gray-900" />
      </button>
      <button onClick={clickStop}>
        <FaStop className="w-6 h-6 text-gray-900" />
      </button>
      <div>{formatTime(seconds, { displaySubSecond: true })}</div>
    </div>
  )
}
