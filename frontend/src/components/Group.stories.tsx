import { ComponentStory, ComponentMeta } from "@storybook/react"
import { GroupContentKindType, GroupDisplayType } from "../types"
import { action } from "@storybook/addon-actions"
import Group from "./Group"

export default {
  title: "Group",
  component: Group,
  argTypes: {
    onMutedClick: { action: "main muted" },
    onMenuClick: { action: "main menu" },
  },
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
  id: "0",
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
      id: "0",
      kind: GroupContentKindType.Clip,
      props: {
        id: "0",
        name: "a blue clip",
        top: 25 + 2,
        left: 0,
        width: 600,
        height: 100,
        color: "blue",
        muted: true,
        onMutedClick: action("clip 0 muted"),
        onMenuClick: action("clip 0 menu"),
      },
    },

    {
      id: "1",
      kind: GroupContentKindType.Group,
      props: {
        id: "1",
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
            id: "0",
            kind: GroupContentKindType.Clip,
            props: {
              id: "1",
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
            id: "1",
            kind: GroupContentKindType.Clip,
            props: {
              id: "2",
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
            id: "2",
            kind: GroupContentKindType.Clip,
            props: {
              id: "3",
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
            id: "3",
            kind: GroupContentKindType.Clip,
            props: {
              id: "4",
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
      id: "2",
      kind: GroupContentKindType.Clip,
      props: {
        id: "5",
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
      id: "3",
      kind: GroupContentKindType.Group,
      props: {
        id: "2",
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
