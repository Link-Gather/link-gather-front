import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ShadowBox } from './ShadowBox';

type ArgTypes = ComponentProps<typeof ShadowBox>;

export default {
  title: 'components/ShadowBox',
  component: ShadowBox,
  args: {},
} as Meta<ArgTypes>;

export const Default: StoryObj<ArgTypes> = {};
