import { setTodos } from '../service/todo.service.js';
import { changeFilterList } from '../ui/todo/todo.dom.js';
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

  setTodos(this.id, this.todos);
};

export const deleteCompleteTodo = function () {
  const filteredTodo = this.todos.filter(({ complete }) => !complete);

  this.todos = filteredTodo;
  this.todoState.complete = 0;

  changeFilterList.bind(this)();
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
  this.todoState = {
    complete: 0,
    incomplete: 0,
  };
  this.todos.forEach((todo) => {
    todo.complete ? this.todoState.complete++ : this.todoState.incomplete++;
  });
};

export const increaseIncomplete = function () {
  this.todoState.incomplete++;
};
