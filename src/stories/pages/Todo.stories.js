import { fn } from 'storybook/test';

import { Todo } from './Todo';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Todo List App',
  render: (args) => Todo(args),
  argTypes: {
  },
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TodoListApp = {
  args: {
  },
};
