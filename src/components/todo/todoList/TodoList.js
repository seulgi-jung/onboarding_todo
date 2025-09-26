import './TodoList.css';

import { TodoListItem } from '../todoListItem/TodoListItem';

export const TodoList = ({ todos }) => {
  return `
    <ul class="todo-list">
      ${todos.map((todo) => TodoListItem({ todo })).join('')}
    </ul>`;
};
