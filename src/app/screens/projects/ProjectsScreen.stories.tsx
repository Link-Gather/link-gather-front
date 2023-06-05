import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProjectsScreen } from './ProjectsScreen';
import { rest } from 'msw';
import { API_ENDPOINT } from '../../configs';
import { projects } from './data.mock';

type ArgTypes = ComponentProps<typeof ProjectsScreen>;

export default {
  title: 'screens/Project',
  component: ProjectsScreen,
  args: {},
  msw: {
    handlers: {
      getProjects: rest.get(`${API_ENDPOINT}/projects`, (req, res, ctx) => res(ctx.json({ data: projects }))),
    },
  },
} as Meta<ArgTypes>;

export const Default: StoryObj<ArgTypes> = {};