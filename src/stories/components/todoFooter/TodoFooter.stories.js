import { fn } from 'storybook/test';

import { TodoFooter } from './TodoFooter';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Component/Todo/Footer',
  render: (args) => TodoFooter(args),
  argTypes: {
  },
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Footer = {
  args: {
    key: 'button',
    label: 'Button',
  },
};