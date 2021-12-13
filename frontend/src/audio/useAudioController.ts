import { useEffect, useRef, useState } from "react"
import { start, Player, Transport, ToneAudioBuffers } from "tone"

export function useAudioController() {
  const [inited, setInited] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [bufferLoaded, setBufferLoaded] = useState(false)
  const buffers = useRef(null)

  useEffect(() => {
    setBufferLoaded(false)
    buffers.current = new ToneAudioBuffers(
      {
        hihat: "/files/hihat.opus",
        kick: "/files/kick.opus",
        snare: "/files/snare-2.opus",
      },
      () => {
        setBufferLoaded(true)
        console.log("loaded")
      }
    )
  }, [])

  useEffect(() => {
    if (!bufferLoaded) {
      return
    }
    console.log(
      "player",
      buffers.current.loaded,
      buffers.current.get("hihat").duration
    )
    for (let base = 0; base < 20; base += 2) {
      new Player(buffers.current.get("kick"))
        .toDestination()
        .sync()
        .start(base + 0)
      new Player(buffers.current.get("hihat"))
        .toDestination()
        .sync()
        .start(base + 0.5)
      new Player(buffers.current.get("snare"))
        .toDestination()
        .sync()
        .start(base + 1)
      new Player(buffers.current.get("hihat"))
        .toDestination()
        .sync()
        .start(base + 1.5)
    }
  }, [bufferLoaded])

  const initAudio = async () => {
    if (inited) {
      return
    }
    await start()
    setInterval(() => {
      setSeconds(Transport.seconds)
    }, 100)
    setInited(true)
  }

  const play = async () => {
    await initAudio()
    Transport.start()
  }
  const pause = async () => {
    await initAudio()
    Transport.pause()
  }
  const stop = async () => {
    await initAudio()
    Transport.stop()
  }

  return { play, pause, stop, seconds }
}
