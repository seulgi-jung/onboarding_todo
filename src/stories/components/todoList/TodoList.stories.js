import { fn } from 'storybook/test';

import { TodoList } from './TodoList';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Component/Todo/List',
  render: (args) => TodoList(args),
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const List = {
  args: {
    key: 'button',
    label: 'Button',
  },
};