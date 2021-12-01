import { FaEllipsisV, FaVolumeMute } from "react-icons/fa"

type ClipHeaderProps = {
  name: string
  width: number
  muted: boolean
}

export function ClipGroupHeader({ name, width, muted }: ClipHeaderProps) {
  const displayHeaderContent = width >= 25
  const displayMutedIcon = muted && width >= 50
  if (displayHeaderContent) {
    return (
      <div className="flex items-center px-1 h-6 ">
        {displayMutedIcon && (
          <div className="flex-grow-0 mr-2">
            <FaVolumeMute className="h-4 w-4" />
          </div>
        )}
        <div className="line-clamp-1">{name}</div>
        <div className="flex-grow"></div>
        <div className="flex-grow-0">
          <FaEllipsisV className="h-4 w-4" />
        </div>
      </div>
    )
  } else {
    return <div className="h-6 " />
  }
}
