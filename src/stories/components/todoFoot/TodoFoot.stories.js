import { fn } from 'storybook/test';

import { TodoFoot } from '/src/components/todo/todoFoot/TodoFoot';

export default {
  title: 'Component/Todo/Foot',
  render: (args) => TodoFoot(args),
  argTypes: {},
  args: { onClick: fn() },
};

export const Foot = {
  args: {
    todoState: {
      complete: 1,
      incomplete: 1,
    },
  },
};
