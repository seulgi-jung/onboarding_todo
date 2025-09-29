import { fn } from 'storybook/test';

import { TodoInput } from '/src/components/todo/todoInput/TodoInput';

export default {
  title: 'Component/Todo/Input',
  render: (args) => TodoInput(args),
  argTypes: {},
  args: { onClick: fn() },
};

export const Input = {
  args: {
    placeholder: 'What needs to be done',
  },
};
