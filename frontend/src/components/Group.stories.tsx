import { ComponentStory, ComponentMeta } from "@storybook/react"
import { GroupContentKindType, GroupDisplayType } from "../types"

import Group from "./Group"

export default {
  title: "Group",
  component: Group,
  decorators: [
    (Story) => (
      <div className="relative w-screen h-screen bg-sky-100">
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Group>

const Template: ComponentStory<typeof Group> = (args) => <Group {...args} />

export const Blue = Template.bind({})
Blue.args = {
  name: "a blue group",
  top: 10,
  left: 10,
  width: 1200,
  height: 700,
  color: "blue",
  muted: false,
  display: GroupDisplayType.Expanded,
  children: [
    {
      kind: GroupContentKindType.Clip,
      props: {
        name: "a blue clip",
        top: 25 + 2,
        left: 0,
        width: 600,
        height: 100,
        color: "blue",
        muted: true,
      },
    },

    {
      kind: GroupContentKindType.Group,
      props: {
        name: "a orange group",
        top: 125 + 2 * 2,
        left: 110,
        width: 800,
        height: 325 + 2 * 4,
        color: "orange",
        muted: false,
        display: GroupDisplayType.Expanded,
        children: [
          {
            kind: GroupContentKindType.Clip,
            props: {
              name: "1st clip",
              top: 25 + 2,
              left: 0,
              width: 120,
              height: 100,
              color: "orange",
              muted: false,
            },
          },
          {
            kind: GroupContentKindType.Clip,
            props: {
              name: "2nd clip",
              top: 125 + 2 * 2,
              left: 97,
              width: 140,
              height: 100,
              color: "orange",
              muted: false,
            },
          },
          {
            kind: GroupContentKindType.Clip,
            props: {
              name: "3rd clip",
              top: 225 + 3 * 2,
              left: 200,
              width: 240,
              height: 100,
              color: "orange",
              muted: true,
            },
          },
          {
            kind: GroupContentKindType.Clip,
            props: {
              name: "4th clip",
              top: 125 + 2 * 2,
              left: 430,
              width: 370,
              height: 100,
              color: "orange",
              muted: false,
            },
          },
        ],
      },
    },
    {
      kind: GroupContentKindType.Clip,
      props: {
        name: "a green clip",
        top: 450 + 7 * 2,
        left: 500,
        width: 700,
        height: 100,
        color: "green",
        muted: false,
      },
    },
    {
      kind: GroupContentKindType.Group,
      props: {
        name: "a gray group",
        top: 550 + 8 * 2,
        left: 170,
        width: 800,
        height: 100,
        color: "gray",
        muted: false,
        display: GroupDisplayType.Collapsed,
        children: [],
      },
    },
  ],
}