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

export const Default = Template.bind({})
Default.args = {
  length: 300,
  display: "full",
}

export const Mini = Template.bind({})
Mini.args = {
  ...Default.args,
  display: "mini",
}
