import { TodoListApp } from './utils/todo/todo';

const todoListApp = new TodoListApp({
  id: '1',
  wrapper: document.querySelector('#app'),
  options: {
    useDnd: true,
  },
});

todoListApp.init();
