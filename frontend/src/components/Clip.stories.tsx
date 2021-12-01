import { ComponentStory, ComponentMeta } from "@storybook/react"

import Clip from "./Clip"

export default {
  title: "Clip",
  component: Clip,
  decorators: [
    (Story) => (
      <div className="relative w-screen h-screen bg-sky-100">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Clip>

const Template: ComponentStory<typeof Clip> = (args) => <Clip {...args} />

export const Blue = Template.bind({})
Blue.args = {
  name: "a blue clip",
  top: 100,
  left: 200,
  width: 600,
  height: 192,
  color: "blue",
  muted: false,
}

export const Muted = Template.bind({})
Muted.args = {
  ...Blue.args,
  name: "a muted clip",
  muted: true,
}

export const SmallHeightMuted = Template.bind({})
SmallHeightMuted.args = {
  ...Muted.args,
  height: 59,
}

export const SmallWidthMuted = Template.bind({})
SmallWidthMuted.args = {
  ...Muted.args,
  width: 49,
}

export const Green = Template.bind({})
Green.args = {
  ...Blue.args,
  name: "a green clip",
  color: "green",
}

export const Gray = Template.bind({})
Gray.args = {
  ...Blue.args,
  name: "a gray clip",
  color: "gray",
}

export const Yellow = Template.bind({})
Yellow.args = {
  ...Blue.args,
  name: "a yellow clip",
  color: "yellow",
}

export const Orange = Template.bind({})
Orange.args = {
  ...Blue.args,
  name: "a orange clip",
  color: "orange",
}

export const MiniHeightBlue = Template.bind({})
MiniHeightBlue.args = {
  ...Blue.args,
  height: 59,
}

export const MiniWidthBlue = Template.bind({})
MiniWidthBlue.args = {
  ...Blue.args,
  width: 24,
}

export const MiniHeightWidthBlue = Template.bind({})
MiniHeightWidthBlue.args = {
  ...Blue.args,
  height: 59,
  width: 24,
}
