import { fn } from 'storybook/test';

import { TodoInput } from '/src/components/todo/todoInput/TodoInput';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Component/Todo/Input',
  render: (args) => TodoInput(args),
  argTypes: {},
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Input = {
  args: {
    placeholder: 'What needs to be done',
  },
};
