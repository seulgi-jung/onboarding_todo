import { fn } from 'storybook/test';

import { TodoListItem } from '/src/components/todo/todoListItem/TodoListItem';

import todos from '/src/mockup/todos.json';

export default {
  title: 'Component/Todo/List Item',
  render: (args) => TodoListItem(args),
  argTypes: {},
  args: { onClick: fn() },
};

export const incomplete = {
  args: {
    todo: todos[0],
  },
};
const completeTodo = todos[1];
completeTodo.complete = true;
export const complete = {
  args: {
    todo: todos[1],
  },
};
