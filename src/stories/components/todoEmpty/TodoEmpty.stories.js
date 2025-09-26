import { fn } from 'storybook/test';

import { TodoEmpty } from '/src/components/todo/todoEmpty/TodoEmpty';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Component/Todo/Empty',
  render: (args) => TodoEmpty(args),
  argTypes: {},
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Empty = {
  args: {
    msg: 'There are no to-do items. Please write your to-dos',
  },
};
