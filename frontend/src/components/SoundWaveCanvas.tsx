import { useEffect, useRef } from "react"
import colors from "tailwindcss/colors"
import { useStore } from "../store"

type DefaultSoundWaveProps = {
  className: string
}

function DefaultSoundWave({ className }: DefaultSoundWaveProps) {
  return (
    <svg
      className={`fill-current text-sky-700 ${className}`}
      viewBox="0 0 264.58332 50.800001"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="m967.06572 105.55595c9.72957 2.75269 32.91183-10.315186 32.93428-9.555949.023.759238-23.70949-11.566801-33.25866-8.241885l-14.14662 4.925698c-5.44046 1.894309-11.17202-2.584342-16.04199-5.611548-9.17782-5.704989-15.47468-16.770209-25.94726-19.435547-12.20062-3.105135-24.92637 7.316133-37.375 5.4375-9.84076-1.485075-18.11548-8.265046-26.96094-12.826172-10.05555-5.185115-18.55754-18.73039-29.65234-16.515625-8.85899 1.768452-7.77255 20.950967-16.80078 21.267578-13.77045.482899-17.96414-20.945708-27.83203-30.5625-7.64006-7.44564-14.2852-24.8465089-24.20899-20.931641-7.45901 2.942528.48031 16.496104-2.55469 23.917969-2.15266 5.264177-5.01579 14.475043-10.5957 13.375-9.51228-1.875284-3.76215-19.256841-8.05664-27.949219-3.37667-6.834584-5.98055-18.3214855-13.60352-18.3828121-10.84679-.0872652-14.26657 16.4995841-19.77539 25.8437501-3.45532 5.861001-1.39405 19.222754-8.17773 18.701172-13.82563-1.063023 2.15567-34.88258-10.64453-40.214844-8.98428-3.7426405-15.72395 16.308924-25.30078 14.574219-6.47207-1.172321-5.98038-15.0991613-12.55664-15.2207034-6.80981-.1258579-10.86497 9.0214484-13.57618 15.2695314-6.05181 13.946615 9.27129 38.356523-4.19336 45.416016-16.03793 8.408674-29.47041-29.61727-47.33593-26.660157-11.6496 1.928251-11.8118 26.148738-23.61719 26.402344-11.1306.239116-12.46614-26.40583-23.31641-23.912109-6.90875 1.587877.10365 18.219462-6.70898 20.179687-12.38646 3.564008-21.27061-14.962884-29.83203-24.597656-8.25419-9.289039-8.10615-28.37893-20.17188-31.3515626-9.26547-2.2827345-15.42579 12.9863806-24.90039 14.1230466-9.64501 1.157112-18.31591-8.098899-28.0293-7.974609-13.33817.170671-26.1671 17.696516-38.19726 11.933594-5.58931-2.677501-.61182-17.0185058-6.80274-17.3046879-7.22092-.3337942-2.59485 20.3081699-9.76171 19.3652339-5.6692-.745888 2.20808-16.396846-3.4961-16.794921-5.31364-.370821-3.39199 10.106816-5.39843 15.041015-2.09517 5.152382-1.37179 14.847568-6.92383 15.181641-8.13182.489313-4.58735-21.01477-12.73243-20.861328-11.55268 8.38002-9.81537 16.71191-14.18945 25.351562-3.9276 7.757775-3.32566 19.306731-10.80469 23.742188-7.75545 4.599394-20.07389 3.822749-26.97656-1.978516-12.17305-10.230686-2.93793-28.890189-11.625-46.265625-6.79979-.922779-3.32045 18.508649-10.15625 17.908203-10.92568-.959694-10.99609-31.0117185-10.99609-31.0117185-6.33234-1.4071034-10.10769 8.4324955-13.6582 13.8613285-3.59065 5.490187-.8649 17.032955-7.30665 18.273437-6.86894 1.322748-7.69156-16.924147-14.4707-15.199219 0 0-2.21468 27.603325-10.21094 38-6.68083 8.686371-17.60818 15.153543-28.49609 16.394532-9.10689 1.03799-18.41768-3.334749-26.30859-7.998047-7.71486-4.559252-13.97803-11.518039-19.25391-18.761719-7.46285-10.246352-16.9043-34.064453-16.9043-34.064453-9.84634.197979-12.058591 26.972656-12.058591 26.972656-8.666819.199657-3.042106-22.703506-11.695312-23.228516-12.699602 19.063102-9.807524 11.996754-12.701172 19.0625-2.158889 5.271602 2.379507 15.750546-3.222656 16.783204-5.263839.970295-3.110923-14.014574-8.451172-13.652344 0 0-6.080021 23.051345-13.955078 31.345703-11.020702 11.607489-18.207424 17.50385-48.074219 18.859376 29.821872 1.355526 37.008595 7.474539 48.029297 19.082029 7.875058 8.29436 13.955078 31.3457 13.955078 31.3457 5.340249.36223 3.187333-14.62263 8.451172-13.65234 5.602163 1.03266 1.063767 11.5116 3.222656 16.7832 2.893648 7.06575-.000383-.0006 12.699219 19.0625 8.653206-.52501 3.030446-23.42817 11.697266-23.22851 0 0 2.212252 26.77468 12.058592 26.97265 0 0 9.43949-23.8181 16.90234-34.06445 5.27589-7.24368 11.54101-14.20247 19.25586-18.76172 7.89092-4.6633 17.20171-9.03603 26.3086-7.99804 10.88791 1.24098 21.81526 7.70816 28.49609 16.39453 7.99626 10.39667 10.21094 38 10.21094 38 6.77913 1.72493 7.60176-16.52197 14.4707-15.19922 6.44175 1.24048 3.716 12.78325 7.30664 18.27344 3.55052 5.42883 7.32587 15.26843 13.65821 13.86132 0 0 .0684-30.05202 10.99414-31.01171 6.8358-.60045 3.35841 18.83098 10.1582 17.9082 8.68706-17.37544-.54803-36.03494 11.625-46.26563 6.90266-5.80126 19.22112-6.57791 26.97656-1.97851 7.47905 4.43545 6.87513 15.98441 10.80274 23.74218 4.37408 8.63966 2.63871 16.97155 14.1914 25.35157 8.14507.15345 4.60062-21.35064 12.73242-20.86133 5.55206.33407 4.8267 10.02926 6.92188 15.18164 2.00644 4.9342.0866 15.41183 5.40039 15.04102 5.70418-.39808-2.17308-16.04904 3.49609-16.79493 7.16686-.94293 2.54078 19.69903 9.76172 19.36524 6.19091-.28619 1.21342-14.62719 6.80274-17.30469 12.03014-5.76292 24.85908 11.76292 38.19726 11.93359 9.71339.12431 18.38429-9.13367 28.0293-7.97656 9.4746 1.13667 15.63492 16.40773 24.90039 14.125 12.06573-2.97263 11.91574-22.06252 20.16992-31.35156 8.56143-9.63477 17.44753-28.16166 29.83399-24.59766 6.81263 1.96023-.19977 18.59181 6.70898 20.17969 10.85027 2.49372 12.18581-24.15122 23.31641-23.91211 11.80539.25361 11.96758 24.47214 23.61719 26.40039 17.86552 2.95712 31.29605-35.06688 47.33398-26.6582 13.46464 7.05949-1.85846 31.4694 4.19336 45.41601 2.71121 6.24809 6.76637 15.39539 13.57617 15.26954 6.57627-.12155 6.08653-14.04838 12.55859-15.22071 9.57684-1.7347 16.31651 18.31686 25.30079 14.57422 12.8002-5.33227-3.18305-39.15182 10.64257-40.21484 6.78369-.52158 4.72242 12.84017 8.17774 18.70117 5.50881 9.34417 8.93055 25.93101 19.77734 25.84375 7.62297-.0613 10.22685-11.55018 13.60352-18.38477 4.29449-8.69238-1.45564-26.07198 8.05664-27.94726 5.5799-1.10004 8.44303 8.11082 10.5957 13.375 3.035 7.42186-4.90628 20.97544 2.55274 23.91797 9.92379 3.91487 16.57088-13.486 24.21093-20.93164 9.8679-9.6168 14.06159-31.0454 27.83203-30.5625 9.02824.31661 7.93985 19.49717 16.79883 21.26562 11.09481 2.21477 19.59875-11.32856 29.6543-16.51367 8.84545-4.56113 17.12018-11.3411 26.96094-12.82617 12.44863-1.87864 25.17438 8.54263 37.375 5.4375 10.47258-2.66534 16.76944-13.73056 25.94726-19.43555 4.86988-3.02716 10.15197-5.367677 15.69513-3.79941z"
        transform="scale(.26458333)"
      />
    </svg>
  )
}

