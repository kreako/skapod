import { FaEllipsisV, FaVolumeMute } from "react-icons/fa"

type ClipHeaderProps = {
  name: string
  width: number
  muted: boolean
  onMutedClick: () => void
  onMenuClick: () => void
}

export function ClipGroupHeader({
  name,
  width,
  muted,
  onMutedClick,
  onMenuClick,
}: ClipHeaderProps) {
  const displayHeaderContent = width >= 25
  const displayMutedIcon = muted && width >= 50
  if (displayHeaderContent) {
    return (
      <div className="absolute inset-x-1 top-0 flex items-center h-6 z-20">
        {displayMutedIcon && (
          <button onClick={onMutedClick} className="flex-grow-0 mr-2">
            <FaVolumeMute className="h-4 w-4" />
          </button>
        )}
        <div className="line-clamp-1 flex-grow">{name}</div>
        <button onClick={onMenuClick} className="flex-grow-0">
          <FaEllipsisV className="h-4 w-4" />
        </button>
      </div>
    )
  } else {
    return <div className="h-6" />
  }
}
