import { fn } from 'storybook/test';

import { TodoEmpty } from '/src/components/todo/todoEmpty/TodoEmpty';

export default {
  title: 'Component/Todo/Empty',
  render: (args) => TodoEmpty(args),
  argTypes: {},
  args: { onClick: fn() },
};

export const Empty = {
  args: {
    msg: 'There are no to-do items. Please write your to-dos',
  },
};
