import { fn } from 'storybook/test';

import { TodoList } from '/src/components/todo/todoList/TodoList';

import todos from '/src/mockup/todos.json';

export default {
  title: 'Component/Todo/List',
  render: (args) => TodoList(args),
  argTypes: {},
  args: { onClick: fn() },
};

export const List = {
  args: {
    todos: todos,
  },
};
