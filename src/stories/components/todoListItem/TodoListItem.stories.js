import { fn } from 'storybook/test';

import { TodoListItem } from '/src/components/todo/todoListItem/TodoListItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'Component/Todo/List Item',
  render: (args) => TodoListItem(args),
  argTypes: {},
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const List_Item = {
  args: {
    todo: {
      value: '할 일 1',
      key: 'todo1',
      checked: false,
    },
  },
};
