// Copy paste from somewhere on internet
export const getPixelRatio = (context) => {
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

export const resizeWithPixelRatio = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  // init width/height of the canvas taking pixel ratio
  // First get the ratio
  const ratio = getPixelRatio(ctx)
  // Set canvas width/height
  canvas.width = width * ratio
  canvas.height = height * ratio
  // Reset canvas style width/height
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
}
