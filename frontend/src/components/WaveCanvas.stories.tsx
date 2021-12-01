import { ComponentStory, ComponentMeta } from "@storybook/react"

import WaveCanvas from "./WaveCanvas"

export default {
  title: "WaveCanvas",
  component: WaveCanvas,
  decorators: [
    (Story) => (
      <div className="relative w-screen h-screen bg-sky-100">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof WaveCanvas>

const Template: ComponentStory<typeof WaveCanvas> = (args) => (
  <WaveCanvas {...args} />
)

export const Blue = Template.bind({})
Blue.args = {
  top: 100,
  left: 200,
  width: 600,
  height: 300,
  color: "blue",
}

export const Green = Template.bind({})
Green.args = {
  ...Blue.args,
  color: "green",
}

export const Gray = Template.bind({})
Gray.args = {
  ...Blue.args,
  color: "gray",
}

export const Yellow = Template.bind({})
Yellow.args = {
  ...Blue.args,
  color: "yellow",
}

export const Orange = Template.bind({})
Orange.args = {
  ...Blue.args,
  color: "orange",
}

export const MiniBlue = Template.bind({})
MiniBlue.args = {
  ...Blue.args,
  width: 400,
  height: 100,
}
