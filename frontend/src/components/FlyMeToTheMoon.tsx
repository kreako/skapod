import { useEffect, useRef } from "react"
import { useQuery } from "react-query"
import axios from "axios"
import SoundWaveCanvas from "./SoundWaveCanvas"

export default function FlyMeToTheMoon() {
  let audioRef = useRef<HTMLAudioElement>()
  let canvasRef = useRef<HTMLCanvasElement>()
  const query = useQuery(
    "audio",
    async () => {
      console.time("query")
      const r = await axios.get(
        //"http://localhost:3000/src/components/FlyMeToTheMoon.opus",
        "src/components/PommeSansToi.opus",
        { responseType: "blob" }
      )
      const blob = r.data
      const url = URL.createObjectURL(blob)
      const array = await blob.arrayBuffer()
      const audioContext = new AudioContext()
      const audioBuffer = await audioContext.decodeAudioData(array)

      const duration = audioBuffer.duration
      const rawData = audioBuffer.getChannelData(0)

      const samples = 1000
      const blockSize = Math.floor(rawData.length / samples)
      const blockNb = Math.ceil(rawData.length / blockSize)
      const upper = []
      const lower = []
      for (let i = 0; i < blockNb; i++) {
        const slice = rawData.slice(blockSize * i, blockSize * (i + 1))
        upper.push(Math.max(...slice))
        lower.push(Math.min(...slice))
      }

      // normalize
      const max_lower = Math.max(...lower.map((l) => Math.abs(l)))
      const max_upper = Math.max(...upper.map((l) => Math.abs(l)))
      console.log({ max_lower, max_upper })
      const multiplier = Math.pow(Math.max(max_lower, max_upper), -1)
      console.log({ multiplier })
      const soundProfile = {
        upper: upper.map((n) => n * multiplier),
        lower: lower.map((n) => n * multiplier),
      }
      console.log({
        min: Math.min(...soundProfile.upper),
        max: Math.max(...soundProfile.upper),
      })
      console.log({
        min: Math.min(...soundProfile.lower),
        max: Math.max(...soundProfile.lower),
      })
      console.timeEnd("query")

      return { blob, url, soundProfile, duration }
    },
    { enabled: true }
  )

  useEffect(() => {
    if (audioRef.current && query.isSuccess) {
      audioRef.current.src = query.data.url
    }
  }, [audioRef, query.isSuccess, query.data])

  return (
    <div className="flex flex-col space-y-4">
      <div>url: {query.isSuccess && query.data.url.toString()}</div>
      <div>
        soundProfile length:{" "}
        {query.isSuccess && query.data.soundProfile.upper.length}
      </div>
      <figure>
        <figcaption>Listen to Frank or Pomme:</figcaption>
        <audio ref={audioRef} controls className="w-full">
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </figure>
      <div className="w-full h-48 border border-sky-700">
        <SoundWaveCanvas
          progress={10}
          total={query.isSuccess ? query.data.duration : 100}
          ready={query.isSuccess}
          lower={query?.data?.soundProfile?.lower}
          upper={query?.data?.soundProfile?.upper}
        />
      </div>
    </div>
  )
}
