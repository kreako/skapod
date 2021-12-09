import { ComponentStory, ComponentMeta } from "@storybook/react"
import { GroupContentKindType, GroupDisplayType } from "../api/types"
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
  height: 600,
  color: "blue",
  muted: false,
  display: GroupDisplayType.Expanded,
  displayHeader: true,

  children: [
    {
      id: "0",
      kind: GroupContentKindType.Clip,
      props: {
        id: "0",
        name: "a blue clip",
        top: 0,
        left: 0,
        width: 600,
        height: 100,
        color: "blue",
        muted: true,
        displayHeader: false,
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
        top: 100,
        left: 110,
        width: 800,
        height: 300,
        color: "orange",
        muted: false,
        display: GroupDisplayType.Expanded,
        displayHeader: false,
        children: [
          {
            id: "0",
            kind: GroupContentKindType.Clip,
            props: {
              id: "1",
              name: "1st clip",
              top: 0,
              left: 0,
              width: 120,
              height: 100,
              color: "orange",
              muted: false,
              displayHeader: false,
            },
          },
          {
            id: "1",
            kind: GroupContentKindType.Clip,
            props: {
              id: "2",
              name: "2nd clip",
              top: 100,
              left: 97,
              width: 140,
              height: 100,
              color: "orange",
              muted: false,
              displayHeader: false,
            },
          },
          {
            id: "2",
            kind: GroupContentKindType.Clip,
            props: {
              id: "3",
              name: "3rd clip",
              top: 200,
              left: 200,
              width: 240,
              height: 100,
              color: "orange",
              muted: true,
              displayHeader: false,
            },
          },
          {
            id: "3",
            kind: GroupContentKindType.Clip,
            props: {
              id: "4",
              name: "4th clip",
              top: 100,
              left: 430,
              width: 370,
              height: 100,
              color: "orange",
              muted: false,
              displayHeader: false,
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
        top: 400,
        left: 500,
        width: 700,
        height: 100,
        color: "green",
        muted: false,
        displayHeader: true,
      },
    },
    {
      id: "3",
      kind: GroupContentKindType.Group,
      props: {
        id: "2",
        name: "a gray group",
        top: 500,
        left: 170,
        width: 800,
        height: 100,
        color: "gray",
        muted: false,
        display: GroupDisplayType.Collapsed,
        displayHeader: false,
        children: [],
      },
    },
  ],
}
