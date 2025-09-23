import './style.css';

import { Todo } from './pages/todo/Todo.js';
import { TodoList } from './components/todo/todoList/TodoList';

class TodoFilter {
  filterComplete() {
    const filteredTodo = this.todos.filter((todo) => todo.complete);

    this.$todo_body.innerHTML = TodoList({
      todos: filteredTodo,
    });
  }

  filterActive() {
    const filteredTodo = this.todos.filter((todo) => !todo.complete);
    console.log(filteredTodo, this.todos);

    this.$todo_body.innerHTML = TodoList({
      todos: filteredTodo,
    });
  }

  filterAll() {
    this.rendorList();
  }

  changeClass() {}

  filter() {
    const _this = this;
    this.$filter.addEventListener('click', function (e) {
      const $target = e.target;
      console.log($target);
      if ($target.classList.contains('btn-todo-active')) {
        _this.filterActive();
      } else if ($target.classList.contains('btn-todo-completed')) {
        _this.filterComplete();
      } else if ($target.classList.contains('btn-todo-all')) {
        _this.filterAll();
      } else if ($target.classList.contains('btn-todo-filter')) {
        _this.changeClass();
      }
    });
  }
}

class TodoListApp extends TodoFilter {
  constructor({ wrapper, options }) {
    super();
    this.$wrapper = wrapper;
    this.todos = this.getTodos();
  }

  getTodos() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  }

  onSubmit() {
    const _this = this;

    this.$form.addEventListener('submit', function (e) {
      e.preventDefault();

      const $target = e.target;
      const $input = $target.querySelector('.todo-input');
      const value = $input.value;
      if (!value) return;

      const timestamp = Date.now();
      const todo = {
        key: timestamp,
        value,
        complete: false,
      };
      _this.todos.unshift(todo);

      localStorage.setItem('todos', JSON.stringify(_this.todos));
      $input.value = '';

      _this.rendorList();
    });
  }

  rendorList() {
    this.$todo_body.innerHTML = TodoList({
      todos: this.todos,
    });
  }

  rendorTodo() {
    this.$wrapper.innerHTML = Todo({
      todos: this.todos,
    });
  }

  initSelectors() {
    this.$form = this.$wrapper.querySelector('.todo-form');
    this.$todo_body = this.$wrapper.querySelector('.todo-body');
    this.$filter = this.$wrapper.querySelector('.todo-filter');
  }

  init() {
    this.rendorTodo();
    this.initSelectors();
    this.onSubmit();
    this.filter();
  }
}

const todoListApp = new TodoListApp({
  wrapper: document.getElementById('app'),
  options: {
    useDnd: true,
  },
});
todoListApp.init();
