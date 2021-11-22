import { ComponentStory, ComponentMeta } from "@storybook/react"

import { produceMarkers, TimeScaleView } from "./TimeScale"

export default {
  title: "TimeScaleView",
  component: TimeScaleView,
  decorators: [
    (Story) => (
      <div className="relative w-screen h-screen">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof TimeScaleView>

const Template: ComponentStory<typeof TimeScaleView> = (args) => (
  <TimeScaleView {...args} />
)

export const StartsAtZero = Template.bind({})
StartsAtZero.args = {
  markers: produceMarkers(0, 10, 10, 2000),
}

export const StartsAtNonZero = Template.bind({})
StartsAtNonZero.args = {
  markers: produceMarkers(7, 10, 10, 2000),
}

export const WithHours = Template.bind({})
WithHours.args = {
  markers: produceMarkers(
    1 * 60 * 60 + 12 * 60 + 17,
    2 * 60 * 60 + 27 * 60 + 42,
    0.01,
    2000
  ),
}
