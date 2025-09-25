import { TodoListApp } from './utils/todo';

const todoListApp = new TodoListApp({
  id: '1',
  wrapper: document.querySelector('#app'),
  options: {
    useDnd: true,
  },
});

const todoListApp2 = new TodoListApp({
  id: '2',
  wrapper: document.querySelector('#app2'),
  options: {
    useDnd: true,
  },
});

const todoListApp3 = new TodoListApp({
  id: '3',
  wrapper: document.querySelector('#app3'),
});

todoListApp.init();
todoListApp2.init();
todoListApp3.init();
