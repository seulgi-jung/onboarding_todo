import './style.css';

import { Todo } from './pages/todo/Todo.js';
import { TodoList } from './components/todo/todoList/TodoList';
import { TodoEmpty } from './components/todo/todoEmpty/TodoEmpty';

//todo 옮길 예정
const EMPTY_MSG = 'There are no to-do items. Please write your to-dos';
const FILTER_STATE = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETE: 'complete',
};

class DragAndDrop {
  draggable() {}
  init() {
    console.log('drag');
  }
}

class TodoFilter {
  filterState = FILTER_STATE.ALL;

  filterComplete() {
    const filteredTodo = this.todos.filter((todo) => todo.complete);

    this.rendorList(filteredTodo);
    this.filterState = FILTER_STATE.COMPLETE;
  }

  filterActive() {
    const filteredTodo = this.todos.filter((todo) => !todo.complete);

    this.rendorList(filteredTodo);
    this.filterState = FILTER_STATE.ACTIVE;
  }

  filterAll() {
    this.rendorList(this.todos);
    this.filterState = FILTER_STATE.ALL;
  }

  changeClass($target) {
    const activeClass = 'is-active';

    this.$btnFilter.forEach(function (btn) {
      btn.classList.remove(activeClass);
    });

    $target.classList.add(activeClass);
  }

  deleteCompleteTodo() {
    const _this = this;
    this.$btnClear.addEventListener('click', function () {
      const filterdTodo = _this.todos.filter(({ complete }) => !complete);
      _this.todos = filterdTodo;
      _this.rendorList(_this.todos);
      localStorage.setItem('todos', JSON.stringify(_this.todos));
    });
  }

  initFilterSelectors() {
    this.$filter = this.$wrapper.querySelector('.todo-filter');
    this.$btnFilter = this.$wrapper.querySelectorAll('.btn-todo-filter');
    this.$incomplete = this.$wrapper.querySelector('#incomplete');
    this.$Complete = this.$wrapper.querySelector('#complete');
    this.$btnClear = this.$wrapper.querySelector('.btn-clear');
  }

  updateSummary() {
    this.$Complete.innerText = this.todoState.complete;
    this.$incomplete.innerText = this.todoState.incomplete;
  }

  updateFilter() {
    if (this.filterState == FILTER_STATE.ACTIVE) {
      this.filterActive();
    } else if (this.filterState == FILTER_STATE.COMPLETE) {
      this.filterComplete();
    }
  }

  filter() {
    const _this = this;

    this.$filter.addEventListener('click', function (e) {
      const $target = e.target;

      if (!_this.todos || _this.todos.length < 1) return;

      if ($target.classList.contains('btn-todo-active')) {
        _this.filterActive();
      } else if ($target.classList.contains('btn-todo-completed')) {
        _this.filterComplete();
      } else if ($target.classList.contains('btn-todo-all')) {
        _this.filterAll();
      }

      if ($target.classList.contains('btn-todo-filter')) {
        _this.changeClass($target);
      }
    });
  }

  initFilter() {
    this.initFilterSelectors();
    this.filter();
    this.deleteCompleteTodo();
  }
}

class TodoListApp extends TodoFilter {
  todoState = {
    complete: 0,
    incomplete: 0,
  };

  constructor({ wrapper, options }) {
    super();

    this.$wrapper = wrapper;
    this.todos = this.getTodos();
    this.setTodoState();
  }

  getTodos() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  }

  setTodoState() {
    const _this = this;
    this.todos.forEach(function (todo) {
      todo.complete ? _this.todoState.complete++ : _this.todoState.incomplete++;
    });
  }

  onSubmit() {
    const _this = this;

    this.$form.addEventListener('submit', function (e) {
      e.preventDefault();

      const $target = e.target;
      const $input = $target.querySelector('.todo-input');
      const value = $input.value;
      if (!value) return;

      $input.value = '';
      _this.addTodo(value);
      _this.rendorListItem();
    });
  }

  addTodo(value) {
    const timestamp = Date.now();
    const todo = {
      key: timestamp,
      value,
      complete: false,
    };
    this.todos.unshift(todo);

    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  updateTodo(targetKey) {
    let targetTodo = [];

    const filteredTodos = this.todos.filter((todo) => {
      if (todo.key === targetKey) {
        targetTodo = todo;
        targetTodo.complete = !targetTodo.complete;
      } else {
        return todo;
      }
    });

    if (targetTodo.complete) {
      this.todos = [...filteredTodos, targetTodo];
    } else {
      this.todos = [targetTodo, ...filteredTodos];
    }
    this.rendorList(this.todos);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  updateTodoState(targetChecked) {
    if (targetChecked) {
      this.todoState.complete++;
      this.todoState.incomplete--;
    } else {
      this.todoState.complete--;
      this.todoState.incomplete++;
    }
  }

  changeComplete() {
    const _this = this;

    this.$todo_body.addEventListener('change', function (e) {
      const $target = e.target;
      if (
        $target.classList.contains('base-checkbox') ||
        $target.parentNode.classList.contains('base-checkbox')
      ) {
        const targetKey = Number($target.parentNode.children[0].id);
        const targetChecked = $target.checked;
        if (!targetKey) return;

        _this.updateTodo(targetKey);

        if (!_this.filterState) return;
        _this.updateTodoState(targetChecked);
        _this.updateFilter();
        _this.updateSummary();
      }
    });
  }

  rendorListItem() {
    this.$todo_body.innerHTML = TodoList({
      todos: this.todos,
    });
  }

  rendorList(todos) {
    if (todos.length > 0) {
      this.$todo_body.innerHTML = TodoList({
        todos: todos,
      });
    } else {
      this.$todo_body.innerHTML = TodoEmpty({
        msg: EMPTY_MSG,
      });
    }
  }

  rendorTodo() {
    this.$wrapper.innerHTML = Todo({
      todos: this.todos,
      todoState: this.todoState,
    });
  }

  initSelectors() {
    this.$form = this.$wrapper.querySelector('.todo-form');
    this.$todo_body = this.$wrapper.querySelector('.todo-body');
    this.$todo_foot = this.$wrapper.querySelector('.todo-foot');
  }

  init() {
    this.rendorTodo();
    this.initSelectors();
    this.initFilter();
    this.onSubmit();
    this.changeComplete();
  }
}

const todoListApp = new TodoListApp({
  wrapper: document.getElementById('app'),
  options: {
    useDnd: true,
  },
});
todoListApp.init();
