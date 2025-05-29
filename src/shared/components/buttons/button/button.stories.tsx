import { PartialStoryFn } from "storybook/internal/types";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonAppearance, ButtonSize } from "./button.component";

const renderContainerDiv = (widthInRem: number) => {
  const ContainerDivDecorator = (StoryFn: PartialStoryFn) => (
    <div style={{ width: `${widthInRem.toString()}rem` }}>
      <StoryFn />
    </div>
  );

  return ContainerDivDecorator;
};

const meta: Meta<typeof Button> = {
  component: Button,
  decorators: [renderContainerDiv(16)],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Primary button",
  },
  decorators: [renderContainerDiv(16)],
};

export const Negative: Story = {
  args: {
    appearance: ButtonAppearance.Negative,
    children: "Negative button",
  },
  decorators: [renderContainerDiv(16)],
};

export const Danger: Story = {
  args: {
    appearance: ButtonAppearance.Danger,
    children: "Danger button",
  },
  decorators: [renderContainerDiv(16)],
};

export const Disabled: Story = {
  args: {
    children: "Disabled button",
    disabled: true,
  },
  decorators: [renderContainerDiv(16)],
};

export const Small: Story = {
  args: {
    children: "Small button",
    size: ButtonSize.Small,
  },
  decorators: [renderContainerDiv(12)],
};

export const Large: Story = {
  args: {
    children: "Large button",
    size: ButtonSize.Large,
  },
  decorators: [renderContainerDiv(16)],
};
