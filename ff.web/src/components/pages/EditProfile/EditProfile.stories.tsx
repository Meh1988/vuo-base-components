import type { Meta, StoryObj } from "@storybook/react";
import { EditProfile } from "./EditProfile";

const meta: Meta<typeof EditProfile> = {
  component: EditProfile,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof EditProfile>;

export const DefaultEditProfile: Story = {
  args: {},
};