// Copy paste from somewhere on internet
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

const resizeWithPixelRatio = (canvas, ctx) => {
  // init width/height of the canvas taking pixel ratio
  // First get the ratio
  const ratio = getPixelRatio(ctx)
  // Current width/height from canvas computed style (slice because gives "1234px")
  const width = Number(
    getComputedStyle(canvas).getPropertyValue("width").slice(0, -2)
  )
  const height = Number(
    getComputedStyle(canvas).getPropertyValue("height").slice(0, -2)
  )
  // Set canvas width/height
  canvas.width = width * ratio
  canvas.height = height * ratio
  // Reset canvas style width/height
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  console.log("draw", { width: canvas.style.width })
}

type ReadySoundWaveCanvasProps = {
  duration: number
  datas: SoundWaveCanvasDatasProps[]
  className: string
}

function ReadySoundWaveCanvas({
  duration,
  datas,
  className,
}: ReadySoundWaveCanvasProps) {
  let canvasRef = useRef<HTMLCanvasElement>()
  const pxPerSeconds = useStore((state) => state.pxPerSeconds)

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    // canvas/context accessors
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set width/height taking pixel ratio in account
    resizeWithPixelRatio(canvas, ctx)

    // Now for the drawing
    // clear the whole thing
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Let's plot only the first channel for now
    const data = datas[0]?.data
    const min = datas[0]?.min
    const max = datas[0]?.max

    // No channel ?
    if (!data || !min || !max) {
      return
    }

    // Compute how much 1 sample takes in x direction
    // If I'm still executing here then lower.length === upper.length
    const x_step = canvas.width / data.length

    // Multiplier for normalisation
    const multiplier = Math.pow(Math.max(Math.abs(min), Math.abs(max)), -1)

    // Set the color
    ctx.fillStyle = colors.sky[700]

    // Draw wave form upper
    ctx.beginPath()
    ctx.moveTo(0, canvas.height / 2)
    for (const [idx, d] of data.entries()) {
      ctx.lineTo(
        idx * x_step,
        (canvas.height - d * multiplier * canvas.height) / 2
      )
      ctx.lineTo(idx * x_step, canvas.height / 2)
    }
    ctx.fill()
  }, [canvasRef, datas, pxPerSeconds])

  const style = {
    width: pxPerSeconds * duration,
  }
  console.log("render", { style })
  // Here I could have made a fallback image inside but this is not really
  // necessary, if this browser doesn't support canvas, it won't be able
  // to execute this app anyway
  return <canvas ref={canvasRef} className={className} style={style} />
}

