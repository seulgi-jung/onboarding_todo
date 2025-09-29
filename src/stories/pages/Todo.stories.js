import { fn } from 'storybook/test';

import { Todo } from '/src/pages/todo/todo';
import { TodoListApp } from '/src/utils/todo/todo.js';

export default {
  title: 'Todo List',
  render: () => `<div id="app" class="wrapper"></div> `,
  // render: (args) => Todo(args),
  argTypes: {},
  args: { onClick: fn() },
  play: async () => {
    const todoListApp = new TodoListApp({
      id: '1',
      wrapper: document.querySelector('#app'),
      options: {
        useDnd: true,
      },
    });
    todoListApp.init();
  },
};
export const TodoList = {
  args: {
    todoState: {
      complete: 1,
      incomplete: 1,
    },
  },
};
