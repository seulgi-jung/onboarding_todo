import { TodoList } from '../../components/todo/todoList/TodoList.js';
import { Todo } from '../../pages/todo/Todo.js';

import { TodoEmpty } from '../../components/todo/todoEmpty/TodoEmpty.js';
import { updateDropzone } from '../dnd/dnd.dom';

import { EMPTY_MSG } from '../../const/todo.const.js';

export const renderList = function (todos) {
  if (todos.length > 0) {
    this.$todo_body.innerHTML = TodoList({
      todos: todos,
    });

    if (!this.Dnd) return;
    this.$todo_list = this.$wrapper.querySelector('.todo-list');

    updateDropzone.bind(this.Dnd)(this.$todo_list);
  } else {
    this.$todo_body.innerHTML = TodoEmpty({
      msg: EMPTY_MSG,
    });
  }
};

export const renderTodo = function () {
  if (!this.$wrapper) return;
  this.$wrapper.innerHTML = Todo({
    todos: this.todos,
    todoState: this.todoState,
  });
};

export const updateSummary = function () {
  this.$complete.innerText = this.todoState.complete;
  this.$incomplete.innerText = this.todoState.incomplete;
};
