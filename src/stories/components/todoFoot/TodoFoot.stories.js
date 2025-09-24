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
    todoState: {
      complete: 1,
      incomplete: 1,
    },
  },
};
