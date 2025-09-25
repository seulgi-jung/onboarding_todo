import { FILTER_STATE } from '../const/todo.const.js';
import { renderList } from '../utils/render/todo.rendor.js';
import { getTodos, setTodos } from '../service/todo.service.js';

export const addTodo = function (value) {
  const timestamp = Date.now();
  const todo = {
    key: timestamp,
    value,
    complete: false,
  };
  this.todos.unshift(todo);

  setTodos(this.id, this.todos);
};

export const changeCompleteTodo = function (targetKey) {
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

  renderList.bind(this)(this.todos);
  setTodos(this.id, this.todos);
};

export const deleteCompleteTodo = function () {
  const filteredTodo = this.todos.filter(({ complete }) => !complete);

  this.todos = filteredTodo;
  this.todoState.complete = 0;
  this.updateSummary();

  switch (this.filterState) {
    case FILTER_STATE.ALL:
      this.filterAll();
      break;
    case FILTER_STATE.COMPLETE:
      this.filterComplete();
      break;
    case FILTER_STATE.ACTIVE:
      this.filterActive();
      break;
    default:
      break;
  }

  setTodos(this.id, this.todos);
};

export const updateTodoState = function (targetChecked) {
  if (targetChecked) {
    this.todoState.complete++;
    this.todoState.incomplete--;
  } else {
    this.todoState.complete--;
    this.todoState.incomplete++;
  }
};

export const setTodoState = function () {
  this.todos.forEach((todo) => {
    todo.complete ? this.todoState.complete++ : this.todoState.incomplete++;
  });
};
