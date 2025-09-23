import { fn } from 'storybook/test';

import { TodoFoot } from '/src/components/todo/todoFoot/TodoFoot';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Component/Todo/Foot',
  render: (args) => TodoFoot(args),
  argTypes: {},
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Foot = {
  args: {
    todos: [
      {
        value: '할 일 1',
        key: 'todo1',
        checked: false,
      },
      {
        value: '할 일 2',
        key: 'todo2',
        checked: false,
      },
      {
        value: '할 일 3',
        key: 'todo3',
        checked: false,
      },
    ],
  },
};
