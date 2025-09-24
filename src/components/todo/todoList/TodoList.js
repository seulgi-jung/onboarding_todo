import './TodoList.css';

import { BasicCheckbox } from '../../form/basicCheckbox/BasicCheckbox';

export const TodoList = ({ todos }) => {
  const rendor = function () {
    return todos.map(function (todo) {
      return `
        <li class="todo-list-item ${todo.complete ? 'is-complete' : ''}" data-key="${todo.key}">
          ${BasicCheckbox({
            label: todo.value,
            checked: todo.complete,
            key: todo.key,
          })}
        </li>
      `;
    });
  };

  return `
    <ul class="todo-list"> 
      ${rendor().join('')}
    </ul>
  `;
};
