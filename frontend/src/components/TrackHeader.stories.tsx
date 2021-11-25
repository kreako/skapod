import { ComponentStory, ComponentMeta } from "@storybook/react"
import { HEADER_WIDTH_CLASSNAME } from "../utils/ui"

import TrackHeader from "./TrackHeader"

export default {
  title: "TrackHeader",
  component: TrackHeader,
  decorators: [
    (Story) => (
      <div className={`bg-sky-300 ${HEADER_WIDTH_CLASSNAME}`}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TrackHeader>

const Template: ComponentStory<typeof TrackHeader> = (args) => (
  <TrackHeader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  track: {
    id: "0",
    title: "Voice 1",
    volume: 98,
    panLR: -10,
    display: "full",
    content: [],
  },
}

export const Mini = Template.bind({})
Mini.args = {
  track: {
    ...Default.args.track,
    display: "mini",
  },
}
