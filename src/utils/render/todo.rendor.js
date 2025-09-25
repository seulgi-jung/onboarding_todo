import { TodoList } from '../../components/todo/todoList/TodoList.js';
import { Todo } from '../../pages/todo/Todo.js';

import { TodoEmpty } from '../../components/todo/todoEmpty/TodoEmpty';

import { EMPTY_MSG } from '../../const/todo.const.js';

export const renderList = function (todos) {
  if (todos.length > 0) {
    this.$todo_body.innerHTML = TodoList({
      todos: todos,
    });

    if (!this.Dnd) return;

    this.$todo_list = this.$wrapper.querySelector('.todo-list');
    this.Dnd.updateDropzone(this.$todo_list);
  } else {
    this.$todo_body.innerHTML = TodoEmpty({
      msg: EMPTY_MSG,
    });
  }
};

export const renderTodo = function () {
  this.$wrapper.innerHTML = Todo({
    todos: this.todos,
    todoState: this.todoState,
  });
};
