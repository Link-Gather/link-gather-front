import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dimmer } from './Dimmer';

type ArgTypes = ComponentProps<typeof Dimmer>;

export default {
  title: 'elements/Dimmer',
  component: Dimmer,
} as Meta<ArgTypes>;

export const Default: StoryObj<ArgTypes> = {};

export const DarkTheme: StoryObj<ArgTypes> = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
