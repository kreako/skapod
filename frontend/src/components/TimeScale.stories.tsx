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

export const Default = Template.bind({})
Default.args = {
  markers: produceMarkers(10, 10, 2000),
}

export const WithHours = Template.bind({})
WithHours.args = {
  markers: produceMarkers(2 * 60 * 60 + 27 * 60 + 42, 0.01, 2000),
}
