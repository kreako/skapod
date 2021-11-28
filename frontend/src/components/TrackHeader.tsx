import { TrackDisplayType, TrackType } from "../api"
import {
  HEADER_WIDTH_CLASSNAME,
  TRACK_HEIGHT_FULL_CLASSNAME,
  TRACK_HEIGHT_MINI_CLASSNAME,
  TRACK_SEPARATOR_HEIGHT_CLASSNAME,
} from "../utils/ui"
import {
  ChevronUpIcon,
  ChevronDownIcon,
  DotsVerticalIcon,
} from "@heroicons/react/solid"

type TrackHeaderHandlersProps = {
  clickDisplay: (display: TrackDisplayType) => void
  clickMenu: () => void
  clickMute: () => void
  clickSolo: () => void
  clickVolume: () => void
  clickPanLR: () => void
  clickTitle: () => void
}

type TrackHeaderProps = {
  track: TrackType
  handlers: TrackHeaderHandlersProps
}

function TrackHeaderFull({ track, handlers }: TrackHeaderProps) {
  return (
    <div
      className={`flex flex-col ${HEADER_WIDTH_CLASSNAME} ${TRACK_HEIGHT_FULL_CLASSNAME} py-1 px-1 text-blueGray-900`}
    >
      <div className="flex">
        <button
          className="flex-grow-0"
          onClick={() => handlers.clickDisplay("mini")}
        >
          <ChevronUpIcon className="h-4 w-4 border border-blueGray-900 rounded-md" />
        </button>
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
  )
}

function TrackHeaderMini({ track, handlers }: TrackHeaderProps) {
  return (
    <div
      className={`flex flex-col ${HEADER_WIDTH_CLASSNAME} ${TRACK_HEIGHT_MINI_CLASSNAME} py-1 px-1 text-blueGray-900`}
    >
      <div className="flex">
        <button
          className="flex-grow-0"
          onClick={() => handlers.clickDisplay("full")}
        >
          <ChevronDownIcon className="h-4 w-4 border border-blueGray-900 rounded-md" />
        </button>
        <div className="flex-grow"></div>
        <div className="flex-grow-0">
          <DotsVerticalIcon className="h-4 w-4" />
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="truncate text-sm">{track.title}</div>
    </div>
  )
}

export default function TrackHeader({ track, handlers }: TrackHeaderProps) {
  return (
    <>
      {track.display == "full" ? (
        <TrackHeaderFull track={track} handlers={handlers} />
      ) : (
        <TrackHeaderMini track={track} handlers={handlers} />
      )}
      <div className={`${TRACK_SEPARATOR_HEIGHT_CLASSNAME} bg-sky-400`}></div>
    </>
  )
}
