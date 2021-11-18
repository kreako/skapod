import { useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import axios from "axios"
import SoundWaveCanvas from "./SoundWaveCanvas"
import { useStore } from "../store"

const arrayMinMax = (arr: Float32Array) =>
  arr.reduce(
    ([min, max], val) => [Math.min(min, val), Math.max(max, val)],
    [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]
  )

export default function FlyMeToTheMoon() {
  let audioRef = useRef<HTMLAudioElement>()
  let canvasRef = useRef<HTMLCanvasElement>()
  const query = useQuery(
    "audio",
    async () => {
      console.time("query")
      const r = await axios.get(
        "src/components/FlyMeToTheMoon.opus",
        //"src/components/PommeSansToi.opus",
        { responseType: "blob" }
      )
      const blob = r.data
      const url = URL.createObjectURL(blob)
      const array = await blob.arrayBuffer()
      const audioContext = new AudioContext()
      const audioBuffer = await audioContext.decodeAudioData(array)

      const duration = audioBuffer.duration
      const datas = []
      for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
        const data = audioBuffer.getChannelData(i)
        const [min, max] = arrayMinMax(data)
        datas.push({
          data,
          min,
          max,
        })
      }
      const sampleRate = audioBuffer.sampleRate
      console.timeEnd("query")

      return { url, datas, duration, sampleRate }
    },
    { enabled: true, staleTime: Infinity }
  )

  useEffect(() => {
    if (audioRef.current && query.isSuccess) {
      audioRef.current.src = query.data.url
    }
  }, [audioRef, query.isSuccess, query.data])

  const [progress, setProgress] = useState(0)

  const audioTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime)
    }
  }

  const bears = useStore((state) => state.bears)

  return (
    <div className="flex flex-col space-y-4">
      <div>bears: {bears}</div>
      <div>url: {query.isSuccess && query.data.url.toString()}</div>
      <div>length: {query.isSuccess && query.data.datas[0].data.length}</div>
      <figure>
        <figcaption>Listen to Frank or Pomme:</figcaption>
        <audio
          ref={audioRef}
          controls
          className="w-full"
          onTimeUpdate={audioTimeUpdate}
        >
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </figure>
      <div className="w-full h-48 border border-sky-700">
        <SoundWaveCanvas
          progress={progress}
          total={query.isSuccess ? query.data.duration : 100}
          ready={query.isSuccess}
          datas={query?.data?.datas}
        />
      </div>
    </div>
  )
}
