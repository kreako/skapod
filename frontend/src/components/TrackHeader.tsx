import { TrackType } from "../api"
import { HEADER_WIDTH_CLASSNAME, TRACK_HEIGHT_CLASSNAME } from "../utils/ui"
import {
  ChevronUpIcon,
  ChevronDownIcon,
  DotsVerticalIcon,
} from "@heroicons/react/solid"

type TrackHeaderProps = {
  track: TrackType
}

export default function TrackHeader({ track }: TrackHeaderProps) {
  return (
    <>
      <div
        className={`flex flex-col ${HEADER_WIDTH_CLASSNAME} ${TRACK_HEIGHT_CLASSNAME} py-1 px-1 text-blueGray-900`}
      >
        <div className="flex">
          <div className="flex-grow-0">
            <ChevronUpIcon className="h-4 w-4 border border-blueGray-900 rounded-md" />
          </div>
          <div className="flex-grow"></div>
          <div className="flex-grow-0">
            <DotsVerticalIcon className="h-4 w-4" />
          </div>
        </div>
        <div className="flex justify-between mt-3">
          <div className="py-0 px-1 border border-blueGray-900 rounded-md text-xs">
            Mute
          </div>
          <div className="py-0 px-1 border border-blueGray-900 rounded-md text-xs">
            Solo
          </div>
        </div>
        <div className="flex space-x-1 items-center mt-6">
          <div className="text-xs">Vol:</div>
          <div className="text-sm">{track.volume}%</div>
        </div>
        <div className="flex space-x-1 items-center">
          <div className="text-xs">LR:</div>
          <div className="text-sm">{track.panLR}%</div>
        </div>
        <div className="flex-grow"></div>
        <div className="truncate text-sm">{track.title}</div>
      </div>
      <div className="my-2 h-1 bg-sky-400"></div>
    </>
  )
}