type SoundWaveProgressCanvasProps = {
  progress: number
  total: number
  className: string
}

function SoundWaveProgressCanvas({
  progress,
  total,
  className,
}: SoundWaveProgressCanvasProps) {
  let canvasRef = useRef<HTMLCanvasElement>()

  useEffect(() => {
    if (!canvasRef.current) {
      return
    }

    // canvas/context accessors
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set width/height taking pixel ratio in account
    resizeWithPixelRatio(canvas, ctx)

    // Now for the drawing
    // clear the whole thing
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // global alpha
    ctx.globalAlpha = 0.8

    // Compute where progress bar is on canvas width
    const x_progress = (progress * canvas.width) / total

    // Set the color
    ctx.fillStyle = colors.sky[300]

    // rectangle/marker width
    // TODO maybe a % of canvas width ?
    const markerWidth = 20

    // Draw the rectangle/marker
    ctx.fillRect(x_progress - markerWidth / 2, 0, markerWidth, canvas.height)

    // Set the color
    ctx.fillStyle = colors.sky[700]
    // And on top a fine line
    ctx.fillRect(x_progress, 0, 1, canvas.height)
  }, [canvasRef, progress, total])

  // Here I could have made a fallback image inside but this is not really
  // necessary, if this browser doesn't support canvas, it won't be able
  // to execute this app anyway
  return <canvas ref={canvasRef} className={className} />
}

type SoundWaveCanvasDatasProps = {
  data: number[]
  min: number
  max: number
}

type SoundWaveCanvasProps = {
  progress: number
  total: number
  ready: boolean
  datas: SoundWaveCanvasDatasProps[]
}

export default function SoundWaveCanvas({
  progress,
  total,
  ready,
  datas,
}: SoundWaveCanvasProps) {
  return (
    <div>
      {/* TODO h-48 hard coded here */}
      <div className="w-full h-48 border border-sky-700 relative">
        <div className="absolute inset-0 h-48">
          {ready ? (
            <ReadySoundWaveCanvas
              duration={total}
              datas={datas}
              className="w-full h-48"
            />
          ) : (
            <DefaultSoundWave className="w-full h-48" />
          )}
        </div>
        <div className="absolute inset-0 h-48">
          <SoundWaveProgressCanvas
            progress={progress}
            total={total}
            className="h-48"
          />
        </div>
      </div>
    </div>
  )
}
