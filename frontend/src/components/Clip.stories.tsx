import { ComponentStory, ComponentMeta } from "@storybook/react"

import Clip from "./Clip"

export default {
  title: "Clip",
  component: Clip,
  decorators: [
    (Story) => (
      <div className="w-full h-full">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Clip>

const Template: ComponentStory<typeof Clip> = (args) => <Clip {...args} />

export const Blue = Template.bind({})
Blue.args = {
  length: 300,
  display: "full",
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
  display: "mini",
}
