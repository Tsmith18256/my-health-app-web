import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button.component';

const meta: Meta<typeof Button> = {
  component: Button,
  decorators: [
    (Story) => {
      return (
        <div style={{
          width: '16rem'
        }}>
          <Story />
        </div>
      );
    }
  ]
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default button'
  }
};

export const Disabled: Story = {
  args: {
    children: 'Disabled button',
    disabled: true
  }
};
