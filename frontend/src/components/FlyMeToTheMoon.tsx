import { useEffect, useRef } from "react"
import { useQuery } from "react-query"
import axios from "axios"
import colors from "tailwindcss/colors"

const getPixelRatio = (context) => {
  var backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1

  return (window.devicePixelRatio || 1) / backingStore
}

export default function FlyMeToTheMoon() {
  let audioRef = useRef<HTMLAudioElement>()
  let canvasRef = useRef<HTMLCanvasElement>()
  const query = useQuery("audio", async () => {
    console.time("query")
    const r = await axios.get(
      //"http://localhost:3000/src/components/FlyMeToTheMoon.opus",
      "http://localhost:3000/src/components/PommeSansToi.opus",
      { responseType: "blob" }
    )
    const blob = r.data
    const url = URL.createObjectURL(blob)
    const array = await blob.arrayBuffer()
    const audioContext = new AudioContext()
    const audioBuffer = await audioContext.decodeAudioData(array)
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

    return { blob, url, soundProfile }
  })

  useEffect(() => {
    if (audioRef.current && query.isSuccess) {
      audioRef.current.src = query.data.url
    }
  }, [audioRef, query.isSuccess, query.data])

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    if (query.data) {
      // clear
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const x_step = canvas.width / query.data.soundProfile.upper.length
      ctx.fillStyle = colors.sky[700]

      // wave form upper
      ctx.beginPath()
      ctx.moveTo(0, canvas.height / 2)
      for (const [idx, up] of query.data.soundProfile.upper.entries()) {
        ctx.lineTo(idx * x_step, (canvas.height - up * canvas.height) / 2)
      }
      ctx.fill()

      // wave form lower
      ctx.beginPath()
      ctx.moveTo(0, canvas.height / 2)
      for (const [idx, low] of query.data.soundProfile.lower.entries()) {
        ctx.lineTo(idx * x_step, (canvas.height - low * canvas.height) / 2)
      }
      ctx.fill()
    } else {
      // init
      const ratio = getPixelRatio(ctx)
      const width = Number(
        getComputedStyle(canvas).getPropertyValue("width").slice(0, -2)
      )
      const height = Number(
        getComputedStyle(canvas).getPropertyValue("height").slice(0, -2)
      )
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      console.log({
        width,
        height,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height,
      })
      ctx.beginPath()
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height / 2,
        0,
        2 * Math.PI
      )
      ctx.fill()
    }
  }, [canvasRef, query.data])

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
      <canvas ref={canvasRef} className="w-full h-48 border border-sky-700">
        <img src="canvas_fallback.png" className="w-full h-48" />
      </canvas>
    </div>
  )
}
